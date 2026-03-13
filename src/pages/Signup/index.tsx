import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ContainerDiv from "@/components/shared/ContainerDiv";
import Logo from "@/components/global/Logo";
import { SignupLeftPanel } from "./components/SignupLeftPanel";
import { RoleSelection } from "./components/RoleSelection";
import { SignupForm } from "./components/SignupForm";
import { type SignupFormValues } from "@/validations";
import { useAuth } from "@/context/AuthContext";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const formContainerRef = useRef<HTMLDivElement>(null);
  const { register, registerMutation } = useAuth();

  // State
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<"buyer" | "seller">("buyer");

  // Animate between steps
  useGSAP(() => {
    if (!formContainerRef.current) return;

    gsap.fromTo(
      formContainerRef.current,
      { y: 10, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        clearProps: "all",
      },
    );
  }, [step]);

  const handleNextStep = () => {
    setStep(2);
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const handleSignup = (values: SignupFormValues) => {
    const { name, email, contact_number, password } = values;
    register(
      { name, email, contact_number, password },
      {
        onSuccess: () => navigate("/login"),
      },
    );
  };

  return (
    <div className="min-h-screen lg:h-screen flex items-center justify-center bg-slate-50 py-6 lg:py-0">
      <ContainerDiv className="w-full">
        {/* The Card - Fixed Height on Desktop */}
        <div className="signup-card w-full bg-white rounded-3xl shadow-primary flex flex-col lg:flex-row overflow-hidden border border-slate-100 h-auto lg:h-[95vh]">
          {/* Left Panel */}
          <div className="hidden lg:flex w-full lg:w-[40%]">
            <SignupLeftPanel />
          </div>

          {/* Right Panel - Dynamic Form */}
          <div className="w-full lg:w-[60%] bg-white relative flex flex-col">
            <div className="p-6 lg:p-10 flex flex-col justify-center flex-1 overflow-y-auto no-scrollbar">
              <div
                ref={formContainerRef}
                className="signup-content w-full max-w-2xl mx-auto"
              >
                {/* Mobile Logo */}
                <div className="flex justify-center mb-8 lg:hidden">
                  <Logo />
                </div>

                {step === 1 ? (
                  <RoleSelection
                    role={role}
                    setRole={setRole}
                    onNext={handleNextStep}
                  />
                ) : (
                  <SignupForm
                    role={role}
                    onPrev={handlePrevStep}
                    onSubmit={handleSignup}
                    isPending={registerMutation.isPending}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </ContainerDiv>
    </div>
  );
};

export default Signup;
