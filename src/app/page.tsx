"use client";

import { useState, useEffect, useRef } from "react";

// ===== DATA =====

const ppvVideos = [
  { id: 1, title: "Shower Show", description: "Steamy solo shower · 12 min", price: 15, emoji: "🚿" },
  { id: 2, title: "Late Night Vibes", description: "Favorite lingerie · 18 min", price: 20, emoji: "🌙" },
  { id: 3, title: "Toy Time", description: "Multiple orgasms · 22 min", price: 25, emoji: "🎀" },
  { id: 4, title: "Strip Tease", description: "Slow seductive tease · 8 min", price: 12, emoji: "💃" },
  { id: 5, title: "BDSM Play", description: "Light bondage · 25 min", price: 30, emoji: "⛓️" },
  { id: 6, title: "Girlfriend Experience", description: "Full POV · 30 min", price: 35, emoji: "💕" },
  { id: 7, title: "Anal Play", description: "Toys, very explicit · 20 min", price: 40, emoji: "🍑" },
  { id: 8, title: "Cum Show", description: "Multiple orgasms · 15 min", price: 28, emoji: "💦" },
];

const videoTypes = [
  { id: "solo", label: "Solo", basePrice: 100, emoji: "💋" },
];

const accessoryOptions = [
  { id: "dildo", label: "Dildo", price: 20 },
  { id: "lingerie", label: "Lingerie Set", price: 20 },
  { id: "heels", label: "Heels", price: 10 },
  { id: "outfit", label: "Custom Outfit", price: 25 },
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
          Unlock for ${video.price}
        </button>
        <p className="modal-note">Payment integration coming soon</p>
      </div>
    </div>
  );
}

// ===== BOOBIE PIC UPLOAD PLACEHOLDER =====

function BoobieUpload({ index, label }: { index: number; label: string }) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const colors = [
    "from-rose-900/40 to-pink-900/30",
    "from-pink-900/40 to-fuchsia-900/30",
    "from-fuchsia-900/40 to-rose-900/30",
  ];

  return (
    <div>
      <label className="form-label">{label}</label>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
        id={`boob-upload-${index}`}
      />
      <button
        type="button"
        className={`boobie-upload-box bg-gradient-to-br ${colors[index % 3]}`}
        onClick={() => fileRef.current?.click()}
        aria-label={`Upload ${label}`}
      >
        {preview ? (
          <img src={preview} alt={label} className="boobie-preview" />
        ) : (
          <div className="boobie-placeholder">
            <span className="boobie-icon">📸</span>
            <span className="boobie-text">Tap to add pic</span>
          </div>
        )}
      </button>
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
    <div className="min-h-screen flex flex-col pb-[56px] md:pb-0">
      {/* PROFILE HEADER */}
      <div className="profile-header">
        <div className="avatar" aria-hidden="true">✨</div>
        <div className="profile-name">Luna</div>
        <div className="profile-bio">Exclusive content & custom requests. Made just for you.</div>
      </div>

      {/* SECTION TABS (horizontal scroll) */}
      <div className="section-tabs" role="tablist" aria-label="Content sections">
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
      </div>

      {/* CONTENT PANELS */}
      <main className="flex-1">
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

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-ornament" aria-hidden="true">✦</div>
        <p className="footer-text">Exclusive Content for Subscribers</p>
        <p className="footer-copy">© {new Date().getFullYear()} Luna. All rights reserved.</p>
      </footer>
    </div>
  );
}

// ===== PANEL: BF APPLICATION (5 Questions) =====

function BfApplicationPanel() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    username: "",
    favorite_content: "",
    fantasies: "",
    frequency: "",
  });
  const [freqChips, setFreqChips] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (field: string, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((e) => { const n = { ...e }; delete n[field]; return n; });
  };

  const toggleFreq = (opt: string) => {
    setFreqChips((prev) => {
      const next = prev.includes(opt) ? prev.filter((f) => f !== opt) : [...prev, opt];
      set("frequency", next.join(", "));
      return next;
    });
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
        body: JSON.stringify({ ...form, frequency: freqChips.join(", ") }),
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
        <p>5 questions so I can get to know you ❤️</p>
      </div>

      <div className="form-stack">
        {/* Q1: Name & Email */}
        <div className="bf-q-card">
          <div className="bf-q-header">
            <span className="bf-q-num">1</span>
            <span className="bf-q-title">Who are you?</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div>
              <label className="form-label" htmlFor="q-name">Name <span className="required" aria-label="required">*</span></label>
              <input
                id="q-name"
                type="text"
                className={`form-input ${errors.name ? "input-error" : ""}`}
                placeholder="What should I call you?"
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
                placeholder="your username"
                value={form.username}
                onChange={(e) => set("username", e.target.value)}
                aria-invalid={!!errors.username}
                aria-describedby={errors.username ? "q-username-error" : undefined}
              />
              {errors.username && <p className="field-error" id="q-username-error" role="alert">{errors.username}</p>}
            </div>
          </div>
        </div>

        {/* Q2: Favorite Content */}
        <div className="bf-q-card">
          <div className="bf-q-header">
            <span className="bf-q-num">2</span>
            <span className="bf-q-title">What&apos;s your favorite content?</span>
          </div>
          <select
            id="q-content"
            className="form-select"
            value={form.favorite_content}
            onChange={(e) => set("favorite_content", e.target.value)}
          >
            <option value="">Select one...</option>
            <option value="solo">Solo / Masturbation</option>
            <option value="pov">POV</option>
            <option value="fetish">Fetish / BDSM</option>
            <option value="anal">Anal</option>
            <option value="lesbian">Lesbian / Girl-Girl</option>
            <option value="couple">Couple Content</option>
            <option value="custom">Custom Requests</option>
          </select>
        </div>

        {/* Q3: Fantasies */}
        <div className="bf-q-card">
          <div className="bf-q-header">
            <span className="bf-q-num">3</span>
            <span className="bf-q-title">What fantasies should I fulfill?</span>
          </div>
          <textarea
            id="q-fantasies"
            className="form-input form-textarea"
            placeholder="Tell me everything... I want to know what gets you excited"
            rows={3}
            value={form.fantasies}
            onChange={(e) => set("fantasies", e.target.value)}
          />
        </div>

        {/* Q4: Frequency */}
        <div className="bf-q-card">
          <div className="bf-q-header">
            <span className="bf-q-num">4</span>
            <span className="bf-q-title">How often do you want new content?</span>
          </div>
          <div className="chips" role="group" aria-label="Content frequency">
            {["Daily", "Few times a week", "Weekly", "Whenever inspired"].map((opt) => (
              <button
                key={opt}
                type="button"
                className={`chip ${freqChips.includes(opt) ? "on" : ""}`}
                onClick={() => toggleFreq(opt)}
                aria-pressed={freqChips.includes(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Q5: Open-ended */}
        <div className="bf-q-card">
          <div className="bf-q-header">
            <span className="bf-q-num">5</span>
            <span className="bf-q-title">Show me what you like 💕</span>
          </div>
          <p className="bf-q-subtitle">Upload reference pics so I know exactly what you love</p>
          <div className="boobie-grid">
            <BoobieUpload index={0} label="Pic 1 — Favorite" />
            <BoobieUpload index={1} label="Pic 2 — Inspo" />
            <BoobieUpload index={2} label="Pic 3 — Dream" />
          </div>
        </div>

        <button className="submit-btn" onClick={submit} disabled={loading} aria-busy={loading}>
          {loading ? <span className="btn-loading" aria-hidden="true">⏳</span> : null}
          {loading ? "Submitting..." : "Submit Application ❤️"}
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
        <div className="label">Pay Per View</div>
        <h2 className="font-cormorant">Exclusive Videos</h2>
        <p>Tap to unlock. Each one made with you in mind.</p>
      </div>

      {ppvVideos.map((video, i) => (
        <button
          key={video.id}
          className="link-btn"
          onClick={() => setSelectedVideo(video)}
          aria-label={`Unlock ${video.title} for $${video.price}`}
        >
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
  const [minutes, setMinutes] = useState(15);
  const [videoType, setVideoType] = useState("solo");
  const [accs, setAccs] = useState<string[]>([]);
  const [rush, setRush] = useState(false);
  const [specialRequests, setSpecialRequests] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleAcc = (id: string) =>
    setAccs((p) => (p.includes(id) ? p.filter((a) => a !== id) : [...p, id]));

  const price = (() => {
    const base = videoTypes.find((v) => v.id === videoType)?.basePrice || 100;
    const accTotal = accs.reduce((s, id) => {
      const a = accessoryOptions.find((x) => x.id === id);
      return s + (a?.price || 0);
    }, 0);
    const durationPrice = base * (minutes / 10);
    const subtotal = durationPrice + accTotal;
    return Math.round(rush ? subtotal * 1.5 : subtotal);
  })();

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Please enter your name";
    if (!email.trim()) errs.username = "Please enter your username";
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
          name, email, minutes, video_type: videoType, accessories: accs,
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
    <div className="panel active" style={{ position: "relative" }}>
      <div className="panel-header">
        <div className="label">Premium Service</div>
        <h2 className="font-cormorant">Custom Request</h2>
        <p>Build your dream video. Every detail, your way.</p>
      </div>

      <div className="form-stack">
        {/* Name & Email */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          <div>
            <label className="form-label" htmlFor="cr-name">Name <span className="required" aria-label="required">*</span></label>
            <input
              id="cr-name"
              type="text"
              className={`form-input ${errors.name ? "input-error" : ""}`}
              placeholder="Your name"
              value={name}
              onChange={(e) => { setName(e.target.value); if (errors.name) setErrors((er) => { const n = { ...er }; delete n.name; return n; }); }}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "cr-name-error" : undefined}
            />
            {errors.name && <p className="field-error" id="cr-name-error" role="alert">{errors.name}</p>}
          </div>
          <div>
            <label className="form-label" htmlFor="cr-username">Username <span className="required" aria-label="required">*</span></label>
            <input
              id="cr-username"
              type="text"
              className={`form-input ${errors.username ? "input-error" : ""}`}
              placeholder="your username"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (errors.username) setErrors((er) => { const n = { ...er }; delete n.username; return n; }); }}
              aria-invalid={!!errors.username}
              aria-describedby={errors.username ? "cr-username-error" : undefined}
            />
            {errors.username && <p className="field-error" id="cr-username-error" role="alert">{errors.username}</p>}
          </div>
        </div>

        {/* Video Type */}
        <div>
          <label className="form-label" style={{ marginBottom: "0.5rem" }}>Video Type</label>
          <div className="btn-grid" role="radiogroup" aria-label="Video type">
            {videoTypes.map((vt) => (
              <button
                key={vt.id}
                type="button"
                role="radio"
                aria-checked={videoType === vt.id}
                className={`type-btn ${videoType === vt.id ? "selected" : ""}`}
                onClick={() => setVideoType(vt.id)}
              >
                <span className="type-btn-emoji" aria-hidden="true">{vt.emoji}</span>
                <span className="type-btn-name">{vt.label}</span>
                <span className="type-btn-from">from ${vt.basePrice}</span>
              </button>
            ))}
          </div>
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
            min={5}
            max={60}
            step={5}
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            className="range-input"
            aria-valuemin={5}
            aria-valuemax={60}
            aria-valuenow={minutes}
            aria-valuetext={`${minutes} minutes`}
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
            <span>⚡ Rush Job (faster delivery)</span>
            <span className="extra-plus">+50%</span>
          </button>
        </div>

        {/* Extras */}
        <div>
          <label className="form-label" style={{ marginBottom: "0.5rem" }}>Extras</label>
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
            placeholder="Describe your dream scene in detail..."
            rows={3}
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
          />
        </div>
      </div>

      {/* STICKY PRICE BAR */}
      <div className="sticky-price" id="stickyPrice">
        <div className="sticky-info">
          <span className="sticky-label">Est.</span>
          <span className="sticky-amount font-cormorant"><AnimatedPrice value={price} /></span>
          <span className="sticky-detail">
            {minutes}min · {videoTypes.find((v) => v.id === videoType)?.label}
            {rush && " · ⚡ Rush"}
            {accs.length > 0 && ` · ${accs.length} extra${accs.length > 1 ? 's' : ''}`}
          </span>
        </div>
        <button className="sticky-btn" onClick={submit} disabled={loading} aria-busy={loading}>
          {loading ? "..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
