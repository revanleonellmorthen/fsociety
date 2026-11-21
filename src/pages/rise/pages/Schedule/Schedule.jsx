import React, { useState } from 'react';
import {
  CalendarDays,
  Clock,
  MapPin,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { schedule, dayNames } from '../../data/schedule';
import RiseHeader from '../../components/RiseHeader';
import RiseBadge from '../../components/RiseBadge';
import RiseEmptyState from '../../components/RiseEmptyState';

export default function Schedule() {
  const [viewMode, setViewMode] = useState('daily'); // 'daily' | 'weekly'
  const [selectedDay, setSelectedDay] = useState('Monday');

  const daysMapping = [
    { key: 'Monday', indo: 'Senin' },
    { key: 'Tuesday', indo: 'Selasa' },
    { key: 'Wednesday', indo: 'Rabu' },
    { key: 'Thursday', indo: 'Kamis' },
    { key: 'Friday', indo: 'Jumat' },
  ];

  const dailyClasses = schedule
    .filter((s) => s.day === selectedDay)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <div className="rise-schedule-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
        <RiseHeader
          title="Jadwal Perkuliahan"
          subtitle="Jadwal kegiatan tatap muka ruang kelas, praktikum laboratorium, dan sesi tutorial daring."
        />

        {/* View Toggle */}
        <div className="rise-tabs-pills">
          <button
            className={`rise-tab-pill ${viewMode === 'daily' ? 'active' : ''}`}
            onClick={() => setViewMode('daily')}
          >
            Tampilan Harian (Daily)
          </button>
          <button
            className={`rise-tab-pill ${viewMode === 'weekly' ? 'active' : ''}`}
            onClick={() => setViewMode('weekly')}
          >
            Tampilan Mingguan (Weekly)
          </button>
        </div>
      </div>

      {/* DAILY VIEW */}
      {viewMode === 'daily' && (
        <div>
          {/* Day Selector Buttons */}
          <div
            style={{
              display: 'flex',
              gap: '10px',
              overflowX: 'auto',
              paddingBottom: '8px',
              marginBottom: '20px',
            }}
          >
            {daysMapping.map((d) => {
              const isSelected = selectedDay === d.key;
              const count = schedule.filter((s) => s.day === d.key).length;
              return (
                <button
                  key={d.key}
                  type="button"
                  onClick={() => setSelectedDay(d.key)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '10px',
                    border: isSelected ? '1.5px solid #CEAE65' : '1px solid #DDE5E4',
                    background: isSelected ? '#07455C' : '#FFFFFF',
                    color: isSelected ? '#FFFFFF' : '#082F3D',
                    fontWeight: 600,
                    fontSize: '13.5px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span>{d.indo}</span>
                  <span
                    style={{
                      background: isSelected ? 'rgba(206, 174, 101, 0.3)' : '#F1F5F9',
                      color: isSelected ? '#CEAE65' : '#65747A',
                      padding: '2px 7px',
                      borderRadius: '9999px',
                      fontSize: '11px',
                    }}
                  >
                    {count} Kelas
                  </span>
                </button>
              );
            })}
          </div>

          {/* Classes for the Selected Day */}
          {dailyClasses.length === 0 ? (
            <RiseEmptyState
              icon={CalendarDays}
              title={`Tidak Ada Jadwal Kuliah Hari ${daysMapping.find(d => d.key === selectedDay)?.indo}`}
              message="Anda bebas dari aktivitas tatap muka kelas pada hari ini. Manfaatkan waktu untuk riset kelompok atau menyelesaikan tugas."
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {dailyClasses.map((item) => (
                <div
                  key={item.id}
                  className="rise-card"
                  style={{
                    borderLeft: `5px solid ${item.type === 'Lab' ? '#CEAE65' : '#07455C'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '18px 22px',
                    flexWrap: 'wrap',
                    gap: '16px',
                  }}
                >
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <div
                      style={{
                        minWidth: '110px',
                        fontWeight: 800,
                        fontSize: '15px',
                        color: '#07455C',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                      }}
                    >
                      <span>{item.startTime}</span>
                      <span style={{ fontSize: '11px', color: '#65747A', fontWeight: 500 }}>
                        sampai {item.endTime}
                      </span>
                    </div>

                    <div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                        <RiseBadge variant="primary">{item.courseCode}</RiseBadge>
                        <RiseBadge variant={item.type === 'Lab' ? 'gold' : 'neutral'}>
                          {item.type}
                        </RiseBadge>
                        {item.isOnline && (
                          <RiseBadge variant="info">Daring (Zoom)</RiseBadge>
                        )}
                      </div>
                      <h3 style={{ margin: '0 0 6px', fontSize: '16px', color: '#082F3D' }}>
                        {item.courseName}
                      </h3>
                      <div
                        style={{
                          fontSize: '12.5px',
                          color: '#65747A',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '14px',
                          flexWrap: 'wrap',
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <MapPin size={13} /> {item.room}
                        </span>
                        <span>•</span>
                        <span>Dosen: {item.lecturer}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    {item.isOnline && item.zoomLink ? (
                      <a
                        href={item.zoomLink}
                        target="_blank"
                        rel="noreferrer"
                        className="rise-btn rise-btn-primary rise-btn-sm"
                        style={{ textDecoration: 'none' }}
                      >
                        <ExternalLink size={14} /> Buka Ruang Zoom
                      </a>
                    ) : (
                      <button
                        type="button"
                        className="rise-btn rise-btn-outline rise-btn-sm"
                        onClick={() => alert(`Ruang perkuliahan: ${item.room}`)}
                      >
                        Info Ruangan
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* WEEKLY VIEW */}
      {viewMode === 'weekly' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '14px',
            alignItems: 'start',
          }}
        >
          {daysMapping.map((d) => {
            const classesThisDay = schedule
              .filter((s) => s.day === d.key)
              .sort((a, b) => a.startTime.localeCompare(b.startTime));

            return (
              <div key={d.key} className="rise-schedule-day-column">
                <div className="rise-schedule-day-header">
                  <h3>{d.indo}</h3>
                  <span className="rise-schedule-day-badge">
                    {classesThisDay.length} Kelas
                  </span>
                </div>

                <div className="rise-schedule-slots">
                  {classesThisDay.length === 0 ? (
                    <div
                      style={{
                        padding: '24px 10px',
                        textAlign: 'center',
                        color: '#94A3A8',
                        fontSize: '12px',
                      }}
                    >
                      Tidak ada kelas
                    </div>
                  ) : (
                    classesThisDay.map((c) => (
                      <div
                        key={c.id}
                        className="rise-schedule-slot"
                        style={{
                          borderLeftColor: c.type === 'Lab' ? '#CEAE65' : '#07455C',
                        }}
                      >
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: '11px',
                            color: '#07455C',
                            marginBottom: '3px',
                          }}
                        >
                          {c.startTime} - {c.endTime}
                        </div>
                        <div
                          style={{
                            fontWeight: 600,
                            fontSize: '12.5px',
                            color: '#082F3D',
                            lineHeight: 1.3,
                            marginBottom: '4px',
                          }}
                        >
                          {c.courseName}
                        </div>
                        <div style={{ fontSize: '11px', color: '#65747A' }}>
                          {c.room}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
