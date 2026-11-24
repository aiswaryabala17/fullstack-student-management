import React, { useState, useEffect } from 'react';
import { DEPARTMENTS, SEMESTERS } from '../data/initialStudents';

const defaultFormData = {
  id: '',
  fullName: '',
  email: '',
  phone: '',
  dob: '',
  gender: 'Female',
  department: DEPARTMENTS[0],
  semester: SEMESTERS[5],
  cgpa: '',
  status: 'Active',
  address: ''
};

export default function StudentForm({
  isOpen,
  onClose,
  onSubmit,
  editingStudent,
  existingIds
}) {
  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (editingStudent) {
      setFormData(editingStudent);
      setErrors({});
      setTouched({});
    } else {
      // Auto-generate new unique ID suggestion if empty
      const nextIdNum = String(existingIds.length + 1).padStart(3, '0');
      setFormData({
        ...defaultFormData,
        id: `STU-2024-${nextIdNum}`
      });
      setErrors({});
      setTouched({});
    }
  }, [editingStudent, isOpen, existingIds]);

  if (!isOpen) return null;

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'fullName':
        if (!value.trim()) {
          error = 'Full name is required.';
        } else if (value.trim().length < 3) {
          error = 'Name must be at least 3 characters.';
        } else if (!/^[a-zA-Z\s.'-]+$/.test(value)) {
          error = 'Name must contain only letters and spaces.';
        }
        break;

      case 'id':
        if (!value.trim()) {
          error = 'Student ID is required.';
        } else if (!editingStudent && existingIds.includes(value.trim())) {
          error = 'Student ID already exists! Please use a unique ID.';
        }
        break;

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          error = 'Email address is required.';
        } else if (!emailRegex.test(value.trim())) {
          error = 'Please enter a valid email address.';
        }
        break;

      case 'phone':
        const phoneRegex = /^[0-9]{10}$/;
        if (!value.trim()) {
          error = 'Phone number is required.';
        } else if (!phoneRegex.test(value.replace(/[\s-]/g, ''))) {
          error = 'Phone number must be exactly 10 digits.';
        }
        break;

      case 'dob':
        if (!value) {
          error = 'Date of birth is required.';
        } else {
          const birthDate = new Date(value);
          const today = new Date();
          const age = today.getFullYear() - birthDate.getFullYear();
          if (age < 16 || age > 60) {
            error = 'Student must be between 16 and 60 years old.';
          }
        }
        break;

      case 'cgpa':
        if (value !== '' && value !== null) {
          const num = parseFloat(value);
          if (isNaN(num) || num < 0 || num > 10) {
            error = 'CGPA must be a number between 0.0 and 10.0.';
          }
        }
        break;

      case 'department':
        if (!value) error = 'Please select a department.';
        break;

      case 'semester':
        if (!value) error = 'Please select a semester.';
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const errorMsg = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all required fields as touched
    const fieldsToValidate = ['fullName', 'id', 'email', 'phone', 'dob', 'department', 'semester', 'cgpa'];
    const newErrors = {};
    let formIsValid = true;

    fieldsToValidate.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        formIsValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(
      fieldsToValidate.reduce((acc, f) => ({ ...acc, [f]: true }), {})
    );

    if (!formIsValid) {
      return;
    }

    // Submit valid student data
    onSubmit({
      ...formData,
      admissionDate: formData.admissionDate || new Date().toISOString().split('T')[0]
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrapper">
            <div className="modal-icon">
              <i className={editingStudent ? "fa-solid fa-user-pen" : "fa-solid fa-user-plus"}></i>
            </div>
            <div>
              <h2 className="modal-title">
                {editingStudent ? 'Edit Student Details' : 'Register New Student'}
              </h2>
              <p className="modal-subtitle">
                {editingStudent
                  ? 'Update academic and personal information below'
                  : 'Fill in the required information to enroll a new student'}
              </p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close dialog">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="student-form" noValidate>
          <div className="form-grid">
            {/* Student ID */}
            <div className={`form-field ${errors.id && touched.id ? 'field-error' : ''}`}>
              <label htmlFor="id">
                Student ID / Roll No <span className="req">*</span>
              </label>
              <div className="input-wrap">
                <i className="fa-solid fa-id-card field-icon"></i>
                <input
                  type="text"
                  id="id"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. STU-2024-001"
                  disabled={!!editingStudent} // Lock ID when editing
                />
              </div>
              {errors.id && touched.id && <span className="err-text">{errors.id}</span>}
            </div>

            {/* Full Name */}
            <div className={`form-field ${errors.fullName && touched.fullName ? 'field-error' : ''}`}>
              <label htmlFor="fullName">
                Full Name <span className="req">*</span>
              </label>
              <div className="input-wrap">
                <i className="fa-solid fa-user field-icon"></i>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. Aiswarya Bala"
                />
              </div>
              {errors.fullName && touched.fullName && (
                <span className="err-text">{errors.fullName}</span>
              )}
            </div>

            {/* Email */}
            <div className={`form-field ${errors.email && touched.email ? 'field-error' : ''}`}>
              <label htmlFor="email">
                Email Address <span className="req">*</span>
              </label>
              <div className="input-wrap">
                <i className="fa-solid fa-envelope field-icon"></i>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="student@example.com"
                />
              </div>
              {errors.email && touched.email && (
                <span className="err-text">{errors.email}</span>
              )}
            </div>

            {/* Phone */}
            <div className={`form-field ${errors.phone && touched.phone ? 'field-error' : ''}`}>
              <label htmlFor="phone">
                Phone Number <span className="req">*</span>
              </label>
              <div className="input-wrap">
                <i className="fa-solid fa-phone field-icon"></i>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="10-digit mobile number"
                />
              </div>
              {errors.phone && touched.phone && (
                <span className="err-text">{errors.phone}</span>
              )}
            </div>

            {/* Date of Birth */}
            <div className={`form-field ${errors.dob && touched.dob ? 'field-error' : ''}`}>
              <label htmlFor="dob">
                Date of Birth <span className="req">*</span>
              </label>
              <div className="input-wrap">
                <i className="fa-solid fa-calendar-days field-icon"></i>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.dob && touched.dob && <span className="err-text">{errors.dob}</span>}
            </div>

            {/* Gender */}
            <div className="form-field">
              <label htmlFor="gender">Gender</label>
              <div className="input-wrap">
                <i className="fa-solid fa-venus-mars field-icon"></i>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Department */}
            <div className="form-field">
              <label htmlFor="department">
                Department / Program <span className="req">*</span>
              </label>
              <div className="input-wrap">
                <i className="fa-solid fa-graduation-cap field-icon"></i>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Semester */}
            <div className="form-field">
              <label htmlFor="semester">
                Current Semester <span className="req">*</span>
              </label>
              <div className="input-wrap">
                <i className="fa-solid fa-book-open field-icon"></i>
                <select
                  id="semester"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                >
                  {SEMESTERS.map((sem) => (
                    <option key={sem} value={sem}>
                      {sem}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* CGPA */}
            <div className={`form-field ${errors.cgpa && touched.cgpa ? 'field-error' : ''}`}>
              <label htmlFor="cgpa">CGPA (0.0 &ndash; 10.0)</label>
              <div className="input-wrap">
                <i className="fa-solid fa-chart-line field-icon"></i>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  id="cgpa"
                  name="cgpa"
                  value={formData.cgpa}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. 8.8"
                />
              </div>
              {errors.cgpa && touched.cgpa && <span className="err-text">{errors.cgpa}</span>}
            </div>

            {/* Status */}
            <div className="form-field">
              <label htmlFor="status">Enrollment Status</label>
              <div className="input-wrap">
                <i className="fa-solid fa-circle-check field-icon"></i>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Graduated">Graduated</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>
            </div>

            {/* Address */}
            <div className="form-field full-width">
              <label htmlFor="address">City / Address</label>
              <div className="input-wrap">
                <i className="fa-solid fa-location-dot field-icon"></i>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="e.g. Bengaluru, Karnataka"
                />
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary submit-action-btn">
              <i className={editingStudent ? "fa-solid fa-check" : "fa-solid fa-user-plus"}></i>
              <span>{editingStudent ? 'Save Changes' : 'Complete Registration'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
