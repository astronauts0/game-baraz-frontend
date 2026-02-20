import React from "react";
import ContainerDiv from "../../components/shared/ContainerDiv";
import SectionHeader from "@/components/shared/SectionHeader";
import BackgroundFx from "@/components/shared/BackgroundFx";
import SectionCTA from "@/components/shared/SectionCTA";

const TermsConditions: React.FC = () => {
  return (
    <ContainerDiv className="py-20">
      <BackgroundFx from="from-red-500/15" />
      <div>
        <SectionHeader
          badge="Legal Protocol"
          badgeDot="bg-red-500"
          topText="Terms &"
          bottomText="Conditions"
          description="Rules of engagement. Read them carefully before you do something stupid and get banned into the shadow realm."
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
              src="https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1600"
              alt="Abstract Terms Art"
              className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-[20s] ease-linear"
            />
            <div className="absolute inset-0 bg-line-to-t from-slate-900/80 via-transparent to-transparent"></div>
            {/* Overlay Text */}
            <div className="absolute bottom-5 left-5 md:bottom-12 md:left-12">
              <div className="text-white/80 font-black text-2xl sm:text-6xl lg:text-9xl tracking-tighter leading-none select-none">
                DON'T CHEAT
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections - Clean, No Cards */}
        <div className="space-y-10 md:space-y-20">
          {/* 1. Introduction */}
          <div className="policy-section group">
            <div className="flex items-baseline gap-4 mb-4 border-b border-slate-200 pb-4">
              <span className="font-black text-primary uppercase tracking-widest">
                01
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-bold  tracking-tight group-hover:text-primary transition-colors">
                The Agreement
              </h2>
            </div>
            <div className="text-sm md:text-base text-slate-600 font-medium leading-loose">
              <p>
                Welcome to GameBazaar. By clicking "I Accept" or simply using
                our site, you agree not to be a jerk. If you do not agree, close
                this tab and go back to playing Roblox.
              </p>
              <p>
                We provide the platform, the escrow, and the security. We are
                not the developer of the games. If you buy an account and suck
                at the game, we cannot issue a refund for "skill issue".
              </p>
            </div>
          </div>

          {/* 2. Account Integrity */}
          <div className="policy-section group">
            <div className="flex items-baseline gap-4 mb-4 border-b border-slate-200 pb-4">
              <span className="font-black text-primary uppercase tracking-widest">
                02
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-bold  tracking-tight group-hover:text-primary transition-colors">
                Don't Be A Bot
              </h2>
            </div>
            <div className="text-sm md:text-base text-slate-600 font-medium leading-loose">
              <p>
                You must be at least 18 years old. If you are 12 and using your
                mom's credit card, she is going to be very mad when she sees the
                statement.
              </p>
              <p>
                <strong>One account per human.</strong> We don't like smurfs on
                our platform. If we catch you making multiple accounts to
                manipulate prices or reviews, we will yeet you off the server
                faster than a speed hacker.
              </p>
            </div>
          </div>

          {/* 3. Trading Protocol */}
          <div className="policy-section group">
            <div className="flex items-baseline gap-4 mb-4 border-b border-slate-200 pb-4">
              <span className="font-black text-primary uppercase tracking-widest">
                03
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-bold  tracking-tight group-hover:text-primary transition-colors">
                The Golden Rule
              </h2>
            </div>
            <div className="text-sm md:text-base text-slate-600 font-medium leading-loose">
              <p>
                <strong>USE. THE. ESCROW.</strong>
              </p>
              <p>
                If a seller messages you saying "Hey bro, pay me on Discord via
                PayPal Friends & Family for a discount," they are scamming you.
                If you fall for it, we will feel bad for you, but we can't help
                you. Keep all chats and payments on GameBazaar. It's for your
                own good.
              </p>
            </div>
          </div>

          {/* 4. Prohibited Conduct */}
          <div className="policy-section group">
            <div className="flex items-baseline gap-4 mb-4 border-b border-slate-200 pb-4">
              <span className="font-black text-primary uppercase tracking-widest">
                04
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-bold  tracking-tight group-hover:text-primary transition-colors">
                Zero Tolerance
              </h2>
            </div>
            <div className="text-sm md:text-base text-slate-600 font-medium leading-loose">
              <p>
                We have a very particular set of skills. If you try to scam,
                recall an account, or chargeback a payment, we will find you,
                and we will ban you.
              </p>
              <p>
                We also share your information with a global blacklist of other
                marketplaces. So if you get banned here, you're basically banned
                everywhere. Don't test us.
              </p>
            </div>
          </div>

          {/* 5. Liability */}
          <div className="policy-section group">
            <div className="flex items-baseline gap-4 mb-4 border-b border-slate-200 pb-4">
              <span className="font-black text-primary uppercase tracking-widest">
                05
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-bold  tracking-tight group-hover:text-primary transition-colors">
                Liability (The Boring Part)
              </h2>
            </div>
            <div className="text-sm md:text-base text-slate-600 font-medium leading-loose">
              <p>
                Buying accounts is technically against the TOS of most game
                publishers (Riot, Valve, Epic, etc.). We provide a safe
                marketplace to trade, but we don't own the games.
              </p>
              <p>
                If Riot Games decides to ban the account 6 months later because
                you logged in from a different continent in 5 seconds, that is a
                "you" problem. We guarantee the account works when you get it.
                We can't guarantee you won't get caught later.
              </p>
            </div>
          </div>

          {/* Contact Footer in Text */}
          <SectionCTA
            title="Have a lawyer who wants to argue?"
            description="Send them our way. We love legal battles."
            buttonText="legal@gamebazaar.gg"
            href="mailto:legal@gamebazaar.gg"
          />
        </div>
      </div>
    </ContainerDiv>
  );
};

export default TermsConditions;
