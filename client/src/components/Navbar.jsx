import React from 'react';

export default function Navbar({
  studentCount,
  onOpenAddModal,
  theme,
  onToggleTheme,
  backendStatus
}) {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-brand">
          <div className="brand-icon">
            <i className="fa-solid fa-graduation-cap"></i>
          </div>
          <div>
            <h1 className="brand-title">EduTrack Pro</h1>
            <p className="brand-subtitle">Full-Stack Student Management System (React &bull; Node &bull; MySQL)</p>
          </div>
        </div>

        <div className="header-actions">
          {/* Live Backend Connection Badge */}
          <div
            className={`connection-pill ${backendStatus.online ? 'conn-online' : 'conn-fallback'}`}
            title={
              backendStatus.online
                ? 'Connected to live Express backend & MySQL database'
                : 'Backend offline or running in standalone demo mode'
            }
          >
            <span className="pill-dot"></span>
            <span>
              {backendStatus.online
                ? `Live API (${backendStatus.database?.engine || 'MySQL'})`
                : 'Demo Mode (Local Data)'}
            </span>
          </div>

          <div className="student-counter-pill">
            <span>{studentCount} Enrolled</span>
          </div>

          <button
            className="theme-btn"
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <i className="fa-solid fa-sun"></i>
            ) : (
              <i className="fa-solid fa-moon"></i>
            )}
          </button>

          <a
            href="https://github.com/aiswaryabala17/fullstack-student-management"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link-btn"
            title="GitHub Repository"
          >
            <i className="fa-brands fa-github"></i>
            <span className="github-text">Repo</span>
          </a>

          <button className="btn btn-primary new-student-btn" onClick={onOpenAddModal}>
            <i className="fa-solid fa-user-plus"></i>
            <span>Register Student</span>
          </button>
        </div>
      </div>
    </header>
  );
}
