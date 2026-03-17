"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

export default function ReportsListPage() {
  const [reports, setReports] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.listReports().then(r => { setReports(r); setLoading(false); });
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <header className="px-6 py-4 border-b flex items-center gap-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <Link href="/admin" className="text-sm" style={{ color: "var(--muted)" }}>← Dashboard</Link>
        <h1 className="text-xl font-bold">Session Reports</h1>
      </header>

      <main className="p-6 max-w-3xl mx-auto">
        {loading && <p style={{ color: "var(--muted)" }}>Loading…</p>}
        {!loading && reports.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg" style={{ color: "var(--muted)" }}>No reports yet</p>
            <p className="text-sm mt-2" style={{ color: "var(--muted)" }}>Reports are generated when a session ends</p>
          </div>
        )}
        <div className="space-y-2">
          {reports.map(id => {
            const parts  = id.split("_");
            const date   = parts[0] ?? "";
            const time   = parts[1] ?? "";
            const label  = parts.slice(2).join("_");
            const human  = date && time
              ? `${date.slice(0,4)}-${date.slice(4,6)}-${date.slice(6)} ${time.slice(0,2)}:${time.slice(2,4)}:${time.slice(4)}`
              : id;
            return (
              <Link
                key={id}
                href={`/report/${id}`}
                className="flex items-center justify-between px-5 py-4 rounded-xl transition-all hover:scale-[1.01]"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              >
                <div>
                  <p className="font-semibold">{label}</p>
                  <p className="text-sm mt-0.5" style={{ color: "var(--muted)" }}>{human}</p>
                </div>
                <span className="text-sm" style={{ color: "#2563eb" }}>View →</span>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
