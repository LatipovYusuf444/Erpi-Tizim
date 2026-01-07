import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen grid place-items-center bg-[#375534] p-6">
      <div className="glass-strong w-full max-w-md p-6">
        <Outlet />
      </div>
    </div>
  );
}
