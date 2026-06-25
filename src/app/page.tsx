"use client";

import { useState, useEffect, useRef } from "react";

// ===== DATA =====

const ppvVideos = [
  { id: 1, title: "Strip Tease", description: "Slow seductive tease · 3 min", price: 15, emoji: "💃" },
  { id: 2, title: "Dildo Tease", description: "Sensual toy play · 17 min", price: 50, emoji: "🎀" },
  { id: 3, title: "Yoga Vid", description: "Stretch & flex · 10 min", price: 30, emoji: "🧘" },
];

const accessoryOptions = [
  { id: "dildo", label: "Dildo", price: 25 },
  { id: "lingerie", label: "Lingerie Set", price: 20 },
  { id: "stripper-heels", label: "Stripper Heels", price: 30 },
  { id: "heels", label: "Heels", price: 10 },
  { id: "outfit", label: "Custom Outfit", price: 25 },
  { id: "yoga-pants", label: "Yoga Pants", price: 15 },
];

const gradients = [
  "from-[#2a2028] to-[#1a1820]",
  "from-[#1a1820] to-[#201828]",
  "from-[#281a20] to-[#1a1820]",
  "from-[#201a18] to-[#281a18]",
  "from-[#181818] to-[#1a1a1a]",
  "from-[#281a28] to-[#1a1820]",
  "from-[#281a20] to-[#1a1818]",
  "from-[#1a2028] to-[#181a20]",
];

// ===== ANIMATED PRICE COMPONENT =====

function AnimatedPrice({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    const prev = prevRef.current;
    if (prev === value) return;
    prevRef.current = value;
    const diff = value - prev;
    const steps = 8;
    const stepVal = diff / steps;
    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current >= steps) {
        setDisplay(value);
        clearInterval(interval);
      } else {
        setDisplay(Math.round(prev + stepVal * current));
      }
    }, 30);
    return () => clearInterval(interval);
  }, [value]);

  return <span>${display}</span>;
}

// ===== VIDEO MODAL =====

function VideoModal({ video, onClose }: { video: typeof ppvVideos[0]; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={`Unlock ${video.title}`}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <div className="modal-icon">{video.emoji}</div>
        <h3 className="modal-title font-cormorant">{video.title}</h3>
        <p className="modal-desc">{video.description}</p>
        <div className="modal-price">${video.price}</div>
        <button className="modal-unlock-btn" onClick={onClose}>
          ${video.price}
        </button>
        <p className="modal-note">Payment integration coming soon</p>
      </div>
    </div>
  );
}

// ===== MAIN PAGE =====

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { label: "💕 BF Application", short: "BF App" },
    { label: "🎬 Videos", short: "Videos" },
    { label: "💫 Custom Request", short: "Custom" },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row md:pb-0 max-w-[500px] md:max-w-[1200px] mx-auto w-full">
      {/* PROFILE HEADER */}
      <div className="profile-header">
        <div className="avatar" aria-hidden="true">✨</div>
        <div className="profile-name">Luna</div>
        <div className="profile-bio">You&apos;ve found my spot 😜</div>
      </div>

      {/* LAYOUT: Desktop = sidebar tabs + content | Mobile = stacked */}
      <div className="md:flex md:flex-1 min-w-0">
        {/* SECTION TABS — vertical sidebar on desktop, horizontal on mobile */}
        <nav className="section-tabs md:flex-col md:justify-start md:gap-2 md:px-6 md:py-8 md:min-w-[200px] md:max-w-[240px] md:w-auto md:border-r md:border-[var(--border-subtle)] md:bg-[var(--bg-secondary)] md:sticky md:top-0 md:self-start md:overflow-x-visible md:scrollbar-auto" role="tablist" aria-label="Content sections">
          {tabs.map((tab, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={activeTab === i}
              aria-controls={`panel-${i}`}
              id={`tab-${i}`}
              onClick={() => setActiveTab(i)}
              className={`section-tab ${activeTab === i ? "active" : ""}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* CONTENT PANELS */}
        <main className="flex-1 min-w-0">
          <div id="panel-0" role="tabpanel" aria-labelledby="tab-0" hidden={activeTab !== 0}>
            <BfApplicationPanel />
          </div>
          <div id="panel-1" role="tabpanel" aria-labelledby="tab-1" hidden={activeTab !== 1}>
            <VideosPanel />
          </div>
          <div id="panel-2" role="tabpanel" aria-labelledby="tab-2" hidden={activeTab !== 2}>
            <CustomRequestPanel />
          </div>
        </main>
      </div>
    </div>

    {/* FOOTER — outside flex row, always at bottom */}
    <footer className="site-footer">
      <div className="footer-ornament" aria-hidden="true">✦</div>
      <p className="footer-text">You&apos;ve found my spot 😜</p>
      <p className="footer-copy">© {new Date().getFullYear()} Luna. All rights reserved.</p>
    </footer>
  );
}

// ===== PANEL: BF APPLICATION (5 Questions) =====

function BfApplicationPanel() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    username: "",
    q1_interests: "",
    q2_body_part: "",
    q3_turn_ons: "",
    q5_about_you: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (field: string, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((e) => { const n = { ...e }; delete n[field]; return n; });
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Please enter your name";
    if (!form.username.trim()) errs.username = "Please enter your username";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const r = await fetch("/api/questionnaire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (r.ok) setSubmitted(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="success-state">
        <div className="success-icon" aria-hidden="true">💋</div>
        <h2 className="font-cormorant">Thank You, Baby</h2>
        <p>I can&apos;t wait to read your answers. I&apos;ll create content just for you.</p>
      </div>
    );
  }

  return (
    <div className="panel active">
      <div className="panel-header">
        <h2 className="font-cormorant">BF Application ❤️</h2>
        <p>5 questions to get to know you</p>
      </div>

      <div className="form-stack">
        {/* Q1: Name & Username */}
        <div className="bf-q-card">
          <div className="bf-q-header">
            <span className="bf-q-num">1</span>
            <span className="bf-q-title">What should I call you?</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div>
              <label className="form-label" htmlFor="q-name">Name <span className="required" aria-label="required">*</span></label>
              <input
                id="q-name"
                type="text"
                className={`form-input ${errors.name ? "input-error" : ""}`}
                placeholder=""
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "q-name-error" : undefined}
              />
              {errors.name && <p className="field-error" id="q-name-error" role="alert">{errors.name}</p>}
            </div>
            <div>
              <label className="form-label" htmlFor="q-username">Username <span className="required" aria-label="required">*</span></label>
              <input
                id="q-username"
                type="text"
                className={`form-input ${errors.username ? "input-error" : ""}`}
                placeholder=""
                value={form.username}
                onChange={(e) => set("username", e.target.value)}
                aria-invalid={!!errors.username}
                aria-describedby={errors.username ? "q-username-error" : undefined}
              />
              {errors.username && <p className="field-error" id="q-username-error" role="alert">{errors.username}</p>}
            </div>
          </div>
        </div>

        {/* Q2: Interests */}
        <div className="bf-q-card">
          <div className="bf-q-header">
            <span className="bf-q-num">2</span>
            <span className="bf-q-title">Tell me about yourself...</span>
          </div>
          <textarea
            id="q-interests"
            className="form-input form-textarea"
            placeholder="What are you curious about..."
            rows={3}
            value={form.q1_interests}
            onChange={(e) => set("q1_interests", e.target.value)}
          />
        </div>

        {/* Q3: Favorite body part */}
        <div className="bf-q-card">
          <div className="bf-q-header">
            <span className="bf-q-num">3</span>
            <span className="bf-q-title">What&apos;s your favorite body part of mine?</span>
          </div>
          <textarea
            id="q-body"
            className="form-input form-textarea"
            placeholder="Don't be shy..."
            rows={2}
            value={form.q2_body_part}
            onChange={(e) => set("q2_body_part", e.target.value)}
          />
        </div>

        {/* Q4: Turn-ons */}
        <div className="bf-q-card">
          <div className="bf-q-header">
            <span className="bf-q-num">4</span>
            <span className="bf-q-title">What turns you on the most?</span>
          </div>
          <textarea
            id="q-turnons"
            className="form-input form-textarea"
            placeholder="What gets you going..."
            rows={3}
            value={form.q3_turn_ons}
            onChange={(e) => set("q3_turn_ons", e.target.value)}
          />
        </div>

        {/* Q5: About you */}
        <div className="bf-q-card">
          <div className="bf-q-header">
            <span className="bf-q-num">5</span>
            <span className="bf-q-title">Tell me about yourself! Anything I should know?</span>
          </div>
          <textarea
            id="q-about"
            className="form-input form-textarea"
            placeholder="Anything you want me to know — fantasies, preferences..."
            rows={4}
            value={form.q5_about_you}
            onChange={(e) => set("q5_about_you", e.target.value)}
          />
        </div>

        <button className="submit-btn" onClick={submit} disabled={loading || submitted} aria-busy={loading}>
          {loading ? <span className="btn-loading" aria-hidden="true">⏳</span> : null}
          {submitted ? "Submitted ❤️" : loading ? "Submitting..." : "Submit Application ❤️"}
        </button>
      </div>
    </div>
  );
}

// ===== PANEL: VIDEOS (Linktree-style) =====

function VideosPanel() {
  const [selectedVideo, setSelectedVideo] = useState<typeof ppvVideos[0] | null>(null);

  return (
    <div className="panel active">
      <div className="panel-header">
        <h2 className="font-cormorant">Exclusive Videos</h2>
      </div>

      <div className="dm-instruction">
        💬 DM the number with tip to unlock
      </div>

      {ppvVideos.map((video, i) => (
        <button
          key={video.id}
          className="link-btn"
          onClick={() => setSelectedVideo(video)}
          aria-label={`Unlock ${video.title} for $${video.price}`}
        >
          <div className="link-btn-num">{i + 1}</div>
          <div className={`link-btn-icon bg-gradient-to-br ${gradients[i]}`} aria-hidden="true">
            {video.emoji}
          </div>
          <div className="link-btn-content">
            <div className="link-btn-title font-cormorant">{video.title}</div>
            <div className="link-btn-desc">{video.description}</div>
          </div>
          <div className="link-btn-price">${video.price}</div>
          <div className="link-btn-arrow" aria-hidden="true">→</div>
        </button>
      ))}

      {selectedVideo && (
        <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}
    </div>
  );
}

// ===== PANEL: CUSTOM REQUEST =====

function CustomRequestPanel() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [minutes, setMinutes] = useState(10);
  const [accs, setAccs] = useState<string[]>([]);
  const [rush, setRush] = useState(false);
  const [specialRequests, setSpecialRequests] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleAcc = (id: string) =>
    setAccs((p) => (p.includes(id) ? p.filter((a) => a !== id) : [...p, id]));

  const basePrice = 100;
  const price = (() => {
    const accTotal = accs.reduce((s, id) => {
      const a = accessoryOptions.find((x) => x.id === id);
      return s + (a?.price || 0);
    }, 0);
    const durationPrice = basePrice * (minutes / 10);
    const subtotal = durationPrice + accTotal;
    const raw = rush ? subtotal * 1.5 : subtotal;
    return Math.round(raw / 50) * 50;
  })();

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!username.trim()) errs.username = "Please enter your username";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const r = await fetch("/api/custom-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username, minutes, accessories: accs,
          special_requests: specialRequests, estimated_price: price, rush,
        }),
      });
      if (r.ok) setSubmitted(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="success-state">
        <div className="success-icon" aria-hidden="true">🎬</div>
        <h2 className="font-cormorant">Request Received</h2>
        <p>I&apos;ll start working on your custom video right away.</p>
        <p style={{ color: "var(--accent-primary)", fontWeight: 500, marginTop: "0.5rem" }}>
          Estimated price: ${price}{rush ? " (includes 50% rush fee)" : ""}
        </p>
      </div>
    );
  }

  return (
    <div className="panel active" style={{ position: "relative", paddingBottom: "80px" }}>
      <div className="panel-header">
        <div className="label">Premium Service</div>
        <h2 className="font-cormorant">Custom Request</h2>
        <p>Build your dream video. Every detail, your way.</p>
      </div>

      <div className="form-stack">
        {/* Username */}
        <div>
          <label className="form-label" htmlFor="cr-username">Username <span className="required" aria-label="required">*</span></label>
          <input
            id="cr-username"
            type="text"
            className={`form-input ${errors.username ? "input-error" : ""}`}
            placeholder=""
            value={username}
            onChange={(e) => { setUsername(e.target.value); if (errors.username) setErrors((er) => { const n = { ...er }; delete n.username; return n; }); }}
            aria-invalid={!!errors.username}
            aria-describedby={errors.username ? "cr-username-error" : undefined}
          />
          {errors.username && <p className="field-error" id="cr-username-error" role="alert">{errors.username}</p>}
        </div>

        {/* Duration */}
        <div className="range-wrap">
          <div className="range-header">
            <label className="form-label range-label" htmlFor="cr-duration" style={{ marginBottom: 0 }}>Duration</label>
            <span className="range-value">{minutes} min</span>
          </div>
          <input
            id="cr-duration"
            type="range"
            min={10}
            max={30}
            step={5}
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            className="range-input"
            aria-valuemin={10}
            aria-valuemax={30}
            aria-valuenow={minutes}
            aria-valuetext={`${minutes} minutes`}
          />
          <div className="range-labels">
            <span>10 min</span>
            <span>20 min</span>
            <span>30 min</span>
          </div>
        </div>

        {/* Props / Extras */}
        <div>
          <label className="form-label" style={{ marginBottom: "0.5rem" }}>Props & Extras</label>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {accessoryOptions.map((acc) => (
              <button
                key={acc.id}
                type="button"
                className={`extra-toggle ${accs.includes(acc.id) ? "on" : ""}`}
                onClick={() => toggleAcc(acc.id)}
                aria-pressed={accs.includes(acc.id)}
              >
                {acc.label}
                <span className="extra-plus">+${acc.price}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Special Requests */}
        <div>
          <label className="form-label" htmlFor="cr-requests">Special Requests</label>
          <textarea
            id="cr-requests"
            className="form-input form-textarea"
            placeholder="Describe it in all its sexy details..."
            rows={3}
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
          />
        </div>

        {/* Rush Job */}
        <div>
          <button
            type="button"
            className={`extra-toggle ${rush ? "on" : ""}`}
            onClick={() => setRush(!rush)}
            aria-pressed={rush}
          >
            <span>Can&apos;t wait? 😉 Rush job (3 days)</span>
            <span className="extra-plus">+50%</span>
          </button>
        </div>
      </div>

      {/* STICKY PRICE BAR */}
      <div className="sticky-price" id="stickyPrice">
        <div className="sticky-info">
          <span className="sticky-label">Est.</span>
          <span className="sticky-amount font-cormorant"><AnimatedPrice value={price} /></span>
          <span className="sticky-detail">
            {minutes}min
            {rush && " · ⚡ Rush"}
            {accs.length > 0 && ` · ${accs.length} extra${accs.length > 1 ? 's' : ''}`}
          </span>
        </div>
        <a
          href="https://throne.com/ashyasian/item/fc8e1f23-bfc8-4a42-ac2e-987c31ca4b2f"
          target="_blank"
          rel="noopener noreferrer"
          className="sticky-btn"
          style={{ textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          Tip here
        </a>
      </div>
    </div>
  );
}
