import React, { useState } from "react";
import { ShieldAlert, Upload, Info, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface CreateDisputeFormProps {
  onSubmit: (data: {
    reason: string;
    description: string;
    files: File[];
  }) => void;
  onCancel: () => void;
}

export const CreateDisputeForm: React.FC<CreateDisputeFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [reason, setReason] = useState("Item Not Received");
  const [description, setDescription] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [files, _setFiles] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (agreed && description) {
      onSubmit({ reason, description, files });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Issue Type Selection */}
      <Card>
        <CardHeader className="pb-0">
          <CardTitle className="text-sm font-bold uppercase tracking-wide">
            1. Select Issue Type
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Item Not Received",
              "Item Not As Described",
              "Invalid Credentials",
              "Scam Attempt",
              "Account Reclaimed",
              "Other",
            ].map((type) => (
              <div
                key={type}
                onClick={() => setReason(type)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                  reason === type
                    ? "border-destructive bg-destructive/10 text-destructive"
                    : "border-border hover:border-primary/50 text-muted-foreground"
                }`}
              >
                <span className="font-semibold text-sm">{type}</span>
                {reason === type && (
                  <CheckCircle size={16} className="text-destructive" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Description */}
      <Card>
        <CardHeader className="pb-0">
          <CardTitle className="text-sm font-bold uppercase tracking-wide">
            2. Describe the Incident
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/50 p-4 rounded-xl border border-border/50 mb-4 flex items-center gap-3">
            <Info size={18} className="text-muted-foreground shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              Please provide a detailed timeline of events. Include any
              communication with the seller outside of the platform if
              applicable.
            </p>
          </div>
          <Textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            placeholder="e.g. I purchased the account at 14:00. I received the credentials at 14:05 but they were invalid. I contacted the seller but got no response..."
            className="w-full p-4 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-destructive/50 focus:border-destructive text-sm placeholder:text-muted-foreground resize-none transition-colors"
          />
        </CardContent>
      </Card>

      {/* Evidence Upload */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-sm font-bold uppercase tracking-wide">
            3. Provide Evidence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer group">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform text-white">
              <Upload size={20} />
            </div>
            <p className="text-sm font-bold">Upload Screenshots or Video</p>
            <p className="text-xs text-muted-foreground mt-1">
              Max file size 10MB. Formats: JPG, PNG, MP4
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Agreement */}
      <div className="bg-destructive/10 p-6 rounded-2xl border border-destructive/20 hidden">
        {/* We'll use shadcn checkbox instead */}
      </div>
      <Card className="border-destructive/20 bg-destructive/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              <input
                type="checkbox"
                id="agreement"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 text-destructive rounded border-input focus:ring-destructive cursor-pointer"
              />
            </div>
            <div>
              <label
                htmlFor="agreement"
                className="text-sm font-bold text-destructive cursor-pointer"
              >
                I acknowledge that opening a false dispute may result in an
                account ban.
              </label>
              <p className="text-xs text-destructive/80 mt-1">
                By submitting this form, the transaction funds will be frozen in
                escrow until a resolution is reached by the GameBazaar
                administration team.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-4 pt-2">
        <Button type="button" variant="outline" onClick={onCancel} size="lg">
          Cancel
        </Button>
        <Button
          type="submit"
          variant="destructive"
          disabled={!agreed || !description}
          size="lg"
        >
          <ShieldAlert size={18} /> Submit Formal Dispute
        </Button>
      </div>
    </form>
  );
};
