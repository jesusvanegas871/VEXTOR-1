import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Wrench,
  Calendar,
  Gauge
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';
import { PageHeader } from '../../components/ui/PageHeader';
import { EmptyState } from '../../components/ui/EmptyState';
import { maintenanceService } from './services/maintenanceService';
import { vehicleService } from '../Vehicles/services/vehicleService';
import { cn } from '../../utils/cn';
import { useTranslation } from 'react-i18next';

const MAINTENANCE_STATUSES = [
  { value: 'PROGRAMADO', label: 'Programado', variant: 'info' },
  { value: 'EN_PROCESO', label: 'En Proceso', variant: 'warning', pulse: true },
  { value: 'COMPLETADO', label: 'Completado', variant: 'success' },
  { value: 'CANCELADO', label: 'Cancelado', variant: 'danger' }
];

const MAINTENANCE_TYPES = ['PREVENTIVO', 'CORRECTIVO', 'PREDICTIVO'];

const Maintenance = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [maintenances, setMaintenances] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  // Search & Filters state
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentMaintenance, setCurrentMaintenance] = useState(null);
  const [maintenanceToDelete, setMaintenanceToDelete] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    id_vehiculo: '',
    tipo_mantenimiento: 'PREVENTIVO',
    descripcion_mantenimiento: '',
    fecha_mantenimiento: '',
    costo_mantenimiento: '',
    kilometraje_mantenimiento: '',
    estado_mantenimiento: 'PROGRAMADO'
  });
  const [formErrors, setFormErrors] = useState({});
  const [apiError, setApiError] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const loadData = async () => {
    setIsLoading(true);
    try {
      const vData = await vehicleService.getVehicles();
      const mData = await maintenanceService.getMaintenances();
      setVehicles(vData);
      setMaintenances(mData);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (searchParams.get('action') === 'new' && vehicles.length > 0) {
      handleOpenCreate();
      setSearchParams({});
    }
  }, [searchParams, vehicles]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.id_vehiculo) errors.id_vehiculo = 'Debe seleccionar un vehículo';
    if (!formData.descripcion_mantenimiento.trim()) errors.descripcion_mantenimiento = 'La descripción es obligatoria';
    if (!formData.fecha_mantenimiento) errors.fecha_mantenimiento = 'La fecha es obligatoria';

    const costoNum = parseFloat(formData.costo_mantenimiento);
    if (!formData.costo_mantenimiento) {
      errors.costo_mantenimiento = 'El costo es obligatorio';
    } else if (isNaN(costoNum) || costoNum < 0) {
      errors.costo_mantenimiento = 'Debe ser mayor o igual a 0';
    }

    const kmNum = parseInt(formData.kilometraje_mantenimiento, 10);
    if (!formData.kilometraje_mantenimiento) {
      errors.kilometraje_mantenimiento = 'El kilometraje es obligatorio';
    } else if (isNaN(kmNum) || kmNum < 0) {
      errors.kilometraje_mantenimiento = 'Debe ser mayor o igual a 0';
    }

    return errors;
  };

  const handleOpenCreate = () => {
    setCurrentMaintenance(null);
    setFormData({
      id_vehiculo: vehicles[0]?.id_vehiculo || '',
      tipo_mantenimiento: 'PREVENTIVO',
      descripcion_mantenimiento: '',
      fecha_mantenimiento: new Date().toISOString().split('T')[0],
      costo_mantenimiento: '',
      kilometraje_mantenimiento: '',
      estado_mantenimiento: 'PROGRAMADO'
    });
    setFormErrors({});
    setApiError('');
    setIsFormOpen(true);
  };

  const handleOpenEdit = (maint) => {
    setCurrentMaintenance(maint);
    setFormData({
      id_vehiculo: maint.id_vehiculo,
      tipo_mantenimiento: maint.tipo_mantenimiento,
      descripcion_mantenimiento: maint.descripcion_mantenimiento,
      fecha_mantenimiento: maint.fecha_mantenimiento,
      costo_mantenimiento: maint.costo_mantenimiento.toString(),
      kilometraje_mantenimiento: maint.kilometraje_mantenimiento.toString(),
      estado_mantenimiento: maint.estado_mantenimiento
    });
    setFormErrors({});
    setApiError('');
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitLoading(true);
    setApiError('');

    try {
      if (currentMaintenance) {
        await maintenanceService.updateMaintenance(currentMaintenance.id_mantenimiento, formData);
      } else {
        await maintenanceService.createMaintenance(formData);
      }
      setIsFormOpen(false);
      loadData();
    } catch (err) {
      setApiError(err.message || 'Ocurrió un error al procesar el mantenimiento.');
    } finally {
      setIsSubmitLoading(false);
    }
  };

  const handleOpenDelete = (maint) => {
    setMaintenanceToDelete(maint);
    setApiError('');
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsSubmitLoading(true);
    setApiError('');
    try {
      await maintenanceService.deleteMaintenance(maintenanceToDelete.id_mantenimiento);
      setIsDeleteOpen(false);
      setMaintenanceToDelete(null);
      loadData();
    } catch (err) {
      setApiError(err.message || 'Error al eliminar el mantenimiento.');
    } finally {
      setIsSubmitLoading(false);
    }
  };

  const getVehicleInfo = (id_vehiculo) => {
    return vehicles.find(v => v.id_vehiculo === id_vehiculo) || { placa: 'S/P', marca: 'Desconocido', modelo: '' };
  };

  const filteredMaintenances = maintenances.filter(maint => {
    const vInfo = getVehicleInfo(maint.id_vehiculo);
    const query = search.trim().toLowerCase();

    const matchesSearch =
      vInfo.placa.toLowerCase().includes(query) ||
      vInfo.marca.toLowerCase().includes(query) ||
      vInfo.modelo.toLowerCase().includes(query) ||
      maint.descripcion_mantenimiento.toLowerCase().includes(query);

    const matchesStatus = statusFilter ? maint.estado_mantenimiento === statusFilter : true;
    const matchesType = typeFilter ? maint.tipo_mantenimiento === typeFilter : true;

    return matchesSearch && matchesStatus && matchesType;
  });

  const totalItems = filteredMaintenances.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMaintenances.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, typeFilter]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <PageHeader
        title={t('maintenance.title', 'Control de Mantenimiento Preventivo y Taller')}
        subtitle={t('maintenance.subtitle', 'Programación de órdenes de taller, costos acumulados y alertas mecánicas.')}
        badge={
          <Badge variant="warning" pulse size="xs">
            {maintenances.length} Órdenes
          </Badge>
        }
        actions={
          <Button
            variant="primary"
            onClick={handleOpenCreate}
            disabled={vehicles.length === 0}
            className="flex items-center gap-2 w-full sm:w-auto cursor-pointer"
          >
            <Plus size={18} /> {t('maintenance.addBtn', 'Agendar Mantenimiento')}
          </Button>
        }
      />

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 bg-v-dark-soft p-4 rounded-2xl border border-v-dark-border shadow-sm">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-v-gray" />
          <input
            type="text"
            placeholder="Buscar por placa, modelo o descripción de taller..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-v-dark border border-v-dark-border focus:border-primary text-v-white text-sm pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium"
          />
        </div>

        <div className="flex flex-wrap sm:flex-nowrap gap-3">
          <div className="flex items-center gap-1.5 bg-v-dark border border-v-dark-border px-3.5 py-2 rounded-xl shrink-0">
            <SlidersHorizontal size={15} className="text-v-gray" />
            <span className="text-v-gray text-xs font-bold uppercase font-mono">Filtros:</span>
          </div>

          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-48"
          >
            <option value="">Todos los Estados</option>
            {MAINTENANCE_STATUSES.map(st => (
              <option key={st.value} value={st.value}>{st.label}</option>
            ))}
          </Select>

          <Select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-48"
          >
            <option value="">Todos los Tipos</option>
            {MAINTENANCE_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </Select>
        </div>
      </div>

      {/* Main Table Content */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[350px] bg-v-dark-soft border border-v-dark-border rounded-2xl p-12">
          <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-v-gray text-sm font-medium">Cargando órdenes de mantenimiento...</p>
        </div>
      ) : filteredMaintenances.length === 0 ? (
        <EmptyState
          icon={Wrench}
          title="No se encontraron mantenimientos"
          description="No existen órdenes de mantenimiento que coincidan con la búsqueda o filtro seleccionado."
          action={
            (search || statusFilter || typeFilter) ? (
              <Button
                variant="outline"
                onClick={() => { setSearch(''); setStatusFilter(''); setTypeFilter(''); }}
                className="cursor-pointer"
              >
                Limpiar Filtros
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleOpenCreate}
                disabled={vehicles.length === 0}
                className="cursor-pointer"
              >
                <Plus size={16} className="mr-1.5" /> Agendar Primera Orden
              </Button>
            )
          }
        />
      ) : (
        <div className="bg-v-dark-soft border border-v-dark-border rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto w-full custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-v-dark-border bg-v-dark/40 text-xs font-bold uppercase text-v-gray font-mono tracking-wider">
                  <th className="p-4">Vehículo</th>
                  <th className="p-4">Tipo Servicio</th>
                  <th className="p-4">Detalles Taller</th>
                  <th className="p-4">Fecha / Kilometraje</th>
                  <th className="p-4">Costo</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-v-dark-border">
                {currentItems.map((maint) => {
                  const vInfo = getVehicleInfo(maint.id_vehiculo);
                  const statusInfo = MAINTENANCE_STATUSES.find(st => st.value === maint.estado_mantenimiento) || { label: maint.estado_mantenimiento, variant: 'neutral' };
                  return (
                    <tr key={maint.id_mantenimiento} className="hover:bg-v-dark/30 transition-colors group">
                      <td className="p-4">
                        <div className="flex flex-col gap-1">
                          <span className="font-mono text-xs font-extrabold px-2.5 py-1 bg-v-dark border border-v-dark-border rounded-lg text-primary w-fit shadow-sm">
                            {vInfo.placa}
                          </span>
                          <span className="text-v-white text-xs font-bold">{vInfo.marca} {vInfo.modelo}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant={maint.tipo_mantenimiento === 'PREVENTIVO' ? 'emerald' : maint.tipo_mantenimiento === 'CORRECTIVO' ? 'danger' : 'info'}>
                          {maint.tipo_mantenimiento}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <p className="text-v-white text-sm max-w-xs truncate font-medium" title={maint.descripcion_mantenimiento}>
                          {maint.descripcion_mantenimiento}
                        </p>
                      </td>
                      <td className="p-4">
                        <div className="text-v-white text-xs font-bold font-mono">{maint.fecha_mantenimiento}</div>
                        <div className="text-v-gray text-[11px] font-mono mt-0.5">{maint.kilometraje_mantenimiento.toLocaleString()} km</div>
                      </td>
                      <td className="p-4 font-mono font-extrabold text-v-white text-sm">
                        ${maint.costo_mantenimiento.toLocaleString('es-CO')} <span className="text-[10px] text-v-gray font-normal font-sans">COP</span>
                      </td>
                      <td className="p-4">
                        <Badge variant={statusInfo.variant} pulse={statusInfo.pulse}>
                          {statusInfo.label}
                        </Badge>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(maint)}
                            className="p-2 hover:bg-v-dark border border-transparent hover:border-v-dark-border rounded-xl text-v-gray hover:text-v-white transition-all cursor-pointer"
                            title="Editar Orden"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleOpenDelete(maint)}
                            className="p-2 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 rounded-xl text-v-gray hover:text-red-400 transition-all cursor-pointer"
                            title="Eliminar Orden"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-v-dark-border bg-v-dark/30 text-xs text-v-gray font-medium">
              <span>
                Mostrando <strong className="text-v-white">{indexOfFirstItem + 1}</strong> - <strong className="text-v-white">{Math.min(indexOfLastItem, totalItems)}</strong> de <strong className="text-v-white">{totalItems}</strong> órdenes
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="p-2 rounded-xl border border-v-dark-border bg-v-dark text-v-gray hover:text-v-white disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="px-3 font-bold text-v-white font-mono">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-xl border border-v-dark-border bg-v-dark text-v-gray hover:text-v-white disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* CREATE & EDIT MODAL */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-2xl bg-v-dark-soft border border-v-dark-border rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col z-10 text-left"
            >
              <div className="flex justify-between items-center px-6 py-5 border-b border-v-dark-border bg-v-dark/20">
                <div>
                  <h3 className="text-xl font-extrabold text-v-white">
                    {currentMaintenance ? 'Editar Orden de Mantenimiento' : 'Agendar Nuevo Mantenimiento'}
                  </h3>
                  <p className="text-xs text-v-gray mt-0.5">
                    {currentMaintenance ? 'Actualice la orden de taller.' : 'Agende un servicio mecánico preventivo o correctivo.'}
                  </p>
                </div>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="p-2 text-v-gray hover:text-v-white hover:bg-v-dark-border/40 rounded-xl transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar">
                {apiError && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-semibold flex items-start gap-2.5">
                    <AlertTriangle className="shrink-0 mt-0.5" size={16} />
                    <span>{apiError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-v-gray font-mono">Vehículo</label>
                    <Select
                      name="id_vehiculo"
                      value={formData.id_vehiculo}
                      onChange={handleInputChange}
                      disabled={!!currentMaintenance}
                    >
                      {vehicles.map(v => (
                        <option key={v.id_vehiculo} value={v.id_vehiculo}>
                          {v.placa} — {v.marca} {v.modelo}
                        </option>
                      ))}
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-v-gray font-mono">Tipo Mantenimiento</label>
                    <Select
                      name="tipo_mantenimiento"
                      value={formData.tipo_mantenimiento}
                      onChange={handleInputChange}
                    >
                      {MAINTENANCE_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </Select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-v-gray font-mono">Observaciones / Taller</label>
                  <textarea
                    name="descripcion_mantenimiento"
                    rows="3"
                    placeholder="Detalle los servicios requeridos, repuestos a cambiar..."
                    value={formData.descripcion_mantenimiento}
                    onChange={handleInputChange}
                    className={cn(
                      "w-full bg-v-dark border focus:border-primary text-v-white text-sm p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all resize-none custom-scrollbar font-medium",
                      formErrors.descripcion_mantenimiento ? "border-red-500" : "border-v-dark-border"
                    )}
                  />
                  {formErrors.descripcion_mantenimiento && <p className="text-xs text-red-400 mt-0.5 font-medium">{formErrors.descripcion_mantenimiento}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-v-gray font-mono">Fecha</label>
                    <input
                      type="date"
                      name="fecha_mantenimiento"
                      value={formData.fecha_mantenimiento}
                      onChange={handleInputChange}
                      className={cn(
                        "w-full bg-v-dark border focus:border-primary text-v-white text-sm px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-mono",
                        formErrors.fecha_mantenimiento ? "border-red-500" : "border-v-dark-border"
                      )}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-v-gray font-mono">Kilometraje Orden</label>
                    <input
                      type="number"
                      name="kilometraje_mantenimiento"
                      placeholder="12000"
                      value={formData.kilometraje_mantenimiento}
                      onChange={handleInputChange}
                      className={cn(
                        "w-full bg-v-dark border focus:border-primary text-v-white text-sm px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-mono",
                        formErrors.kilometraje_mantenimiento ? "border-red-500" : "border-v-dark-border"
                      )}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-v-gray font-mono">Costo (COP)</label>
                    <input
                      type="number"
                      name="costo_mantenimiento"
                      placeholder="150000"
                      value={formData.costo_mantenimiento}
                      onChange={handleInputChange}
                      className={cn(
                        "w-full bg-v-dark border focus:border-primary text-v-white text-sm px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-mono",
                        formErrors.costo_mantenimiento ? "border-red-500" : "border-v-dark-border"
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-v-gray font-mono">Estado Mantenimiento</label>
                  <Select
                    name="estado_mantenimiento"
                    value={formData.estado_mantenimiento}
                    onChange={handleInputChange}
                  >
                    {MAINTENANCE_STATUSES.map(st => (
                      <option key={st.value} value={st.value}>{st.label}</option>
                    ))}
                  </Select>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-v-dark-border">
                  <Button type="button" variant="ghost" onClick={() => setIsFormOpen(false)} disabled={isSubmitLoading} className="cursor-pointer">
                    Cancelar
                  </Button>
                  <Button type="submit" variant="primary" isLoading={isSubmitLoading} className="cursor-pointer">
                    {currentMaintenance ? 'Guardar Cambios' : 'Agendar'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DELETE CONFIRMATION MODAL */}
      <AnimatePresence>
        {isDeleteOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDeleteOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-v-dark-soft border border-v-dark-border rounded-2xl shadow-2xl p-6 z-10 space-y-6 text-left"
            >
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center shrink-0">
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-v-white">¿Confirmar cancelación de orden?</h3>
                  <p className="text-xs text-v-gray mt-1.5 leading-relaxed">
                    Está a punto de eliminar la orden de taller para la unidad <strong className="text-v-white font-mono">{getVehicleInfo(maintenanceToDelete?.id_vehiculo).placa}</strong>.
                  </p>
                </div>
              </div>

              {apiError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-semibold flex items-start gap-2">
                  <AlertTriangle className="shrink-0 mt-0.5" size={14} />
                  <span>{apiError}</span>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <Button variant="ghost" onClick={() => setIsDeleteOpen(false)} disabled={isSubmitLoading} className="cursor-pointer">
                  Cancelar
                </Button>
                <Button
                  variant="outline"
                  onClick={handleConfirmDelete}
                  isLoading={isSubmitLoading}
                  className="bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border-red-500/20 cursor-pointer"
                >
                  Confirmar Eliminar
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Maintenance;
