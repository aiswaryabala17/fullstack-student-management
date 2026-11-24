import React from 'react';

export default function DeleteModal({ student, onClose, onConfirm }) {
  if (!student) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog delete-confirm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="delete-icon-wrapper">
          <i className="fa-solid fa-triangle-exclamation"></i>
        </div>

        <h3 className="delete-modal-title">Delete Student Record?</h3>
        <p className="delete-modal-text">
          Are you sure you want to permanently remove <strong>{student.fullName}</strong> ({student.id}) from the registry?
          This action cannot be undone.
        </p>

        <div className="modal-actions delete-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              onConfirm(student.id);
              onClose();
            }}
          >
            <i className="fa-solid fa-trash-can"></i>
            <span>Confirm Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
