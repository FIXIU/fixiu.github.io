"use client";

import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { InlineMath, BlockMath } from "react-katex";

export default function StatystykaView() {
  return (
    <main className="bg-stone-900 text-stone-200 min-h-screen flex flex-col items-center font-sentient gap-12">
      <section className="w-full flex flex-col gap-5 items-center justify-center my-10">
        <h1 className="text-9xl font-aktura text-stone-50 tracking-wide">
          Statystyka
        </h1>
        <h2 className="text-4xl font-aktura text-stone-300 tracking-wide">
          Część Podstawowa
        </h2>
      </section>
      <section className="w-4xl px-4">
        <h3 className="text-2xl font-black my-1">Przedmowa</h3>
        <p>
          Przeto w tym dziale zajmiemy się sztuką statystyki, czyli rachowaniem,
          liczeniem i porządkowaniem wszelakich liczb, aby z nich prawdę
          wydobyć. Będziem tu rozważać, jako dane zbierać, średnie wywodzić i
          rozproszenie mierzyć, by w gąszczu cyfr nie zabłądzić. Niechaj tedy
          statystyka posłuży ku lepszemu rozumieniu świata i wszelkich w nim
          spraw liczbowych.
        </p>
      </section>
      <section className="w-4xl px-4">
        <h3 className="text-2xl font-black my-1">Czego się nauczymy</h3>
        {/* Spis treści */}
        <ul className="list-disc list-inside w-full">
          <li className="pr-1 w-fit flex flex-row items-center gap-1 ease-out duration-100 bg-transparent decoration-1 group decoration-solid underline decoration-stone-500 hover:decoration-amber-600 hover:decoration-2 hover:text-stone-100 hover:bg-stone-800">
            <p>
              Jak gromadzić liczby i w ładzie je ustawiać, aby rachunek był
              jasny i pewny
            </p>
            <Icon
              icon="ph:arrow-down-left-bold"
              width={16}
              className="text-stone-500 ease-out duration-300 group-hover:text-amber-600"
            />
          </li>
          <li className="pr-1 w-fit flex flex-row items-center gap-1 ease-out duration-100 bg-transparent decoration-1 group decoration-solid underline decoration-stone-500 hover:decoration-amber-600 hover:decoration-2 hover:text-stone-100 hover:bg-stone-800">
            <p>
              Jak jedną liczbą opisać wiele i odnaleźć to, co najczęstsze lub
              środkowe
            </p>
            <Icon
              icon="ph:arrow-down-left-bold"
              width={16}
              className="text-stone-500 ease-out duration-300 group-hover:text-amber-600"
            />
          </li>
          <li className="pr-1 w-fit flex flex-row items-center gap-1 ease-out duration-100 bg-transparent decoration-1 group decoration-solid underline decoration-stone-500 hover:decoration-amber-600 hover:decoration-2 hover:text-stone-100 hover:bg-stone-800">
            <p>
              Jak poznać, czy liczby trzymają się kupy, czy daleko od siebie
              stoją
            </p>
            <Icon
              icon="ph:arrow-down-left-bold"
              width={16}
              className="text-stone-500 ease-out duration-300 group-hover:text-amber-600"
            />
          </li>
          <li className="pr-1 w-fit flex flex-row items-center gap-1 ease-out duration-100 bg-transparent decoration-1 group decoration-solid underline decoration-stone-500 hover:decoration-amber-600 hover:decoration-2 hover:text-stone-100 hover:bg-stone-800">
            <p>
              Jak używać rachunku, by rozumieć dane i poprawnie rozwiązywać
              zadania
            </p>
            <Icon
              icon="ph:arrow-down-left-bold"
              width={16}
              className="text-stone-500 ease-out duration-300 group-hover:text-amber-600"
            />
          </li>
        </ul>
      </section>

      <section className="w-4xl px-4">
        <h3 className="text-2xl font-black my-1">Czym jest Statystyka</h3>
        <p>
          Statystyka jest to nauka o liczb wielości, która uczy, jako dane
          zbierać, porządkować i rozważać, by z nich sens i prawidła wydobyć. Za
          jej pomocą obliczamy średnie, mediany i dominanty, mierzymy
          rozproszenie przez odchylenie, a także poznajemy, jak wielkie jest
          prawdopodobieństwo zdarzeń losowych. Służy ona ku temu, by nie
          zgadywać w ciemno, lecz na rachunku i rozumie się opierać.
        </p>
      </section>

      <div className="w-4xl h-px bg-stone-500"></div>
      
      <section className="w-4xl px-4">
        <h2 className="font-aktura text-6xl mb-6 tracking-wide">
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
          Gdy danych mnogo, można je w <b>przedziały</b> zebrać (niby do
          sakiewek osobnych), aby zamiast tysiąca liczb mieć kilka grup
          porządnych.
        </p>
      </section>

      <div className="w-4xl h-px bg-stone-500"></div>

      <section className="w-4xl px-4">
        <h2 className="font-aktura text-6xl mb-6 tracking-wide">
          Rozdział <b className="font-normal tracking-tighter">II.</b> O miarach
          położenia: średnia, mediana i dominanta
        </h2>
        <p>
          W statystyce często szukamy jednej liczby, która cały zbiór niejako
          „opowiada”. Tę zowiemy <b>miarą położenia</b>.
        </p>
        <div className="my-4 mt-8">
          <h3 className="text-2xl font-black my-2">1. Średnia arytmetyczna</h3>
          <p>
            Średnia jest to liczba, którą otrzymasz, gdy wszystkie wartości
            zsumujesz, a potem przez ich liczbę podzielisz.
          </p>
          <div>
            <p>Dla danych <InlineMath math="x_1, x_2, \dots, x_n" /> średnia arytmetyczna jest:</p>
            <BlockMath math="\bar{x} = \frac{x_1 + x_2 + \cdots + x_n}{n}" />
            <p>
              Średnia bywa pożyteczna, lecz strzec się trzeba, bo jedna wartość
              wielce wielka lub mała może ją “skrzywić”, jako wiatr chorągiew.
            </p>
          </div>
        </div>
        <div className="my-4 mt-8">
          <h3 className="text-2xl font-black my-2">2. Średnia ważona</h3>
          <p>Gdy każda wartość <InlineMath math="x_i" /> ma wagę <InlineMath math="w_i" />, (np. ocenę z wagą, albo częstość), tedy średnia ważona jest:</p>
          <BlockMath math="\bar{x}_w = \frac{w_1 x_1 + w_2 x_2 + \cdots + w_n x_n}{w_1 + w_2 + \cdots + w_n}" />
        </div>
        <div className="my-4 mt-8">
          <h3 className="text-2xl font-black my-2">3. Mediana</h3>
          <p>
            Mediana jest to wartość środkowa, gdy dane w porządku stoją. Jest
            ona jak sędzia między liczbami — nie daje się łatwo omamić
            skrajnościom.
          </p>
          <ul className="list-disc list-inside w-full my-4">
            <li>
              Gdy danych jest nieparzyście: mediana to liczba w samym środku. (<InlineMath math="x_{\frac{n+1}{2}}" />)
            </li>
            <li>Gdy parzyście: mediana to średnia z dwóch środkowych. (<InlineMath math="\frac{x_{\frac{n}{2}} + x_{\frac{n}{2} + 1}}{2}" />)</li>
          </ul>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-black mt-2">3. Dominanta</h3>
          <p>
            Dominanta (niekiedy zwana modą) jest to wartość, która <b>najczęściej</b>
            występuje. Bywa, że jest jedna, bywa że dwie, a bywa też, że brak
            jej całkiem, gdy każda wartość jest równie rzadka.
          </p>
        </div>
      </section>

      <div className="w-4xl h-px bg-stone-500"></div>

      <section className="w-4xl px-4">
        <h2 className="font-aktura text-6xl mb-6 tracking-wide">
          Rozdział <b className="font-normal tracking-tighter">III.</b> O
          rozproszeniu: jako mierzyć, czy liczby trzymają się kupy
        </h2>
        <p>
          Nie dość wiedzieć, gdzie „środek” się znajduje. Trzeba też poznać, czy
          dane są ściśnięte jak drużyna w szyku, czy rozbiegane jak gęsi po
          polu.
        </p>
        <div className="my-4 mt-8">
          <h3 className="text-2xl font-black my-2">1. Rozstęp</h3>
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
          <h3 className="text-2xl font-black my-2">
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
          <p className="mt-4">Wariancja:</p>
          <div className="flex flex-row w-full gap-4 items-center justify-center">
            <BlockMath math="s^2 = \frac{1}{n} \sum_{i=1}^{n} (x_i - \bar{x})^2" />
            <p>lub</p>
            <BlockMath math="s^2 = \frac{(x_1-\bar{x})^2 + \cdots + (x_n-\bar{x})^2}{n}" />
          </div>
          <p className="mt-4">Odchylenie standardowe:</p>
          <BlockMath math="s = \sqrt{s^2}" />
          <p className="mt-4">
            Im większe <InlineMath math="s" />, tym dane bardziej rozproszone;
            im mniejsze, tym trzymają się bliżej średniej.
          </p>
        </div>
      </section>
      
      <div className="w-4xl h-px bg-stone-500"></div>

      <section className="w-4xl px-4">
        <h2 className="font-aktura text-6xl mb-6 tracking-wide">
          Rozdział <b className="font-normal tracking-tighter">IV.</b> Więcej o odchyleniu standardowym (także dla danych pogrupowanych) i jego rozumieniu
        </h2>
        <div className="my-4 mt-8">
          <h3 className="text-2xl font-black my-2">1. Odchylenie standardowe dla danych niepogrupowanych</h3>
          <p>Najpierw liczysz średnią <InlineMath math="\bar{x}" />, a potem:</p>
          <BlockMath math="s = \sqrt{\frac{(x_1-\bar{x})^2 + \cdots + (x_n-\bar{x})^2}{n}}" />
        </div>
        <div className="my-4 mt-8">
          <h3 className="text-2xl font-black my-2">2. Odchylenie standardowe dla danych pogrupowanych</h3>
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
          <h3 className="text-2xl font-black my-2">3. Interpretacja dla danych empirycznych</h3>
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

      <div className="w-4xl h-px bg-stone-500"></div>

      <section className="w-4xl px-4">
        <h2 className="font-aktura text-6xl mb-6 tracking-wide">
          Rozdział <b className="font-normal tracking-tighter">V.</b> O skali Centylowej
        </h2>
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
      </section>
      
      <div className="w-4xl h-px bg-stone-500"></div>

      <section className="w-4xl px-4">
        <h2 className="font-aktura text-6xl mb-6 tracking-wide">
          Rozdział <b className="font-normal tracking-tighter">VI.</b> O schemacie Bernoulliego
        </h2>
        <p>
          Gdy wykonujesz <InlineMath math="n" /> niezależnych prób, w każdej
          sukces zachodzi z prawdopodobieństwem <InlineMath math="p" /> (a
          porażka z <InlineMath math="1-p" />), tedy liczba sukcesów{" "}
          <InlineMath math="X" /> ma rozkład Bernoulliego (dwumianowy), a:
        </p>
        <BlockMath math="P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}" />
        <p>gdzie <InlineMath math="\binom{n}{k} = \frac{n!}{k!(n-k)!}" /></p>
      </section>

      <div className="w-4xl h-px bg-stone-500"></div>

      <section className="w-4xl px-4">
        <h2 className="font-aktura text-6xl mb-6 tracking-wide">
          Rozdział <b className="font-normal tracking-tighter">VII.</b> Praktyka
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
    </main>
  );
}
