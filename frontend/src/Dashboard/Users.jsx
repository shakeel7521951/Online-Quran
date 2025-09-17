// /src/Dashboard/common pages/Users.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  FaSearch,
  FaFilter,
  FaDownload,
  FaTimes,
  FaUsers,
  FaChalkboardTeacher,
  FaStar,
  FaPen,
  FaTrashAlt,
  FaEye,
  FaChevronDown,
} from "react-icons/fa";

/* ───────────────── Brand / easing ───────────────── */
const BRAND = {
  primary: "#0E7C5A",
  gold: "#D4AF37",
  dark: "#2C3E50",
  light: "#F5F7FA",
};
const ease = [0.16, 1, 0.3, 1];

/* ───────────────── Global FX ───────────────── */
const GlobalFX = () => (
  <style>{`
    .ripple { position: relative; overflow: hidden; }
    .ripple:after { content:""; position:absolute; inset:auto auto 50% 50%; width:0;height:0;border-radius:9999px;background:rgba(255,255,255,.35); transform:translate(-50%,50%); opacity:0; }
    .ripple:active:after { width:220%; height:220%; opacity:1; transition: width .35s ease, height .35s ease, opacity .6s ease; }

    .hover-lift { transition: transform .25s cubic-bezier(0.16,1,0.3,1), box-shadow .25s; }
    .hover-lift:hover { transform: translateY(-4px); box-shadow: 0 14px 34px rgba(2,8,20,.08); }

    .aurora {
      background:
        radial-gradient(40% 60% at 12% 8%, rgba(13,148,136,.25), transparent 60%),
        radial-gradient(36% 60% at 88% 12%, rgba(212,175,55,.18), transparent 60%),
        radial-gradient(60% 70% at 50% 100%, rgba(14,124,90,.18), transparent 60%);
      filter: blur(36px) saturate(115%); animation: auroraMove 26s ease-in-out infinite alternate; pointer-events:none;
    }
    @keyframes auroraMove { 0% { transform: translate3d(-2%, -2%, 0) } 100% { transform: translate3d(2%, 2%, 0) } }

    .shimmer { position: relative; overflow: hidden; background: #eef2f6; }
    .shimmer:before { content:""; position:absolute; inset:0; background: linear-gradient(90deg, transparent, rgba(255,255,255,.5), transparent); transform: translateX(-100%); animation: sh 1.2s ease-in-out infinite; }
    @keyframes sh { to { transform: translateX(100%); } }
  `}</style>
);

/* ───────────────── helpers ───────────────── */
const cls = (...s) => s.filter(Boolean).join(" ");
const useMedia = (query) => {
  const get = () =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false;
  const [match, setMatch] = useState(get);
  useEffect(() => {
    const m = window.matchMedia(query);
    const fn = () => setMatch(m.matches);
    m.addEventListener ? m.addEventListener("change", fn) : m.addListener(fn);
    return () =>
      m.removeEventListener
        ? m.removeEventListener("change", fn)
        : m.removeListener(fn);
  }, [query]);
  return match;
};
const useOutside = (refs, onClose) => {
  const list = Array.isArray(refs) ? refs : [refs];
  useEffect(() => {
    const onDown = (e) => {
      if (list.some((r) => r?.current && r.current.contains(e.target))) return;
      onClose?.();
    };
    const onEsc = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, [onClose]);
};

/* ───────────────── UI atoms ───────────────── */
const StatusBadge = ({ s }) => {
  const map = {
    Active: { fg: BRAND.primary, bg: "#0E7C5A1A" },
    Trial: { fg: "#B45309", bg: "#B453091A" },
    Inactive: { fg: "#64748B", bg: "#64748B1A" },
  };
  const { fg, bg } = map[s] || map.Inactive;
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ color: fg, background: bg }}
    >
      {s}
    </span>
  );
};
const RoleBadge = ({ r }) => {
  const map = { Student: "#CBD5E1", Tutor: "#FACC15", Admin: "#A78BFA" };
  const bg = map[r] || map.Student;
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold"
      style={{ color: "#1E293B", background: `${bg}33` }}
    >
      {r}
    </span>
  );
};
const IconBtn = ({ children, label, onClick, variant = "neutral" }) => {
  const styles = {
    neutral:
      "border-slate-200 text-slate-600 hover:bg-slate-50 focus-visible:ring-slate-300",
    view: "border-emerald-200 text-emerald-600 hover:bg-emerald-50 focus-visible:ring-emerald-300",
    edit: "border-amber-200 text-amber-600 hover:bg-amber-50 focus-visible:ring-amber-300",
    delete:
      "border-rose-200 text-rose-600 hover:bg-rose-50 focus-visible:ring-rose-300",
  }[variant];
  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      whileHover={{ y: -1 }}
      whileTap={{ y: 0 }}
      className={cls(
        "ripple inline-flex items-center justify-center w-9 h-9 rounded-lg border transition outline-none focus-visible:ring-2",
        styles
      )}
      title={label}
      style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
    >
      <span className="text-[15px]">{children}</span>
    </motion.button>
  );
};
const Head = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="text-left text-xs uppercase tracking-wide text-slate-500 hover:text-slate-700 transition"
  >
    {label}
  </button>
);
const Field = ({ label, children }) => (
  <label className="grid gap-1 text-sm">
    <span className="text-slate-600">{label}</span>
    {children}
  </label>
);

/* ───────────────── SoftSelect (animated dropdown for filters) ───────────────── */
const SoftSelect = ({ label, value, options, onChange, className }) => {
  const wrap = useRef(null);
  const pop = useRef(null);
  const [open, setOpen] = useState(false);
  useOutside([wrap, pop], () => setOpen(false));

  const opts = (Array.isArray(options) ? options : []).map((o) =>
    typeof o === "string" ? { label: o, value: o } : o
  );
  const current = opts.find((o) => o.value === value) ||
    opts[0] || { label: "All", value: "All" };

  return (
    <div ref={wrap} className={cls("relative grid gap-1 text-sm", className)}>
      <span className="text-slate-600">{label}</span>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-3 py-2 rounded-lg border border-slate-200 bg-white pr-9 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 relative"
      >
        {current.label}
        <motion.span
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.18 }}
        >
          ▾
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={pop}
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.18, ease }}
            className="absolute z-30 mt-1 w-full rounded-lg border border-slate-200 bg-white shadow-2xl overflow-hidden"
          >
            <ul className="max-h-64 overflow-auto">
              {opts.map((opt) => {
                const active = opt.value === value;
                return (
                  <li key={opt.value}>
                    <button
                      onClick={() => {
                        onChange?.(opt.value);
                        setOpen(false);
                      }}
                      className={cls(
                        "w-full text-left px-3 py-2 hover:bg-emerald-50",
                        active
                          ? "bg-emerald-50 text-emerald-700"
                          : "text-slate-700"
                      )}
                    >
                      {opt.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ───────────────── Actions dropdown (replaces 3-dots) ───────────────── */
const ActionsMenu = ({ onView, onEdit, onDelete }) => {
  const btnRef = useRef(null);
  const popRef = useRef(null);
  const [open, setOpen] = useState(false);
  useOutside([btnRef, popRef], () => setOpen(false));

  return (
    <div className="relative inline-block text-left">
      <motion.button
        ref={btnRef}
        whileTap={{ scale: 0.98 }}
        whileHover={{ y: -1 }}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-full border border-slate-200 bg-white hover:bg-slate-50"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        Actions <FaChevronDown className="opacity-70" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={popRef}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease }}
            className="absolute right-0 mt-1 w-36 rounded-xl border border-slate-200 bg-white shadow-2xl overflow-hidden z-20"
          >
            <ul className="py-1 text-sm">
              <li>
                <button
                  onClick={() => {
                    setOpen(false);
                    onView?.();
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-emerald-50 text-slate-700 flex items-center gap-2"
                >
                  <FaEye className="text-emerald-600" /> View
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setOpen(false);
                    onEdit?.();
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-amber-50 text-slate-700 flex items-center gap-2"
                >
                  <FaPen className="text-amber-600" /> Edit
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setOpen(false);
                    onDelete?.();
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-rose-50 text-rose-700 flex items-center gap-2"
                >
                  <FaTrashAlt /> Delete
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ───────────────── Demo data ───────────────── */
const seed = [
  {
    id: 10,
    name: "Ali Raza",
    email: "ali@example.com",
    role: "Student",
    status: "Active",
    joined: "2025-09-09",
    avatar: "https://i.pravatar.cc/64?img=39",
  },
  {
    id: 8,
    name: "Bilal Qureshi",
    email: "bilal@example.com",
    role: "Student",
    status: "Active",
    joined: "2025-09-08",
    avatar: "https://i.pravatar.cc/64?img=28",
  },
  {
    id: 1,
    name: "Ahmed Ali",
    email: "ahmed@example.com",
    role: "Student",
    status: "Active",
    joined: "2025-09-07",
    avatar: "https://i.pravatar.cc/64?img=11",
  },
  {
    id: 7,
    name: "Maryam Saeed",
    email: "maryam@example.com",
    role: "Student",
    status: "Trial",
    joined: "2025-09-06",
    avatar: "https://i.pravatar.cc/64?img=31",
  },
  {
    id: 2,
    name: "Fatima Noor",
    email: "fatima@example.com",
    role: "Student",
    status: "Trial",
    joined: "2025-09-05",
    avatar: "https://i.pravatar.cc/64?img=15",
  },
  {
    id: 3,
    name: "Yusuf Khan",
    email: "yusuf@example.com",
    role: "Student",
    status: "Active",
    joined: "2025-09-04",
    avatar: "https://i.pravatar.cc/64?img=13",
  },
  {
    id: 4,
    name: "Aisha Rahman",
    email: "aisha@example.com",
    role: "Student",
    status: "Inactive",
    joined: "2025-09-02",
    avatar: "https://i.pravatar.cc/64?img=17",
  },
  {
    id: 5,
    name: "Imran Hashmi",
    email: "imran@example.com",
    role: "Tutor",
    status: "Active",
    joined: "2025-09-03",
    avatar: "https://i.pravatar.cc/64?img=22",
  },
  {
    id: 6,
    name: "Zainab Karim",
    email: "zainab@example.com",
    role: "Tutor",
    status: "Active",
    joined: "2025-09-01",
    avatar: "https://i.pravatar.cc/64?img=24",
  },
  {
    id: 9,
    name: "Huda Khan",
    email: "huda@example.com",
    role: "Admin",
    status: "Active",
    joined: "2025-09-01",
    avatar: "https://i.pravatar.cc/64?img=35",
  },
];

/* ───────────────── Edit Form ───────────────── */
const EditForm = ({ user, onCancel, onSubmit }) => {
  const [form, setForm] = useState({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
  });
  return (
    <form
      className="grid gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
    >
      <Field label="Name">
        <input
          className="w-full px-3 py-2 rounded-md border border-slate-200"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </Field>
      <Field label="Email">
        <input
          className="w-full px-3 py-2 rounded-md border border-slate-200"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Role">
          <select
            className="w-full px-3 py-2 rounded-md border border-slate-200"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option>Student</option>
            <option>Tutor</option>
            <option>Admin</option>
          </select>
        </Field>
        <Field label="Status">
          <select
            className="w-full px-3 py-2 rounded-md border border-slate-200"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option>Active</option>
            <option>Trial</option>
            <option>Inactive</option>
          </select>
        </Field>
      </div>
      <div className="mt-2 flex items-center justify-end gap-2">
        <button
          type="button"
          className="ripple px-3 py-2 rounded-md border border-slate-200 hover:bg-slate-50"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="ripple px-3 py-2 rounded-md text-white"
          style={{ background: BRAND.primary }}
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

/* ───────────────── Page ───────────────── */
export const Users = () => {
  const reduce = useReducedMotion();
  const isMobile = useMedia("(max-width: 767px)");
  const commandRef = useRef(null);
  const listTopRef = useRef(null);

  const [q, setQ] = useState("");
  const [role, setRole] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState({ key: "joined", dir: "desc" });
  const [minDate, setMinDate] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [mode, setMode] = useState("cards");
  useEffect(() => {
    setMode(isMobile ? "cards" : "table");
  }, [isMobile]);

  const [drawer, setDrawer] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const perPage = 6;

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      setData(seed);
      setLoading(false);
    }, 450);
    return () => clearTimeout(t);
  }, []);

  /* filter/sort */
  const filtered = useMemo(() => {
    let out = [...data];
    if (q.trim()) {
      const t = q.toLowerCase();
      out = out.filter(
        (u) =>
          u.name.toLowerCase().includes(t) || u.email.toLowerCase().includes(t)
      );
    }
    if (role !== "All") out = out.filter((u) => u.role === role);
    if (status !== "All") out = out.filter((u) => u.status === status);
    if (minDate)
      out = out.filter((u) => +new Date(u.joined) >= +new Date(minDate));

    out.sort((a, b) => {
      const k = sort.key;
      let av = a[k],
        bv = b[k];
      if (k === "joined") {
        av = +new Date(a.joined);
        bv = +new Date(b.joined);
      }
      if (typeof av === "string") {
        av = av.toLowerCase();
        bv = bv.toLowerCase();
      }
      if (av < bv) return sort.dir === "asc" ? -1 : 1;
      if (av > bv) return sort.dir === "asc" ? 1 : -1;
      return 0;
    });
    return out;
  }, [data, q, role, status, minDate, sort]);

  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const pageData = filtered.slice((page - 1) * perPage, page * perPage);
  useEffect(() => {
    if (page > pages) setPage(pages);
  }, [pages, page]);

  const gotoPage = (i) => {
    setPage(i);
    listTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const allChecked =
    pageData.length > 0 && pageData.every((u) => selected.includes(u.id));
  const toggleAll = () => {
    if (allChecked)
      setSelected((prev) =>
        prev.filter((id) => !pageData.find((u) => u.id === id))
      );
    else
      setSelected((prev) => [
        ...new Set([...prev, ...pageData.map((u) => u.id)]),
      ]);
  };
  const toggleOne = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  /* actions (mock) */
  const exportCSV = () => alert("Export current view to CSV");
  const applyUpdate = (payload) => {
    setData((prev) =>
      prev.map((u) => (u.id === payload.id ? { ...u, ...payload } : u))
    );
    setEditUser(null);
    alert("User updated");
  };
  const applyDelete = (id) => {
    setData((prev) => prev.filter((u) => u.id !== id));
    setDeleteUser(null);
    setSelected((prev) => prev.filter((x) => x !== id));
    alert("User deleted");
  };

  /* quick counts */
  const counts = useMemo(
    () => ({
      all: data.length,
      tutors: data.filter((d) => d.role === "Tutor").length,
      trials: data.filter((d) => d.status === "Trial").length,
    }),
    [data]
  );

  /* motion helpers */
  const tileHover = reduce
    ? {}
    : { whileHover: { y: -4, scale: 1.01 }, whileTap: { scale: 0.99 } };

  return (
    <div
      className="relative flex-1 p-4 sm:p-6 md:p-8 overflow-hidden"
      style={{ background: BRAND.light }}
    >
      <GlobalFX />

      {/* Hero / heading */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease }}
        className="relative overflow-hidden rounded-2xl mb-6 p-6 sm:p-8 text-white shadow"
        style={{
          background: `linear-gradient(135deg, ${BRAND.primary}, #0B5F46)`,
        }}
      >
        <div className="absolute inset-0 aurora opacity-35" />
        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="grid place-items-center w-11 h-11 rounded-full bg-white/15 ring-1 ring-white/20">
              <FaUsers />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Users
            </h1>
          </div>
          <p className="mt-1 opacity-90 text-sm">
            Manage members, roles, status, and onboarding.
          </p>
        </div>
      </motion.div>

      {/* Stat tiles */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            t: "Total Users",
            v: counts.all,
            from: "#0E7C5A",
            to: "#0B5F46",
            icon: <FaUsers />,
          },
          {
            t: "Active Tutors",
            v: counts.tutors,
            from: "#D4AF37",
            to: "#B98F21",
            icon: <FaChalkboardTeacher />,
          },
          {
            t: "Trial Signups",
            v: counts.trials,
            from: "#2C3E50",
            to: "#1B2A38",
            icon: <FaStar />,
          },
        ].map((k, i) => (
          <motion.div
            key={k.t}
            initial={{ opacity: 0, y: 12 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.45, delay: 0.06 * i, ease },
            }}
            {...tileHover}
            className="relative overflow-hidden rounded-2xl p-5 text-white shadow-lg transition-shadow"
            style={{
              background: `linear-gradient(135deg, ${k.from}, ${k.to})`,
            }}
          >
            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                background:
                  "radial-gradient(600px 200px at -10% -40%, rgba(255,255,255,.35), transparent 60%)",
              }}
            />
            <div className="relative flex items-center gap-3">
              <div className="shrink-0 grid place-items-center w-11 h-11 rounded-full bg-white/10 ring-1 ring-white/15">
                <motion.span
                  className="text-[18px]"
                  whileHover={reduce ? undefined : { rotate: 2, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                >
                  {k.icon}
                </motion.span>
              </div>
              <div>
                <div className="text-sm/4 opacity-90">{k.t}</div>
                <div className="mt-1 text-3xl font-extrabold tracking-tight">
                  {k.v}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Command bar */}
      <div ref={commandRef} className="bg-white rounded-2xl shadow p-4 mb-4">
        <div className="grid gap-3">
          {/* search + view toggle + advanced */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <div className="flex-1 min-w-[220px] w-full flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#0E7C5A33]">
              <FaSearch className="text-slate-400" />
              <input
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setPage(1);
                }}
                placeholder="Search name or email…"
                className="w-full outline-none bg-transparent"
              />
            </div>

            <div className="ml-auto flex items-center gap-2 shrink-0">
              <div className="inline-flex rounded-lg border border-slate-200 overflow-hidden">
                <button
                  className={cls(
                    "px-3 py-2 text-sm",
                    mode === "cards"
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-slate-600 hover:bg-slate-50"
                  )}
                  onClick={() => setMode("cards")}
                  title="Cards view"
                >
                  Cards
                </button>
                <button
                  className={cls(
                    "px-3 py-2 text-sm",
                    mode === "table"
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-slate-600 hover:bg-slate-50",
                    isMobile && "opacity-50 pointer-events-none"
                  )}
                  onClick={() => !isMobile && setMode("table")}
                  title={isMobile ? "Table on larger screens" : "Table view"}
                >
                  Table
                </button>
              </div>
              <button
                className="ripple inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-slate-200 hover:bg-slate-50"
                onClick={() => setShowAdvanced((v) => !v)}
              >
                <FaFilter className="text-slate-500" /> Advanced
              </button>
              <button
                className="ripple inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-white hover:opacity-95"
                style={{ background: BRAND.primary }}
                onClick={exportCSV}
              >
                <FaDownload className="text-white/90" /> Export
              </button>
            </div>
          </div>

          {/* primary DROPDOWN filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <SoftSelect
              label="Role"
              value={role}
              options={["All", "Student", "Tutor", "Admin"]}
              onChange={(v) => {
                setRole(v);
                setPage(1);
              }}
            />
            <SoftSelect
              label="Status"
              value={status}
              options={["All", "Active", "Trial", "Inactive"]}
              onChange={(v) => {
                setStatus(v);
                setPage(1);
              }}
            />
            <SoftSelect
              label="Sort"
              value={`${sort.key}:${sort.dir}`}
              options={[
                { label: "Newest", value: "joined:desc" },
                { label: "Oldest", value: "joined:asc" },
                { label: "Name A→Z", value: "name:asc" },
                { label: "Name Z→A", value: "name:desc" },
                { label: "Role A→Z", value: "role:asc" },
              ]}
              onChange={(v) => {
                const [k, d] = String(v).split(":");
                setSort({ key: k, dir: d });
              }}
            />
          </div>

          {/* Advanced */}
          <AnimatePresence initial={false}>
            {showAdvanced && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-3 border-t pt-3"
              >
                <Field label="Joined After">
                  <input
                    type="date"
                    value={minDate}
                    onChange={(e) => {
                      setMinDate(e.target.value);
                      setPage(1);
                    }}
                    className="w-full px-3 py-2 rounded-md border border-slate-200"
                  />
                </Field>
                <div className="grid items-end">
                  <button
                    className="ripple px-3 py-2 rounded-md border border-slate-200 hover:bg-slate-50"
                    onClick={() => {
                      setMinDate("");
                      setRole("All");
                      setStatus("All");
                      setSort({ key: "joined", dir: "desc" });
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* anchor for smooth scroll on pagination */}
      <div ref={listTopRef} />

      {/* ===== TABLE (md+) ===== */}
      {mode === "table" && (
        <div className="hidden md:block bg-white/80 backdrop-blur rounded-2xl shadow overflow-hidden border border-slate-100">
          <div className="sticky top-0 z-10 bg-slate-50/70 backdrop-blur border-b">
            <div className="grid grid-cols-[48px_1.6fr_1.4fr_.9fr_.9fr_.9fr_180px] px-2 py-3 text-xs uppercase tracking-wide text-slate-500">
              <div className="pl-2">
                <input
                  type="checkbox"
                  checked={
                    pageData.length > 0 &&
                    pageData.every((u) => selected.includes(u.id))
                  }
                  onChange={toggleAll}
                />
              </div>
              <Head
                label="Name"
                onClick={() =>
                  setSort((s) => ({
                    key: "name",
                    dir: s.key === "name" && s.dir === "asc" ? "desc" : "asc",
                  }))
                }
              />
              <Head
                label="Email"
                onClick={() =>
                  setSort((s) => ({
                    key: "email",
                    dir: s.key === "email" && s.dir === "asc" ? "desc" : "asc",
                  }))
                }
              />
              <Head
                label="Role"
                onClick={() =>
                  setSort((s) => ({
                    key: "role",
                    dir: s.key === "role" && s.dir === "asc" ? "desc" : "asc",
                  }))
                }
              />
              <Head
                label="Status"
                onClick={() =>
                  setSort((s) => ({
                    key: "status",
                    dir: s.key === "status" && s.dir === "asc" ? "desc" : "asc",
                  }))
                }
              />
              <Head
                label="Joined"
                onClick={() =>
                  setSort((s) => ({
                    key: "joined",
                    dir: s.key === "joined" && s.dir === "asc" ? "desc" : "asc",
                  }))
                }
              />
              <div className="pr-3 text-right">Actions</div>
            </div>
          </div>

          {loading ? (
            <div className="p-4 space-y-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-16 rounded-xl shimmer" />
              ))}
            </div>
          ) : (
            <ul className="divide-y">
              <AnimatePresence initial={false}>
                {pageData.map((u, idx) => (
                  <motion.li
                    key={u.id}
                    initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.25, delay: 0.02 * idx },
                    }}
                    exit={{ opacity: 0, y: 4 }}
                    className="group grid grid-cols-[48px_1.6fr_1.4fr_.9fr_.9fr_.9fr_180px] items-center px-2 py-3 transition-colors hover:bg-[#0E7C5A06]"
                  >
                    <div className="pl-2">
                      <input
                        type="checkbox"
                        checked={selected.includes(u.id)}
                        onChange={() => toggleOne(u.id)}
                      />
                    </div>
                    <button onClick={() => setDrawer(u)} className="text-left">
                      <div className="flex items-center gap-3">
                        <img
                          src={u.avatar}
                          alt={u.name}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                        />
                        <div className="min-w-0">
                          <div className="font-medium truncate text-[#0B1324]">
                            {u.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            ID #{u.id}
                          </div>
                        </div>
                      </div>
                    </button>
                    <div className="truncate">{u.email}</div>
                    <div>
                      <RoleBadge r={u.role} />
                    </div>
                    <div>
                      <StatusBadge s={u.status} />
                    </div>
                    <div>{new Date(u.joined).toLocaleDateString()}</div>
                    <div className="pr-3 text-right">
                      {/* Replaced 3-dots with an Actions dropdown */}
                      <ActionsMenu
                        onView={() => setDrawer(u)}
                        onEdit={() => setEditUser(u)}
                        onDelete={() => setDeleteUser(u)}
                      />
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}

          {!loading && (
            <div className="flex items-center justify-between px-4 py-3 text-sm text-slate-600 border-t">
              <span>
                Showing {(page - 1) * perPage + 1}–
                {Math.min(page * perPage, total)} of {total}
              </span>
              <div className="flex items-center gap-1">
                <button
                  className="ripple px-2 py-1 rounded border border-slate-200 hover:bg-slate-50"
                  onClick={() => gotoPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                >
                  Prev
                </button>
                {[...Array(pages)].map((_, i) => (
                  <button
                    key={i}
                    className={cls(
                      "ripple px-2 py-1 rounded border border-slate-200 hover:bg-slate-50",
                      page === i + 1
                        ? "bg-[#0E7C5A] text-white border-transparent"
                        : ""
                    )}
                    onClick={() => gotoPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="ripple px-2 py-1 rounded border border-slate-200 hover:bg-slate-50"
                  onClick={() => gotoPage(Math.min(pages, page + 1))}
                  disabled={page === pages}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===== CARDS (mobile-first) ===== */}
      {mode === "cards" && (
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 1 },
            show: { opacity: 1, transition: { staggerChildren: 0.03 } },
          }}
          className="md:hidden grid gap-3"
        >
          {loading
            ? [...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-24 rounded-2xl shadow bg-white shimmer"
                />
              ))
            : pageData.map((u, idx) => (
                <motion.div
                  key={u.id}
                  initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.25, delay: 0.02 * idx },
                  }}
                  whileHover={reduce ? undefined : { y: -3, scale: 1.01 }}
                  className="bg-white rounded-2xl shadow p-4 flex items-center gap-3 transition hover-lift"
                >
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={selected.includes(u.id)}
                    onChange={() => toggleOne(u.id)}
                  />
                  <img
                    src={u.avatar}
                    alt={u.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-[#0B1324] truncate">
                      {u.name}
                    </div>
                    <div className="text-xs text-slate-500 truncate">
                      {u.email}
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <RoleBadge r={u.role} />
                      <StatusBadge s={u.status} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconBtn
                      label="View"
                      variant="view"
                      onClick={() => setDrawer(u)}
                    >
                      <FaEye />
                    </IconBtn>
                    <IconBtn
                      label="Update"
                      variant="edit"
                      onClick={() => setEditUser(u)}
                    >
                      <FaPen />
                    </IconBtn>
                    <IconBtn
                      label="Delete"
                      variant="delete"
                      onClick={() => setDeleteUser(u)}
                    >
                      <FaTrashAlt />
                    </IconBtn>
                  </div>
                </motion.div>
              ))}

          {!loading && (
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>
                Page {page}/{pages}
              </span>
              <div className="flex items-center gap-1">
                <button
                  className="ripple px-3 py-1 rounded border border-slate-200"
                  onClick={() => gotoPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                >
                  Prev
                </button>
                <button
                  className="ripple px-3 py-1 rounded border border-slate-200"
                  onClick={() => gotoPage(Math.min(pages, page + 1))}
                  disabled={page === pages}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Sticky mobile quick bar */}
      <AnimatePresence>
        {isMobile && !(drawer || editUser || deleteUser) && (
          <motion.nav
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 bg-white/95 backdrop-blur border border-slate-200 shadow-xl rounded-full px-3 py-2 flex items-center gap-2"
          >
            <button
              className="ripple px-3 py-1.5 rounded-full text-sm border border-slate-200"
              onClick={() => {
                commandRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <FaFilter className="inline -mt-0.5 mr-1" />
              Filters
            </button>
            <button
              className={cls(
                "ripple px-3 py-1.5 rounded-full text-sm border",
                mode === "cards"
                  ? "border-emerald-300 text-emerald-700 bg-emerald-50"
                  : "border-slate-200"
              )}
              onClick={() =>
                setMode((m) => (m === "cards" ? "table" : "cards"))
              }
            >
              {mode === "cards" ? "Table" : "Cards"}
            </button>
            <button
              className="ripple px-3 py-1.5 rounded-full text-sm text-white"
              style={{ background: BRAND.primary }}
              onClick={exportCSV}
            >
              <FaDownload className="inline -mt-0.5 mr-1" />
              Export
            </button>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* View Drawer */}
      <AnimatePresence>
        {drawer && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawer(null)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0, transition: { duration: 0.35, ease } }}
              exit={{ x: "100%" }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
            >
              <div className="p-4 border-b flex items-center justify-between">
                <h3
                  className="text-lg font-semibold"
                  style={{ color: BRAND.dark }}
                >
                  User Details
                </h3>
                <button
                  className="ripple w-9 h-9 rounded-md border border-slate-200 hover:bg-slate-50"
                  onClick={() => setDrawer(null)}
                  title="Close"
                >
                  <FaTimes className="mx-auto" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={drawer.avatar}
                    alt={drawer.name}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-white shadow"
                  />
                  <div>
                    <div className="text-xl font-bold">{drawer.name}</div>
                    <div className="text-slate-500">{drawer.email}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <RoleBadge r={drawer.role} />{" "}
                      <StatusBadge s={drawer.status} />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-slate-500">Joined:</span>{" "}
                    {new Date(drawer.joined).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="text-slate-500">User ID:</span> #
                    {drawer.id}
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <div className="text-sm text-slate-500 mb-2">Notes</div>
                  <p className="text-slate-700">
                    Wire this to your backend to show attendance, enrolled
                    courses, and last login.
                  </p>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Edit modal */}
      <AnimatePresence>
        {editUser && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditUser(null)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { duration: 0.25 } }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="fixed inset-0 z-50 grid place-items-center p-4"
            >
              <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: BRAND.dark }}
                  >
                    Update User
                  </h3>
                  <button
                    className="ripple w-9 h-9 rounded-md border border-slate-200 hover:bg-slate-50"
                    onClick={() => setEditUser(null)}
                  >
                    <FaTimes className="mx-auto" />
                  </button>
                </div>
                <EditForm
                  user={editUser}
                  onCancel={() => setEditUser(null)}
                  onSubmit={applyUpdate}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete confirm */}
      <AnimatePresence>
        {deleteUser && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteUser(null)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { duration: 0.25 } }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="fixed inset-0 z-50 grid place-items-center p-4"
            >
              <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: BRAND.dark }}
                >
                  Confirm Delete
                </h3>
                <p className="text-slate-600 mb-4">
                  Delete <b>{deleteUser.name}</b>? This action cannot be undone.
                </p>
                <div className="flex items-center justify-end gap-2">
                  <button
                    className="ripple px-3 py-2 rounded-md border border-slate-200 hover:bg-slate-50"
                    onClick={() => setDeleteUser(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="ripple px-3 py-2 rounded-md text-white bg-rose-600 hover:opacity-95"
                    onClick={() => applyDelete(deleteUser.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Users;
