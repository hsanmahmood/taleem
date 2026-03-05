export default function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-20 p-8 ${className}`}
      style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.37)",
      }}
    >
      {children}
    </div>
  );
}
