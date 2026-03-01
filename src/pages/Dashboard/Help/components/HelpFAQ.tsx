import React, { useState } from "react";
import { Book, ArrowRight } from "lucide-react";
import FAQItem from "@/components/shared/FAQItem";

const FAQS = [
  {
    question: "How does the Escrow system work?",
    answer:
      "When you purchase an item, your payment is held securely in our Escrow vault. The seller is notified to deliver the asset. Once you confirm receipt and verify the asset works as described, we release the funds to the seller. This protects both parties from fraud.",
  },
  {
    question: "What are the fees for selling?",
    answer:
      "GameBazaar charges a flat 5% platform fee on all successful sales to cover payment processing and escrow protection. There are no listing fees. The final payout amount is calculated automatically when you create a listing.",
  },
  {
    question: "How long do withdrawals take?",
    answer:
      "Withdrawal processing times depend on the method. PayPal and Crypto transfers are typically processed within 2-4 hours. Bank transfers may take 1-3 business days depending on your financial institution.",
  },
  {
    question: "I bought an account but the credentials don't work.",
    answer:
      "First, contact the seller via the secure chat to resolve any typos. If the seller does not respond or cannot resolve the issue within 24 hours, open a Dispute from the Order Details page. Your funds are safe in escrow while we investigate.",
  },
  {
    question: "Can I sell without ID verification?",
    answer:
      "Level 1 sellers can list items up to Rs 2,000 without ID verification. To sell higher-value assets or withdraw larger amounts, you must complete the KYC (Know Your Customer) process in your Profile Settings.",
  },
];

interface HelpFAQProps {
  searchQuery: string;
}

const HelpFAQ: React.FC<HelpFAQProps> = ({ searchQuery }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const filteredFaqs = FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (filteredFaqs.length === 0) return null;

  return (
    <div className="lg:col-span-2 space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
          <Book size={20} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-4">
        {filteredFaqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openFaqIndex === index}
            onToggle={() => toggleFaq(index)}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <button className="text-purple-600 font-bold text-sm flex items-center gap-2 hover:text-purple-700 transition-colors">
          View All Articles <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default HelpFAQ;
