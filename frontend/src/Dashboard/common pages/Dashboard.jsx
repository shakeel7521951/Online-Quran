import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  FaUsers, FaChalkboardTeacher, FaBookOpen, FaChartLine, FaBell, FaSearch,
  FaPlus, FaUserPlus, FaCheckCircle, FaDownload, FaMoon, FaSun,
  FaExpand, FaCompress, FaUndo, FaCopy, FaSync, FaEye, FaPen, FaTrash
} from "react-icons/fa";

/* ---------------- Brand palette ---------------- */
const BRAND = {
  primary: "#0E7C5A",
  gold: "#D4AF37",
  dark: "#2C3E50",
  light: "#F5F7FA",
  ink: "#0B1324",
  brown: "#967B5A",
};
const ease = [0.16, 1, 0.3, 1];

/* ---------- Global micro-FX (ripple, shimmer) ---------- */
const FX = () => (
  <style>{`
    .ripple { position: relative; overflow:hidden; }
    .ripple:after { content:""; position:absolute; left:50%; top:50%; width:0; height:0; opacity:0; background:rgba(255,255,255,.35); border-radius:9999px; transform:translate(-50%, -50%); }
    .ripple:active:after { width:220%; height:220%; opacity:1; transition: width .35s ease, height .35s ease, opacity .6s ease; }

    .shimmer { position:relative; background:#eef2f6; overflow:hidden; }
    .shimmer:before { content:""; position:absolute; inset:0; transform:translateX(-100%); background:linear-gradient(90deg, transparent, rgba(255,255,255,.55), transparent); animation:sh 1.2s ease-in-out infinite; }
    @keyframes sh { to { transform:translateX(100%); } }

    .no-scrollbar::-webkit-scrollbar{ display:none }
    .no-scrollbar{ -ms-overflow-style:none; scrollbar-width:none }
  `}</style>
);

/* ---------- tiny helpers ---------- */
const useResize = (ref) => {
  const [rect, setRect] = useState({ width: 300, height: 150 });
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([e]) => setRect(e.contentRect));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, [ref]);
  return rect;
};
const useLocalStorage = (key, initial) => {
  const [val, setVal] = useState(() => {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : initial; }
    catch { return initial; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(val)); } catch{} }, [key, val]);
  return [val, setVal];
};
const useMedia = (q) => {
  const [m, setM] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const fn = () => setM(mq.matches);
    fn();
    mq.addEventListener ? mq.addEventListener("change", fn) : mq.addListener(fn);
    return () => (mq.removeEventListener ? mq.removeEventListener("change", fn) : mq.removeListener(fn));
  }, [q]);
  return m;
};
const CountUp = ({ value, duration = 1000 }) => {
  const [v, setV] = useState(0);
  useEffect(() => {
    let id, s;
    const step = (t) => {
      if (!s) s = t;
      const p = Math.min(1, (t - s) / duration);
      const e = 1 - Math.pow(1 - p, 3);
      setV(Math.round(value * e));
      if (p < 1) id = requestAnimationFrame(step);
    };
    id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [value, duration]);
  return <>{v.toLocaleString()}</>;
};
const StatusBadge = ({ s }) => {
  const map = {
    Active: { fg: BRAND.primary, bg: "#0E7C5A1A" },
    Trial: { fg: "#B45309", bg: "#B453091A" },
    Inactive: { fg: "#64748B", bg: "#64748B1A" },
  };
  const { fg, bg } = map[s] || map.Inactive;
  return (
    <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ color: fg, background: bg }}>
      {s}
    </span>
  );
};

/* ---------- Sparkline for KPI cards ---------- */
const Spark = ({ data, color }) => {
  if (!data?.length) return null;
  const w = 120, h = 36, max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * (w - 6) + 3;
    const y = h - 3 - ((d - min) / Math.max(1, max - min)) * (h - 6);
    return `${x},${y}`;
  }).join(" L ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <defs>
        <linearGradient id={`spark-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity=".35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`M ${pts}`} stroke={color} strokeWidth="2" fill="none" />
      <path d={`M ${pts} L ${w-3},${h-3} L 3,${h-3} Z`} fill={`url(#spark-${color})`} />
    </svg>
  );
};

/* ===================================================================
   AreaChart — responsive height + tight legend
   =================================================================== */
const AreaChart = ({ series, labels, height = 280, legend, onToggle, svgRef }) => {
  const holder = useRef(null);
  const { width } = useResize(holder);
  const [hover, setHover] = useState(null);
  const isXS = width < 480;

  const pad = isXS ? { t: 12, r: 8, b: 16, l: 32 } : { t: 16, r: 12, b: 18, l: 40 };
  const W = Math.max(300, width);
  const H = isXS ? 220 : height;

  const visible = series.filter(s => !legend.hidden.has(s.name));
  const flat = visible.flatMap(s => s.data);
  const yMin = Math.min(...flat), yMax = Math.max(...flat);
  const niceMin = Math.floor(yMin * 0.95), niceMax = Math.ceil(yMax * 1.05);
  const plotW = W - pad.l - pad.r, plotH = H - pad.t - pad.b;

  const x = (i) => pad.l + (plotW * i) / (labels.length - 1);
  const y = (v) => pad.t + plotH - ((v - niceMin) / (niceMax - niceMin || 1)) * plotH;
  const getPath = (arr) => arr.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(v)}`).join(" ");
  const getArea = (arr) => `${getPath(arr)} L ${x(arr.length-1)} ${pad.t+plotH} L ${x(0)} ${pad.t+plotH} Z`;
  const idxFromX = (px) => {
    const v = Math.max(pad.l, Math.min(px, pad.l + plotW)) - pad.l;
    return Math.round((v / plotW) * (labels.length - 1));
  };

  return (
    <div ref={holder} className="relative w-full min-w-0">
      <svg ref={svgRef} width={W} height={H}>
        {[0,1,2,3,4].map(i=>(<line key={i} x1={pad.l} x2={W-pad.r} y1={pad.t + (plotH*i/4)} y2={pad.t + (plotH*i/4)} stroke="#e5e7eb" strokeDasharray="3 5"/>))}
        {[0,1,2,3,4].map((i)=>(<text key={i} x={8} y={pad.t + (plotH*i/4) + 4} fontSize={isXS? "10":"11"} fill="#64748b">{Math.round(niceMax - (niceMax-niceMin)*i/4)}</text>))}
        <defs>
          {visible.map((s, i)=>(<linearGradient key={i} id={`g-${i}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={s.color} stopOpacity="0.28"/><stop offset="100%" stopColor={s.color} stopOpacity="0"/></linearGradient>))}
        </defs>
        {visible.map((s, i)=>(<motion.path key={`a${s.name}`} d={getArea(s.data)} fill={`url(#g-${i})`} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.6, delay:.05*i}} />))}
        {visible.map((s, i)=>(<motion.path key={`l${s.name}`} d={getPath(s.data)} fill="none" stroke={s.color} strokeWidth="2.5" initial={{pathLength:0}} animate={{pathLength:1}} transition={{duration:.8, delay:.05*i, ease}}/>))}
        {hover != null && (
          <>
            <line x1={x(hover)} x2={x(hover)} y1={pad.t} y2={pad.t+plotH} stroke="#94a3b8" strokeDasharray="4 4"/>
            {visible.map((s,i)=>(<circle key={i} cx={x(hover)} cy={y(s.data[hover])} r={isXS? "3.5":"4.5"} fill="#fff" stroke={s.color} strokeWidth="2"/>))}
          </>
        )}
        {[0, Math.floor((labels.length-1)/2), labels.length-1].map((i)=>(<text key={i} x={x(i)} y={H-6} fontSize={isXS? "10":"11"} textAnchor="middle" fill="#64748b">{labels[i]}</text>))}
        <rect x={pad.l} y={pad.t} width={plotW} height={H - pad.t - pad.b} fill="transparent"
          onMouseMove={(e)=> setHover(idxFromX(e.nativeEvent.offsetX))}
          onMouseLeave={()=> setHover(null)}
          onTouchMove={(e)=> { const r=e.currentTarget.getBoundingClientRect(); setHover(idxFromX(e.touches[0].clientX - r.left)); }}
          onTouchEnd={()=> setHover(null)}
        />
      </svg>

      {/* tight legend */}
      <div className="flex flex-wrap gap-2 mt-0">
        {series.map((s)=>(
          <button key={s.name}
            className={`px-2.5 py-1 rounded-full text-xs border transition ${legend.hidden.has(s.name) ? "bg-white text-slate-500 border-slate-200" : "text-white"}`}
            style={{ background: legend.hidden.has(s.name) ? undefined : s.color }}
            onClick={()=>onToggle(s.name)}
          >
            {legend.hidden.has(s.name) ? "Show" : "Hide"} {s.name}
          </button>
        ))}
      </div>
    </div>
  );
};

/* ===================================================================
   Donut chart
   =================================================================== */
const DonutChart = ({ segments, size = 200, thickness = 26, hidden = new Set(), selected = null, onToggleHidden, onSelect, svgRef }) => {
  const visible = segments.filter(s => !hidden.has(s.label));
  const totalVisible = Math.max(1, visible.reduce((s, x) => s + x.value, 0));
  const totalAll = Math.max(1, segments.reduce((s, x) => s + x.value, 0));
  const R = size / 2;
  const r = R - 10;
  const C = 2 * Math.PI * r;

  let acc = 0;
  const arcs = visible.map((s) => {
    const pct = s.value / totalVisible;
    const dash = pct * C;
    const arc = { ...s, dash, offset: -acc, pct: Math.round(pct * 100) };
    acc += dash;
    return arc;
  });

  const [hoverIdx, setHoverIdx] = useState(null);
  const hover = hoverIdx != null ? arcs[hoverIdx] : null;

  const labelShown = hover?.label || selected || "Total";
  const valueShown =
    hover ? hover.value :
    selected ? segments.find(x => x.label===selected)?.value ?? 0 :
    totalAll;
  const pctShown =
    hover ? `${hover.pct}%` :
    selected ? (()=>{ const val = segments.find(x => x.label===selected)?.value ?? 0; const p = Math.round((val / totalVisible) * 100); return isFinite(p) ? `${p}%` : ""; })() :
    "";

  return (
    <div className="relative">
      <svg ref={svgRef} width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <g transform={`translate(${R},${R}) rotate(-90)`}>
          <circle r={r} cx="0" cy="0" stroke="#e5e7eb" strokeWidth={thickness} fill="none" />
          {arcs.map((a, i) => (
            <g key={a.label}>
              <circle
                r={r} cx="0" cy="0" fill="none"
                stroke={a.color} strokeWidth={thickness}
                strokeDasharray={`${a.dash} ${C - a.dash}`} strokeDashoffset={a.offset}
                style={{ cursor: "pointer", transition:"stroke-dashoffset .6s cubic-bezier(.16,1,.3,1)" }}
                onMouseEnter={()=>setHoverIdx(i)} onMouseLeave={()=>setHoverIdx(null)}
                onClick={()=> onSelect(selected===a.label ? null : a.label)}
              />
            </g>
          ))}
        </g>
        <g transform={`translate(${R},${R})`}>
          <text textAnchor="middle" dy="-4" fontSize="18" fontWeight="700" fill="#0B1324">{labelShown}</text>
          <text textAnchor="middle" dy="16" fontSize="12" fill="#64748b">{valueShown.toLocaleString()} {pctShown && `• ${pctShown}`}</text>
        </g>
      </svg>
    </div>
  );
};

/* ---------- generic modal ---------- */
const Modal = ({ title, onClose, children, wide=false }) => (
  <AnimatePresence>
    <motion.div className="fixed inset-0 bg-black/40 z-50" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose}/>
    <motion.div initial={{scale:.95,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:.95,opacity:0}}
      className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className={`w-full ${wide?'max-w-2xl':'max-w-lg'} bg-white rounded-2xl shadow-xl p-6`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button className="ripple w-9 h-9 rounded-md border border-slate-200 hover:bg-slate-50" onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </motion.div>
  </AnimatePresence>
);

/* ===================================================================
   Dashboard (fully responsive)
   =================================================================== */
export const Dashboard = () => {
  const isSmall = useMedia("(max-width: 767px)");
  const [range, setRange] = useLocalStorage("dash:range", "30d");
  const [dark, setDark] = useLocalStorage("dash:dark", false);
  const [loading, setLoading] = useState(false);
  const [legendHidden, setLegendHidden] = useState(new Set());
  const [userQ, setUserQ] = useState("");
  useReducedMotion();

  const [showHelp, setShowHelp] = useState(false);
  const [refreshSpin, setRefreshSpin] = useState(false);

  const [pieHidden, setPieHidden] = useState(new Set());
  const [pieSelected, setPieSelected] = useState(null);
  const pieSvgRef = useRef(null);
  const togglePieHidden = (label) => {
    setPieHidden(prev => { const n = new Set(prev); n.has(label) ? n.delete(label) : n.add(label); return n; });
  };

  const areaSvgRef = useRef(null);
  const [chartFull, setChartFull] = useState(false);

  // Demo base data
  const baseData = useMemo(() => ({
    users: 1245, tutors: 48, courses: 12, trials: 56,
    sparkUsers: [220, 260, 310, 420, 520, 610, 720, 840],
    sparkTrials: [6, 9, 13, 18, 15, 22, 28, 33],
    delta: { users: +12, tutors: +3, courses: +1, trials: +6 },
    latestUsers: [
      { name: "Ahmed Ali",  email: "ahmed@example.com",  status: "Active",   joined: "Today",  role: "Student", avatar: "https://i.pravatar.cc/40?img=11" },
      { name: "Fatima Noor",email: "fatima@example.com", status: "Trial",    joined: "2d ago", role: "Student", avatar: "https://i.pravatar.cc/40?img=15" },
      { name: "Yusuf Khan", email: "yusuf@example.com",  status: "Active",   joined: "3d ago", role: "Student", avatar: "https://i.pravatar.cc/40?img=13" },
      { name: "Aisha Rahman",email: "aisha@example.com", status: "Inactive", joined: "5d ago", role: "Student", avatar: "https://i.pravatar.cc/40?img=17" },
    ],
  }), []);
  const [users, setUsers] = useState(baseData.latestUsers);
  const [page, setPage] = useState(1);
  const perPage = 4;
  const pages = Math.max(1, Math.ceil(users.length / perPage));
  useEffect(()=>{ if(page>pages) setPage(pages); },[pages, page]);
  const [totalUsers, setTotalUsers] = useState(baseData.users);
  const [coursesCount, setCoursesCount] = useState(baseData.courses);
  const tutorsActive = users.filter(u => u.role==="Tutor" && u.status==="Active").length;

  const statusCounts = useMemo(() => {
    const m = { Active: 0, Trial: 0, Inactive: 0 };
    users.forEach(u => (m[u.status] = (m[u.status] || 0) + 1));
    return m;
  }, [users]);

  const pieSegments = [
    { label:"Active",   value: statusCounts.Active,   color: BRAND.primary },
    { label:"Trial",    value: statusCounts.Trial,    color: BRAND.gold },
    { label:"Inactive", value: statusCounts.Inactive, color: "#94a3b8" },
  ];

  const chart = useMemo(() => {
    const make = (len, start, step) => Array.from({length: len}, (_,i)=> Math.round(start + i*step + Math.sin(i*0.7)*step*0.8 + (i%5?0:step*2)));
    let len = 30, lbl = (i)=>`Day ${i+1}`;
    if (range==="7d") { len=7; lbl=(i)=>["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i%7]; }
    if (range==="90d"){ len=90; lbl=(i)=>`D${i+1}`; }
    if (range==="Today"){ len=24; lbl=(i)=>`${i}:00`; }
    const users  = make(len, 600, 8);
    const trials = make(len, 10, 0.4).map(v=>Math.max(2,v));
    return {
      labels: Array.from({length: len}, (_,i)=>lbl(i)),
      series: [
        { name:"Users",  color: BRAND.primary, data: users },
        { name:"Trials", color: BRAND.brown,   data: trials }
      ]
    };
  }, [range]);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 420);
    return () => clearTimeout(t);
  }, [range]);

  const legend = { hidden: legendHidden };
  const toggleLegend = (name) => {
    setLegendHidden(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name); else next.add(name);
      return next;
    });
  };
  const resetLegend = () => setLegendHidden(new Set());

  const filteredUsers = useMemo(()=>{
    const t = userQ.trim().toLowerCase();
    let arr = users.filter(u => (u.name+u.email+u.status+u.joined+u.role).toLowerCase().includes(t));
    if (pieSelected) arr = arr.filter(u => u.status === pieSelected);
    return arr;
  }, [users, userQ, pieSelected]);

  const exportUsersCSV = () => {
    const rows = [["Name","Email","Status","Joined","Role"]];
    filteredUsers.forEach(u => rows.push([u.name,u.email,u.status,u.joined,u.role]));
    const csv = rows.map(r => r.map(x => `"${String(x).replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], {type: "text/csv;charset=utf-8;"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `latest-users-${range}.csv`; a.click();
    URL.revokeObjectURL(url);
  };
  const copyEmails = async () => {
    const emails = filteredUsers.map(u=>u.email).join(", ");
    await navigator.clipboard.writeText(emails);
    alert("Emails copied to clipboard!");
  };
  const exportAreaPNG = () => {
    const svg = areaSvgRef.current; if (!svg) return;
    const xml = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([xml], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = svg.width.baseVal.value || 800;
      canvas.height = svg.height.baseVal.value || 280;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffffff"; ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.drawImage(img, 0, 0);
      const png = canvas.toDataURL("image/png");
      const a = document.createElement("a"); a.href = png; a.download = "user-growth.png"; a.click();
      URL.revokeObjectURL(url);
    };
    img.onerror = () => URL.revokeObjectURL(url);
    img.src = url;
  };

  const bgPage = dark ? "#0b1220" : BRAND.light;
  const overlay = `radial-gradient(1200px 600px at -10% -10%, rgba(212,175,55,.10), transparent 40%),
                   radial-gradient(900px 500px at 110% -20%, rgba(14,124,90,.12), transparent 35%)`;
  const cardBg = dark ? "rgba(17,24,39,.9)" : "rgba(255,255,255,.96)";
  const borderCol = dark ? "rgba(255,255,255,.08)" : "#e2e8f0";
  const textMain = dark ? "#f8fafc" : BRAND.ink;
  const textSub  = dark ? "#cbd5e1" : "#64748b";

  // table actions & modals
  const [viewUser, setViewUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [delUser, setDelUser] = useState(null);
  const handleSaveUser = (payload) => {
    setUsers(prev => prev.map(u => u.email === payload.email ? payload : (u === editUser ? payload : u)));
    setEditUser(null);
  };
  const handleDeleteUser = () => { if (!delUser) return; setUsers(prev => prev.filter(u => u !== delUser)); setDelUser(null); };

  // add tutor/course
  const [showAddTutor, setShowAddTutor] = useState(false);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const addTutor = (t) => {
    setUsers(prev => [{ ...t, role:"Tutor", status:"Active", joined:"Today", avatar:"https://i.pravatar.cc/40?img=22" }, ...prev]);
    setTotalUsers(n => n + 1);
    setShowAddTutor(false);
    alert("Tutor added!");
  };
  const addCourse = (c) => { setCoursesCount(n => n + 1); setShowAddCourse(false); alert(`Course "${c.title}" added!`); };

  /* KPI Card */
  const Card = ({ title, value, icon, tintFrom, tintTo, color, spark, delta, i }) => (
    <motion.div
      custom={i}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.45, delay: 0.06 * i, ease } }}
      className="group relative rounded-2xl min-w-0"
      style={{ background: cardBg, boxShadow: "0 10px 25px rgba(16,24,40,.06)", border:`1px solid ${borderCol}` }}
    >
      <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
           style={{ background: `linear-gradient(135deg, ${tintFrom}, ${tintTo})` }} />
      <div className="relative p-4 sm:p-5 flex items-center gap-4 backdrop-blur">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-white text-xl sm:text-2xl shadow-md" style={{ background: color }}>{icon}</div>
        <div className="min-w-0">
          <p className="text-sm" style={{ color: textSub }}>{title}</p>
          <div className="flex items-end gap-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold" style={{ color: textMain }}><CountUp value={value} /></h3>
            <div className="hidden sm:block opacity-90"><Spark data={spark} color={color} /></div>
          </div>
        </div>
        <span className={`ml-auto text-xs font-semibold px-2 py-1 rounded-full ${delta >= 0 ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>{delta >= 0 ? "▲" : "▼"} {Math.abs(delta)}%</span>
      </div>
    </motion.div>
  );

  return (
    <div className="flex-1 min-h-screen" style={{ background: bgPage, backgroundImage: overlay }}>
      <FX />

      {/* ---------- Header ---------- */}
      <div className="sticky top-0 z-10 backdrop-blur"
           style={{ background: dark ? "rgba(15,23,42,.7)" : "rgba(255,255,255,.8)", borderBottom:`1px solid ${borderCol}` }}>
        <div className="px-4 sm:px-6 md:px-8 py-3 flex items-center gap-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: textMain }}>
            Dashboard Overview
          </h1>

          <div className="ml-auto flex items-center gap-2">
            {/* mobile search */}
            <button className="sm:hidden inline-flex items-center justify-center w-10 h-10 rounded-full"
                    style={{ background: cardBg, border:`1px solid ${borderCol}` }}>
              <FaSearch style={{ color: textSub }} />
            </button>

            {/* desktop search */}
            <div className="hidden md:flex items-center gap-2 rounded-lg px-3 py-1.5 shadow-sm"
                 style={{ background: dark ? "rgba(255,255,255,.06)" : "#fff", border:`1px solid ${borderCol}` }}>
              <FaSearch style={{ color: textSub }} />
              <input placeholder="Search…" className="outline-none text-sm bg-transparent"
                     style={{ color: textMain, caretColor: BRAND.primary }} />
            </div>

            {/* time range */}
            <div className="flex items-center gap-1 rounded-lg p-1 overflow-x-auto no-scrollbar"
                 style={{ background: dark ? "rgba(255,255,255,.06)" : "#fff", border:`1px solid ${borderCol}` }}>
              {["Today", "7d", "30d", "90d"].map((r) => (
                <button key={r} onClick={() => setRange(r)}
                  className="px-2.5 sm:px-3 py-1.5 rounded-md text-sm font-medium transition"
                  style={{
                    color: range===r ? "#fff" : textSub,
                    background: range===r ? BRAND.primary : "transparent",
                    boxShadow: range===r ? "0 4px 12px rgba(14,124,90,.3)" : "none"
                  }}>
                  {r}
                </button>
              ))}
            </div>

            {/* refresh / theme / help / bell */}
            <button onClick={()=>{setRefreshSpin(true); setLoading(true); setTimeout(()=>{ setLoading(false); setRefreshSpin(false); }, 600);}}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full ripple"
              style={{ background: cardBg, border:`1px solid ${borderCol}` }}
              title="Refresh data"
            >
              <FaSync className={refreshSpin ? "animate-spin" : ""} style={{ color:textSub }} />
            </button>

            <button onClick={()=>setDark(d=>!d)}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full ripple"
              style={{ background: cardBg, border:`1px solid ${borderCol}` }}
              title="Toggle theme"
            >
              {dark ? <FaSun className="text-amber-400" /> : <FaMoon className="text-slate-600" />}
            </button>

            <button onClick={()=>setShowHelp(true)}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full ripple"
              style={{ background: cardBg, border:`1px solid ${borderCol}` }}
              title="Help"
            >
              ?
            </button>

            <button className="relative inline-flex items-center justify-center w-10 h-10 rounded-full"
                    style={{ background: cardBg, border:`1px solid ${borderCol}` }}>
              <FaBell className="text-slate-500" />
              <span className="absolute top-1.5 right-1.5 inline-block w-2.5 h-2.5 bg-rose-500 rounded-full" />
            </button>
          </div>
        </div>
      </div>

      {/* ---------- Content ---------- */}
      <div className="px-4 sm:px-6 md:px-8 py-6 grid gap-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          <Card i={0} title="Total Users"    value={totalUsers}     icon={<FaUsers />}             tintFrom="#0E7C5A33" tintTo="#0B5F4633" color={BRAND.primary} spark={baseData.sparkUsers}  delta={baseData.delta.users}  />
          <Card i={1} title="Active Tutors"  value={tutorsActive}   icon={<FaChalkboardTeacher />} tintFrom="#D4AF3733" tintTo="#B98F2133" color={BRAND.gold}    spark={[4,7,12,15,18,28,38,48]} delta={baseData.delta.tutors} />
          <Card i={2} title="Courses"        value={coursesCount}   icon={<FaBookOpen />}          tintFrom="#2C3E5033" tintTo="#1B2A3833" color={BRAND.dark}    spark={[3,4,6,8,9,10,11,12]}     delta={baseData.delta.courses}/>
          <Card i={3} title="Trial Requests" value={baseData.trials}icon={<FaChartLine />}         tintFrom="#967B5A33" tintTo="#7E624633" color={BRAND.brown}   spark={baseData.sparkTrials}     delta={baseData.delta.trials} />
        </div>

        {/* Chart + Activity (NO STRETCH) */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 sm:gap-6 items-start">
          {/* Chart card */}
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div key="skeleton" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.99 }}
                className="xl:col-span-3 rounded-2xl px-4 sm:px-5 pt-4 sm:pt-5 pb-3 min-w-0 self-start"
                style={{ background: cardBg, border:`1px solid ${borderCol}` }}>
                <div className="h-6 w-40 rounded mb-5 shimmer" />
                <div className="h-56 rounded shimmer" />
              </motion.div>
            ) : (
              <motion.div key="chart" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease } }} exit={{ opacity: 0, y: 4 }}
                className={`xl:col-span-3 rounded-2xl px-4 sm:px-5 pt-4 sm:pt-5 pb-3 min-w-0 self-start ${chartFull ? "fixed inset-4 z-50" : ""}`}
                style={{ background: cardBg, border:`1px solid ${borderCol}` }}>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold" style={{ color: textMain }}>User Growth ({range})</h2>
                    <p className="text-xs mb-2" style={{ color: textSub }}>Interactive — hover/touch to inspect values, click legend to toggle series.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="ripple px-2.5 py-1.5 rounded border text-sm"
                      style={{border:`1px solid ${borderCol}`, color:textMain}}
                      onClick={exportAreaPNG}
                      title="Export PNG">
                      <FaDownload className="inline -mt-0.5 mr-1" />PNG
                    </button>
                    <button className="ripple px-2.5 py-1.5 rounded border text-sm"
                      style={{border:`1px solid ${borderCol}`, color:textMain}}
                      onClick={resetLegend}
                      title="Reset legend">
                      <FaUndo className="inline -mt-0.5 mr-1" />Legend
                    </button>
                    <button className="ripple px-2.5 py-1.5 rounded border text-sm"
                      style={{border:`1px solid ${borderCol}`, color:textMain}}
                      onClick={()=>setChartFull(f=>!f)}
                      title={chartFull ? "Exit fullscreen (Esc)" : "Fullscreen"}>
                      {chartFull ? <FaCompress/> : <FaExpand/>}
                    </button>
                  </div>
                </div>

                <AreaChart
                  series={chart.series}
                  labels={chart.labels}
                  height={280}
                  legend={{ hidden: legendHidden }}
                  onToggle={toggleLegend}
                  svgRef={areaSvgRef}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Recent Activity + Donut */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease} }}
            className="xl:col-span-2 rounded-2xl px-4 sm:px-5 pt-4 sm:pt-5 pb-3 min-w-0 self-start"
            style={{ background: cardBg, border:`1px solid ${borderCol}` }}>
            <h2 className="text-lg font-semibold mb-4" style={{ color: textMain }}>Recent Activity</h2>
            <ul className="space-y-3 mb-4">
              {[
                { t: "New user registered", c: BRAND.primary },
                { t: "Course “Tajweed Basics” updated", c: "#0284C7" },
                { t: "New testimonial added", c: "#EAB308" },
                { t: "Trial request submitted", c: "#EC4899" },
              ].map((a, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 inline-block w-2.5 h-2.5 rounded-full" style={{ background: a.c }} />
                  <span style={{ color: textMain }}>{a.t}</span>
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium" style={{ color: textMain }}>User Status</h3>
                  <div className="flex items-center gap-2">
                    <button className="px-2.5 py-1.5 rounded border text-sm"
                      style={{border:`1px solid ${borderCol}`, color:textMain}}
                      onClick={()=>{
                        const rows = [["Label","Value"]]; pieSegments.forEach(s=> rows.push([s.label, s.value]));
                        const csv = rows.map(r=>r.join(",")).join("\n");
                        const blob = new Blob([csv], {type:"text/csv"});
                        const url = URL.createObjectURL(blob);
                        const a=document.createElement("a"); a.href=url; a.download="status-pie.csv"; a.click();
                        URL.revokeObjectURL(url);
                      }}>
                      CSV
                    </button>
                    <button className="px-2.5 py-1.5 rounded text-white text-sm"
                      style={{background:BRAND.primary}}
                      onClick={()=>{
                        const svg = pieSvgRef.current; if (!svg) return;
                        const xml = new XMLSerializer().serializeToString(svg);
                        const svgBlob = new Blob([xml], { type: "image/svg+xml;charset=utf-8" });
                        const url = URL.createObjectURL(svgBlob);
                        const img = new Image();
                        img.onload = () => {
                          const canvas = document.createElement("canvas");
                          canvas.width = svg.width.baseVal.value || 200;
                          canvas.height = svg.height.baseVal.value || 200;
                          const ctx = canvas.getContext("2d");
                          ctx.fillStyle = "#ffffff"; ctx.fillRect(0,0,canvas.width,canvas.height);
                          ctx.drawImage(img, 0, 0);
                          const png = canvas.toDataURL("image/png");
                          const a = document.createElement("a"); a.href = png; a.download = "status-pie.png"; a.click();
                          URL.revokeObjectURL(url);
                        };
                        img.onerror = () => URL.revokeObjectURL(url);
                        img.src = url;
                      }}>
                      PNG
                    </button>
                    <button className="px-2.5 py-1.5 rounded border text-sm"
                      style={{border:`1px solid ${borderCol}`, color:textMain}}
                      onClick={()=>{ setPieHidden(new Set()); setPieSelected(null); }}
                      title="Reset pie">
                      <FaUndo className="inline -mt-0.5 mr-1" />Reset
                    </button>
                  </div>
                </div>

                <DonutChart
                  segments={pieSegments}
                  size={isSmall ? 160 : 200}
                  thickness={isSmall ? 22 : 26}
                  hidden={pieHidden}
                  selected={pieSelected}
                  onToggleHidden={togglePieHidden}
                  onSelect={setPieSelected}
                  svgRef={pieSvgRef}
                />
              </div>

              <div className="grid gap-2">
                {pieSegments.map(s=>(
                  <div key={s.label} className="flex items-center gap-2">
                    <span className="inline-block w-3 h-3 rounded" style={{ background:s.color }} />
                    <span className="text-sm" style={{ color:textMain }}>{s.label}</span>
                    <span className="ml-auto font-semibold" style={{ color:textMain }}>{s.value}</span>
                  </div>
                ))}
                <p className="text-xs mt-1" style={{ color:textSub }}>
                  Tap a slice to filter the list. Use the checkboxes to hide slices.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom row: Latest Users + Quick Actions */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 items-start">
          {/* Latest Users */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease } }}
            className="xl:col-span-2 rounded-2xl px-4 sm:px-5 pt-4 sm:pt-5 pb-3 min-w-0 self-start"
            style={{ background: cardBg, border:`1px solid ${borderCol}` }}>
            <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
              <div>
                <h2 className="text-lg font-semibold" style={{ color: textMain }}>Latest Users</h2>
                <p className="text-sm" style={{ color: textSub }}>New sign-ups and recent activity</p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="flex-1 sm:flex-none inline-flex items-center gap-2 rounded-lg px-3 py-1.5 w-full sm:w-auto"
                     style={{ background: dark ? "rgba(255,255,255,.06)" : "#fff", border:`1px solid ${borderCol}` }}>
                  <FaSearch style={{ color: textSub }} />
                  <input value={userQ} onChange={e=>setUserQ(e.target.value)} placeholder="Filter users…"
                         className="outline-none text-sm bg-transparent w-full" style={{ color: textMain }} />
                </div>
                <button className="ripple inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg"
                        style={{ border:`1px solid ${borderCol}`, color:textMain }}
                        onClick={exportUsersCSV}>
                  <FaDownload className="opacity-80" />
                  Export
                </button>
                <button className="ripple inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg"
                        style={{ border:`1px solid ${borderCol}`, color:textMain }}
                        onClick={copyEmails}
                        title="Copy visible emails">
                  <FaCopy className="opacity-80" />
                  Copy
                </button>
              </div>
            </div>

            {/* MOBILE: card list */}
            <div className="md:hidden">
              <ul className="grid gap-3">
                {filteredUsers.slice((page-1)*perPage, page*perPage).map((u,i)=>(
                  <li key={i} className="rounded-xl p-3" style={{ border:`1px solid ${borderCol}`, background: dark ? "rgba(255,255,255,.03)":"#fff" }}>
                    <div className="flex items-center gap-3">
                      <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"/>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium truncate" style={{ color:textMain }}>{u.name}</div>
                        <div className="text-xs truncate" style={{ color:textSub }}>{u.email}</div>
                      </div>
                      <StatusBadge s={u.status}/>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs" style={{ color:textSub }}>
                      <span>{u.role}</span>
                      <span>{u.joined}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-end gap-2">
                      <button className="ripple inline-flex items-center justify-center w-9 h-9 rounded-md border" title="View"
                        style={{ border:`1px solid ${borderCol}`, background: dark ? "transparent" : "#fff", color:textSub }}
                        onClick={()=>setViewUser(u)}><FaEye/></button>
                      <button className="ripple inline-flex items-center justify-center w-9 h-9 rounded-md border" title="Edit"
                        style={{ border:`1px solid ${borderCol}`, background: dark ? "transparent" : "#fff", color:"#b45309" }}
                        onClick={()=>setEditUser(u)}><FaPen/></button>
                      <button className="ripple inline-flex items-center justify-center w-9 h-9 rounded-md border" title="Delete"
                        style={{ border:`1px solid ${borderCol}`, background: dark ? "transparent" : "#fff", color:"#dc2626" }}
                        onClick={()=>setDelUser(u)}><FaTrash/></button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-2 flex items-center justify-between px-1 py-2 text-sm" style={{ color:textSub }}>
                <span>Page {page}/{pages}</span>
                <div className="flex items-center gap-1">
                  <button className="ripple px-2 py-1 rounded" style={{ border:`1px solid ${borderCol}`, color:textMain }} onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}>Prev</button>
                  <button className="ripple px-2 py-1 rounded" style={{ border:`1px solid ${borderCol}`, color:textMain }} onClick={()=>setPage(p=>Math.min(pages,p+1))} disabled={page===pages}>Next</button>
                </div>
              </div>
            </div>

            {/* DESKTOP: table */}
            <div className="hidden md:block overflow-x-auto rounded-xl min-w-0" style={{ border:`1px solid ${borderCol}` }}>
              <table className="w-full text-left min-w-[640px]">
                <thead style={{ background: dark ? "rgba(255,255,255,.04)" : "rgba(241,245,249,.6)" }}>
                  <tr className="text-xs uppercase tracking-wide">
                    <th className="py-3 pl-4 pr-2" style={{ color:textSub }}>Name</th>
                    <th className="py-3 px-2" style={{ color:textSub }}>Email</th>
                    <th className="py-3 px-2" style={{ color:textSub }}>Status</th>
                    <th className="py-3 px-2" style={{ color:textSub }}>Joined</th>
                    <th className="py-3 pr-4 text-right" style={{ color:textSub }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.slice((page-1)*perPage, page*perPage).map((u, i) => (
                    <tr key={i} className="transition-colors"
                        style={{ borderTop:`1px solid ${borderCol}` }}
                        onMouseEnter={e=> e.currentTarget.style.background = dark ? "rgba(14,124,90,.07)" : "#0E7C5A08"}
                        onMouseLeave={e=> e.currentTarget.style.background = "transparent"}>
                      <td className="py-3 pl-4 pr-2">
                        <div className="flex items-center gap-3">
                          <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-sm" loading="lazy" decoding="async" />
                          <div className="min-w-0">
                            <div className="font-medium truncate" style={{ color:textMain }}>{u.name}</div>
                            <div className="text-xs" style={{ color:textSub }}>{u.role}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2" style={{ color:textMain }}>{u.email}</td>
                      <td className="py-3 px-2"><StatusBadge s={u.status} /></td>
                      <td className="py-3 px-2" style={{ color:textMain }}>{u.joined}</td>
                      <td className="py-3 pr-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="ripple inline-flex items-center justify-center w-9 h-9 rounded-md border" title="View"
                                  style={{ border:`1px solid ${borderCol}`, background: dark ? "transparent" : "#fff", color:textSub }}
                                  onClick={()=>setViewUser(u)}><FaEye/></button>
                          <button className="ripple inline-flex items-center justify-center w-9 h-9 rounded-md border" title="Edit"
                                  style={{ border:`1px solid ${borderCol}`, background: dark ? "transparent" : "#fff", color:"#b45309" }}
                                  onClick={()=>setEditUser(u)}><FaPen/></button>
                          <button className="ripple inline-flex items-center justify-center w-9 h-9 rounded-md border" title="Delete"
                                  style={{ border:`1px solid ${borderCol}`, background: dark ? "transparent" : "#fff", color:"#dc2626" }}
                                  onClick={()=>setDelUser(u)}><FaTrash/></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex items-center justify-between px-4 py-3 text-sm" style={{ color:textSub, borderTop:`1px solid ${borderCol}` }}>
                <span>Showing {Math.min(perPage, filteredUsers.length - (page-1)*perPage)} of {filteredUsers.length}</span>
                <div className="flex items-center gap-1">
                  <button className="ripple px-2 py-1 rounded" style={{ border:`1px solid ${borderCol}`, color:textMain }} onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}>Prev</button>
                  <button className="ripple px-2 py-1 rounded text-white" style={{ background: BRAND.primary }}>{page}</button>
                  <button className="ripple px-2 py-1 rounded" style={{ border:`1px solid ${borderCol}`, color:textMain }} onClick={()=>setPage(p=>Math.min(pages,p+1))} disabled={page===pages}>Next</button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions — responsive grid on mobile */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease } }}
            className="rounded-2xl px-4 sm:px-5 pt-4 sm:pt-5 pb-3 min-w-0 self-start"
            style={{ background: cardBg, border:`1px solid ${borderCol}` }}>
            <h2 className="text-lg font-semibold mb-4" style={{ color: textMain }}>Quick Actions</h2>

            <div className="grid grid-cols-2 md:grid-cols-1 gap-2 md:gap-3">
              <button className="ripple w-full inline-flex items-center justify-between gap-3 px-3 sm:px-4 py-3 rounded-xl text-white shadow hover:shadow-lg transition-transform hover:-translate-y-0.5"
                style={{ background: BRAND.primary }} onClick={()=>setShowAddCourse(true)}>
                <span className="inline-flex items-center gap-3"><FaPlus className="text-white/90" />Add Course</span>
                <span className="hidden sm:block text-white/80 text-xs">Ctrl + N</span>
              </button>

              <button className="ripple w-full inline-flex items-center justify-between gap-3 px-3 sm:px-4 py-3 rounded-xl text-white shadow hover:shadow-lg transition-transform hover:-translate-y-0.5"
                style={{ background: BRAND.dark }} onClick={()=>setShowAddTutor(true)}>
                <span className="inline-flex items-center gap-3"><FaUserPlus className="text-white/90" />Add Tutor</span>
                <span className="hidden sm:block text-white/80 text-xs">Ctrl + T</span>
              </button>

              <button className="ripple w-full inline-flex items-center justify-between gap-3 px-3 sm:px-4 py-3 rounded-xl text-white shadow hover:shadow-lg transition-transform hover:-translate-y-0.5 md:col-span-1 col-span-2"
                style={{ background: BRAND.brown }} onClick={()=>alert("Trial requests approved!")}>
                <span className="inline-flex items-center gap-3"><FaCheckCircle className="text-white/90" />Approve Trials</span>
                <span className="hidden sm:block text-white/80 text-xs">Ctrl + R</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* -------- Modals -------- */}
      {viewUser && (
        <Modal title="User Details" onClose={()=>setViewUser(null)}>
          <div className="flex items-center gap-4 mb-3">
            <img src={viewUser.avatar} alt={viewUser.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-white shadow" />
            <div>
              <div className="text-lg font-semibold">{viewUser.name}</div>
              <div className="text-slate-600">{viewUser.email}</div>
              <div className="mt-2"><StatusBadge s={viewUser.status}/></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><span className="text-slate-500">Role:</span> {viewUser.role}</div>
            <div><span className="text-slate-500">Joined:</span> {viewUser.joined}</div>
          </div>
          <div className="mt-4 text-right">
            <button className="ripple px-3 py-2 rounded border" onClick={()=>setViewUser(null)}>Close</button>
          </div>
        </Modal>
      )}

      {editUser && (
        <Modal title="Edit User" onClose={()=>setEditUser(null)}>
          <UserForm
            initial={editUser}
            onCancel={()=>setEditUser(null)}
            onSave={(data)=>handleSaveUser(data)}
          />
        </Modal>
      )}

      {delUser && (
        <Modal title="Confirm Delete" onClose={()=>setDelUser(null)}>
          <p className="text-slate-700">Delete <b>{delUser.name}</b>? This cannot be undone.</p>
          <div className="mt-4 flex items-center justify-end gap-2">
            <button className="ripple px-3 py-2 rounded border" onClick={()=>setDelUser(null)}>Cancel</button>
            <button className="ripple px-3 py-2 rounded text-white bg-rose-600 hover:opacity-95" onClick={handleDeleteUser}>Delete</button>
          </div>
        </Modal>
      )}

      {showAddTutor && (
        <Modal title="Add Tutor" onClose={()=>setShowAddTutor(false)}>
          <TutorForm
            onCancel={()=>setShowAddTutor(false)}
            onSave={(t)=>addTutor(t)}
          />
        </Modal>
      )}

      {showAddCourse && (
        <Modal title="Add Course" onClose={()=>setShowAddCourse(false)} wide>
          <CourseForm
            onCancel={()=>setShowAddCourse(false)}
            onSave={(c)=>addCourse(c)}
          />
        </Modal>
      )}

      {/* Help */}
      {showHelp && (
        <Modal title="Keyboard Shortcuts" onClose={()=>setShowHelp(false)}>
          <ul className="space-y-2 text-sm">
            <li><b>Ctrl + N</b> — Add New Course</li>
            <li><b>Ctrl + T</b> — Add Tutor</li>
            <li><b>Ctrl + R</b> — Approve Trial Requests</li>
            <li><b>Esc</b> — Close dialogs / fullscreen</li>
          </ul>
          <div className="mt-4 text-right">
            <button className="ripple px-3 py-2 rounded border" onClick={()=>setShowHelp(false)}>Close</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

/* -------------- Small Forms -------------- */
const UserForm = ({ initial, onSave, onCancel }) => {
  const [f, setF] = useState({ ...initial });
  return (
    <form onSubmit={(e)=>{e.preventDefault(); onSave(f);}} className="grid gap-3">
      <label className="grid gap-1 text-sm">
        <span className="text-slate-600">Name</span>
        <input className="w-full px-3 py-2 rounded-md border border-slate-200" value={f.name} onChange={e=>setF({...f, name:e.target.value})}/>
      </label>
      <label className="grid gap-1 text-sm">
        <span className="text-slate-600">Email</span>
        <input className="w-full px-3 py-2 rounded-md border border-slate-200" value={f.email} onChange={e=>setF({...f, email:e.target.value})}/>
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="grid gap-1 text-sm">
          <span className="text-slate-600">Status</span>
          <select className="w-full px-3 py-2 rounded-md border border-slate-200" value={f.status} onChange={e=>setF({...f, status:e.target.value})}>
            <option>Active</option><option>Trial</option><option>Inactive</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          <span className="text-slate-600">Role</span>
          <select className="w-full px-3 py-2 rounded-md border border-slate-200" value={f.role} onChange={e=>setF({...f, role:e.target.value})}>
            <option>Student</option><option>Tutor</option><option>Admin</option>
          </select>
        </label>
      </div>
      <div className="mt-2 flex items-center justify-end gap-2">
        <button type="button" className="ripple px-3 py-2 rounded border" onClick={onCancel}>Cancel</button>
        <button type="submit" className="ripple px-3 py-2 rounded text-white" style={{background:BRAND.primary}}>Save</button>
      </div>
    </form>
  );
};

const TutorForm = ({ onSave, onCancel }) => {
  const [f, setF] = useState({ name:"", email:"" });
  return (
    <form onSubmit={(e)=>{e.preventDefault(); onSave(f);}} className="grid gap-3">
      <label className="grid gap-1 text-sm">
        <span className="text-slate-600">Tutor Name</span>
        <input className="w-full px-3 py-2 rounded-md border border-slate-200" value={f.name} onChange={e=>setF({...f, name:e.target.value})} required/>
      </label>
      <label className="grid gap-1 text-sm">
        <span className="text-slate-600">Email</span>
        <input type="email" className="w-full px-3 py-2 rounded-md border border-slate-200" value={f.email} onChange={e=>setF({...f, email:e.target.value})} required/>
      </label>
      <div className="mt-2 flex items-center justify-end gap-2">
        <button type="button" className="ripple px-3 py-2 rounded border" onClick={onCancel}>Cancel</button>
        <button type="submit" className="ripple px-3 py-2 rounded text-white" style={{background:BRAND.primary}}>Add Tutor</button>
      </div>
    </form>
  );
};

const CourseForm = ({ onSave, onCancel }) => {
  const [f, setF] = useState({ title:"", level:"Beginner", status:"Live", tutor:"" });
  return (
    <form onSubmit={(e)=>{e.preventDefault(); onSave(f);}} className="grid gap-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="grid gap-1 text-sm">
          <span className="text-slate-600">Course Title</span>
          <input className="w-full px-3 py-2 rounded-md border border-slate-200" value={f.title} onChange={e=>setF({...f, title:e.target.value})} required/>
        </label>
        <label className="grid gap-1 text-sm">
          <span className="text-slate-600">Tutor</span>
          <input className="w-full px-3 py-2 rounded-md border border-slate-200" value={f.tutor} onChange={e=>setF({...f, tutor:e.target.value})} required/>
        </label>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="grid gap-1 text-sm">
          <span className="text-slate-600">Level</span>
          <select className="w-full px-3 py-2 rounded-md border border-slate-200" value={f.level} onChange={e=>setF({...f, level:e.target.value})}>
            <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          <span className="text-slate-600">Status</span>
          <select className="w-full px-3 py-2 rounded-md border border-slate-200" value={f.status} onChange={e=>setF({...f, status:e.target.value})}>
            <option>Live</option><option>Draft</option><option>Archived</option>
          </select>
        </label>
      </div>
      <div className="mt-2 flex items-center justify-end gap-2">
        <button type="button" className="ripple px-3 py-2 rounded border" onClick={onCancel}>Cancel</button>
        <button type="submit" className="ripple px-3 py-2 rounded text-white" style={{background:BRAND.primary}}>Add Course</button>
      </div>
    </form>
  );
};
