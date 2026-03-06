import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Loader2 } from "lucide-react";
import { createCourse, uploadFile, fetchCourseName } from "../services/api";
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
  const [uploadedIndexes, setUploadedIndexes] = useState(new Set());

  useEffect(() => {
    if (!courseId) { setStep('invalid'); return }

    fetchCourseName(courseId)
      .then(name => createCourse(courseId, name))
      .then(data => {
        setCourseName(data.course_name)
        setSessionCode(data.session_code)
        setStep('landing')
      })
      .catch(err => {
        console.error(err)
        setStep('invalid')
      })
  }, [courseId]);

  useEffect(() => {
    if (files.length === 0) return
    const oversized = files.filter(f => f.size > MAX_MB * 1024 * 1024)
    if (oversized.length) {
      setError(t('upload.error_oversized', { max: MAX_MB, files: oversized.map(f => f.name).join(', ') }))
      return
    }
    setError('')
    setLoading(true)
    setUploadedIndexes(new Set())
    let cancelled = false
    async function run() {
      for (let i = 0; i < files.length; i++) {
        if (cancelled) return
        try {
          await uploadFile(files[i], courseId)
          if (!cancelled) setUploadedIndexes(prev => new Set([...prev, i]))
        } catch (err) {
          if (!cancelled) {
            console.error(err)
            setError(t('upload.error_file_failed', { file: files[i].name }))
            setLoading(false)
          }
          return
        }
      }
      if (!cancelled) setLoading(false)
    }
    run()
    return () => { cancelled = true }
  }, [files])

  function handleUpload() {
    if (files.length === 0) { setError(t('upload.error_no_files')); return }
    if (uploadedIndexes.size !== files.length) return
    setStep('code')
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
            uploadedIndexes={uploadedIndexes}
          />
        )}
        {step === "code" && <CodeStep courseName={courseName} sessionCode={sessionCode} />}
      </GlassCard>
    </div>
  );
}