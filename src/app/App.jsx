import React from 'react';
import { RouterProvider, useRouter } from './router';
import AppLayout from '../components/layout/AppLayout';
import Home from '../pages/home/Home';
import RisePlaceholder from '../pages/rise/RisePlaceholder';
import TrackModule from '../pages/track/TrackModule';

const AppContent = () => {
  const { currentPath } = useRouter();

  // TrackModule has its own full layout (sidebar + header via HashRouter),
  // so it must render OUTSIDE of AppLayout to avoid double-wrapping.
  if (currentPath.startsWith('/track')) {
    return <TrackModule />;
  }

  return (
    <AppLayout>
      {currentPath.startsWith('/rise') ? <RisePlaceholder /> : <Home />}
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
