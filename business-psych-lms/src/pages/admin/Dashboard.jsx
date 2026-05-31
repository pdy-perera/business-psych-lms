import { useAuth } from "../../context/AuthContext";

export default function AdminDashboard() {
  const { profile, signOut } = useAuth();

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.logo}>
          <h2 style={styles.logoText}>BP LMS</h2>
          <p style={styles.logoSub}>Admin Panel</p>
        </div>

        <nav style={styles.nav}>
          <a style={styles.navItem}>📊 Dashboard</a>
          <a style={styles.navItem}>👥 Students</a>
          <a style={styles.navItem}>📚 Batches</a>
          <a style={styles.navItem}>📅 Sessions</a>
          <a style={styles.navItem}>📎 Materials</a>
          <a style={styles.navItem}>✅ Attendance</a>
          <a style={styles.navItem}>📝 Assessments</a>
          <a style={styles.navItem}>📰 Trends</a>
        </nav>

        <button onClick={signOut} style={styles.signOut}>
          Sign Out
        </button>
      </div>

      <div style={styles.main}>
        <div style={styles.header}>
          <h1 style={styles.heading}>Dashboard</h1>
          <p style={styles.welcome}>Welcome back, {profile?.full_name} 👋</p>
        </div>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <p style={styles.statLabel}>Total Students</p>
            <h2 style={styles.statValue}>0</h2>
          </div>
          <div style={styles.statCard}>
            <p style={styles.statLabel}>Active Batches</p>
            <h2 style={styles.statValue}>0</h2>
          </div>
          <div style={styles.statCard}>
            <p style={styles.statLabel}>Pending Approvals</p>
            <h2 style={styles.statValue}>0</h2>
          </div>
          <div style={styles.statCard}>
            <p style={styles.statLabel}>Sessions This Month</p>
            <h2 style={styles.statValue}>0</h2>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Pending Student Approvals</h2>
          <div style={styles.emptyState}>
            <p>No pending approvals right now 🎉</p>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Upcoming Sessions</h2>
          <div style={styles.emptyState}>
            <p>No upcoming sessions. Create one to get started!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f0f4f8",
  },
  sidebar: {
    width: "240px",
    backgroundColor: "#1a1a2e",
    display: "flex",
    flexDirection: "column",
    padding: "24px 0",
    position: "fixed",
    height: "100vh",
  },
  logo: {
    padding: "0 24px 24px",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    marginBottom: "16px",
  },
  logoText: {
    color: "white",
    fontSize: "22px",
    fontWeight: "700",
    margin: 0,
  },
  logoSub: {
    color: "#a0aec0",
    fontSize: "12px",
    margin: "4px 0 0",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: "0 12px",
    gap: "4px",
  },
  navItem: {
    color: "#a0aec0",
    padding: "10px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    textDecoration: "none",
    transition: "all 0.2s",
  },
  signOut: {
    margin: "0 12px",
    padding: "10px",
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
  },
  main: {
    marginLeft: "240px",
    flex: 1,
    padding: "32px",
  },
  header: {
    marginBottom: "32px",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1a1a2e",
    margin: 0,
  },
  welcome: {
    color: "#666",
    marginTop: "4px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
    marginBottom: "32px",
  },
  statCard: {
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  statLabel: {
    fontSize: "13px",
    color: "#666",
    margin: "0 0 8px",
  },
  statValue: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#1a1a2e",
    margin: 0,
  },
  section: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "24px",
    marginBottom: "24px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1a1a2e",
    marginTop: 0,
    marginBottom: "16px",
  },
  emptyState: {
    textAlign: "center",
    padding: "32px",
    color: "#999",
  },
};