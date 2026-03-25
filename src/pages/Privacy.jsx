import React from 'react';
import { useTranslation } from 'react-i18next';

const Privacy = () => {
  const { i18n } = useTranslation();
  const isHu = i18n.language === 'hu';

  return (
    <main className="relative min-h-screen pt-32 pb-24 px-6 max-w-4xl mx-auto font-body text-on-surface-variant">
      {/* Decorative Blur Elements */}
      <div className="absolute top-[-5%] left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      
      <div className="mb-12">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-surface-container text-primary text-xs font-bold uppercase tracking-widest mb-6">
          {isHu ? "Utolsó frissítés: 2026. Március" : "Last Updated: March 2026"}
        </div>
        <h1 className="font-headline text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight">
          {isHu ? "Adatvédelmi Irányelvek" : "Privacy Policy"}
        </h1>
      </div>

      <div className="bg-surface-container-lowest glass-card rounded-2xl p-8 md:p-12 shadow-[0px_20px_40px_rgba(87,73,194,0.06)] space-y-8 text-lg leading-relaxed">
        {isHu ? (
          <>
            <section>
              <h2 className="font-headline text-2xl font-bold text-on-surface mb-4">1. Bevezetés</h2>
              <p>A ModularAI (a továbbiakban: "Személy", "Mi", vagy "Vállalat") tiszteletben tartja az Ön magánéletét és elkötelezett amellett, hogy megvédje az Ön személyes adatait. Ez az adatvédelmi nyilatkozat tájékoztatja Önt arról, hogyan kezeljük az adatait, amikor meglátogatja weboldalunkat (függetlenül attól, honnan látogatja meg), és tájékoztatja Önt adatvédelmi jogairól és arról, hogy a törvény hogyan védi Önt. Célunk az Általános Adatvédelmi Rendelet (GDPR) előírásainak való tökéletes megfelelés.</p>
            </section>
            <section>
              <h2 className="font-headline text-2xl font-bold text-on-surface mb-4">2. Az általunk gyűjtött adatok</h2>
              <p>Személyes adat alatt az azonosítható természetes személyre vonatkozó bármely információt értjük. Ezeket a következő kategóriákba soroljuk:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong>Azonosító adatok:</strong> keresztnév, vezetéknév, felhasználónév.</li>
                <li><strong>Kapcsolattartási adatok:</strong> számlázási cím, szállítási cím, e-mail cím és telefonszámok.</li>
                <li><strong>Technikai adatok:</strong> IP cím, bejelentkezési adatok, böngésző típusa és verziója, időzóna beállítás és helyzet.</li>
                <li><strong>Felhasználási adatok:</strong> arról szóló információk, hogyan használja weboldalunkat, termékeinket és szolgáltatásainkat.</li>
              </ul>
            </section>
            <section>
              <h2 className="font-headline text-2xl font-bold text-on-surface mb-4">3. Hogyan használjuk a személyes adatait?</h2>
              <p>Személyes adatait csak akkor használjuk fel, ha a törvény azt megengedi. Leggyakrabban az alábbi esetekben használjuk a személyes adatait:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Ahol a szerződést kell végrehajtanunk, amelyet Önnel kötni vagyunk, vagy megkötöttünk (pl. SaaS elemzések futtatása).</li>
                <li>Ahol ez jogos érdekünk (vagy egy harmadik fél érdeke), és az Ön érdekei és alapvető jogai nem írják felül ezeket az érdekeket.</li>
                <li>Ahol jogszabályi vagy szabályozási kötelezettségnek kell megfelelnünk.</li>
              </ul>
            </section>
            <section>
              <h2 className="font-headline text-2xl font-bold text-on-surface mb-4">4. Adatbiztonság</h2>
              <p>Megfelelő biztonsági intézkedéseket vezettünk be annak megakadályozására, hogy az Ön személyes adatai véletlenül elveszjenek, illetéktelenül felhasználják vagy azokhoz hozzáférjenek, azokat megváltoztassák vagy felfedjék. Továbbá a személyes adataihoz való hozzáférést a munkavállalóinkra, ügynökeinkre, vállalkozóinkra és más harmadik felekre korlátozzuk.</p>
            </section>
            <section>
              <h2 className="font-headline text-2xl font-bold text-on-surface mb-4">5. Jogai</h2>
              <p>Bizonyos körülmények között Önnek joga van:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Személyes adataihoz hozzáférést kérni.</li>
                <li>A birtokunkban lévő személyes adatainak helyesbítését kérni.</li>
                <li>Személyes adatainak törlését kérni.</li>
                <li>Személyes adatai kezelésének korlátozását kérni.</li>
              </ul>
            </section>
          </>
        ) : (
          <>
            <section>
              <h2 className="font-headline text-2xl font-bold text-on-surface mb-4">1. Introduction</h2>
              <p>ModularAI ("We", "Us", or "Our") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you. Our operations comply fully with the General Data Protection Regulation (GDPR).</p>
            </section>
            <section>
              <h2 className="font-headline text-2xl font-bold text-on-surface mb-4">2. The Data We Collect</h2>
              <p>Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version.</li>
                <li><strong>Usage Data:</strong> includes information about how you use our website, products and services.</li>
              </ul>
            </section>
            <section>
              <h2 className="font-headline text-2xl font-bold text-on-surface mb-4">3. How We Use Your Data</h2>
              <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g. running predictive SaaS pipelines).</li>
                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                <li>Where we need to comply with a legal or regulatory obligation.</li>
              </ul>
            </section>
            <section>
              <h2 className="font-headline text-2xl font-bold text-on-surface mb-4">4. Data Security</h2>
              <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.</p>
            </section>
            <section>
              <h2 className="font-headline text-2xl font-bold text-on-surface mb-4">5. Your Legal Rights</h2>
              <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data. You have the right to:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Request access to your personal data.</li>
                <li>Request correction of your personal data.</li>
                <li>Request erasure of your personal data.</li>
                <li>Object to processing of your personal data.</li>
              </ul>
            </section>
          </>
        )}
      </div>
    </main>
  );
};

export default Privacy;
