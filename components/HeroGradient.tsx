export default function HeroGradient() {
  return (
    <div
      className="h-full w-full rounded-full"
      style={{
        opacity: "0.5",
        background:
          "radial-gradient(54.14% 54.14% at 50% 50%, #99CC00 0%, rgba(103, 2, 139, 0.02) 100%)",
        filter: "blur(177px)",
      }}
    />
  );
}
