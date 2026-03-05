import { AlertCircle } from "lucide-react";

export default function ErrorCard({ message }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-20 p-8 text-center"
        style={{
          background: "rgba(255,50,50,0.08)",
          border: "1px solid rgba(255,80,80,0.3)",
        }}>
        <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-3" />
        <p className="text-red-300 text-sm">{message}</p>
      </div>
    </div>
  );
}
