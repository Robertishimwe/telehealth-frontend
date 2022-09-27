import React from 'react';
import Iconify from '../components/dashboard/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Users',
    path: '/dashboard/users',
    icon: getIcon('eva:people-fill'),
    class: 'nav-item-users',
    id: 'nav-item-users',
  },
  {
    title: 'Appointments',
    path: '/dashboard/appointments',
    icon: getIcon('teenyicons:appointments-solid'),
  },
  {
    title: 'Patients',
    path: '/dashboard/patients',
    icon: getIcon('fluent:patient-32-filled'),
  },
  {
    title: 'Hospitals',
    path: '/dashboard/hospitals',
    icon: getIcon('ic:baseline-local-hospital'),
  },
  {
    title: 'Add new employee',
    path: '/dashboard/add-employee',
    icon: getIcon('eva:person-add-fill'),
  },
];

export default navConfig;
