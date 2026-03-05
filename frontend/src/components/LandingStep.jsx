import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";
import logo from "../assets/logo.png";

export default function LandingStep({ courseName, onStart }) {
  const { t } = useTranslation();

  return (
    <div className="text-center flex flex-col gap-4">
      <div className="flex justify-center">
        <img src={logo} alt="logo" className="w-16 h-16 rounded-lg object-cover" />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs bg-white/10 rounded-lg px-3 py-1.5 inline-block">{t("upload.subject_label")}: {courseName}</span>
        <h1 className="text-xl font-bold">{t("app.title")}</h1>
      </div>

      <div className="flex flex-col gap-3 text-right">
        {["1", "2", "3"].map((n) => (
          <div key={n} className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold shrink-0">
              {n}
            </span>
            <span className="text-xs text-brand-secondary">{t(`upload.steps.${n}`)}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onStart}
        className="w-full bg-white text-black font-bold py-3 text-sm rounded-xl flex items-center justify-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        {t("upload.start_button")}
      </button>
    </div>
  );
}
