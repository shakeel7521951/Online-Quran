// /src/Dashboard/common pages/Tutors.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  FaSearch,
  FaFilter,
  FaDownload,
  FaTimes,
  FaUserTie,
  FaStar,
  FaPen,
  FaTrashAlt,
  FaEye,
  FaChalkboardTeacher,
  FaThLarge,
  FaListUl,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaShieldAlt,
  FaCalendarAlt,
  FaChevronDown,
  FaPlus,
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

    /* Fancy gradient border card */
    .card-gradient {
      position: relative;
      background: linear-gradient(#fff,#fff) padding-box,
                  radial-gradient(1200px 200px at 0% -10%, rgba(14,124,90,.12), transparent 40%) padding-box,
                  linear-gradient(135deg, rgba(14,124,90,.35), rgba(212,175,55,.35)) border-box;
      border: 1px solid transparent;
    }

    /* Primary CTA (Add Tutor) */
    .cta {
      background: linear-gradient(135doeg, #10B981, #0E7C5A);
      color: #053B2D;
      box-shadow: 0 8px 30px rgba(16,185,129,.35);
    }
    .cta:hover { filter: brightness(1.03); box-shadow: 0 10px 36px rgba(16,185,129,.45); }
    .cta-glow { position:relative; }
    .cta-glow:before{
      content:""; position:absolute; inset:-1px; border-radius:14px;
      background: radial-gradient(120px 40px at 20% 0%, rgba(255,255,255,.4), transparent 40%),
                  radial-gradient(120px 40px at 80% 120%, rgba(255,255,255,.25), transparent 50%);
      pointer-events:none;
    }
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
    OnLeave: { fg: "#B45309", bg: "#B453091A" },
    Inactive: { fg: "#64748B", bg: "#64748B1A" },
  };
  const { fg, bg } = map[s] || map.Active;
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ color: fg, background: bg }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: fg }} />
      {s}
    </span>
  );
};
const SubjectTag = ({ t }) => (
  <span className="px-2 py-1 rounded-full text-[11px] bg-emerald-50 text-emerald-700">
    {t}
  </span>
);
const FeatureChip = ({ label, icon }) => (
  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] bg-slate-50 text-slate-700 border border-slate-200">
    <span className="text-[12px]">{icon}</span> {label}
  </span>
);
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

/* ───────────────── SoftSelect (animated dropdown) ───────────────── */
const SoftSelect = ({ label, value, options, onChange, className }) => {
  const wrapper = useRef(null);
  const pop = useRef(null);
  const [open, setOpen] = useState(false);
  useOutside([wrapper, pop], () => setOpen(false));

  const opts = (Array.isArray(options) ? options : []).map((o) =>
    typeof o === "string" ? { label: o, value: o } : o
  );
  const current = opts.find((o) => o.value === value) ||
    opts[0] || { label: "All", value: "All" };

  return (
    <div
      ref={wrapper}
      className={cls("relative grid gap-1 text-sm", className)}
    >
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

/* ───────────────── Actions dropdown (table) ───────────────── */
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
    id: 201,
    name: "Ustadh Imran",
    email: "imran@example.com",
    phone: "+974-5555-0101",
    gender: "Male",
    status: "Active",
    subjects: ["Tajweed", "Arabic"],
    rating: 4.8,
    students: 54,
    availability: "Weekdays",
    avatar: "https://i.pravatar.cc/64?img=22",
    updated: "2025-09-07",
    features: ["One-on-One", "Flexible"],
    verified: false,
  },
  {
    id: 202,
    name: "Qari Zainab",
    email: "zainab@example.com",
    phone: "+974-5555-0102",
    gender: "Female",
    status: "Active",
    subjects: ["Hifz", "Tajweed"],
    rating: 4.9,
    students: 47,
    availability: "Evenings",
    avatar: "https://i.pravatar.cc/64?img=24",
    updated: "2025-09-06",
    features: ["One-on-One"],
    verified: true,
  },
  {
    id: 203,
    name: "Ustadha Aisha",
    email: "aisha@example.com",
    phone: "+974-5555-0103",
    gender: "Female",
    status: "Active",
    subjects: ["Tafseer"],
    rating: 4.6,
    students: 39,
    availability: "Weekends",
    avatar: "https://i.pravatar.cc/64?img=17",
    updated: "2025-09-05",
    features: ["Flexible"],
    verified: true,
  },
  {
    id: 204,
    name: "Ustadh Ali",
    email: "ali@example.com",
    phone: "+974-5555-0104",
    gender: "Male",
    status: "OnLeave",
    subjects: ["Kids Quran"],
    rating: 4.7,
    students: 62,
    availability: "Afternoons",
    avatar: "https://i.pravatar.cc/64?img=39",
    updated: "2025-09-04",
    features: ["One-on-One"],
    verified: false,
  },
  {
    id: 205,
    name: "Ustadha Maryam",
    email: "maryam@example.com",
    phone: "+974-5555-0105",
    gender: "Female",
    status: "Active",
    subjects: ["Islamic Studies"],
    rating: 4.5,
    students: 33,
    availability: "Flexible",
    avatar: "https://i.pravatar.cc/64?img=31",
    updated: "2025-09-03",
    features: ["Flexible"],
    verified: true,
  },
  {
    id: 206,
    name: "Ustadh Bilal",
    email: "bilal@example.com",
    phone: "+974-5555-0106",
    gender: "Male",
    status: "Inactive",
    subjects: ["Arabic"],
    rating: 4.3,
    students: 21,
    availability: "Mornings",
    avatar: "https://i.pravatar.cc/64?img=28",
    updated: "2025-08-31",
    features: ["One-on-One"],
    verified: false,
  },
];

/* ───────────────── Field & Form ───────────────── */
const Field = ({ label, children }) => (
  <label className="grid gap-1 text-sm">
    <span className="text-slate-600">{label}</span>
    {children}
  </label>
);
const EditForm = ({ tutor, onCancel, onSubmit }) => {
  const [form, setForm] = useState({ ...tutor });
  const isCreate = !tutor?.id;

  const toggleFeature = (f) => {
    setForm((prev) => {
      const set = new Set(prev.features || []);
      set.has(f) ? set.delete(f) : set.add(f);
      return { ...prev, features: Array.from(set) };
    });
  };

  return (
    <form
      className="grid gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Name">
          <input
            className="w-full px-3 py-2 rounded-md border border-slate-200"
            value={form.name || ""}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </Field>
        <Field label="Gender">
          <select
            className="w-full px-3 py-2 rounded-md border border-slate-200"
            value={form.gender || "Male"}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          >
            <option>Male</option>
            <option>Female</option>
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Email">
          <input
            className="w-full px-3 py-2 rounded-md border border-slate-200"
            type="email"
            value={form.email || ""}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </Field>
        <Field label="Phone">
          <input
            className="w-full px-3 py-2 rounded-md border border-slate-200"
            value={form.phone || ""}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Status">
          <select
            className="w-full px-3 py-2 rounded-md border border-slate-200"
            value={form.status || "Active"}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option>Active</option>
            <option>OnLeave</option>
            <option>Inactive</option>
          </select>
        </Field>
        <Field label="Availability">
          <input
            className="w-full px-3 py-2 rounded-md border border-slate-200"
            value={form.availability || ""}
            onChange={(e) => setForm({ ...form, availability: e.target.value })}
          />
        </Field>
      </div>

      <Field label="Subjects (comma separated)">
        <input
          className="w-full px-3 py-2 rounded-md border border-slate-200"
          value={(form.subjects || []).join(", ")}
          onChange={(e) =>
            setForm({
              ...form,
              subjects: e.target.value
                .split(",")
                .map((x) => x.trim())
                .filter(Boolean),
            })
          }
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Field label="Students">
          <input
            type="number"
            className="w-full px-3 py-2 rounded-md border border-slate-200"
            value={form.students || 0}
            onChange={(e) =>
              setForm({ ...form, students: Number(e.target.value) })
            }
          />
        </Field>
        <Field label="Rating">
          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            className="w-full px-3 py-2 rounded-md border border-slate-200"
            value={form.rating ?? 4.5}
            onChange={(e) =>
              setForm({ ...form, rating: Number(e.target.value) })
            }
          />
        </Field>
        <Field label="Avatar URL">
          <input
            className="w-full px-3 py-2 rounded-md border border-slate-200"
            value={form.avatar || ""}
            onChange={(e) => setForm({ ...form, avatar: e.target.value })}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Field label="Features">
          <div className="flex flex-wrap gap-2">
            {["One-on-One", "Flexible"].map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => toggleFeature(f)}
                className={`px-2 py-1 rounded-full text-[12px] border ${
                  form.features?.includes(f)
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </Field>
        <Field label="Verified (female tutors)">
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={!!form.verified}
              onChange={(e) => setForm({ ...form, verified: e.target.checked })}
            />
            <span>Show verified shield</span>
          </label>
        </Field>
        <div />
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
          className="ripple px-3 py-2 rounded-md text-white cta cta-glow"
        >
          {isCreate ? "Create Tutor" : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

/* ───────────────── Tutor Card (more attractive + equal height) ───────────────── */
const TutorCard = ({ t, onView, onEdit, onDelete, reduce }) => (
  <motion.div
    initial={{ opacity: 0, y: reduce ? 0 : 10 }}
    animate={{ opacity: 1, y: 0, transition: { duration: 0.25 } }}
    whileHover={reduce ? undefined : { y: -4, scale: 1.01 }}
    className="group relative rounded-2xl overflow-hidden card-gradient hover-lift h-full"
  >
    <div className="p-4 flex flex-col h-full">
      <div className="flex items-start gap-3">
        <div className="relative shrink-0">
          <img
            src={t.avatar}
            alt={t.name}
            className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover ring-2 ring-white shadow-sm"
          />
          {t.gender === "Female" && t.verified && (
            <span className="absolute -bottom-1 -right-1 grid place-items-center w-5 h-5 rounded-full bg-white shadow ring-1 ring-slate-200 text-[10px] text-amber-600">
              <FaShieldAlt title="Verified female tutor" />
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-[clamp(14px,2vw,16px)] font-semibold text-[#0B1324] truncate">
              {t.name}
            </h3>
            <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-amber-600">
              <FaStar className="opacity-80" /> {t.rating.toFixed(1)}
            </span>
          </div>
          <div className="mt-1 text-xs text-slate-500 truncate flex items-center gap-2">
            <FaChalkboardTeacher className="opacity-70" /> {t.students} students
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {t.subjects.map((s, i) => (
              <SubjectTag key={i} t={s} />
            ))}
            <StatusBadge s={t.status} />
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[12px] text-slate-600">
        <div className="inline-flex items-center gap-1.5">
          <FaClock /> {t.availability}
        </div>
        <div className="inline-flex items-center gap-1.5">
          <FaPhoneAlt /> {t.phone}
        </div>
        <div className="inline-flex items-center gap-1.5">
          <FaEnvelope /> {t.email}
        </div>
      </div>

      <div className="mt-2 flex items-center gap-2 flex-wrap">
        {t.features?.includes("One-on-One") && (
          <FeatureChip label="One-on-One" icon={<FaUserTie />} />
        )}
        {t.features?.includes("Flexible") && (
          <FeatureChip label="Flexible" icon={<FaCalendarAlt />} />
        )}
      </div>

      <div className="mt-auto pt-3 flex items-center justify-end gap-2">
        <IconBtn label="View" variant="view" onClick={onView}>
          <FaEye />
        </IconBtn>
        <IconBtn label="Update" variant="edit" onClick={onEdit}>
          <FaPen />
        </IconBtn>
        <IconBtn label="Delete" variant="delete" onClick={onDelete}>
          <FaTrashAlt />
        </IconBtn>
      </div>
    </div>

    {/* sheen */}
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition pointer-events-none"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(212,175,55,.10), transparent)",
      }}
    />
  </motion.div>
);

/* ───────────────── Page ───────────────── */
export const Tutors = () => {
  const reduce = useReducedMotion();
  const isMobile = useMedia("(max-width: 767px)");
  const commandRef = useRef(null);
  const listTopRef = useRef(null);

  // filters & state
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [subject, setSubject] = useState("All");
  const [availability, setAvailability] = useState("All");
  const [minRating, setMinRating] = useState(0);
  const [minStudents, setMinStudents] = useState(0);
  const [sort, setSort] = useState({ key: "updated", dir: "desc" });
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [mode, setMode] = useState("cards");
  useEffect(() => {
    setMode(isMobile ? "cards" : "table");
  }, [isMobile]);
  const [compact, setCompact] = useState(false);

  // overlays
  const [drawer, setDrawer] = useState(null);
  const [editTutor, setEditTutor] = useState(null);
  const [deleteTutor, setDeleteTutor] = useState(null);
  const [createOpen, setCreateOpen] = useState(false);
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

  const subjects = useMemo(() => {
    const s = new Set();
    data.forEach((d) => d.subjects.forEach((x) => s.add(x)));
    return ["All", ...Array.from(s)];
  }, [data]);
  const availabilities = useMemo(() => {
    const s = new Set(data.map((d) => d.availability));
    return ["All", ...Array.from(s)];
  }, [data]);

  /* filter/sort */
  const filtered = useMemo(() => {
    let out = [...data];
    if (q.trim()) {
      const t = q.toLowerCase();
      out = out.filter(
        (x) =>
          x.name.toLowerCase().includes(t) ||
          x.email.toLowerCase().includes(t) ||
          x.subjects.some((s) => s.toLowerCase().includes(t))
      );
    }
    if (status !== "All") out = out.filter((x) => x.status === status);
    if (subject !== "All")
      out = out.filter((x) => x.subjects.includes(subject));
    if (availability !== "All")
      out = out.filter((x) => x.availability === availability);
    out = out.filter(
      (x) => (x.rating ?? 0) >= minRating && (x.students ?? 0) >= minStudents
    );

    out.sort((a, b) => {
      const k = sort.key;
      let av = a[k],
        bv = b[k];
      if (k === "updated") {
        av = +new Date(a.updated);
        bv = +new Date(b.updated);
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
  }, [data, q, status, subject, availability, minRating, minStudents, sort]);

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
    pageData.length > 0 && pageData.every((x) => selected.includes(x.id));
  const toggleAll = () => {
    if (allChecked)
      setSelected((prev) =>
        prev.filter((id) => !pageData.find((x) => x.id === id))
      );
    else
      setSelected((prev) => [
        ...new Set([...prev, ...pageData.map((x) => x.id)]),
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
      prev.map((x) => (x.id === payload.id ? { ...x, ...payload } : x))
    );
    setEditTutor(null);
    alert("Tutor updated");
  };
  const applyDelete = (id) => {
    setData((prev) => prev.filter((x) => x.id !== id));
    setDeleteTutor(null);
    setSelected((prev) => prev.filter((x) => x !== id));
    alert("Tutor deleted");
  };
  const createTutor = (payload) => {
    const next = {
      ...payload,
      id: Math.max(...data.map((d) => d.id), 200) + 1,
      updated: new Date().toISOString().slice(0, 10),
    };
    setData((prev) => [next, ...prev]);
    setCreateOpen(false);
    alert("Tutor created");
  };

  // bulk actions
  const setBulkStatus = (newStatus) => {
    setData((prev) =>
      prev.map((x) =>
        selected.includes(x.id) ? { ...x, status: newStatus } : x
      )
    );
    setSelected([]);
    alert(`Set ${newStatus} for selected`);
  };
  const deleteSelected = () => {
    setData((prev) => prev.filter((x) => !selected.includes(x.id)));
    setSelected([]);
    alert("Selected tutors deleted");
  };

  const counts = useMemo(
    () => ({
      all: data.length,
      females: data.filter((d) => d.gender === "Female").length,
      onLeave: data.filter((d) => d.status === "OnLeave").length,
    }),
    [data]
  );

  const tileHover = reduce
    ? {}
    : { whileHover: { y: -4, scale: 1.01 }, whileTap: { scale: 0.99 } };

  return (
    <div
      className="relative flex-1 p-4 sm:p-6 md:p-8 mx-auto max-w-7xl overflow-hidden"
      style={{ background: BRAND.light }}
    >
      <GlobalFX />

      {/* Hero */}
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
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="grid place-items-center w-11 h-11 rounded-full bg-white/15 ring-1 ring-white/20">
                <FaUserTie />
              </div>
              <h1 className="text-[clamp(18px,2.2vw,24px)] font-extrabold tracking-tight">
                Tutors
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="ripple cta cta-glow inline-flex items-center gap-2 px-3 sm:px-4 py-2 text-sm rounded-xl text-white shadow"
                onClick={() => setCreateOpen(true)}
              >
                <FaPlus /> Add Tutor
              </button>
              <button
                className="ripple inline-flex items-center gap-2 px-3 py-2 text-sm rounded-xl text-white hover:opacity-95"
                style={{ background: BRAND.primary }}
                onClick={exportCSV}
              >
                <FaDownload className="text-white/90" /> Export
              </button>
            </div>
          </div>
          <p className="mt-1 opacity-90 text-sm">
            Manage your teaching team — subjects, availability, ratings, and
            status.
          </p>
        </div>
      </motion.div>

      {/* KPI tiles */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            t: "Total Tutors",
            v: counts.all,
            from: "#0E7C5A",
            to: "#0B5F46",
            icon: <FaUserTie />,
          },
          {
            t: "Female Tutors",
            v: counts.females,
            from: "#D4AF37",
            to: "#B98F21",
            icon: <FaChalkboardTeacher />,
          },
          {
            t: "On Leave",
            v: counts.onLeave,
            from: "#2C3E50",
            to: "#1B2A38",
            icon: <FaClock />,
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
      <div
        ref={commandRef}
        className="bg-white rounded-2xl shadow p-4 sm:p-5 mb-4"
      >
        <div className="grid gap-3">
          {/* Search & view toggles */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <div className="flex-1 min-w-[220px] w-full flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#0E7C5A33]">
              <FaSearch className="text-slate-400" />
              <input
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setPage(1);
                }}
                placeholder="Search name, email, or subject…"
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
                  <FaThLarge />
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
                  <FaListUl />
                </button>
              </div>
              <button
                className="ripple inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-slate-200 hover:bg-slate-50"
                onClick={() => setShowAdvanced((v) => !v)}
              >
                <FaFilter className="text-slate-500" /> Advanced
              </button>
            </div>
          </div>

          {/* Primary dropdown filters (mobile-first, stacks) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <SoftSelect
              label="Subject"
              value={subject}
              options={subjects}
              onChange={(v) => {
                setSubject(v);
                setPage(1);
              }}
            />
            <SoftSelect
              label="Status"
              value={status}
              options={["All", "Active", "OnLeave", "Inactive"]}
              onChange={(v) => {
                setStatus(v);
                setPage(1);
              }}
            />
            <SoftSelect
              label="Availability"
              value={availability}
              options={availabilities}
              onChange={(v) => {
                setAvailability(v);
                setPage(1);
              }}
            />
          </div>

          {/* Advanced filters */}
          <AnimatePresence initial={false}>
            {showAdvanced && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-3 border-t pt-3"
              >
                <Field label={`Min Rating: ${minRating.toFixed(1)}`}>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.1"
                    value={minRating}
                    onChange={(e) => {
                      setMinRating(Number(e.target.value));
                      setPage(1);
                    }}
                    className="w-full"
                  />
                </Field>
                <Field label="Min Students">
                  <input
                    type="number"
                    className="w-full px-3 py-2 rounded-md border border-slate-200"
                    value={minStudents}
                    onChange={(e) => {
                      setMinStudents(Number(e.target.value));
                      setPage(1);
                    }}
                  />
                </Field>
                <Field label="Compact Table Rows">
                  <label className="inline-flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={compact}
                      onChange={(e) => setCompact(e.target.checked)}
                    />
                    <span>Compact mode</span>
                  </label>
                </Field>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Anchor for scroll on pagination */}
      <div ref={listTopRef} />

      {/* ===== CARDS VIEW (fully responsive grid) ===== */}
      {mode === "cards" && (
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 1 },
            show: { opacity: 1, transition: { staggerChildren: 0.03 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
        >
          {loading ? (
            [...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-48 rounded-2xl shadow bg-white shimmer"
              />
            ))
          ) : pageData.length ? (
            pageData.map((t) => (
              <TutorCard
                key={t.id}
                t={t}
                reduce={reduce}
                onView={() => setDrawer(t)}
                onEdit={() => setEditTutor(t)}
                onDelete={() => setDeleteTutor(t)}
              />
            ))
          ) : (
            <div className="col-span-full">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.25 } }}
                className="grid place-items-center h-48 rounded-2xl bg-white border border-slate-100 text-slate-600"
              >
                No tutors match your filters.
              </motion.div>
            </div>
          )}
        </motion.div>
      )}

      {/* ===== TABLE VIEW (md+) ===== */}
      {mode === "table" && (
        <div className="hidden md:block bg-white/80 backdrop-blur rounded-2xl shadow overflow-hidden border border-slate-100 mt-4">
          <div className="sticky top-0 z-10 bg-slate-50/70 backdrop-blur border-b">
            <div
              className={`grid grid-cols-[48px_1.8fr_1.6fr_.9fr_.9fr_.9fr_160px] px-2 ${
                compact ? "py-2" : "py-3"
              } text-xs uppercase tracking-wide text-slate-500`}
            >
              <div className="pl-2">
                <input
                  type="checkbox"
                  checked={
                    pageData.length > 0 &&
                    pageData.every((x) => selected.includes(x.id))
                  }
                  onChange={toggleAll}
                />
              </div>
              <button
                onClick={() =>
                  setSort((s) => ({
                    key: "name",
                    dir: s.key === "name" && s.dir === "asc" ? "desc" : "asc",
                  }))
                }
                className="text-left"
              >
                NAME
              </button>
              <button
                onClick={() =>
                  setSort((s) => ({
                    key: "email",
                    dir: s.key === "email" && s.dir === "asc" ? "desc" : "asc",
                  }))
                }
                className="text-left"
              >
                EMAIL
              </button>
              <button
                onClick={() =>
                  setSort((s) => ({
                    key: "gender",
                    dir: s.key === "gender" && s.dir === "asc" ? "desc" : "asc",
                  }))
                }
                className="text-left"
              >
                GENDER
              </button>
              <button
                onClick={() =>
                  setSort((s) => ({
                    key: "students",
                    dir:
                      s.key === "students" && s.dir === "asc" ? "desc" : "asc",
                  }))
                }
                className="text-left"
              >
                STUDENTS
              </button>
              <button
                onClick={() =>
                  setSort((s) => ({
                    key: "updated",
                    dir:
                      s.key === "updated" && s.dir === "asc" ? "desc" : "asc",
                  }))
                }
                className="text-left"
              >
                UPDATED
              </button>
              <div className="pr-3 text-right">ACTIONS</div>
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
                {pageData.map((t, idx) => (
                  <motion.li
                    key={t.id}
                    initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.25, delay: 0.02 * idx },
                    }}
                    exit={{ opacity: 0, y: 4 }}
                    className={`grid grid-cols-[48px_1.8fr_1.6fr_.9fr_.9fr_.9fr_160px] items-center px-2 ${
                      compact ? "py-2" : "py-3"
                    } transition-colors hover:bg-[#0E7C5A06]`}
                  >
                    <div className="pl-2">
                      <input
                        type="checkbox"
                        checked={selected.includes(t.id)}
                        onChange={() => toggleOne(t.id)}
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={t.avatar}
                            alt={t.name}
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                          />
                          {t.gender === "Female" && t.verified && (
                            <span className="absolute -bottom-1 -right-1 grid place-items-center w-4.5 h-4.5 rounded-full bg-white shadow ring-1 ring-slate-200 text-[9px] text-amber-600">
                              <FaShieldAlt title="Verified female tutor" />
                            </span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium truncate text-[#0B1324]">
                            {t.name}
                          </div>
                          <div className="text-xs text-slate-500 flex items-center gap-2">
                            {t.subjects.slice(0, 2).map((s, i) => (
                              <SubjectTag key={i} t={s} />
                            ))}
                            {t.subjects.length > 2 && (
                              <span className="text-[11px] text-slate-500">
                                +{t.subjects.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="truncate">{t.email}</div>
                    <div className="truncate">{t.gender}</div>
                    <div className="tabular-nums">{t.students}</div>
                    <div>{new Date(t.updated).toLocaleDateString()}</div>

                    <div className="pr-3 text-right">
                      <ActionsMenu
                        onView={() => setDrawer(t)}
                        onEdit={() => setEditTutor(t)}
                        onDelete={() => setDeleteTutor(t)}
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

      {/* Bulk actions bar */}
      <AnimatePresence>
        {selected.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-white shadow-xl border border-slate-200 rounded-full px-3 py-2 flex items-center gap-2"
          >
            <span className="text-sm text-slate-700 px-2">
              Selected: {selected.length}
            </span>
            <button
              className="ripple px-3 py-1.5 rounded-full text-sm border border-slate-200 hover:bg-slate-50"
              onClick={() => setBulkStatus("Active")}
            >
              Set Active
            </button>
            <button
              className="ripple px-3 py-1.5 rounded-full text-sm border border-slate-200 hover:bg-slate-50"
              onClick={() => setBulkStatus("OnLeave")}
            >
              Set On Leave
            </button>
            <button
              className="ripple px-3 py-1.5 rounded-full text-sm border border-slate-200 hover:bg-slate-50"
              onClick={() => setBulkStatus("Inactive")}
            >
              Set Inactive
            </button>
            <button
              className="ripple px-3 py-1.5 rounded-full text-sm text-white"
              style={{ background: BRAND.primary }}
              onClick={() => alert("Exporting selected…")}
            >
              Export
            </button>
            <button
              className="ripple px-3 py-1.5 rounded-full text-sm bg-rose-600 text-white hover:opacity-95"
              onClick={deleteSelected}
            >
              Delete
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Add Tutor FAB for phones */}
      <AnimatePresence>
        {isMobile && !(drawer || editTutor || deleteTutor || createOpen) && (
          <motion.button
            initial={{ scale: 0.9, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 10 }}
            onClick={() => setCreateOpen(true)}
            className="fixed bottom-5 right-5 z-40 cta cta-glow ripple rounded-full px-4 py-3 text-white shadow-lg inline-flex items-center gap-2"
            aria-label="Add Tutor"
          >
            <FaPlus /> Add Tutor
          </motion.button>
        )}
      </AnimatePresence>

      {/* Drawer (View) */}
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
                  Tutor Details
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
                  <div className="relative">
                    <img
                      src={drawer.avatar}
                      alt={drawer.name}
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-white shadow"
                    />
                    {drawer.gender === "Female" && drawer.verified && (
                      <span className="absolute -bottom-1 -right-1 grid place-items-center w-5 h-5 rounded-full bg-white shadow ring-1 ring-slate-200 text-[10px] text-amber-600">
                        <FaShieldAlt title="Verified female tutor" />
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="text-xl font-bold">{drawer.name}</div>
                    <div className="text-slate-500">{drawer.email}</div>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {drawer.subjects.map((s, i) => (
                        <SubjectTag key={i} t={s} />
                      ))}
                      <StatusBadge s={drawer.status} />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-slate-500">Phone:</span>{" "}
                    {drawer.phone}
                  </div>
                  <div>
                    <span className="text-slate-500">Gender:</span>{" "}
                    {drawer.gender}
                  </div>
                  <div>
                    <span className="text-slate-500">Students:</span>{" "}
                    {drawer.students}
                  </div>
                  <div>
                    <span className="text-slate-500">Rating:</span>{" "}
                    {drawer.rating.toFixed(1)}
                  </div>
                  <div>
                    <span className="text-slate-500">Availability:</span>{" "}
                    {drawer.availability}
                  </div>
                  <div>
                    <span className="text-slate-500">Updated:</span>{" "}
                    {new Date(drawer.updated).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="text-slate-500">Tutor ID:</span> #
                    {drawer.id}
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <div className="text-sm text-slate-500 mb-2">Notes</div>
                  <p className="text-slate-700">
                    Connect to backend to show schedule, booked slots, and
                    recent sessions.
                  </p>
                  <div className="mt-3 flex items-center gap-2 flex-wrap">
                    {drawer.features?.includes("One-on-One") && (
                      <FeatureChip label="One-on-One" icon={<FaUserTie />} />
                    )}
                    {drawer.features?.includes("Flexible") && (
                      <FeatureChip label="Flexible" icon={<FaCalendarAlt />} />
                    )}
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Edit modal */}
      <AnimatePresence>
        {editTutor && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditTutor(null)}
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
                    Update Tutor
                  </h3>
                  <button
                    className="ripple w-9 h-9 rounded-md border border-slate-200 hover:bg-slate-50"
                    onClick={() => setEditTutor(null)}
                  >
                    <FaTimes className="mx-auto" />
                  </button>
                </div>
                <EditForm
                  tutor={editTutor}
                  onCancel={() => setEditTutor(null)}
                  onSubmit={applyUpdate}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Create modal */}
      <AnimatePresence>
        {createOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCreateOpen(false)}
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
                    Add Tutor
                  </h3>
                  <button
                    className="ripple w-9 h-9 rounded-md border border-slate-200 hover:bg-slate-50"
                    onClick={() => setCreateOpen(false)}
                  >
                    <FaTimes className="mx-auto" />
                  </button>
                </div>
                <EditForm
                  tutor={{
                    name: "",
                    gender: "Male",
                    email: "",
                    phone: "",
                    status: "Active",
                    availability: "Weekdays",
                    subjects: [],
                    students: 0,
                    rating: 4.5,
                    avatar: "",
                    features: [],
                    verified: false,
                  }}
                  onCancel={() => setCreateOpen(false)}
                  onSubmit={createTutor}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete confirm */}
      <AnimatePresence>
        {deleteTutor && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteTutor(null)}
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
                  Delete <b>{deleteTutor.name}</b>? This action cannot be
                  undone.
                </p>
                <div className="flex items-center justify-end gap-2">
                  <button
                    className="ripple px-3 py-2 rounded-md border border-slate-200 hover:bg-slate-50"
                    onClick={() => setDeleteTutor(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="ripple px-3 py-2 rounded-md text-white bg-rose-600 hover:opacity-95"
                    onClick={() => applyDelete(deleteTutor.id)}
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

/* both named and default to avoid import mismatch */
export default Tutors;
