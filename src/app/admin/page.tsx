"use client";

import { useState, useEffect } from "react";
import { QuestionnaireRow, CustomRequestRow } from "@/lib/db";

// ===== PASSWORD GATE =====

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      onUnlock();
    } else {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="auth-card">
        <div className="auth-icon" aria-hidden="true">🔒</div>
        <h1 className="auth-title font-cormorant">Admin Access</h1>
        <p className="auth-subtitle">Enter the password to view submissions</p>
        <form onSubmit={submit}>
          <input
            type="password"
            className={`form-input ${error ? "input-error" : ""}`}
            placeholder="Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            autoFocus
            aria-label="Admin password"
            aria-invalid={error}
          />
          {error && <p className="field-error" role="alert">Incorrect password</p>}
          <button type="submit" className="auth-btn" disabled={loading} aria-busy={loading}>
            {loading ? "Verifying..." : "Unlock"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ===== DATA TABLES =====

function QuestionnaireTable({ rows }: { rows: QuestionnaireRow[] }) {
  if (rows.length === 0) {
    return <p className="empty-state">No submissions yet.</p>;
  }
  return (
    <div className="table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>When</th>
            <th>Name</th>
            <th>Username</th>
            <th>Content</th>
            <th>Fantasies</th>
            <th>Frequency</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td className="cell-date">{new Date(r.created_at).toLocaleDateString()} {new Date(r.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</td>
              <td>{r.name || "—"}</td>
              <td className="cell-mono">{r.username || "—"}</td>
              <td>{r.favorite_content || "—"}</td>
              <td className="cell-truncate">{r.fantasies || "—"}</td>
              <td>{r.frequency || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CustomRequestsTable({ rows }: { rows: CustomRequestRow[] }) {
  if (rows.length === 0) {
    return <p className="empty-state">No custom requests yet.</p>;
  }
  return (
    <div className="table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>When</th>
            <th>Name</th>
            <th>Username</th>
            <th>Type</th>
            <th>Duration</th>
            <th>Extras</th>
            <th>Special</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td className="cell-date">{new Date(r.created_at).toLocaleDateString()} {new Date(r.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</td>
              <td>{r.name || "—"}</td>
              <td className="cell-mono">{r.username || "—"}</td>
              <td>{r.video_type || "—"}</td>
              <td>{r.minutes}min</td>
              <td>{r.accessories !== "[]" ? JSON.parse(r.accessories).join(", ") : "—"}</td>
              <td className="cell-truncate">{r.special_requests || "—"}</td>
              <td className="cell-price">${r.estimated_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ===== MAIN ADMIN PAGE =====

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [activeTab, setActiveTab] = useState<"bf" | "custom">("bf");
  const [questionnaire, setQuestionnaire] = useState<QuestionnaireRow[]>([]);
  const [customRequests, setCustomRequests] = useState<CustomRequestRow[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [bfRes, customRes] = await Promise.all([
        fetch("/api/admin/questionnaire"),
        fetch("/api/admin/custom-requests"),
      ]);
      if (bfRes.ok) setQuestionnaire(await bfRes.json());
      if (customRes.ok) setCustomRequests(await customRes.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (unlocked) fetchData();
  }, [unlocked]);

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  }

  const tabs = [
    { key: "bf" as const, label: `💕 BF Applications (${questionnaire.length})` },
    { key: "custom" as const, label: `🎬 Custom Requests (${customRequests.length})` },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER */}
      <div className="admin-header">
        <div className="admin-header-inner">
          <div className="admin-title-group">
            <span className="admin-badge">Admin</span>
            <h1 className="font-cormorant">Luna Dashboard</h1>
          </div>
          <div className="admin-actions">
            <button className="refresh-btn" onClick={fetchData} disabled={loading}>
              {loading ? "Loading..." : "↻ Refresh"}
            </button>
            <button className="logout-btn" onClick={() => setUnlocked(false)}>
              Lock
            </button>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="admin-tabs" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`admin-tab ${activeTab === tab.key ? "active" : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <main className="admin-main">
        {activeTab === "bf" && <QuestionnaireTable rows={questionnaire} />}
        {activeTab === "custom" && <CustomRequestsTable rows={customRequests} />}
      </main>

      {/* FOOTER */}
      <footer className="admin-footer">
        <p>© {new Date().getFullYear()} Luna Admin</p>
      </footer>
    </div>
  );
}
