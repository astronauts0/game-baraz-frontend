import React from "react";
import {
  MessageCircle,
  Mail,
  FileText,
  AlertTriangle,
  Shield,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HelpContactProps {
  onContactSupport?: () => void;
}

const HelpContact: React.FC<HelpContactProps> = ({ onContactSupport }) => {
  return (
    <div className="space-y-6">
      {/* Contact Card */}
      <div className="bg-primary rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <h3 className="text-lg font-bold mb-2 relative z-10">
          Still need help?
        </h3>
        <p className="text-sm mb-6 relative z-10">
          Our elite support team is available 24/7 to assist with critical
          mission failures.
        </p>

        <div className="space-y-3 relative z-10 flex flex-col">
          <Button
            onClick={onContactSupport}
            variant="outline"
            className="text-black"
          >
            <MessageCircle size={16} className="mr-2" /> Live Chat
          </Button>
          <Button
            variant="outline"
            onClick={onContactSupport}
            className="text-black"
          >
            <Mail size={16} className="mr-2" /> Submit Ticket
          </Button>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
          Quick Links
        </h3>
        <div className="space-y-2">
          <Link
            to="/terms-and-condition"
            className="w-full text-left p-3 rounded-xl hover:bg-slate-50 text-slate-600 text-sm font-medium flex items-center gap-3 transition-colors"
          >
            <FileText size={16} className="text-slate-400 inline-block mr-2" />{" "}
            Terms of Service
          </Link>
          <Link
            to="/dashboard/disputes"
            className="w-full text-left p-3 rounded-xl hover:bg-slate-50 text-slate-600 text-sm font-medium flex items-center gap-3 transition-colors"
          >
            <AlertTriangle
              size={16}
              className="text-slate-400 inline-block mr-2"
            />{" "}
            Report a User
          </Link>
          <Link
            to="/privacy-policy"
            className="w-full text-left p-3 rounded-xl hover:bg-slate-50 text-slate-600 text-sm font-medium flex items-center gap-3 transition-colors"
          >
            <Shield size={16} className="text-slate-400 inline-block mr-2" />{" "}
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HelpContact;
