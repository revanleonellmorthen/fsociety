import React from 'react';
import WelcomeSection from '../../components/dashboard/WelcomeSection';
import PendingAssignmentsSection from '../../components/dashboard/PendingAssignmentsSection';
import TodayScheduleSection from '../../components/dashboard/TodayScheduleSection';
import CampusAnnouncementsSection from '../../components/dashboard/CampusAnnouncementsSection';
import BillingSummarySection from '../../components/dashboard/BillingSummarySection';
import './home.css';

/**
 * Cakrawala Home Page (Revised)
 * Minimal, intentional academic landing dashboard containing exactly five sections:
 * 1. Welcome Section
 * 2. Pending Assignments (RISE)
 * 3. Today's Schedule (Classes today)
 * 4. Campus Announcements
 * 5. Billing Information (UKT)
 */
export const Home = () => {
  return (
    <div className="cw-home-wrapper">
      {/* SECTION A: Welcome Section */}
      <WelcomeSection />

      {/* Main 2-Column Balanced Editorial Layout */}
      <div className="cw-home-grid">
        {/* Left Column: Core daily academic items */}
        <main className="cw-main-col">
          {/* SECTION B: Pending Assignments */}
          <PendingAssignmentsSection />

          {/* SECTION D: Today's Schedule */}
          <TodayScheduleSection />
        </main>

        {/* Right Column: Institutional updates & status */}
        <aside className="cw-side-col">
          {/* SECTION C: Campus Announcements */}
          <CampusAnnouncementsSection />

          {/* SECTION E: Billing Information */}
          <BillingSummarySection />
        </aside>
      </div>
    </div>
  );
};

export default Home;
