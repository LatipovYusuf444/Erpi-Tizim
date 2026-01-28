import { useNavigate } from "react-router-dom";

export default function Modal({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-t from-[#1C96C8]/60 to-[#334F9D]/80 p-14">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => navigate(-1)}
      />

      <div className="absolute left-1/2 top-1/2 w-[min(720px,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-5">
        <button
          className="absolute right-4 top-4 text-xl"
          onClick={() => navigate(-1)}
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}
