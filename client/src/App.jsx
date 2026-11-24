import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import StatsOverview from './components/StatsOverview';
import SearchFilterBar from './components/SearchFilterBar';
import StudentTable from './components/StudentTable';
import StudentCard from './components/StudentCard';
import StudentForm from './components/StudentForm';
import StudentDetailModal from './components/StudentDetailModal';
import DeleteModal from './components/DeleteModal';
import { apiService } from './services/api';
import './styles/App.css';

export default function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => localStorage.getItem('fullstack_theme') || 'dark');
  const [backendStatus, setBackendStatus] = useState({ online: false, database: null });

  // UI state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [deletingStudent, setDeletingStudent] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [sortBy, setSortBy] = useState('name-asc');
  const [viewMode, setViewMode] = useState('table');
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Sync Theme
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('fullstack_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Load students from API service
  const loadStudents = useCallback(async () => {
    setLoading(true);
    const result = await apiService.getStudents({
      search: searchTerm,
      department: selectedDepartment,
      sortBy
    });

    // Normalize property names (full_name vs fullName)
    const normalized = (result.data || []).map(s => ({
      ...s,
      fullName: s.fullName || s.full_name,
      dob: s.dob ? String(s.dob).split('T')[0] : '',
      admissionDate: s.admission_date || s.admissionDate || '2023-08-01'
    }));

    setStudents(normalized);
    setLoading(false);
  }, [searchTerm, selectedDepartment, sortBy]);

  // Initial check & load
  useEffect(() => {
    async function init() {
      const health = await apiService.checkHealth();
      setBackendStatus(health);
      await loadStudents();
    }
    init();
  }, [loadStudents]);

  // Handle Form Submit (Add or Update)
  const handleFormSubmit = async (studentData) => {
    if (editingStudent) {
      const res = await apiService.updateStudent(studentData.id, studentData);
      if (res.success) {
        showToast(`Student record for ${studentData.fullName} updated!`, 'info');
        loadStudents();
      } else {
        showToast(res.message || 'Failed to update student.', 'danger');
      }
    } else {
      const res = await apiService.createStudent(studentData);
      if (res.success) {
        showToast(`Student ${studentData.fullName} registered successfully!`, 'success');
        loadStudents();
      } else {
        showToast(res.message || 'Failed to register student.', 'danger');
      }
    }
    setEditingStudent(null);
  };

  // Handle Delete
  const handleConfirmDelete = async (studentId) => {
    const res = await apiService.deleteStudent(studentId);
    if (res.success) {
      showToast(`Student record (${studentId}) removed.`, 'danger');
      loadStudents();
    } else {
      showToast(res.message || 'Failed to delete student.', 'danger');
    }
  };

  // Reset Data
  const handleResetData = () => {
    if (window.confirm('Reset all records to starter data?')) {
      const initial = apiService.resetLocalData();
      setStudents(initial);
      setSearchTerm('');
      setSelectedDepartment('All');
      showToast('Registry reset to sample records.', 'info');
    }
  };

  // Export to CSV
  const handleExportCsv = () => {
    if (students.length === 0) {
      showToast('No students to export.', 'danger');
      return;
    }

    const headers = ['ID', 'Full Name', 'Email', 'Phone', 'Date of Birth', 'Gender', 'Department', 'Semester', 'CGPA', 'Status', 'Address'];
    const rows = students.map(s => [
      s.id,
      `"${s.fullName || s.full_name}"`,
      s.email,
      s.phone,
      s.dob,
      s.gender,
      `"${s.department}"`,
      s.semester,
      s.cgpa || '',
      s.status,
      `"${s.address || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `students_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`Exported ${students.length} records to CSV!`, 'success');
  };

  const existingIds = students.map(s => s.id);

  return (
    <div className="app-wrapper">
      <Navbar
        studentCount={students.length}
        onOpenAddModal={() => {
          setEditingStudent(null);
          setIsFormOpen(true);
        }}
        theme={theme}
        onToggleTheme={toggleTheme}
        backendStatus={backendStatus}
      />

      <main className="main-container">
        {/* Metric Cards */}
        <StatsOverview students={students} />

        {/* Search & Filter Controls */}
        <SearchFilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedDepartment={selectedDepartment}
          onDepartmentChange={setSelectedDepartment}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onExportCsv={handleExportCsv}
          onResetData={handleResetData}
        />

        {/* Loading / Content */}
        {loading ? (
          <div className="empty-state">
            <div className="empty-icon"><i className="fa-solid fa-spinner fa-spin"></i></div>
            <h3>Loading Student Records...</h3>
          </div>
        ) : viewMode === 'table' ? (
          <StudentTable
            students={students}
            onViewDetails={(student) => setSelectedStudent(student)}
            onEdit={(student) => {
              setEditingStudent(student);
              setIsFormOpen(true);
            }}
            onDelete={(student) => setDeletingStudent(student)}
          />
        ) : (
          <div className="student-grid">
            {students.length === 0 ? (
              <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
                <div className="empty-icon"><i className="fa-solid fa-user-slash"></i></div>
                <h3>No Student Records Found</h3>
              </div>
            ) : (
              students.map(student => (
                <StudentCard
                  key={student.id}
                  student={student}
                  onViewDetails={(student) => setSelectedStudent(student)}
                  onEdit={(student) => {
                    setEditingStudent(student);
                    setIsFormOpen(true);
                  }}
                  onDelete={(student) => setDeletingStudent(student)}
                />
              ))
            )}
          </div>
        )}
      </main>

      {/* Registration & Edit Modal */}
      <StudentForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingStudent(null);
        }}
        onSubmit={handleFormSubmit}
        editingStudent={editingStudent}
        existingIds={existingIds}
      />

      {/* Detail Modal */}
      <StudentDetailModal
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
        onEdit={(student) => {
          setSelectedStudent(null);
          setEditingStudent(student);
          setIsFormOpen(true);
        }}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        student={deletingStudent}
        onClose={() => setDeletingStudent(null)}
        onConfirm={handleConfirmDelete}
      />

      {/* Toast Feedback */}
      {toast && (
        <div className="toast-container" role="alert">
          <div className={`toast toast-${toast.type}`}>
            <i className={
              toast.type === 'success'
                ? 'fa-solid fa-circle-check'
                : toast.type === 'danger'
                ? 'fa-solid fa-triangle-exclamation'
                : 'fa-solid fa-circle-info'
            }></i>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
