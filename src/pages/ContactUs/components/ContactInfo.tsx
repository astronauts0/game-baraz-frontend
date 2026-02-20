import React from "react";
import { Mail, MapPin, Clock } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import SocialSupportCard from "./SocialSupportCard";
import RotateBox from "@/components/shared/RotateBox";

const ContactInfo: React.FC = () => {
  return (
    <div className="lg:col-span-5 space-y-16 anim-content">
      <div>
        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
          <span className="w-8 h-px bg-slate-200"></span>
          Direct Channel
        </h3>
        <a
          href="mailto:hello@gamebazaar.gg"
          className="group flex items-center gap-4 max-w-full"
        >
          <RotateBox>
            <Mail className="w-6 h-6 text-primary" />
          </RotateBox>
          <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-black text-slate-900 group-hover:text-primary transition-colors break-all">
            hello@gamebazaar.gg
          </span>
        </a>
      </div>

      <div className="flex justify-between">
        <div>
          <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
            <span className="w-8 h-px bg-slate-200"></span>
            HQ Location
          </h3>
          <div className="flex gap-4">
            <MapPin className="w-5 h-5 text-slate-400 shrink-0 mt-1" />
            <p className="text-base font-bold text-slate-700 leading-relaxed">
              1209 North Orange St
              <br />
              Wilmington, DE 19801
              <br />
              United States
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
            <span className="w-8 h-px bg-slate-200"></span>
            Operating Hours
          </h3>
          <div className="flex gap-4">
            <Clock className="w-5 h-5 text-slate-400 shrink-0 mt-1" />
            <p className="text-base font-bold text-slate-700 leading-relaxed">
              Mon - Fri: 24h
              <br />
              Sat - Sun: 10am - 10pm
              <br />
              (EST Timezone)
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
          <span className="w-8 h-px bg-slate-200"></span>
          Secure Channels
        </h3>
        <div className="space-y-4">
          <SocialSupportCard
            href="#"
            icon={FaDiscord}
            title="Discord Community"
            subtitle="Join 50k+ Members"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
