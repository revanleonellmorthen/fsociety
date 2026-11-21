import { HashRouter, Routes, Route } from 'react-router-dom';
import TrackLayout from './layouts/TrackLayout';
import Overview from './pages/Overview';
import KRS from './pages/KRS';
import KHS from './pages/KHS';
import AcademicRecords from './pages/AcademicRecords';
import Billing from './pages/Billing';
import Admissions from './pages/Admissions';
import AcademicJourney from './pages/AcademicJourney';

/**
 * TrackModule — Integration Entry Point
 *
 * Usage in the main Cakrawala app:
 *   import TrackModule from './track/TrackModule';
 *   <TrackModule />
 *
 * Uses HashRouter internally so it does not conflict with
 * the global BrowserRouter in the main Cakrawala application.
 * When integrating, replace HashRouter with the appropriate
 * nested routing strategy (e.g. nested <Routes> under /track/*).
 */
export default function TrackModule() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<TrackLayout />}>
          <Route index element={<Overview />} />
          <Route path="krs" element={<KRS />} />
          <Route path="khs" element={<KHS />} />
          <Route path="academic-journey" element={<AcademicJourney />} />
          <Route path="academic-records" element={<AcademicRecords />} />
          <Route path="billing" element={<Billing />} />
          <Route path="admissions" element={<Admissions />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
