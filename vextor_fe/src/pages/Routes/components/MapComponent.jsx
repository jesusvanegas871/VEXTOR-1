import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Layers, Activity, Eye, EyeOff, Navigation, Maximize2, RefreshCw } from 'lucide-react';
import { MAPBOX_TOKEN, TOMTOM_KEY } from './config';
import { cn } from '../../../utils/cn';

// Set access token
mapboxgl.accessToken = MAPBOX_TOKEN;

// Colors for inactive routes to make them distinctive but subtle
const DISTINCT_COLORS = [
  '#3b82f6', // Blue
  '#f59e0b', // Amber
  '#8b5cf6', // Violet
  '#ec4899', // Pink
  '#06b6d4', // Cyan
  '#f97316', // Orange
];

const MAP_STYLES = [
  { id: 'dark', label: 'Oscuro', url: 'mapbox://styles/mapbox/dark-v11' },
  { id: 'streets', label: 'Calles', url: 'mapbox://styles/mapbox/streets-v12' },
  { id: 'satellite', label: 'Satélite', url: 'mapbox://styles/mapbox/satellite-v9' },
  { id: 'outdoors', label: 'Relieve', url: 'mapbox://styles/mapbox/outdoors-v12' }
];

const MapComponent = ({
  routes = [],
  activeRoute = null,
  selectedOrigin = '',
  selectedDestination = '',
  onSelectPoints,
  onRouteCalculated, // Callback to update parent with distance, time and addresses
}) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  // States for user interactive controls
  const [currentStyle, setCurrentStyle] = useState('dark');
  const [trafficEnabled, setTrafficEnabled] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);

  // Keep references to DOM elements and map objects to clean up correctly
  const markersRef = useRef([]);
  const activeRouteMarkersRef = useRef({ origin: null, destination: null });

  // Safe coordinate parser -> returns [longitude, latitude] for Mapbox
  const parseCoordinatesToLngLat = (coordString) => {
    if (!coordString) return null;
    const parts = coordString.split(',');
    if (parts.length !== 2) return null;
    const lat = parseFloat(parts[0]);
    const lng = parseFloat(parts[1]);
    if (isNaN(lat) || isNaN(lng)) return null;
    return [lng, lat];
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const bogotaLngLat = [-74.0721, 4.7110];

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: MAP_STYLES.find(s => s.id === currentStyle)?.url || MAP_STYLES[0].url,
      center: bogotaLngLat,
      zoom: 12,
      pitchWithRotate: false,
      dragRotate: false
    });

    // Add navigation controls (Zoom, etc)
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');

    mapInstanceRef.current = map;

    map.on('load', () => {
      setMapLoaded(true);
      // Ensure canvas adjusts perfectly to custom responsive sizes and wrapper mounts
      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.resize();
        }
      }, 150);
    });

    // Map click handler for selecting points
    map.on('click', async (e) => {
      // Avoid triggering when clicking map controls, layers or markers
      if (e.originalEvent.defaultPrevented) return;

      const { lng, lat } = e.lngLat;
      const coordString = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;

      // Perform Reverse Geocoding to get address instantly
      let addressName = `Ubicación en ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      try {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          if (data.features && data.features.length > 0) {
            addressName = data.features[0].place_name;
          }
        }
      } catch (err) {
        console.error('Reverse geocoding error on click:', err);
      }

      onSelectPoints({
        coordinates: coordString,
        address: addressName
      });
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Map Style
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !mapLoaded) return;

    const styleUrl = MAP_STYLES.find(s => s.id === currentStyle)?.url;
    if (styleUrl) {
      map.setStyle(styleUrl);

      // Re-apply Traffic layer if it was enabled, after the style loads
      map.once('style.load', () => {
        if (trafficEnabled) {
          addTrafficLayer(map);
        }
        // Force redraw route and markers after style changes
        triggerMapRedraw();
        // Recalculate container bounding dimensions
        map.resize();
      });
    }
  }, [currentStyle]);

  // Handle Traffic Toggle
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !mapLoaded) return;

    if (trafficEnabled) {
      addTrafficLayer(map);
    } else {
      removeTrafficLayer(map);
    }
  }, [trafficEnabled, mapLoaded]);

  const addTrafficLayer = (map) => {
    if (!TOMTOM_KEY) {
      console.warn('TomTom API Key missing. Cannot load traffic layer.');
      return;
    }

    try {
      // 1. Add Source for Flow Tiles
      if (!map.getSource('tomtom-traffic-flow')) {
        map.addSource('tomtom-traffic-flow', {
          type: 'raster',
          tiles: [
            `https://api.tomtom.com/traffic/map/4/tile/flow/absolute/{z}/{x}/{y}.png?key=${TOMTOM_KEY}`
          ],
          tileSize: 256,
          attribution: '© TomTom Traffic'
        });
      }

      // 2. Add Layer for Flow Tiles
      if (!map.getLayer('tomtom-traffic-flow-layer')) {
        map.addLayer({
          id: 'tomtom-traffic-flow-layer',
          type: 'raster',
          source: 'tomtom-traffic-flow',
          paint: { 'raster-opacity': 0.75 }
        });
      }

      // 3. Add Source for Incidents Tiles
      if (!map.getSource('tomtom-traffic-incidents')) {
        map.addSource('tomtom-traffic-incidents', {
          type: 'raster',
          tiles: [
            `https://api.tomtom.com/traffic/map/4/tile/incidents/s3/{z}/{x}/{y}.png?key=${TOMTOM_KEY}`
          ],
          tileSize: 256,
          attribution: '© TomTom Incidents'
        });
      }

      // 4. Add Layer for Incidents Tiles
      if (!map.getLayer('tomtom-traffic-incidents-layer')) {
        map.addLayer({
          id: 'tomtom-traffic-incidents-layer',
          type: 'raster',
          source: 'tomtom-traffic-incidents',
          paint: { 'raster-opacity': 0.85 }
        });
      }
    } catch (err) {
      console.error('Error adding TomTom Traffic layers:', err);
    }
  };

  const removeTrafficLayer = (map) => {
    try {
      if (map.getLayer('tomtom-traffic-flow-layer')) {
        map.removeLayer('tomtom-traffic-flow-layer');
      }
      if (map.getSource('tomtom-traffic-flow')) {
        map.removeSource('tomtom-traffic-flow');
      }
      if (map.getLayer('tomtom-traffic-incidents-layer')) {
        map.removeLayer('tomtom-traffic-incidents-layer');
      }
      if (map.getSource('tomtom-traffic-incidents')) {
        map.removeSource('tomtom-traffic-incidents');
      }
    } catch (err) {
      console.error('Error removing TomTom Traffic layers:', err);
    }
  };

  // Helper to force a state refresh for drawing routes
  const [redrawCounter, setRedrawCounter] = useState(0);
  const triggerMapRedraw = () => setRedrawCounter(prev => prev + 1);

  // Redraw Markers, Lines, and Active Route
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !mapLoaded) return;

    // 1. Clear Inactive Markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    // 2. Clear Active Route Markers
    if (activeRouteMarkersRef.current.origin) {
      activeRouteMarkersRef.current.origin.remove();
      activeRouteMarkersRef.current.origin = null;
    }
    if (activeRouteMarkersRef.current.destination) {
      activeRouteMarkersRef.current.destination.remove();
      activeRouteMarkersRef.current.destination = null;
    }

    // 3. Clear existing active route layers and sources
    if (map.getLayer('active-route-line')) map.removeLayer('active-route-line');
    if (map.getSource('active-route')) map.removeSource('active-route');

    // 4. Clear all previous individual route layers & sources
    routes.forEach((r) => {
      const layerId = `route-line-${r.id_ruta}`;
      const sourceId = `route-source-${r.id_ruta}`;
      if (map.getLayer(layerId)) map.removeLayer(layerId);
      if (map.getSource(sourceId)) map.removeSource(sourceId);
    });

    // 5. Draw Inactive Routes in the background
    routes.forEach((route, index) => {
      if (activeRoute && route.id_ruta === activeRoute.id_ruta) return;

      const origLngLat = parseCoordinatesToLngLat(route.origen);
      const destLngLat = parseCoordinatesToLngLat(route.destino);

      if (origLngLat && destLngLat) {
        const color = DISTINCT_COLORS[index % DISTINCT_COLORS.length];

        // Draw small dot markers
        const startEl = document.createElement('div');
        startEl.className = 'w-3 h-3 rounded-full border border-white shadow-md cursor-pointer transition-transform hover:scale-125';
        startEl.style.backgroundColor = color;

        const endEl = document.createElement('div');
        endEl.className = 'w-3 h-3 rounded-full border border-white shadow-md cursor-pointer transition-transform hover:scale-125';
        endEl.style.backgroundColor = color;

        const popup = new mapboxgl.Popup({ offset: 10 })
          .setHTML(`<div class="p-1.5 text-xs text-v-white font-sans">
                      <b class="text-primary font-mono text-xs block">${route.codigo_ruta}</b>
                      <span class="font-semibold block mt-0.5">${route.nombre_ruta}</span>
                    </div>`);

        const startMarker = new mapboxgl.Marker({ element: startEl })
          .setLngLat(origLngLat)
          .setPopup(popup)
          .addTo(map);

        const endMarker = new mapboxgl.Marker({ element: endEl })
          .setLngLat(destLngLat)
          .setPopup(popup)
          .addTo(map);

        markersRef.current.push(startMarker, endMarker);

        // Draw dotted polyline connecting them
        const sourceId = `route-source-${route.id_ruta}`;
        const layerId = `route-line-${route.id_ruta}`;

        map.addSource(sourceId, {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [origLngLat, destLngLat]
            }
          }
        });

        map.addLayer({
          id: layerId,
          type: 'line',
          source: sourceId,
          layout: { 'line-join': 'round', 'line-cap': 'round' },
          paint: {
            'line-color': color,
            'line-width': 2.5,
            'line-opacity': 0.45,
            'line-dasharray': [3, 3]
          }
        });
      }
    });

    // 6. Draw Active Route or Clicked Draft Route
    let activeOrigin = null;
    let activeDest = null;
    let activeRouteLabel = 'Nueva Ruta';

    if (activeRoute) {
      activeOrigin = parseCoordinatesToLngLat(activeRoute.origen);
      activeDest = parseCoordinatesToLngLat(activeRoute.destino);
      activeRouteLabel = activeRoute.nombre_ruta || activeRoute.codigo_ruta;
    } else {
      activeOrigin = parseCoordinatesToLngLat(selectedOrigin);
      activeDest = parseCoordinatesToLngLat(selectedDestination);
    }

    // Origin Marker (Green / A)
    if (activeOrigin) {
      const origEl = document.createElement('div');
      origEl.className = 'relative flex items-center justify-center w-7 h-7';
      origEl.innerHTML = `
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-30"></span>
        <div class="relative flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 border-2 border-white shadow-xl text-white font-bold text-[10px]">
          A
        </div>
      `;

      const origMarker = new mapboxgl.Marker({ element: origEl })
        .setLngLat(activeOrigin)
        .setPopup(new mapboxgl.Popup({ offset: 12 }).setHTML(`
          <div class="p-1.5 text-xs font-sans text-v-white">
            <b class="text-emerald-400 block font-bold">Origen (Punto A)</b>
            <span class="text-[11px] text-v-gray block mt-0.5">${activeRouteLabel}</span>
          </div>
        `))
        .addTo(map);

      activeRouteMarkersRef.current.origin = origMarker;
    }

    // Destination Marker (Red / B)
    if (activeDest) {
      const destEl = document.createElement('div');
      destEl.className = 'relative flex items-center justify-center w-7 h-7';
      destEl.innerHTML = `
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-30"></span>
        <div class="relative flex items-center justify-center w-6 h-6 rounded-full bg-red-500 border-2 border-white shadow-xl text-white font-bold text-[10px]">
          B
        </div>
      `;

      const destMarker = new mapboxgl.Marker({ element: destEl })
        .setLngLat(activeDest)
        .setPopup(new mapboxgl.Popup({ offset: 12 }).setHTML(`
          <div class="p-1.5 text-xs font-sans text-v-white">
            <b class="text-red-400 block font-bold">Destino (Punto B)</b>
            <span class="text-[11px] text-v-gray block mt-0.5">${activeRouteLabel}</span>
          </div>
        `))
        .addTo(map);

      activeRouteMarkersRef.current.destination = destMarker;
    }

    // Draw routing line following street networks from Mapbox Directions API
    if (activeOrigin && activeDest) {
      setIsLoadingRoute(true);

      const fetchDirections = async () => {
        try {
          const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${activeOrigin[0]},${activeOrigin[1]};${activeDest[0]},${activeDest[1]}?geometries=geojson&overview=full&access_token=${MAPBOX_TOKEN}`;
          const res = await fetch(url);
          if (!res.ok) throw new Error('No se pudo calcular la ruta real en Mapbox.');
          const data = await res.json();

          if (data && data.routes && data.routes.length > 0) {
            const firstRoute = data.routes[0];
            const routeGeoJSON = firstRoute.geometry;
            const distanceKm = firstRoute.distance / 1000; // km
            const durationMins = firstRoute.duration / 60; // minutes

            // 1. Draw route line on map
            if (map.getSource('active-route')) {
              map.getSource('active-route').setData({
                type: 'Feature',
                geometry: routeGeoJSON
              });
            } else {
              map.addSource('active-route', {
                type: 'geojson',
                data: {
                  type: 'Feature',
                  geometry: routeGeoJSON
                }
              });

              map.addLayer({
                id: 'active-route-line',
                type: 'line',
                source: 'active-route',
                layout: { 'line-join': 'round', 'line-cap': 'round' },
                paint: {
                  'line-color': '#10b981', // Emerald 500
                  'line-width': 5.5,
                  'line-opacity': 0.85
                }
              });
            }

            // 2. Fetch friendly names for addresses using Geocoding API if not present
            let originAddress = `Coordenadas: ${activeOrigin[1].toFixed(5)}, ${activeOrigin[0].toFixed(5)}`;
            let destinationAddress = `Coordenadas: ${activeDest[1].toFixed(5)}, ${activeDest[0].toFixed(5)}`;

            try {
              const [origRes, destRes] = await Promise.all([
                fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${activeOrigin[0]},${activeOrigin[1]}.json?access_token=${MAPBOX_TOKEN}`),
                fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${activeDest[0]},${activeDest[1]}.json?access_token=${MAPBOX_TOKEN}`)
              ]);
              if (origRes.ok) {
                const oData = await origRes.json();
                if (oData.features && oData.features.length > 0) originAddress = oData.features[0].place_name;
              }
              if (destRes.ok) {
                const dData = await destRes.json();
                if (dData.features && dData.features.length > 0) destinationAddress = dData.features[0].place_name;
              }
            } catch (geocodeErr) {
              console.warn('Geocoding names during route calculation failed:', geocodeErr);
            }

            // 3. Callback to parent with route info
            onRouteCalculated?.({
              distance: distanceKm.toFixed(2),
              duration: Math.round(durationMins),
              originAddress,
              destinationAddress
            });

            // 4. Fit bounds to contain the route path
            const bounds = new mapboxgl.LngLatBounds();
            routeGeoJSON.coordinates.forEach((coord) => {
              bounds.extend(coord);
            });
            map.fitBounds(bounds, { padding: 50, maxZoom: 15 });

          } else {
            // Draw straight Polyline fallback if no streets route is calculated
            drawFallbackPolyline(map, activeOrigin, activeDest);
          }
        } catch (err) {
          console.error('Mapbox Directions error:', err);
          drawFallbackPolyline(map, activeOrigin, activeDest);
        } finally {
          setIsLoadingRoute(false);
        }
      };

      fetchDirections();
    } else if (activeOrigin) {
      map.easeTo({ center: activeOrigin, zoom: 14 });
    } else if (activeDest) {
      map.easeTo({ center: activeDest, zoom: 14 });
    }

  }, [routes, activeRoute, selectedOrigin, selectedDestination, mapLoaded, redrawCounter]);

  // Fallback straight line drawing
  const drawFallbackPolyline = (map, origin, dest) => {
    if (map.getSource('active-route')) {
      map.getSource('active-route').setData({
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [origin, dest]
        }
      });
    } else {
      map.addSource('active-route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [origin, dest]
          }
        }
      });

      map.addLayer({
        id: 'active-route-line',
        type: 'line',
        source: 'active-route',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': '#10b981',
          'line-width': 5,
          'line-opacity': 0.9
        }
      });
    }

    // Fit straight line bounds
    const bounds = new mapboxgl.LngLatBounds()
      .extend(origin)
      .extend(dest);
    map.fitBounds(bounds, { padding: 60, maxZoom: 14 });

    // Inform parent of fallback values
    onRouteCalculated?.({
      distance: (mapboxgl.LngLat.convert(origin).distanceTo(mapboxgl.LngLat.convert(dest)) / 1000).toFixed(2),
      duration: Math.round(mapboxgl.LngLat.convert(origin).distanceTo(mapboxgl.LngLat.convert(dest)) / 1000 * 2), // Rough guess
      originAddress: 'Ubicación de Origen',
      destinationAddress: 'Ubicación de Destino'
    });
  };

  const handleRecenter = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.easeTo({ center: [-74.0721, 4.7110], zoom: 12 });
  };

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-v-dark-border shadow-xl">
      <div ref={mapContainerRef} className="w-full h-full min-h-[400px] lg:min-h-[600px] z-10" />

      {/* Floating Controls: Style Selector & Traffic Layers */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 bg-v-dark-soft/95 backdrop-blur-md border border-v-dark-border p-2.5 rounded-xl shadow-2xl max-w-[170px] text-xs">
        {/* Style selection */}
        <div className="space-y-1.5 text-left">
          <label className="text-[10px] font-bold text-v-gray uppercase tracking-wider flex items-center gap-1">
            <Layers size={11} className="text-primary" /> Estilo del Mapa
          </label>
          <div className="grid grid-cols-2 gap-1 bg-v-dark/40 p-1 rounded-lg">
            {MAP_STYLES.map(style => (
              <button
                key={style.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentStyle(style.id);
                }}
                className={cn(
                  "px-2 py-1 rounded text-[10px] font-semibold transition-all cursor-pointer",
                  currentStyle === style.id
                    ? "bg-primary text-v-white shadow-sm"
                    : "text-v-gray hover:text-v-white"
                )}
              >
                {style.label}
              </button>
            ))}
          </div>
        </div>

        {/* Separator line */}
        <div className="border-t border-v-dark-border/60 my-1" />

        {/* Traffic Toggle */}
        <div className="flex items-center justify-between gap-2.5 text-left">
          <div className="space-y-0.5">
            <div className="font-bold text-v-white flex items-center gap-1">
              <Activity size={12} className="text-amber-500" /> Tránsito TomTom
            </div>
            <div className="text-[9px] text-v-gray">Capa de tráfico en vivo</div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setTrafficEnabled(!trafficEnabled);
            }}
            className={cn(
              "p-1.5 rounded-lg border transition-all cursor-pointer",
              trafficEnabled
                ? "bg-amber-500/20 border-amber-500/40 text-amber-400"
                : "bg-v-dark/50 border-v-dark-border text-v-gray hover:text-v-white"
            )}
            title={trafficEnabled ? "Desactivar Tráfico" : "Activar Tráfico"}
          >
            {trafficEnabled ? <Eye size={13} /> : <EyeOff size={13} />}
          </button>
        </div>
      </div>

      {/* Recenter Map floating button */}
      <button
        onClick={handleRecenter}
        className="absolute bottom-4 right-4 z-20 p-2.5 bg-v-dark-soft/95 backdrop-blur-sm border border-v-dark-border rounded-xl text-v-gray hover:text-v-white shadow-lg cursor-pointer transition-all hover:scale-105"
        title="Centrar en Bogotá"
      >
        <Navigation size={15} className="rotate-45" />
      </button>

      {/* Loading Overlay spinner */}
      {isLoadingRoute && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] z-30 flex items-center justify-center pointer-events-none transition-opacity duration-300">
          <div className="bg-v-dark-soft/90 border border-v-dark-border px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 pointer-events-auto">
            <RefreshCw size={15} className="text-primary animate-spin" />
            <span className="text-xs font-semibold text-v-white">Trazando calles...</span>
          </div>
        </div>
      )}

      {/* Visual Instruction Overlay */}
      <div className="absolute bottom-4 left-4 bg-v-dark-soft/95 backdrop-blur-md border border-v-dark-border px-3 py-2 rounded-xl text-xs text-v-white z-20 pointer-events-none shadow-lg space-y-1 max-w-[280px] text-left">
        <div className="font-bold text-emerald-400 flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Navegación Interactiva
        </div>
        <p className="text-[11px] text-v-gray leading-relaxed">
          Haz clic en el mapa para marcar el <strong className="text-emerald-400">Origen (A)</strong> y el <strong className="text-red-400">Destino (B)</strong>. O busca direcciones en el formulario.
        </p>
      </div>
    </div>
  );
};

export default MapComponent;
