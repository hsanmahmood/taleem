import { useTranslation } from "react-i18next";
import { Upload, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { useRef } from "react";
import logo from "../assets/logo.png";

const MAX_MB = 150;
const ACCEPT = ".pdf,.ppt,.pptx,.doc,.docx";

export default function UploadStep({ courseName, files, setFiles, error, loading, onSubmit, uploadedIndexes }) {
  const { t } = useTranslation();
  const inputRef = useRef(null);

  function handleFileChange(e) {
    const selected = Array.from(e.target.files);
    if (!selected.length) return;

    const oversized = selected.filter((f) => f.size > MAX_MB * 1024 * 1024);
    if (oversized.length) {
      setFiles([]);
      return;
    }

    setFiles(selected);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-center">
        <img src={logo} alt="logo" className="w-16 h-16 rounded-lg object-cover" />
      </div>

      <span className="text-xs font-bold bg-white/10 rounded-lg px-3 py-1.5">
        {t("upload.subject_label")}: {courseName}
      </span>
      <p className="text-xs text-brand-secondary">
        PDF، PPT، DOCX — 150MB كحد أقصى
      </p>

      <div
        onClick={() => inputRef.current?.click()}
        className="border border-dashed border-white/20 rounded-xl p-6 text-center cursor-pointer"
      >
        <Upload className="w-7 h-7 text-brand-secondary mx-auto mb-2" />
        <p className="text-xs text-brand-secondary">
          {t("upload.file_hint", { max: MAX_MB })}
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {files.length > 0 && (
        <div className="flex flex-col gap-2">
          {files.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2"
            >
              <span className="text-xs bg-white/10 px-2 py-0.5 rounded font-bold uppercase shrink-0">
                {f.name.split(".").pop()}
              </span>
              <span className="text-xs truncate flex-1">{f.name}</span>
              {uploadedIndexes.has(i) ? (
                <CheckCircle className="w-3 h-3 text-green-400 shrink-0" />
              ) : loading && i === uploadedIndexes.size ? (
                <Loader2 className="w-3 h-3 animate-spin text-brand-secondary shrink-0" />
              ) : (
                <span className="text-xs text-brand-secondary shrink-0">{(f.size / 1024 / 1024).toFixed(1)}MB</span>
              )}
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-xl px-3 py-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span className="text-red-300 text-xs">{error}</span>
        </div>
      )}

      <button
        onClick={onSubmit}
        disabled={loading || (files.length > 0 && uploadedIndexes.size !== files.length && !error)}
        className="w-full bg-white text-black font-bold py-3 text-sm rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : t("upload.next_button")}
      </button>
    </div>
  );
}
