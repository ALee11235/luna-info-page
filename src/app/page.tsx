"use client";

import { useState } from "react";

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
        <div className="avatar">✨</div>
        <div className="profile-name">Luna</div>
        <div className="profile-bio">Exclusive content & custom requests. Made just for you.</div>
      </div>

      {/* SECTION TABS (horizontal scroll) */}
      <div className="section-tabs">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`section-tab ${activeTab === i ? "active" : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* CONTENT PANELS */}
      <main className="flex-1">
        {activeTab === 0 && <QuestionnairePanel />}
        {activeTab === 1 && <VideosPanel />}
        {activeTab === 2 && <CustomRequestPanel />}
      </main>

      {/* FOOTER */}
      <footer className="footer-text">Exclusive Content for Subscribers</footer>
    </div>
  );
}

// ===== PANEL: QUESTIONNAIRE =====

function QuestionnairePanel() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", favorite_content: "", fantasies: "", frequency: "", additional_notes: "",
  });
  const [freqChips, setFreqChips] = useState<string[]>([]);

  const set = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  const toggleFreq = (opt: string) => {
    setFreqChips((prev) =>
      prev.includes(opt) ? prev.filter((f) => f !== opt) : [...prev, opt]
    );
    set("frequency", freqChips.includes(opt) ? "" : opt);
  };

  const submit = async () => {
    try {
      const r = await fetch("/api/questionnaire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, frequency: freqChips.join(", ") }),
      });
      if (r.ok) setSubmitted(true);
    } catch (e) { console.error(e); }
  };

  if (submitted) {
    return (
      <div className="success-state">
        <div className="success-icon">💋</div>
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
          <label className="form-label">Your Name</label>
          <input
            type="text"
            className="form-input"
            placeholder="What should I call you?"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
          />
        </div>
        <div>
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-input"
            placeholder="your@email.com"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
          />
        </div>
        <div>
          <label className="form-label">Favorite Content Type</label>
          <select
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
          <label className="form-label">Fantasies You&apos;d Like Me to Fulfill</label>
          <textarea
            className="form-input form-textarea"
            placeholder="Tell me everything... I want to know what gets you excited"
            rows={3}
            value={form.fantasies}
            onChange={(e) => set("fantasies", e.target.value)}
          />
        </div>
        <div>
          <label className="form-label" style={{ marginBottom: "0.5rem" }}>How Often Do You Want New Content?</label>
          <div className="chips">
            {["Daily", "Few times a week", "Weekly", "Whenever inspired"].map((opt) => (
              <button
                key={opt}
                type="button"
                className={`chip ${freqChips.includes(opt) ? "on" : ""}`}
                onClick={() => toggleFreq(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="form-label">Anything Else?</label>
          <textarea
            className="form-input form-textarea"
            placeholder="Special requests, preferences, things you love..."
            rows={2}
            value={form.additional_notes}
            onChange={(e) => set("additional_notes", e.target.value)}
          />
        </div>
        <button className="submit-btn" onClick={submit}>Submit</button>
      </div>
    </div>
  );
}

// ===== PANEL: VIDEOS (Linktree-style) =====

function VideosPanel() {
  return (
    <div className="panel active">
      <div className="panel-header">
        <div className="label">Pay Per View</div>
        <h2 className="font-cormorant">Exclusive Videos</h2>
        <p>Tap to unlock. Each one made with you in mind.</p>
      </div>

      {ppvVideos.map((video, i) => (
        <a key={video.id} className="link-btn" href="#">
          <div className={`link-btn-icon bg-gradient-to-br ${gradients[i]}`}>
            {video.emoji}
          </div>
          <div className="link-btn-content">
            <div className="link-btn-title font-cormorant">{video.title}</div>
            <div className="link-btn-desc">{video.description}</div>
          </div>
          <div className="link-btn-price">${video.price}</div>
          <div className="link-btn-arrow">→</div>
        </a>
      ))}
    </div>
  );
}

// ===== PANEL: CUSTOM REQUEST =====

function CustomRequestPanel() {
  const [submitted, setSubmitted] = useState(false);
  const [minutes, setMinutes] = useState(15);
  const [videoType, setVideoType] = useState("solo");
  const [accs, setAccs] = useState<string[]>([]);
  const [specialRequests, setSpecialRequests] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

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

  const submit = async () => {
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
    } catch (e) { console.error(e); }
  };

  if (submitted) {
    return (
      <div className="success-state">
        <div className="success-icon">🎬</div>
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
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Video Type */}
        <div>
          <label className="form-label" style={{ marginBottom: "0.5rem" }}>Video Type</label>
          <div className="btn-grid">
            {videoTypes.map((vt) => (
              <button
                key={vt.id}
                type="button"
                className={`type-btn ${videoType === vt.id ? "selected" : ""}`}
                onClick={() => setVideoType(vt.id)}
              >
                <span className="type-btn-emoji">{vt.emoji}</span>
                <span className="type-btn-name">{vt.label}</span>
                <span className="type-btn-from">from ${vt.basePrice}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div className="range-wrap">
          <div className="range-header">
            <label className="form-label" style={{ marginBottom: 0 }}>Duration</label>
            <span className="range-value">{minutes} min</span>
          </div>
          <input
            type="range"
            min={5}
            max={60}
            step={5}
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            className="range-input"
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
              >
                {acc.label}
                <span className="extra-plus">+${acc.price}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Special Requests */}
        <div>
          <label className="form-label">Special Requests</label>
          <textarea
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
          <div className="sticky-amount font-cormorant">${price}</div>
          <div className="sticky-detail">
            {minutes} min · {videoTypes.find((v) => v.id === videoType)?.label}
            {accs.length > 0 && ` · ${accs.length} extras`}
          </div>
        </div>
        <button className="sticky-btn" onClick={submit}>Submit Request</button>
      </div>
    </div>
  );
}
