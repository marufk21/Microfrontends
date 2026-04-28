const blockStyle = {
  width: "100%",
  height: "18px",
  borderRadius: "6px",
  backgroundColor: "#e5e7eb",
  animation: "skeletonPulse 1.2s ease-in-out infinite",
} as const;

function Skeleton() {
  return (
    <div style={{ marginTop: "1rem" }}>
      <style>
        {`@keyframes skeletonPulse {
          0% { opacity: 0.7; }
          50% { opacity: 1; }
          100% { opacity: 0.7; }
        }`}
      </style>

      <div style={{ display: "grid", gap: "0.75rem" }}>
        <div style={blockStyle} />
        <div style={blockStyle} />
        <div style={blockStyle} />
        <div style={{ ...blockStyle, width: "75%" }} />
      </div>
    </div>
  );
}

export default Skeleton;
