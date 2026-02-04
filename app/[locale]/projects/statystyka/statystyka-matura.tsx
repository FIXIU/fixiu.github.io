"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const AMBER = "#d97706";

const tooltipStyles = {
  contentStyle: {
    background: "var(--stat-tooltip-bg)",
    border: "1px solid var(--stat-border)",
    borderRadius: "12px",
    color: "var(--stat-tooltip-text)",
  },
  labelStyle: { color: "var(--stat-tooltip-text)", fontWeight: 700 },
  itemStyle: { color: "var(--stat-tooltip-text)" },
};

const diagram2025Data = [
  { grade: "1", count: 1 },
  { grade: "2", count: 3 },
  { grade: "3", count: 4 },
  { grade: "4", count: 4 },
  { grade: "5", count: 5 },
  { grade: "6", count: 7 },
];

const diagram2024Data = [
  { grade: "1", count: 2 },
  { grade: "2", count: 7 },
  { grade: "3", count: 4 },
  { grade: "4", count: 3 },
  { grade: "5", count: 6 },
  { grade: "6", count: 4 },
];

const diagram2023Data = [
  { price: "5,05", count: 2 },
  { price: "5,60", count: 4 },
  { price: "5,70", count: 2 },
  { price: "6,00", count: 5 },
  { price: "6,30", count: 3 },
];

const parseAnswer = (value: string) => {
  const normalized = value.replace(",", ".").trim();
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
};

const AnswerBadge = ({
  state,
  idleLabel = "Wpisz odpowiedź",
}: {
  state: "idle" | "correct" | "wrong";
  idleLabel?: string;
}) => {
  if (state === "idle") {
    return <span className="text-xs text-[var(--stat-muted)]">{idleLabel}</span>;
  }
  if (state === "correct") {
    return <span className="text-xs text-emerald-500">Poprawna</span>;
  }
  return <span className="text-xs text-rose-500">Błędna odpowiedź</span>;
};

const HelpSteps = ({ steps }: { steps: string[] }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const total = steps.length;
  const visibleSteps = steps.slice(0, stepIndex);

  const label =
    stepIndex === 0 ? "Potrzebuję pomocy" : `${stepIndex}/${total}`;

  return (
    <div className="mt-4 rounded-xl border border-[var(--stat-border)] bg-[var(--stat-card)] p-4">
      <button
        type="button"
        onClick={() => setStepIndex((prev) => Math.min(prev + 1, total))}
        disabled={stepIndex >= total}
        className="rounded-full border border-amber-500/70 px-3 py-1 text-xs uppercase tracking-wide text-amber-700 dark:text-amber-200 transition disabled:cursor-not-allowed disabled:opacity-60"
      >
        {label}
      </button>
      {visibleSteps.length ? (
        <ol className="mt-3 list-decimal list-inside text-sm text-[var(--stat-muted)]">
          {visibleSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      ) : null}
    </div>
  );
};

const TaskCard = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) => (
  <div className="rounded-2xl border border-[var(--stat-border)] bg-[var(--stat-card)] p-5 shadow-inner">
    <div className="flex flex-col gap-2">
      <h4 className="text-lg font-black text-[var(--stat-text)]">{title}</h4>
      <p className="text-sm text-[var(--stat-muted)]">{description}</p>
    </div>
    <div className="mt-4">{children}</div>
  </div>
);

const YearBlock = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => (
  <div className="mt-8">
    <h3 className="text-xl sm:text-2xl font-black text-[var(--stat-text)]">{label}</h3>
    <div className="mt-4 grid gap-6">{children}</div>
  </div>
);

const DiagramCard = ({
  title,
  description,
  data,
  xKey,
}: {
  title: string;
  description: string;
  data: { [key: string]: string | number }[];
  xKey: string;
}) => (
  <TaskCard title={title} description={description}>
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 10 }}>
          <CartesianGrid stroke="var(--stat-grid)" strokeDasharray="3 3" />
          <XAxis
            dataKey={xKey}
            tick={{ fill: "var(--stat-axis)", fontSize: 12 }}
            axisLine={{ stroke: "var(--stat-axis)" }}
            tickLine={{ stroke: "var(--stat-axis)" }}
          />
          <YAxis
            tick={{ fill: "var(--stat-axis)", fontSize: 12 }}
            axisLine={{ stroke: "var(--stat-axis)" }}
            tickLine={{ stroke: "var(--stat-axis)" }}
          />
          <Tooltip {...tooltipStyles} />
          <Bar dataKey="count" fill={AMBER} radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </TaskCard>
);

const ClosedTaskCard = ({
  title,
  description,
  options,
  correctOption,
  steps,
}: {
  title: string;
  description: string;
  options: { label: string; value: string }[];
  correctOption: string;
  steps: string[];
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [state, setState] = useState<"idle" | "correct" | "wrong">("idle");

  return (
    <TaskCard title={title} description={description}>
      <div className="grid gap-2">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition ${
              selected === option.value
                ? "border-amber-400/70 bg-amber-500/10 text-[var(--stat-text)]"
                : "border-[var(--stat-border)] text-[var(--stat-muted)] hover:border-[var(--stat-axis)]"
            }`}
          >
            <input
              type="radio"
              name={title}
              value={option.value}
              checked={selected === option.value}
              onChange={() => setSelected(option.value)}
              className="accent-amber-500"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => {
            if (!selected) {
              return;
            }
            setState(selected === correctOption ? "correct" : "wrong");
          }}
          className="rounded-full border border-amber-500/70 px-4 py-2 text-sm text-amber-700 dark:text-amber-200 transition hover:border-amber-400 hover:text-amber-600 dark:hover:text-amber-100"
        >
          Sprawdź
        </button>
        <AnswerBadge state={state} idleLabel="Wybierz odpowiedź" />
      </div>
      <HelpSteps steps={steps} />
    </TaskCard>
  );
};

const OpenTaskCard = ({
  title,
  description,
  answer,
  steps,
  hint,
}: {
  title: string;
  description: string;
  answer: number;
  steps: string[];
  hint?: string;
}) => {
  const [input, setInput] = useState("");
  const [state, setState] = useState<"idle" | "correct" | "wrong">("idle");

  const parsed = useMemo(() => parseAnswer(input), [input]);

  return (
    <TaskCard title={title} description={description}>
      {hint ? <p className="text-xs text-[var(--stat-muted)]">{hint}</p> : null}
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <input
          type="text"
          inputMode="decimal"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="w-28 rounded-lg border border-[var(--stat-border)] bg-white/70 dark:bg-stone-950/60 px-3 py-2 text-sm text-[var(--stat-text)]"
          placeholder="np. 4,5"
        />
        <button
          type="button"
          onClick={() => {
            if (parsed === null) {
              setState("wrong");
              return;
            }
            setState(Math.abs(parsed - answer) <= 0.01 ? "correct" : "wrong");
          }}
          className="rounded-full border border-amber-500/70 px-4 py-2 text-sm text-amber-700 dark:text-amber-200 transition hover:border-amber-400 hover:text-amber-600 dark:hover:text-amber-100"
        >
          Sprawdź
        </button>
        <AnswerBadge state={state} />
      </div>
      <HelpSteps steps={steps} />
    </TaskCard>
  );
};

type MaturaTasksSectionProps = {
  id?: string;
};

export const MaturaTasksSection = ({ id }: MaturaTasksSectionProps) => {
  return (
    <section id={id} className="w-full max-w-4xl px-4 scroll-mt-24">
      <div className="mb-6">
        <h2 className="font-aktura text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide">Zadania maturalne</h2>
        <p className="text-sm text-[var(--stat-muted)]">Zestawy z lat 2025–2010</p>
      </div>

      <YearBlock label="2025">
        <ClosedTaskCard
          title="2025 • zad. 29 (zamknięte)"
          description="Średnia arytm. siedmiu liczb: 1, 2, 3, 4, 5, x, y jest równa 3. Suma x + y = ?"
          options={[
            { label: "A. 4", value: "A" },
            { label: "B. 5", value: "B" },
            { label: "C. 6", value: "C" },
            { label: "D. 7", value: "D" },
          ]}
          correctOption="C"
          steps={[
            "Średnia × liczba elementów: 3 × 7 = 21.",
            "Suma znanych liczb: 1 + 2 + 3 + 4 + 5 = 15.",
            "x + y = 21 − 15 = 6.",
            "Wybór odpowiedzi: C.",
          ]}
        />

        <DiagramCard
          title="2025 • zad. 30 (diagram słupkowy)"
          description="Wyniki sprawdzianu w klasie (24 uczniów)."
          data={diagram2025Data}
          xKey="grade"
        />

        <OpenTaskCard
          title="2025 • zad. 30.1 (otwarte)"
          description="Na diagramie: wyniki sprawdzianu w klasie (24 uczniów). Mediana ocen z tego sprawdzianu."
          answer={4.5}
          hint="Odpowiedź podaj jako liczbę (np. 4,5)."
          steps={[
            "Ułóż oceny rosnąco wg liczebności.",
            "Dla 24 uczniów mediana to średnia z 12. i 13. wyniku.",
            "12. wynik to 4, 13. wynik to 5.",
            "Mediana = (4 + 5) / 2 = 4,5.",
          ]}
        />

        <OpenTaskCard
          title="2025 • zad. 30.2 (otwarte)"
          description="Ta sama sytuacja. Dominanta (najczęstsza ocena) tych wyników."
          answer={6}
          hint="Odpowiedź podaj jako liczbę całkowitą."
          steps={[
            "Dominanta to wartość o największej liczebności.",
            "Najwięcej uczniów ma ocenę 6 (7 osób).",
            "Dominanta = 6.",
          ]}
        />
      </YearBlock>

      <YearBlock label="2024">
        <DiagramCard
          title="2024 • zad. 29 (diagram słupkowy)"
          description="Rozkład ocen ze sprawdzianu w klasie."
          data={diagram2024Data}
          xKey="grade"
        />
        <ClosedTaskCard
          title="2024 • zad. 29 (zamknięte)"
          description="Na diagramie rozkład ocen ze sprawdzianu w klasie. Mediana ocen uzyskanych przez uczniów."
          options={[
            { label: "A. 4,5", value: "A" },
            { label: "B. 4", value: "B" },
            { label: "C. 3,5", value: "C" },
            { label: "D. 3", value: "D" },
          ]}
          correctOption="C"
          steps={[
            "Suma liczebności to 26 uczniów.",
            "Mediana dla 26 wyników to średnia z 13. i 14. wartości.",
            "Do oceny 3 włącznie jest 13 uczniów, następna ocena to 4.",
            "Mediana = (3 + 4) / 2 = 3,5 (odp. C).",
          ]}
        />
      </YearBlock>

      <YearBlock label="2023">
        <DiagramCard
          title="2023 • zad. 29 (diagram słupkowy)"
          description="Ceny pomidorów w 16 sklepach."
          data={diagram2023Data}
          xKey="price"
        />
        <ClosedTaskCard
          title="2023 • zad. 29.1 (zamknięte)"
          description="Na diagramie ceny pomidorów w 16 sklepach. Mediana ceny 1 kg pomidorów."
          options={[
            { label: "A. 5,80 zł", value: "A" },
            { label: "B. 5,73 zł", value: "B" },
            { label: "C. 5,85 zł", value: "C" },
            { label: "D. 6,00 zł", value: "D" },
            { label: "E. 5,70 zł", value: "E" },
          ]}
          correctOption="C"
          steps={[
            "Jest 16 cen, więc mediana to średnia z 8. i 9. wartości.",
            "Po 5,05 i 5,60 mamy 6 wartości, po 5,70 mamy 8 wartości.",
            "8. wartość = 5,70, 9. wartość = 6,00.",
            "Mediana = (5,70 + 6,00) / 2 = 5,85 (odp. C).",
          ]}
        />
        <ClosedTaskCard
          title="2023 • zad. 29.2 (zamknięte)"
          description="Ta sama sytuacja. Średnia cena 1 kg pomidorów."
          options={[
            { label: "A. 5,80 zł", value: "A" },
            { label: "B. 5,73 zł", value: "B" },
            { label: "C. 5,85 zł", value: "C" },
            { label: "D. 6,00 zł", value: "D" },
            { label: "E. 5,70 zł", value: "E" },
          ]}
          correctOption="A"
          steps={[
            "Policz sumę ważoną: 2×5,05 + 4×5,60 + 2×5,70 + 5×6,00 + 3×6,30.",
            "Suma wynosi 92,8.",
            "Średnia = 92,8 / 16 = 5,80 (odp. A).",
          ]}
        />
      </YearBlock>

      <YearBlock label="2018 (NP18)">
        <ClosedTaskCard
          title="2018 • zad. 23 (zamknięte)"
          description="Dane: m liczb równych 2 oraz m liczb równych 4. Odchylenie standardowe tego zestawu."
          options={[
            { label: "A. 2", value: "A" },
            { label: "B. 1", value: "B" },
            { label: "C. 1/√2", value: "C" },
            { label: "D. √2", value: "D" },
          ]}
          correctOption="B"
          steps={[
            "Średnia z par 2 i 4 to 3.",
            "Odchylenia od średniej: 1 i 1.",
            "Wariancja = (1² + 1²) / 2 = 1.",
            "Odchylenie standardowe = 1 (odp. B).",
          ]}
        />
      </YearBlock>

      <YearBlock label="2017 (NP17)">
        <ClosedTaskCard
          title="2017 • zad. 24 (zamknięte)"
          description="Średnia arytm. liczb 3, 5, 7, 9, x, 15, 17, 19 jest równa 11. Oblicz x."
          options={[
            { label: "A. 1", value: "A" },
            { label: "B. 2", value: "B" },
            { label: "C. 11", value: "C" },
            { label: "D. 13", value: "D" },
          ]}
          correctOption="D"
          steps={[
            "Suma 8 liczb = 8 × 11 = 88.",
            "Suma znanych = 3 + 5 + 7 + 9 + 15 + 17 + 19 = 75.",
            "x = 88 − 75 = 13 (odp. D).",
          ]}
        />
      </YearBlock>

      <YearBlock label="2016 (NP16)">
        <ClosedTaskCard
          title="2016 • zad. 25 (zamknięte)"
          description="Średnia arytm. liczb 31, 16, 25, 29, 27, x jest równa x/2. Mediana tych liczb jest równa:"
          options={[
            { label: "A. 26", value: "A" },
            { label: "B. 27", value: "B" },
            { label: "C. 28", value: "C" },
            { label: "D. 29", value: "D" },
          ]}
          correctOption="C"
          steps={[
            "Suma = 31 + 16 + 25 + 29 + 27 + x = 128 + x.",
            "(128 + x)/6 = x/2 ⇒ 128 + x = 3x ⇒ x = 64.",
            "Po uporządkowaniu: 16, 25, 27, 29, 31, 64.",
            "Mediana = (27 + 29)/2 = 28 (odp. C).",
          ]}
        />
      </YearBlock>

      <YearBlock label="2015 (NP15)">
        <ClosedTaskCard
          title="2015 • zad. 24 (zamknięte)"
          description="Średnia zestawu 2, 4, 7, 8, 9 jest taka sama jak średnia zestawu 2, 4, 7, 8, 9, x. Wynika stąd, że:"
          options={[
            { label: "A. x = 0", value: "A" },
            { label: "B. x = 3", value: "B" },
            { label: "C. x = 5", value: "C" },
            { label: "D. x = 6", value: "D" },
          ]}
          correctOption="D"
          steps={[
            "Jeśli średnia się nie zmienia, nowy element musi być równy średniej.",
            "Średnia z 2, 4, 7, 8, 9 to 30/5 = 6.",
            "Zatem x = 6 (odp. D).",
          ]}
        />
      </YearBlock>

      <div className="mt-12">
        <h3 className="text-xl sm:text-2xl font-black text-[var(--stat-text)]">Sprawdzian (SP)</h3>
        <p className="text-sm text-[var(--stat-muted)]">Zadania ze starszej formuły.</p>

        <YearBlock label="2014 (SP14)">
          <ClosedTaskCard
            title="2014 • zad. 6 (zamknięte)"
            description="Mediana zestawu liczb 2, 12, a, 10, 5, 3 jest równa 7. Zatem:"
            options={[
              { label: "A. a = 4", value: "A" },
              { label: "B. a = 6", value: "B" },
              { label: "C. a = 7", value: "C" },
              { label: "D. a = 9", value: "D" },
            ]}
            correctOption="D"
            steps={[
              "Po uporządkowaniu: 2, 3, 5, 10, 12 oraz a.",
              "Mediana to średnia 3. i 4. liczby.",
              "Aby mediana była 7, potrzebujemy pary 5 i 9.",
              "Zatem a = 9 (odp. D).",
            ]}
          />
        </YearBlock>

        <YearBlock label="2013">
          <ClosedTaskCard
            title="2013 • zad. 24 (zamknięte)"
            description="Mediana zestawu liczb 1, 2, 3, x, 5, 8 jest równa 4. Zatem:"
            options={[
              { label: "A. x = 2", value: "A" },
              { label: "B. x = 3", value: "B" },
              { label: "C. x = 4", value: "C" },
              { label: "D. x = 5", value: "D" },
            ]}
            correctOption="D"
            steps={[
              "Po uporządkowaniu 3. i 4. liczba tworzą medianę.",
              "Mediana = (3 + x)/2 = 4.",
              "Stąd x = 5 (odp. D).",
            ]}
          />
        </YearBlock>

        <YearBlock label="2012 (SP12)">
          <ClosedTaskCard
            title="2012 • zad. 22 (zamknięte)"
            description="Średnia cena sześciu akcji to 500 zł. Za pięć akcji zapłacono 2300 zł. Cena szóstej akcji wynosi:"
            options={[
              { label: "A. 400 zł", value: "A" },
              { label: "B. 500 zł", value: "B" },
              { label: "C. 600 zł", value: "C" },
              { label: "D. 700 zł", value: "D" },
            ]}
            correctOption="D"
            steps={[
              "Suma wszystkich cen = 6 × 500 = 3000.",
              "Cena szóstej akcji = 3000 − 2300 = 700 zł.",
              "Odpowiedź: D.",
            ]}
          />
        </YearBlock>

        <YearBlock label="2011 (SP11)">
          <ClosedTaskCard
            title="2011 • zad. 23 (zamknięte)"
            description="W klasie: 6 uczniów ma 3 osoby w rodzinie, 12 uczniów ma 4 osoby, 2 uczniów ma x osób. Średnia liczba osób w rodzinie to 4. Zatem:"
            options={[
              { label: "A. x = 4", value: "A" },
              { label: "B. x = 5", value: "B" },
              { label: "C. x = 6", value: "C" },
              { label: "D. x = 7", value: "D" },
            ]}
            correctOption="D"
            steps={[
              "Średnia ważona: (3×6 + 4×12 + x×2) / 20 = 4.",
              "18 + 48 + 2x = 80 ⇒ 2x = 14.",
              "x = 7 (odp. D).",
            ]}
          />
        </YearBlock>

        <YearBlock label="2010 (SP10)">
          <ClosedTaskCard
            title="2010 • zad. 22 (zamknięte)"
            description="Średnia arytm. liczb x, 3, 1, 4, 1, 5, 1, 4, 1, 5 jest równa 3. Zatem:"
            options={[
              { label: "A. x = 2", value: "A" },
              { label: "B. x = 3", value: "B" },
              { label: "C. x = 4", value: "C" },
              { label: "D. x = 5", value: "D" },
            ]}
            correctOption="D"
            steps={[
              "Suma 10 liczb = 10 × 3 = 30.",
              "Suma znanych = 3 + 1 + 4 + 1 + 5 + 1 + 4 + 1 + 5 = 25.",
              "x = 30 − 25 = 5 (odp. D).",
            ]}
          />
        </YearBlock>
      </div>
    </section>
  );
};
