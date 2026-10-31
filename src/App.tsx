import { useState, useEffect, useRef } from "react";
import { PROJECTS_DATA } from "./data/projectsData";

const PORTRAIT = "/krish.webp";
const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || "krishukande9@gmail.com";

const PARTNERS = [
  "React.js",
  "TypeScript",
  "Node.js",
  "Express.js",
  "ASP.NET",
  "MongoDB",
  "PostgreSQL",
  "TailwindCSS"
];

const CAROUSEL_ITEMS = [
  { category: "MERN Stack", desc: "Full-stack scalable web applications." },
  { category: "ASP.NET Core", desc: "High-performance C# backend APIs." },
  { category: "Database & APIs", desc: "Clean architecture & secure endpoints." },
];

const SERVICES = [
  {
    num: "01",
    title: "Frontend Engineering",
    desc: "React.js, TypeScript, TailwindCSS, modern responsive UI, state management & fluid animations."
  },
  {
    num: "02",
    title: "Backend & RESTful APIs",
    desc: "Node.js, Express.js, ASP.NET Core (.NET 8, C#), FastAPI (Python), robust micro-services."
  },
  {
    num: "03",
    title: "Databases & Architecture",
    desc: "MongoDB, PostgreSQL, SQL Server, Entity Framework Core, Mongoose & schema optimization."
  },
  {
    num: "04",
    title: "Real-Time & DevOps",
    desc: "SignalR (WebSockets), JWT / RBAC authentication, Git, Docker, Render & automated deployments."
  }
];

export default function App() {
  /* ── UI state ── */
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [loaderProgress, setLoaderProgress] = useState(0);
  const [loaderOut, setLoaderOut] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  /* ── Clock state ── */
  const [timeStr, setTimeStr] = useState("");
  const [dateStr, setDateStr] = useState("");

  /* ── Hero Carousel state ── */
  const [activeSlot, setActiveSlot] = useState(0);

  /* ── Project Slider state ── */
  const [projectIndex, setProjectIndex] = useState(0);
  const [projectTransition, setProjectTransition] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right");

  const totalProjects = PROJECTS_DATA.length;
  const currentProject = PROJECTS_DATA[projectIndex];

  /* ── Project Slider Wheel & Drag Ref ── */
  const projectSliderRef = useRef<HTMLDivElement>(null);
  const lastWheelTime = useRef(0);
  const dragStartX = useRef<number | null>(null);
  const dragStartY = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const goToProject = (idx: number, dir?: "left" | "right") => {
    if (projectTransition || idx === projectIndex) return;
    const direction = dir || (idx > projectIndex ? "right" : "left");
    setSlideDirection(direction);
    setProjectTransition(true);
    setTimeout(() => {
      setProjectIndex(idx);
      setTimeout(() => {
        setProjectTransition(false);
      }, 50);
    }, 180);
  };

  const nextProject = () => {
    const next = (projectIndex + 1) % totalProjects;
    goToProject(next, "right");
  };

  const prevProject = () => {
    const prev = (projectIndex - 1 + totalProjects) % totalProjects;
    goToProject(prev, "left");
  };

  /* ── Contact Form state ── */
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "", _honey: "" });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  /* ── Canvas Liquid Reveal ref ── */
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroBoxRef = useRef<HTMLDivElement>(null);

  /* ── Clock tick ── */
  useEffect(() => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const updateTime = () => {
      const d = new Date();
      const h = d.getHours();
      const t = (h % 12 || 12) + ":" + String(d.getMinutes()).padStart(2, "0") + (h < 12 ? "am" : "pm");
      setTimeStr(t);
      setDateStr(d.getDate() + " " + months[d.getMonth()] + ", " + d.getFullYear());
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  /* ── Initial Loader Ease ── */
  useEffect(() => {
    let start: number | null = null;
    const duration = 1200;
    const ease = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);

    const step = (now: number) => {
      if (!start) start = now;
      const progress = Math.min(1, (now - start) / duration);
      const val = Math.round(ease(progress) * 100);
      setLoaderProgress(val);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setLoaderOut(true);
        setTimeout(() => {
          setLoaderVisible(false);
          triggerReveals();
        }, 750);
      }
    };

    const reqId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(reqId);
  }, []);

  /* ── Body scroll lock ── */
  useEffect(() => {
    if (navOpen || modalOpen || privacyOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [navOpen, modalOpen, privacyOpen]);

  /* ── Scroll reveal trigger ── */
  const triggerReveals = () => {
    const elements = document.querySelectorAll(".rv, .ln, .wd");
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95) {
        el.classList.add("in");
      }
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      triggerReveals();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Keyboard Arrow Navigation for Projects ── */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea") return;
      if (e.key === "ArrowLeft") prevProject();
      if (e.key === "ArrowRight") nextProject();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [projectIndex, projectTransition]);

  /* ── Mouse Wheel & Trackpad Scroll on Project Showcase ── */
  useEffect(() => {
    const el = projectSliderRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);
      const delta = absX > absY ? e.deltaX : e.deltaY;

      if (Math.abs(delta) < 25) return;

      const now = Date.now();
      if (now - lastWheelTime.current < 450) {
        // Debounce to change 1 project per scroll notch
        e.preventDefault();
        return;
      }

      if (delta > 0) {
        // scrolling down / right
        if (projectIndex < totalProjects - 1) {
          e.preventDefault();
          lastWheelTime.current = now;
          nextProject();
        }
      } else {
        // scrolling up / left
        if (projectIndex > 0) {
          e.preventDefault();
          lastWheelTime.current = now;
          prevProject();
        }
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [projectIndex, projectTransition, totalProjects]);

  /* ── Pointer Drag / Swipe for Projects ── */
  const handlePointerDown = (e: React.PointerEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("a") || target.closest("button")) return;
    dragStartX.current = e.clientX;
    dragStartY.current = e.clientY;
    setIsDragging(true);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const diffX = e.clientX - dragStartX.current;
    const diffY = dragStartY.current !== null ? Math.abs(e.clientY - dragStartY.current) : 0;

    if (Math.abs(diffX) > 40 && Math.abs(diffX) > diffY) {
      if (diffX < 0) {
        nextProject();
      } else {
        prevProject();
      }
    }
    dragStartX.current = null;
    dragStartY.current = null;
    setIsDragging(false);
  };

  const handlePointerCancel = () => {
    dragStartX.current = null;
    dragStartY.current = null;
    setIsDragging(false);
  };

  /* ── Liquid Canvas Reveal on Portrait ── */
  useEffect(() => {
    const cv = canvasRef.current;
    const box = heroBoxRef.current;
    if (!cv || !box) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = cv.getContext("2d");
    if (!ctx) return;

    /* R0: Cursor brush radius (reduced from 140 to 65 for a sleeker, smaller effect) */
    const R0 = 65;
    const decay = 0.016;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const img = new Image();
    img.src = PORTRAIT;

    const cover = document.createElement("canvas");
    const brush = document.createElement("canvas");
    const cx = cover.getContext("2d");
    const bx = brush.getContext("2d");
    if (!cx || !bx) return;

    let W = 0;
    let Hh = 0;
    let rad = R0 * dpr;
    let pts: [number, number][] = [];
    let last: [number, number] | null = null;
    let idle = 121;
    let run = false;
    let animId: number;

    const size = () => {
      const r = box.getBoundingClientRect();
      W = Math.round(r.width * dpr);
      Hh = Math.round(r.height * dpr);
      cv.width = cover.width = W;
      cv.height = cover.height = Hh;
      rad = R0 * dpr;
      brush.width = brush.height = Math.ceil(rad * 2);

      if (!img.complete || !img.naturalWidth) return;
      const s = Math.min(W / img.naturalWidth, Hh / img.naturalHeight);
      const w = img.naturalWidth * s;
      const h = img.naturalHeight * s;
      const px = window.innerWidth < 1024 ? 0.5 : 0.78;

      cx.globalCompositeOperation = "source-over";
      cx.clearRect(0, 0, W, Hh);
      const og = cx.createLinearGradient(0, 0, W, Hh);
      og.addColorStop(0, "#e0925a");
      og.addColorStop(1, "#b15f2c");
      cx.fillStyle = og;
      cx.fillRect(0, 0, W, Hh);
      cx.drawImage(img, (W - w) * px, Hh - h, w, h);
      cx.globalCompositeOperation = "multiply";
      cx.fillStyle = "#f0a468";
      cx.fillRect((W - w) * px, Hh - h, w, h);
      cx.globalCompositeOperation = "source-over";
    };

    img.onload = size;
    size();

    const ro = new ResizeObserver(size);
    ro.observe(box);

    const stamp = (x: number, y: number) => {
      const d = brush.width;
      const c = d / 2;
      bx.globalCompositeOperation = "source-over";
      bx.clearRect(0, 0, d, d);
      const g = bx.createRadialGradient(c, c, 0, c, c, c);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.55, "rgba(255,255,255,0.85)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      bx.fillStyle = g;
      bx.fillRect(0, 0, d, d);
      bx.globalCompositeOperation = "source-in";
      bx.drawImage(cover, x - c, y - c, d, d, 0, 0, d, d);
      ctx.globalCompositeOperation = "source-over";
      ctx.drawImage(brush, x - c, y - c);
    };

    const loop = () => {
      const drawing = pts.length > 0;
      if (drawing) idle = 0;
      else idle++;

      if (idle > 120) {
        run = false;
        ctx.clearRect(0, 0, W, Hh);
        return;
      }

      const fade = drawing ? decay : Math.min(decay + idle * 0.004, 0.5);
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = `rgba(0,0,0,${fade})`;
      ctx.fillRect(0, 0, W, Hh);

      if (drawing) {
        pts.forEach((p) => stamp(p[0], p[1]));
        pts = [];
      }
      animId = requestAnimationFrame(loop);
    };

    const handlePointerMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      const x = (e.clientX - r.left) * dpr;
      const y = (e.clientY - r.top) * dpr;

      if (x < -rad || y < -rad || x > W + rad || y > Hh + rad) {
        last = null;
        return;
      }

      if (last) {
        const dx = x - last[0];
        const dy = y - last[1];
        const dist = Math.hypot(dx, dy);
        const step = Math.max(rad * 0.3, 1);
        const n = Math.min(Math.ceil(dist / step), 60);
        for (let i = 1; i <= n; i++) {
          pts.push([last[0] + (dx * i) / n, last[1] + (dy * i) / n]);
        }
      } else {
        pts.push([x, y]);
      }

      last = [x, y];
      if (!run) {
        run = true;
        idle = 0;
        animId = requestAnimationFrame(loop);
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      ro.disconnect();
      cancelAnimationFrame(animId);
    };
  }, []);

  /* ── Smooth Navigation Scroll ── */
  const scrollToSection = (id: string) => {
    setNavOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  /* ── Contact Form Submit ── */
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (contactForm._honey) return;
    if (!contactForm.name.trim() || !contactForm.message.trim()) return;

    setFormSubmitting(true);
    try {
      const endpoint = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email || "Not provided",
          message: contactForm.message,
          _subject: `New Portfolio Inquiry from ${contactForm.name}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      if (response.ok) {
        setFormSuccess(true);
      } else {
        throw new Error("Submit failed");
      }
    } catch {
      const subject = encodeURIComponent(`Portfolio Message from ${contactForm.name}`);
      const body = encodeURIComponent(
        `Hi Krish,\n\n${contactForm.message}\n\nFrom: ${contactForm.name}\nEmail: ${contactForm.email || "Not provided"}`
      );
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      setFormSuccess(true);
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <>
      {/* ── Global SVGs ── */}
      <svg width="0" height="0" style={{ position: "absolute", pointerEvents: "none" }}>
        <defs>
          <symbol id="logo" viewBox="0 0 48 48">
            <path
              fill="currentColor"
              d="M24 2c2.2 13.8 7.9 19.6 22 22-14.1 2.4-19.8 8.2-22 22-2.2-13.8-7.9-19.6-22-22 14.1-2.4 19.8-8.2 22-22Z"
            />
          </symbol>
          <symbol id="ar" viewBox="0 0 24 24">
            <path
              d="M5 12h14M13 6l6 6-6 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </symbol>
          <symbol id="ur" viewBox="0 0 24 24">
            <path
              d="M7 17 17 7M8 7h9v9"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </symbol>
          <symbol id="star" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.9l-5.8 3.05 1.1-6.46-4.69-4.58 6.49-.94L12 2.5z"
            />
          </symbol>
          <symbol id="globe" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" strokeWidth="1.4">
              <circle cx="12" cy="12" r="9.25" />
              <path d="M12 2.75c2.6 2.3 4 5.8 4 9.25s-1.4 6.95-4 9.25c-2.6-2.3-4-5.8-4-9.25s1.4-6.95 4-9.25zM2.75 12h18.5" />
            </g>
          </symbol>
          <symbol id="x" viewBox="0 0 24 24">
            <path
              d="M4 4l16 16M20 4 4 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </symbol>
          <symbol id="dot" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="12" cy="12" r="3.2" fill="currentColor" />
          </symbol>
          <symbol id="grid" viewBox="0 0 24 24">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </symbol>
        </defs>
      </svg>

      <a className="skip" href="#home">
        Skip to content
      </a>

      {/* ── Fullscreen Initial Loader ── */}
      {loaderVisible && (
        <div id="loader" className={loaderOut ? "out" : ""}>
          <div className="c">
            <div className="lg">
              <svg style={{ fontSize: "1.875rem", color: "var(--accl)" }}>
                <use href="#logo" />
              </svg>
              Krish Ukande
            </div>
            <p style={{ maxWidth: "24ch", fontSize: "0.875rem", color: "rgba(255,255,255,0.55)" }}>
              Bold ideas, shipped with quiet precision.
            </p>
          </div>
          <div className="pg">
            <div className="tr">
              <i style={{ width: `${loaderProgress}%` }} />
            </div>
            <div className="pr">
              <span>Loading Experience</span>
              <b>{String(loaderProgress).padStart(3, "0")}</b>
            </div>
          </div>
        </div>
      )}

      {/* ── Top Header ── */}
      <header>
        <div className="shell rv in" style={{ transform: "none", opacity: 1 }}>
          <button className="brand" onClick={() => scrollToSection("home")}>
            <svg>
              <use href="#logo" />
            </svg>
            Krish Ukande
          </button>
          <nav>
            <ul>
              <li>
                <button onClick={() => scrollToSection("home")}>Home</button>
              </li>
              <li>
                <button onClick={() => scrollToSection("about")}>About</button>
              </li>
              <li>
                <button onClick={() => scrollToSection("projects")}>Work</button>
              </li>
              <li>
                <button onClick={() => scrollToSection("skills")}>
                  Skills <small>▾</small>
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("education")}>Education</button>
              </li>
              <li>
                <button onClick={() => setModalOpen(true)}>Contact</button>
              </li>
            </ul>
          </nav>
          <div className="rt">
            <div className="chip">
              <em>Local time</em>
              <b>{timeStr || "9:41am"}</b>
              <span>•</span>
              <strong>{dateStr || "31 October, 2026"}</strong>
            </div>
            <button className="menu" onClick={() => setNavOpen(true)}>
              <svg style={{ fontSize: "0.875rem" }}>
                <use href="#grid" />
              </svg>
              <span className="t">Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main id="main">
        {/* ── Hero Section ── */}
        <section id="home">
          <div className="lq" ref={heroBoxRef}>
            <img id="base" src={PORTRAIT} alt="Krish Ukande" />
            <canvas ref={canvasRef} aria-hidden="true" />
          </div>
          <div className="vg" />
          <div className="wm rv in" aria-hidden="true">
            KRISH
          </div>

          <div className="shell hg">
            <div className="lc">
              <div className="eb rv in">Aspiring Full-Stack Developer • MERN &amp; ASP.NET Core</div>
              <h1 className="rv in">
                <span className="ln">
                  <span>Bold ideas,</span>
                </span>
                <span className="ln">
                  <span style={{ transitionDelay: "120ms" }}>shipped with</span>
                </span>
                <span className="ln">
                  <span style={{ transitionDelay: "240ms" }}>quiet precision.</span>
                </span>
              </h1>
              <div className="cta rv in" style={{ transitionDelay: "360ms" }}>
                <button className="pill dark ar" onClick={() => setModalOpen(true)}>
                  <span>
                    Let's Talk
                    <i>
                      <svg><use href="#ar" /></svg>
                    </i>
                  </span>
                </button>
                <button className="pill outline" onClick={() => scrollToSection("projects")}>
                  <span>View Work</span>
                </button>
              </div>
            </div>

            <div className="rc">
              {/* Interactive hero card carousel */}
              <div className="hc rv in">
                <div
                  className="row"
                  onClick={() => setActiveSlot((prev) => (prev + 1) % CAROUSEL_ITEMS.length)}
                >
                  <div className="tile">
                    <svg><use href="#logo" /></svg>
                  </div>
                  <div className="pn">
                    <div className="slot">
                      {CAROUSEL_ITEMS.map((item, idx) => (
                        <div key={item.category} className={idx === activeSlot ? "on" : "off"}>
                          <small>{item.category}</small>
                          <p>{item.desc}</p>
                        </div>
                      ))}
                    </div>
                    <div className="bt">
                      <div className="dots">
                        {CAROUSEL_ITEMS.map((_, idx) => (
                          <i key={idx} className={idx === activeSlot ? "on" : ""} />
                        ))}
                      </div>
                      <div className="arr">
                        <button
                          aria-label="Previous"
                          style={{ transform: "rotate(180deg)" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveSlot((prev) => (prev - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length);
                          }}
                        >
                          <svg><use href="#ar" /></svg>
                        </button>
                        <button
                          aria-label="Next"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveSlot((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
                          }}
                        >
                          <svg><use href="#ar" /></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tech Stack Partner list */}
              <div className="ptn rv in">
                <p>Primary Tech Stack</p>
                <ul>
                  {PARTNERS.map((tech) => (
                    <li key={tech}>
                      <svg><use href="#dot" /></svg>
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="sb rv in">
            <div className="shell">
              <span>B.Tech IT (2023–2027)</span>
              <span className="mid">Indore, Madhya Pradesh, India</span>
              <span style={{ display: "inline-flex", gap: "0.5rem" }}>
                Scroll to explore <span>↓</span>
              </span>
            </div>
          </div>
        </section>

        {/* ── About Section ── */}
        <section className="sec" id="about">
          <div className="shell about">
            <div className="gl">
              <svg><use href="#globe" /></svg>
              <div className="eb" style={{ position: "relative" }}>
                The Developer
              </div>
              <div className="ft rv in">
                <svg><use href="#globe" /></svg>
                <span>Passionate about building robust web applications and solving real-world problems.</span>
              </div>
            </div>

            <div className="stm">
              <h2 className="s rv in">
                I build full-stack web applications with the MERN stack and ASP.NET Core{" "}
                <span className="g">
                  — focusing on responsive interfaces, reliable APIs, clean database design, and secure authentication.
                </span>
              </h2>

              <div className="fr rv in">
                <div>
                  <p>Find me online</p>
                  <div className="so">
                    <a href="https://github.com/krish6587" target="_blank" rel="noopener noreferrer" title="GitHub">
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                    </a>
                    <a href="https://www.linkedin.com/in/krish-ukande/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a href={`mailto:${CONTACT_EMAIL}`} title="Email">
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m22 7-10 7L2 7" />
                      </svg>
                    </a>
                  </div>
                </div>

                <a className="pill outline ar" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <span>
                    Resume
                    <i>
                      <svg><use href="#ur" /></svg>
                    </i>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Visual Brand Pills Strip ── */}
        <section className="sec">
          <ul className="shell cb">
            <li className="rv in">
              <div style={{ background: "var(--surf)" }}>Code</div>
            </li>
            <li className="rv in" style={{ transitionDelay: "120ms" }}>
              <div style={{ background: "linear-gradient(to bottom right,#cf8047,#97501f)", color: "#fff" }}>
                Build
              </div>
            </li>
            <li className="rv in" style={{ transitionDelay: "240ms" }}>
              <div style={{ background: "var(--ink)", color: "#fff" }}>
                <svg><use href="#ar" /></svg>
              </div>
            </li>
            <li className="rv in" style={{ transitionDelay: "360ms" }}>
              <div style={{ background: "rgba(241,240,238,.6)", color: "rgba(17,17,17,.35)" }}>
                Ship
              </div>
            </li>
          </ul>
        </section>

        {/* ── Selected Work / Portfolio ── */}
        <section className="sec" id="projects">
          <div className="shell pf">
            <div className="eb bd rv in">Portfolio</div>
            <h2 className="h">
              <span className="ln">
                <span>Selected Work</span>
              </span>
            </h2>

            {/* Showcase Header Controls */}
            <div className="proj-showcase-header rv in">
              <div className="proj-tabs">
                {PROJECTS_DATA.map((p, idx) => (
                  <button
                    key={p.id}
                    className={`proj-tab ${idx === projectIndex ? "active" : ""}`}
                    onClick={() => goToProject(idx)}
                  >
                    <small>0{idx + 1}</small>
                    <span>{p.title.split("—")[0].trim()}</span>
                  </button>
                ))}
              </div>

              <div className="proj-controls">
                <span className="proj-scroll-hint">Scroll / Drag ↔</span>
                <div className="proj-counter">
                  <b>0{projectIndex + 1}</b> <span>/ 0{totalProjects}</span>
                </div>
                <div className="proj-arrows">
                  <button
                    className="proj-nav-btn"
                    onClick={prevProject}
                    aria-label="Previous Project"
                    style={{ transform: "rotate(180deg)" }}
                  >
                    <svg><use href="#ar" /></svg>
                  </button>
                  <button
                    className="proj-nav-btn"
                    onClick={nextProject}
                    aria-label="Next Project"
                  >
                    <svg><use href="#ar" /></svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Showcase Card */}
            <div
              ref={projectSliderRef}
              className={`cd-featured rv in ${isDragging ? "dragging" : ""}`}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
            >
              <div
                className="cd-featured-grid"
                style={{
                  opacity: projectTransition ? 0 : 1,
                  transform: projectTransition
                    ? `translateX(${slideDirection === "right" ? "-20px" : "20px"}) scale(0.99)`
                    : "none",
                  transition: "opacity 0.25s ease, transform 0.25s ease",
                }}
              >
                {/* Image Preview Container - Object Contain for 100% full view without cropping */}
                <a
                  href={currentProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cd-featured-preview group"
                  title={`Open ${currentProject.title} Live Demo`}
                >
                  <img
                    key={currentProject.id}
                    src={currentProject.image}
                    alt={currentProject.title}
                    loading="eager"
                  />
                </a>

                {/* Content */}
                <div className="cd-featured-content">
                  <div>
                    <div className="cd-featured-meta">
                      <span>{currentProject.stats[0] || "Featured Project"}</span>
                      <a
                        href={currentProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg"
                        title="View Live"
                      >
                        <svg><use href="#ur" /></svg>
                      </a>
                    </div>
                    <h3 style={{ marginTop: "1rem" }}>{currentProject.title}</h3>
                    <p style={{ marginTop: "0.75rem" }}>{currentProject.description}</p>
                  </div>

                  <div>
                    <div className="tg">
                      {(currentProject.tags || []).map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <div className="cd-actions">
                      <a
                        href={currentProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-live"
                      >
                        Live Demo ↗
                      </a>
                      <a
                        href={currentProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-code"
                      >
                        Source Code
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dots Pagination */}
            <div className="proj-dots">
              {PROJECTS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  className={`proj-dot ${idx === projectIndex ? "active" : ""}`}
                  onClick={() => goToProject(idx)}
                  aria-label={`Jump to project 0${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Skills & Services Section ── */}
        <section className="sec" id="skills">
          <div className="shell sv">
            <div className="eb rv in">Services &amp; Capabilities</div>
            <h2 className="h">
              <span className="ln">
                <span>What I do best</span>
              </span>
            </h2>

            <ul>
              {SERVICES.map((srv, idx) => (
                <li key={srv.num} className="rv in" style={{ transitionDelay: `${idx * 70}ms` }}>
                  <div className="sr2">
                    <span className="n">{srv.num}</span>
                    <h3>{srv.title}</h3>
                    <p>{srv.desc}</p>
                    <i>
                      <svg><use href="#ur" /></svg>
                    </i>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Education, Certifications & Achievements ── */}
        <section className="sec" id="education">
          <div className="shell edu-sec">
            <div className="eb bd rv in">Academic &amp; Professional Background</div>
            <h2 className="h">
              <span className="ln">
                <span>Education &amp; Credentials</span>
              </span>
            </h2>

            <div className="edu-grid">
              {/* Card 1: Education & Certifications */}
              <div className="edu-card rv in">
                <div className="edu-card-header">
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 600 }}>Education &amp; Certifications</h3>
                  <span className="edu-tag">Credentials</span>
                </div>
                <div className="edu-list">
                  <div className="edu-item">
                    <h4>Bachelor of Technology — Information Technology</h4>
                    <p>Indore Institute of Science and Technology (IIST), RGPV University • 2023 – 2027</p>
                  </div>
                  <div className="edu-item">
                    <h4>SQL &amp; Relational Databases 101</h4>
                    <p>IBM Skills Network — Relational database modeling, SQL queries &amp; schemas (June 2025)</p>
                  </div>
                  <div className="edu-item">
                    <h4>Data Analytics Job Simulation</h4>
                    <p>Deloitte via Forage — Practical data preparation, analytics &amp; client communication (Dec 2025)</p>
                  </div>
                  <div className="edu-item">
                    <h4>Agentic AI Starter Certification</h4>
                    <p>Hands-on understanding of agentic architectures, tool use &amp; modern AI systems (2025)</p>
                  </div>
                </div>
              </div>

              {/* Card 2: Achievements & Activities */}
              <div className="edu-card rv in" style={{ transitionDelay: "100ms" }}>
                <div className="edu-card-header">
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 600 }}>Achievements &amp; Activities</h3>
                  <span className="edu-tag" style={{ background: "var(--acc)" }}>Honors</span>
                </div>
                <div className="edu-list">
                  <div className="edu-item">
                    <h4>Winner, Volleyball — IIST Annual Sports</h4>
                    <p>Champion team representative in competitive inter-college volleyball tournament (2024–25)</p>
                  </div>
                  <div className="edu-item">
                    <h4>National Pickleball Tournament 2025</h4>
                    <p>Active competitive participant, Pickleball Federation of India</p>
                  </div>
                  <div className="edu-item">
                    <h4>Virtual Lab Workshop — IIT Delhi</h4>
                    <p>Conducted by IIT Delhi and organized by IIST Indore for practical computing lab simulations</p>
                  </div>
                  <div className="edu-item">
                    <h4>National Science Day 2026</h4>
                    <p>Active participant and project showcase at IIST Indore</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer / Contact CTA ── */}
      <footer id="contact">
        <div className="shell">
          <div className="fc">
            <h2>
              <span className="ln">
                <span>Have a project or opportunity in mind?</span>
              </span>
              <span className="ln">
                <span style={{ transitionDelay: "100ms" }}>Let's get to work.</span>
              </span>
            </h2>
            <button className="pill light ar up" onClick={() => setModalOpen(true)}>
              <span>
                Start a project
                <i>
                  <svg><use href="#ur" /></svg>
                </i>
              </span>
            </button>
          </div>

          <div className="cl">
            <div>
              <div className="lg">
                <svg><use href="#logo" /></svg>
                Krish Ukande
              </div>
              <p>
                Aspiring Full-Stack Developer specializing in MERN stack &amp; ASP.NET Core. Dedicated to shipping clean, reliable software with quiet precision.
              </p>
            </div>

            <div>
              <h4>Navigation</h4>
              <ul>
                <li><button className="al" onClick={() => scrollToSection("home")}>Home</button></li>
                <li><button className="al" onClick={() => scrollToSection("about")}>About</button></li>
                <li><button className="al" onClick={() => scrollToSection("projects")}>Projects</button></li>
                <li><button className="al" onClick={() => scrollToSection("skills")}>Skills</button></li>
                <li><button className="al" onClick={() => scrollToSection("education")}>Education</button></li>
              </ul>
            </div>

            <div>
              <h4>Specialties</h4>
              <ul>
                <li><span className="al">MERN Stack (React &amp; Node)</span></li>
                <li><span className="al">ASP.NET Core &amp; C#</span></li>
                <li><span className="al">FastAPI &amp; Python</span></li>
                <li><span className="al">MongoDB &amp; PostgreSQL</span></li>
                <li><span className="al">SignalR &amp; WebSockets</span></li>
              </ul>
            </div>

            <div>
              <h4>Connect</h4>
              <ul>
                <li><a className="al" href="https://github.com/krish6587" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a className="al" href="https://www.linkedin.com/in/krish-ukande/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a className="al" href={`mailto:${CONTACT_EMAIL}`}>Email</a></li>
                <li><a className="al" href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume (PDF)</a></li>
              </ul>
            </div>
          </div>

          <div className="lb">
            <span>© 2026 Krish Kumar Ukande. All rights reserved.</span>
            <div>
              <button className="al" onClick={() => setPrivacyOpen(true)}>Privacy Policy</button>
              <button className="al" onClick={() => setModalOpen(true)}>Direct Contact</button>
            </div>
          </div>
        </div>

        <div className="fw" aria-hidden="true">
          KRISH
        </div>
      </footer>

      {/* ── Fullscreen Navigation Modal ── */}
      <div id="nav" className={navOpen ? "open" : ""} role="dialog" aria-modal="true" aria-label="Menu">
        <div className="top">
          <div className="lg" style={{ fontSize: "1.125rem" }}>
            <svg className="l"><use href="#logo" /></svg>
            Krish Ukande
          </div>
          <button className="cls" onClick={() => setNavOpen(false)}>
            <svg style={{ fontSize: "0.875rem" }}><use href="#x" /></svg>
            Close
          </button>
        </div>

        <ul>
          {[
            { label: "Home", id: "home" },
            { label: "About", id: "about" },
            { label: "Selected Work", id: "projects" },
            { label: "Skills & Services", id: "skills" },
            { label: "Education & Awards", id: "education" },
            { label: "Contact", id: "contact" }
          ].map((item, idx) => (
            <li key={item.label}>
              <button
                style={{ ["--i" as any]: idx }}
                onClick={() => {
                  setNavOpen(false);
                  if (item.id === "contact") {
                    setModalOpen(true);
                  } else {
                    scrollToSection(item.id);
                  }
                }}
              >
                <small>0{idx + 1}</small>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="bot">
          <span>Local time — {timeStr}</span>
          <button
            onClick={() => {
              setNavOpen(false);
              setModalOpen(true);
            }}
          >
            Start a project →
          </button>
        </div>
      </div>

      {/* ── Contact Project Modal ── */}
      <div id="md" className={modalOpen ? "open" : ""} role="dialog" aria-modal="true">
        <div className={`pn2 ${formSuccess ? "done" : ""}`}>
          <button className="x" aria-label="Close" onClick={() => setModalOpen(false)}>
            <svg><use href="#x" /></svg>
          </button>

          <div className="hd">
            <div className="eb">Start a conversation</div>
            <h2>Tell me what you're building.</h2>
          </div>

          <form onSubmit={handleFormSubmit}>
            {/* Honeypot field */}
            <div style={{ display: "none" }} aria-hidden="true">
              <input
                type="text"
                name="_honey"
                value={contactForm._honey}
                onChange={(e) => setContactForm({ ...contactForm, _honey: e.target.value })}
              />
            </div>

            <label>
              Your Name *
              <input
                required
                placeholder="e.g. Alex Sharma"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
              />
            </label>

            <label>
              Your Email *
              <input
                type="email"
                required
                placeholder="you@company.com"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
              />
            </label>

            <label>
              Project or Opportunity *
              <textarea
                rows={4}
                required
                placeholder="A few words about your project, internship opportunity, or idea."
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
              />
            </label>

            <div className="fb">
              <p>I reply within one business day.</p>
              <button className="pill dark ar up" type="submit" disabled={formSubmitting}>
                <span>
                  {formSubmitting ? "Sending…" : "Send request"}
                  <i>
                    <svg><use href="#ur" /></svg>
                  </i>
                </span>
              </button>
            </div>
          </form>

          <div className="ok">
            <div className="bd">
              <svg><use href="#logo" /></svg>
            </div>
            <h2>Request received</h2>
            <p>Thanks for reaching out! I'll get back to you within one business day.</p>
            <button
              className="pill dark"
              onClick={() => {
                setModalOpen(false);
                setFormSuccess(false);
                setContactForm({ name: "", email: "", message: "", _honey: "" });
              }}
            >
              <span>Close</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Privacy Policy Modal ── */}
      <div id="md" className={privacyOpen ? "open" : ""} role="dialog" aria-modal="true">
        <div className="pn2">
          <button className="x" aria-label="Close" onClick={() => setPrivacyOpen(false)}>
            <svg><use href="#x" /></svg>
          </button>
          <div className="hd">
            <div className="eb">Privacy Policy</div>
            <h2>Your data is respected.</h2>
          </div>
          <div style={{ fontSize: "0.875rem", color: "rgba(17,17,17,0.7)", lineHeight: "1.6" }}>
            <p style={{ marginBottom: "1rem" }}>
              Any information submitted via the contact form (including your name and email address) is used solely to respond to your inquiry and communicate regarding potential opportunities or collaborations.
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              No personal data is sold, rented, or shared with third parties. All inquiries are securely delivered via FormSubmit to krishukande9@gmail.com.
            </p>
            <button className="pill dark" onClick={() => setPrivacyOpen(false)}>
              <span>Got it</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
