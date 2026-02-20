import React from "react";
import { howItWorksSteps, appStats } from "../../data/appData";
import StepCard from "./components/StepCard";
import ContainerDiv from "@/components/shared/ContainerDiv";
import SectionHeader from "@/components/shared/SectionHeader";
import BackgroundFx from "@/components/shared/BackgroundFx";
import { Button } from "@/components/ui/button";
import AnimatedArrow from "@/components/shared/AnimatedArrow";
import StatsGrid from "@/components/shared/StatsGrid";

const HowItWorks: React.FC = () => {
  return (
    <ContainerDiv className="py-10 sm:py-20">
      {/* Background FX - Light Theme */}
      <BackgroundFx />
      <div>
        <SectionHeader
          badge="The Escrow Protocol"
          badgeDot="bg-primary"
          topText="We hold money"
          bottomText="You stay safe"
          // gradientPrimary
          description="We removed blind trust from the equation. GameBazaar acts as a neutral third-party vault, ensuring no one gets paid until the buyer is happy."
          rollingOptions={{
            bottom: {
              gradient: "text",
            },
          }}
        />

        {/* The 3 Steps - Refactored using StepCard */}
        <div className="steps-grid relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16 md:mb-32">
          {howItWorksSteps.map((step, index) => (
            <StepCard
              key={index}
              number={step.number}
              title={step.title}
              description={step.description}
              icon={step.icon as any}
              isDark={step.isDark}
            />
          ))}
        </div>

        {/* Philosophy / Stats Section - Removed 'step-card' class to decouple animation */}
        <div className="stats-section glass_box p-10 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
            <div className="text-left">
              <div className="text-[10px] font-black uppercase text-primary tracking-widest mb-4">
                Why This Matters
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-black mb-6 leading-tight tracking-tight">
                Simplicity isn't just a design choice.
              </h2>
              <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">
                It's a security feature. Complex systems hide scams. Simple
                systems expose them.
                <br />
                <br />
                <span className="font-bold bg-slate-50 px-1 py-0.5 rounded">
                  If you don't understand it, you shouldn't use it.
                </span>
              </p>
              <Button size={"lg"} className="group">
                <span className="leading-none mt-px">Start Safe Trade</span>
                <AnimatedArrow
                  direction="right"
                  iconClassName="size-5 text-white"
                />
              </Button>
            </div>

            <StatsGrid stats={appStats} />
          </div>
        </div>
      </div>
    </ContainerDiv>
  );
};

export default HowItWorks;
