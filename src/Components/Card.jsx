export default function Card({ children, className = "" }) {
  return (
    <div
      className={`
      bg-[#111111]/90
      border
      border-[#202020]
      rounded-[28px]
      backdrop-blur-xl
      shadow-[0_0_40px_rgba(0,0,0,.25)]
      hover:border-[#00C16A]
      hover:-translate-y-1
      duration-300
      ${className}
      `}
    >
      {children}
    </div>
  );
}