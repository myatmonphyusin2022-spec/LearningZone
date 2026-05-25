import { useState } from "react";

/* ── tiny helpers ── */
const Input = ({ label, type="text", value, onChange, placeholder, icon }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{label}</label>
    <div className="relative">
      {icon && <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">{icon}</span>}
      <input
        type={type} value={value} onChange={onChange} placeholder={placeholder}
        className={`w-full bg-slate-50 border border-slate-200 rounded-xl py-3 text-sm text-slate-800 outline-none
          focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all placeholder:text-slate-300
          ${icon ? "pl-10 pr-4" : "px-4"}`}
      />
    </div>
  </div>
);

const Toggle = ({ label, desc, value, onChange }) => (
  <div className="flex items-start justify-between gap-4 py-4 border-b border-slate-100 last:border-0">
    <div>
      <p className="text-sm font-semibold text-slate-800">{label}</p>
      {desc && <p className="text-xs text-slate-400 mt-0.5">{desc}</p>}
    </div>
    <button
      onClick={() => onChange(!value)}
      className={`relative shrink-0 w-11 h-6 rounded-full transition-all duration-300
        ${value ? "bg-indigo-600" : "bg-slate-200"}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm
        transition-transform duration-300 ${value ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  </div>
);

const Avatar = ({ name, size = "lg" }) => {
  const initials = name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
  const sz = size === "lg" ? "w-20 h-20 text-2xl" : "w-10 h-10 text-sm";
  return (
    <div className={`${sz} rounded-full bg-gradient-to-br from-indigo-500 to-violet-600
      flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200`}>
      {initials}
    </div>
  );
};

/* ─────────────────────────────────
   MAIN COMPONENT
───────────────────────────────── */
export default function LoginSettings() {
  // views: "login" | "signup" | "forgot" | "settings"
  const [view,    setView]    = useState("login");
  const [loggedIn,setLoggedIn]= useState(false);

  // login fields
  const [email,   setEmail]   = useState("");
  const [password,setPassword]= useState("");
  const [showPw,  setShowPw]  = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  // signup fields
  const [name,    setName]    = useState("");
  const [email2,  setEmail2]  = useState("");
  const [pw2,     setPw2]     = useState("");
  const [pw3,     setPw3]     = useState("");

  // forgot
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent,  setForgotSent]  = useState(false);

  // settings state
  const [user, setUser] = useState({
    name: "Nguyen Van A", email: "vana@gmail.com",
    role: "Student", joined: "January 2026", courses: 4,
  });
  const [editName,  setEditName]  = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);
  const [notifEmail,setNotifEmail]= useState(true);
  const [notifPush, setNotifPush] = useState(false);
  const [notifNews, setNotifNews] = useState(true);
  const [privPublic,setPrivPublic]= useState(false);
  const [privCerts, setPrivCerts] = useState(true);
  const [lang,      setLang]      = useState("en");
  const [saved,     setSaved]     = useState(false);
  const [deleteConf,setDeleteConf]= useState(false);
  const [activeTab, setActiveTab] = useState("profile"); // profile | notifications | privacy | account

  /* ── actions ── */
  function handleLogin(e) {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    if (!email.includes("@")) { setError("Please enter a valid email address."); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLoggedIn(true);
      setView("settings");
    }, 1200);
  }

  function handleSignup(e) {
    e.preventDefault();
    setError("");
    if (!name || !email2 || !pw2 || !pw3) { setError("Please fill in all fields."); return; }
    if (pw2 !== pw3) { setError("Passwords do not match."); return; }
    if (pw2.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setUser(u => ({ ...u, name, email: email2 }));
      setEditName(name); setEditEmail(email2);
      setLoggedIn(true); setView("settings");
    }, 1200);
  }

  function handleForgot(e) {
    e.preventDefault();
    if (!forgotEmail.includes("@")) { setError("Enter a valid email."); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setForgotSent(true); }, 1000);
  }

  function handleSaveProfile() {
    setUser(u => ({ ...u, name: editName, email: editEmail }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function handleLogout() {
    setLoggedIn(false); setView("login");
    setEmail(""); setPassword(""); setError("");
  }

  /* ── settings tabs ── */
  const TABS = [
    { id:"profile",       icon:"👤", label:"Profile"       },
    { id:"notifications", icon:"🔔", label:"Notifications" },
    { id:"privacy",       icon:"🔒", label:"Privacy"       },
    { id:"account",       icon:"⚙️", label:"Account"       },
  ];

  /* ═══════════════════════════════════════
     RENDER
  ═══════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-violet-50/20 flex items-center justify-center p-4">

      {/* ── LOGIN ── */}
      {view === "login" && (
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl
              bg-gradient-to-br from-indigo-600 to-violet-600 shadow-xl shadow-indigo-200 mb-4">
              <span className="text-white font-black text-xl font-serif">L</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Welcome back</h1>
            <p className="text-slate-400 text-sm mt-1">Log in to your LearnZone account</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8">
            {error && (
              <div className="mb-5 px-4 py-3 bg-red-50 border border-red-100 rounded-xl
                text-red-600 text-sm flex items-center gap-2">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <Input label="Email address" type="email" value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com" icon="✉️" />
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Password</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔑</span>
                  <input
                    type={showPw ? "text" : "password"} value={password}
                    onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-12
                      text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500/30
                      focus:border-indigo-400 transition-all placeholder:text-slate-300"
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400
                      hover:text-slate-600 transition-colors text-xs font-semibold">
                    {showPw ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <button type="button" onClick={() => { setView("forgot"); setError(""); }}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold transition-colors">
                  Forgot password?
                </button>
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white
                  font-bold rounded-xl text-sm shadow-lg shadow-indigo-200 hover:opacity-90
                  transition-all disabled:opacity-60 flex items-center justify-center gap-2 mt-2">
                {loading ? (
                  <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Signing in…</>
                ) : "Log In →"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-slate-100" />
              <span className="text-xs text-slate-400 font-medium">or continue with</span>
              <div className="flex-1 h-px bg-slate-100" />
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-3">
              {[["🌐","Google"],["🐙","GitHub"]].map(([icon,name])=>(
                <button key={name}
                  className="flex items-center justify-center gap-2 py-2.5 border border-slate-200
                    rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50
                    hover:border-slate-300 transition-all">
                  {icon} {name}
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-sm text-slate-500 mt-5">
            Don't have an account?{" "}
            <button onClick={() => { setView("signup"); setError(""); }}
              className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors">
              Sign up free
            </button>
          </p>

          {/* Demo hint */}
          <p className="text-center text-xs text-slate-400 mt-3">
            💡 Any email + password works for this demo
          </p>
        </div>
      )}

      {/* ── SIGN UP ── */}
      {view === "signup" && (
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl
              bg-gradient-to-br from-indigo-600 to-violet-600 shadow-xl shadow-indigo-200 mb-4">
              <span className="text-white font-black text-xl font-serif">L</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Create your account</h1>
            <p className="text-slate-400 text-sm mt-1">Join 12,000+ learners on LearnZone</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8">
            {error && (
              <div className="mb-5 px-4 py-3 bg-red-50 border border-red-100 rounded-xl
                text-red-600 text-sm flex items-center gap-2">⚠️ {error}</div>
            )}
            <form onSubmit={handleSignup} className="space-y-4">
              <Input label="Full name" value={name} onChange={e=>setName(e.target.value)}
                placeholder="Nguyen Van A" icon="👤" />
              <Input label="Email address" type="email" value={email2}
                onChange={e=>setEmail2(e.target.value)} placeholder="you@example.com" icon="✉️" />
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Password</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔑</span>
                  <input type={showPw?"text":"password"} value={pw2} onChange={e=>setPw2(e.target.value)}
                    placeholder="Min. 8 characters"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-800
                      outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all placeholder:text-slate-300" />
                </div>
                {/* Strength bar */}
                {pw2 && (
                  <div className="flex gap-1 mt-1">
                    {[1,2,3,4].map(i=>(
                      <div key={i} className={`flex-1 h-1 rounded-full transition-colors
                        ${pw2.length>=i*2 ? i<=1?"bg-red-400":i<=2?"bg-amber-400":i<=3?"bg-yellow-400":"bg-green-400" : "bg-slate-100"}`} />
                    ))}
                  </div>
                )}
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Confirm password</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔑</span>
                  <input type={showPw?"text":"password"} value={pw3} onChange={e=>setPw3(e.target.value)}
                    placeholder="Re-enter password"
                    className={`w-full bg-slate-50 border rounded-xl py-3 pl-10 pr-4 text-sm text-slate-800
                      outline-none focus:ring-2 transition-all placeholder:text-slate-300
                      ${pw3&&pw3!==pw2?"border-red-300 focus:ring-red-500/20":"border-slate-200 focus:ring-indigo-500/30 focus:border-indigo-400"}`} />
                  {pw3&&pw2===pw3&&<span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-green-500 text-sm">✓</span>}
                </div>
              </div>

              <label className="flex items-start gap-2.5 cursor-pointer mt-1">
                <input type="checkbox" className="mt-0.5 accent-indigo-600" required />
                <span className="text-xs text-slate-500 leading-relaxed">
                  I agree to the{" "}
                  <span className="text-indigo-600 font-semibold">Terms of Service</span>
                  {" "}and{" "}
                  <span className="text-indigo-600 font-semibold">Privacy Policy</span>
                </span>
              </label>

              <button type="submit" disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white
                  font-bold rounded-xl text-sm shadow-lg shadow-indigo-200 hover:opacity-90
                  transition-all disabled:opacity-60 flex items-center justify-center gap-2 mt-1">
                {loading ? (
                  <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Creating account…</>
                ) : "Create Account →"}
              </button>
            </form>
          </div>

          <p className="text-center text-sm text-slate-500 mt-5">
            Already have an account?{" "}
            <button onClick={() => { setView("login"); setError(""); }}
              className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors">
              Log in
            </button>
          </p>
        </div>
      )}

      {/* ── FORGOT PASSWORD ── */}
      {view === "forgot" && (
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl
              bg-gradient-to-br from-amber-400 to-orange-500 shadow-xl shadow-amber-200 mb-4 text-2xl">
              🔐
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Reset password</h1>
            <p className="text-slate-400 text-sm mt-1">
              {forgotSent ? "Check your inbox!" : "We'll send you a reset link"}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8">
            {forgotSent ? (
              <div className="text-center py-4">
                <div className="text-5xl mb-4">📬</div>
                <p className="text-slate-700 font-semibold mb-2">Email sent successfully!</p>
                <p className="text-slate-400 text-sm mb-6">
                  We sent a reset link to <strong className="text-slate-700">{forgotEmail}</strong>.
                  Check your inbox (and spam folder).
                </p>
                <button onClick={() => { setView("login"); setForgotSent(false); setForgotEmail(""); }}
                  className="text-indigo-600 font-bold text-sm hover:text-indigo-800 transition-colors">
                  ← Back to login
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgot} className="space-y-4">
                {error && (
                  <div className="px-4 py-3 bg-red-50 border border-red-100 rounded-xl
                    text-red-600 text-sm">⚠️ {error}</div>
                )}
                <Input label="Email address" type="email" value={forgotEmail}
                  onChange={e=>{setForgotEmail(e.target.value);setError("")}}
                  placeholder="you@example.com" icon="✉️" />
                <button type="submit" disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white
                    font-bold rounded-xl text-sm shadow-lg shadow-amber-200 hover:opacity-90
                    transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                  {loading ? (
                    <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Sending…</>
                  ) : "Send Reset Link →"}
                </button>
              </form>
            )}
          </div>

          {!forgotSent && (
            <p className="text-center text-sm text-slate-500 mt-5">
              Remember it?{" "}
              <button onClick={() => { setView("login"); setError(""); }}
                className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors">
                Back to login
              </button>
            </p>
          )}
        </div>
      )}

      {/* ── SETTINGS ── */}
      {view === "settings" && loggedIn && (
        <div className="w-full max-w-3xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Account Settings</h1>
              <p className="text-slate-400 text-sm mt-0.5">Manage your profile and preferences</p>
            </div>
            <button onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-500
                rounded-xl text-sm font-semibold hover:bg-red-50 transition-all">
              🚪 Log Out
            </button>
          </div>

          <div className="grid grid-cols-[220px_1fr] gap-5">

            {/* ── Sidebar ── */}
            <div className="space-y-1">
              {/* User card */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5 mb-4 text-center shadow-sm">
                <Avatar name={user.name} />
                <div className="mt-3">
                  <p className="font-bold text-slate-900 text-sm">{user.name}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{user.email}</p>
                  <span className="inline-block mt-2 px-2.5 py-0.5 bg-indigo-100 text-indigo-700
                    text-xs font-bold rounded-full">{user.role}</span>
                </div>
                <div className="flex divide-x divide-slate-100 border border-slate-100
                  rounded-xl mt-4 overflow-hidden">
                  <div className="flex-1 py-2.5 text-center">
                    <p className="font-black text-slate-900 text-lg">{user.courses}</p>
                    <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-widest">Courses</p>
                  </div>
                  <div className="flex-1 py-2.5 text-center">
                    <p className="font-black text-slate-900 text-lg">2</p>
                    <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-widest">Certs</p>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              {TABS.map(t => (
                <button key={t.id} onClick={() => setActiveTab(t.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold
                    transition-all duration-150 text-left
                    ${activeTab===t.id
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                      : "text-slate-600 hover:bg-slate-100"}`}>
                  <span>{t.icon}</span>{t.label}
                </button>
              ))}
            </div>

            {/* ── Main panel ── */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

              {/* ── PROFILE TAB ── */}
              {activeTab === "profile" && (
                <div>
                  <div className="px-7 py-5 border-b border-slate-100">
                    <h2 className="font-bold text-slate-900">Profile Information</h2>
                    <p className="text-slate-400 text-xs mt-0.5">Update your name, email and avatar</p>
                  </div>
                  <div className="p-7 space-y-5">
                    {/* Avatar upload area */}
                    <div className="flex items-center gap-5 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <Avatar name={editName||"?"} />
                      <div>
                        <p className="text-sm font-semibold text-slate-800 mb-1">Profile picture</p>
                        <p className="text-xs text-slate-400 mb-3">JPG, PNG or GIF · max 2 MB</p>
                        <button className="px-4 py-2 border border-slate-200 text-slate-700 text-xs
                          font-semibold rounded-xl hover:bg-white hover:border-indigo-300
                          hover:text-indigo-600 transition-all">
                          Upload Photo
                        </button>
                      </div>
                    </div>

                    <Input label="Full name" value={editName} onChange={e=>setEditName(e.target.value)}
                      placeholder="Your name" icon="👤" />
                    <Input label="Email address" type="email" value={editEmail}
                      onChange={e=>setEditEmail(e.target.value)} placeholder="you@example.com" icon="✉️" />

                    {/* Language */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Language</label>
                      <select value={lang} onChange={e=>setLang(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm
                          text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400
                          transition-all cursor-pointer">
                        <option value="en">🇺🇸 English</option>
                        <option value="vi">🇻🇳 Tiếng Việt</option>
                        <option value="ja">🇯🇵 Japanese</option>
                        <option value="ko">🇰🇷 Korean</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <button onClick={handleSaveProfile}
                        className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl text-sm
                          hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200">
                        Save Changes
                      </button>
                      {saved && (
                        <span className="text-green-600 text-sm font-semibold flex items-center gap-1.5
                          animate-fade-in">
                          ✓ Saved successfully!
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ── NOTIFICATIONS TAB ── */}
              {activeTab === "notifications" && (
                <div>
                  <div className="px-7 py-5 border-b border-slate-100">
                    <h2 className="font-bold text-slate-900">Notifications</h2>
                    <p className="text-slate-400 text-xs mt-0.5">Choose what you want to be notified about</p>
                  </div>
                  <div className="p-7">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Email</p>
                    <div className="bg-slate-50 rounded-2xl border border-slate-100 px-5 mb-5">
                      <Toggle label="Course updates" desc="New lessons and course announcements"
                        value={notifEmail} onChange={setNotifEmail} />
                      <Toggle label="Newsletter" desc="Weekly tips, new courses, and industry news"
                        value={notifNews} onChange={setNotifNews} />
                    </div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Push</p>
                    <div className="bg-slate-50 rounded-2xl border border-slate-100 px-5">
                      <Toggle label="Push notifications" desc="In-browser alerts for activity"
                        value={notifPush} onChange={setNotifPush} />
                    </div>
                    <div className="mt-6 p-4 bg-indigo-50 border border-indigo-100 rounded-2xl">
                      <p className="text-xs text-indigo-700 font-semibold">
                        💡 You can unsubscribe from emails at any time using the link in the footer of any email we send.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── PRIVACY TAB ── */}
              {activeTab === "privacy" && (
                <div>
                  <div className="px-7 py-5 border-b border-slate-100">
                    <h2 className="font-bold text-slate-900">Privacy</h2>
                    <p className="text-slate-400 text-xs mt-0.5">Control what others can see about you</p>
                  </div>
                  <div className="p-7">
                    <div className="bg-slate-50 rounded-2xl border border-slate-100 px-5 mb-6">
                      <Toggle label="Public profile" desc="Allow others to see your profile and progress"
                        value={privPublic} onChange={setPrivPublic} />
                      <Toggle label="Show certificates" desc="Display your earned certificates on your profile"
                        value={privCerts} onChange={setPrivCerts} />
                    </div>
                    <div className="space-y-3">
                      {[
                        ["📄","Download my data","Export a copy of all your account data"],
                        ["📊","Activity history","See what data LearnZone has collected"],
                      ].map(([icon,title,desc])=>(
                        <button key={title}
                          className="w-full flex items-center gap-4 p-4 border border-slate-200
                            rounded-2xl text-left hover:border-indigo-200 hover:bg-indigo-50/50
                            transition-all group">
                          <span className="text-xl">{icon}</span>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-slate-800 group-hover:text-indigo-700">{title}</p>
                            <p className="text-xs text-slate-400">{desc}</p>
                          </div>
                          <span className="text-slate-300 group-hover:text-indigo-400 transition-colors">→</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── ACCOUNT TAB ── */}
              {activeTab === "account" && (
                <div>
                  <div className="px-7 py-5 border-b border-slate-100">
                    <h2 className="font-bold text-slate-900">Account</h2>
                    <p className="text-slate-400 text-xs mt-0.5">Manage your subscription and account</p>
                  </div>
                  <div className="p-7 space-y-5">
                    {/* Plan */}
                    <div className="p-5 bg-gradient-to-br from-indigo-600 to-violet-700
                      rounded-2xl text-white">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-indigo-200">Current Plan</p>
                          <p className="font-black text-xl mt-0.5">Free Tier</p>
                        </div>
                        <span className="text-3xl">✨</span>
                      </div>
                      <p className="text-indigo-200 text-xs mb-4">
                        Upgrade to Pro for unlimited courses, certificates, and priority support.
                      </p>
                      <button className="px-5 py-2 bg-white text-indigo-700 font-bold text-sm
                        rounded-xl hover:bg-indigo-50 transition-colors">
                        Upgrade to Pro →
                      </button>
                    </div>

                    {/* Change password */}
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Security</p>
                      <div className="space-y-3">
                        <Input label="Current password" type="password"
                          value="" onChange={()=>{}} placeholder="••••••••" icon="🔑" />
                        <Input label="New password" type="password"
                          value="" onChange={()=>{}} placeholder="Min. 8 characters" icon="🔑" />
                        <button className="px-5 py-2.5 border border-slate-200 text-slate-700 font-semibold
                          text-sm rounded-xl hover:border-indigo-300 hover:text-indigo-600 transition-all">
                          Update Password
                        </button>
                      </div>
                    </div>

                    {/* Account info */}
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Account Info</p>
                      <div className="space-y-2">
                        {[
                          ["Member since", user.joined],
                          ["Account ID", "LZ-00421"],
                          ["Status", "Active ✓"],
                        ].map(([k,v])=>(
                          <div key={k} className="flex items-center justify-between">
                            <span className="text-xs text-slate-400">{k}</span>
                            <span className="text-xs font-semibold text-slate-700">{v}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Danger zone */}
                    <div className="border border-red-100 rounded-2xl p-5 bg-red-50/50">
                      <p className="text-xs font-bold text-red-500 uppercase tracking-widest mb-1">Danger Zone</p>
                      <p className="text-xs text-slate-500 mb-4">
                        Deleting your account is permanent and cannot be undone. All your progress,
                        certificates, and data will be erased.
                      </p>
                      {!deleteConf ? (
                        <button onClick={() => setDeleteConf(true)}
                          className="px-5 py-2 border border-red-300 text-red-500 font-semibold
                            text-sm rounded-xl hover:bg-red-100 transition-all">
                          Delete Account
                        </button>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-xs font-bold text-red-600">
                            Are you sure? This cannot be undone.
                          </p>
                          <div className="flex gap-2">
                            <button onClick={handleLogout}
                              className="px-5 py-2 bg-red-600 text-white font-bold text-sm
                                rounded-xl hover:bg-red-700 transition-colors">
                              Yes, delete
                            </button>
                            <button onClick={() => setDeleteConf(false)}
                              className="px-5 py-2 border border-slate-200 text-slate-600 font-semibold
                                text-sm rounded-xl hover:bg-slate-100 transition-colors">
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}