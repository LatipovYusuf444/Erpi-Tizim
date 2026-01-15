import { useNavigate } from "react-router-dom";

export default function Modal({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-t from-[#1C96C8]/70 to-[#334F9D]/90 p-14 w-[] rounded-xl ">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => navigate(-1)}
      />
      {/* panel */}
      <div className="absolute left-1/2 top-1/2 w-[min(720px,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-5">
        <button className="mb-3" onClick={() => navigate(-1)}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
