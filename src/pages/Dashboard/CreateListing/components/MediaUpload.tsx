import React from "react";
import { Upload } from "lucide-react";

interface MediaUploadProps {
  isViewMode?: boolean;
}

const MediaUpload: React.FC<MediaUploadProps> = ({ isViewMode = false }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
        <Upload size={16} className="text-primary" /> Media Upload
      </h3>

      {isViewMode ? (
        <div className="flex items-center justify-center p-8 bg-slate-50 rounded-xl border border-slate-200 text-slate-400">
          <p className="text-sm">Media upload disabled in view mode.</p>
        </div>
      ) : (
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Upload size={24} className="text-primary" />
          </div>
          <h4 className="text-sm font-bold">
            Click to upload or drag and drop
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            SVG, PNG, JPG or GIF (max. 5MB)
          </p>
        </div>
      )}
    </div>
  );
};

export default MediaUpload;
