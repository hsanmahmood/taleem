import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Loader2, AlertCircle } from "lucide-react";
import GlassCard from "./GlassCard";
import logo from "../assets/logo.png";

export default function PairingStep({ onSubmit, loading, error }) {
  const { t } = useTranslation();
  const [code, setCode] = useState("");
  const inputRef = useRef(null);

  function handleChange(e) {
    const val = e.target.value.replace(/\D/g, "").slice(0, 3);
    setCode(val);
  }

  function handleSubmit() {
    if (code.length === 3) onSubmit(code);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSubmit();
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <GlassCard className="w-full max-w-sm text-center flex flex-col gap-3">
        <div className="flex justify-center">
          <img src={logo} alt="logo" className="w-16 h-16 rounded-lg object-cover" />
        </div>

        <h1 className="text-lg font-bold">{t("app.title")}</h1>

        <div className="flex flex-col gap-3">
          <label className="text-xs font-bold uppercase tracking-widest text-brand-secondary block">
            {t("view.code_label")}
          </label>
          <input
            ref={inputRef}
            type="number"
            value={code}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={t("view.code_placeholder")}
            autoFocus
            dir="ltr"
            className="w-full text-5xl text-center font-bold bg-black/30 border border-white/10 rounded-xl py-4 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </div>

        {error && (
          <div className="flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/30 rounded-xl px-3 py-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span className="text-red-300 text-xs">{error}</span>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading || code.length !== 3}
          className="w-full bg-white text-black font-bold py-3 text-sm rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            t("view.enter_button")
          )}
        </button>
      </GlassCard>
    </div>
  );
}
