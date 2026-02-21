import React, { useLayoutEffect, useRef, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { blogPosts } from "@/data/mockData";

const BlogDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const post = useMemo(() => {
    return blogPosts.find((p) => p.id === Number(id));
  }, [id]);

  // Scroll Progress Logic
  useEffect(() => {
    const handleScroll = () => {
      if (!progressBarRef.current) return;
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      progressBarRef.current.style.width = `${progress}%`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    // Ensure we start at the top
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Entrance Animations
      const tl = gsap.timeline();

      tl.from(".detail-fade-up", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      })
        .from(
          ".detail-hero-image",
          {
            scale: 0.98,
            opacity: 0,
            duration: 1.5,
            ease: "expo.out",
            clearProps: "all",
          },
          "-=0.6",
        )
        .from(
          ".detail-content",
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.8",
        );

      // Parallax Effect on Hero Image
      gsap.to(".parallax-img", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-container",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [post]);

  // Mock Content Generator based on ID (to simulate different articles)
  const getContent = () => {
    const intro = `
        <p class="first-letter:text-7xl first-letter:font-black first-letter:text-slate-900 first-letter:mr-4 first-letter:float-left first-letter:leading-[0.8] mb-10 text-slate-600 text-xl md:text-2xl leading-relaxed font-sans">
            The gaming marketplace has evolved significantly over the last decade. What started as simple trades on forums has blossomed into a multi-million dollar economy driven by artificial scarcity, competitive ranking systems, and the undeniable allure of digital prestige.
        </p>
        <p class="mb-12 text-xl text-slate-600 leading-relaxed font-sans">
            In this deep dive, we explore the underlying mechanisms that drive value in virtual economies, analyzing data from over 50,000 transactions on GameBazaar to understand what makes a digital asset truly "valuable."
        </p>
      `;

    const body = `
        <h3 class="text-3xl md:text-4xl font-display font-bold text-slate-900 mt-16 mb-8 tracking-tight">The Psychology of Ownership</h3>
        <p class="mb-10 text-xl text-slate-600 leading-relaxed font-sans">
            Digital ownership is a peculiar concept. You cannot hold a Vandal skin in your hand, yet players are willing to pay upwards of $500 for accounts equipped with specific, limited-time collections. This behavior mimics the traditional art market, where provenance and rarity dictate price points far exceeding the material cost of the canvas.
        </p>
        
        <div class="my-16 pl-0 md:pl-10 relative">
            <div class="absolute left-0 top-0 bottom-0 w-1 bg-slate-900 hidden md:block"></div>
            <blockquote class="text-2xl md:text-4xl font-display font-bold italic text-slate-900 leading-tight">
                "We are witnessing a shift where digital status symbols are becoming as socially significant as luxury watches or designer handbags."
            </blockquote>
        </div>

        <p class="mb-10 text-xl text-slate-600 leading-relaxed font-sans">
            Our data indicates a strong correlation between an asset's "vintage" status and its resale value. Accounts holding skins from Season 1 battle passes, for instance, retain value significantly better than those with purchased store bundles that rotate back into availability.
        </p>

        <h3 class="text-3xl md:text-4xl font-display font-bold text-slate-900 mt-16 mb-8 tracking-tight">Security as a Value Multiplier</h3>
        <p class="mb-10 text-xl text-slate-600 leading-relaxed font-sans">
            It is impossible to discuss account trading without addressing the elephant in the room: security. The premium attached to "Verified" sellers on platforms like GameBazaar isn't just a fee for service; it's an insurance policy.
        </p>
        
        <figure class="my-16 w-full">
            <div class="relative rounded-3xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1400" class="w-full h-auto object-cover" alt="Data visualization" />
            </div>
            <figcaption class="mt-4 text-center text-sm font-bold text-slate-400 uppercase tracking-widest font-sans">Figure 1.2: Fraud attempts vs. Verified Status</figcaption>
        </figure>

        <p class="mb-10 text-xl text-slate-600 leading-relaxed font-sans">
            Buyers are increasingly sophisticated. They demand original email access, transaction history, and detailed recovery information. The market has shifted from a "wild west" environment to one that demands professional-grade compliance standards.
        </p>
        <p class="mb-10 text-xl text-slate-600 leading-relaxed font-sans">
            As we move forward, we expect this trend to consolidate. The casual trader is being pushed out by professional entities who can guarantee the security and longevity of the assets they sell.
        </p>
      `;

    return { __html: intro + body };
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-slate-900">
        <div className="text-center">
          <h2 className="text-3xl font-display font-black mb-4">
            Post Not Found
          </h2>
          <button
            onClick={() => navigate("/blog")}
            className="text-primary font-bold hover:underline"
          >
            Back to Journal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-white text-slate-900 font-sans selection:bg-primary/20 pb-32"
    >
      {/* Scroll Progress Bar - Minimal */}
      <div
        className="fixed top-0 left-0 h-1.5 bg-slate-900 z-50 transition-all duration-100 ease-out"
        ref={progressBarRef}
      ></div>

      {/* Floating Controls (Left Side) */}
      <div className="fixed top-1/2 -translate-y-1/2 left-8 z-40 hidden 2xl:flex flex-col gap-8 items-center">
        <button
          onClick={() => navigate("/blog")}
          className="w-14 h-14 rounded-full border border-slate-100 bg-white flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-all shadow-lg shadow-slate-200/50 group"
          title="Back to Journal"
        >
          <span className="icon text-xl group-hover:-translate-x-1 transition-transform">
            arrow_back
          </span>
        </button>

        <div className="flex flex-col gap-4">
          <button className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-slate-400 hover:text-[#1DA1F2] transition-colors shadow-none hover:shadow-xl hover:scale-110 duration-300">
            <span className="icon text-xl">share</span>
          </button>
          <button className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-slate-400 hover:text-emerald-500 transition-colors shadow-none hover:shadow-xl hover:scale-110 duration-300">
            <span className="icon text-xl">bookmark_border</span>
          </button>
        </div>
      </div>

      {/* Mobile Back Button */}
      <div className="fixed top-24 left-4 z-40 2xl:hidden">
        <button
          onClick={() => navigate("/blog")}
          className="w-10 h-10 rounded-full bg-white/90 backdrop-blur border border-slate-200 shadow-lg text-slate-900 flex items-center justify-center"
        >
          <span className="icon text-lg">arrow_back</span>
        </button>
      </div>

      {/* Hero Section */}
      <header className="hero-container relative pt-32 pb-16 md:pt-48 md:pb-24 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="max-w-5xl mx-auto text-center mb-16 md:mb-24">
            <div className="detail-fade-up flex items-center justify-center gap-4 mb-8 md:mb-10">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">
                {post.category}
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                {post.readTime}
              </span>
            </div>
            <h1 className="detail-fade-up text-5xl md:text-7xl lg:text-9xl font-display font-black text-slate-900 tracking-tighter leading-[0.95] mb-12">
              {post.title}
            </h1>

            <div className="detail-fade-up flex items-center justify-center gap-3">
              <span className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                By {post.author}
              </span>
              <span className="text-slate-300">/</span>
              <span className="text-sm font-medium text-slate-500">
                {post.date}
              </span>
            </div>
          </div>

          <div className="detail-hero-image relative w-full aspect-[4/3] md:aspect-[21/9] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200">
            <div className="absolute inset-0 bg-slate-100">
              <img
                src={post.image}
                alt={post.title}
                className="parallax-img w-full h-[120%] object-cover -mt-[10%]"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </header>

      {/* Content Body */}
      <article className="max-w-3xl lg:max-w-4xl mx-auto px-6 detail-content">
        {/* Render HTML content with wider prose - Switched to Sans for readability */}
        <div
          className="prose prose-xl prose-slate prose-headings:font-display prose-headings:font-black prose-p:font-sans prose-p:text-slate-600 prose-p:leading-relaxed prose-blockquote:not-italic prose-blockquote:font-display prose-strong:font-black prose-strong:text-slate-900"
          dangerouslySetInnerHTML={getContent()}
        />

        {/* Tags */}
        <div className="mt-24 pt-12 border-t border-slate-100 flex flex-wrap gap-3">
          {["Economy", "Trading", "Security", "Analysis"].map((tag) => (
            <span
              key={tag}
              className="px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
      </article>

      {/* Read Next Section */}
      <section className="mt-40 border-t border-slate-100 bg-[#F8FAFC] py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-end mb-16">
            <h3 className="text-5xl md:text-7xl font-display font-black text-slate-900 tracking-tighter">
              Read Next.
            </h3>
            <button
              onClick={() => navigate("/blog")}
              className="hidden md:flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors"
            >
              View All Stories
              <span className="icon text-lg">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Next Post 1 */}
            <div className="group cursor-pointer">
              <div className="aspect-[16/10] rounded-[2rem] overflow-hidden mb-8 relative">
                <img
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt="Next"
                />
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="px-2">
                <div className="text-[10px] font-black uppercase text-primary tracking-widest mb-4">
                  Security
                </div>
                <h4 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4 leading-tight group-hover:underline decoration-2 underline-offset-4 decoration-slate-200">
                  Inside Protocol V4: Preventing Fraud
                </h4>
                <p className="text-slate-500 text-lg font-sans leading-relaxed line-clamp-2">
                  How we use device fingerprinting to stop repeat offenders
                  before they strike.
                </p>
              </div>
            </div>

            {/* Next Post 2 */}
            <div className="group cursor-pointer">
              <div className="aspect-[16/10] rounded-[2rem] overflow-hidden mb-8 relative">
                <img
                  src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt="Next"
                />
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="px-2">
                <div className="text-[10px] font-black uppercase text-primary tracking-widest mb-4">
                  Market Update
                </div>
                <h4 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4 leading-tight group-hover:underline decoration-2 underline-offset-4 decoration-slate-200">
                  Valorant Act 5 Market Report
                </h4>
                <p className="text-slate-500 text-lg font-sans leading-relaxed line-clamp-2">
                  Analysis on how new agents affect high-ELO account pricing in
                  the current meta.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center md:hidden">
            <button
              onClick={() => navigate("/blog")}
              className="bg-white border border-slate-200 text-slate-900 px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest shadow-sm"
            >
              View All Stories
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetails;
