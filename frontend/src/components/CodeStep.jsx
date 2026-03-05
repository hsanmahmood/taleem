import { useTranslation } from "react-i18next";
import { CheckCircle } from "lucide-react";
import logo from "../assets/logo.png";

export default function CodeStep({ courseName, sessionCode }) {
  const { t } = useTranslation();
  const viewUrl = "https://taleem.hasanmahmood.org/";

  return (
    <div className="text-center flex flex-col gap-3">
      <div className="flex justify-center">
        <img src={logo} alt="logo" className="w-16 h-16 rounded-lg object-cover" />
      </div>

      <span className="text-xs font-bold bg-white/10 rounded-lg px-3 py-1.5">
        {t("upload.subject_label")}: {courseName}
      </span>
      <CheckCircle className="w-10 h-10 text-green-400 mx-auto" />

      <h2 className="text-sm font-bold">{t("upload.success_title")}</h2>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-secondary">
          {t("upload.code_label")}
        </p>
        <p className="text-5xl font-bold tracking-[0.3em]" dir="ltr">
          {sessionCode}
        </p>
      </div>

      <div className="h-px bg-white/10"></div>

      <div className="flex flex-col gap-2">
        <p className="text-xs text-brand-secondary">{t("upload.code_instructions")}</p>
        <a href={viewUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-xs break-all text-blue-400 hover:text-blue-300 underline">
          {viewUrl}
        </a>
      </div>
    </div>
  );
}
