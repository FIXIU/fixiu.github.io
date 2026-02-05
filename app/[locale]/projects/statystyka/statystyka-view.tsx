"use client";

import { Icon } from "@iconify/react";
import { useState, type MouseEvent } from "react";
import { InlineMath, BlockMath } from "react-katex";
import {
  INITIAL_DATA,
  randomizeData,
  HistogramCard,
  ScatterCard,
  BoxplotCard,
} from "./statystyka-charts";
import { ExercisesSection } from "./statystyka-exercises";
import { MaturaTasksSection } from "./statystyka-matura";
import { getLenis } from "../../../components/smooth-scroll";

export default function StatystykaView() {
  const [chartData, setChartData] = useState<number[]>(INITIAL_DATA);
  const handleRandomize = () => setChartData(randomizeData());
  const handleTocClick =
    (targetId: string) => (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      const element = document.getElementById(targetId);
      if (!element) {
        return;
      }
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(element, { offset: -96 });
      } else {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      history.replaceState(null, "", `#${targetId}`);
    };
  const tocItems = [
    { id: "przedmowa", label: "Przedmowa" },
    { id: "czym-jest-statystyka", label: "Czym jest statystyka" },
    { id: "rozdzial-1", label: "Rozdział I. Zbieranie danych" },
    { id: "rozdzial-2", label: "Rozdział II. Miary położenia" },
    { id: "rozdzial-3", label: "Rozdział III. Rozproszenie" },
    { id: "rozdzial-4", label: "Rozdział IV. Odchylenie standardowe" },
    { id: "rozdzial-5", label: "Rozdział V. Centyle i kwartyle" },
    { id: "rozdzial-6", label: "Rozdział VI. Praktyka uczniowska" },
    { id: "cwiczenia", label: "Ćwiczenia interaktywne" },
    { id: "matura", label: "Zadania maturalne" },
  ];
  const tocLinkClass =
    "group inline-flex w-full items-start gap-2 rounded-md px-2 py-1 text-left transition decoration-[var(--stat-border)] underline underline-offset-4 hover:decoration-[var(--stat-accent)] hover:bg-[var(--stat-card)] hover:text-[var(--stat-text)]";
  return (
    <main className="statystyka-theme bg-[var(--stat-bg)] text-[var(--stat-text)] min-h-screen flex flex-col items-center font-sentient gap-10 sm:gap-12">
      <section className="w-full flex flex-col gap-5 items-center justify-center my-10 px-4">
        <h1 className="text-5xl sm:text-7xl lg:text-9xl font-aktura tracking-wide text-[var(--stat-text)] text-center">
          Statystyka
        </h1>
      </section>
      <section id="przedmowa" className="w-full max-w-4xl px-4 scroll-mt-24">
        <h3 className="text-xl sm:text-2xl font-black my-1">Przedmowa</h3>
        <p>
          Przeto w tym dziale zajmiemy się sztuką statystyki, czyli rachowaniem,
          liczeniem i porządkowaniem wszelakich liczb, aby z nich prawdę
          wydobyć. Będziem tu rozważać, jako dane zbierać, średnie wywodzić i
          rozproszenie mierzyć, by w gąszczu cyfr nie zabłądzić. Niechaj tedy
          statystyka posłuży ku lepszemu rozumieniu świata i wszelkich w nim
          spraw liczbowych.
        </p>
      </section>
      <section id="spis-tresci" className="w-full max-w-4xl px-4 scroll-mt-24">
        <h3 className="text-xl sm:text-2xl font-black my-1">Czego się nauczymy</h3>
        {/* Spis treści */}
        <nav aria-label="Spis treści" className="mt-3">
          <ul className="list-none grid gap-2 sm:grid-cols-2">
            {tocItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={handleTocClick(item.id)}
                  className={tocLinkClass}
                >
                  <span>{item.label}</span>
                  <Icon
                    icon="ph:arrow-down-left-bold"
                    width={16}
                    className="mt-1 text-[var(--stat-muted)] ease-out duration-300 group-hover:text-amber-600"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      <section id="czym-jest-statystyka" className="w-full max-w-4xl px-4 scroll-mt-24">
        <h3 className="text-xl sm:text-2xl font-black my-1">Czym jest Statystyka</h3>
        <p>
          Statystyka jest to nauka o liczb wielości, która uczy, jako dane
          zbierać, porządkować i rozważać, by z nich sens i prawidła wydobyć. Za
          jej pomocą obliczamy średnie, mediany i dominanty, mierzymy
          rozproszenie przez odchylenie, a także poznajemy, jak wielkie jest
          prawdopodobieństwo zdarzeń losowych. Służy ona ku temu, by nie
          zgadywać w ciemno, lecz na rachunku i rozumie się opierać.
        </p>
      </section>

      <div className="w-full max-w-4xl h-px bg-[var(--stat-divider)]"></div>
      
      <section id="rozdzial-1" className="w-full max-w-4xl px-4 scroll-mt-24">
        <h2 className="font-aktura text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 tracking-wide">
          Rozdział <b className="font-normal tracking-tighter">I.</b> O
          zbieraniu danych i ich porządkowaniu
        </h2>
        <p>
          Pierwej nim rachunki poczniem, trzeba nam dane zebrać, a potem je w
          należytym ładzie postawić. Albowiem liczby, choćby najprawdziwsze, bez
          porządku są jako ziarno w worku rozdartym - wiele go jest, lecz
          pożytku mało.
        </p>
        <div className="my-4">
          <p>Co tedy czynić należy:</p>
          <ul className="list-disc list-inside w-full">
            <li>
              Spisać dane w szeregu, od najmniejszej ku największej (albo
              odwrotnie), by oko i rozum łatwiej je ogarnęły.
            </li>
            <li>
              Zliczyć, jako często która wartość się zdarza (to jest częstość).
            </li>
            <li>
              Uczynić tablicę, w której wartości i częstości w parze stoją, by
              rachunek był rychły i pewny.
            </li>
          </ul>
        </div>
        <p>
          Dla przykladu, weźmy ocen garść: 2, 5, 3, 5, 4. Uporządkowawszy je, otrzymamy:{" "}
          <InlineMath math="2, 3, 4, 5, 5" />. Teraz widać jaśniej, co się w sakiewce kryje.
        </p>
        <p className="mt-4">
          Gdy danych mnogo, można je w <b>przedziały</b> zebrać (niby do
          sakiewek osobnych), aby zamiast tysiąca liczb mieć kilka grup
          porządnych.
        </p>
        <HistogramCard data={chartData} onRandomize={handleRandomize} />
      </section>

      <div className="w-full max-w-4xl h-px bg-[var(--stat-divider)]"></div>

      <section id="rozdzial-2" className="w-full max-w-4xl px-4 scroll-mt-24">
        <h2 className="font-aktura text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 tracking-wide">
          Rozdział <b className="font-normal tracking-tighter">II.</b> O miarach
          położenia: średnia, mediana i dominanta
        </h2>
        <p>
          W statystyce często szukamy jednej liczby, która cały zbiór niejako
          „opowiada”. Tę zowiemy <b>miarą położenia</b>.
        </p>
        <div className="my-4 mt-8">
          <h3 className="text-xl sm:text-2xl font-black my-2">1. Średnia arytmetyczna</h3>
          <p>
            Średnia jest to liczba, którą otrzymasz, gdy wszystkie wartości
            zsumujesz, a potem przez ich liczbę podzielisz.
          </p>
          <div>
            <p>Dla danych <InlineMath math="x_1, x_2, \dots, x_n" /> średnia arytmetyczna jest:</p>
            <BlockMath math="\bar{x} = \frac{x_1 + x_2 + \cdots + x_n}{n}" />
            <p>
              <b>Przykład:</b> Dla liczb 2, 4, 9, sumujemy <InlineMath math="2+4+9=15" />, a że liczb jest trzy, dzielimy przez 3. Średnia wynosi 5.
            </p>
            <p className="mt-2">
              Średnia bywa pożyteczna, lecz strzec się trzeba, bo jedna wartość
              wielce wielka lub mała może ją “skrzywić”, jako wiatr chorągiew.
            </p>
          </div>
        </div>
        <div className="my-4 mt-8">
          <h3 className="text-xl sm:text-2xl font-black my-2">2. Średnia ważona</h3>
          <p>Gdy każda wartość <InlineMath math="x_i" /> ma wagę <InlineMath math="w_i" />, (np. ocenę z wagą, albo częstość), tedy średnia ważona jest:</p>
          <BlockMath math="\bar{x}_w = \frac{w_1 x_1 + w_2 x_2 + \cdots + w_n x_n}{w_1 + w_2 + \cdots + w_n}" />
        </div>
        <div className="my-4 mt-8">
          <h3 className="text-xl sm:text-2xl font-black my-2">3. Mediana</h3>
          <p>
            Mediana jest to wartość środkowa, gdy dane w porządku stoją. Jest
            ona jak sędzia między liczbami — nie daje się łatwo omamić
            skrajnościom.
          </p>
          <ul className="list-disc list-inside w-full my-4">
            <li>
              Gdy danych jest nieparzyście: mediana to liczba w samym środku. (<InlineMath math="x_{\frac{n+1}{2}}" />)
              <br/>
              <i>Przykład:</i> Dla 2, 5, <b>8</b>, 10, 20 medianą jest 8.
            </li>
            <li>Gdy parzyście: mediana to średnia z dwóch środkowych. (<InlineMath math="\frac{x_{\frac{n}{2}} + x_{\frac{n}{2} + 1}}{2}" />)
              <br/>
              <i>Przykład:</i> Dla 2, 5, <b>8, 10</b>, 15, 20 średnia z 8 i 10 to 9.
            </li>
          </ul>
        </div>
        <div className="mt-8">
          <h3 className="text-xl sm:text-2xl font-black mt-2">4. Dominanta</h3>
          <p>
            Dominanta (niekiedy zwana modą) jest to wartość, która <b>najczęściej</b>
            występuje. Bywa, że jest jedna, bywa że dwie, a bywa też, że brak
            jej całkiem, gdy każda wartość jest równie rzadka.
            <br/>
            <i>Przykład:</i> W zbiorze 1, 3, 3, 7 dominantą jest 3.
          </p>
        </div>
      </section>

      <div className="w-full max-w-4xl h-px bg-[var(--stat-divider)]"></div>

      <section id="rozdzial-3" className="w-full max-w-4xl px-4 scroll-mt-24">
        <h2 className="font-aktura text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 tracking-wide">
          Rozdział <b className="font-normal tracking-tighter">III.</b> O
          rozproszeniu: jako mierzyć, czy liczby trzymają się kupy
        </h2>
        <p>
          Nie dość wiedzieć, gdzie „środek” się znajduje. Trzeba też poznać, czy
          dane są ściśnięte jak drużyna w szyku, czy rozbiegane jak gęsi po
          polu.
        </p>
        <div className="my-4 mt-8">
          <h3 className="text-xl sm:text-2xl font-black my-2">1. Rozstęp</h3>
          <p>
            Rozstęp jest to różnica między największą a najmniejszą wartością:
          </p>
          <BlockMath math="Rozstęp = x_{max} - x_{min}" />
          <p>
            Prosty jest, lecz bywa zdradliwy, bo opiera się jeno na dwóch
            krańcach.
          </p>
        </div>
        <div className="mt-8">
          <h3 className="text-xl sm:text-2xl font-black my-2">
            2. Wariancja i odchylenie standardowe{" "}
            {/* WARIANCJA TODO: SPRAWDZIC CZY JEST TO W PODSTAWIE PROGRAMOWEJ */}
          </h3>
          <p>
            Wariancja mierzy, jako bardzo dane odbiegają od średniej, a
            odchylenie standardowe jest jej pierwiastkiem, przeto łatwiej je
            pojmować, bo ma tę samą „miarę” co dane.
          </p>
          <p className="mt-4">
            Dla danych <InlineMath math="x_1, x_2, \dots, x_n" /> oraz średniej{" "}
            <InlineMath math="\bar{x}" />:
          </p>
          {/* <p className="mt-4">Wariancja:</p>
          <div className="flex flex-col md:flex-row w-full gap-4 items-center justify-center">
            <BlockMath math="s^2 = \frac{1}{n} \sum_{i=1}^{n} (x_i - \bar{x})^2" />
            <p>lub</p>
            <BlockMath math="s^2 = \frac{(x_1-\bar{x})^2 + \cdots + (x_n-\bar{x})^2}{n}" />
          </div> */}
          <p className="mt-4">Odchylenie standardowe:</p>
          <BlockMath math="s = \sqrt{s^2}" />
          <div className="my-4 p-4 border border-[var(--stat-border)] rounded-lg bg-[var(--stat-card)]">
            <p className="font-bold mb-2">Przykład rachuby:</p>
            <p>Mamy liczby: 2, 4, 6. Średnia ich to 4.</p>
            <ul className="list-disc list-inside my-2">
              <li>Odejmujemy średnią od każdej: <InlineMath math="2-4=-2" />, <InlineMath math="4-4=0" />, <InlineMath math="6-4=2" />.</li>
              <li>Podnosimy do kwadratu: <InlineMath math="(-2)^2=4" />, <InlineMath math="0^2=0" />, <InlineMath math="2^2=4" />.</li>
              <li>Średnia z tych kwadratów (wariancja): <InlineMath math="\frac{4+0+4}{3} = \frac{8}{3} \approx 2.67" />.</li>
              <li>Odchylenie standardowe: <InlineMath math="\sqrt{2.67} \approx 1.63" />.</li>
            </ul>
          </div>
          <p className="mt-4">
            Im większe <InlineMath math="s" />, tym dane bardziej rozproszone;
            im mniejsze, tym trzymają się bliżej średniej.
          </p>
          <ScatterCard data={chartData} onRandomize={handleRandomize} />
        </div>
      </section>
      
      <div className="w-full max-w-4xl h-px bg-[var(--stat-divider)]"></div>

      <section id="rozdzial-4" className="w-full max-w-4xl px-4 scroll-mt-24">
        <h2 className="font-aktura text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 tracking-wide">
          Rozdział <b className="font-normal tracking-tighter">IV.</b> Więcej o odchyleniu standardowym (także dla danych pogrupowanych) i jego rozumieniu
        </h2>
        <div className="my-4 mt-8">
          <h3 className="text-xl sm:text-2xl font-black my-2">1. Odchylenie standardowe dla danych niepogrupowanych</h3>
          <p>Najpierw liczysz średnią <InlineMath math="\bar{x}" />, a potem:</p>
          <BlockMath math="s = \sqrt{\frac{(x_1-\bar{x})^2 + \cdots + (x_n-\bar{x})^2}{n}}" />
        </div>
        <div className="my-4 mt-8">
          <h3 className="text-xl sm:text-2xl font-black my-2">2. Odchylenie standardowe dla danych pogrupowanych</h3>
          <p>
            Gdy dane są zebrane w grupy (przedziały), a dla każdej grupy bierzesz
            środek przedziału <InlineMath math="m_i" /> oraz liczebność
            (częstość) <InlineMath math="n_i" />, przy czym{" "}
            <InlineMath math="N = n_1 + n_2 + \dots + n_k" />, to średnia (dla
            danych pogrupowanych) jest:
          </p>
          <BlockMath math="\bar{x} = \frac{n_1 m_1 + n_2 m_2 + \cdots + n_k m_k}{N}" />
          <p>a odchylenie standardowe:</p>
          <BlockMath math="s = \sqrt{\frac{n_1(m_1 - \bar{x})^2 + n_2(m_2 - \bar{x})^2 + \cdots + n_k(m_k - \bar{x})^2}{N}}" />
        </div>
        <div className="mt-8">
          <h3 className="text-xl sm:text-2xl font-black my-2">3. Interpretacja dla danych empirycznych</h3>
          <p>Odchylenie standardowe <InlineMath math="s" /> mówi, jak bardzo wyniki (empiryczne, z pomiaru) odbiegają od średniej:</p>
          <ul className="list-disc list-inside w-full my-4">
            <li>Jeśli <InlineMath math="s" /> jest małe, wyniki są blisko średniej (mały rozrzut).</li>
            <li>Jeśli <InlineMath math="s" /> jest duże, wyniki są daleko od średniej (duży rozrzut).</li>
          </ul>
          <p>W praktyce:</p>
          <ul className="list-disc list-inside w-full my-4">
            <li>Wynik w przedziale <InlineMath math="\bar{x} \pm s" /> oznacza, że wynik jest blisko średniej (typowy).</li>
            <li>Wynik poza przedziałem <InlineMath math="\bar{x} \pm 2s" /> oznacza, że wynik jest nietypowy (daleko od średniej).</li>
          </ul>
        </div>
      </section>

      <div className="w-full max-w-4xl h-px bg-[var(--stat-divider)]"></div>

      <section id="rozdzial-5" className="w-full max-w-4xl px-4 scroll-mt-24">
        <h2 className="font-aktura text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 tracking-wide">
          Rozdział <b className="font-normal tracking-tighter">V.</b> O skali Centylowej i Kwartylach
        </h2>
        <div className="mb-8">
            <h3 className="text-xl sm:text-2xl font-black my-2">1. Co to jest Centyl?</h3>
            <p><b>Centyl</b> (p-ty centyl) jest to taka wartość, poniżej której leży p% uporządkowanych wyników.</p>
            <div>
            <p>Niech dane będą w porządku rosnącym:</p>
            <BlockMath math="x_1 \leq x_2 \leq \cdots \leq x_n" />
            <p>W praktyce szkolnej często bierze się pozycję:</p>
            <BlockMath math="k = \frac{p}{100} \cdot (n + 1)" />
            <p>a tedy p-ty centyl przyjmujem jako:</p>
            <BlockMath math="C_p = x_k" />
            <p>A jeśli chcesz ocenić, na którym centylu stoi dany wynik <InlineMath math="x" />, liczysz, ile wyników nie jest odeń większych:</p>
            <BlockMath math="p = \frac{\text{liczba wyników} \leq x}{n} \cdot 100\%" />
            </div>
        </div>

        <div>
             <h3 className="text-xl sm:text-2xl font-black my-2">2. Kwartyle</h3>
             <p>Kwartyle dzielą zbiór uporządkowany na cztery równe części, niby chleb na cztery ćwiartki.</p>
             <ul className="list-disc list-inside mt-2">
                <li><InlineMath math="Q_1" /> (pierwszy kwartyl) — dzieli 25% dołu od 75% góry (toć to 25. centyl).</li>
                <li><InlineMath math="Q_2" /> (drugi kwartyl) — to samo co <b>Mediana</b> (50. centyl).</li>
                <li><InlineMath math="Q_3" /> (trzeci kwartyl) — dzieli 75% dołu od 25% góry (toć to 75. centyl).</li>
             </ul>
             <p className="mt-2">Rozstęp międzykwartylowy (IQR) to <InlineMath math="IQR = Q_3 - Q_1" />, co mówi nam o rozrzucie w "brzuchu" danych, pomijając ogony.</p>
             <BoxplotCard data={chartData} onRandomize={handleRandomize} />
        </div>
      </section>
      
      <div className="w-full max-w-4xl h-px bg-[var(--stat-divider)]"></div>

      <section id="rozdzial-6" className="w-full max-w-4xl px-4 scroll-mt-24">
        <h2 className="font-aktura text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 tracking-wide">
          Rozdział <b className="font-normal tracking-tighter">VI.</b> Praktyka
          uczniowska: pytania, któreć się przydadzą
        </h2>
        <p>Abyś nie błądził, pytaj zawsze:</p>
        <ul className="list-disc list-inside w-full my-4">
          <li>Co jest dane, a co mam znaleźć?</li>
          <li>Jak dane uporządkować, by łatwiej je rozważać?</li>
          <li>
            Czy pytają o „typową wartość” (średnia/mediana/dominanta), czy o
            „rozrzut” (rozstęp/odchylenie)?
          </li>
          <li>Jakie wzory zastosować, by rachunek był pewny?</li>
        </ul>
      </section>

      <div className="w-full max-w-4xl h-px bg-[var(--stat-divider)]"></div>

      <ExercisesSection id="cwiczenia" />

      <div className="w-full max-w-4xl h-px bg-[var(--stat-divider)]"></div>

      <MaturaTasksSection id="matura" />
      <div className="h-[5vh]"></div>
    </main>
  );
}
