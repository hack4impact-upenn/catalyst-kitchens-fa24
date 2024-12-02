import React from 'react';
import { Outlet, Navigate, Form } from 'react-router-dom';
import {
  Person,
  PieChart,
  TableChart,
  ArrowUpward,
  Add,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { getData, useData } from './api.tsx';
import Sidebar from '../components/Sidebar.tsx';
import { RootState } from './redux/store';

interface IDynamicElementProps {
  unAuthPath: string;
  authPath: string;
}

/**
 * A wrapper component whose children routes which can only be navigated to if the user is not authenticated.
 */
function UnauthenticatedRoutesWrapper() {
  const data = useData('auth/authstatus');
  if (data === null) return null;
  return !data.error ? <Navigate to="/" /> : <Outlet />;
}

/**
 * A wrapper component whose children routes which can only be navigated to if the user is  authenticated.
 */
function ProtectedRoutesWrapper() {
  const data = useData('auth/authstatus');
  const user = useSelector((state: RootState) => state.user);
  const data2 = useData('admin/adminstatus');
  if (data === null) return null;
  const validOrg = getData(`/organization/${user.email}`);
  const links = [
    { name: 'Data Visualization', icon: PieChart, to: '/outcome-viz' },
  ];
  if (validOrg !== null) {
    links.push({ name: 'Submit Data', icon: ArrowUpward, to: '/outcome-form' });
  }
  if (data2 !== null) {
    links.push({
      name: 'Organization Dashboard',
      icon: TableChart,
      to: '/organizations',
    });
    links.push({ name: 'User Dashboard', icon: Person, to: '/users' });
  }
  return !data.error ? (
    <div style={{ display: 'flex' }}>
      <Sidebar links={links} />
      <div style={{ marginLeft: '250px', padding: '20px', flexGrow: 1 }}>
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
}
/**
 * A wrapper component whose children routes which can only be navigated to if the user is an admin.
 */
function AdminRoutesWrapper() {
  const data = useData('admin/adminstatus');
  const user = useSelector((state: RootState) => state.user);
  const validOrg = getData(`/organization/${user.email}`);
  if (data === null) return null;
  const links = [
    { name: 'Data Visualization', icon: PieChart, to: '/outcome-viz' },
  ];
  if (validOrg !== null) {
    links.push({ name: 'Submit Data', icon: ArrowUpward, to: '/outcome-form' });
  }
  links.push({
    name: 'Organization Dashboard',
    icon: TableChart,
    to: '/organizations',
  });
  links.push({ name: 'User Dashboard', icon: Person, to: '/users' });
  return !data.error ? (
    <div style={{ display: 'flex' }}>
      <Sidebar links={links} />
      <div style={{ marginLeft: '250px', padding: '20px', flexGrow: 1 }}>
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
}

/**
 * A wrapper which navigates to a different route depending on if the user is authenticated or not.
 * @param unAuthPath - The path to navigate to if the user is not authenticated. It should be of the form "/path".
 * @param authPath - The path to navigate to if the user is  authenticated. It should be of the form "/path".
 */
function DynamicRedirect({ unAuthPath, authPath }: IDynamicElementProps) {
  const data = useData('auth/authstatus');
  if (data === null) return null;
  return !data.error ? (
    <Navigate to={authPath} />
  ) : (
    <Navigate to={unAuthPath} />
  );
}

export {
  UnauthenticatedRoutesWrapper,
  ProtectedRoutesWrapper,
  AdminRoutesWrapper,
  DynamicRedirect,
};
