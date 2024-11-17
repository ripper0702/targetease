import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as CustomThemeProvider } from './contexts/ThemeContext';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

// Components
import LandingPage from './components/landing/LandingPage';
import Dashboard from './components/dashboard/Dashboard';
import Analytics from './components/analytics/Analytics';
import Campaigns from './components/campaigns/Campaigns';
import Reports from './components/reports/Reports';
import Calendar from './components/calendar/Calendar';
import TeamManagement from './components/team/TeamManagement';
import Templates from './components/templates/Templates';
import BudgetManagement from './components/budget/BudgetManagement';
import Payments from './components/payments/Payments';
import LocalInsights from './components/insights/LocalInsights';
import OfflineTracking from './components/tracking/OfflineTracking';
import Settings from './components/settings/Settings';
import DashboardLayout from './components/layout/DashboardLayout';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CustomThemeProvider>
        <CssBaseline />
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/campaigns" element={<Campaigns />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/team" element={<TeamManagement />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/budget" element={<BudgetManagement />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/local-insights" element={<LocalInsights />} />
              <Route path="/offline-tracking" element={<OfflineTracking />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

            {/* Redirect unmatched routes to dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </CustomThemeProvider>
    </ThemeProvider>
  );
}

export default App;
