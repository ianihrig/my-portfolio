"use client";

import React, { useMemo, useState } from "react";

/** Inline icons (same vibe as SideTabs: currentColor stroke) */
function IconMail() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M4 6h16v12H4z" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
      <path d="M2 9h4v12H2z" />
      <path d="M4 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
      <path d="M6 9h4v12H6z" opacity="0" /> {/* keeps spacing consistent */}
    </svg>
  );
}

function IconGitHub() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 19c-4 1.5-4-2.5-5-3" />
      <path d="M14 22v-3.5c0-1 .3-1.7 1-2.2 3.3-.4 6.8-1.6 6.8-7.3 0-1.6-.6-3-1.6-4.1.2-.5.7-2-.2-4.1 0 0-1.3-.4-4.2 1.6a14.6 14.6 0 0 0-7.6 0C5.3.7 4 .9 4 .9c-.9 2.1-.4 3.6-.2 4.1C2.6 6.1 2 7.5 2 9.1c0 5.7 3.5 6.9 6.8 7.3.5.4.8 1 .9 1.8V22" />
    </svg>
  );
}

function IconFile() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    >
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M8 13h8" />
      <path d="M8 17h8" />
    </svg>
  );
}

function IconPin() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <path d="M12 21s7-4.4 7-11a7 7 0 1 0-14 0c0 6.6 7 11 7 11Z" />
      <path d="M12 10.2a2.2 2.2 0 1 0 0-.01Z" />
    </svg>
  );
}

function IconSend() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22l-4-9-9-4Z" />
    </svg>
  );
}

type IconLink = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

function IconPill({ item }: { item: IconLink }) {
  const isMail = item.href.startsWith("mailto:");
  const isExternal = /^https?:\/\//.test(item.href); // only http(s) goes new-tab

  return (
    <a
      href={item.href}
      target={isMail ? undefined : isExternal ? "_blank" : undefined}
      rel={isMail ? undefined : isExternal ? "noreferrer" : undefined}
      className="
        group relative inline-flex items-center justify-center
        h-12 w-12 rounded-2xl
        border border-white/15 bg-white/5 backdrop-blur-md
        hover:border-white/25 hover:bg-white/8
        transition
        focus:outline-none focus:ring-2 focus:ring-white/25
      "
      aria-label={item.label}
      title={item.label}
    >
      <span className="text-white/80 group-hover:text-white transition">
        {item.icon}
      </span>

      {/* tooltip */}
      <span
        className="
          pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2
          rounded-lg border border-white/15 bg-[#071428]/95
          px-2 py-1 text-[11px] text-white/85
          opacity-0 translate-y-1
          group-hover:opacity-100 group-hover:translate-y-0
          transition
          whitespace-nowrap
        "
      >
        {item.label}
      </span>
    </a>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-xs text-white/60 mb-1">{children}</div>;
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="
        w-full rounded-xl
        border border-white/12 bg-white/5
        px-4 py-3 text-sm text-white/90
        placeholder:text-white/35
        focus:outline-none focus:ring-2 focus:ring-white/20
      "
    />
  );
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className="
        w-full min-h-[170px] resize-none rounded-xl
        border border-white/12 bg-white/5
        px-4 py-3 text-sm text-white/90
        placeholder:text-white/35
        focus:outline-none focus:ring-2 focus:ring-white/20
      "
    />
  );
}

export default function ContactPage() {
  // TODO: replace these with your real info
  const YOUR_EMAIL = "iihrig6622@gmail.com";
  const YOUR_LINKEDIN = "https://linkedin.com/in/ian-ihrig";
  const YOUR_GITHUB = "https://github.com/ianihrig";
  const YOUR_LOCATION = "Atlanta, GA";
  const RESUME_PUBLIC_PATH = "/resume.pdf"; // put resume.pdf in /public

  const iconLinks = useMemo<IconLink[]>(
    () => [
      { label: "Email", href: `mailto:${YOUR_EMAIL}`, icon: <IconMail /> },
      { label: "LinkedIn", href: YOUR_LINKEDIN, icon: <IconLinkedIn /> },
      { label: "GitHub", href: YOUR_GITHUB, icon: <IconGitHub /> },
      { label: "Resume (PDF)", href: RESUME_PUBLIC_PATH, icon: <IconFile /> },
    ],
    [YOUR_EMAIL, YOUR_LINKEDIN, YOUR_GITHUB, RESUME_PUBLIC_PATH]
  );

  // mailto form (no backend yet)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [company, setCompany] = useState(""); // honeypot


  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      setStatus("sending");
      setErrorMsg("");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message, company }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error ?? "Failed to send");
      }

      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setStatus("sent");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err?.message ?? "Something went wrong.");
    } finally {
      setTimeout(() => setStatus("idle"), 2500);
    }
  }

  return (
    <div className="w-full">
      <h1 className="text-5xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-3 text-white/70 max-w-2xl">
        Reach out for collaborations, robotics/mech design work, or just to connect.
      </p>

      <div className="mt-10 w-full">

        {/* Right card */}
        <section className="bp-glass rounded-2xl p-7 border border-white/10">
          {/* Centered icon row (dock-like) */}
          <div className="flex justify-center gap-3">
            {iconLinks.map((it) => (
              <IconPill key={it.label} item={it} />
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/70">
            <a className="hover:underline underline-offset-4" href={`mailto:${YOUR_EMAIL}`}>
              {YOUR_EMAIL}
            </a>
            <span className="inline-flex items-center gap-2 text-white/65">
              <span className="text-white/55">
                <IconPin />
              </span>
              {YOUR_LOCATION}
            </span>
          </div>
          <div className="my-6 h-px bg-white/10" />

          <div className="text-center">
            <h2 className="text-lg font-semibold">Send a message</h2>
            <p className="mt-1 text-sm text-white/55">
              Or use the form below to reach out directly.
            </p>
          </div>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <FieldLabel>Name</FieldLabel>
                <TextInput
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                />
              </div>
              <div>
                <FieldLabel>Email</FieldLabel>
                <TextInput
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <FieldLabel>Subject (optional)</FieldLabel>
              <TextInput
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="What’s this about?"
              />
            </div>

            <div>
              <FieldLabel>Message</FieldLabel>
              <TextArea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message..."
              />
            </div>
            <input
              type="text"
              name="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
            />
            <div className="flex items-center justify-between gap-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className="
                  inline-flex items-center gap-2
                  rounded-xl border border-white/15
                  bg-white/10 hover:bg-white/15
                  px-5 py-3 text-sm font-medium
                  transition
                  focus:outline-none focus:ring-2 focus:ring-white/20
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
              >
                <IconSend />
                {status === "sending" && <p className="text-xs text-white/50">Sending…</p>}
                {status === "sent" && <p className="text-xs text-green-400">Message sent ✓</p>}
                {status === "error" && <p className="text-xs text-red-400">{errorMsg}</p>}
              </button>
              <div className="text-xs text-white/45">
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}