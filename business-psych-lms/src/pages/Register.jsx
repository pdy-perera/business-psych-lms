import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";

export default function Register() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    phone: "",
    occupation: "",
    linkedin_url: "",
    bio: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Step 1 - Create auth user
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    // Step 2 - Create profile
    const { error: profileError } = await supabase.from("profiles").insert({
      id: data.user.id,
      full_name: formData.full_name,
      email: formData.email,
      phone: formData.phone,
      occupation: formData.occupation,
      linkedin_url: formData.linkedin_url,
      bio: formData.bio,
      role: "student",
      status: "pending",
    });

    if (profileError) {
      setError(profileError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.successIcon}>✓</div>
          <h2 style={styles.title}>Registration Submitted!</h2>
          <p style={styles.subtitle}>
            Please check your email to confirm your account. Once confirmed,
            your profile will be reviewed and approved by the admin.
          </p>
          <Link to="/" style={styles.button}>
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Create Account</h1>
        <p style={styles.subtitle}>
          Step {step} of 2 —{" "}
          {step === 1 ? "Basic Information" : "Your Profile"}
        </p>

        <div style={styles.stepIndicator}>
          <div style={{ ...styles.step, ...(step >= 1 ? styles.stepActive : {}) }}>1</div>
          <div style={styles.stepLine} />
          <div style={{ ...styles.step, ...(step >= 2 ? styles.stepActive : {}) }}>2</div>
        </div>

        <form onSubmit={step === 2 ? handleSubmit : (e) => { e.preventDefault(); setStep(2); }} style={styles.form}>
          {step === 1 && (
            <>
              <div style={styles.field}>
                <label style={styles.label}>Full Name</label>
                <input
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Dhanushka Perera"
                  required
                />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="••••••••"
                  required
                />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Phone</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="+94 77 123 4567"
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div style={styles.field}>
                <label style={styles.label}>Current Occupation</label>
                <input
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="HR Manager, Student, etc."
                />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>LinkedIn URL</label>
                <input
                  name="linkedin_url"
                  value={formData.linkedin_url}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="https://linkedin.com/in/yourname"
                />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>About You</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  style={{ ...styles.input, height: "100px", resize: "vertical" }}
                  placeholder="Tell us a bit about yourself and why you're joining..."
                />
              </div>
            </>
          )}

          {error && <p style={styles.error}>{error}</p>}

          <div style={styles.buttonRow}>
            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                style={styles.backButton}
              >
                Back
              </button>
            )}
            <button
              type="submit"
              style={styles.button}
              disabled={loading}
            >
              {step === 1 ? "Next →" : loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>

        <p style={styles.loginText}>
          Already have an account?{" "}
          <Link to="/" style={styles.link}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f4f8",
    padding: "20px",
  },
  card: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "440px",
  },
  title: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#1a1a2e",
    marginBottom: "4px",
    textAlign: "center",
  },
  subtitle: {
    fontSize: "14px",
    color: "#666",
    textAlign: "center",
    marginBottom: "20px",
  },
  stepIndicator: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "24px",
    gap: "8px",
  },
  step: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: "#e2e8f0",
    color: "#666",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
    fontSize: "14px",
  },
  stepActive: {
    backgroundColor: "#4f46e5",
    color: "white",
  },
  stepLine: {
    height: "2px",
    width: "60px",
    backgroundColor: "#e2e8f0",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
  },
  input: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    outline: "none",
    fontFamily: "inherit",
  },
  button: {
    flex: 1,
    padding: "12px",
    backgroundColor: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    textAlign: "center",
    textDecoration: "none",
    display: "block",
  },
  backButton: {
    flex: 1,
    padding: "12px",
    backgroundColor: "#e2e8f0",
    color: "#333",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
  buttonRow: {
    display: "flex",
    gap: "12px",
    marginTop: "8px",
  },
  error: {
    color: "#e53e3e",
    fontSize: "14px",
    textAlign: "center",
  },
  successIcon: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "#48bb78",
    color: "white",
    fontSize: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
  },
  loginText: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "14px",
    color: "#666",
  },
  link: {
    color: "#4f46e5",
    textDecoration: "none",
    fontWeight: "500",
  },
};