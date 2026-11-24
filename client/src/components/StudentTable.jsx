import React from 'react';

export default function StudentTable({
  students,
  onViewDetails,
  onEdit,
  onDelete
}) {
  if (students.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <i className="fa-solid fa-user-slash"></i>
        </div>
        <h3>No Student Records Found</h3>
        <p>Try adjusting your search query, department filter, or register a new student.</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="student-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>ID / Roll No</th>
            <th>Department</th>
            <th>Semester</th>
            <th>CGPA</th>
            <th>Status</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="student-row">
              {/* Student Name & Email */}
              <td>
                <div className="student-cell-identity">
                  <div className={`avatar ${student.gender.toLowerCase()}`}>
                    {student.fullName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <span className="student-name" onClick={() => onViewDetails(student)}>
                      {student.fullName}
                    </span>
                    <span className="student-email">{student.email}</span>
                  </div>
                </div>
              </td>

              {/* ID */}
              <td>
                <span className="badge-id">{student.id}</span>
              </td>

              {/* Department */}
              <td>
                <span className="dept-tag">{student.department}</span>
              </td>

              {/* Semester */}
              <td>
                <span className="sem-text">{student.semester}</span>
              </td>

              {/* CGPA */}
              <td>
                <span className={`cgpa-pill ${parseFloat(student.cgpa) >= 8.5 ? 'cgpa-high' : 'cgpa-med'}`}>
                  {student.cgpa || 'N/A'}
                </span>
              </td>

              {/* Status */}
              <td>
                <span className={`status-badge status-${student.status.toLowerCase().replace(' ', '-')}`}>
                  <span className="dot"></span>
                  {student.status}
                </span>
              </td>

              {/* Actions */}
              <td className="text-right">
                <div className="action-buttons-group">
                  <button
                    className="action-icon-btn view-btn"
                    onClick={() => onViewDetails(student)}
                    title="View Full Profile"
                    aria-label={`View details of ${student.fullName}`}
                  >
                    <i className="fa-solid fa-eye"></i>
                  </button>
                  <button
                    className="action-icon-btn edit-btn"
                    onClick={() => onEdit(student)}
                    title="Edit Record"
                    aria-label={`Edit ${student.fullName}`}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button
                    className="action-icon-btn delete-btn"
                    onClick={() => onDelete(student)}
                    title="Delete Record"
                    aria-label={`Delete ${student.fullName}`}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
