import React from 'react';

export default function StudentCard({ student, onViewDetails, onEdit, onDelete }) {
  return (
    <article className="student-grid-card">
      <div className="card-top">
        <div className="card-identity">
          <div className={`avatar ${student.gender.toLowerCase()}`}>
            {student.fullName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 className="card-student-name" onClick={() => onViewDetails(student)}>
              {student.fullName}
            </h4>
            <span className="badge-id">{student.id}</span>
          </div>
        </div>

        <span className={`status-badge status-${student.status.toLowerCase().replace(' ', '-')}`}>
          <span className="dot"></span>
          {student.status}
        </span>
      </div>

      <div className="card-info-list">
        <div className="info-row">
          <i className="fa-solid fa-graduation-cap"></i>
          <span>{student.department}</span>
        </div>
        <div className="info-row">
          <i className="fa-regular fa-envelope"></i>
          <span className="truncate">{student.email}</span>
        </div>
        <div className="info-row">
          <i className="fa-solid fa-phone"></i>
          <span>{student.phone}</span>
        </div>
        <div className="info-row-split">
          <div className="info-mini">
            <span className="lbl">Semester:</span>
            <span className="val">{student.semester}</span>
          </div>
          <div className="info-mini">
            <span className="lbl">CGPA:</span>
            <span className="val cgpa-highlight">{student.cgpa || 'N/A'}</span>
          </div>
        </div>
      </div>

      <div className="card-actions-footer">
        <button
          className="btn btn-outline-sm"
          onClick={() => onViewDetails(student)}
        >
          <i className="fa-regular fa-id-badge"></i>
          <span>Details</span>
        </button>
        <div className="card-quick-actions">
          <button
            className="action-icon-btn edit-btn"
            onClick={() => onEdit(student)}
            title="Edit"
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button
            className="action-icon-btn delete-btn"
            onClick={() => onDelete(student)}
            title="Delete"
          >
            <i className="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    </article>
  );
}
