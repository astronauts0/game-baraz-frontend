import React, { useState, useRef, useLayoutEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { mockListings } from "../data/mockData";

type TransactionStage = "CONTRACT" | "PAYMENT" | "VERIFYING" | "SECURED";

const EscrowProcess: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const listing = useMemo(
    () => mockListings.find((l) => l.id === Number(id)),
    [id],
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<TransactionStage>("CONTRACT");
  const [paymentMethod, setPaymentMethod] = useState<"USDC" | "CARD" | null>(
    null,
  );
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Chat State
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: "SYSTEM", text: "Secure channel established.", time: "Just now" },
    {
      sender: "SYSTEM",
      text: `Asset handover protocol initiated. Please wait for seller upload.`,
      time: "Just now",
    },
  ]);

  // Animation on Stage Change
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate the container height or content fade
      gsap.fromTo(
        ".stage-content",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          clearProps: "all",
        },
      );
    }, containerRef);
    return () => ctx.revert();
  }, [stage]);

  const handleConfirmPayment = () => {
    setStage("VERIFYING");
    setTimeout(() => {
      setStage("SECURED");
    }, 4000);
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    setChatHistory((prev) => [
      ...prev,
      { sender: "YOU", text: chatMessage, time: "Now" },
    ]);
    setChatMessage("");
  };

  const handleCancel = () => {
    if (listing) {
      navigate(`/listing/${listing.id}`);
    } else {
      navigate("/marketplace");
    }
  };

  const steps = [
    { id: "CONTRACT", label: "Terms" },
    { id: "PAYMENT", label: "Deposit" },
    { id: "VERIFYING", label: "Verify" },
    { id: "SECURED", label: "Handover" },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === stage);

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32 text-slate-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Transaction Not Found</h2>
          <button
            onClick={() => navigate("/marketplace")}
            className="text-primary hover:underline"
          >
            Return to Marketplace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans pt-32 pb-20 relative"
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-indigo-50/50 to-transparent pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header & Nav */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-sm">
              <span className="icon">gavel</span>
            </div>
            <div>
              <h1 className="text-xl font-display font-black text-slate-900 uppercase tracking-tight">
                Escrow #{id}8821
              </h1>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Secure Connection
              </div>
            </div>
          </div>

          <button
            onClick={handleCancel}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 hover:border-red-200 hover:bg-red-50 transition-all"
          >
            <span className="text-xs font-bold text-slate-500 group-hover:text-red-500 uppercase tracking-wide">
              Cancel Transaction
            </span>
            <span className="icon text-sm text-slate-400 group-hover:text-red-500">
              close
            </span>
          </button>
        </div>

        {/* Horizontal Stepper */}
        <div className="mb-12 relative">
          {/* Background Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 rounded-full -translate-y-1/2 z-0"></div>

          {/* Active Progress Line */}
          <div
            className="absolute top-1/2 left-0 h-1 bg-indigo-600 rounded-full -translate-y-1/2 z-0 transition-all duration-700 ease-in-out"
            style={{
              width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
            }}
          ></div>

          <div className="relative z-10 flex justify-between w-full">
            {steps.map((step, idx) => {
              const isActive = idx <= currentStepIndex;
              const isCurrent = idx === currentStepIndex;

              return (
                <div key={step.id} className="flex flex-col items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-[3px] transition-all duration-500 ${
                      isActive
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-110"
                        : "bg-white border-slate-200 text-slate-300"
                    }`}
                  >
                    {isActive ? (
                      isCurrent && stage !== "SECURED" ? (
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      ) : (
                        <span className="icon text-[10px]">check</span>
                      )
                    ) : (
                      idx + 1
                    )}
                  </div>
                  <span
                    className={`text-[10px] font-black uppercase tracking-widest transition-colors duration-500 ${
                      isActive ? "text-indigo-600" : "text-slate-300"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Asset Summary "Ticket" */}
        <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-xl shadow-slate-200/40 mb-8 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-64 h-full bg-slate-50 -skew-x-12 translate-x-20 z-0"></div>

          <div className="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shrink-0 shadow-md border border-white">
            <img
              src={listing.image}
              alt="Asset"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 flex-1 text-center md:text-left">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
              {listing.game} Asset
            </div>
            <h2 className="text-xl md:text-2xl font-display font-black text-slate-900 leading-tight">
              {listing.title}
            </h2>
            <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
              <div className="flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                <span className="icon text-xs text-emerald-600">verified</span>
                <span className="text-[10px] font-bold text-emerald-700 uppercase">
                  {listing.seller}
                </span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                •
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                {listing.sellerTier}
              </span>
            </div>
          </div>

          <div className="relative z-10 text-center md:text-right">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
              Total Value
            </div>
            <div className="text-3xl font-black text-slate-900 tracking-tight">
              ${listing.price.toLocaleString()}
            </div>
          </div>
        </div>

        {/* DYNAMIC STAGE CONTENT */}
        <div className="stage-content bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 p-8 md:p-12">
          {/* STAGE 1: CONTRACT */}
          {stage === "CONTRACT" && (
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <h3 className="text-3xl font-display font-black text-slate-900 mb-2">
                  Review Agreement
                </h3>
                <p className="text-slate-500 font-medium text-sm">
                  Please confirm the terms before securing funds.
                </p>
              </div>

              <div className="space-y-6 mb-10">
                <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo-500 shadow-sm shrink-0">
                    <span className="icon">lock_clock</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">
                      Funds Held in Escrow
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                      Payment is locked in our vault. The seller cannot access
                      it until you verify the account works.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo-500 shadow-sm shrink-0">
                    <span className="icon">admin_panel_settings</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">
                      24h Inspection Window
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                      You have 24 hours after delivery to check the account. If
                      it's not as described, you get a full refund.
                    </p>
                  </div>
                </div>
              </div>

              <label className="flex items-center gap-4 cursor-pointer group mb-8 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <div
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${termsAccepted ? "bg-slate-900 border-slate-900 text-white" : "border-slate-300 bg-white"}`}
                >
                  {termsAccepted && <span className="icon text-sm">check</span>}
                </div>
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="hidden"
                />
                <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 select-none">
                  I accept the Terms of Service & Escrow Rules
                </span>
              </label>

              <button
                onClick={() => setStage("PAYMENT")}
                disabled={!termsAccepted}
                className="w-full py-4 bg-slate-900 hover:bg-indigo-600 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-slate-900/10 hover:shadow-indigo-600/20 flex items-center justify-center gap-2 group"
              >
                Continue to Deposit
                <span className="icon text-lg group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>
          )}

          {/* STAGE 2: PAYMENT */}
          {stage === "PAYMENT" && (
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <h3 className="text-3xl font-display font-black text-slate-900 mb-2">
                  Secure Deposit
                </h3>
                <p className="text-slate-500 font-medium text-sm">
                  Choose a funding method for the vault.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <button
                  onClick={() => setPaymentMethod("USDC")}
                  className={`p-6 rounded-3xl border-2 text-left transition-all ${paymentMethod === "USDC" ? "border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600/20" : "border-slate-100 hover:border-slate-300 hover:bg-slate-50"}`}
                >
                  <div className="w-10 h-10 rounded-full bg-[#2775CA] flex items-center justify-center text-white text-[10px] font-black mb-4 shadow-md">
                    USDC
                  </div>
                  <h4 className="font-bold text-slate-900">USDC / Crypto</h4>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Instant • 0% Fee
                  </p>
                </button>

                <button
                  onClick={() => setPaymentMethod("CARD")}
                  className={`p-6 rounded-3xl border-2 text-left transition-all ${paymentMethod === "CARD" ? "border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600/20" : "border-slate-100 hover:border-slate-300 hover:bg-slate-50"}`}
                >
                  <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white mb-4 shadow-md">
                    <span className="icon text-lg">credit_card</span>
                  </div>
                  <h4 className="font-bold text-slate-900">Credit Card</h4>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Secure • 2.9% Fee
                  </p>
                </button>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    Item Price
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    ${listing.price.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    Escrow Fee
                  </span>
                  <span className="text-sm font-bold text-emerald-600">
                    Waived
                  </span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-sm font-black text-slate-900 uppercase tracking-wide">
                    Total to Pay
                  </span>
                  <span className="text-3xl font-display font-black text-slate-900">
                    ${listing.price.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={handleConfirmPayment}
                disabled={!paymentMethod}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 group"
              >
                <span className="icon">lock</span>
                Lock Funds in Vault
              </button>
            </div>
          )}

          {/* STAGE 3: VERIFYING */}
          {stage === "VERIFYING" && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="relative mb-8">
                <div className="w-24 h-24 rounded-full border-4 border-slate-100 border-t-indigo-600 animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="icon text-indigo-600 text-3xl">sync</span>
                </div>
              </div>
              <h3 className="text-3xl font-display font-black text-slate-900 mb-2">
                Verifying Deposit
              </h3>
              <p className="text-slate-500 font-medium text-sm max-w-sm">
                Please wait while we confirm your transaction on the blockchain.
                This typically takes less than a minute.
              </p>
            </div>
          )}

          {/* STAGE 4: SECURED / CHAT */}
          {stage === "SECURED" && (
            <div className="h-full flex flex-col h-[500px]">
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100">
                <div>
                  <h3 className="text-2xl font-display font-black text-slate-900">
                    Secure Handoff
                  </h3>
                  <p className="text-xs font-bold text-emerald-600 uppercase tracking-wide mt-1">
                    Funds Locked • Chat Active
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Time Remaining
                  </div>
                  <div className="text-xl font-mono font-bold text-slate-900">
                    23:59:42
                  </div>
                </div>
              </div>

              {/* Chat Area */}
              <div className="flex-1 bg-slate-50 rounded-2xl border border-slate-200 p-6 overflow-y-auto mb-6 flex flex-col gap-4">
                {chatHistory.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.sender === "YOU" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.sender === "SYSTEM" ? (
                      <div className="w-full flex justify-center my-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-200/50 px-3 py-1 rounded-full">
                          {msg.text}
                        </span>
                      </div>
                    ) : (
                      <div
                        className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm ${
                          msg.sender === "YOU"
                            ? "bg-slate-900 text-white rounded-tr-sm"
                            : "bg-white text-slate-700 border border-slate-100 rounded-tl-sm"
                        }`}
                      >
                        {msg.text}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="flex gap-3">
                <button className="w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors">
                  <span className="icon">attach_file</span>
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Message the seller..."
                    className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="absolute right-2 top-2 w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center hover:bg-indigo-700 transition-colors"
                  >
                    <span className="icon text-sm">arrow_upward</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EscrowProcess;
