import React from 'react';

export default function StudentDetailModal({ student, onClose, onEdit }) {
  if (!student) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrapper">
            <div className="modal-icon">
              <i className="fa-solid fa-id-card-clip"></i>
            </div>
            <div>
              <h2 className="modal-title">Student Profile Dossier</h2>
              <p className="modal-subtitle">Comprehensive academic and registration record</p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close dialog">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="detail-body">
          {/* Top Banner Profile */}
          <div className="detail-banner">
            <div className={`avatar-large ${student.gender.toLowerCase()}`}>
              {student.fullName.charAt(0).toUpperCase()}
            </div>
            <div className="banner-info">
              <h3 className="banner-name">{student.fullName}</h3>
              <div className="banner-tags">
                <span className="badge-id">{student.id}</span>
                <span className={`status-badge status-${student.status.toLowerCase().replace(' ', '-')}`}>
                  <span className="dot"></span>
                  {student.status}
                </span>
                <span className="cgpa-pill cgpa-high">CGPA: {student.cgpa || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label"><i className="fa-solid fa-building-columns"></i> Department</span>
              <span className="detail-value">{student.department}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label"><i className="fa-solid fa-book-open"></i> Semester</span>
              <span className="detail-value">{student.semester}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label"><i className="fa-regular fa-envelope"></i> Email</span>
              <a href={`mailto:${student.email}`} className="detail-value link-text">{student.email}</a>
            </div>

            <div className="detail-item">
              <span className="detail-label"><i className="fa-solid fa-phone"></i> Phone Number</span>
              <a href={`tel:${student.phone}`} className="detail-value link-text">{student.phone}</a>
            </div>

            <div className="detail-item">
              <span className="detail-label"><i className="fa-solid fa-calendar-days"></i> Date of Birth</span>
              <span className="detail-value">{student.dob || 'Not specified'}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label"><i className="fa-solid fa-venus-mars"></i> Gender</span>
              <span className="detail-value">{student.gender}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label"><i className="fa-solid fa-calendar-check"></i> Admission Date</span>
              <span className="detail-value">{student.admissionDate || '2023-08-01'}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label"><i className="fa-solid fa-location-dot"></i> City / Address</span>
              <span className="detail-value">{student.address || 'Not specified'}</span>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              onClose();
              onEdit(student);
            }}
          >
            <i className="fa-solid fa-pen-to-square"></i>
            <span>Edit Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
