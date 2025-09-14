"use client";
import { useEffect, useRef, useMemo } from "react";

export default function Especialidades() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-reveal]"));

    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      items.forEach((n) => n.classList.add('is-in'));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target as Element);
        }
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -10% 0px' });

    requestAnimationFrame(() => {
      const vh = window.innerHeight || 0;
      items.forEach((n) => {
        const r = n.getBoundingClientRect();
        if (r.top < vh * 0.95 && r.bottom > 0) {
          n.classList.add('is-in');
        } else {
          io.observe(n);
        }
      });
    });

    return () => io.disconnect();
  }, []);

  // Parallax effect on scroll
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = el.getBoundingClientRect();
        const delta = Math.max(-100, Math.min(100, r.top));
        el.style.setProperty('--parallax', `${delta}px`);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Hover glow: track pointer within each tile and set CSS vars
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const tiles = Array.from(root.querySelectorAll<HTMLElement>('.tile'));
    const onMove = (e: PointerEvent) => {
      const t = e.currentTarget as HTMLElement;
      const rect = t.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * 100;
      const my = ((e.clientY - rect.top) / rect.height) * 100;
      t.style.setProperty('--mx', mx + '%');
      t.style.setProperty('--my', my + '%');
    };
    tiles.forEach(t => {
      t.addEventListener('pointermove', onMove as any);
    });
    return () => {
      tiles.forEach(t => t.removeEventListener('pointermove', onMove as any));
    };
  }, []);

  // Data model inspired by the reference section
  type Level = "Forte" | "Bom";
  type Tile = { icon?: React.ReactNode; title: string; level: Level; chips: string[] };
  type Category = { id: string; title: string; meta: string; tiles: Tile[] };

  const categories: Category[] = useMemo(() => ([
    {
      id: "front",
      title: "Front-end  ",
      meta: "React, Next.js, Tailwind CSS",
      tiles: [
        { title: "React", level: "Forte", chips: ["Hooks", "SPA", "Styled Components", "Context API", "React Router", "React Query"] },
        { title: "Next.js", level: "Forte", chips: ["SSR", "SSG", "API Routes", "App Router", "Middleware", "Optimizações"] },
        { title: "Tailwind CSS", level: "Forte", chips: ["Utility-first", "Responsive Design", "Dark Mode", "Custom Components", "JIT Mode", "Plugins"] },
      ],
    },
    {
      id: "back",
      title: "Back-end  ",
      meta: "JavaScript, TypeScript, Node.js, Python, C#, Java",
      tiles: [
        { title: "JavaScript", level: "Forte", chips: ["ES6+", "DOM", "APIs", "Fetch", "Async/Await", "Vite"] },
        { title: "TypeScript", level: "Forte", chips: ["Type Safety", "ESNext", "Full-stack", "Generics", "Utility Types", "Zod"] },
        { title: "Node.js", level: "Forte", chips: ["Express", "API REST", "Prisma", "JWT", "Fastify", "WebSockets"] },
        { title: "Python", level: "Bom", chips: ["Django", "Flask", "Automação", "Scripts", "Bots", "Pandas"] },
        { title: "C#", level: "Bom", chips: [".NET Core", "ASP.NET", "Entity Framework", "LINQ", "Web API", "Blazor"] },
        { title: "Java", level: "Bom", chips: ["Spring Boot", "Maven", "JPA", "REST APIs", "Microservices", "JUnit"] },
      ],
    },
    {
      id: "db",
      title: "Banco de Dados  ",
      meta: "SQL, MongoDB",
      tiles: [
        { title: "SQL", level: "Forte", chips: ["MySQL", "PostgreSQL", "SQLite", "Migrations", "Joins", "Indexes"] },
        { title: "MongoDB", level: "Bom", chips: ["NoSQL", "Aggregation", "Atlas", "Mongoose", "Schemas", "Indexes"] },
      ],
    },
    {
      id: "devops",
      title: "DevOps  ",
      meta: "Docker, AWS, Vercel, Nginx",
      tiles: [
        { title: "Docker", level: "Bom", chips: ["Docker Compose", "Images", "Volumes", "Multi-stage", "CI/CD", "Networking"] },
        { title: "AWS", level: "Bom", chips: ["EC2", "S3", "RDS", "Lambda", "CloudFormation", "IAM"] },
        { title: "Vercel", level: "Forte", chips: ["Deployment", "Serverless", "Edge Functions", "Analytics", "Preview URLs", "Custom Domains"] },
        { title: "Nginx", level: "Bom", chips: ["Reverse Proxy", "Load Balancing", "SSL/TLS", "Caching", "Rate Limiting", "Configuration"] },
      ],
    },
    {
      id: "tools",
      title: "Ferramentas  ",
      meta: "Git & GitHub, VS Code, Postman, Figma",
      tiles: [
        { title: "Git & GitHub", level: "Forte", chips: ["Branching", "Pull request", "Actions", "Rebase", "Conventional Commits", "Issues/Projects"] },
        { title: "VS Code", level: "Forte", chips: ["Extensions", "Debugging", "IntelliSense", "Integrated Terminal", "Live Share", "Snippets"] },
        { title: "Postman", level: "Forte", chips: ["API Testing", "Collections", "Environments", "Automation", "Mock Servers", "Documentation"] },
        { title: "Figma", level: "Bom", chips: ["UI Design", "Prototyping", "Components", "Auto Layout", "Design Systems", "Collaboration"] },
      ],
    },
  ]), []);

  const meterPercent = (lvl: Level) => (lvl === "Forte" ? 90 : 70);

  // Dedicated lightweight SVG icons per technology
  const techIcon = (name: string) => {
    const n = name.toLowerCase();
    const common = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8 } as const;

    if (n.includes('react')) {
      return (
        <svg {...common} strokeWidth={1.5}>
          <circle cx="12" cy="12" r="2.2" fill="currentColor" />
          <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)" />
        </svg>
      );
    }

    if (n.includes('type') || n === 'ts' || n.includes('typescript')) {
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <rect x="2" y="3" width="20" height="18" rx="3" fill="#3178c6" />
          <path d="M9 15.5v-3.5h3v-1.5h-3v-2h4.5v-1.5h-6v8.5h1.5zm6.5 0c.8 0 1.4-.2 1.9-.6.5-.4.8-1 .8-1.7 0-.6-.2-1.1-.6-1.4-.4-.3-.9-.5-1.5-.6l-.8-.1c-.3-.1-.5-.2-.6-.3-.1-.1-.2-.3-.2-.5s.1-.4.2-.5c.2-.1.4-.2.7-.2.4 0 .7.1.9.3.2.2.3.5.3.8h1.4c0-.7-.3-1.3-.8-1.7-.5-.4-1.2-.6-2-.6-.8 0-1.4.2-1.9.6-.5.4-.7.9-.7 1.6 0 .6.2 1.1.6 1.4.4.3.9.5 1.5.6l.8.1c.3.1.5.2.6.3.1.1.2.3.2.5s-.1.4-.2.5c-.2.1-.4.2-.8.2-.5 0-.8-.1-1.1-.4-.3-.2-.4-.6-.4-1h-1.4c0 .8.3 1.4.8 1.8.5.4 1.2.6 2.1.6z" fill="white" />
        </svg>
      );
    }

    if (n.includes('next')) {
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <circle cx="12" cy="12" r="10" fill="black" />
          <path d="M8 8h8v8l-8-8z" fill="white" />
          <path d="M16 8v8" stroke="white" strokeWidth="1.5" />
        </svg>
      );
    }

    if (n.includes('java') && !n.includes('javascript')) {
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M8.5 18c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5-.7-1.5-1.5-1.5-1.5.7-1.5 1.5zm4.5 0c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5-.7-1.5-1.5-1.5-1.5.7-1.5 1.5zm-6-4c0-2.2 1.8-4 4-4h2c2.2 0 4 1.8 4 4v1h-10v-1zm2-6c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z" fill="#f89820" />
        </svg>
      );
    }

    if (n.includes('javascript')) {
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <rect x="2" y="2" width="20" height="20" rx="3" fill="#f7df1e" />
          <path d="M7.5 14.5c0 1.5 1 2.5 2.5 2.5 1.2 0 2-.6 2-1.5v-5h-1.5v5c0 .5-.3.8-.8.8-.6 0-.9-.4-.9-1l-1.3-.3zm6.5 2.5c1.5 0 2.5-.8 2.5-2 0-1.3-.8-1.7-2-2.2l-.5-.2c-.6-.3-.9-.5-.9-.9 0-.3.2-.6.6-.6.4 0 .6.2.8.6l1.2-.8c-.5-.8-1.2-1.2-2-.1.2-1.2.8-1.8 1.8-1.8 1.1 0 1.8.6 1.8 1.5 0 1.1-.6 1.6-1.6 2l-.5.2c-.7.3-1 .6-1 1 0 .4.3.7.8.7.5 0 .8-.2 1-.7l1.2.7c-.5 1-1.3 1.5-2.2 1.5z" fill="black" />
        </svg>
      );
    }

    if (n.includes('node')) {
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M12 2l8.5 5v10L12 22l-8.5-5V7L12 2z" fill="#68a063" />
          <path d="M12 2v20M3.5 7l17 10M20.5 7l-17 10" stroke="#333" strokeWidth="0.5" />
        </svg>
      );
    }

    if (n.includes('python')) {
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M12 2c-1.1 0-2 .4-2.7 1.1-.4.4-.6.9-.8 1.4-.1.3-.1.6-.1.9v1.1c0 .8.7 1.5 1.5 1.5h3.2c.8 0 1.5.7 1.5 1.5v.5c0 .8-.7 1.5-1.5 1.5h-3.2c-.8 0-1.5.7-1.5 1.5v1.1c0 .3 0 .6.1.9.2.5.4 1 .8 1.4.7.7 1.6 1.1 2.7 1.1s2-.4 2.7-1.1c.4-.4.6-.9.8-1.4.1-.3.1-.6.1-.9v-1.1c0-.8-.7-1.5-1.5-1.5h-3.2c-.8 0-1.5-.7-1.5-1.5v-.5c0-.8.7-1.5 1.5-1.5h3.2c.8 0 1.5-.7 1.5-1.5v-1.1c0-.3 0-.6-.1-.9-.2-.5-.4-1-.8-1.4-.7-.7-1.6-1.1-2.7-1.1z" fill="url(#python-gradient)" />
          <defs>
            <linearGradient id="python-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3776ab" />
              <stop offset="100%" stopColor="#ffd43b" />
            </linearGradient>
          </defs>
          <circle cx="9.5" cy="7.5" r="1" fill="white" />
          <circle cx="14.5" cy="16.5" r="1" fill="white" />
        </svg>
      );
    }

    if (n === 'sql' || n.includes('mysql') || n.includes('postgres') || n.includes('sqlite')) {
      return (
        <svg {...common}>
          <ellipse cx="12" cy="6" rx="8" ry="3" fill="#336791" />
          <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" stroke="#336791" strokeWidth="2" fill="none" />
          <path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" stroke="#336791" strokeWidth="2" fill="none" />
        </svg>
      );
    }

    if (n.includes('mongo')) {
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M12 2c2.5 2.5 4 5.5 3.2 9.2-.6 2.5-2 4.1-3.2 5.3-1-1.1-2.6-2.8-3.2-5.3C8 10.5 9.5 4.5 12 2z" fill="#4db33d" />
          <path d="M12 2v14.5" stroke="#4db33d" strokeWidth="1" />
          <ellipse cx="12" cy="18" rx="1" ry="2" fill="#4db33d" />
        </svg>
      );
    }

    if (n.includes('docker')) {
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <rect x="5" y="11" width="2.5" height="2.5" fill="#0db7ed" />
          <rect x="8" y="11" width="2.5" height="2.5" fill="#0db7ed" />
          <rect x="11" y="11" width="2.5" height="2.5" fill="#0db7ed" />
          <rect x="14" y="11" width="2.5" height="2.5" fill="#0db7ed" />
          <rect x="8" y="8" width="2.5" height="2.5" fill="#0db7ed" />
          <rect x="11" y="8" width="2.5" height="2.5" fill="#0db7ed" />
          <rect x="11" y="5" width="2.5" height="2.5" fill="#0db7ed" />
          <path d="M17 11h2c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-2c0-1.1.9-2 2-2h12z" fill="none" stroke="#0db7ed" strokeWidth="1.5" />
        </svg>
      );
    }

    if (n.includes('git') && n.includes('github')) {
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.51 2.87 8.33 6.85 9.68.5.09.68-.22.68-.49 0-.24-.01-.87-.01-1.7-2.78.61-3.37-1.36-3.37-1.36-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.09 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 7.3c.85 0 1.71.12 2.51.34 1.9-1.33 2.74-1.05 2.74-1.05.56 1.4.21 2.44.11 2.7.64.72 1.02 1.63 1.02 2.75 0 3.96-2.34 4.82-4.57 5.08.36.32.67.95.67 1.92 0 1.39-.01 2.5-.01 2.84 0 .27.18.59.69.49A10.02 10.02 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" fill="#333" />
        </svg>
      );
    }

    if (n.includes('git')) {
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M21.62 11.11l-8.73-8.73c-.78-.78-2.05-.78-2.83 0L8.37 4.07l2.62 2.62c.83-.3 1.78-.1 2.44.56.67.67.87 1.65.55 2.49l2.53 2.53c.84-.32 1.82-.12 2.49.55.93.93.93 2.44 0 3.37-.93.93-2.44.93-3.37 0-.78-.78-.97-1.92-.58-2.88L13.14 11.4v6.25c.23.11.44.26.62.44.93.93.93 2.44 0 3.37-.93.93-2.44.93-3.37 0-.93-.93-.93-2.44 0-3.37.23-.23.5-.4.8-.5V11.4c-.3-.1-.57-.27-.8-.5-.79-.79-.97-1.95-.56-2.91L7.26 5.42 2.38 10.3c-.78.78-.78 2.05 0 2.83l8.73 8.73c.78.78 2.05.78 2.83 0l8.68-8.68c.78-.78.78-2.05 0-2.83z" fill="#f05032" />
        </svg>
      );
    }

    if (n.includes('vue')) {
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M2 3h4l6 10 6-10h4L12 21 2 3z" fill="#4fc08d" />
          <path d="M6 3l6 10 6-10h-4L12 8 10 3H6z" fill="#35495e" />
        </svg>
      );
    }

    if (n.includes('tailwind')) {
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.12 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.61 7.15 14.47 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.12 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.61 13.15 9.47 12 7 12z" fill="#06b6d4" />
        </svg>
      );
    }

    if (n.includes('php')) {
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <ellipse cx="12" cy="12" rx="10" ry="6" fill="#777bb4" />
          <path d="M6 9h2c1.1 0 2 .4 2 1.5S9.1 12 8 12H7v2H6V9zm1 1v1.5h1c.3 0 .5-.2.5-.75S8.3 10 8 10H7zm4 3h1v2h1v-2h1c1.1 0 2-.4 2-1.5S15.1 9 14 9h-3v5zm1-4h1c.3 0 .5.2.5.75S13.3 11 13 11h-1v-1zm4-1h2c1.1 0 2 .4 2 1.5S18.1 12 17 12h-1v2h-1V9zm1 1v1.5h1c.3 0 .5-.2.5-.75S18.3 10 18 10h-1z" fill="white" />
        </svg>
      );
    }

    if (n.includes('c#') || n.includes('csharp')) {
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <rect x="2" y="2" width="20" height="20" rx="3" fill="#239120" />
          <path d="M8 7h2v2H8V7zm0 3h2v2H8v-2zm0 3h2v2H8v-2zm3-6h2v2h-2V7zm0 3h2v2h-2v-2zm0 3h2v2h-2v-2zm3-6h2v2h-2V7zm0 3h2v2h-2v-2zm0 3h2v2h-2v-2z" fill="white" />
          <path d="M6 6h1v1H6V6zm0 2h1v1H6V8zm0 2h1v1H6v-1zm0 2h1v1H6v-1zm0 2h1v1H6v-1z" fill="white" />
        </svg>
      );
    }

    if (n.includes('java') && !n.includes('javascript')) {
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M8.5 18c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5-.7-1.5-1.5-1.5-1.5.7-1.5 1.5zm4.5 0c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5-.7-1.5-1.5-1.5-1.5.7-1.5 1.5zm-6-4c0-2.2 1.8-4 4-4h2c2.2 0 4 1.8 4 4v1h-10v-1zm2-6c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z" fill="#f89820" />
          <path d="M12 4c-1.1 0-2 .9-2 2v2c0 .6.4 1 1 1s1-.4 1-1V6c0-.6.4-1 1-1s1 .4 1 1v2c0 .6.4 1 1 1s1-.4 1-1V6c0-1.1-.9-2-2-2z" fill="#ed8b00" />
        </svg>
      );
    }

    if (n.includes('aws')) {
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M6.5 14.5l-1.8 3.2c-.1.2-.3.3-.5.3-.2 0-.4-.1-.5-.3L1.9 14.5c-.1-.2-.1-.4 0-.6.1-.2.3-.3.5-.3h3.6c.2 0 .4.1.5.3.1.2.1.4 0 .6zm9.3-7.8c-.8-.8-1.9-1.2-3.1-1.2-1.2 0-2.3.4-3.1 1.2-.8.8-1.2 1.9-1.2 3.1s.4 2.3 1.2 3.1c.8.8 1.9 1.2 3.1 1.2 1.2 0 2.3-.4 3.1-1.2.8-.8 1.2-1.9 1.2-3.1s-.4-2.3-1.2-3.1zm5.3 7.8l-1.8 3.2c-.1.2-.3.3-.5.3-.2 0-.4-.1-.5-.3l-1.8-3.2c-.1-.2-.1-.4 0-.6.1-.2.3-.3.5-.3h3.6c.2 0 .4.1.5.3.1.2.1.4 0 .6z" fill="#ff9900" />
          <path d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="#232f3e" />
        </svg>
      );
    }

    if (n.includes('vercel')) {
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M12 2L22 20H2L12 2z" fill="#000" />
        </svg>
      );
    }

    if (n.includes('nginx')) {
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M12 2L2 7v10l10 5 10-5V7l-10-5z" fill="#009639" />
          <path d="M8 8v8l8-8v8" stroke="white" strokeWidth="2" fill="none" />
        </svg>
      );
    }

    if (n.includes('vs code') || n.includes('vscode')) {
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M17.5 2.5L9 11 4.5 7.5 2 9.5l2.5 2.5L2 14.5l2.5 2L9 13l8.5 8.5L22 19V5l-4.5-2.5zM17.5 6v12L11 12l6.5-6z" fill="#007acc" />
        </svg>
      );
    }

    if (n.includes('postman')) {
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <circle cx="12" cy="12" r="10" fill="#ff6c37" />
          <path d="M8 8l8 8M16 8l-8 8" stroke="white" strokeWidth="2" />
          <circle cx="12" cy="12" r="3" fill="white" />
        </svg>
      );
    }

    if (n.includes('figma')) {
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M8 2h4v4H8c-1.1 0-2-.9-2-2s.9-2 2-2z" fill="#f24e1e" />
          <path d="M12 2h4c1.1 0 2 .9 2 2s-.9 2-2 2h-4V2z" fill="#a259ff" />
          <path d="M8 6h4v4H8c-1.1 0-2-.9-2-2s.9-2 2-2z" fill="#1abcfe" />
          <path d="M8 10h4v4H8c-1.1 0-2-.9-2-2s.9-2 2-2z" fill="#0acf83" />
          <circle cx="16" cy="12" r="2" fill="#f24e1e" />
        </svg>
      );
    }

    // Fallback generic square
    return (
      <svg width={20} height={20} viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="2" /></svg>
    );
  };

  return (
    <section ref={sectionRef} className="skills-v2" id="especialidades">

      <div className="interface interface--full">
        <div className="skills-wrap">
          <div className="v2-flag" aria-hidden="true">
            <span className="flag-green" />
            <span className="flag-white" />
            <span className="flag-red" />
          </div>

          <h2 className="about-title especialidades-title" data-reveal style={{ ['--d' as any]: '80ms' }}>
            <span className="line">Minhas</span>
            <span className="line">Especialidades</span>
          </h2>

          <p className="skills-lead" data-reveal style={{ ['--d' as any]: '120ms' }}>
            Foco em entregar resultados com stack moderna, performance e boas práticas.
          </p>
          <div className="acc">
            {/* Stacks padrão em coluna única */}
            {categories.filter(c => c.id !== 'devops' && c.id !== 'tools').map((cat) => (
              <section key={cat.id} className="acc-item" data-reveal>
                <div className="acc-head" role="heading" aria-level={3}>
                  <div className="acc-titles">
                    <span className="acc-category">{cat.title}</span>
                    <span className="acc-meta">{cat.meta}</span>
                  </div>
                </div>
                <div id={`acc-${cat.id}`} className="acc-body is-open" role="region" aria-label={cat.title}>
                  <div className="tile-grid">
                    {cat.tiles.map((t) => (
                      <article className="tile" key={t.title}>
                        <header className="tile-head">
                          <div className="tile-icon" aria-hidden>
                            {techIcon(t.title)}
                          </div>
                          <div className="tile-titles">
                            <h4 className="tile-title">{t.title}</h4>
                          </div>
                          <span className={`tile-badge ${t.level === 'Forte' ? 'lvl-strong' : 'lvl-good'}`}>{t.level}</span>
                        </header>
                        <div className="tile-meter" aria-label={`Proficiência: ${t.level}`} role="img">
                          <span className="tile-meter-bar" style={{ width: meterPercent(t.level) + '%' }} />
                        </div>
                        <ul className="tile-chips" role="list">
                          {t.chips.map((c) => (<li key={c} className="chip" title={c}>{c}</li>))}
                        </ul>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            ))}

            {/* DevOps em linha separada */}
            {categories.filter(c => c.id === 'devops').map((cat) => (
              <section key={cat.id} className="acc-item" data-reveal>
                <div className="acc-head" role="heading" aria-level={3}>
                  <div className="acc-titles">
                    <span className="acc-category">{cat.title}</span>
                    <span className="acc-meta">{cat.meta}</span>
                  </div>
                </div>
                <div id={`acc-${cat.id}`} className="acc-body is-open" role="region" aria-label={cat.title}>
                  <div className="tile-grid">
                    {cat.tiles.map((t) => (
                      <article className="tile" key={t.title}>
                        <header className="tile-head">
                          <div className="tile-icon" aria-hidden>
                            {techIcon(t.title)}
                          </div>
                          <div className="tile-titles">
                            <h4 className="tile-title">{t.title}</h4>
                          </div>
                          <span className={`tile-badge ${t.level === 'Forte' ? 'lvl-strong' : 'lvl-good'}`}>{t.level}</span>
                        </header>
                        <div className="tile-meter" aria-label={`Proficiência: ${t.level}`} role="img">
                          <span className="tile-meter-bar" style={{ width: meterPercent(t.level) + '%' }} />
                        </div>
                        <ul className="tile-chips" role="list">
                          {t.chips.map((c) => (<li key={c} className="chip" title={c}>{c}</li>))}
                        </ul>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            ))}

            {/* Ferramentas em linha separada */}
            {categories.filter(c => c.id === 'tools').map((cat) => (
              <section key={cat.id} className="acc-item" data-reveal>
                <div className="acc-head" role="heading" aria-level={3}>
                  <div className="acc-titles">
                    <span className="acc-category">{cat.title}</span>
                    <span className="acc-meta">{cat.meta}</span>
                  </div>
                </div>
                <div id={`acc-${cat.id}`} className="acc-body is-open" role="region" aria-label={cat.title}>
                  <div className="tile-grid">
                    {cat.tiles.map((t) => (
                      <article className="tile" key={t.title}>
                        <header className="tile-head">
                          <div className="tile-icon" aria-hidden>
                            {techIcon(t.title)}
                          </div>
                          <div className="tile-titles">
                            <h4 className="tile-title">{t.title}</h4>
                          </div>
                          <span className={`tile-badge ${t.level === 'Forte' ? 'lvl-strong' : 'lvl-good'}`}>{t.level}</span>
                        </header>
                        <div className="tile-meter" aria-label={`Proficiência: ${t.level}`} role="img">
                          <span className="tile-meter-bar" style={{ width: meterPercent(t.level) + '%' }} />
                        </div>
                        <ul className="tile-chips" role="list">
                          {t.chips.map((c) => (<li key={c} className="chip" title={c}>{c}</li>))}
                        </ul>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
