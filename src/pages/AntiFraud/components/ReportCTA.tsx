import React from "react";
import { AlertTriangle, Flag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ReportCTA: React.FC = () => {
  return (
    <Card className="lg:col-span-4">
      <CardContent className="flex flex-col justify-between h-full">
        <div>
          <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg">
            <AlertTriangle size={24} />
          </div>
          <h3 className="text-2xl font-black uppercase mb-2">See Something?</h3>
          <p className="text-sm font-medium text-slate-500 leading-relaxed mb-6">
            If something feels off, it probably is. Report suspicious behavior
            and earn bounties if we ban them.
          </p>
        </div>
        <Button
          size={"lg"}
          className="w-full bg-red-600 hover:bg-red-700 text-white"
        >
          <Flag size={18} />
          File Report
        </Button>
      </CardContent>
    </Card>
  );
};

export default ReportCTA;
