import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Loader2 } from "lucide-react";
import { createCourse, uploadFile } from "../services/api";
import GlassCard from "../components/GlassCard";
import ErrorCard from "../components/ErrorCard";
import LandingStep from "../components/LandingStep";
import UploadStep from "../components/UploadStep";
import CodeStep from "../components/CodeStep";

const MAX_MB = 150;

export default function Upload() {
  const { courseId } = useParams();
  const { t } = useTranslation();
  const [step, setStep] = useState("loading");
  const [courseName, setCourseName] = useState("");
  const [sessionCode, setSessionCode] = useState("");
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState(null);

  useEffect(() => {
    if (!courseId) {
      setStep("invalid");
      return;
    }

    createCourse(courseId, courseId)
      .then((data) => {
        setCourseName(data.course_name);
        setSessionCode(data.session_code);
        setStep("landing");
      })
      .catch((err) => {
        console.error(err);
        setStep("invalid");
      });
  }, [courseId]);

  async function handleUpload() {
    setError("");

    if (!files.length) {
      setError(t("upload.error_no_files"));
      return;
    }

    const oversized = files.filter((f) => f.size > MAX_MB * 1024 * 1024);
    if (oversized.length) {
      setError(t("upload.error_oversized", {
        max: MAX_MB,
        files: oversized.map((f) => f.name).join(", "),
      }));
      return;
    }

    setLoading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        setUploadingIndex(i);
        try {
          await uploadFile(files[i], courseId);
        } catch (err) {
          console.error(err);
          setError(t("upload.error_file_failed", { file: files[i].name }));
          setUploadingIndex(null);
          setLoading(false);
          return;
        }
      }
      setUploadingIndex(null);
      setStep("code");
    } catch (err) {
      console.error(err);
      setError(t("upload.error_upload_failed"));
    } finally {
      setLoading(false);
    }
  }

  if (step === "invalid") {
    return <ErrorCard message={t("upload.invalid_url")} />;
  }

  if (step === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-brand-secondary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <GlassCard className="w-full max-w-md">
        {step === "landing" && (
          <LandingStep courseName={courseName} onStart={() => setStep("upload")} />
        )}
        {step === "upload" && (
          <UploadStep
            courseName={courseName}
            files={files}
            setFiles={setFiles}
            error={error}
            loading={loading}
            onSubmit={handleUpload}
            uploadingIndex={uploadingIndex}
          />
        )}
        {step === "code" && <CodeStep courseName={courseName} sessionCode={sessionCode} />}
      </GlassCard>
    </div>
  );
}