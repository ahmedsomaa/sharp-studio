export default function BackgroundGradient() {
  return (
    <div
      className="h-full w-full rounded-full"
      style={{
        opacity: "0.4",
        background:
          "radial-gradient(54.14% 54.14% at 50% 50%, #16a34a 0%, rgba(103, 2, 139, 0.02) 100%)",
        filter: "blur(177px)",
      }}
    />
  );
}
