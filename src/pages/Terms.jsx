import React from 'react';
import { useTranslation } from 'react-i18next';

const Terms = () => {
  const { i18n } = useTranslation();
  const isHu = i18n.language === 'hu';

  return (
    <main className="relative min-h-screen pt-32 pb-24 px-6 max-w-4xl mx-auto font-body text-on-surface-variant">
      {/* Decorative Blur Elements */}
      <div className="absolute top-[-5%] left-[-10%] w-[500px] h-[500px] bg-tertiary-container/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      
      <div className="mb-12">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-surface-container text-tertiary text-xs font-bold uppercase tracking-widest mb-6">
          {isHu ? "Utolsó frissítés: 2026. Március" : "Last Updated: March 2026"}
        </div>
        <h1 className="font-headline text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight">
          {isHu ? "Szolgáltatási Feltételek" : "Terms of Service"}
        </h1>
      </div>

      <div className="bg-surface-container-lowest glass-card rounded-2xl p-8 md:p-12 shadow-[0px_20px_40px_rgba(87,73,194,0.06)] space-y-8 text-lg leading-relaxed">
        {isHu ? (
          <>
            <section>
              <h2 className="font-headline text-2xl font-bold text-on-surface mb-4">1. Elfogadás</h2>
              <p>A ModularAI (beleértve a weblapot és SaaS API endpointokat) használatával és elérésével Ön elfogadja és magára nézve kötelezőnek ismeri el a jelen Szolgáltatási Feltételeket. Ha nem ért egyet ezekkel a feltételekkel, kérjük ne használja a rendszereinket.</p>
            </section>
            <section>
              <h2 className="font-headline text-2xl font-bold text-on-surface mb-4">2. Szolgáltatás Leírása</h2>
              <p>A ModularAI egy felhő alapú prediktív adatelemző eszköz ("Szolgáltatás"). A Szolgáltatást as-is alapon nyújtjuk, és folyamatosan fejlesztjük; a funkciók, kapacitások és elemzési módszerek idővel változhatnak vagy frissülhetnek előzetes értesítés nélkül.</p>
            </section>
            <section>
              <h2 className="font-headline text-2xl font-bold text-on-surface mb-4">3. Felhasználói Kötelezettségek & Adatok</h2>
              <p>Ön kizárólagos felelősséggel tartozik a ModularAI platformra feltöltött adatok pontosságáért, minőségéért és törvényességéért. A Vállalat soha nem követel tulajdonjogot az Ön nyers adatain, de Ön korlátozott, nem kizárólagos engedélyt ad számunkra az elemzési feladatok és gépi tanulási predikciók futtatására a rendszer biztonságos belső feldolgozó motorjaiban.</p>
            </section>
            <section>
              <h2 className="font-headline text-2xl font-bold text-on-surface mb-4">4. Felelősségkorlátozás</h2>
              <p>A törvény által megengedett maximális mértékig a ModularAI technológiát nyújtó Vállalat vagy beszállítói nem felelősek semmilyen közvetett, véletlen, különleges, következményes vagy büntető kárért, beleértve az elmaradt hasznot, adatvesztést vagy használat kiesést, függetlenül attól, hogy ezek a károk hogyan keletkeztek (akár a gépi tanulási előrejelzések hibájából).</p>
            </section>
            <section>
              <h2 className="font-headline text-2xl font-bold text-on-surface mb-4">5. Számlázás és Előfizetések</h2>
              <p>Minden SaaS csomagot és vállalati réteget ciklusonként előre számlázunk (havi vagy éves bontásban). A pro-rata visszatérítések a fiók bezárása / visszaminősítése esetén alapesetben nem támogatottak. Az árváltoztatás jogát fenntartjuk ésszerű (30 napos) előzetes értesítés megadása mellett.</p>
            </section>
          </>
        ) : (
          <>
            <section>
              <h2 className="font-headline text-2xl font-bold text-on-surface mb-4">1. Agreement to Terms</h2>
              <p>By accessing or using ModularAI (including the website and SaaS API endpoints), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the service.</p>
            </section>
            <section>
              <h2 className="font-headline text-2xl font-bold text-on-surface mb-4">2. Description of Service</h2>
              <p>ModularAI acts as a cloud-based predictive data analytics engine ("Service"). We provide the Service "as is" and actively develop it; features, quotas, or analysis methods may change or be deprecated over time without formal prior notice.</p>
            </section>
            <section>
              <h2 className="font-headline text-2xl font-bold text-on-surface mb-4">3. User Obligations & Data</h2>
              <p>You assume sole responsibility for the accuracy, quality, and legality of the data you push into the ModularAI platform. The Company never claims ownership of your raw datasets, but you explicitly grant us a limited, non-exclusive license to scan, analyze, and process the records in order to generate your scheduled machine learning predictions within our isolated pipelines.</p>
            </section>
            <section>
              <h2 className="font-headline text-2xl font-bold text-on-surface mb-4">4. Limitation of Liability</h2>
              <p>To the maximum extent permitted by applicable law, in no event shall the Company providing ModularAI technologies or its suppliers be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from machine learning prediction errors, structural advice, or hardware outages.</p>
            </section>
            <section>
              <h2 className="font-headline text-2xl font-bold text-on-surface mb-4">5. Memberships and Billing</h2>
              <p>All SaaS packages and enterprise layers are billed in advance on a recurring basis (monthly or annually). We generally do not provide pro-rata refunds for partial use of a billing cycle or early downgrade cancellations. We retain the right to alter pricing brackets with a localized 30-day proactive notification window.</p>
            </section>
          </>
        )}
      </div>
    </main>
  );
};

export default Terms;
