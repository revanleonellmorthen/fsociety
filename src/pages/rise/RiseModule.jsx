import { HashRouter, Routes, Route } from 'react-router-dom';
import RiseLayout from './layouts/RiseLayout';
import Overview from './pages/Overview/Overview';
import Courses from './pages/Courses/Courses';
import CourseDetail from './pages/Courses/CourseDetail';
import Assignments from './pages/Assignments/Assignments';
import AssignmentDetail from './pages/Assignments/AssignmentDetail';
import Schedule from './pages/Schedule/Schedule';
import Attendance from './pages/Attendance/Attendance';
import Materials from './pages/Materials/Materials';
import GroupWorkspace from './pages/GroupWorkspace/GroupWorkspace';

/**
 * RiseModule — Integration Entry Point
 *
 * Usage in the main Cakrawala app:
 *   import RiseModule from './rise/RiseModule';
 *   <RiseModule />
 *
 * Uses HashRouter internally so it does not conflict with
 * the global BrowserRouter in the main Cakrawala application.
 * When integrating, replace HashRouter with the appropriate
 * nested routing strategy (e.g. nested <Routes> under /rise/*).
 */
export default function RiseModule() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<RiseLayout />}>
          <Route index element={<Overview />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:courseId" element={<CourseDetail />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="assignments/:assignmentId" element={<AssignmentDetail />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="materials" element={<Materials />} />
          <Route path="groups" element={<GroupWorkspace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
