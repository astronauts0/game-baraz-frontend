import React from "react";
import { ShoppingBag, Store, ArrowRight } from "lucide-react";
import RoleCard from "./RoleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type Role = "buyer" | "seller";

interface RoleSelectionProps {
  role: Role;
  setRole: (role: Role) => void;
  onNext: () => void;
}

export const RoleSelection: React.FC<RoleSelectionProps> = ({
  role,
  setRole,
  onNext,
}) => {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl lg:text-3xl font-display font-black text-slate-900 mb-1">
          Choose Your Role
        </h2>
        <p className="text-slate-500 font-medium text-xs lg:text-sm">
          Select how you want to use GameBazaar.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <RoleCard
          active={role === "buyer"}
          onClick={() => setRole("buyer")}
          icon={ShoppingBag}
          title="Buyer"
          description="I want to browse and buy accounts."
        />
        <RoleCard
          active={role === "seller"}
          onClick={() => setRole("seller")}
          icon={Store}
          title="Seller"
          description="I want to list and sell accounts."
        />
      </div>

      <Button
        onClick={onNext}
        variant="default"
        size="lg"
        className="w-full mt-4 group py-3 h-auto"
      >
        Continue
        <ArrowRight
          size={18}
          className="group-hover:translate-x-1 transition-transform"
        />
      </Button>

      <div className="mt-4 text-center border-t border-slate-100 pt-3">
        <p className="text-slate-500 text-xs font-medium">
          Already have an account?
          <Link
            to="/login"
            className="text-primary font-black hover:underline ml-1 transition-colors"
          >
            Login
          </Link>
        </p>
      </div>
    </>
  );
};
