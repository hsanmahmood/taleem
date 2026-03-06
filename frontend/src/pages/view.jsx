import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getFilesByCourse } from "../services/api";
import PairingStep from "../components/PairingStep";
import FileListStep from "../components/FileListStep";
import FileOptionsStep from "../components/FileOptionsStep";

export default function View() {
  const { t } = useTranslation();
  const [step, setStep] = useState("pairing");
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handlePairing(code) {
    setError("");
    setLoading(true);
    try {
      const data = await getFilesByCourse(code);
      setFiles(data.files);
      setStep("list");
    } catch (err) {
      console.error(err);
      setError(t("view.error_invalid_code"));
    } finally {
      setLoading(false);
    }
  }

  function handleSelectFile(file) {
    setSelectedFile(file);
    setStep("options");
  }

  if (step === "pairing") {
    return <PairingStep onSubmit={handlePairing} loading={loading} error={error} />;
  }

  if (step === "list") {
    return (
      <FileListStep
        files={files}
        onSelect={handleSelectFile}
        onBack={() => setStep("pairing")}
      />
    );
  }

  if (step === "options") {
    return (
      <FileOptionsStep
        file={selectedFile}
        onBack={() => setStep("list")}
      />
    );
  }

  return null;
}