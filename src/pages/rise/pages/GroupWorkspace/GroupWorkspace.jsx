import React, { useState } from 'react';
import {
  Users,
  CheckSquare,
  Clock,
  MessageSquare,
  Send,
  Plus,
  ArrowRight,
  Filter,
  Activity,
  UploadCloud,
  Edit,
  FileCheck,
  CheckCircle2,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { groups, activityLog } from '../../data/groups';
import RiseHeader from '../../components/RiseHeader';
import RiseBadge from '../../components/RiseBadge';
import RiseCard from '../../components/RiseCard';

export default function GroupWorkspace() {
  const [selectedGroupId, setSelectedGroupId] = useState(groups[0]?.id || 'GRP-001');

  // Local state for group tasks so user can mutate status
  const [groupData, setGroupData] = useState(groups);

  // Local state for discussion comments
  const [discussions, setDiscussions] = useState({
    'GRP-001': [
      {
        id: 'msg-1',
        senderName: 'Denis Athaullah Darmadi',
        senderRole: 'Ketua',
        avatar: 'DA',
        color: '#07455C',
        text: 'Halo tim Alpha, repository Git dan schema relasional tabel users & orders sudah saya setup.',
        time: 'Kemarin, 14:20 WIB',
      },
      {
        id: 'msg-2',
        senderName: 'Rizky Pratama',
        senderRole: 'Anggota',
        avatar: 'RP',
        color: '#0E627C',
        text: 'Mantap Denis! Saya langsung lanjut ke auth middleware JWT dan proteksi endpoint role admin.',
        time: 'Kemarin, 15:05 WIB',
      },
      {
        id: 'msg-3',
        senderName: 'Siti Rahmawati',
        senderRole: 'Anggota',
        avatar: 'SR',
        color: '#CEAE65',
        text: 'Untuk mockup halaman keranjang belanja dan checkout sudah saya push ke branch feature/cart ya.',
        time: 'Hari ini, 09:12 WIB',
      },
    ],
    'GRP-002': [
      {
        id: 'msg-201',
        senderName: 'Anisa Putri',
        senderRole: 'Ketua',
        avatar: 'AP',
        color: '#CEAE65',
        text: 'Teman-teman kelompok Beta, mohon tinjau draf diagram EERD rumah sakit di drive ya.',
        time: 'Kemarin, 11:30 WIB',
      },
      {
        id: 'msg-202',
        senderName: 'Denis Athaullah Darmadi',
        senderRole: 'Anggota',
        avatar: 'DA',
        color: '#07455C',
        text: 'Sudah saya cek Anisa, normalisasi tabel resep dan obat rawat jalan sedang saya susun ke BCNF.',
        time: 'Hari ini, 08:45 WIB',
      },
    ],
  });

  const [newMessageText, setNewMessageText] = useState('');

  // Activity log filter state
  const [logMemberFilter, setLogMemberFilter] = useState('all');
  const [logTypeFilter, setLogTypeFilter] = useState('all');

  const currentGroup = groupData.find((g) => g.id === selectedGroupId) || groupData[0];

  // Advance task status: todo -> in-progress -> done
  const handleAdvanceTask = (taskId) => {
    setGroupData((prevGroups) =>
      prevGroups.map((grp) => {
        if (grp.id !== currentGroup.id) return grp;
        return {
          ...grp,
          tasks: grp.tasks.map((task) => {
            if (task.id !== taskId) return task;
            const nextStatus =
              task.status === 'todo'
                ? 'in-progress'
                : task.status === 'in-progress'
                ? 'done'
                : 'todo';
            return { ...task, status: nextStatus };
          }),
        };
      })
    );
  };

  // Send new discussion message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      senderName: 'Denis Athaullah Darmadi',
      senderRole: 'Ketua',
      avatar: 'DA',
      color: '#07455C',
      text: newMessageText.trim(),
      time: 'Baru saja',
    };

    setDiscussions((prev) => ({
      ...prev,
      [currentGroup.id]: [...(prev[currentGroup.id] || []), newMsg],
    }));

    setNewMessageText('');
  };

  // Filter activity logs
  const currentLogs = activityLog.filter((l) => {
    if (l.groupId !== currentGroup.id) return false;
    if (logMemberFilter !== 'all' && l.memberId !== logMemberFilter) return false;
    if (logTypeFilter !== 'all' && l.type !== logTypeFilter) return false;
    return true;
  });

  const todoTasks = currentGroup.tasks.filter((t) => t.status === 'todo');
  const inProgressTasks = currentGroup.tasks.filter((t) => t.status === 'in-progress');
  const doneTasks = currentGroup.tasks.filter((t) => t.status === 'done');

  const getActivityTypeBadge = (type) => {
    switch (type) {
      case 'upload':
        return <RiseBadge variant="primary">Unggah Berkas</RiseBadge>;
      case 'edit':
        return <RiseBadge variant="gold">Modifikasi</RiseBadge>;
      case 'status-change':
        return <RiseBadge variant="warning">Status Task</RiseBadge>;
      case 'task-complete':
        return <RiseBadge variant="success">Task Selesai</RiseBadge>;
      case 'comment':
        return <RiseBadge variant="info">Diskusi</RiseBadge>;
      default:
        return <RiseBadge variant="neutral">{type}</RiseBadge>;
    }
  };

  return (
    <div className="rise-group-workspace-page">
      <RiseHeader
        title="Group Workspace & Kolaborasi"
        subtitle="Platform pembagian peran tim, pemantauan papan kerja kolaboratif, serta audit transparansi kontribusi proyek."
      />

      {/* Group Selector Tabs */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {groupData.map((grp) => {
          const isSelected = grp.id === currentGroup.id;
          return (
            <button
              key={grp.id}
              type="button"
              onClick={() => setSelectedGroupId(grp.id)}
              className="rise-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '14px 20px',
                border: isSelected ? '2px solid #07455C' : '1px solid #DDE5E4',
                background: isSelected ? '#E8F4F7' : '#FFFFFF',
                cursor: 'pointer',
                textAlign: 'left',
                boxShadow: isSelected ? '0 4px 14px rgba(7,69,92,0.12)' : 'none',
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: isSelected ? '#07455C' : '#F1F5F4',
                  color: isSelected ? '#CEAE65' : '#082F3D',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '13px',
                }}
              >
                <Users size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#082F3D' }}>
                  {grp.name}
                </div>
                <div style={{ fontSize: '11.5px', color: '#65747A' }}>
                  {grp.courseCode} · {grp.members.length} Anggota
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Group Info Card */}
      <div className="rise-card" style={{ marginBottom: '24px', borderLeft: '5px solid #07455C' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
              <RiseBadge variant="primary">{currentGroup.courseCode}</RiseBadge>
              <RiseBadge variant="neutral">{currentGroup.courseName}</RiseBadge>
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#082F3D', margin: '0 0 6px' }}>
              {currentGroup.assignment.title}
            </h2>
            <p style={{ fontSize: '13px', color: '#65747A', margin: '0 0 14px', maxWidth: '750px', lineHeight: 1.5 }}>
              {currentGroup.assignment.description}
            </p>

            {/* Members Avatar Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#082F3D' }}>
                Anggota Tim:
              </span>
              {currentGroup.members.map((m) => (
                <div
                  key={m.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    background: '#F7F8F5',
                    border: '1px solid #DDE5E4',
                    fontSize: '12px',
                  }}
                  title={`${m.name} (${m.role})`}
                >
                  <span
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: m.color || '#07455C',
                      color: '#FFFFFF',
                      fontSize: '9.5px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {m.initials}
                  </span>
                  <span style={{ fontWeight: 600, color: '#082F3D' }}>{m.name.split(' ')[0]}</span>
                  {m.role === 'Ketua' && (
                    <span style={{ color: '#CEAE65', fontSize: '10.5px', fontWeight: 700 }}>
                      (Ketua)
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'right', minWidth: '160px' }}>
            <div style={{ fontSize: '11px', color: '#65747A', textTransform: 'uppercase', fontWeight: 700 }}>
              Tenggat Waktu Proyek
            </div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#07455C', marginTop: '4px' }}>
              {new Date(currentGroup.assignment.dueDate).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Task Board Kanban Section */}
      <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#082F3D', marginBottom: '14px' }}>
        Papan Pembagian Kerja (Task Kanban)
      </h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          marginBottom: '28px',
        }}
      >
        {/* TO DO Column */}
        <div style={{ background: '#F7F8F5', borderRadius: '12px', padding: '16px', border: '1px solid #DDE5E4' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div style={{ fontWeight: 700, fontSize: '14px', color: '#082F3D', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#64748B' }} />
              <span>To Do</span>
            </div>
            <RiseBadge variant="neutral">{todoTasks.length}</RiseBadge>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {todoTasks.map((t) => (
              <div
                key={t.id}
                className="rise-card"
                style={{ padding: '14px', background: '#FFFFFF' }}
              >
                <div style={{ fontWeight: 600, fontSize: '13px', color: '#082F3D', marginBottom: '4px' }}>
                  {t.title}
                </div>
                <div style={{ fontSize: '11.5px', color: '#65747A', marginBottom: '10px', lineHeight: 1.4 }}>
                  {t.description}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid #F1F5F4' }}>
                  <span style={{ fontSize: '11px', color: '#07455C', fontWeight: 600 }}>
                    {t.assignedToName}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleAdvanceTask(t.id)}
                    className="rise-btn rise-btn-ghost rise-btn-sm"
                    style={{ fontSize: '11px', padding: '3px 8px' }}
                    title="Mulai Kerjakan (Pindah ke In Progress)"
                  >
                    Mulai <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* IN PROGRESS Column */}
        <div style={{ background: '#FFFDF5', borderRadius: '12px', padding: '16px', border: '1px solid #FDE68A' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div style={{ fontWeight: 700, fontSize: '14px', color: '#92400E', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B' }} />
              <span>In Progress</span>
            </div>
            <RiseBadge variant="warning">{inProgressTasks.length}</RiseBadge>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {inProgressTasks.map((t) => (
              <div
                key={t.id}
                className="rise-card"
                style={{ padding: '14px', background: '#FFFFFF', borderLeft: '3px solid #F59E0B' }}
              >
                <div style={{ fontWeight: 600, fontSize: '13px', color: '#082F3D', marginBottom: '4px' }}>
                  {t.title}
                </div>
                <div style={{ fontSize: '11.5px', color: '#65747A', marginBottom: '10px', lineHeight: 1.4 }}>
                  {t.description}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid #F1F5F4' }}>
                  <span style={{ fontSize: '11px', color: '#07455C', fontWeight: 600 }}>
                    {t.assignedToName}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleAdvanceTask(t.id)}
                    className="rise-btn rise-btn-primary rise-btn-sm"
                    style={{ fontSize: '11px', padding: '3px 8px' }}
                    title="Selesaikan Task"
                  >
                    Selesai <CheckCircle2 size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DONE Column */}
        <div style={{ background: '#F0FDF4', borderRadius: '12px', padding: '16px', border: '1px solid #BBF7D0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div style={{ fontWeight: 700, fontSize: '14px', color: '#166534', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
              <span>Done</span>
            </div>
            <RiseBadge variant="success">{doneTasks.length}</RiseBadge>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {doneTasks.map((t) => (
              <div
                key={t.id}
                className="rise-card"
                style={{ padding: '14px', background: '#FFFFFF', borderLeft: '3px solid #10B981' }}
              >
                <div style={{ fontWeight: 600, fontSize: '13px', color: '#082F3D', marginBottom: '4px', textDecoration: 'line-through' }}>
                  {t.title}
                </div>
                <div style={{ fontSize: '11.5px', color: '#65747A', marginBottom: '10px', lineHeight: 1.4 }}>
                  {t.description}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid #F1F5F4' }}>
                  <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 600 }}>
                    ✓ {t.assignedToName}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleAdvanceTask(t.id)}
                    className="rise-btn rise-btn-ghost rise-btn-sm"
                    style={{ fontSize: '10.5px', padding: '2px 6px', color: '#94A3A8' }}
                    title="Kembalikan ke To Do"
                  >
                    Ubah
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Discussion & Activity Log 2-Column Section */}
      <div className="rise-grid-main-side">
        {/* Discussion Area */}
        <RiseCard title="Ruang Diskusi Proyek" icon={<MessageSquare size={18} />}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '360px', justifyContent: 'space-between' }}>
            {/* Messages Scroll Area */}
            <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '6px' }}>
              {(discussions[currentGroup.id] || []).map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    background: '#F7F8F5',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '1px solid #DDE5E4',
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: msg.color || '#07455C',
                      color: '#FFFFFF',
                      fontSize: '11px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {msg.avatar}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#082F3D' }}>
                        {msg.senderName}
                      </span>
                      <span style={{ fontSize: '11px', color: '#94A3A8' }}>{msg.time}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '13px', color: '#65747A', lineHeight: 1.5 }}>
                      {msg.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Message Form */}
            <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <input
                type="text"
                className="rise-search-input"
                style={{ flex: 1 }}
                placeholder="Ketik pesan atau koordinasi tugas untuk kelompok..."
                value={newMessageText}
                onChange={(e) => setNewMessageText(e.target.value)}
              />
              <button type="submit" className="rise-btn rise-btn-primary">
                <Send size={15} /> Kirim
              </button>
            </form>
          </div>
        </RiseCard>

        {/* Activity Log (Audit Transparansi Kontribusi) */}
        <RiseCard title="Audit Log Kontribusi" icon={<Activity size={18} />}>
          <p style={{ fontSize: '12px', color: '#65747A', margin: '0 0 12px', lineHeight: 1.4 }}>
            Catatan transparansi riwayat aktivitas kerja anggota kelompok (bukan sistem penilaian kuantitatif otomatis).
          </p>

          {/* Filter Dropdowns */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
            <select
              className="rise-filter-select"
              style={{ padding: '6px 10px', fontSize: '12px', flex: 1 }}
              value={logMemberFilter}
              onChange={(e) => setLogMemberFilter(e.target.value)}
            >
              <option value="all">Semua Anggota</option>
              {currentGroup.members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name.split(' ')[0]}
                </option>
              ))}
            </select>

            <select
              className="rise-filter-select"
              style={{ padding: '6px 10px', fontSize: '12px', flex: 1 }}
              value={logTypeFilter}
              onChange={(e) => setLogTypeFilter(e.target.value)}
            >
              <option value="all">Semua Jenis Aksi</option>
              <option value="upload">Unggah Berkas</option>
              <option value="status-change">Ubah Status</option>
              <option value="task-complete">Selesai Task</option>
              <option value="comment">Komentar</option>
              <option value="edit">Edit Dokumen</option>
            </select>
          </div>

          {/* Log List */}
          <div style={{ overflowY: 'auto', maxHeight: '280px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {currentLogs.length === 0 ? (
              <div style={{ fontSize: '12px', color: '#94A3A8', textAlign: 'center', padding: '16px' }}>
                Tidak ada log aktivitas sesuai filter.
              </div>
            ) : (
              currentLogs.map((log) => (
                <div
                  key={log.id}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '8px',
                    background: '#F7F8F5',
                    fontSize: '12px',
                    borderLeft: '3px solid #07455C',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600, color: '#082F3D' }}>
                      {log.memberName}
                    </span>
                    {getActivityTypeBadge(log.type)}
                  </div>
                  <div style={{ color: '#65747A', lineHeight: 1.4, marginBottom: '4px' }}>
                    {log.description}
                  </div>
                  <div style={{ fontSize: '10.5px', color: '#94A3A8' }}>
                    {new Date(log.timestamp).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </RiseCard>
      </div>
    </div>
  );
}
