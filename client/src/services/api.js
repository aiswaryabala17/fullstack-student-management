/**
 * API Service Layer for Full-Stack Integration
 * Communicates with the Express & MySQL backend at /api/students
 * Gracefully falls back to LocalStorage if backend is unreachable (e.g. GitHub Pages preview)
 */

import { initialStudents } from '../data/initialStudents';

const API_BASE_URL = import.meta.env?.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.isBackendOnline = false;
    this.checkedOnce = false;
  }

  /**
   * Check Backend Health and DB Connectivity
   */
  async checkHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(2500)
      });

      if (response.ok) {
        const data = await response.json();
        this.isBackendOnline = true;
        this.checkedOnce = true;
        return { online: true, database: data.database };
      }
    } catch (e) {
      // Backend is offline / unreachable
    }

    this.isBackendOnline = false;
    this.checkedOnce = true;
    return { online: false, database: { connected: false, engine: 'LocalStorage' } };
  }

  /**
   * Helper to get local data
   */
  _getLocalStudents() {
    try {
      const saved = localStorage.getItem('fullstack_students');
      return saved ? JSON.parse(saved) : initialStudents;
    } catch (e) {
      return initialStudents;
    }
  }

  /**
   * Helper to save local data
   */
  _saveLocalStudents(data) {
    try {
      localStorage.setItem('fullstack_students', JSON.stringify(data));
    } catch (e) {}
  }

  /**
   * Fetch all students (with search, department, sort)
   */
  async getStudents(params = {}) {
    if (this.isBackendOnline) {
      try {
        const query = new URLSearchParams();
        if (params.search) query.append('search', params.search);
        if (params.department && params.department !== 'All') query.append('department', params.department);
        if (params.sortBy) query.append('sortBy', params.sortBy);

        const res = await fetch(`${API_BASE_URL}/students?${query.toString()}`);
        if (res.ok) {
          const result = await res.json();
          return { data: result.data, source: 'backend' };
        }
      } catch (err) {
        console.warn('Backend query failed, falling back to local storage:', err.message);
      }
    }

    // Local fallback
    let list = this._getLocalStudents();

    if (params.search) {
      const q = params.search.toLowerCase();
      list = list.filter(
        (s) =>
          (s.full_name || s.fullName || '').toLowerCase().includes(q) ||
          (s.id || '').toLowerCase().includes(q) ||
          (s.email || '').toLowerCase().includes(q)
      );
    }

    if (params.department && params.department !== 'All') {
      list = list.filter((s) => s.department === params.department);
    }

    // Sorting
    switch (params.sortBy) {
      case 'name-desc':
        list.sort((a, b) => (b.full_name || b.fullName).localeCompare(a.full_name || a.fullName));
        break;
      case 'cgpa-desc':
        list.sort((a, b) => (parseFloat(b.cgpa) || 0) - (parseFloat(a.cgpa) || 0));
        break;
      case 'id-asc':
        list.sort((a, b) => a.id.localeCompare(b.id));
        break;
      case 'name-asc':
      default:
        list.sort((a, b) => (a.full_name || a.fullName).localeCompare(b.full_name || b.fullName));
        break;
    }

    return { data: list, source: 'local' };
  }

  /**
   * Create a new student
   */
  async createStudent(studentData) {
    const payload = {
      ...studentData,
      full_name: studentData.fullName || studentData.full_name
    };

    if (this.isBackendOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/students`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const result = await res.json();
        if (res.ok) {
          return { success: true, data: result.data, source: 'backend' };
        } else {
          return { success: false, message: result.message || 'Registration failed' };
        }
      } catch (err) {
        console.warn('Backend create failed, saving locally:', err.message);
      }
    }

    // Local save
    const current = this._getLocalStudents();
    const newStudent = {
      ...studentData,
      fullName: studentData.fullName || studentData.full_name,
      admissionDate: studentData.admissionDate || new Date().toISOString().split('T')[0]
    };
    const updated = [newStudent, ...current];
    this._saveLocalStudents(updated);
    return { success: true, data: newStudent, source: 'local' };
  }

  /**
   * Update student record
   */
  async updateStudent(id, studentData) {
    const payload = {
      ...studentData,
      full_name: studentData.fullName || studentData.full_name
    };

    if (this.isBackendOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/students/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const result = await res.json();
        if (res.ok) {
          return { success: true, data: result.data, source: 'backend' };
        } else {
          return { success: false, message: result.message || 'Update failed' };
        }
      } catch (err) {
        console.warn('Backend update failed, updating locally:', err.message);
      }
    }

    // Local update
    const current = this._getLocalStudents();
    const index = current.findIndex((s) => s.id === id);
    if (index === -1) return { success: false, message: 'Student not found.' };

    current[index] = {
      ...current[index],
      ...studentData,
      fullName: studentData.fullName || studentData.full_name || current[index].fullName
    };
    this._saveLocalStudents(current);
    return { success: true, data: current[index], source: 'local' };
  }

  /**
   * Delete student record
   */
  async deleteStudent(id) {
    if (this.isBackendOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/students/${id}`, {
          method: 'DELETE'
        });

        const result = await res.json();
        if (res.ok) {
          return { success: true, source: 'backend' };
        } else {
          return { success: false, message: result.message || 'Delete failed' };
        }
      } catch (err) {
        console.warn('Backend delete failed, removing locally:', err.message);
      }
    }

    // Local delete
    const current = this._getLocalStudents();
    const filtered = current.filter((s) => s.id !== id);
    this._saveLocalStudents(filtered);
    return { success: true, source: 'local' };
  }

  /**
   * Reset data
   */
  resetLocalData() {
    this._saveLocalStudents(initialStudents);
    return initialStudents;
  }
}

export const apiService = new ApiService();
