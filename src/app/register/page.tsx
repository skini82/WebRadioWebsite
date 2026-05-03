"use client";

import { useState } from "react";
import Link from "next/link";

type FormState = {
  email: string;
  password: string;
  confirmPassword: string;
  userName: string;
  firstName: string;
  lastName: string;
  preferredLanguage: "en" | "it";
};

const INITIAL_STATE: FormState = {
  email: "",
  password: "",
  confirmPassword: "",
  userName: "",
  firstName: "",
  lastName: "",
  preferredLanguage: "en",
};

export default function RegisterPage() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (form.password.length < 8) {
      setError("La password deve contenere almeno 8 caratteri.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Le password non corrispondono.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          userName: form.userName || null,
          firstName: form.firstName || null,
          lastName: form.lastName || null,
          preferredLanguage: form.preferredLanguage,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.message || "Registrazione fallita. Riprova più tardi.");
        return;
      }

      setSuccess(true);
    } catch {
      setError("Errore di rete. Verifica la connessione e riprova.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-indigo-950 to-slate-900 text-white px-6">
        <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-2xl p-8 text-center backdrop-blur">
          <div className="text-5xl mb-4">📧</div>
          <h1 className="text-2xl font-semibold mb-3">Controlla la tua email</h1>
          <p className="text-slate-300 mb-6">
            Ti abbiamo inviato un link di conferma all&apos;indirizzo{" "}
            <strong className="text-white">{form.email}</strong>. Clicca sul link
            per attivare il tuo account.
          </p>
          <Link
            href="/"
            className="inline-block rounded-full bg-indigo-600 hover:bg-indigo-500 px-6 py-2 text-sm font-medium transition-colors"
          >
            Torna alla home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-indigo-950 to-slate-900 text-white px-6 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">📻</div>
          <h1 className="text-3xl font-bold">Crea il tuo account</h1>
          <p className="text-slate-400 mt-2 text-sm">
            Iscriviti per salvare le tue stazioni preferite.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 backdrop-blur"
        >
          <Field label="Email *">
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="input"
              autoComplete="email"
            />
          </Field>

          <Field label="Password * (min 8 caratteri)">
            <input
              type="password"
              required
              minLength={8}
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              className="input"
              autoComplete="new-password"
            />
          </Field>

          <Field label="Conferma password *">
            <input
              type="password"
              required
              value={form.confirmPassword}
              onChange={(e) => update("confirmPassword", e.target.value)}
              className="input"
              autoComplete="new-password"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Nome">
              <input
                type="text"
                value={form.firstName}
                onChange={(e) => update("firstName", e.target.value)}
                className="input"
                autoComplete="given-name"
              />
            </Field>
            <Field label="Cognome">
              <input
                type="text"
                value={form.lastName}
                onChange={(e) => update("lastName", e.target.value)}
                className="input"
                autoComplete="family-name"
              />
            </Field>
          </div>

          <Field label="Username">
            <input
              type="text"
              value={form.userName}
              onChange={(e) => update("userName", e.target.value)}
              className="input"
              autoComplete="username"
            />
          </Field>

          <Field label="Lingua preferita">
            <select
              value={form.preferredLanguage}
              onChange={(e) =>
                update("preferredLanguage", e.target.value as "en" | "it")
              }
              className="input"
            >
              <option value="en">English</option>
              <option value="it">Italiano</option>
            </select>
          </Field>

          {error && (
            <div className="rounded-lg bg-red-500/15 border border-red-500/30 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 text-sm font-medium transition-colors"
          >
            {submitting ? "Registrazione in corso..." : "Registrati"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-400 mt-6">
          Hai già un account?{" "}
          <Link href="/" className="text-indigo-400 hover:text-indigo-300">
            Torna alla home
          </Link>
        </p>
      </div>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.5rem;
          padding: 0.625rem 0.875rem;
          color: white;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.15s;
        }
        :global(.input:focus) {
          border-color: rgb(99, 102, 241);
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-slate-300 mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}
