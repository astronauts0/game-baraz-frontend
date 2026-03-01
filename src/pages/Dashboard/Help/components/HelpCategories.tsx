import React from "react";
import { DollarSign, Shield, ShoppingCart, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const HELP_CATEGORIES = [
  {
    id: "buying",
    icon: ShoppingCart,
    title: "Buying Assets",
    description:
      "Guides on purchasing accounts, skins, and currencies securely.",
    color: "bg-blue-50 text-blue-600",
    borderColor: "group-hover:border-blue-200",
  },
  {
    id: "selling",
    icon: DollarSign,
    title: "Selling & Payouts",
    description: "How to list items, verify ownership, and withdraw earnings.",
    color: "bg-emerald-50 text-emerald-600",
    borderColor: "group-hover:border-emerald-200",
  },
  {
    id: "account",
    icon: User,
    title: "Account Management",
    description: "Profile settings, 2FA security, and verification levels.",
    color: "bg-purple-50 text-purple-600",
    borderColor: "group-hover:border-purple-200",
  },
  {
    id: "safety",
    icon: Shield,
    title: "Safety & Security",
    description:
      "Avoid scams, secure transfer protocols, and dispute resolution.",
    color: "bg-amber-50 text-amber-600",
    borderColor: "group-hover:border-amber-200",
  },
];

interface HelpCategoriesProps {
  searchQuery: string;
}

const HelpCategories: React.FC<HelpCategoriesProps> = ({ searchQuery }) => {
  const filteredCategories = HELP_CATEGORIES.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (filteredCategories.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {filteredCategories.map((category) => (
        <Card
          key={category.id}
          className={`cursor-pointer group hover:-translate-y-1 hover:shadow-md transition-all border-slate-200 ${category.borderColor}`}
        >
          <CardContent className="p-6 flex flex-col items-start text-left gap-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${category.color}`}
            >
              <category.icon size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-purple-700 transition-colors">
                {category.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {category.description}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default HelpCategories;
