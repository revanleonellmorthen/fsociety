import React from 'react';
import { RouterProvider, useRouter } from './router';
import AppLayout from '../components/layout/AppLayout';
import Home from '../pages/home/Home';
import RisePlaceholder from '../pages/rise/RisePlaceholder';
import TrackPlaceholder from '../pages/track/TrackPlaceholder';

const AppContent = () => {
  const { currentPath } = useRouter();

  const renderCurrentPage = () => {
    if (currentPath.startsWith('/rise')) {
      return <RisePlaceholder />;
    }
    if (currentPath.startsWith('/track')) {
      return <TrackPlaceholder />;
    }
    return <Home />;
  };

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
