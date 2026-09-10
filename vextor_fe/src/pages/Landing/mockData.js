/**
 * MOCK DATA PARA DEMOSTRACIÓN VISUAL EN LA LANDING PAGE
 *
 * ⚠️ IMPORTANTE:
 * Todos los datos contenidos en este archivo son 100% ficticios e inventados
 * para uso exclusivo en la previsualización comercial de VEXTOR.
 * NO provienen de bases de datos, APIs, ni expedientes reales.
 */

export const mockVehiclesData = {
  summary: {
    totalRegistered: 18,
    activeInRoute: 12,
    inMaintenance: 2,
    available: 4,
  },
  items: [
    {
      id: 'vxt-001',
      code: 'VXT-001',
      plate: 'VXT-101',
      model: 'Mercedes Sprinter 2023',
      capacity: '19 pasajeros',
      company: 'Transporte Nova S.A.S.',
      status: 'En Ruta',
      statusType: 'success',
      documents: {
        soat: { status: 'Vigente', days: 240, ok: true },
        techno: { status: 'Vigente', days: 180, ok: true },
      },
    },
    {
      id: 'vxt-002',
      code: 'VXT-002',
      plate: 'VXT-202',
      model: 'Chevrolet NHR 2022',
      capacity: '24 pasajeros',
      company: 'Movilidad Integral',
      status: 'Mantenimiento',
      statusType: 'warning',
      documents: {
        soat: { status: 'Vigente', days: 120, ok: true },
        oilCheck: { status: 'Taller programado', ok: false },
      },
    },
    {
      id: 'vxt-003',
      code: 'VXT-003',
      plate: 'VXT-303',
      model: 'Renault Master 2021',
      capacity: '16 pasajeros',
      company: 'Servicios Vial Express',
      status: 'Disponible',
      statusType: 'success',
      documents: {
        policy: { status: 'Al día', ok: true },
        nextService: 'Ruta Empresarial 14:00',
      },
    },
  ],
};

export const mockDriversData = {
  summary: {
    totalActive: 24,
    onDuty: 14,
    available: 10,
  },
  items: [
    {
      id: 'drv-001',
      initials: 'CM',
      name: 'Carlos Mendoza',
      licenseCategory: 'Licencia C2',
      licenseExpiry: 'Nov 2026',
      assignedVehicle: 'VXT-001',
      company: 'Transporte Nova S.A.S.',
      status: 'Asignado',
    },
    {
      id: 'drv-002',
      initials: 'LT',
      name: 'Laura Torres',
      licenseCategory: 'Licencia C3',
      licenseExpiry: 'Ago 2025',
      assignedVehicle: 'VXT-002',
      company: 'Movilidad Integral',
      status: 'Asignado',
    },
    {
      id: 'drv-003',
      initials: 'AR',
      name: 'Andrés Ramírez',
      licenseCategory: 'Licencia C2',
      licenseExpiry: 'Ene 2027',
      assignedVehicle: 'VXT-003',
      company: 'Servicios Vial Express',
      status: 'Disponible',
    },
  ],
};

export const mockRoutesData = {
  summary: {
    scheduledToday: 12,
    completed: 5,
    inProgress: 4,
    pending: 3,
  },
  items: [
    {
      id: 'rt-001',
      name: 'Ruta Norte • Zona Franca - Suba',
      type: 'Empresarial',
      vehicle: 'VXT-001',
      driver: 'Carlos Mendoza',
      schedule: '06:00 AM - 07:30 AM',
      company: 'Transporte Nova S.A.S.',
      status: 'En Curso',
      statusType: 'success',
    },
    {
      id: 'rt-002',
      name: 'Ruta Centro • Col. San José - Chapinero',
      type: 'Escolar',
      vehicle: 'VXT-003',
      driver: 'Andrés Ramírez',
      schedule: '02:15 PM - 03:45 PM',
      company: 'Servicios Vial Express',
      status: 'Programada',
      statusType: 'neutral',
    },
    {
      id: 'rt-003',
      name: 'Ruta Occidente • Conectividad Aeropuerto - Calle 26',
      type: 'Turismo',
      vehicle: 'VXT-002',
      driver: 'Laura Torres',
      schedule: '05:00 PM - 06:30 PM',
      company: 'Movilidad Integral',
      status: 'Programada',
      statusType: 'neutral',
    },
  ],
};

export const mockMaintenanceData = {
  summary: {
    scheduledThisWeek: 1,
    inWorkshop: 1,
    completedThisMonth: 8,
  },
  items: [
    {
      id: 'maint-001',
      title: 'Cambio de Aceite y Filtros',
      vehicle: 'VXT-002',
      mileageTarget: '45.000 KM (Actual: 44.820 KM)',
      details: 'Taller Autorizado VEXTOR Demo • Estimado 2 horas de servicio',
      status: 'Programado',
      statusType: 'warning',
    },
    {
      id: 'maint-002',
      title: 'Inspección de Frenos y Suspensión',
      vehicle: 'VXT-001',
      mileageTarget: 'Completado exitosamente el 12 de Febrero',
      details: 'Próxima revisión preventiva: Mayo 2025',
      status: 'Completado',
      statusType: 'success',
    },
  ],
};

export const mockAlertsData = {
  summary: {
    activeRisk: 0,
    preventiveWarnings: 2,
  },
  items: [
    {
      id: 'alt-001',
      type: 'warning',
      title: 'Aviso de Vencimiento SOAT Próximo (15 Días)',
      description: 'El SOAT de la unidad VXT-001 vencerá en 15 días. Haga clic para simular la renovación digital.',
    },
    {
      id: 'alt-002',
      type: 'info',
      title: 'Notificación de Mantenimiento Preventivo',
      description: 'La unidad VXT-002 está a 180 KM de cumplir el ciclo de revisión de pastillas de freno.',
    },
  ],
};

export const mockReportsData = {
  kpis: [
    {
      id: 'kpi-001',
      label: 'Disponibilidad de Flota',
      value: '94.4%',
      subtext: '17 de 18 unidades operativas',
      color: 'emerald',
    },
    {
      id: 'kpi-002',
      label: 'Cumplimiento de Rutas',
      value: '98.2%',
      subtext: '340 itinerarios este mes',
      color: 'primary',
    },
    {
      id: 'kpi-003',
      label: 'Doc. al Día',
      value: '100%',
      subtext: '0 sanciones o faltas',
      color: 'white',
    },
    {
      id: 'kpi-004',
      label: 'Eficiencia Preventiva',
      value: '+35%',
      subtext: 'Reducción de costos correctivos',
      color: 'emerald',
    },
  ],
};
