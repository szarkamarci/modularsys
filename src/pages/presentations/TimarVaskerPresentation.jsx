import { useState, useEffect, useCallback, useRef } from 'react';
import PipelineBackground from '../../components/PipelineBackground';

/* ─── Slide data ─── */
const SLIDES = [
  { id: 'opening', type: 'opening' },
  { id: 'current-process', type: 'current-process' },
  { id: 'practical-difference', type: 'practical-difference' },
  { id: 'concrete-example', type: 'concrete-example' },
  { id: 'validation', type: 'validation' },
  { id: 'decision', type: 'decision' },
  { id: 'appendix-data', type: 'appendix-data' },
  { id: 'appendix-scope', type: 'appendix-scope' },
];

const PRESENTER_NOTES = {
  'opening': 'Bemutatkozás max. 30 másodpercben. ModularAI: készlet- és rendelési döntéseket támogató megoldás meglévő adatokból.',
  'current-process': 'MEGÁLLNI. Kérd meg őket, hogy meséljenek a jelenlegi rendelési folyamatról. Hagyd, hogy ők beszéljenek.',
  'practical-difference': 'Hangsúlyozd: kiegészítés, nem csere. Az ügyviteli rendszer marad, az eredmények visszaadhatók a meglévő munkafolyamatba.',
  'concrete-example': 'Nyomatékosítsd: minden szám szemléltető, NEM a Timár Vasker tényleges adatai.',
  'validation': 'Kérdezd meg: melyik termékkategória és melyik két telephely lenne a legalkalmasabb a teszthez? Ha árról kérdeznek: kb. €1000 nettó fix díj, az adatok és pontos scope függvényében.',
  'decision': 'Erősítsd meg: ki az adatgazda, ki a döntéshozó, mikor a következő egyeztetés.',
  'appendix-data': 'Az első körben elég egy strukturált CSV/Excel export. Nem szükséges közvetlen ERP-hozzáférés.',
  'appendix-scope': 'Csak akkor érdemes bővíteni, ha a validáció kimutatta az üzleti értéket.',
};

/* ─── Chart component for Slide 4 ─── */
const ConsumptionChart = () => {
  const weeks = ['H-12','H-11','H-10','H-9','H-8','H-7','H-6','H-5','H-4','H-3','H-2','H-1','Most','E+1','E+2','E+3','E+4'];
  const historical = [42,38,45,40,44,36,48,41,39,43,46,38, null,null,null,null,null];
  const forecast =   [null,null,null,null,null,null,null,null,null,null,null,null,38,35,32,28,24];
  const forecastHi = [null,null,null,null,null,null,null,null,null,null,null,null,42,40,38,36,34];
  const forecastLo = [null,null,null,null,null,null,null,null,null,null,null,null,34,30,26,20,14];
  const stock =      [null,null,null,null,null,null,null,null,null,null,null,null,120,85,53,25,1];
  const stockoutWeek = 16; // index of the stockout point

  const W = 750, H = 220, PL = 40, PR = 30, PT = 16, PB = 32;
  const cw = (W - PL - PR) / (weeks.length - 1);
  const maxY = 55;
  const maxStock = 140;

  const yScale = (v) => PT + (H - PT - PB) * (1 - v / maxY);
  const yScaleStock = (v) => PT + (H - PT - PB) * (1 - v / maxStock);
  const x = (i) => PL + i * cw;

  const histPath = historical.map((v, i) => v !== null ? `${i === 0 ? 'M' : 'L'}${x(i)} ${yScale(v)}` : '').filter(Boolean).join(' ');
  const fcPath = forecast.map((v, i) => v !== null ? `${forecast[i-1] === null && i > 0 ? 'M' : 'L'}${x(i)} ${yScale(v)}` : '').filter(Boolean).join(' ');
  
  const uncertaintyPath = (() => {
    const hiPts = forecastHi.map((v, i) => v !== null ? { x: x(i), y: yScale(v) } : null).filter(Boolean);
    const loPts = forecastLo.map((v, i) => v !== null ? { x: x(i), y: yScale(v) } : null).filter(Boolean);
    if (!hiPts.length) return '';
    const top = hiPts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x} ${p.y}`).join(' ');
    const bot = [...loPts].reverse().map((p, i) => `${i === 0 ? 'L' : 'L'}${p.x} ${p.y}`).join(' ');
    return `${top} ${bot} Z`;
  })();

  const stockPath = stock.map((v, i) => v !== null ? `${stock[i-1] === null && i > 0 ? 'M' : 'L'}${x(i)} ${yScaleStock(v)}` : '').filter(Boolean).join(' ');

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Fogyási előrejelzés grafikon">
      {/* Grid lines */}
      {[0, 10, 20, 30, 40, 50].map(v => (
        <g key={v}>
          <line x1={PL} y1={yScale(v)} x2={W - PR} y2={yScale(v)} stroke="#e3e2e7" strokeWidth="0.5" />
          <text x={PL - 6} y={yScale(v) + 3} textAnchor="end" className="fill-on-surface-variant" style={{ fontSize: 8, fontFamily: 'Manrope, sans-serif' }}>{v}</text>
        </g>
      ))}
      
      {/* Week labels */}
      {weeks.map((w, i) => (
        <text key={w} x={x(i)} y={H - 8} textAnchor="middle" className="fill-on-surface-variant" style={{ fontSize: 7, fontFamily: 'Manrope, sans-serif' }}>{w}</text>
      ))}

      {/* Divider line between historical and forecast */}
      <line x1={x(12)} y1={PT} x2={x(12)} y2={H - PB} stroke="#c8c4d5" strokeWidth="0.5" strokeDasharray="3 3" />
      <text x={x(6)} y={PT + 6} textAnchor="middle" style={{ fontSize: 7, fontFamily: 'Manrope, sans-serif', fill: '#787585' }}>Korábbi fogyás</text>
      <text x={x(14.5)} y={PT + 6} textAnchor="middle" style={{ fontSize: 7, fontFamily: 'Manrope, sans-serif', fill: '#5749c2' }}>Előrejelzés</text>

      {/* Uncertainty band */}
      <path d={uncertaintyPath} fill="#5749c2" opacity="0.06" />
      
      {/* Historical line */}
      <path d={histPath} fill="none" stroke="#1a1b1f" strokeWidth="1.5" strokeLinejoin="round" />
      
      {/* Forecast line */}
      <path d={fcPath} fill="none" stroke="#5749c2" strokeWidth="1.5" strokeDasharray="4 3" strokeLinejoin="round" />

      {/* Stock level line */}
      <path d={stockPath} fill="none" stroke="#ba1a1a" strokeWidth="1" opacity="0.5" strokeLinejoin="round" />
      <text x={x(12) + 4} y={yScaleStock(120) - 5} style={{ fontSize: 7, fontFamily: 'Manrope, sans-serif', fill: '#ba1a1a' }}>Készletszint</text>

      {/* Stockout marker */}
      <circle cx={x(stockoutWeek)} cy={yScaleStock(1)} r="3" fill="none" stroke="#ba1a1a" strokeWidth="1.5" />
      <text x={x(stockoutWeek) + 6} y={yScaleStock(1) + 3} style={{ fontSize: 7, fontFamily: 'Manrope, sans-serif', fontWeight: 600, fill: '#ba1a1a' }}>Kifogyás</text>

      {/* Data points on historical */}
      {historical.map((v, i) => v !== null ? <circle key={i} cx={x(i)} cy={yScale(v)} r="2" fill="#1a1b1f" /> : null)}
      {forecast.map((v, i) => v !== null ? <circle key={`f${i}`} cx={x(i)} cy={yScale(v)} r="2" fill="#5749c2" /> : null)}
    </svg>
  );
};

/* ─── Individual slide components ─── */

const SlideOpening = () => (
  <div className="flex flex-col items-center justify-center h-full px-12 text-center">
    <img src="/assets/brand/wordmark.svg" alt="ModularAI" className="h-10 mb-16 opacity-80" />
    <h1 className="font-headline text-[2.6rem] md:text-5xl font-extrabold text-on-surface tracking-tight leading-[1.1] mb-6">
      Pontosabb készlettervezés<br />a meglévő adatokból
    </h1>
    <p className="text-on-surface-variant text-lg font-medium mb-10">
      Timár Vasker <span className="text-outline mx-2">×</span> ModularAI
    </p>
    <p className="text-outline text-sm">
      Egy lehetséges pilot közös áttekintése
    </p>
  </div>
);

const SlideCurrentProcess = () => {
  const questions = [
    'Mely termékeknél kell a legtöbbször kézzel módosítani a rendelési mennyiséget?',
    'Mennyire tér el ugyanannak a terméknek a fogyása az egyes telephelyeken?',
    'Mikor derül ki, hogy egy termékből készlethiány vagy túlkészlet alakulhat ki?',
    'Felhasználhatók-e a webshopos keresések és érdeklődések korai jelzésként?',
  ];

  return (
    <div className="flex flex-col justify-center h-full px-12 md:px-20 w-full max-w-5xl mx-auto">
      <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface tracking-tight leading-tight mb-4">
        A jelenlegi rendelési folyamatból<br />indulunk ki
      </h2>
      <p className="text-on-surface-variant text-base leading-relaxed mb-10 max-w-2xl">
        A rendeléseket jelenleg az ügyviteli rendszerben nyilvántartott fogyások alapján állítjátok össze. Mielőtt bármit javaslunk, négy dolgot szeretnénk pontosan megérteni.
      </p>
      <div className="space-y-5 max-w-2xl mb-10">
        {questions.map((q, i) => (
          <div key={i} className="flex items-start gap-4">
            <span className="font-headline text-primary font-bold text-sm mt-0.5 shrink-0 w-5 text-right">{i + 1}.</span>
            <p className="text-on-surface text-[15px] leading-relaxed">{q}</p>
          </div>
        ))}
      </div>
      <p className="text-outline text-xs max-w-xl">
        Több telephely, széles termékkör, webáruház és 3000–4000 tonnás állandó készlet.
      </p>
    </div>
  );
};

const SlidePracticalDifference = () => {
  const inputs = [
    'Korábbi fogyás',
    'Aktuális készlet',
    'Beérkező rendelések',
    'Beszállítási idő',
    'Telephely',
    'Webshopos érdeklődés',
  ];
  const outputs = [
    'Várható termékszintű igény',
    'Készlethiány korai jelzése',
    'Túlkészlet felismerése',
    'Utánrendelési javaslat',
    'Átcsoportosítási lehetőség',
  ];

  return (
    <div className="flex flex-col justify-center h-full px-12 md:px-20 w-full max-w-5xl mx-auto">
      <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface tracking-tight leading-tight mb-10">
        Ne csak azt lássuk, mi fogyott –<br />hanem azt is, mire lesz szükség
      </h2>
      
      <div className="flex items-stretch gap-3 md:gap-4 max-w-4xl mb-10">
        {/* Inputs */}
        <div className="flex-1 space-y-1.5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/50 mb-3">Meglévő adatok</p>
          {inputs.map((item, i) => (
            <div key={i} className="bg-surface-container-low border border-outline-variant/20 rounded-md px-3 py-2">
              <p className="text-on-surface text-[13px] font-medium">{item}</p>
            </div>
          ))}
        </div>

        {/* Arrow */}
        <div className="flex items-center px-2 md:px-4 shrink-0">
          <div className="flex flex-col items-center gap-1">
            <div className="w-px h-6 bg-primary/30" />
            <div className="w-8 h-8 rounded-full bg-primary/8 border border-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: 16 }}>arrow_forward</span>
            </div>
            <div className="w-px h-6 bg-primary/30" />
          </div>
        </div>

        {/* Outputs */}
        <div className="flex-1 space-y-1.5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-3">Eredmény</p>
          {outputs.map((item, i) => (
            <div key={i} className="bg-primary/4 border border-primary/15 rounded-md px-3 py-2">
              <p className="text-on-surface text-[13px] font-medium">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-on-surface-variant text-sm max-w-xl leading-relaxed">
        Az eredmény a meglévő munkafolyamatba visszaadható – nem szükséges lecserélni az ügyviteli rendszert.
      </p>
    </div>
  );
};

const SlideConcreteExample = () => {
  const tableData = [
    { product: 'Vágókorong 125 mm', site: 'Fót', status: 'Készlethiány várható 13 napon belül', action: 'Utánrendelés', color: 'text-error' },
    { product: 'Hegesztőhuzal', site: 'Szada', status: 'A készlet meghaladja a várható fogyást', action: 'Átcsoportosítás', color: 'text-on-surface-variant' },
    { product: 'Munkavédelmi kesztyű', site: 'Vecsés', status: 'Emelkedő kereslet várható', action: 'Biztonsági készlet felülvizsgálata', color: 'text-primary' },
  ];

  return (
    <div className="flex flex-col justify-center h-full px-12 md:px-16 w-full max-w-5xl mx-auto">
      <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-surface tracking-tight leading-tight mb-6">
        Egy heti jelzésnek ennyire egyszerűnek kell lennie
      </h2>

      {/* Chart */}
      <div className="max-w-3xl mb-6">
        <ConsumptionChart />
      </div>

      {/* Decision table */}
      <div className="max-w-3xl">
        <table className="w-full text-left text-[12px]">
          <thead>
            <tr className="border-b border-outline-variant/20">
              <th className="pb-2 pr-4 font-bold text-on-surface-variant/50 uppercase tracking-widest text-[9px]">Termék</th>
              <th className="pb-2 pr-4 font-bold text-on-surface-variant/50 uppercase tracking-widest text-[9px]">Telephely</th>
              <th className="pb-2 pr-4 font-bold text-on-surface-variant/50 uppercase tracking-widest text-[9px]">Várható helyzet</th>
              <th className="pb-2 font-bold text-on-surface-variant/50 uppercase tracking-widest text-[9px]">Javaslat</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, i) => (
              <tr key={i} className="border-b border-outline-variant/10 last:border-0">
                <td className="py-2 pr-4 font-medium text-on-surface">{row.product}</td>
                <td className="py-2 pr-4 text-on-surface-variant">{row.site}</td>
                <td className={`py-2 pr-4 ${row.color}`}>{row.status}</td>
                <td className="py-2 font-medium text-on-surface">{row.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-outline text-[10px] mt-4 italic">
        Szemléltető példa – nem a Timár Vasker tényleges adatai.
      </p>
    </div>
  );
};

const SlideValidation = () => {
  const steps = [
    'Egy kiválasztott termékkategória',
    'Két telephely',
    '12–24 hónap korábbi adat',
    'A jelenlegi fogyásalapú módszer rögzítése kiindulópontként',
    'Visszamenőleges előrejelzés és összehasonlítás',
    'Eredménybemutató és továbblépési javaslat',
  ];

  return (
    <div className="flex flex-col justify-center h-full px-12 md:px-20 w-full max-w-5xl mx-auto">
      <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface tracking-tight leading-tight mb-4">
        Egy kis körű tesztből kiderül,<br />van-e érdemi előny
      </h2>
      <p className="text-on-surface-variant text-sm mb-10 max-w-lg">
        Nem szoftverbevezetés, hanem egy célzott validáció: tényleg pontosabb-e az előrejelzés a jelenlegi módszernél?
      </p>
      
      <div className="max-w-lg mb-10">
        {steps.map((step, i) => (
          <div key={i} className="flex items-start gap-4 mb-3">
            <span className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center shrink-0 mt-0.5">
              <span className="font-headline text-on-surface-variant text-xs font-bold">{i + 1}</span>
            </span>
            <p className="text-on-surface text-[15px] leading-relaxed pt-0.5">{step}</p>
          </div>
        ))}
      </div>
      
      <div className="bg-surface-container-low border border-outline-variant/15 rounded-md px-5 py-3 max-w-lg">
        <p className="text-on-surface text-sm font-medium">
          Várható időtartam: <span className="text-primary font-bold">2–3 hét</span> az adatok átadásától.
        </p>
      </div>
    </div>
  );
};

const SlideDecision = () => {
  const criteria = [
    'Pontosabb volt-e az előrejelzés a jelenlegi módszernél?',
    'Korábban jelezte-e a várható készlethiányt?',
    'Felismerte-e a lassabban forgó készletet?',
    'Adott-e használható rendelési vagy átcsoportosítási javaslatot?',
    'Csökkenthető-e vele a manuális tervezési munka?',
  ];

  return (
    <div className="flex flex-col justify-center h-full px-12 md:px-20 w-full max-w-5xl mx-auto">
      <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface tracking-tight leading-tight mb-8">
        A következő lépést<br />az eredmények döntik el
      </h2>
      
      <div className="space-y-3 max-w-2xl mb-12">
        {criteria.map((c, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="w-5 h-5 rounded border border-outline-variant/30 bg-surface-container-lowest shrink-0 mt-0.5" />
            <p className="text-on-surface text-[15px] leading-relaxed">{c}</p>
          </div>
        ))}
      </div>

      <p className="text-on-surface-variant text-sm leading-relaxed max-w-xl mb-10">
        Ha nincs mérhető előny, nem érdemes továbbépíteni. Ha van, közösen dönthetünk a következő termékkategóriák és telephelyek bevonásáról.
      </p>

      <div className="bg-primary/5 border border-primary/15 rounded-md px-5 py-3 max-w-xl">
        <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-1">Következő lépés</p>
        <p className="text-on-surface text-sm font-medium">
          A rendelkezésre álló adatok áttekintése és a pilot termékkategóriájának kiválasztása.
        </p>
      </div>
    </div>
  );
};

const SlideAppendixData = () => {
  const dataItems = [
    'Dátum vagy hét',
    'Cikkszám és termékkategória',
    'Telephely',
    'Értékesített vagy felhasznált mennyiség',
    'Készletszint',
    'Beérkező rendelések',
    'Beszerzési átfutási idő',
    'Telephelyek közötti készletmozgások',
    'Webshopos keresések vagy termékmegtekintések (ha rendelkezésre állnak)',
  ];

  return (
    <div className="flex flex-col justify-center h-full px-12 md:px-20 w-full max-w-5xl mx-auto">
      <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/50 mb-4">Melléklet</p>
      <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface tracking-tight leading-tight mb-8">
        Milyen adatokra lenne szükség<br />az első teszthez?
      </h2>
      
      <div className="space-y-2 max-w-lg mb-10">
        {dataItems.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="text-outline text-xs mt-1 shrink-0">—</span>
            <p className="text-on-surface text-[14px] leading-relaxed">{item}</p>
          </div>
        ))}
      </div>

      <p className="text-on-surface-variant text-sm max-w-lg leading-relaxed">
        Az első validáció elindítható egy strukturált CSV vagy Excel exportból. Nem szükséges közvetlen rendszerhozzáférés.
      </p>
    </div>
  );
};

const SlideAppendixScope = () => {
  const exclusions = [
    'Teljes ERP-integráció',
    'Automatikus, folyamatos adatkapcsolat',
    'Minden telephely és termékkategória',
    'Éles üzleti automatizáció',
    'Korlátlan módosítás',
    'Hosszú távú üzemeltetés',
  ];

  return (
    <div className="flex flex-col justify-center h-full px-12 md:px-20 w-full max-w-5xl mx-auto">
      <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/50 mb-4">Melléklet</p>
      <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface tracking-tight leading-tight mb-8">
        Mit nem tartalmaz az első kör?
      </h2>

      <div className="space-y-2.5 max-w-lg mb-10">
        {exclusions.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="text-outline-variant text-sm mt-0.5 shrink-0">×</span>
            <p className="text-on-surface-variant text-[14px] leading-relaxed">{item}</p>
          </div>
        ))}
      </div>

      <p className="text-on-surface-variant text-sm max-w-lg leading-relaxed">
        Ezekről csak akkor érdemes dönteni, ha a validáció már kimutatta az üzleti értéket.
      </p>
    </div>
  );
};

const SLIDE_COMPONENTS = {
  'opening': SlideOpening,
  'current-process': SlideCurrentProcess,
  'practical-difference': SlidePracticalDifference,
  'concrete-example': SlideConcreteExample,
  'validation': SlideValidation,
  'decision': SlideDecision,
  'appendix-data': SlideAppendixData,
  'appendix-scope': SlideAppendixScope,
};

/* ─── Main Presentation Shell ─── */
const TimarVaskerPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const touchStartRef = useRef(null);
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const transitionDuration = prefersReduced ? '0ms' : '200ms';

  // Read initial slide from hash
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const idx = SLIDES.findIndex(s => s.id === hash);
      if (idx >= 0) setCurrentSlide(idx);
    }
  }, []);

  // Update hash when slide changes
  useEffect(() => {
    window.location.hash = SLIDES[currentSlide].id;
  }, [currentSlide]);

  const goTo = useCallback((idx) => {
    const clamped = Math.max(0, Math.min(SLIDES.length - 1, idx));
    setCurrentSlide(clamped);
  }, []);

  const next = useCallback(() => goTo(currentSlide + 1), [currentSlide, goTo]);
  const prev = useCallback(() => goTo(currentSlide - 1), [currentSlide, goTo]);

  // Keyboard
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
      else if (e.key === 'Home') { e.preventDefault(); goTo(0); }
      else if (e.key === 'End') { e.preventDefault(); goTo(SLIDES.length - 1); }
      else if (e.key === 'n' || e.key === 'N') { setShowNotes(n => !n); }
      else if (e.key === 'f' || e.key === 'F') {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev, goTo]);

  // Touch / swipe
  const handleTouchStart = (e) => { touchStartRef.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartRef.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartRef.current;
    if (Math.abs(dx) > 50) { dx < 0 ? next() : prev(); }
    touchStartRef.current = null;
  };

  const slideId = SLIDES[currentSlide].id;
  const SlideComponent = SLIDE_COMPONENTS[SLIDES[currentSlide].type];
  const progress = ((currentSlide + 1) / SLIDES.length) * 100;

  return (
    <>
      <style>{`
        @media print {
          @page { size: landscape; margin: 0; }
          .pres-shell { overflow: visible !important; height: auto !important; }
          .pres-slide-viewport { page-break-after: always; page-break-inside: avoid; height: 100vh !important; width: 100vw !important; }
          .pres-controls, .pres-progress, .pres-notes-panel, .pres-slide-counter, .pres-background { display: none !important; }
          .pres-all-slides { display: block !important; }
          .pres-single-slide { display: none !important; }
        }
        @media not print {
          .pres-all-slides { display: none !important; }
        }
      `}</style>

      <div
        className="pres-shell fixed inset-0 bg-surface overflow-hidden select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-label="Prezentáció"
        aria-roledescription="slide deck"
      >
        <div className="pres-background">
          <PipelineBackground variant="edges" className="opacity-40" />
        </div>
        
        {/* Progress bar */}
        <div className="pres-progress fixed top-0 left-0 right-0 h-[2px] bg-outline-variant/10 z-50">
          <div
            className="h-full bg-primary"
            style={{ width: `${progress}%`, transition: `width ${transitionDuration} ease` }}
          />
        </div>

        {/* Current slide (screen only) */}
        <div
          className="pres-single-slide w-screen h-screen flex items-center justify-center relative z-10"
          role="group"
          aria-roledescription="slide"
          aria-label={`${currentSlide + 1} / ${SLIDES.length}`}
        >
          <div className="w-full h-full max-w-[177.78vh] max-h-[56.25vw] mx-auto flex flex-col justify-center" style={{ aspectRatio: '16/9' }}>
            <div
              key={slideId}
              className="w-full h-full relative"
              style={{
                animation: prefersReduced ? 'none' : `slideIn ${transitionDuration} ease forwards`,
              }}
            >
              <SlideComponent />
            </div>
          </div>
        </div>

        {/* All slides for print */}
        <div className="pres-all-slides">
          {SLIDES.map((slide) => {
            const Comp = SLIDE_COMPONENTS[slide.type];
            return (
              <div key={slide.id} className="pres-slide-viewport" style={{ aspectRatio: '16/9' }}>
                <Comp />
              </div>
            );
          })}
        </div>

        {/* Navigation controls */}
        <div className="pres-controls fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 pointer-events-none">
          <button
            onClick={prev}
            disabled={currentSlide === 0}
            className="pointer-events-auto w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-20 disabled:pointer-events-none"
            aria-label="Előző dia"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>chevron_left</span>
          </button>

          <span className="pres-slide-counter text-[11px] text-on-surface-variant/50 font-body tabular-nums pointer-events-auto">
            {currentSlide + 1} / {SLIDES.length}
          </span>

          <button
            onClick={next}
            disabled={currentSlide === SLIDES.length - 1}
            className="pointer-events-auto w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-20 disabled:pointer-events-none"
            aria-label="Következő dia"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>chevron_right</span>
          </button>
        </div>

        {/* Presenter notes panel */}
        {showNotes && (
          <div className="pres-notes-panel fixed bottom-16 left-6 right-6 md:left-auto md:right-6 md:w-96 z-50 bg-inverse-surface text-inverse-on-surface rounded-lg px-5 py-4 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Előadói jegyzetek</p>
              <button onClick={() => setShowNotes(false)} className="opacity-50 hover:opacity-100">
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>close</span>
              </button>
            </div>
            <p className="text-sm leading-relaxed opacity-80">
              {PRESENTER_NOTES[slideId] || 'Nincs jegyzet ehhez a diához.'}
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0.7; transform: translateX(8px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </>
  );
};

export default TimarVaskerPresentation;
