import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Eye, Download, ArrowRight, AlertCircle } from "lucide-react";
import GlassCard from "./GlassCard";
import logo from "../assets/logo.png";
import { getFile } from "../services/api";

const BASE_URL = import.meta.env.VITE_API_URL;

function getExtension(filename) {
  return filename.split(".").pop().toUpperCase();
}

export default function FileOptionsStep({ file, onBack }) {
  const { t } = useTranslation();
  const [error, setError] = useState('');

  async function handleView() {
    try {
      const ext = file.file_name.split('.').pop().toLowerCase()
      const streamUrl = `${BASE_URL}/file/${file.file_id}/view`
      if (ext === 'pdf') {
        window.open(streamUrl, '_blank')
      } else {
        const data = await getFile(file.file_id)
        const encoded = encodeURIComponent(data.url)
        window.open(`https://docs.google.com/viewer?url=${encoded}`, '_blank')
      }
    } catch {
      setError(t('view.error_open_failed'))
    }
  }

  function handleDownload() {
    if (!BASE_URL) { setError(t('view.error_download_failed')); return }
    window.open(`${BASE_URL}/file/${file.file_id}/download`, "_blank");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <GlassCard className="w-full max-w-sm text-center flex flex-col gap-3">
        <div className="flex justify-center">
          <img src={logo} alt="logo" className="w-16 h-16 rounded-lg object-cover" />
        </div>

        <button
          onClick={onBack}
          className="text-xs text-brand-secondary text-right w-full block"
        >
          {t("view.back_button")}
          <ArrowRight className="w-3 h-3 inline ml-1" />
        </button>

        <span className="text-xs bg-white/10 px-3 py-1 rounded font-bold mx-auto block w-fit">
          {getExtension(file.file_name)}
        </span>
        <p className="text-sm font-bold text-center truncate text-left" dir="ltr">{file.file_name}</p>

        {error && (
          <div className="flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/30 rounded-xl px-3 py-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span className="text-red-300 text-xs">{error}</span>
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={handleView}
            className="flex-1 bg-white text-black font-bold py-3 text-sm rounded-xl flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            {t("view.present_button")}
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 font-bold py-3 text-sm rounded-xl flex items-center justify-center gap-2 bg-white/5 border border-white/10"
          >
            <Download className="w-4 h-4" />
            {t("view.download_button")}
          </button>
        </div>
      </GlassCard>
    </div>
  );
}
