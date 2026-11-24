import React from 'react';

export default function StatsOverview({ students }) {
  const totalStudents = students.length;

  const departmentCount = new Set(students.map(s => s.department)).size;

  const averageCgpa = totalStudents > 0
    ? (students.reduce((acc, curr) => acc + (parseFloat(curr.cgpa) || 0), 0) / totalStudents).toFixed(2)
    : "0.00";

  const femaleCount = students.filter(s => s.gender === 'Female').length;
  const maleCount = students.filter(s => s.gender === 'Male').length;

  return (
    <section className="stats-section">
      <div className="stat-card">
        <div className="stat-icon icon-indigo">
          <i className="fa-solid fa-users"></i>
        </div>
        <div className="stat-content">
          <span className="stat-label">Total Registered</span>
          <h3 className="stat-value">{totalStudents}</h3>
          <span className="stat-subtext">Active student profiles</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon icon-emerald">
          <i className="fa-solid fa-building-columns"></i>
        </div>
        <div className="stat-content">
          <span className="stat-label">Departments</span>
          <h3 className="stat-value">{departmentCount}</h3>
          <span className="stat-subtext">Active branches</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon icon-amber">
          <i className="fa-solid fa-star"></i>
        </div>
        <div className="stat-content">
          <span className="stat-label">Average CGPA</span>
          <h3 className="stat-value">{averageCgpa}</h3>
          <span className="stat-subtext">Across all batches</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon icon-cyan">
          <i className="fa-solid fa-venus-mars"></i>
        </div>
        <div className="stat-content">
          <span className="stat-label">Gender Diversity</span>
          <h3 className="stat-value">{femaleCount}F : {maleCount}M</h3>
          <span className="stat-subtext">Balanced enrollment</span>
        </div>
      </div>
    </section>
  );
}
