import React from 'react';
import { DEPARTMENTS } from '../data/initialStudents';

export default function SearchFilterBar({
  searchTerm,
  onSearchChange,
  selectedDepartment,
  onDepartmentChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  onExportCsv,
  onResetData
}) {
  return (
    <div className="search-filter-panel">
      <div className="search-box">
        <i className="fa-solid fa-magnifying-glass search-icon"></i>
        <input
          type="text"
          placeholder="Search by student name, ID, or email..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search students"
        />
        {searchTerm && (
          <button
            className="clear-search-btn"
            onClick={() => onSearchChange('')}
            title="Clear search"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        )}
      </div>

      <div className="filters-group">
        <div className="select-wrapper">
          <i className="fa-solid fa-filter select-icon"></i>
          <select
            value={selectedDepartment}
            onChange={(e) => onDepartmentChange(e.target.value)}
            aria-label="Filter by department"
          >
            <option value="All">All Departments</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <div className="select-wrapper">
          <i className="fa-solid fa-arrow-down-short-wide select-icon"></i>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            aria-label="Sort students"
          >
            <option value="name-asc">Name (A &rarr; Z)</option>
            <option value="name-desc">Name (Z &rarr; A)</option>
            <option value="cgpa-desc">CGPA (High &rarr; Low)</option>
            <option value="id-asc">Student ID</option>
          </select>
        </div>

        <div className="view-toggle">
          <button
            className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => onViewModeChange('table')}
            title="Table View"
            aria-label="Switch to table view"
          >
            <i className="fa-solid fa-table-list"></i>
          </button>
          <button
            className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => onViewModeChange('grid')}
            title="Card Grid View"
            aria-label="Switch to card grid view"
          >
            <i className="fa-solid fa-grip"></i>
          </button>
        </div>

        <button
          className="btn btn-secondary action-btn"
          onClick={onExportCsv}
          title="Export current list to CSV"
        >
          <i className="fa-solid fa-file-csv"></i>
          <span>Export</span>
        </button>

        <button
          className="btn btn-outline-sm action-btn"
          onClick={onResetData}
          title="Reset to default sample data"
        >
          <i className="fa-solid fa-rotate-left"></i>
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
}
