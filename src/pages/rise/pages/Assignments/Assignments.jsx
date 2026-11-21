import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ClipboardList,
  Search,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Filter,
  ArrowRight
} from 'lucide-react';
import { assignments } from '../../data/assignments';
import RiseHeader from '../../components/RiseHeader';
import RiseBadge from '../../components/RiseBadge';
import RiseEmptyState from '../../components/RiseEmptyState';

export default function Assignments() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');

  const counts = {
    all: assignments.length,
    upcoming: assignments.filter((a) => a.status === 'upcoming').length,
    'in-progress': assignments.filter((a) => a.status === 'in-progress').length,
    submitted: assignments.filter((a) => a.status === 'submitted').length,
    overdue: assignments.filter((a) => a.status === 'overdue').length,
  };

  const tabs = [
    { id: 'all', label: 'Semua Tugas', count: counts.all },
    { id: 'upcoming', label: 'Akan Datang', count: counts.upcoming },
    { id: 'in-progress', label: 'Sedang Dikerjakan', count: counts['in-progress'] },
    { id: 'submitted', label: 'Sudah Dikumpulkan', count: counts.submitted },
    { id: 'overdue', label: 'Terlambat', count: counts.overdue },
  ];

  const uniqueCourses = Array.from(new Set(assignments.map((a) => a.courseCode)));

  const filteredAssignments = assignments.filter((asg) => {
    // Tab filter
    if (activeTab !== 'all' && asg.status !== activeTab) {
      return false;
    }
    // Course filter
    if (selectedCourse !== 'all' && asg.courseCode !== selectedCourse) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = asg.title.toLowerCase().includes(q);
      const matchDesc = asg.description.toLowerCase().includes(q);
      const matchCourse = asg.courseName.toLowerCase().includes(q) || asg.courseCode.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchCourse) return false;
    }
    return true;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'submitted':
        return <RiseBadge variant="success" dot>Submitted</RiseBadge>;
      case 'in-progress':
        return <RiseBadge variant="warning" dot>In Progress</RiseBadge>;
      case 'overdue':
        return <RiseBadge variant="danger" dot>Overdue</RiseBadge>;
      default:
        return <RiseBadge variant="info" dot>Upcoming</RiseBadge>;
    }
  };

  const formatDueDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="rise-assignments-page">
      <RiseHeader
        title="Daftar Tugas Mahasiswa"
        subtitle="Kelola tenggat waktu, pengumpulan berkas praktikum, dan status penilaian seluruh mata kuliah."
      />

      {/* Tabs */}
      <div className="rise-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`rise-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span>{tab.label}</span>
            <span className="rise-tab-badge">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="rise-search-filter-row">
        <div className="rise-search-wrapper">
          <span className="rise-search-icon">
            <Search size={16} />
          </span>
          <input
            type="text"
            className="rise-search-input"
            placeholder="Cari judul tugas, topik, atau mata kuliah..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="rise-filter-group">
          <select
            className="rise-filter-select"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="all">Semua Mata Kuliah</option>
            {uniqueCourses.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Assignments List */}
      {filteredAssignments.length === 0 ? (
        <RiseEmptyState
          icon={ClipboardList}
          title="Tidak Ada Tugas Ditemukan"
          message="Tidak ada tugas yang sesuai dengan kriteria filter atau pencarian Anda."
          action={
            <button
              className="rise-btn rise-btn-outline rise-btn-sm"
              onClick={() => {
                setActiveTab('all');
                setSearchQuery('');
                setSelectedCourse('all');
              }}
            >
              Reset Filter
            </button>
          }
        />
      ) : (
        <div className="rise-assignment-list">
          {filteredAssignments.map((item) => (
            <div
              key={item.id}
              className="rise-assignment-item"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/assignments/${item.id}`)}
            >
              <div className="rise-assignment-left">
                <span className={`rise-assignment-status-dot ${item.status}`} />
                <div className="rise-assignment-info">
                  <h4>{item.title}</h4>
                  <p
                    style={{
                      fontSize: '12.5px',
                      color: '#65747A',
                      margin: '4px 0 6px',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {item.description}
                  </p>
                  <div className="rise-assignment-meta">
                    <span className="rise-assignment-course">
                      {item.courseCode} · {item.courseName}
                    </span>
                    <span>•</span>
                    <span className="rise-assignment-due">
                      <Clock size={12} /> Tenggat: {formatDueDate(item.dueDate)}
                    </span>
                    {item.grade !== null && (
                      <>
                        <span>•</span>
                        <span style={{ color: '#10B981', fontWeight: 700 }}>
                          Nilai: {item.grade}/100
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
                {getStatusBadge(item.status)}
                <div
                  style={{
                    color: '#07455C',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '13px',
                    fontWeight: 600,
                  }}
                >
                  Detail <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
