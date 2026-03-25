import React from 'react';
import { useTranslation } from 'react-i18next';

const Security = () => {
  const { i18n } = useTranslation();
  const isHu = i18n.language === 'hu';

  return (
    <main className="relative min-h-screen pt-32 pb-24 px-6 max-w-5xl mx-auto font-body text-on-surface-variant">
      
      {/* Decorative Blur Elements */}
      <div className="absolute top-[-5%] right-[-10%] w-[500px] h-[500px] bg-secondary-container/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-secondary-fixed text-on-secondary-fixed mb-8 rounded-full border-4 border-white shadow-xl shadow-secondary/10">
            <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>shield_locked</span>
        </div>
        <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface tracking-tight mb-6">
          {isHu ? "Adatbiztonság. Nullától a Végtelenig." : "Security. End-to-End Integrity."}
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-on-surface-variant leading-relaxed">
            {isHu ? "Olyan biztonsági rétegekkel dolgozunk, ahol az Ön kulcsfontosságú ipartitkai teljesen el vannak szigetelve a nyilvánosságtól." : "Architectured with enterprise-grade isolation boundaries so your trade secrets never physically brush against the public domain."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 1 */}
        <div className="bg-surface-container-lowest glass-card rounded-2xl p-8 shadow-[0px_20px_40px_rgba(87,73,194,0.06)] border border-secondary/10 transition-transform hover:scale-[1.01] duration-300">
            <div className="flex items-center gap-4 mb-6">
                 <span className="material-symbols-outlined text-3xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                 <h3 className="font-headline text-2xl font-bold text-on-surface">{isHu ? "Titkosítás Érkezéskor" : "Encryption at Rest and Transit"}</h3>
            </div>
            <p className="text-lg leading-relaxed">
                {isHu ? "Minden feltöltött forrásadat automatikusan AES-256 szinten titkosításra kerül. Az európai ügyfelek számára a tranzit TLS 1.3 protokollon zajlik egy izolált VPN alagúton keresztül." : "All uploaded dataset sources are immediately sealed using AES-256 bit encryption keys. TLS 1.3 protocol strictly manages all transit layers between our edge CDN and your browser."}
            </p>
        </div>

        {/* Card 2 */}
        <div className="bg-surface-container-lowest glass-card rounded-2xl p-8 shadow-[0px_20px_40px_rgba(87,73,194,0.06)] border border-secondary/10 transition-transform hover:scale-[1.01] duration-300">
            <div className="flex items-center gap-4 mb-6">
                 <span className="material-symbols-outlined text-3xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>gpp_good</span>
                 <h3 className="font-headline text-2xl font-bold text-on-surface">{isHu ? "SOC 2 Type II Igazolás" : "SOC 2 Type II Certified"}</h3>
            </div>
            <p className="text-lg leading-relaxed">
                {isHu ? "Infrastruktúránkat független könyvvizsgáló cégek validálják, hogy garantáltan megfeleljünk a legszigorúbb biztonsági, elérhetőségi és feldolgozási sztenderdeknek." : "Our infrastructure layer is routinely audited by independent accounting firms to guarantee we meet the strict Trust Services Criteria constraints."}
            </p>
        </div>

        {/* Card 3 */}
        <div className="bg-surface-container-lowest glass-card rounded-2xl p-8 shadow-[0px_20px_40px_rgba(87,73,194,0.06)] border border-secondary/10 md:col-span-2 transition-transform hover:scale-[1.01] duration-300">
            <div className="flex items-center gap-4 mb-6">
                 <span className="material-symbols-outlined text-3xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>data_saver_on</span>
                 <h3 className="font-headline text-2xl font-bold text-on-surface">{isHu ? "Nulla Generatív Megosztás" : "Zero Generative Pool Bleeding"}</h3>
            </div>
            <p className="text-lg leading-relaxed">
                {isHu ? "Vállalati adatbázisait soha nem használjuk nyílt nyelvi modellek finomhangolására, így semmilyen versenytárs nem tudja 'kikérdenzni' a rendszerünket az Ön adataiból." : "Your distinct enterprise datasets are completely firewalled and never injected into global LLM pre-training phases. We respect tenant isolation, meaning competitors cannot 'prompt' their way into your internal predictive behaviors."}
            </p>
        </div>
      </div>

    </main>
  );
};

export default Security;
