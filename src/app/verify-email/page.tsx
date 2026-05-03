"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

type Status = "loading" | "success" | "error" | "missing-token";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (!token) {
      setStatus("missing-token");
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `/api/auth/verify-email?token=${encodeURIComponent(token)}`,
        );
        if (cancelled) return;
        setStatus(res.ok ? "success" : "error");
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-indigo-950 to-slate-900 text-white px-6">
      <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-2xl p-8 text-center backdrop-blur">
        {status === "loading" && (
          <>
            <div className="text-5xl mb-4 animate-pulse">⏳</div>
            <h1 className="text-2xl font-semibold mb-3">Verifica in corso...</h1>
            <p className="text-slate-300">
              Stiamo confermando il tuo indirizzo email.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="text-5xl mb-4">✅</div>
            <h1 className="text-2xl font-semibold mb-3 text-emerald-300">
              Email confermata!
            </h1>
            <p className="text-slate-300 mb-6">
              Il tuo indirizzo email è stato verificato con successo. Ora puoi
              accedere al tuo account.
            </p>
            <Link
              href="/"
              className="inline-block rounded-full bg-indigo-600 hover:bg-indigo-500 px-6 py-2 text-sm font-medium transition-colors"
            >
              Vai alla home
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <div className="text-5xl mb-4">⚠️</div>
            <h1 className="text-2xl font-semibold mb-3 text-red-300">
              Verifica fallita
            </h1>
            <p className="text-slate-300 mb-2">
              Non è stato possibile confermare il tuo indirizzo email. Il link
              potrebbe essere scaduto o non valido.
            </p>
            <p className="text-slate-300 mb-6">
              Per assistenza, contatta il supporto all&apos;indirizzo{" "}
              <a
                href="mailto:support@radioaroundtheworld.com"
                className="text-indigo-400 hover:text-indigo-300"
              >
                support@radioaroundtheworld.com
              </a>
              .
            </p>
            <Link
              href="/"
              className="inline-block rounded-full border border-white/20 hover:bg-white/5 px-6 py-2 text-sm font-medium transition-colors"
            >
              Torna alla home
            </Link>
          </>
        )}

        {status === "missing-token" && (
          <>
            <div className="text-5xl mb-4">❓</div>
            <h1 className="text-2xl font-semibold mb-3">Link non valido</h1>
            <p className="text-slate-300 mb-6">
              Manca il codice di verifica. Usa il link che hai ricevuto via
              email.
            </p>
            <Link
              href="/"
              className="inline-block rounded-full border border-white/20 hover:bg-white/5 px-6 py-2 text-sm font-medium transition-colors"
            >
              Torna alla home
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="flex flex-1" />}>
      <VerifyEmailContent />
    </Suspense>
  );
}
