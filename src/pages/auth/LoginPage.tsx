export default function LoginPage() {
  return (
    <div className="space-y-4">
      <div>
        <div className="text-xl font-semibold">Login</div>
        <div className="text-sm text-slate-500">Welcome back to ERPI Admin</div>
      </div>

      <form className="space-y-3">
        <input className="w-full rounded-xl px-3 py-2 bg-white/60 border border-white/50 outline-none" placeholder="Email" />
        <input className="w-full rounded-xl px-3 py-2 bg-white/60 border border-white/50 outline-none" placeholder="Password" type="password" />

        <button className="w-full rounded-xl px-3 py-2 bg-blue-600 text-white font-semibold hover:opacity-95">
          Sign in
          {/* TODO: backend auth login */}
        </button>
      </form>
    </div>
  );
}
