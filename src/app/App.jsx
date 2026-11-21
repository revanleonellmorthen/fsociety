import React from 'react';
import { RouterProvider, useRouter } from './router';
import AppLayout from '../components/layout/AppLayout';
import Home from '../pages/home/Home';
import RiseModule from '../pages/rise/RiseModule';
import TrackPlaceholder from '../pages/track/TrackPlaceholder';

const AppContent = () => {
  const { currentPath } = useRouter();

  const renderCurrentPage = () => {
    if (currentPath.startsWith('/rise')) {
      return <RiseModule />;
    }
    if (currentPath.startsWith('/track')) {
      return <TrackPlaceholder />;
    }
    return <Home />;
  };

  /* RISE module has its own layout (sidebar+topbar) so no AppLayout wrapper */
  if (currentPath.startsWith('/rise')) {
    return <RiseModule />;
  }

  return (
    <AppLayout>
      {renderCurrentPage()}
    </AppLayout>
  );
};

export const App = () => {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
};

export default App;
