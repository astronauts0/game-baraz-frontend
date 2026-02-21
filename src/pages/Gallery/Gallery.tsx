import React, { useLayoutEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";

// Types
interface ShowcaseItem {
  id: number;
  title: string;
  category: string;
  image: string;
  size: "standard" | "tall" | "wide" | "large"; // Controls Grid Span
}

// Mock Data
const showcaseData: ShowcaseItem[] = [
  {
    id: 1,
    title: "Protocol: Obsidian",
    category: "Secure",
    image:
      "https://images.unsplash.com/photo-1614064641938-3e858a915f32?auto=format&fit=crop&q=80&w=2000",
    size: "large",
  },
  {
    id: 2,
    title: "Neon Drifter",
    category: "Design",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000",
    size: "tall",
  },
  {
    id: 3,
    title: "Vault UI Kit",
    category: "Tech",
    image:
      "https://images.unsplash.com/photo-1642104704074-907c0698b98d?auto=format&fit=crop&q=80&w=1200",
    size: "standard",
  },
  {
    id: 4,
    title: "Cyber-Security Report",
    category: "Secure",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200",
    size: "wide",
  },
  {
    id: 5,
    title: "Abstract Data",
    category: "Design",
    image:
      "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=1000",
    size: "standard",
  },
  {
    id: 6,
    title: "Zero Trust Architecture",
    category: "Tech",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200",
    size: "standard",
  },
  {
    id: 7,
    title: "Network Analysis",
    category: "Secure",
    image:
      "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&q=80&w=1000",
    size: "tall",
  },
  {
    id: 8,
    title: "Future Interfaces",
    category: "Design",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2000",
    size: "wide",
  },
];

const Gallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);

  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Use simple React filtering.
  // For the grid animation, we will rely on GSAP re-triggering via a key on the container.
  const filteredItems = useMemo(() => {
    return activeCategory === "All"
      ? showcaseData
      : showcaseData.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    // Initial Scroll
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // --- Header Animation ---
      gsap.from(".gallery-header", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.2,
      });

      // --- Grid Staggered Entrance (Re-triggers when filteredItems changes) ---
      gsap.fromTo(
        ".gallery-item",
        {
          y: 100,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power3.out",
        },
      );

      // --- Parallax Effect on Images (Scroll) ---
      gsap.utils
        .toArray(".parallax-img-container")
        .forEach((container: any) => {
          const img = container.querySelector("img");
          gsap.fromTo(
            img,
            { yPercent: -15 },
            {
              yPercent: 15,
              ease: "none",
              scrollTrigger: {
                trigger: container,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        });

      // --- Mouse Movement Parallax ---
      const handleMouseMove = (e: MouseEvent) => {
        const xPos = e.clientX / window.innerWidth - 0.5; // -0.5 to 0.5
        const yPos = e.clientY / window.innerHeight - 0.5; // -0.5 to 0.5

        gsap.utils.toArray(".gallery-img").forEach((img: any, i: number) => {
          // Different movement factors for variance
          const intensity = 20 + (i % 3) * 10; // 20, 30, 40px movement

          gsap.to(img, {
            x: xPos * intensity,
            y: yPos * intensity, // Pixel offset (works with yPercent)
            rotation: xPos * 2, // Slight tilt
            duration: 1.5,
            ease: "power2.out",
            overwrite: "auto",
          });
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      // --- Custom Cursor Logic ---
      const xTo = gsap.quickTo(cursorRef.current, "x", {
        duration: 0.4,
        ease: "power3",
      });
      const yTo = gsap.quickTo(cursorRef.current, "y", {
        duration: 0.4,
        ease: "power3",
      });

      const moveCursor = (e: MouseEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };

      window.addEventListener("mousemove", moveCursor);

      // Cleanup
      return () => {
        window.removeEventListener("mousemove", moveCursor);
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, containerRef);

    return () => ctx.revert();
  }, [filteredItems]); // Re-run GSAP when items change to animate them in

  // --- Interaction Handlers ---
  const handleMouseEnter = (title: string) => {
    if (cursorRef.current && cursorTextRef.current) {
      cursorTextRef.current.innerText = title;
      gsap.to(cursorRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  // Helper for grid classes
  const getGridClass = (size: string) => {
    switch (size) {
      case "large":
        return "md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto";
      case "wide":
        return "md:col-span-2 md:row-span-1 aspect-[16/9] md:aspect-auto";
      case "tall":
        return "md:col-span-1 md:row-span-2 aspect-[3/4] md:aspect-auto";
      default:
        return "md:col-span-1 md:row-span-1 aspect-square";
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#F8FAFC] pb-32 pt-32 md:pt-48 relative overflow-hidden"
    >
      {/* Custom Follower Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-auto h-12 px-6 bg-slate-900 text-white rounded-full flex items-center justify-center pointer-events-none z-[100] opacity-0 scale-0 -translate-x-1/2 -translate-y-1/2 shadow-xl whitespace-nowrap"
      >
        <span
          ref={cursorTextRef}
          className="text-xs font-black uppercase tracking-widest"
        >
          View Project
        </span>
      </div>

      {/* Decorative Background */}
      <div
        className="fixed top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(#0F172A 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 relative z-10">
        {/* Header & Filter */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 md:mb-32 gap-10">
          <div className="gallery-header">
            <h1 className="text-6xl md:text-9xl font-display font-black text-slate-900 tracking-tighter leading-[0.8]">
              OUR
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-400">
                WORK
              </span>
              .
            </h1>
          </div>

          <div className="gallery-header flex flex-wrap gap-2">
            {["All", "Secure", "Tech", "Design"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-500 border ${
                  activeCategory === cat
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-transparent text-slate-400 border-slate-200 hover:border-slate-400 hover:text-slate-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        {/* Using key={activeCategory} forces a full re-render of the grid logic, helpful for clean animation restarts */}
        <div
          key={activeCategory}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 auto-rows-[300px] md:auto-rows-[300px]"
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`gallery-item relative group overflow-hidden rounded-3xl ${getGridClass(item.size)} cursor-none`} // cursor-none because we have custom cursor
              onMouseEnter={() => handleMouseEnter(item.title)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Parallax Container */}
              <div className="parallax-img-container w-full h-full relative overflow-hidden bg-slate-200">
                <img
                  src={item.image}
                  alt={item.title}
                  className="gallery-img w-full h-[130%] object-cover absolute top-[-15%] left-0 transition-all duration-700 ease-out grayscale group-hover:grayscale-0 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
              </div>

              {/* Text (Visible on Mobile, Hidden on Desktop as cursor handles it, or keep minimal) */}
              <div className="absolute bottom-6 left-6 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[9px] font-black uppercase tracking-widest text-slate-900 mb-2">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="h-[400px] flex items-center justify-center text-slate-400 font-bold text-sm uppercase tracking-widest">
            No projects found in this sector.
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
