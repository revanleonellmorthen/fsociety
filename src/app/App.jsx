import React from 'react';
import { RouterProvider, useRouter } from './router';
import AppLayout from '../components/layout/AppLayout';
import Home from '../pages/home/Home';
<<<<<<< HEAD
import RiseModule from '../pages/rise/RiseModule';
import TrackPlaceholder from '../pages/track/TrackPlaceholder';
=======
import RisePlaceholder from '../pages/rise/RisePlaceholder';
import TrackModule from '../pages/track/TrackModule';
>>>>>>> 30a6e27bfed7e0d425c91fdb987e37c56bccf6e8

const AppContent = () => {
  const { currentPath } = useRouter();

<<<<<<< HEAD
  const renderCurrentPage = () => {
    if (currentPath.startsWith('/rise')) {
      return <RiseModule />;
    }
    if (currentPath.startsWith('/track')) {
      return <TrackPlaceholder />;
    }
    return <Home />;
  };
=======
  // TrackModule has its own full layout (sidebar + header via HashRouter),
  // so it must render OUTSIDE of AppLayout to avoid double-wrapping.
  if (currentPath.startsWith('/track')) {
    return <TrackModule />;
  }
>>>>>>> 30a6e27bfed7e0d425c91fdb987e37c56bccf6e8

  /* RISE module has its own layout (sidebar+topbar) so no AppLayout wrapper */
  if (currentPath.startsWith('/rise')) {
    return <RiseModule />;
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
