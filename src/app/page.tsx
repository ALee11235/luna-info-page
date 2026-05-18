"use client";

import { useState } from "react";

// ===== DATA =====

const ppvVideos = [
  { id: 1, title: "Shower Show", description: "Steamy solo shower session, fully nude and wet", price: 15, duration: "12 min", emoji: "🚿" },
  { id: 2, title: "Late Night Vibes", description: "Playing with myself late at night in your favorite lingerie", price: 20, duration: "18 min", emoji: "🌙" },
  { id: 3, title: "Toy Time", description: "Full session with my favorite toys, multiple orgasms", price: 25, duration: "22 min", emoji: "🎀" },
  { id: 4, title: "Strip Tease", description: "Slow seductive strip tease with custom outfit", price: 12, duration: "8 min", emoji: "💃" },
  { id: 5, title: "BDSM Play", description: "Light bondage and domination, just for you", price: 30, duration: "25 min", emoji: "⛓️" },
  { id: 6, title: "Girlfriend Experience", description: "Full POV girlfriend experience, intimate and personal", price: 35, duration: "30 min", emoji: "💕" },
  { id: 7, title: "Anal Play", description: "Full anal play session with toys, very explicit", price: 40, duration: "20 min", emoji: "🍑" },
  { id: 8, title: "Cum Show", description: "Multiple orgasms, cum on command", price: 28, duration: "15 min", emoji: "💦" },
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
  const tabs = ["Get to Know You", "PPV Videos", "Custom Request"];

  return (
    <div className="min-h-screen flex flex-col noise">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-[70px] flex items-center justify-between">
          <span className="text-2xl font-cormorant tracking-wider text-[var(--accent-primary)]">Luna</span>
          <div className="flex gap-1 sm:gap-2">
            {tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 ${
                  activeTab === i
                    ? "bg-[var(--accent-soft)] text-[var(--accent-primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <main className="flex-1 pt-[70px]">
        <div className={`transition-opacity duration-300 ${activeTab === 0 ? "block" : "hidden"}`}>
          <QuestionnaireSection />
        </div>
        <div className={`transition-opacity duration-300 ${activeTab === 1 ? "block" : "hidden"}`}>
          <PpvSection />
        </div>
        <div className={`transition-opacity duration-300 ${activeTab === 2 ? "block" : "hidden"}`}>
          <CustomRequestSection />
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-8 text-center border-t border-[var(--border-subtle)]">
        <p className="text-xs text-[var(--text-muted)] tracking-[0.2em] uppercase">Exclusive Content for Subscribers</p>
      </footer>
    </div>
  );
}

// ===== SECTION: QUESTIONNAIRE =====

function QuestionnaireSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", favorite_content: "", fantasies: "", frequency: "", additional_notes: "",
  });

  const set = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  const submit = async () => {
    try {
      const r = await fetch("/api/questionnaire", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (r.ok) setSubmitted(true);
    } catch (e) { console.error(e); }
  };

  if (submitted) {
    return (
      <section className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center animate-fade-in-up max-w-lg">
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-[var(--accent-soft)] flex items-center justify-center">
            <span className="text-4xl">💋</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-cormorant mb-4 gold-gradient">Thank You, Baby</h2>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
            I can&apos;t wait to read your answers. I&apos;ll create content just for you.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <div className="text-center mb-12 animate-fade-in-up">
        <div className="text-2xl mb-4 opacity-60">✦</div>
        <h2 className="text-3xl sm:text-5xl font-cormorant mb-4 gold-gradient">Help Me Get to Know You</h2>
        <p className="text-[var(--text-secondary)] text-lg max-w-md mx-auto font-light leading-relaxed">
          Answer these questions so I can create the perfect content just for you
        </p>
      </div>

      <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField label="Your Name" value={form.name} onChange={(v) => set("name", v)} placeholder="What should I call you?" />
          <InputField label="Email" value={form.email} onChange={(v) => set("email", v)} placeholder="your@email.com" type="email" />
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--text-secondary)] mb-2 uppercase tracking-[0.15em]">Favorite Content Type</label>
          <select
            value={form.favorite_content}
            onChange={(e) => set("favorite_content", e.target.value)}
            className="w-full px-4 py-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-primary)] outline-none focus:border-[var(--accent-primary)] focus:shadow-[0_0_0_3px_var(--accent-soft)] transition-all duration-300 appearance-none"
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
          <label className="block text-xs font-medium text-[var(--text-secondary)] mb-2 uppercase tracking-[0.15em]">Fantasies You&apos;d Like Me to Fulfill</label>
          <textarea
            value={form.fantasies}
            onChange={(e) => set("fantasies", e.target.value)}
            placeholder="Tell me everything... I want to know what gets you excited"
            rows={4}
            className="w-full px-4 py-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--accent-primary)] focus:shadow-[0_0_0_3px_var(--accent-soft)] transition-all duration-300 resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--text-secondary)] mb-3 uppercase tracking-[0.15em]">How Often Do You Want New Content?</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {["Daily", "Few times a week", "Weekly", "Whenever inspired"].map((opt) => (
              <button
                key={opt}
                onClick={() => set("frequency", opt)}
                className={`px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 border ${
                  form.frequency === opt
                    ? "bg-[var(--accent-soft)] text-[var(--accent-primary)] border-[var(--accent-primary)]"
                    : "bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[var(--border-default)] hover:text-[var(--text-primary)]"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--text-secondary)] mb-2 uppercase tracking-[0.15em]">Anything Else?</label>
          <textarea
            value={form.additional_notes}
            onChange={(e) => set("additional_notes", e.target.value)}
            placeholder="Special requests, preferences, things you love..."
            rows={3}
            className="w-full px-4 py-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--accent-primary)] focus:shadow-[0_0_0_3px_var(--accent-soft)] transition-all duration-300 resize-none"
          />
        </div>

        <button
          onClick={submit}
          className="w-full py-4 rounded-full bg-[var(--accent-primary)] text-[var(--bg-primary)] font-semibold text-sm uppercase tracking-[0.15em] hover:bg-[var(--accent-secondary)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,168,83,0.25)]"
        >
          Submit
        </button>
      </div>
    </section>
  );
}

// ===== SECTION: PPV VIDEOS =====

function PpvSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <div className="text-center mb-12 animate-fade-in-up">
        <span className="text-xs tracking-[0.25em] uppercase text-[var(--accent-primary)] mb-3 block font-medium">Pay Per View</span>
        <h2 className="text-3xl sm:text-5xl font-cormorant mb-4 gold-gradient">Exclusive Videos</h2>
        <p className="text-[var(--text-secondary)] text-lg max-w-md mx-auto font-light leading-relaxed">
          Each video made with intention. Find the ones that speak to you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ppvVideos.map((video, i) => (
          <div
            key={video.id}
            className="group rounded-2xl overflow-hidden bg-[var(--bg-card)] border border-[var(--border-subtle)] hover-lift animate-fade-in-up cursor-pointer"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className={`aspect-[3/4] bg-gradient-to-br ${gradients[i]} flex items-center justify-center relative overflow-hidden`}>
              <span className="text-6xl opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500">{video.emoji}</span>
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-3 left-3">
                <span className="inline-block px-3 py-1 rounded-full bg-[var(--accent-primary)] text-[var(--bg-primary)] text-sm font-semibold">
                  ${video.price}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-cormorant text-lg font-semibold text-[var(--text-primary)] mb-1">{video.title}</h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-3 font-light">{video.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--text-muted)]">{video.duration}</span>
                <button className="text-sm text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] transition-colors font-medium">
                  Unlock →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ===== SECTION: CUSTOM REQUEST =====

function CustomRequestSection() {
  const [submitted, setSubmitted] = useState(false);
  const [minutes, setMinutes] = useState(15);
  const [videoType, setVideoType] = useState("solo");
  const [accs, setAccs] = useState<string[]>([]);
  const [specialRequests, setSpecialRequests] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const toggleAcc = (id: string) => setAccs((p) => p.includes(id) ? p.filter((a) => a !== id) : [...p, id]);

  const price = (() => {
    const base = videoTypes.find((v) => v.id === videoType)?.basePrice || 80;
    const accTotal = accs.reduce((s, id) => { const a = accessoryOptions.find((x) => x.id === id); return s + (a?.price || 0); }, 0);
    return Math.round(base * (minutes / 15) + accTotal);
  })();

  const submit = async () => {
    try {
      const r = await fetch("/api/custom-request", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, minutes, video_type: videoType, accessories: accs, special_requests: specialRequests, estimated_price: price }) });
      if (r.ok) setSubmitted(true);
    } catch (e) { console.error(e); }
  };

  if (submitted) {
    return (
      <section className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center animate-fade-in-up max-w-lg">
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-[var(--accent-soft)] flex items-center justify-center">
            <span className="text-4xl">🎬</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-cormorant mb-4 gold-gradient">Request Received</h2>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-4 font-light">
            I&apos;ll start working on your custom video right away.
          </p>
          <p className="text-[var(--accent-primary)] text-sm font-medium">Estimated price: ${price}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <div className="text-center mb-12 animate-fade-in-up">
        <span className="text-xs tracking-[0.25em] uppercase text-[var(--accent-primary)] mb-3 block font-medium">Premium Service</span>
        <h2 className="text-3xl sm:text-5xl font-cormorant mb-4 gold-gradient">Custom Request</h2>
        <p className="text-[var(--text-secondary)] text-lg max-w-md mx-auto font-light leading-relaxed">
          Build your dream video. Every detail, your way.
        </p>
      </div>

      <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
        {/* Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField label="Your Name" value={name} onChange={setName} placeholder="What should I call you?" />
          <InputField label="Email" value={email} onChange={setEmail} placeholder="your@email.com" type="email" />
        </div>

        <div className="border-t border-[var(--border-subtle)]" />

        {/* Video Type */}
        <div>
          <label className="block text-xs font-medium text-[var(--text-secondary)] mb-3 uppercase tracking-[0.15em]">Video Type</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {videoTypes.map((vt) => (
              <button
                key={vt.id}
                onClick={() => setVideoType(vt.id)}
                className={`p-4 rounded-xl text-center transition-all duration-300 border ${
                  videoType === vt.id
                    ? "bg-[var(--accent-soft)] border-[var(--accent-primary)] text-[var(--accent-primary)]"
                    : "bg-[var(--bg-card)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-default)]"
                }`}
              >
                <div className="text-2xl mb-1">{vt.emoji}</div>
                <div className="font-medium text-sm">{vt.label}</div>
                <div className="text-xs mt-1 opacity-50">from ${vt.basePrice}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-[0.15em]">Duration</label>
            <span className="text-[var(--accent-primary)] font-semibold">{minutes} min</span>
          </div>
          <input
            type="range" min={5} max={60} step={5} value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none bg-[var(--bg-card)] accent-[var(--accent-primary)] cursor-pointer"
          />
          <div className="flex justify-between text-xs text-[var(--text-muted)] mt-2">
            <span>5 min</span><span>15 min</span><span>30 min</span><span>45 min</span><span>60 min</span>
          </div>
        </div>

        <div className="border-t border-[var(--border-subtle)]" />

        {/* Accessories */}
        <div>
          <label className="block text-xs font-medium text-[var(--text-secondary)] mb-3 uppercase tracking-[0.15em]">Accessories & Extras</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {accessoryOptions.map((acc) => (
              <button
                key={acc.id}
                onClick={() => toggleAcc(acc.id)}
                className={`px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 border flex items-center justify-between ${
                  accs.includes(acc.id)
                    ? "bg-[var(--accent-soft)] border-[var(--accent-primary)] text-[var(--accent-primary)]"
                    : "bg-[var(--bg-card)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-default)]"
                }`}
              >
                <span>{acc.label}</span>
                <span className="text-xs opacity-50">+${acc.price}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Special Requests */}
        <div>
          <label className="block text-xs font-medium text-[var(--text-secondary)] mb-2 uppercase tracking-[0.15em]">Special Requests</label>
          <textarea
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            placeholder="Describe your dream scene in detail..."
            rows={4}
            className="w-full px-4 py-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--accent-primary)] focus:shadow-[0_0_0_3px_var(--accent-soft)] transition-all duration-300 resize-none"
          />
        </div>

        {/* Price */}
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] p-6 text-center gold-glow">
          <div className="text-xs text-[var(--text-muted)] mb-1 tracking-[0.2em] uppercase">Estimated Price</div>
          <div className="text-5xl font-cormorant font-semibold text-[var(--accent-primary)]">${price}</div>
          <div className="text-xs text-[var(--text-muted)] mt-2">
            {minutes} min · {videoTypes.find((v) => v.id === videoType)?.label}
            {accs.length > 0 && ` · ${accs.length} extras`}
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={submit}
          className="w-full py-4 rounded-full bg-[var(--accent-primary)] text-[var(--bg-primary)] font-semibold text-sm uppercase tracking-[0.15em] hover:bg-[var(--accent-secondary)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,168,83,0.25)]"
        >
          Submit Request
        </button>
      </div>
    </section>
  );
}

// ===== SHARED COMPONENTS =====

function InputField({ label, value, onChange, placeholder, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-[var(--text-secondary)] mb-2 uppercase tracking-[0.15em]">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--accent-primary)] focus:shadow-[0_0_0_3px_var(--accent-soft)] transition-all duration-300"
      />
    </div>
  );
}
