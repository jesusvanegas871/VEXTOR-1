import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X, Loader2 } from 'lucide-react';
import { MAPBOX_TOKEN } from './config';
import { cn } from '../../../utils/cn';

const MapboxAutocomplete = ({
  placeholder = 'Buscar dirección...',
  value = '',
  onChange,
  onSelect,
  className,
  error,
}) => {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  // Sync internal state when external value changes
  useEffect(() => {
    setQuery(value);
  }, [value]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch suggestions with debouncing
  const fetchSuggestions = (searchQuery) => {
    if (!searchQuery || searchQuery.trim().length < 3) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const bogotaCoords = '-74.0721,4.7110';
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      searchQuery
    )}.json?access_token=${MAPBOX_TOKEN}&country=CO&proximity=${bogotaCoords}&autocomplete=true&limit=5`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Error de red al consultar Mapbox Geocoding');
        return res.json();
      })
      .then((data) => {
        if (data && data.features) {
          setSuggestions(data.features);
        } else {
          setSuggestions([]);
        }
      })
      .catch((err) => {
        console.error('Error fetching Mapbox Geocoding suggestions:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    onChange?.(val);
    setIsOpen(true);
    setActiveIndex(-1);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      fetchSuggestions(val);
    }, 400); // 400ms debounce
  };

  const handleSelectSuggestion = (feature) => {
    const address = feature.place_name;
    const [lng, lat] = feature.center;
    const coordString = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;

    setQuery(address);
    setSuggestions([]);
    setIsOpen(false);
    setActiveIndex(-1);

    onSelect?.({
      address,
      coordinates: coordString,
    });
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
    setActiveIndex(-1);
    onChange?.('');
    onSelect?.({ address: '', coordinates: '' });
  };

  const handleKeyDown = (e) => {
    if (!isOpen || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        handleSelectSuggestion(suggestions[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={wrapperRef} className={cn('relative w-full', className)}>
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-v-gray pointer-events-none"
        />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (query.trim().length >= 3) {
              setIsOpen(true);
              if (suggestions.length === 0) fetchSuggestions(query);
            }
          }}
          placeholder={placeholder}
          className={cn(
            'w-full bg-v-dark border focus:border-primary text-v-white text-sm pl-10 pr-10 py-2.5 rounded-lg focus:outline-none transition-all',
            error ? 'border-red-500' : 'border-v-dark-border'
          )}
        />

        {/* Loading Spinner & Clear Action */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {isLoading && (
            <Loader2 size={15} className="text-primary animate-spin" />
          )}
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="text-v-gray hover:text-v-white transition-colors p-0.5 rounded-full hover:bg-v-dark-border"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Suggestion Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-1.5 bg-v-dark-soft border border-v-dark-border rounded-xl shadow-2xl overflow-hidden divide-y divide-v-dark-border/60 max-h-60 overflow-y-auto">
          {suggestions.map((item, index) => (
            <li
              key={item.id}
              onClick={() => handleSelectSuggestion(item)}
              onMouseEnter={() => setActiveIndex(index)}
              className={cn(
                'flex items-start gap-3 px-4 py-3 cursor-pointer text-left transition-colors text-xs',
                index === activeIndex
                  ? 'bg-primary/10 text-v-white'
                  : 'text-v-gray hover:text-v-white hover:bg-v-dark/40'
              )}
            >
              <MapPin
                size={14}
                className={cn(
                  'shrink-0 mt-0.5',
                  index === activeIndex ? 'text-primary' : 'text-v-gray'
                )}
              />
              <div className="space-y-0.5 overflow-hidden">
                <span className="font-semibold block text-v-white truncate">
                  {item.text}
                </span>
                <span className="text-[10px] text-v-gray block truncate">
                  {item.place_name}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MapboxAutocomplete;
