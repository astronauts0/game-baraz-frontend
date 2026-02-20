import React from "react";
import ContainerDiv from "@/components/shared/ContainerDiv";
import SectionHeader from "@/components/shared/SectionHeader";
import BackgroundFx from "@/components/shared/BackgroundFx";
import SectionCTA from "@/components/shared/SectionCTA";

const PrivacyPolicy: React.FC = () => {
  return (
    <ContainerDiv className="py-20">
      <BackgroundFx />

      <SectionHeader
        badge="Data Protocol"
        badgeDot="bg-primary"
        topText="Privacy"
        bottomText="Policy"
        description="We treat your data better than your teammates treat you in solo queue. Here is exactly what we steal (hint: nothing)."
        rollingOptions={{
          bottom: {
            gradient: "word",
          },
        }}
      />

      {/* Hero Image */}
      <div className="anim-image my-10 md:my-20 relative">
        <div className="aspect-16/8 md:aspect-21/8 bg-slate-900 rounded-2xl overflow-hidden relative shadow-2xl shadow-slate-900/10 border border-slate-200/50">
          <img
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600"
            alt="Abstract Privacy Art"
            className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-[20s] ease-linear"
          />
          <div className="absolute inset-0 bg-line-to-t from-slate-900/80 via-transparent to-transparent"></div>
          {/* Overlay Text */}
          <div className="absolute bottom-5 left-5 md:bottom-12 md:left-12">
            <div className="text-white/80 font-black text-2xl sm:text-6xl lg:text-9xl tracking-tighter leading-none select-none">
              NO SPIES
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections - Clean, No Cards */}
      <div className="space-y-10 md:space-y-20">
        {/* 1. Collection */}
        <div className="policy-section group">
          <div className="flex items-baseline gap-4 mb-4 border-b border-slate-200 pb-4">
            <span className="font-black text-primary uppercase tracking-widest">
              01
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold  tracking-tight group-hover:text-primary transition-colors">
              What we actually collect
            </h2>
          </div>
          <div className="text-sm md:text-base text-slate-600 font-medium leading-loose">
            <p>
              To run this marketplace, we need the basics. We collect your{" "}
              <strong>Email Address</strong> (so we can send you your loot) and
              your <strong>Username</strong> (so we don't have to call you
              "Player 1").
            </p>
            <p>
              We{" "}
              <span className=" font-black decoration-red-500 underline decoration-4 underline-offset-4">
                DO NOT
              </span>{" "}
              collect your browsing history, your mother's maiden name, or your
              questionable late-night search queries. That stuff is between you
              and your ISP.
            </p>
          </div>
        </div>

        {/* 2. Security */}
        <div className="policy-section group">
          <div className="flex items-baseline gap-4 mb-4 border-b border-slate-200 pb-4">
            <span className="font-black text-primary uppercase tracking-widest">
              02
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold  tracking-tight group-hover:text-primary transition-colors">
              Our Servers = Fort Knox
            </h2>
          </div>
          <div className="text-sm md:text-base text-slate-600 font-medium leading-loose">
            <p>
              Our database is locked behind more walls than a max-level Clash of
              Clans base. We use <strong>AES-256 encryption</strong>. Your
              passwords are salted, hashed, and thrown into a digital vault that
              even we can't read.
            </p>
            <p>
              If a hacker wants to steal your data, they better bring a level 99
              wizard and a lot of mana potions, because we aren't making it
              easy.
            </p>
          </div>
        </div>

        {/* 3. Cookies */}
        <div className="policy-section group">
          <div className="flex items-baseline gap-4 mb-4 border-b border-slate-200 pb-4">
            <span className="font-black text-primary uppercase tracking-widest">
              03
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold  tracking-tight group-hover:text-primary transition-colors">
              The Cookie Situation
            </h2>
          </div>
          <div className="text-sm md:text-base text-slate-600 font-medium leading-loose">
            <p>
              Yes, we use cookies. Not the delicious chocolate chip kind, sadly.
              These are boring digital crumbs that keep you logged in.
            </p>
            <p>
              Without them, the site would have the memory of a goldfish, and
              you'd have to login every time you clicked a button. You can block
              them in your browser, but don't come crying to us when the "Buy
              Now" button stops working.
            </p>
          </div>
        </div>

        {/* 4. Sharing */}
        <div className="policy-section group">
          <div className="flex items-baseline gap-4 mb-4 border-b border-slate-200 pb-4">
            <span className="font-black text-primary uppercase tracking-widest">
              04
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold  tracking-tight group-hover:text-primary transition-colors">
              Selling Data is Cringe
            </h2>
          </div>
          <div className="text-sm md:text-base text-slate-600 font-medium leading-loose">
            <p>
              We don't sell your data to advertisers. We're not Zuckerberg.
              That's creepy and rude.
            </p>
            <p>
              The only people who see your data are our payment processors
              (Stripe/Crypto Nodes) because they actually need to move the money
              from point A to point B. We do not share your info with game
              publishers, your ex, or the government (unless they have a really
              scary warrant).
            </p>
          </div>
        </div>

        {/* CTA */}
        <SectionCTA
          title="Still Paranoid?"
          description="Shoot us an email. We're transparent AF."
          buttonText="[EMAIL_ADDRESS]"
          href="mailto:[EMAIL_ADDRESS]"
        />
      </div>
    </ContainerDiv>
  );
};

export default PrivacyPolicy;
