"use client";

import { useMemo, useState } from "react";

const parseNumberList = (raw: string) =>
  raw
    .split(/[\s,;]+/)
    .map((value) => value.trim())
    .filter(Boolean)
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value));

const roundTo = (value: number, digits = 2) =>
  Math.round(value * 10 ** digits) / 10 ** digits;

const formatNumber = (value: number) => {
  const rounded = roundTo(value, 2);
  return Number.isInteger(rounded) ? `${rounded}` : rounded.toFixed(2);
};

const median = (sorted: number[]) => {
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }
  return sorted[mid];
};

type ExercisesSectionProps = {
  id?: string;
};

export const ExercisesSection = ({ id }: ExercisesSectionProps) => {
  const [rawInput, setRawInput] = useState("");
  const parsedInput = useMemo(() => parseNumberList(rawInput), [rawInput]);
  const sortedInput = useMemo(
    () => [...parsedInput].sort((a, b) => a - b),
    [parsedInput],
  );

  const mean = useMemo(() => {
    if (!parsedInput.length) {
      return null;
    }
    const sum = parsedInput.reduce((acc, value) => acc + value, 0);
    return sum / parsedInput.length;
  }, [parsedInput]);

  const med = useMemo(() => {
    if (!sortedInput.length) {
      return null;
    }
    return median(sortedInput);
  }, [sortedInput]);

  const range = useMemo(() => {
    if (!sortedInput.length) {
      return null;
    }
    return sortedInput[sortedInput.length - 1] - sortedInput[0];
  }, [sortedInput]);

  return (
    <section id={id} className="w-full max-w-4xl px-4 scroll-mt-24">
      <h2 className="font-aktura text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 tracking-wide">Ćwiczenia interaktywne</h2>
      <div className="rounded-2xl border border-[var(--stat-border)] bg-[var(--stat-card)] p-5 md:p-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-[var(--stat-text)]">Wpisz swoje dane</h3>
            <p className="text-sm text-[var(--stat-muted)]">
              Wpisz liczby oddzielone przecinkiem, spacją, średnikiem lub nową linią.
            </p>
          </div>
          <span className="text-xs text-[var(--stat-muted)]">N = {parsedInput.length}</span>
        </div>
        <textarea
          value={rawInput}
          onChange={(event) => setRawInput(event.target.value)}
          rows={4}
          placeholder="np. 12, 14, 18, 20, 22"
          className="mt-4 w-full rounded-xl border border-[var(--stat-border)] bg-white/70 dark:bg-stone-950/60 px-4 py-3 text-sm text-[var(--stat-text)] placeholder:text-[var(--stat-muted)]"
        />
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-[var(--stat-border)] bg-[var(--stat-card)] p-3">
            <p className="text-xs uppercase text-[var(--stat-muted)]">Średnia</p>
            <p className="text-lg text-[var(--stat-text)]">
              {mean === null ? "—" : formatNumber(mean)}
            </p>
          </div>
          <div className="rounded-xl border border-[var(--stat-border)] bg-[var(--stat-card)] p-3">
            <p className="text-xs uppercase text-[var(--stat-muted)]">Mediana</p>
            <p className="text-lg text-[var(--stat-text)]">
              {med === null ? "—" : formatNumber(med)}
            </p>
          </div>
          <div className="rounded-xl border border-[var(--stat-border)] bg-[var(--stat-card)] p-3">
            <p className="text-xs uppercase text-[var(--stat-muted)]">Rozstęp</p>
            <p className="text-lg text-[var(--stat-text)]">
              {range === null ? "—" : formatNumber(range)}
            </p>
          </div>
        </div>
        {!parsedInput.length ? (
          <p className="mt-3 text-xs text-[var(--stat-muted)]">Dodaj dane, by zobaczyć wyniki.</p>
        ) : null}
      </div>
    </section>
  );
};
