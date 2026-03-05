import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";

function getExtension(filename) {
  return filename.split(".").pop().toUpperCase();
}

export default function FileListStep({ files, onSelect, onBack }) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-bold">{t("view.list_title")}</h2>
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-xs text-brand-secondary"
        >
          {t("view.back_button")}
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10">
        <table className="w-full">
          <thead>
            <tr className="bg-white/5">
              <th className="text-right px-3 py-2 text-xs font-bold text-brand-secondary uppercase">
                {t("view.file_type_label")}
              </th>
              <th className="text-right px-3 py-2 text-xs font-bold text-brand-secondary uppercase">
                {t("view.file_name_label")}
              </th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr
                key={file.file_id}
                onClick={() => onSelect(file)}
                className="border-t border-white/5 cursor-pointer"
              >
                <td className="px-3 py-2.5">
                  <span className="text-xs bg-white/10 px-2 py-0.5 rounded font-bold">
                    {getExtension(file.file_name)}
                  </span>
                </td>
                <td className="px-3 py-2.5 text-xs truncate max-w-[180px]">
                  {file.file_name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
