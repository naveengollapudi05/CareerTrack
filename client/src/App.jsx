
import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/api/applications";

function App() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    company: "",
    role: "",
    applicationUrl: "",
    status: "Saved",
  });

  async function loadApplications() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Could not load applications.");

      const data = await response.json();
      setApplications(data);
    } catch (err) {
      setError("Cannot connect to the backend. Check that server.js is running.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (showDashboard) loadApplications();
  }, [showDashboard]);

  async function addApplication(event) {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Could not save application.");
      }

      setApplications((current) => [data, ...current]);
      setForm({
        company: "",
        role: "",
        applicationUrl: "",
        status: "Saved",
      });
    } catch (err) {
      setError(err.message || "Could not save application.");
    }
  }

  async function deleteApplication(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Could not delete application.");

      setApplications((current) =>
        current.filter((application) => application._id !== id)
      );
    } catch (err) {
      setError(err.message);
    }
  }

  if (showDashboard) {
    return (
      <div className="app">
        <header className="navbar">
          <a
            href="#dashboard"
            className="logo"
            onClick={(event) => event.preventDefault()}
          >
            <span className="logo-icon">C</span> CareerTrack
          </a>
          <button
            className="nav-button"
            onClick={() => setShowDashboard(false)}
          >
            Back to Home
          </button>
        </header>

        <main className="dashboard-page">
          <section className="section-heading">
            <span className="eyebrow">YOUR CAREER JOURNEY</span>
            <h1>Applications Dashboard</h1>
            <p>Track your opportunities and update your application list.</p>
          </section>

          <section className="dashboard-stats">
            <article className="stat-card">
              <span>Total Applications</span>
              <strong>{applications.length}</strong>
            </article>
            <article className="stat-card">
              <span>Applied</span>
              <strong>
                {applications.filter((item) => item.status === "Applied").length}
              </strong>
            </article>
            <article className="stat-card">
              <span>Interviews</span>
              <strong>
                {applications.filter((item) => item.status === "Interview").length}
              </strong>
            </article>
            <article className="stat-card">
              <span>Offers</span>
              <strong>
                {applications.filter((item) => item.status === "Offer").length}
              </strong>
            </article>
          </section>

          <section className="dashboard-panel">
            <h2>Add an application</h2>
            <form className="application-form" onSubmit={addApplication}>
              <label>
                Company
                <input
                  required
                  value={form.company}
                  onChange={(event) =>
                    setForm({ ...form, company: event.target.value })
                  }
                  placeholder="Company name"
                />
              </label>

              <label>
                Job role
                <input
                  required
                  value={form.role}
                  onChange={(event) =>
                    setForm({ ...form, role: event.target.value })
                  }
                  placeholder="Data Analyst Intern"
                />
              </label>

              <label>
                Application link
                <input
                  type="url"
                  value={form.applicationUrl}
                  onChange={(event) =>
                    setForm({ ...form, applicationUrl: event.target.value })
                  }
                  placeholder="https://..."
                />
              </label>

              <label>
                Status
                <select
                  value={form.status}
                  onChange={(event) =>
                    setForm({ ...form, status: event.target.value })
                  }
                >
                  <option>Saved</option>
                  <option>Applied</option>
                  <option>Assessment</option>
                  <option>Interview</option>
                  <option>Offer</option>
                  <option>Rejected</option>
                </select>
              </label>

              <button className="primary-button" type="submit">
                Save Application
              </button>
            </form>
          </section>

          {error && <p role="alert" className="dashboard-error">{error}</p>}

          <section className="dashboard-panel">
            <div className="panel-heading">
              <h2>Your applications</h2>
              <button
                className="secondary-button"
                onClick={loadApplications}
                type="button"
              >
                Refresh
              </button>
            </div>

            {loading ? (
              <p>Loading applications...</p>
            ) : applications.length === 0 ? (
              <p>No applications yet. Add your first opportunity above.</p>
            ) : (
              <div className="application-list">
                {applications.map((application) => (
                  <article className="job-row" key={application._id}>
                    <div className="company-icon blue">
                      {(application.company || "?").charAt(0).toUpperCase()}
                    </div>
                    <div className="job-info">
                      <strong>{application.role}</strong>
                      <span>{application.company}</span>
                      {application.applicationUrl && (
                        <a
                          href={application.applicationUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Open application
                        </a>
                      )}
                    </div>
                    <span className="status applied">{application.status}</span>
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={() => deleteApplication(application._id)}
                    >
                      Delete
                    </button>
                  </article>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="navbar">
        <a href="#" className="logo">
          <span className="logo-icon">C</span>
          CareerTrack
        </a>

        <nav>
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
        </nav>

        <button
          className="nav-button"
          onClick={() => setShowDashboard(true)}
        >
          Get Started
        </button>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <span className="eyebrow">YOUR CAREER JOURNEY STARTS HERE</span>
            <h1>
              Turn your career goals into
              <span> real opportunities.</span>
            </h1>
            <p>
              Track internships, understand the skills employers need,
              improve your resume, and organize your job search in one place.
            </p>

            <div className="hero-actions" id="get-started">
              <button
                className="primary-button"
                onClick={() => setShowDashboard(true)}
              >
                Explore CareerTrack <span>→</span>
              </button>
              <a href="#how-it-works" className="secondary-button">
                See how it works
              </a>
            </div>

            <div className="hero-note">
              <span className="check">✓</span>
              Built for students and fresh graduates
            </div>
          </div>

          <div className="preview">
            <div className="preview-top">
              <div>
                <span className="small-label">YOUR CAREER OVERVIEW</span>
                <h3>Dashboard Preview</h3>
              </div>
              <span className="preview-dot" />
            </div>
            <div className="stats">
              <div className="stat-card">
                <span>Applications</span>
                <strong>12</strong>
                <small>Total tracked</small>
              </div>
              <div className="stat-card">
                <span>Interviews</span>
                <strong>03</strong>
                <small>Keep preparing</small>
              </div>
              <div className="stat-card">
                <span>Skill Match</span>
                <strong>78%</strong>
                <small>Example score</small>
              </div>
            </div>
            <div className="preview-panel">
              <div className="panel-heading">
                <strong>Recent applications</strong>
                <span>Example data</span>
              </div>
              <div className="job-row">
                <div className="company-icon blue">D</div>
                <div className="job-info">
                  <strong>Data Analyst Intern</strong>
                  <span>Demo Company</span>
                </div>
                <span className="status interview">Interview</span>
              </div>
              <div className="job-row">
                <div className="company-icon purple">T</div>
                <div className="job-info">
                  <strong>Business Analyst</strong>
                  <span>Sample Technologies</span>
                </div>
                <span className="status applied">Applied</span>
              </div>
              <div className="job-row">
                <div className="company-icon orange">A</div>
                <div className="job-info">
                  <strong>Junior Data Intern</strong>
                  <span>Example Analytics</span>
                </div>
                <span className="status pending">Pending</span>
              </div>
            </div>
            <p className="demo-note">
              Illustrative preview — not connected to a database yet.
            </p>
          </div>
        </section>

        <section className="features" id="features">
          <div className="section-heading">
            <span className="eyebrow">ONE PLACE. MORE CONTROL.</span>
            <h2>Everything you need to move forward</h2>
            <p>Keep your applications organized and know what to improve next.</p>
          </div>

          <div className="feature-grid">
            <article className="feature-card">
              <div className="feature-icon blue-bg">▤</div>
              <h3>Application Tracker</h3>
              <p>Record job links, companies, deadlines, interviews, and statuses.</p>
            </article>
            <article className="feature-card">
              <div className="feature-icon purple-bg">↗</div>
              <h3>Skill Gap Analysis</h3>
              <p>Compare job requirements with your skills and identify what to learn.</p>
            </article>
            <article className="feature-card">
              <div className="feature-icon green-bg">▧</div>
              <h3>Resume Builder</h3>
              <p>Organize resume details, review relevant keywords, and prepare a resume.</p>
            </article>
            <article className="feature-card">
              <div className="feature-icon orange-bg">◷</div>
              <h3>Smart Reminders</h3>
              <p>Keep track of upcoming interviews, deadlines, and follow-ups.</p>
            </article>
          </div>
        </section>

        <section className="how-section" id="how-it-works">
          <span className="eyebrow">SIMPLE TO USE</span>
          <h2>Your next opportunity, step by step</h2>
          <div className="steps">
            <div className="step">
              <span>01</span>
              <h3>Add opportunities</h3>
              <p>Save job details and application links.</p>
            </div>
            <div className="step">
              <span>02</span>
              <h3>Find skill gaps</h3>
              <p>Compare your skills with job requirements.</p>
            </div>
            <div className="step">
              <span>03</span>
              <h3>Prepare and track</h3>
              <p>Improve your resume and manage follow-ups.</p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <a href="#" className="logo">
          <span className="logo-icon">C</span> CareerTrack
        </a>
        <p>Plan smarter. Prepare better. Move forward.</p>
      </footer>
    </div>
  );
}

export default App;
