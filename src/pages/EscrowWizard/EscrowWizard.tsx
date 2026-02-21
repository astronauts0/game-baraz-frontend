import React, {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  useMemo,
} from "react";
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { mockListings } from "@/data/mockData";

interface EscrowFormData {
  title: string;
  amount: string;
  currency: "USDC" | "ETH" | "USD";
  description: string;
  role: "buyer" | "seller" | null;
  counterpartyEmail: string;
}

const EscrowWizard: React.FC = () => {
  const { listingId } = useParams<{ listingId: string }>();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // For final submission

  const listing = useMemo(() => {
    return mockListings.find((l) => l.id === Number(listingId));
  }, [listingId]);

  const [formData, setFormData] = useState<EscrowFormData>({
    title: listing ? listing.title : "",
    amount: listing ? listing.price.toString() : "",
    currency: "USDC", // Defaulting to USDC for now, could be dynamic
    description: listing ? `Secure purchase of ${listing.title}` : "",
    role: listing ? "buyer" : null,
    counterpartyEmail: "",
  });

  // Update form data if listing changes (e.g. direct navigation)
  useEffect(() => {
    if (listing) {
      setFormData((prev) => ({
        ...prev,
        title: listing.title,
        amount: listing.price.toString(),
        description: `Secure purchase of ${listing.title}`,
        role: "buyer",
      }));
    }
  }, [listing]);

  // GSAP Button Magnetic Effect
  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Only trigger if close
      if (Math.abs(x) < 50 && Math.abs(y) < 50) {
        gsap.to(btn, {
          x: x * 0.2,
          y: y * 0.2,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(btn, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // GSAP Step Transition
  useLayoutEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      // Initial Entrance
      if (step === 1 && !isAnimating) {
        gsap.from(containerRef.current, {
          scale: 0.95,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      }

      // Animate content when step changes
      gsap.fromTo(
        contentRef.current,
        {
          x: direction * 50,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power3.out",
          onComplete: () => setIsAnimating(false),
        },
      );

      // Progress Bar Animation
      gsap.to(".progress-line-fill", {
        width: `${((step - 1) / 2) * 100}%`,
        duration: 0.6,
        ease: "power2.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [step, direction]);

  const validateStep = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        return (
          formData.title.length > 2 &&
          Number(formData.amount) > 0 &&
          formData.description.length > 5
        );
      case 2:
        return (
          formData.role !== null &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.counterpartyEmail)
        );
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (isAnimating) return;

    if (!validateStep(step)) {
      // Error Shake Animation
      gsap.to(containerRef.current, {
        x: 10,
        duration: 0.08,
        yoyo: true,
        repeat: 5,
        ease: "linear",
      });
      return;
    }

    if (step < 3) {
      setIsAnimating(true);
      // Animate Out Current
      gsap.to(contentRef.current, {
        x: -50,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setDirection(1);
          setStep((s) => s + 1);
        },
      });
    } else {
      // Submit
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        // Navigate back to marketplace or show a success message (for now, back to listing or market)
        if (listingId) {
          navigate(`/marketplace/${listingId}`);
        } else {
          navigate("/marketplace");
        }
        // Ideally, we'd show a success modal or toast here before navigating
        alert("Escrow transaction created! (Simulation)");
      }, 2000);
    }
  };

  const handleBack = () => {
    if (step > 1 && !isAnimating) {
      setIsAnimating(true);
      gsap.to(contentRef.current, {
        x: 50,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setDirection(-1);
          setStep((s) => s - 1);
        },
      });
    }
  };

  const handleCancel = () => {
    if (listingId) {
      navigate(`/marketplace/${listingId}`);
    } else {
      navigate("/marketplace");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      {/* Main Card */}
      <div
        ref={containerRef}
        className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden relative min-h-[650px] flex flex-col"
      >
        {/* Header / Progress */}
        <div className="px-8 pt-8 pb-4">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-primary">
                <span className="icon">gavel</span>
              </div>
              <span className="font-display font-black text-lg text-slate-900 uppercase tracking-tight">
                New Escrow
              </span>
            </div>
            <button
              onClick={handleCancel}
              className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors"
            >
              <span className="icon">close</span>
            </button>
          </div>

          {/* Progress Indicators */}
          <div className="relative flex justify-between items-center px-4">
            {/* Background Line */}
            <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-slate-100 -z-10"></div>
            {/* Active Line */}
            <div className="absolute top-1/2 left-4 h-0.5 bg-primary -z-10 progress-line-fill w-0"></div>

            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className="flex flex-col items-center gap-2 bg-white px-2"
              >
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-500 ${step >= s ? "border-primary bg-primary text-white" : "border-slate-200 text-slate-300"}`}
                >
                  {s}
                </div>
                <span
                  className={`text-[10px] font-black uppercase tracking-widest transition-colors duration-500 ${step >= s ? "text-primary" : "text-slate-300"}`}
                >
                  {s === 1 ? "Terms" : s === 2 ? "Roles" : "Review"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Content */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-12 py-6 overflow-hidden">
          <div ref={contentRef} className="w-full">
            {/* STEP 1: TERMS */}
            {step === 1 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-display font-black text-slate-900 mb-2">
                    The Deal Details
                  </h2>
                  <p className="text-slate-500 font-medium text-sm">
                    What are we securing today?
                  </p>
                </div>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest pl-1">
                      Transaction Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="e.g. Valorant Account Lvl 300"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-base font-bold text-slate-900 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-300"
                      autoFocus
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 space-y-2">
                      <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest pl-1">
                        Amount
                      </label>
                      <div className="relative">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                          $
                        </span>
                        <input
                          type="number"
                          value={formData.amount}
                          onChange={(e) =>
                            setFormData({ ...formData, amount: e.target.value })
                          }
                          placeholder="0.00"
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 pl-10 py-4 text-base font-bold text-slate-900 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-300"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest pl-1">
                        Currency
                      </label>
                      <select
                        value={formData.currency}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            currency: e.target.value as any,
                          })
                        }
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-base font-bold text-slate-900 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all cursor-pointer"
                      >
                        <option value="USDC">USDC</option>
                        <option value="ETH">ETH</option>
                        <option value="USD">USD</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest pl-1">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder="Briefly describe the assets..."
                      rows={3}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-medium text-slate-900 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-300 resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: ROLES */}
            {step === 2 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-display font-black text-slate-900 mb-2">
                    Identify Yourself
                  </h2>
                  <p className="text-slate-500 font-medium text-sm">
                    Are you sending or receiving?
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setFormData({ ...formData, role: "buyer" })}
                    className={`relative p-6 rounded-[2rem] border-2 transition-all duration-300 group ${
                      formData.role === "buyer"
                        ? "border-primary bg-primary/5 shadow-xl shadow-primary/10 scale-[1.02]"
                        : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors ${formData.role === "buyer" ? "bg-primary text-white" : "bg-slate-100 text-slate-400"}`}
                    >
                      <span className="icon text-3xl">shopping_bag</span>
                    </div>
                    <div
                      className={`text-lg font-black ${formData.role === "buyer" ? "text-primary" : "text-slate-900"}`}
                    >
                      Buyer
                    </div>
                    <div className="text-xs font-medium text-slate-500 mt-1">
                      I am paying money
                    </div>
                    {formData.role === "buyer" && (
                      <span className="icon text-primary absolute top-4 right-4">
                        check_circle
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => setFormData({ ...formData, role: "seller" })}
                    className={`relative p-6 rounded-[2rem] border-2 transition-all duration-300 group ${
                      formData.role === "seller"
                        ? "border-primary bg-primary/5 shadow-xl shadow-primary/10 scale-[1.02]"
                        : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors ${formData.role === "seller" ? "bg-primary text-white" : "bg-slate-100 text-slate-400"}`}
                    >
                      <span className="icon text-3xl">storefront</span>
                    </div>
                    <div
                      className={`text-lg font-black ${formData.role === "seller" ? "text-primary" : "text-slate-900"}`}
                    >
                      Seller
                    </div>
                    <div className="text-xs font-medium text-slate-500 mt-1">
                      I am delivering goods
                    </div>
                    {formData.role === "seller" && (
                      <span className="icon text-primary absolute top-4 right-4">
                        check_circle
                      </span>
                    )}
                  </button>
                </div>

                <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2">
                  <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest pl-1">
                    Counterparty Email
                  </label>
                  <input
                    type="email"
                    value={formData.counterpartyEmail}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        counterpartyEmail: e.target.value,
                      })
                    }
                    placeholder="partner@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-base font-bold text-slate-900 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-300"
                  />
                  <p className="text-[10px] font-medium text-slate-400 pl-1">
                    We'll send them an invite to join this transaction.
                  </p>
                </div>
              </div>
            )}

            {/* STEP 3: REVIEW */}
            {step === 3 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-display font-black text-slate-900 mb-2">
                    Review Protocol
                  </h2>
                  <p className="text-slate-500 font-medium text-sm">
                    Verify details before contract generation.
                  </p>
                </div>

                {/* Digital Receipt Card */}
                <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-200 relative overflow-hidden">
                  {/* Top ZigZag Border Visual - simplified with css gradient */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_25%,rgba(255,255,255,0.5)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.5)_75%,rgba(255,255,255,0.5)_100%)] bg-[length:20px_20px] opacity-30"></div>

                  <div className="space-y-6">
                    <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                      <div>
                        <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
                          Total Value
                        </div>
                        <div className="text-3xl font-black text-slate-900">
                          {formData.currency}{" "}
                          {Number(formData.amount).toLocaleString()}
                        </div>
                      </div>
                      <div className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded text-[10px] font-black uppercase">
                        Secured
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
                          Your Role
                        </div>
                        <div className="text-sm font-bold text-slate-900 uppercase">
                          {formData.role}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
                          Counterparty
                        </div>
                        <div
                          className="text-sm font-bold text-slate-900 truncate"
                          title={formData.counterpartyEmail}
                        >
                          {formData.counterpartyEmail}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
                        Asset Description
                      </div>
                      <div className="text-sm font-medium text-slate-600 leading-relaxed bg-white p-3 rounded-xl border border-slate-100">
                        {formData.description}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer / Navigation */}
        <div className="p-8 border-t border-slate-100 bg-white">
          <div className="flex gap-4">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Back
              </button>
            )}

            <button
              ref={btnRef}
              onClick={handleNext}
              disabled={!validateStep(step) || isLoading}
              className={`flex-1 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 transition-all ${
                validateStep(step)
                  ? "bg-primary text-white hover:bg-indigo-600 shadow-primary/25 cursor-pointer"
                  : "bg-slate-100 text-slate-300 shadow-none cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <>
                  {step === 3 ? "Confirm & Secure Funds" : "Next Step"}
                  <span className="icon text-lg">
                    {step === 3 ? "lock" : "arrow_forward"}
                  </span>
                </>
              )}
            </button>
          </div>

          {step < 3 && !validateStep(step) && (
            <div className="text-center mt-3 animate-pulse">
              <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wide">
                {step === 1
                  ? "Please fill in all transaction details."
                  : "Please select a role and enter email."}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EscrowWizard;
