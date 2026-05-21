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
  { id: "solo", label: "Solo", basePrice: 80, emoji: "💋" },
  { id: "pov", label: "POV", basePrice: 100, emoji: "🎥" },
  { id: "couple", label: "Couple", basePrice: 150, emoji: "👫" },
  { id: "lesbian", label: "Lesbian", basePrice: 140, emoji: "👩‍❤️‍👩" },
];

const accessoryOptions = [
  { id: "dildo", label: "Dildo", price: 20 },
  { id: "vibrator", label: "Vibrator", price: 15 },
  { id: "butt-plug", label: "Butt Plug", price: 15 },
  { id: "blindfold", label: "Blindfold", price: 10 },
  { id: "rope", label: "Bondage", price: 15 },
  { id: "outfit", label: "Special Outfit", price: 25 },
  { id: "heels", label: "Heels", price: 10 },
  { id: "lingerie", label: "Lingerie Set", price: 20 },
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

// ===== MAIN PAGE =====

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { label: "✦ Get to Know You", short: "Get to Know You" },
    { label: "🎬 Videos", short: "Videos" },
    { label: "💫 Custom Request", short: "Custom Request" },
  ];

  return (
    <div className="min-h-screen flex flex-col pb-[80px] md:pb-0">
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
          <QuestionnairePanel />
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

// ===== PANEL: QUESTIONNAIRE =====

function QuestionnairePanel() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", favorite_content: "", fantasies: "", frequency: "", additional_notes: "",
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
    if (!form.email.trim()) errs.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Please enter a valid email";
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
        <div className="label">For My Subscribers</div>
        <h2 className="font-cormorant">Get to Know You</h2>
        <p>Answer these questions so I can create the perfect content just for you</p>
      </div>

      <div className="form-stack">
        <div>
          <label className="form-label" htmlFor="q-name">Your Name <span className="required" aria-label="required">*</span></label>
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
          <label className="form-label" htmlFor="q-email">Email <span className="required" aria-label="required">*</span></label>
          <input
            id="q-email"
            type="email"
            className={`form-input ${errors.email ? "input-error" : ""}`}
            placeholder="your@email.com"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "q-email-error" : undefined}
          />
          {errors.email && <p className="field-error" id="q-email-error" role="alert">{errors.email}</p>}
        </div>
        <div>
          <label className="form-label" htmlFor="q-content">Favorite Content Type</label>
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
        <div>
          <label className="form-label" htmlFor="q-fantasies">Fantasies You&apos;d Like Me to Fulfill</label>
          <textarea
            id="q-fantasies"
            className="form-input form-textarea"
            placeholder="Tell me everything... I want to know what gets you excited"
            rows={3}
            value={form.fantasies}
            onChange={(e) => set("fantasies", e.target.value)}
          />
        </div>
        <div>
          <label className="form-label" style={{ marginBottom: "0.5rem" }}>How Often Do You Want New Content?</label>
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
        <div>
          <label className="form-label" htmlFor="q-notes">Anything Else?</label>
          <textarea
            id="q-notes"
            className="form-input form-textarea"
            placeholder="Special requests, preferences, things you love..."
            rows={2}
            value={form.additional_notes}
            onChange={(e) => set("additional_notes", e.target.value)}
          />
        </div>
        <button className="submit-btn" onClick={submit} disabled={loading} aria-busy={loading}>
          {loading ? <span className="btn-loading" aria-hidden="true">⏳</span> : null}
          {loading ? "Submitting..." : "Submit"}
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
  const [specialRequests, setSpecialRequests] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleAcc = (id: string) =>
    setAccs((p) => (p.includes(id) ? p.filter((a) => a !== id) : [...p, id]));

  const price = (() => {
    const base = videoTypes.find((v) => v.id === videoType)?.basePrice || 80;
    const accTotal = accs.reduce((s, id) => {
      const a = accessoryOptions.find((x) => x.id === id);
      return s + (a?.price || 0);
    }, 0);
    return Math.round(base * (minutes / 15) + accTotal);
  })();

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Please enter your name";
    if (!email.trim()) errs.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Please enter a valid email";
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
          name, email, minutes, video_type: videoType,
          accessories: accs, special_requests: specialRequests, estimated_price: price,
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
          Estimated price: ${price}
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
            <label className="form-label" htmlFor="cr-email">Email <span className="required" aria-label="required">*</span></label>
            <input
              id="cr-email"
              type="email"
              className={`form-input ${errors.email ? "input-error" : ""}`}
              placeholder="you@email.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((er) => { const n = { ...er }; delete n.email; return n; }); }}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "cr-email-error" : undefined}
            />
            {errors.email && <p className="field-error" id="cr-email-error" role="alert">{errors.email}</p>}
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
            <label className="form-label" htmlFor="cr-duration" style={{ marginBottom: 0 }}>Duration</label>
            <span className="range-value"><AnimatedPrice value={minutes === 15 ? minutes : minutes} /> min</span>
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
          <div className="range-labels">
            <span>5</span><span>15</span><span>30</span><span>45</span><span>60</span>
          </div>
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
          <div className="sticky-label">Estimated</div>
          <div className="sticky-amount font-cormorant"><AnimatedPrice value={price} /></div>
          <div className="sticky-detail">
            {minutes} min · {videoTypes.find((v) => v.id === videoType)?.label}
            {accs.length > 0 && ` · ${accs.length} extras`}
          </div>
        </div>
        <button className="sticky-btn" onClick={submit} disabled={loading} aria-busy={loading}>
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </div>
    </div>
  );
}
