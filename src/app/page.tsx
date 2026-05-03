export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-indigo-950 to-slate-900 text-white font-sans">
      <main className="flex flex-col items-center gap-8 px-6 text-center">
        <div className="text-6xl">📻</div>
        <h1 className="text-5xl font-bold tracking-tight">
          Radio Around The World
        </h1>
        <p className="max-w-lg text-lg text-slate-300">
          Discover and listen to radio stations from every corner of the globe.
          Your gateway to music, news, and culture — worldwide.
        </p>
        <div className="flex gap-4 mt-4">
          <span className="rounded-full bg-indigo-600/30 px-4 py-2 text-sm text-indigo-200 border border-indigo-500/30">
            Coming Soon
          </span>
        </div>
      </main>
    </div>
  );
}
