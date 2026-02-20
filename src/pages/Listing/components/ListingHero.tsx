import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface ListingHeroProps {
  title: string;
  galleryImages: string[];
}

const ListingHero: React.FC<ListingHeroProps> = ({ title, galleryImages }) => {
  return (
    <div className="anim-hero relative rounded-2xl overflow-hidden bg-slate-900 h-[400px] md:h-[480px] shadow-xl group">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={800}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        className="w-full h-full"
      >
        {galleryImages.map((img, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full h-full">
              <img
                src={img}
                alt={`${title} - View ${idx + 1}`}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Overlay Content (Static over slider) */}
      <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full z-10 pointer-events-none">
        <h1 className="text-4xl md:text-5xl font-display font-black text-white leading-tight mb-2 tracking-tight drop-shadow-lg">
          {title}
        </h1>
        <div className="flex items-center gap-4 text-xs font-mono font-medium text-slate-400 uppercase tracking-wider">
          <span>Origin: NA-EAST</span>
          <span className="w-1 h-1 rounded-full bg-slate-500"></span>
          <span>Created: OCT 2022</span>
        </div>
      </div>

      {/* Top Right Hud Element */}
      <div className="absolute top-6 right-6 z-10 pointer-events-none">
        <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center animate-spin-slow backdrop-blur-sm">
          <div className="w-12 h-12 rounded-full border border-white/20 border-t-white"></div>
        </div>
      </div>
    </div>
  );
};

export default ListingHero;
