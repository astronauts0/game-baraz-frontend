import React, { useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import type { BlogPost } from "@/types";
import { blogPosts } from "@/data/mockData";


const Blog: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".blog-header-text", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2,
      });

      // Featured Post Animation
      gsap.from(".featured-post", {
        scale: 0.95,
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: "power2.out",
        delay: 0.6,
      });

      // Grid Items Animation
      gsap.utils.toArray(".article-card").forEach((card: any) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handlePostClick = (post: BlogPost) => {
    navigate(`/blog/${post.id}`);
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-primary/20 pt-32 pb-32"
    >
      {/* Subtle Grain/Noise Overlay (Simulated via CSS) */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Header Section */}
        <header className="mb-24 md:mb-32">
          <div className="flex flex-col md:flex-row justify-between items-end border-b border-slate-200 pb-8 md:pb-12">
            <div className="overflow-hidden">
              <h1 className="blog-header-text text-6xl md:text-9xl font-display font-black text-slate-900 tracking-tighter leading-[0.85] uppercase mb-4">
                The Bazaar
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500">
                  Journal
                </span>
                .
              </h1>
            </div>
            <div className="md:max-w-xs md:text-right mt-8 md:mt-0 overflow-hidden">
              <p className="blog-header-text text-sm font-medium text-slate-500 leading-relaxed">
                Intelligence from the digital underground. Market analysis,
                security protocols, and cultural deep dives.
              </p>
            </div>
          </div>

          {/* Categories / Filter - Minimal Pills */}
          <div className="flex flex-wrap gap-3 mt-8">
            {[
              "All Stories",
              "Market Analysis",
              "Security",
              "Game Updates",
              "Culture",
            ].map((cat, i) => (
              <button
                key={i}
                className={`px-5 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all hover:bg-slate-900 hover:text-white ${i === 0 ? "bg-slate-900 text-white border-slate-900" : "bg-transparent border-slate-200 text-slate-500"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        {/* Featured Article */}
        <section
          className="featured-post mb-24 md:mb-32 cursor-pointer group"
          onClick={() => handlePostClick(blogPosts[0])}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-12 items-center">
            <div className="lg:col-span-8 overflow-hidden rounded-[2rem] aspect-[16/9] lg:aspect-[16/10] relative">
              <img
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500"></div>

              {/* Floating Tag */}
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">
                  {blogPosts[0].category}
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 mt-8 lg:mt-0 pl-2 lg:pl-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Featured Story
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-black text-slate-900 leading-[1.05] tracking-tight mb-6 group-hover:text-primary transition-colors duration-300">
                {blogPosts[0].title}
              </h2>
              <p className="text-slate-500 font-serif text-lg leading-relaxed mb-8 line-clamp-3">
                {blogPosts[0].excerpt}
              </p>
              <div className="flex items-center justify-between border-t border-slate-200 pt-6">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase text-slate-900">
                    {blogPosts[0].author}
                  </span>
                  <span className="text-[10px] font-medium text-slate-400">
                    {blogPosts[0].date} • {blogPosts[0].readTime}
                  </span>
                </div>
                <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all duration-300">
                  <span className="icon text-lg group-hover:-rotate-45 transition-transform duration-300">
                    arrow_forward
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Grid - Masonry/Mixed Style */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 md:gap-y-24">
          {blogPosts.slice(1).map((post) => (
            <article
              key={post.id}
              className="article-card group cursor-pointer flex flex-col h-full"
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}
              onClick={() => handlePostClick(post)}
            >
              {/* Image Container */}
              <div className="overflow-hidden rounded-2xl aspect-[4/3] mb-8 relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Hover Overlay */}
                <div
                  className={`absolute inset-0 bg-slate-900/20 transition-opacity duration-500 ${hoveredPost === post.id ? "opacity-0" : "opacity-100"}`}
                ></div>
              </div>

              {/* Meta Data */}
              <div className="flex justify-between items-center mb-4 border-b border-slate-200 pb-4">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                  {post.category}
                </span>
                <span className="text-[10px] font-medium text-slate-400">
                  {post.date}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-display font-bold text-slate-900 leading-tight mb-4 group-hover:underline decoration-2 underline-offset-4 decoration-slate-200">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-slate-500 font-serif text-base leading-relaxed mb-6 line-clamp-3">
                {post.excerpt}
              </p>

              {/* Footer */}
              <div className="mt-auto flex items-center gap-2 text-[10px] font-bold text-slate-900 uppercase tracking-wide group-hover:text-primary transition-colors">
                Read Article
                <span className="icon text-sm transition-transform duration-300 group-hover:translate-x-1">
                  arrow_right_alt
                </span>
              </div>
            </article>
          ))}
        </section>

        {/* Newsletter / CTA Section - Redesigned (Dark & Sophisticated) */}
        <section className="mt-32 md:mt-48">
          <div className="bg-slate-900 rounded-[3rem] p-8 md:p-20 relative overflow-hidden group">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/30 transition-colors duration-1000"></div>
            <div
              className="absolute bottom-0 left-0 w-full h-full opacity-5 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.2) 1px, transparent 0)`,
                backgroundSize: "30px 30px",
              }}
            ></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div>
                <div className="inline-flex items-center gap-3 mb-8">
                  <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]"></span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
                    Live Intelligence Feed
                  </span>
                </div>
                <h2 className="text-5xl md:text-7xl font-display font-black text-white tracking-tighter mb-6 leading-[0.95]">
                  DON'T TRADE
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">
                    BLIND.
                  </span>
                </h2>
                <p className="text-slate-400 text-lg max-w-md leading-relaxed">
                  Get the unfair advantage. Weekly market analysis, price
                  predictions, and security alerts delivered straight to your
                  inbox.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10 hover:bg-white/10 transition-colors duration-300 shadow-2xl">
                <form
                  className="flex flex-col gap-6"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">
                      Email Coordinates
                    </label>
                    <input
                      type="email"
                      placeholder="agent@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-slate-600 font-bold focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all focus:bg-white/10"
                    />
                  </div>
                  <button className="w-full bg-white text-slate-900 py-5 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-lg shadow-white/5 flex items-center justify-center gap-3 group/btn">
                    Initialize Subscription
                    <span className="icon group-hover/btn:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </button>
                </form>
                <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  <span className="icon text-sm text-slate-600">lock</span>
                  Zero Spam Protocol
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Blog;
