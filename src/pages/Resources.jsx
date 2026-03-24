import { useTranslation } from 'react-i18next';

const Resources = () => {
  const { t } = useTranslation();

  return (
    <main className="pt-32 pb-24">
      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-8 mb-20 text-center md:text-left">
        <div className="max-w-3xl">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-medium text-sm mb-6 font-label">
            {t('resources.badge')}
          </span>
          <h1 className="text-6xl md:text-7xl font-headline font-extrabold text-on-surface tracking-tight leading-[1.1] mb-8">
            {t('resources.title_start')} <span className="text-primary">{t('resources.title_highlight')}</span> {t('resources.title_end')}
          </h1>
          <p className="text-xl text-on-surface-variant font-body leading-relaxed max-w-2xl">
            {t('resources.subtitle')}
          </p>
        </div>
      </header>

      {/* Featured Article: The Bento Hero */}
      <section className="max-w-7xl mx-auto px-8 mb-24">
        <div className="group relative overflow-hidden rounded-xl md:rounded-lg bg-surface-container-lowest shadow-[0px_20px_40px_rgba(87,73,194,0.06)] flex flex-col md:flex-row h-full md:min-h-[500px]">
          <div className="flex-1 p-10 md:p-16 flex flex-col justify-center order-2 md:order-1 relative z-10 bg-surface-container-lowest md:bg-transparent">
            <div className="flex items-center gap-2 mb-6 text-primary font-semibold text-sm uppercase tracking-widest">
              <span className="material-symbols-outlined text-base">star</span>
              {t('resources.featured_badge')}
            </div>
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-on-surface mb-6 leading-tight">
              {t('resources.featured_title')}
            </h2>
            <p className="text-lg text-on-surface-variant mb-10 leading-relaxed max-w-lg">
              {t('resources.featured_desc')}
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button className="bg-gradient-to-r from-primary to-primary-container text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all flex items-center gap-2">
                {t('resources.featured_btn')}
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <span className="text-on-surface-variant text-sm font-medium italic">{t('resources.featured_time')}</span>
            </div>
          </div>
          <div className="flex-1 order-1 md:order-2 relative min-h-[300px] md:min-h-auto overflow-hidden">
            <img 
              className="absolute inset-0 w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKugPYP8dR70nDSVEXKYquX1uT0xkLkhqOY7qWon_p1WJ6wcFw8ukeH8FOy0WVy6UaTEUtJM9W2ud8bCtUbYJZNp6DMh-KZn34Efpku5zcia-3ZOx2HpiF2RnAH53d3_AkYwV1SuUfwYuvqYSw8G9T0VFvBj1AShruq93P6hn5K-qghTwIoLk80ah6IbZMrAm4UU4cX2rgcD6lwZ2jwSMeixvAeYdWtks5gwBCpWiDJwdVf2qbADq5HG_P_0rdTFI8RrWGnH7yTMU" 
              alt="Data visualization illustration" 
            />
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="max-w-7xl mx-auto px-8 mb-16 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-4 min-w-max pb-4">
          <button className="px-8 py-3 rounded-full bg-primary text-white font-semibold transition-all shadow-sm">
            {t('resources.filter_all')}
          </button>
          <button className="px-8 py-3 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-medium">
            {t('resources.filter_blog')}
          </button>
          <button className="px-8 py-3 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-medium">
            {t('resources.filter_cases')}
          </button>
          <button className="px-8 py-3 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-medium">
            {t('resources.filter_whitepapers')}
          </button>
          <button className="px-8 py-3 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-medium">
            {t('resources.filter_videos')}
          </button>
        </div>
      </section>

      {/* Article Grid */}
      <section className="max-w-7xl mx-auto px-8 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Card 1 */}
          <article className="group cursor-pointer">
            <div className="aspect-[4/3] rounded-lg overflow-hidden mb-6 bg-surface-container-low shadow-sm">
              <img 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQN7waJcLan7UVJvXHUwPcxYtNE8yWT522scsopDvWRsQObEjxHe_-xSrayDeyaB1SrQN8VTjZqtvbY7WkxZprggB5zmM-HLy9M9DCGgOuvMol_2FbTjnMMmeFwVCoRHRLDZL_ocr6oLURgF7mJoLS72gHGoBm1lvSQrSDjk8AOeoaJpNE8xj9cpixlSDS3fkGG9AdgnHHs2xbeplCAiJWejAfnOMLLGB9P-LwjytXOHfBkWFJ7VBZK0HXvaXNgNrfrtgMxtEta5g" 
                alt="Minimalist workspace" 
              />
            </div>
            <div className="flex items-center gap-3 mb-4 text-xs font-bold text-primary tracking-widest uppercase">
              <span>{t('resources.card1_tag')}</span>
              <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
              <span>{t('resources.card1_time')}</span>
            </div>
            <h3 className="text-2xl font-headline font-bold text-on-surface mb-4 group-hover:text-primary transition-colors leading-tight">
              {t('resources.card1_title')}
            </h3>
            <p className="text-on-surface-variant leading-relaxed mb-6">
              {t('resources.card1_desc')}
            </p>
            <div className="inline-flex items-center gap-2 font-bold text-on-surface group-hover:text-primary group-hover:gap-4 transition-all">
              {t('resources.read_more')} <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </div>
          </article>

          {/* Card 2 */}
          <article className="group cursor-pointer">
            <div className="aspect-[4/3] rounded-lg overflow-hidden mb-6 bg-surface-container-low shadow-sm">
              <img 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXhchxrPObuQKBk_URGZ-n9poSL2YFcao0cBcRW6-r3Fe3eonMSwqa9p55rvXORfQ9JcCiyN-X4NHQHz-D_OZG5zZX13nMTfFDNGs2ZP8x6cRNIv7wsK3u-pZjsGJXUQG0451Cmja9TXfkHc2S6ph9ySvLPnpJ2be__pM8UHt_dMzGHUB1xlZ5UjamTU9w7v2rLOaefDuj9qOElvSZJ2qciSlidGLXDPwUN8waVRL7R3-OhWd3YQwQL4K323xkmnVsaQQ9gH_btVA" 
                alt="City lights" 
              />
            </div>
            <div className="flex items-center gap-3 mb-4 text-xs font-bold text-primary tracking-widest uppercase">
              <span>{t('resources.card2_tag')}</span>
              <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
              <span>{t('resources.card2_time')}</span>
            </div>
            <h3 className="text-2xl font-headline font-bold text-on-surface mb-4 group-hover:text-primary transition-colors leading-tight">
              {t('resources.card2_title')}
            </h3>
            <p className="text-on-surface-variant leading-relaxed mb-6">
              {t('resources.card2_desc')}
            </p>
            <div className="inline-flex items-center gap-2 font-bold text-on-surface group-hover:text-primary group-hover:gap-4 transition-all">
              {t('resources.read_more')} <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </div>
          </article>

          {/* Card 3 */}
          <article className="group cursor-pointer">
            <div className="aspect-[4/3] rounded-lg overflow-hidden mb-6 bg-surface-container-low shadow-sm">
              <img 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBI7vzKxo-DC-BaKOHhrDxoW1VQ67e6HEEHQzzjAX9UXTXF6fSziximge0LVOtiUzlhSD7ny2U7XbgF-tJ_NbxMWSUiJ4X88JCh5Zh3T11vyRDmllFYjY6uWhnC08esCeGI-5KS2VgOr8IhbGqJr6Jpj5UYN6qufY-e7hhfiiYeNuKvoQd9yYdJ7Sjg2FoJz_LTHbIKLWzoLq1MoNC_DrKTLzvpxkzopA7LPHPX2qlN2DVweQXOwjAMU4kOl6voKUdnn3ljrUdZFA" 
                alt="Server panel" 
              />
            </div>
            <div className="flex items-center gap-3 mb-4 text-xs font-bold text-primary tracking-widest uppercase">
              <span>{t('resources.card3_tag')}</span>
              <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
              <span>{t('resources.card3_time')}</span>
            </div>
            <h3 className="text-2xl font-headline font-bold text-on-surface mb-4 group-hover:text-primary transition-colors leading-tight">
              {t('resources.card3_title')}
            </h3>
            <p className="text-on-surface-variant leading-relaxed mb-6">
              {t('resources.card3_desc')}
            </p>
            <div className="inline-flex items-center gap-2 font-bold text-on-surface group-hover:text-primary group-hover:gap-4 transition-all">
              {t('resources.read_more')} <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </div>
          </article>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="max-w-7xl mx-auto px-8">
        <div className="bg-surface-container-low rounded-xl p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary-fixed opacity-20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-secondary-container opacity-20 rounded-full blur-3xl"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-on-surface mb-6">
              {t('resources.news_title')}
            </h2>
            <p className="text-lg text-on-surface-variant mb-10 leading-relaxed">
              {t('resources.news_desc')}
            </p>
            <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input 
                className="flex-grow px-6 py-4 rounded-full bg-surface-container-lowest border border-outline/10 focus:outline-none focus:ring-2 focus:ring-primary/40 text-on-surface placeholder:text-outline-variant shadow-sm" 
                placeholder={t('resources.news_placeholder')} 
                type="email" 
                required
              />
              <button 
                className="bg-gradient-to-r from-primary to-primary-container text-white px-8 py-4 rounded-full font-bold hover:shadow-lg hover:translate-y-[-2px] active:scale-95 transition-all whitespace-nowrap" 
                type="submit"
              >
                {t('resources.news_btn')}
              </button>
            </form>
            <p className="text-xs text-on-surface-variant mt-6 italic">
              {t('resources.news_disclaimer')}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Resources;
