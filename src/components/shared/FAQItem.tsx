import React from "react";
import { RiCornerDownRightLine } from "react-icons/ri";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({
  question,
  answer,
  isOpen,
  onToggle,
}) => {
  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-300 bg-slate-50/50 ${
        isOpen
          ? "border-primary/50 ring-1 ring-primary/20 bg-primary/5"
          : "border-slate-200 hover:border-slate-300 hover:shadow-md"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center p-6 text-left focus:outline-none group select-none"
      >
        <span
          className={`icon mr-6 text-2xl transition-all duration-300 ${
            isOpen ? "rotate-90 text-primary translate-x-1" : "text-primary"
          }`}
        >
          <RiCornerDownRightLine />
        </span>
        <span
          className={`font-mono font-bold text-sm md:text-base uppercase tracking-wider transition-colors duration-300 ${
            isOpen
              ? "text-primary"
              : "text-slate-700 group-hover:text-slate-900"
          }`}
        >
          {question}
        </span>
      </button>
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="px-6 text-sm md:text-base pb-8 pt-0 ml-12 text-slate-600 leading-relaxed font-medium">
          {answer}
        </p>
      </div>
    </div>
  );
};

export default FAQItem;
