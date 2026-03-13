import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ContainerDiv from "@/components/shared/ContainerDiv";
import Logo from "@/components/global/Logo";
import { ForgotPasswordLeftPanel } from "./components/ForgotPasswordLeftPanel";
import { ForgotPasswordForm } from "./components/ForgotPasswordForm";
import { type ForgotPasswordFormValues } from "@/validations";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const formContainerRef = useRef<HTMLDivElement>(null);

  // Animation
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
  }, []);

  const handleRecover = (values: ForgotPasswordFormValues) => {
    console.log("Recovery values:", values);
    // Simulate recovery link sent
    navigate("/login");
  };

  return (
    <div className="min-h-screen lg:h-screen flex items-center justify-center bg-slate-50 py-6 lg:py-0">
      <ContainerDiv className="w-full">
        {/* The Card */}
        <div className="forgot-password-card w-full bg-white rounded-3xl shadow-primary flex flex-col lg:flex-row overflow-hidden border border-slate-100 h-auto lg:h-[80vh] max-h-[650px] max-w-[1000px] mx-auto">
          {/* Left Panel */}
          <div className="hidden lg:flex w-full lg:w-[40%]">
            <ForgotPasswordLeftPanel />
          </div>

          {/* Right Panel - Form */}
          <div className="w-full lg:w-[60%] bg-white relative flex flex-col">
            <div className="p-6 lg:p-12 flex flex-col justify-center flex-1 overflow-y-auto no-scrollbar">
              <div
                ref={formContainerRef}
                className="forgot-password-content w-full max-w-md mx-auto"
              >
                {/* Mobile Logo */}
                <div className="flex justify-center mb-8 lg:hidden">
                  <Logo />
                </div>
                <ForgotPasswordForm onSubmit={handleRecover} />
              </div>
            </div>
          </div>
        </div>
      </ContainerDiv>
    </div>
  );
};

export default ForgotPassword;
