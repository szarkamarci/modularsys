import { getDemoRetailOverviewData, getDemoRetailScenario } from './demo-retail';
import { DemoScenarioConfig, OverviewData, ScenarioModuleData } from '../../features/overview/types';

export const DEMO_SCENARIO_IDS = [
  'demo-retail',
  'demo-workforce',
  'demo-sales',
  'demo-operations',
] as const;

export type DemoScenarioId = typeof DEMO_SCENARIO_IDS[number];

export const DEMO_SCENARIO_PATHS: Record<DemoScenarioId, string> = {
  'demo-retail': '/demo-dashboard',
  'demo-workforce': '/demo-dashboard/scenario/workforce',
  'demo-sales': '/demo-dashboard/scenario/sales',
  'demo-operations': '/demo-dashboard/scenario/operations',
};

const WORKFORCE_MODULE_PATHS = {
  jobs: '/demo-dashboard/scenario/workforce/jobs',
  candidates: '/demo-dashboard/scenario/workforce/candidates',
  search: '/demo-dashboard/scenario/workforce/search',
  partners: '/demo-dashboard/scenario/workforce/partners',
} as const;

export function normalizeDemoScenarioId(scenarioId?: string): DemoScenarioId {
  if (scenarioId === 'workforce' || scenarioId === 'demo-workforce') return 'demo-workforce';
  if (scenarioId === 'sales' || scenarioId === 'demo-sales') return 'demo-sales';
  if (scenarioId === 'operations' || scenarioId === 'demo-operations') return 'demo-operations';
  return 'demo-retail';
}

function isHu(locale?: string) {
  return locale?.toLowerCase().startsWith('hu') ?? false;
}

function route(
  scenarioId: DemoScenarioId,
  locale: string | undefined,
  label: string,
  description: string
): DemoScenarioConfig['routes'] {
  const hu = isHu(locale);

  return [
    {
      href: DEMO_SCENARIO_PATHS[scenarioId],
      label,
      navLabel: hu ? 'Áttekintés' : 'Executive Cockpit',
      mobileLabel: hu ? 'Nézet' : 'Cockpit',
      description,
      icon: 'dashboard',
      keywords: ['dashboard', 'overview', 'cockpit', 'executive', 'demo', 'riport'],
      statusLabel: hu ? 'Bemutató' : 'Live demo',
      teaser: hu ? 'Kezdje az üzleti helyzettel.' : 'Start with the business narrative.',
    },
  ];
}

function recruitmentRoutes(locale?: string): DemoScenarioConfig['routes'] {
  const hu = isHu(locale);

  return [
    {
      href: DEMO_SCENARIO_PATHS['demo-workforce'],
      label: hu ? 'Vezetői áttekintés' : 'Executive Overview',
      navLabel: hu ? 'Áttekintés' : 'Overview',
      mobileLabel: hu ? 'Nézet' : 'View',
      description: hu
        ? 'A teljes platform képe: partneri igények, jelöltút, keresések, illesztés és teendők.'
        : 'The full platform view: partner demand, candidate journey, searches, matching, and next actions.',
      icon: 'dashboard',
      keywords: ['overview', 'recruitment', 'toborzas', 'jelolt', 'partner'],
      statusLabel: hu ? 'Bemutató' : 'Live demo',
      teaser: hu ? 'Innen indul a vezetői beszélgetés.' : 'Start here for the leadership story.',
    },
    {
      href: WORKFORCE_MODULE_PATHS.jobs,
      label: hu ? 'Hirdetések teljesítménye' : 'Job Ad Performance',
      navLabel: hu ? 'Hirdetések' : 'Job Ads',
      mobileLabel: hu ? 'Állások' : 'Jobs',
      description: hu
        ? 'Melyik hirdetés hoz jelöltet, melyik csak kattintást, és hol kell szöveget vagy címkézést javítani.'
        : 'See which ads create candidates, which only create clicks, and where copy or labels need work.',
      icon: 'campaign',
      keywords: ['jobs', 'ads', 'hirdetes', 'allas'],
      statusLabel: hu ? 'Fókusz' : 'Focus',
      teaser: hu ? 'Kattintásból legyen jelentkezés.' : 'Turn clicks into applications.',
    },
    {
      href: WORKFORCE_MODULE_PATHS.candidates,
      label: hu ? 'Jelöltút és lemorzsolódás' : 'Candidate Journey',
      navLabel: hu ? 'Jelöltút' : 'Candidates',
      mobileLabel: hu ? 'Jelölt' : 'Flow',
      description: hu
        ? 'Hol akadnak el a jelöltek, melyik lépés rontja a konverziót, és mit érdemes először javítani.'
        : 'Find where candidates stall, which step hurts conversion, and what to fix first.',
      icon: 'conversion_path',
      keywords: ['candidate', 'journey', 'jelolt', 'lemorzsolodas'],
      statusLabel: hu ? 'Aha' : 'Aha',
      teaser: hu ? 'Itt tűnnek el csendben a jó jelöltek.' : 'Where good candidates quietly vanish.',
    },
    {
      href: WORKFORCE_MODULE_PATHS.search,
      label: hu ? 'Keresések és rejtett igények' : 'Search Demand',
      navLabel: hu ? 'Keresések' : 'Search',
      mobileLabel: hu ? 'Keresés' : 'Search',
      description: hu
        ? 'Mit keresnek a jelöltek, mire nincs jó találat, és milyen hirdetések vagy szinonimák hiányoznak.'
        : 'See what candidates search for, what returns weak results, and which ads or synonyms are missing.',
      icon: 'manage_search',
      keywords: ['search', 'demand', 'kereses', 'igeny'],
      statusLabel: hu ? 'Jel' : 'Signal',
      teaser: hu ? 'A kereső sokszor őszintébb, mint a kérdőív.' : 'Search is often more honest than surveys.',
    },
    {
      href: WORKFORCE_MODULE_PATHS.partners,
      label: hu ? 'Partneri igények és prioritások' : 'Partner Priorities',
      navLabel: hu ? 'Partnerek' : 'Partners',
      mobileLabel: hu ? 'Partner' : 'Partner',
      description: hu
        ? 'Mely partnerek kérnek gyors reakciót, hol nő az igény, és hol kell account szintű utánkövetés.'
        : 'Prioritize partners by demand growth, weak fulfillment, and account follow-up needs.',
      icon: 'handshake',
      keywords: ['partner', 'employer', 'account', 'prioritas'],
      statusLabel: hu ? 'Teendő' : 'Action',
      teaser: hu ? 'Ne minden partner legyen egyszerre sürgős.' : 'Not every partner can be urgent at once.',
    },
  ];
}

export function getDemoScenarioRoutePaths(scenarioId?: string) {
  return getDemoScenario(scenarioId).routes.map((item) => item.href);
}

function retailAssistant(locale?: string): OverviewData['assistant'] {
  const hu = isHu(locale);
  return hu
    ? {
        title: 'ModularAI elemző',
        status: 'Bemutató asszisztens',
        greeting: 'Összeraktam egy vezetői nézetbe a készletet, a kereséseket, a beszállítói adatokat és a kosármintákat.',
        note: 'Itt nem az a lényeg, hogy több grafikon legyen. Az a lényeg, hogy kiderüljön, mivel érdemes ma foglalkozni.',
        prompts: [
          { question: 'Mi a fő kockázat?', answer: 'Néhány gyorsan fogyó termék hétvége előtt kifuthat, miközben a keresések már most mutatják, mire lenne igény.' },
          { question: 'Mi legyen a következő lépés?', answer: 'Rövid lista készül: mit kell rendelni, mely keresések vesznek el, és milyen kosármintákra érdemes reagálni.' },
          { question: 'Mit kap a vezető?', answer: 'Egy rövid, megosztható összefoglalót KPI-kkal, kockázatokkal és javasolt lépésekkel.' },
        ],
      }
    : {
        title: 'ModularAI analyst',
        status: 'Demo assistant',
        greeting: 'I connected stock, search, supplier, and basket signals into one executive view.',
        note: 'The useful part is not more charts. It is knowing which stock gap, demand signal, or basket pattern deserves attention first.',
        prompts: [
          { question: 'What is the main risk?', answer: 'Fast-moving essentials may run short before the weekend while repeated searches already show demand the catalog cannot convert.' },
          { question: 'What should the team do next?', answer: 'The demo turns replenishment priorities, failed searches, and basket patterns into a short action list.' },
          { question: 'What does management get?', answer: 'An exportable summary with KPIs, risks, recommended actions, and module snapshots.' },
        ],
      };
}

export function getDemoScenario(scenarioId?: string, locale?: string): DemoScenarioConfig {
  const normalized = normalizeDemoScenarioId(scenarioId);
  const retail = getDemoRetailScenario(locale);
  const hu = isHu(locale);

  if (normalized === 'demo-retail') return retail;

  if (normalized === 'demo-workforce') {
    return {
      ...retail,
      scenarioId: normalized,
      eyebrow: hu ? 'Toborzási platform bemutató' : 'Recruitment platform demo',
      title: hu ? 'Toborzási és munkaerő-platform áttekintés' : 'Recruitment and workforce platform cockpit',
      subtitle: hu
        ? 'Álláshirdetések, jelöltmozgás, partneri igények, keresések és illesztési jelek egy érthető vezetői nézetben.'
        : 'See how job ads, candidate activity, partner demand, search behavior, and matching signals become practical next actions.',
      company: {
        name: 'TalentBridge Network',
        industry: hu ? 'Toborzási, diákmunka- és munkaerő-platform' : 'Recruitment, student work, and workforce platform',
        footprint: hu
          ? 'Partnerek, álláshirdetések, jelöltek, diákok, keresések és jelentkezések'
          : 'Employer partners, job ads, candidates, student workers, searches, and applications',
        operatingModel: hu
          ? 'Hirdetésfigyelés, jelöltút, partneri igények, illesztés és utánkövetés'
          : 'Job performance tracking, candidate journey, partner demand, matching, and follow-up',
        dataReality: hu
          ? 'Hirdetési adatok, jelentkezések, keresések, partnerexportok, CRM-jegyzetek és manuális riportok'
          : 'Job ad data, applications, searches, partner exports, CRM notes, and manual reports',
        demoNarrative: hu
          ? 'A TalentBridge-nél sok minden történik egyszerre: egyes hirdetések pörögnek, máshol eltűnnek a jelöltek, a partnerek pedig tegnapra kérnének embert. A demo ezt rendezi át egy tiszta képpé.'
          : 'TalentBridge has a lively platform: some job ads are buzzing, candidates disappear at specific steps, and partners need people yesterday. The demo turns that noise into a clear operating view.',
      },
      routes: recruitmentRoutes(locale),
      report: {
        title: hu ? 'Heti toborzási riport' : 'Weekly recruitment report preview',
        description: hu
          ? 'Rövid vezetői riport hirdetési teljesítményről, jelöltmozgásról, partneri igényekről és következő lépésekről.'
          : 'Summarize job ad performance, candidate movement, partner demand, and recommended next actions for weekly reviews.',
        actionLabel: hu ? 'Riport megnyitása' : 'Preview report',
      },
    };
  }

  if (normalized === 'demo-sales') {
    return {
      ...retail,
      scenarioId: normalized,
      eyebrow: hu ? 'Értékesítési bemutató' : 'Sales and account demo',
      title: hu ? 'Bevételi jelzések áttekintése' : 'Revenue signal cockpit',
      subtitle: hu
        ? 'Gyorsan látszik, mely ügyfelek gyengülnek, hol van bővítési lehetőség, és mire kell ránézni a héten.'
        : 'See how sales activity, customer health, upsell signals, and missed revenue risks become focused account actions.',
      company: {
        name: 'Atlas B2B Systems',
        industry: hu ? 'B2B értékesítés és ügyfélkezelés' : 'B2B sales and account management',
        footprint: hu
          ? '42 aktív ügyfél, 9 ügyfélfelelős, CRM, pipeline és support jelek'
          : '42 active accounts, 9 account managers, pipeline exports, CRM notes, and support activity',
        operatingModel: hu
          ? 'Heti ügyféláttekintés, megújítások, upsell és pipeline rendbetétel'
          : 'Weekly account reviews, renewal follow-up, upsell prioritization, and pipeline hygiene',
        dataReality: hu
          ? 'CRM exportok, ügyféltáblázatok, jegyzetek, használati jelek és riportok'
          : 'CRM exports, account spreadsheets, meeting notes, product usage signals, and manual revenue reports',
        demoNarrative: hu
          ? 'Az Atlasnak erős az ügyfélbázisa, de a kockázatok és bővítési lehetőségek több rendszerben szóródnak szét.'
          : 'Atlas has a strong book of business, but account risk and expansion signals are spread across too many tools.',
      },
      routes: route(
        normalized,
        locale,
        hu ? 'Ügyfélállapot és bevételi jelek' : 'Account Health and Revenue Signals',
        hu
          ? 'Gyengülő ügyfelek, upsell lehetőségek és bevételi kockázatok priorizálása.'
          : 'Prioritize weak accounts, upsell opportunities, and missed revenue signals.'
      ),
      report: {
        title: hu ? 'Heti ügyfélriport' : 'Account review report preview',
        description: hu
          ? 'Rövid vezetői riport ügyfélkockázatokkal, upsell jelekkel és következő lépésekkel.'
          : 'Package customer health, risk signals, and suggested follow-ups into a manager-ready account review.',
        actionLabel: hu ? 'Riport megnyitása' : 'Preview report',
      },
    };
  }

  return {
    ...retail,
    scenarioId: normalized,
    eyebrow: hu ? 'Operációs bemutató' : 'Operations workflow demo',
    title: hu ? 'Operációs áttekintés' : 'Operations clarity cockpit',
    subtitle: hu
      ? 'Riportok, késések, kézi egyeztetések és adathibák egy tiszta vezetői nézetben.'
      : 'See how reporting-heavy workflows, process delays, manual checks, and data quality issues become clear operating priorities.',
    company: {
      name: 'Clearline Operations Group',
      industry: hu ? 'Operáció, adminisztráció és riportálás' : 'Admin-heavy operations and reporting',
      footprint: hu
        ? 'Elosztott csapatok, heti riportok, feladatlisták és közös táblázatok'
        : 'Distributed teams, recurring reports, workflow queues, shared spreadsheets, and manager exports',
      operatingModel: hu
        ? 'Feladatkövetés, heti riportálás, eszkaláció és folyamatjavítás'
        : 'Daily queue management, weekly reporting, escalation handling, and process improvement',
      dataReality: hu
        ? 'Táblázatok, ticket exportok, folyamatnaplók és vezetői riportok'
        : 'Spreadsheets, ticket exports, workflow logs, manager updates, and manually reconciled reports',
      demoNarrative: hu
        ? 'A Clearline-nál sok idő megy el riportokra és egyeztetésre. Itt ezekből lesz átlátható működési kép.'
        : 'Clearline can deliver faster decisions by turning repeated reporting work and workflow delays into visible signals.',
    },
    routes: route(
      normalized,
      locale,
      hu ? 'Folyamatkockázatok és riportok' : 'Workflow Risk and Reporting',
      hu
        ? 'Elakadások, késések, adathibák és riportprioritások egy helyen.'
        : 'Surface bottlenecks, repeated delays, data quality issues, and reporting priorities.'
    ),
    report: {
      title: hu ? 'Operációs heti riport' : 'Operations report preview',
      description: hu
        ? 'Rövid vezetői riport a folyamatok állapotáról, elakadásokról és következő lépésekről.'
        : 'Create a concise view of workflow health, recurring blockers, data issues, and recommended operational next steps.',
      actionLabel: hu ? 'Riport megnyitása' : 'Preview report',
    },
  };
}

export function getDemoOverviewData(scenarioId?: string, locale?: string): OverviewData {
  const normalized = normalizeDemoScenarioId(scenarioId);
  const hu = isHu(locale);

  if (normalized === 'demo-retail') {
    return {
      ...getDemoRetailOverviewData(locale),
      assistant: retailAssistant(locale),
    };
  }

  if (normalized === 'demo-workforce') {
    return hu
      ? {
          executiveSummary: {
            headline: 'A TalentBridge látja, hol vesznek el a jó jelöltek.',
            narrative: 'A ModularAI egy helyre rendezi az álláshirdetéseket, jelentkezéseket, kereséseket, partneri igényeket és illesztési eredményeket. Így nem érzésből kell dönteni, melyik hirdetéshez, partnerhez vagy jelöltcsoporthoz nyúljon először a csapat.',
            confidenceLabel: 'Bizalmi szint',
            confidenceValue: '88%',
            updatedLabel: 'Demo frissítés',
            updatedValue: 'Ma 09:40',
            riskLabel: 'Toborzási kockázat',
            riskValue: 'Figyelmet kér',
          },
          kpis: [
            { id: 'job-demand', label: 'Aktív partneri igény', value: '186', caption: 'nyitott pozíció', trend: '+14%', icon: 'work_alert', tone: 'warning' },
            { id: 'candidate-dropoff', label: 'Jelöltlemorzsolódás', value: '31%', caption: 'profil után eltűnik', trend: '2 ponton', icon: 'person_off', tone: 'danger' },
            { id: 'match-quality', label: 'Illesztési minőség', value: '81%', caption: 'használható találat', trend: '-6 pont', icon: 'join_inner', tone: 'primary' },
            { id: 'search-gap', label: 'Keresési rés', value: '428', caption: 'válasz nélküli keresés', trend: '6 téma', icon: 'manage_search', tone: 'success' },
          ],
          recommendations: [
            { id: 'dropoff', title: 'Jelöltút javítása a kritikus ponton', description: 'A legtöbb lemorzsolódás a profilmegtekintés után történik, főleg három nagy forgalmú hirdetésnél.', impact: 'Több jelentkezés ugyanabból a forgalomból', urgency: 'High', actionLabel: 'Jelöltút', route: DEMO_SCENARIO_PATHS[normalized] },
            { id: 'matching', title: 'Illesztések finomítása keresési minták alapján', description: 'A jelöltek gyakran olyan kifejezéseket keresnek, amelyekhez van releváns ajánlat, csak rosszul jelenik meg.', impact: 'Jobb találati arány új hirdetési költés nélkül', urgency: 'Medium', actionLabel: 'Illesztések', route: DEMO_SCENARIO_PATHS[normalized] },
            { id: 'partners', title: 'Partneri prioritáslista a hétre', description: 'Öt partnernél nő az igény, de kevés a megfelelő jelölt vagy lassú az utánkövetés.', impact: 'Kevesebb elvesző megbízás, jobb partnerélmény', urgency: 'Medium', actionLabel: 'Riport', route: DEMO_SCENARIO_PATHS[normalized] },
          ],
          companySignals: [
            { label: 'Adatforrások', value: 'Hirdetések, jelentkezések, keresések, partnerexportok' },
            { label: 'Működési terület', value: 'Toborzási és diákmunka-platform' },
            { label: 'Fókusz', value: 'Jelöltút, partneri igény, illesztés' },
          ],
          reportSignals: [
            { label: 'Tartalom', value: 'Hirdetések, jelöltút, keresési rések, partneri teendők' },
            { label: 'Kinek szól', value: 'Alapító, operációs vezető, partnerkapcsolati csapat' },
            { label: 'Formátum', value: 'Heti vezetői riport / megosztható link' },
          ],
          assistant: {
            title: 'Toborzási elemző',
            status: 'Bemutató asszisztens',
            greeting: 'Összeraktam a platform legfontosabb jeleit: hirdetések, jelöltek, keresések, illesztések és partnerek.',
            note: 'A legjobb rész: kiderül, hol van élet a platformon, és hol tűnik el csendben az érték. Igen, a jelölt, aki csak „később visszanéz”, itt nyomot hagy.',
            prompts: [
              { question: 'Miért érdekes?', answer: 'Mert egy toborzási platformnál nem elég látni, hány hirdetés fut. Azt is látni kell, hol akad el a jelölt, melyik keresés nem ad jó találatot, és melyik partner igénye sürgős.' },
              { question: 'Hol veszik el érték?', answer: 'A profilmegtekintés utáni lemorzsolódásnál, a rosszul címkézett hirdetéseknél és azoknál a partnereknél, ahol nő az igény, de nincs tiszta következő lépés.' },
              { question: 'Mit tenne a csapat?', answer: 'Finomítaná a hirdetéscímkéket, újrarendezné a partneri prioritásokat, és külön figyelné azt a pontot, ahol a jelöltek eltűnnek.' },
              { question: 'Mi az aha pillanat?', answer: 'Amikor kiderül, hogy nem több jelölt kell először, hanem jobb útvonal a meglévő érdeklődőknek. Ez jóval olcsóbb beszélgetés.' },
            ],
          },
        }
      : {
          executiveSummary: {
            headline: 'TalentBridge can see where good candidates quietly disappear.',
            narrative: 'ModularAI connects job ads, applications, search behavior, partner demand, and matching outcomes. The team can see which job, candidate segment, or employer partner needs attention first.',
            confidenceLabel: 'AI confidence',
            confidenceValue: '88%',
            updatedLabel: 'Scenario refresh',
            updatedValue: 'Today 09:40',
            riskLabel: 'Recruitment risk',
            riskValue: 'Needs attention',
          },
          kpis: [
            { id: 'job-demand', label: 'Active partner demand', value: '186', caption: 'open roles', trend: '+14% vs last week', icon: 'work_alert', tone: 'warning' },
            { id: 'candidate-dropoff', label: 'Candidate drop-off', value: '31%', caption: 'after profile view', trend: '2 funnel points', icon: 'person_off', tone: 'danger' },
            { id: 'match-quality', label: 'Match quality', value: '81%', caption: 'usable matches', trend: '-6 pts', icon: 'join_inner', tone: 'primary' },
            { id: 'search-gap', label: 'Search gap', value: '428', caption: 'unanswered searches', trend: '6 themes', icon: 'manage_search', tone: 'success' },
          ],
          recommendations: [
            { id: 'dropoff', title: 'Fix the candidate journey at the critical step', description: 'Most drop-off happens after profile view, especially across three high-traffic job ads.', impact: 'More applications from the same traffic', urgency: 'High', actionLabel: 'Review journey', route: DEMO_SCENARIO_PATHS[normalized] },
            { id: 'matching', title: 'Tune matching from search patterns', description: 'Candidates often search for roles that exist, but labels and filters keep the right jobs hidden.', impact: 'Better match rate without more ad spend', urgency: 'Medium', actionLabel: 'Inspect matches', route: DEMO_SCENARIO_PATHS[normalized] },
            { id: 'partners', title: 'Create this week’s partner priority list', description: 'Five partners show rising demand, weak candidate fit, or slow follow-up.', impact: 'Fewer lost requests and better partner experience', urgency: 'Medium', actionLabel: 'Open report', route: DEMO_SCENARIO_PATHS[normalized] },
          ],
          companySignals: [
            { label: 'Data sources', value: 'Job ads, applications, searches, partner exports' },
            { label: 'Operational footprint', value: 'Recruitment and student-work platform' },
            { label: 'Demo focus', value: 'Candidate journey, partner demand, matching' },
          ],
          reportSignals: [
            { label: 'Included sections', value: 'Job ads, candidate journey, search gaps, partner actions' },
            { label: 'Audience', value: 'Founder, operations lead, partner team' },
            { label: 'Format target', value: 'Weekly leadership report / share link' },
          ],
          assistant: {
            title: 'Recruitment analyst',
            status: 'Demo assistant',
            greeting: 'I grouped the key platform signals: jobs, candidates, searches, matching, and partners.',
            note: 'The fun part: you see where the platform is alive, and where value quietly disappears. Yes, even the candidate who “will come back later” leaves a trail.',
            prompts: [
              { question: 'Why is this useful?', answer: 'A recruitment platform should not only know how many jobs are live. It should know where candidates drop off, which searches fail, and which partner demand is urgent.' },
              { question: 'Where is value leaking?', answer: 'After profile view, in poorly labeled roles, and with partners whose demand is growing but follow-up is unclear.' },
              { question: 'What would the team do?', answer: 'Tune job labels, reorder partner priorities, and watch the exact step where candidates disappear.' },
              { question: 'What is the aha moment?', answer: 'Sometimes the first fix is not more candidates. It is a better path for the candidates you already attracted. That is a much cheaper conversation.' },
            ],
          },
        };
  }

  if (normalized === 'demo-sales') {
    return hu
      ? {
          executiveSummary: {
            headline: 'Az Atlas hamarabb látja, mely ügyfelek igényelnek figyelmet.',
            narrative: 'A ModularAI egy helyre rendezi a CRM-adatokat, support jeleket, használati információkat és ügyféltáblázatokat. Így tisztábban látszik a kockázat, a bővítési lehetőség és a következő teendő.',
            confidenceLabel: 'Bizalmi szint',
            confidenceValue: '90%',
            updatedLabel: 'Demo frissítés',
            updatedValue: 'Ma 09:40',
            riskLabel: 'Bevételi kockázat',
            riskValue: 'Emelkedett',
          },
          kpis: [
            { id: 'at-risk-arr', label: 'Veszélyben lévő bevétel', value: '68,2k $', caption: 'megújítás előtt', trend: '+11%', icon: 'warning', tone: 'danger' },
            { id: 'weak-accounts', label: 'Gyengülő ügyfelek', value: '12', caption: 'csökkent aktivitás', trend: '4 kiemelt', icon: 'account_circle', tone: 'warning' },
            { id: 'upsell', label: 'Bővítési jel', value: '18', caption: 'jó illeszkedés', trend: '+7 új', icon: 'trending_up', tone: 'success' },
            { id: 'followups', label: 'Elmaradt follow-up', value: '31', caption: 'lejárt CRM feladat', trend: '9 lezárva', icon: 'task_alt', tone: 'primary' },
          ],
          recommendations: [
            { id: 'renewals', title: 'Kockázatos megújítások előre vétele', description: 'Négy ügyfélnél csökkenő aktivitás és lassú következő lépés látszik.', impact: '38k $ közeli értéket véd', urgency: 'High', actionLabel: 'Ügyfelek', route: DEMO_SCENARIO_PATHS[normalized] },
            { id: 'upsell', title: 'Bővítési lista használati jelekből', description: 'Több ügyfél magasabb csomaghoz illeszkedő igényeket jelez.', impact: 'Jegyzetekből vezetői lehetőséglista készül', urgency: 'Medium', actionLabel: 'Jelek', route: DEMO_SCENARIO_PATHS[normalized] },
            { id: 'hygiene', title: 'Ügyfélriportok tisztítása', description: 'Duplikált mezők és régi pipeline státuszok rontják a heti képet.', impact: 'Megbízhatóbb heti egyeztetés', urgency: 'Medium', actionLabel: 'Riport', route: DEMO_SCENARIO_PATHS[normalized] },
          ],
          companySignals: [
            { label: 'Adatforrások', value: 'CRM, ügyféltáblázatok, jegyzetek, használati jelek' },
            { label: 'Működési terület', value: '42 aktív ügyfél, 9 ügyfélfelelős' },
            { label: 'Fókusz', value: 'Kockázat, bővítés, utánkövetés' },
          ],
          reportSignals: [
            { label: 'Tartalom', value: 'Összefoglaló, ügyfélkockázatok, bővítési jelek, felelősök' },
            { label: 'Kinek szól', value: 'CEO, értékesítési vezető, ügyfélfelelősök' },
            { label: 'Formátum', value: 'Heti ügyfélriport / export' },
          ],
          assistant: {
            title: 'Bevételi elemző',
            status: 'Bemutató asszisztens',
            greeting: 'Az ügyféladatokat megújítási kockázat, bővítési lehetőség és utánkövetés szerint rendeztem.',
            note: 'A hasznos pillanat az, amikor a CRM, néhány jegyzet és support jel együtt megmutatja, kihez kell ma nyúlni.',
            prompts: [
              { question: 'Miért ez a sorrend?', answer: 'A megújítási kockázat sürgősebb, mint a bővítés. Előbb a veszélyben lévő értéket kell védeni.' },
              { question: 'Mit lát az ügyfélfelelős?', answer: 'Rövid listát: melyik ügyfél gyengül, miért fontos, és mi legyen a következő lépés.' },
              { question: 'Mi a vezetői érték?', answer: 'Kevesebb sztori, több konkrét jel: aktivitás, feladat, kockázat és felelős.' },
            ],
          },
        }
      : {
          executiveSummary: {
            headline: 'Atlas can protect renewals and focus account teams on the right next actions.',
            narrative: 'ModularAI connected CRM exports, usage notes, support activity, and account spreadsheets. The strongest opportunity is to identify weak accounts early and turn scattered signals into clear follow-up priorities.',
            confidenceLabel: 'AI confidence',
            confidenceValue: '90%',
            updatedLabel: 'Scenario refresh',
            updatedValue: 'Today 09:40',
            riskLabel: 'Revenue risk',
            riskValue: 'Elevated',
          },
          kpis: [
            { id: 'at-risk-arr', label: 'Revenue at risk', value: '$68.2k', caption: 'renewals need action', trend: '+11% vs last week', icon: 'warning', tone: 'danger' },
            { id: 'weak-accounts', label: 'Weak accounts', value: '12', caption: 'activity dropped', trend: '4 high priority', icon: 'account_circle', tone: 'warning' },
            { id: 'upsell', label: 'Upsell signals', value: '18', caption: 'accounts showing fit', trend: '+7 new', icon: 'trending_up', tone: 'success' },
            { id: 'followups', label: 'Missed follow-ups', value: '31', caption: 'CRM tasks overdue', trend: '-9 resolved', icon: 'task_alt', tone: 'primary' },
          ],
          recommendations: [
            { id: 'renewals', title: 'Prioritize renewal accounts with falling activity', description: 'Four accounts show declining meetings, support sentiment changes, and delayed next steps before renewal.', impact: 'Protects $38k in near-term renewal value', urgency: 'High', actionLabel: 'Review accounts', route: DEMO_SCENARIO_PATHS[normalized] },
            { id: 'upsell', title: 'Create an upsell list from usage and support patterns', description: 'Several customers repeatedly ask for workflows that map to a higher package.', impact: 'Turns scattered notes into a manager-ready opportunity list', urgency: 'Medium', actionLabel: 'Open signals', route: DEMO_SCENARIO_PATHS[normalized] },
            { id: 'hygiene', title: 'Clean inconsistent account reports before weekly review', description: 'Duplicate fields and stale pipeline stages are creating contradictory performance views.', impact: 'Improves confidence in forecast meetings', urgency: 'Medium', actionLabel: 'Preview report', route: DEMO_SCENARIO_PATHS[normalized] },
          ],
          companySignals: [
            { label: 'Data sources', value: 'CRM, account sheets, notes, usage signals' },
            { label: 'Operational footprint', value: '42 active accounts, 9 account managers' },
            { label: 'Demo focus', value: 'Risk, upsell, account follow-up' },
          ],
          reportSignals: [
            { label: 'Included sections', value: 'Summary, account risks, upsell signals, owner actions' },
            { label: 'Audience', value: 'CEO, sales lead, account managers' },
            { label: 'Format target', value: 'Weekly account review / exportable report' },
          ],
          assistant: {
            title: 'Revenue analyst',
            status: 'Demo assistant',
            greeting: 'I organized account data around renewal risk, upsell fit, and follow-up focus.',
            note: 'The fun part is when a CRM export, a few notes, and support signals suddenly show which customer needs attention today.',
            prompts: [
              { question: 'Why this order?', answer: 'Renewal risk is more time-sensitive than upsell. The team protects exposed value first, then builds the expansion list.' },
              { question: 'What does an AM see?', answer: 'A short list: which account is weakening, why it matters, estimated impact, and the next best follow-up.' },
              { question: 'What does leadership get?', answer: 'Less anecdote in weekly review, more traceable signals: activity, tasks, risk, and owner.' },
            ],
          },
        };
  }

  return hu
    ? {
        executiveSummary: {
          headline: 'A Clearline hamarabb látja, hol akad el a munka.',
          narrative: 'A ModularAI egy helyre rendezi a táblázatokat, ticket exportokat, folyamatnaplókat és riportokat. Így gyorsabban kiderül, mi késik, hol hibás az adat, és mit kell először javítani.',
          confidenceLabel: 'Bizalmi szint',
          confidenceValue: '87%',
          updatedLabel: 'Demo frissítés',
          updatedValue: 'Ma 09:40',
          riskLabel: 'Folyamatkockázat',
          riskValue: 'Közepes',
        },
        kpis: [
          { id: 'manual-hours', label: 'Manuális riportálás', value: '34 óra', caption: 'heti vezetői idő', trend: '+6 óra', icon: 'schedule', tone: 'warning' },
          { id: 'workflow-delays', label: 'Folyamatkésés', value: '19', caption: 'határidőn túl', trend: '6 sürgős', icon: 'pending_actions', tone: 'danger' },
          { id: 'data-issues', label: 'Adatminőségi hibák', value: '73', caption: 'duplikációk és hiányok', trend: '-12 javítva', icon: 'rule', tone: 'primary' },
          { id: 'report-ready', label: 'Riportkészültség', value: '82%', caption: 'validált részek', trend: '+9 pont', icon: 'summarize', tone: 'success' },
        ],
        recommendations: [
          { id: 'bottlenecks', title: 'Ismétlődő késések kiemelése', description: 'Két folyamatlépés adja a késések nagy részét.', impact: 'Kevesebb meglepetés a heti riport előtt', urgency: 'High', actionLabel: 'Elakadások', route: DEMO_SCENARIO_PATHS[normalized] },
          { id: 'quality', title: 'Duplikált és hiányzó mezők javítása', description: 'Több riport sor eltér az exportok között.', impact: 'Kevesebb kézi egyeztetés', urgency: 'Medium', actionLabel: 'Hibák', route: DEMO_SCENARIO_PATHS[normalized] },
          { id: 'summary', title: 'Rövid vezetői összefoglaló', description: 'A cockpit exportálható összefoglalót készít a csapatvezetőknek.', impact: 'A riportmunka újrahasználható folyamattá válik', urgency: 'Low', actionLabel: 'Riport', route: DEMO_SCENARIO_PATHS[normalized] },
        ],
        companySignals: [
          { label: 'Adatforrások', value: 'Táblázatok, folyamatnaplók, ticket exportok' },
          { label: 'Működési terület', value: 'Elosztott csapatok és visszatérő riportok' },
          { label: 'Fókusz', value: 'Elakadások, adatminőség, riportálás' },
        ],
        reportSignals: [
          { label: 'Tartalom', value: 'Összefoglaló, workflow-késések, adathibák, következő lépések' },
          { label: 'Kinek szól', value: 'Operációs vezető, menedzserek, csapatfelelősök' },
          { label: 'Formátum', value: 'Heti vezetői riport / link' },
        ],
        assistant: {
          title: 'Operációs elemző',
          status: 'Bemutató asszisztens',
          greeting: 'A riportokat, ticketeket és folyamatjeleket egy operációs nézetbe rendeztem.',
          note: 'Ez akkor üt igazán, amikor a csapat ráismer: ezeket az elakadásokat eddig is láttuk, csak nem ilyen tisztán.',
          prompts: [
            { question: 'Hol nyer időt?', answer: 'A heti riport előtt: a duplikációk, hiányzó mezők és késések már az egyeztetés előtt látszanak.' },
            { question: 'Mi a vezetői aha?', answer: 'Nem csak az látszik, hogy késés van, hanem az is, melyik lépésnél vagy felelősnél ismétlődik.' },
            { question: 'Mit lehet exportálni?', answer: 'Egy rövid vezetői összefoglalót KPI-kkal, kockázatokkal, adathibákkal és javasolt lépésekkel.' },
          ],
        },
      }
    : {
        executiveSummary: {
          headline: 'Clearline can reduce reporting drag and surface workflow blockers earlier.',
          narrative: 'ModularAI connected spreadsheets, workflow logs, ticket exports, and recurring reports. The strongest opportunity is to identify repeated delays and data quality issues before they consume manager time.',
          confidenceLabel: 'AI confidence',
          confidenceValue: '87%',
          updatedLabel: 'Scenario refresh',
          updatedValue: 'Today 09:40',
          riskLabel: 'Process risk',
          riskValue: 'Moderate',
        },
        kpis: [
          { id: 'manual-hours', label: 'Manual reporting', value: '34h', caption: 'weekly manager time', trend: '+6h vs last week', icon: 'schedule', tone: 'warning' },
          { id: 'workflow-delays', label: 'Workflow delays', value: '19', caption: 'items past target', trend: '6 urgent', icon: 'pending_actions', tone: 'danger' },
          { id: 'data-issues', label: 'Data quality issues', value: '73', caption: 'duplicates and gaps', trend: '-12 fixed', icon: 'rule', tone: 'primary' },
          { id: 'report-ready', label: 'Report readiness', value: '82%', caption: 'validated sections', trend: '+9 pts', icon: 'summarize', tone: 'success' },
        ],
        recommendations: [
          { id: 'bottlenecks', title: 'Escalate repeated workflow delays by owner and stage', description: 'Two process stages account for most late work and are concentrated in a small set of recurring queues.', impact: 'Reduces avoidable delay before weekly reporting', urgency: 'High', actionLabel: 'Review blockers', route: DEMO_SCENARIO_PATHS[normalized] },
          { id: 'quality', title: 'Fix duplicate and missing fields before the manager pack', description: 'Several report rows disagree across exports, creating manual reconciliation work.', impact: 'Cuts reporting cleanup time and improves confidence', urgency: 'Medium', actionLabel: 'Inspect issues', route: DEMO_SCENARIO_PATHS[normalized] },
          { id: 'summary', title: 'Generate a concise operating summary from current signals', description: 'The same dashboard can produce a short, exportable summary for team leads.', impact: 'Turns repeated reporting work into a reusable workflow', urgency: 'Low', actionLabel: 'Preview report', route: DEMO_SCENARIO_PATHS[normalized] },
        ],
        companySignals: [
          { label: 'Data sources', value: 'Spreadsheets, workflow logs, ticket exports' },
          { label: 'Operational footprint', value: 'Distributed teams and recurring reports' },
          { label: 'Demo focus', value: 'Bottlenecks, data quality, reporting' },
        ],
        reportSignals: [
          { label: 'Included sections', value: 'Summary, workflow delays, data issues, next actions' },
          { label: 'Audience', value: 'Operations lead, managers, team owners' },
          { label: 'Format target', value: 'Manager-ready weekly report / share link' },
        ],
        assistant: {
          title: 'Operations analyst',
          status: 'Demo assistant',
          greeting: 'I grouped reporting, ticket, and workflow signals into one operating decision view.',
          note: 'This demo works when a team recognizes the pattern: they already knew these blockers existed, but not this clearly.',
          prompts: [
            { question: 'Where does this save time?', answer: 'Before weekly reporting. Duplicate rows, missing fields, and late workflow items are surfaced before managers start reconciling manually.' },
            { question: 'What is the leadership aha?', answer: 'It shows not only that work is late, but which stage, owner, or queue keeps repeating the same pattern.' },
            { question: 'What can be exported?', answer: 'A short manager summary with KPIs, process risks, data quality issues, and recommended next steps.' },
          ],
        },
      };
}

export function getScenarioModuleData(
  scenarioId: string | undefined,
  moduleId: string | undefined,
  locale?: string
): ScenarioModuleData | null {
  const normalized = normalizeDemoScenarioId(scenarioId);
  const hu = isHu(locale);

  if (normalized !== 'demo-workforce' || !moduleId) return null;

  const assistant: ScenarioModuleData['assistant'] = hu
    ? {
        title: 'Toborzási elemző',
        status: 'Bemutató asszisztens',
        greeting: 'Ebben a fülben csak az adott terület jeleit mutatom, hogy ne kelljen egyszerre mindent nézni.',
        note: 'A jó demo itt az, amikor a csapat ránéz, és azt mondja: igen, ezt mi most Excelben, Slackben és fejben rakjuk össze.',
        prompts: [
          { question: 'Mit nézzek először?', answer: 'A piros vagy sárga jelzéseket: ezek mutatják, hol csúszik jelölt, hirdetés vagy partneri igény.' },
          { question: 'Miért hasznos?', answer: 'Mert nem csak adatot mutat, hanem döntési sorrendet: mit javítsunk ma, mit vigyünk heti egyeztetésre, és mit lehet automatizálni.' },
          { question: 'Ez testre szabható?', answer: 'Igen. A valós demóban a mezők, KPI-k és teendők a platform saját folyamataihoz igazodnak.' },
        ],
      }
    : {
        title: 'Recruitment analyst',
        status: 'Demo assistant',
        greeting: 'This tab narrows the demo to one operating area so the user does not have to read everything at once.',
        note: 'The nice moment is when the team realizes: this is what we currently assemble from spreadsheets, chat threads, and memory.',
        prompts: [
          { question: 'What should I check first?', answer: 'Start with the warning signals. They show where a candidate, job ad, or partner request is slipping.' },
          { question: 'Why is it useful?', answer: 'It does not only show data. It helps order the decisions: fix today, review weekly, or automate next.' },
          { question: 'Can this fit our platform?', answer: 'Yes. In a real pilot, fields, KPIs, and actions are shaped around the platform’s own workflow.' },
        ],
      };

  const data: Record<string, ScenarioModuleData> = {
    jobs: hu
      ? {
          eyebrow: 'Hirdetésfigyelés',
          title: 'Mely hirdetések dolgoznak, és melyek csak zajt csinálnak?',
          description: 'A cél nem több hirdetés, hanem jobb döntés: melyik hirdetést kell átírni, kiemelni vagy partnerrel újraegyeztetni.',
          metrics: [
            { id: 'views', label: 'Megtekintés', value: '12 840', caption: 'utolsó 14 nap', icon: 'visibility', tone: 'primary' },
            { id: 'apply-rate', label: 'Jelentkezési arány', value: '8,7%', caption: 'hirdetésről jelentkezésre', icon: 'how_to_reg', tone: 'success' },
            { id: 'weak-ads', label: 'Gyenge hirdetés', value: '9', caption: 'sok kattintás, kevés jelentkező', icon: 'campaign', tone: 'warning' },
            { id: 'urgent', label: 'Sürgős partneri igény', value: '5', caption: 'héten kezelendő', icon: 'priority_high', tone: 'danger' },
          ],
          sections: [
            {
              title: 'Hirdetések, ahol a forgalom nem válik jelentkezéssé',
              description: 'Ezek tipikusan nem forgalmi problémák. A jelölt megérkezik, körbenéz, majd csendben távozik.',
              rows: [
                { id: 'warehouse-night', title: 'Éjszakai raktári műszak', description: 'Sok megtekintés, de alacsony jelentkezési arány. A bérsáv és a beosztás nincs elég korán tisztázva.', status: 'Javítandó', impact: '+18-24 jelentkezés/hó' },
                { id: 'student-event', title: 'Rendezvényes diákmunka', description: 'A keresések alapján népszerű, de a hirdetés címkézése túl általános.', status: 'Gyors nyereség', impact: 'Jobb találati arány' },
                { id: 'admin-temp', title: 'Adminisztratív beugrós munka', description: 'Partneri igény nő, a hirdetés viszont nem emeli ki a rugalmas időbeosztást.', status: 'Partneri egyeztetés', impact: 'Kevesebb elvesző megbízás' },
              ],
            },
          ],
          assistant,
        }
      : {
          eyebrow: 'Job ad intelligence',
          title: 'Which job ads work, and which ones only create noise?',
          description: 'The point is not more ads. It is knowing which ads to rewrite, promote, or discuss with a partner.',
          metrics: [
            { id: 'views', label: 'Views', value: '12,840', caption: 'last 14 days', icon: 'visibility', tone: 'primary' },
            { id: 'apply-rate', label: 'Apply rate', value: '8.7%', caption: 'view to application', icon: 'how_to_reg', tone: 'success' },
            { id: 'weak-ads', label: 'Weak ads', value: '9', caption: 'clicks without applicants', icon: 'campaign', tone: 'warning' },
            { id: 'urgent', label: 'Urgent demand', value: '5', caption: 'handle this week', icon: 'priority_high', tone: 'danger' },
          ],
          sections: [
            {
              title: 'Ads where traffic does not become applications',
              description: 'These are often not traffic problems. Candidates arrive, look around, and quietly leave.',
              rows: [
                { id: 'warehouse-night', title: 'Night warehouse shift', description: 'High views, low apply rate. Pay range and schedule are not clear early enough.', status: 'Needs fix', impact: '+18-24 applications/month' },
                { id: 'student-event', title: 'Student event work', description: 'Popular in search, but the ad labels are too generic.', status: 'Quick win', impact: 'Better match rate' },
                { id: 'admin-temp', title: 'Temporary admin work', description: 'Partner demand is rising, but the ad does not highlight flexible scheduling.', status: 'Partner sync', impact: 'Fewer lost requests' },
              ],
            },
          ],
          assistant,
        },
    candidates: hu
      ? {
          eyebrow: 'Jelöltút',
          title: 'Hol tűnnek el a jelöltek?',
          description: 'A jelöltút fül megmutatja, melyik lépésnél kell beavatkozni: profil, jelentkezés, visszahívás vagy partneri válasz.',
          metrics: [
            { id: 'started', label: 'Elindított jelentkezés', value: '1 286', caption: 'utolsó 14 nap', icon: 'start', tone: 'primary' },
            { id: 'dropoff', label: 'Lemorzsolódás', value: '31%', caption: 'profil után', icon: 'person_off', tone: 'danger' },
            { id: 'callback', label: 'Visszahívásra vár', value: '74', caption: '24 órán túl', icon: 'phone_in_talk', tone: 'warning' },
            { id: 'ready', label: 'Azonnal mozgósítható', value: '142', caption: 'jó illeszkedés', icon: 'bolt', tone: 'success' },
          ],
          sections: [
            {
              title: 'A jelöltút kritikus pontjai',
              description: 'Nem minden lemorzsolódás baj. A baj az, ha ugyanott történik újra és újra.',
              rows: [
                { id: 'profile', title: 'Profilmegtekintés után visszaesés', description: 'A jelöltek megnézik a részleteket, majd nem jelentkeznek. Jellemzően hiányzik a bér, helyszín vagy műszakpontosság.', status: 'Első javítás', impact: 'Több jelentkezés ugyanabból a forgalomból' },
                { id: 'callback', title: 'Lassú visszahívási kör', description: 'A jó jelöltek egy része 24 órán túl vár reakcióra.', status: 'Operációs teendő', impact: 'Gyorsabb betöltés' },
                { id: 'pool', title: 'Alvó, de releváns jelöltek', description: 'Korábbi jelentkezők között van olyan csoport, amely új hirdetésekhez jól illeszkedik.', status: 'Újraaktiválás', impact: 'Olcsóbb, mint új forgalmat venni' },
              ],
            },
          ],
          assistant,
        }
      : {
          eyebrow: 'Candidate journey',
          title: 'Where do candidates disappear?',
          description: 'This tab shows where to intervene: profile view, application, callback, or partner response.',
          metrics: [
            { id: 'started', label: 'Started applications', value: '1,286', caption: 'last 14 days', icon: 'start', tone: 'primary' },
            { id: 'dropoff', label: 'Drop-off', value: '31%', caption: 'after profile view', icon: 'person_off', tone: 'danger' },
            { id: 'callback', label: 'Waiting callback', value: '74', caption: 'over 24 hours', icon: 'phone_in_talk', tone: 'warning' },
            { id: 'ready', label: 'Ready to activate', value: '142', caption: 'good fit', icon: 'bolt', tone: 'success' },
          ],
          sections: [
            {
              title: 'Critical points in the candidate journey',
              description: 'Not every drop-off is bad. The problem is when it repeats at the same step.',
              rows: [
                { id: 'profile', title: 'Drop after profile view', description: 'Candidates read the details, then do not apply. Pay, location, or shift clarity is usually missing.', status: 'Fix first', impact: 'More applications from the same traffic' },
                { id: 'callback', title: 'Slow callback loop', description: 'Some strong candidates wait over 24 hours for a response.', status: 'Ops action', impact: 'Faster placement' },
                { id: 'pool', title: 'Dormant but relevant candidates', description: 'Past applicants include groups that fit new jobs well.', status: 'Reactivate', impact: 'Cheaper than buying new traffic' },
              ],
            },
          ],
          assistant,
        },
    search: hu
      ? {
          eyebrow: 'Keresési minták',
          title: 'Mit akar a jelölt, amit a platform nem ad vissza elég jól?',
          description: 'A keresésekből gyakran hamarabb látszik az igény, mint a riportokból. Itt jönnek elő a hiányzó címkék, rossz szinonimák és félrecsúszó találatok.',
          metrics: [
            { id: 'failed', label: 'Gyenge találat', value: '428', caption: '14 nap alatt', icon: 'search_off', tone: 'danger' },
            { id: 'themes', label: 'Keresési téma', value: '6', caption: 'AI csoportosítás', icon: 'hub', tone: 'primary' },
            { id: 'synonyms', label: 'Szinonima-javítás', value: '11', caption: 'gyors módosítás', icon: 'tune', tone: 'success' },
            { id: 'hidden', label: 'Elrejtett relevancia', value: '37%', caption: 'van ajánlat, rossz találat', icon: 'visibility_off', tone: 'warning' },
          ],
          sections: [
            {
              title: 'Keresések, amelyek mögött valós igény van',
              description: 'A jelölt néha nem szakmai taxonómiában gondolkodik. Meglepő, de a „könnyű esti meló” is adat.',
              rows: [
                { id: 'evening', title: '„esti munka egyetem mellett”', description: 'Van kapcsolódó ajánlat, de a címkék nem hozzák fel elég jól.', status: 'Szinonima', impact: 'Több releváns találat' },
                { id: 'weekly-pay', title: '„heti fizetés”', description: 'Gyakori keresés, kevés hirdetés emeli ki egyértelműen.', status: 'Hirdetés szöveg', impact: 'Magasabb jelentkezési arány' },
                { id: 'remote-admin', title: '„otthoni adminisztráció”', description: 'Kereslet van, de a partneri ajánlatok vegyesen vannak címkézve.', status: 'Kategória tisztítás', impact: 'Kevesebb elvesző keresés' },
              ],
            },
          ],
          assistant,
        }
      : {
          eyebrow: 'Search patterns',
          title: 'What do candidates want that the platform does not return well enough?',
          description: 'Search often reveals demand before reports do. This is where missing labels, weak synonyms, and bad matches appear.',
          metrics: [
            { id: 'failed', label: 'Weak results', value: '428', caption: 'last 14 days', icon: 'search_off', tone: 'danger' },
            { id: 'themes', label: 'Search themes', value: '6', caption: 'AI clustered', icon: 'hub', tone: 'primary' },
            { id: 'synonyms', label: 'Synonym fixes', value: '11', caption: 'quick changes', icon: 'tune', tone: 'success' },
            { id: 'hidden', label: 'Hidden relevance', value: '37%', caption: 'role exists, result weak', icon: 'visibility_off', tone: 'warning' },
          ],
          sections: [
            {
              title: 'Searches that hide real demand',
              description: 'Candidates do not always think in professional taxonomy. Funny enough, “easy evening work” is data.',
              rows: [
                { id: 'evening', title: '"evening job next to university"', description: 'Relevant jobs exist, but labels do not surface them well enough.', status: 'Synonym', impact: 'More relevant results' },
                { id: 'weekly-pay', title: '"weekly pay"', description: 'Common search, but few ads make it explicit.', status: 'Ad copy', impact: 'Higher application rate' },
                { id: 'remote-admin', title: '"remote admin work"', description: 'Demand exists, but partner offers are inconsistently labeled.', status: 'Category cleanup', impact: 'Fewer lost searches' },
              ],
            },
          ],
          assistant,
        },
    partners: hu
      ? {
          eyebrow: 'Partneri prioritások',
          title: 'Melyik partnerhez nyúljon először a csapat?',
          description: 'A partneri igények nem egyformán sürgősek. Ez a nézet segít sorrendet rakni kereslet, jelöltellátottság és üzleti hatás alapján.',
          metrics: [
            { id: 'urgent-partners', label: 'Kiemelt partner', value: '5', caption: 'héten kezelendő', icon: 'handshake', tone: 'danger' },
            { id: 'open-roles', label: 'Nyitott pozíció', value: '186', caption: 'aktív igény', icon: 'assignment', tone: 'warning' },
            { id: 'coverage', label: 'Jelöltfedezet', value: '72%', caption: 'megfelelő jelölt', icon: 'groups', tone: 'primary' },
            { id: 'expected', label: 'Várható érték', value: '24,5k $', caption: 'közeli lehetőség', icon: 'trending_up', tone: 'success' },
          ],
          sections: [
            {
              title: 'Heti partneri teendők',
              description: 'Ez nem CRM-helyettesítő. Ez egy vezetői sorrend: kivel kell ma beszélni, és miért.',
              rows: [
                { id: 'retail-chain', title: 'Nagy kereskedelmi partner', description: 'Nő az igény hétvégi műszakokra, de a jelöltfedezet gyenge.', status: 'Mai hívás', impact: 'Elvesző megbízások csökkentése' },
                { id: 'event-agency', title: 'Rendezvényes partner', description: 'Szezonális csúcs jön, a korábbi jelöltpool jól újraaktiválható.', status: 'Kampány', impact: 'Gyors feltöltés' },
                { id: 'office-admin', title: 'Irodai admin partner', description: 'Jó jelöltfedezet, de lassú partneri válaszidő.', status: 'Utánkövetés', impact: 'Rövidebb betöltési idő' },
              ],
            },
          ],
          assistant,
        }
      : {
          eyebrow: 'Partner priorities',
          title: 'Which partner should the team handle first?',
          description: 'Partner requests are not equally urgent. This view orders them by demand, candidate coverage, and business impact.',
          metrics: [
            { id: 'urgent-partners', label: 'Priority partners', value: '5', caption: 'handle this week', icon: 'handshake', tone: 'danger' },
            { id: 'open-roles', label: 'Open roles', value: '186', caption: 'active demand', icon: 'assignment', tone: 'warning' },
            { id: 'coverage', label: 'Candidate coverage', value: '72%', caption: 'good-fit candidates', icon: 'groups', tone: 'primary' },
            { id: 'expected', label: 'Expected value', value: '$24.5k', caption: 'near-term opportunity', icon: 'trending_up', tone: 'success' },
          ],
          sections: [
            {
              title: 'This week’s partner actions',
              description: 'This is not a CRM replacement. It is a leadership order: who needs attention today, and why.',
              rows: [
                { id: 'retail-chain', title: 'Large retail partner', description: 'Weekend shift demand is rising, but candidate coverage is weak.', status: 'Call today', impact: 'Reduce lost requests' },
                { id: 'event-agency', title: 'Event partner', description: 'Seasonal peak is coming, and the past candidate pool can be reactivated.', status: 'Campaign', impact: 'Faster fill' },
                { id: 'office-admin', title: 'Office admin partner', description: 'Good candidate coverage, but partner response time is slow.', status: 'Follow-up', impact: 'Shorter time-to-fill' },
              ],
            },
          ],
          assistant,
        },
  };

  return data[moduleId] || null;
}
