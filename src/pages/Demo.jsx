import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Demo = () => {
  const [messages, setMessages] = useState([
    { type: 'user', text: 'Who is likely to churn next week?' },
    { type: 'ai', text: 'Based on recent API latency and seat activity, Stellar Softworks shows a 78% probability of churn. Their engagement score dropped from 9.2 to 4.1 in the last 48 hours.', actionable: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [modulesAdded, setModulesAdded] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setMessages(prev => [...prev, { type: 'user', text: inputValue }]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: 'ai', 
        text: 'I have analyzed the underlying data models. Based on historical benchmarks, accelerating the onboarding flow could reduce this churn risk by 14%.' 
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return isDesktop ? (
    <DesktopDemo 
      messages={messages} 
      inputValue={inputValue} 
      setInputValue={setInputValue} 
      modulesAdded={modulesAdded} 
      setModulesAdded={setModulesAdded} 
      isTyping={isTyping} 
      handleSendMessage={handleSendMessage} 
    />
  ) : (
    <MobileDemo 
      messages={messages} 
      inputValue={inputValue} 
      setInputValue={setInputValue} 
      modulesAdded={modulesAdded} 
      setModulesAdded={setModulesAdded} 
      isTyping={isTyping} 
      handleSendMessage={handleSendMessage} 
    />
  );
};

// =========================================================
//            DESKTOP ISOLATED LAYOUT (1:1 HTML COPY)
// =========================================================
const DesktopDemo = ({ messages, inputValue, setInputValue, modulesAdded, setModulesAdded, isTyping, handleSendMessage }) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="bg-surface font-body text-on-surface selection:bg-primary-fixed min-h-[max(884px,100dvh)]">
      <div className="flex min-h-screen">
        {/* SideNavBar */}
        <aside className="flex flex-col py-8 gap-2 h-screen left-0 top-0 sticky bg-[#f4f3f8] dark:bg-slate-900 w-64 rounded-r-[3rem] shadow-sm z-50">
          <div className="px-8 mb-12">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-container rounded-lg flex items-center justify-center text-white shadow-lg">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dataset</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#1a1b1f] dark:text-white font-headline tracking-tighter">ModularAI</h1>
                <p className="text-[10px] uppercase tracking-widest text-on-surface-variant opacity-60 font-bold">Digital Sanctuary</p>
              </div>
            </Link>
          </div>
          <nav className="flex-1 space-y-1 px-4">
            <a className="flex items-center gap-3 bg-white dark:bg-slate-800 text-[#8477F2] rounded-full px-6 py-3 shadow-sm transition-all duration-200" href="#">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-medium text-sm">Dashboard</span>
            </a>
            <a className="flex items-center gap-3 text-[#474553] dark:text-slate-400 px-6 py-3 hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-full transition-all hover:translate-x-1 duration-200" href="#">
              <span className="material-symbols-outlined">insights</span>
              <span className="font-medium text-sm">Analytics</span>
            </a>
            <a className="flex items-center gap-3 text-[#474553] dark:text-slate-400 px-6 py-3 hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-full transition-all hover:translate-x-1 duration-200" href="#">
              <span className="material-symbols-outlined">extension</span>
              <span className="font-medium text-sm flex-1">Modules</span>
              {modulesAdded > 0 && <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{modulesAdded}</span>}
            </a>
            <a className="flex items-center gap-3 text-[#474553] dark:text-slate-400 px-6 py-3 hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-full transition-all hover:translate-x-1 duration-200" href="#">
              <span className="material-symbols-outlined">settings</span>
              <span className="font-medium text-sm">Settings</span>
            </a>
          </nav>
          <div className="px-6 mt-auto space-y-4">
            <button 
              onClick={() => setModulesAdded(prev => prev + 1)}
              className="w-full bg-gradient-to-br from-primary to-primary-container text-white rounded-full py-4 px-6 font-bold text-sm shadow-[0px_10px_20px_rgba(87,73,194,0.2)] hover:scale-[0.98] transition-transform flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Add Module
            </button>
            <Link to="/" className="flex items-center gap-3 text-[#474553] dark:text-slate-400 px-6 py-3 hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-full transition-all duration-200" >
              <span className="material-symbols-outlined">arrow_back</span>
              <span className="font-medium text-sm">Back to Landing</span>
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 px-12 py-12 overflow-y-auto">
          {/* Top Header */}
          <header className="mb-16 max-w-5xl">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-primary font-bold tracking-widest text-xs uppercase mb-3">Welcome Back, Alex</p>
                <h2 className="text-6xl font-extrabold font-headline tracking-tight text-on-surface">Your Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">Sanctuary</span></h2>
              </div>
              <div className="flex items-center gap-4">
                <button className="p-3 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high transition-colors">
                  <span className="material-symbols-outlined">notifications</span>
                </button>
                <div className="w-12 h-12 rounded-full flex-shrink-0 overflow-hidden border-2 border-white shadow-md">
                  <img alt="User profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4F372D3lXCJdTkD3q7KtRJAOOYPaC2r79ZeDoS5d9ZcUgqRTfy3LC1ktp-zhLw1bYK4ittE-dOEIxcGt9MwY7poTBfpi2_GYrRwSy49Uok2fKjfTmWPyIEz1dFJhh0HhncIMRK1hLt8Rp05zLEFBGNl3Hp9twCU8tthWXaoPZJgG9vbbssmuHEW4FUH_EaHTGUb9nvPa3HQanHRImYBageGuN2eRvcQFBmX6hTNZnovSCSUoKQtPrlKtt-nZOEj1KjXtKBAOj6_w"/>
                </div>
              </div>
            </div>
          </header>

          {/* Interactive Bento Grid */}
          <div className="grid grid-cols-12 gap-8 max-w-7xl">
            {/* 1. Crystal Ball Stock Forecast */}
            <div className="col-span-12 lg:col-span-8 bg-white/70 backdrop-blur-xl rounded-lg p-8 shadow-[0px_20px_40px_rgba(132,119,242,0.06)] border border-white/40 flex flex-col justify-between min-h-[400px]">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                    <h3 className="font-headline font-bold text-2xl">Crystal Ball</h3>
                  </div>
                  <p className="text-on-surface-variant text-sm">Stock Forecast & Procurement Analysis</p>
                </div>
                <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-xs">trending_up</span>
                  +577 db suggested
                </div>
              </div>
              <div className="relative flex-1 mt-8 flex items-end">
                <svg className="w-full h-48" preserveAspectRatio="none" viewBox="0 0 800 200">
                  <defs>
                    <linearGradient id="gradientLine" x1="0%" x2="100%" y1="0%" y2="0%">
                      <stop offset="0%" stopColor="#8477F2" stopOpacity="0.2"></stop>
                      <stop offset="50%" stopColor="#8477F2" stopOpacity="1"></stop>
                      <stop offset="100%" stopColor="#8477F2" stopOpacity="0.2"></stop>
                    </linearGradient>
                  </defs>
                  <path d="M0,150 C100,160 200,80 300,100 C400,120 500,20 600,50 C700,80 800,40 800,40" fill="none" stroke="url(#gradientLine)" strokeLinecap="round" strokeWidth="4"></path>
                  <circle cx="600" cy="50" fill="#8477F2" r="6"></circle>
                  <circle cx="600" cy="50" fill="#8477F2" fillOpacity="0.2" r="12"></circle>
                </svg>
                <div className="absolute bottom-1/2 left-[75%] translate-y-[-20px] bg-white shadow-xl rounded-lg p-3 border border-surface-container">
                  <p className="text-[10px] text-on-surface-variant font-bold uppercase">Predicted Peak</p>
                  <p className="text-lg font-bold text-primary">$12,440.00</p>
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <div className="flex-1 p-4 bg-surface-container-low rounded-xl">
                  <p className="text-xs text-on-surface-variant mb-1">Confidence</p>
                  <p className="text-xl font-bold">94.2%</p>
                </div>
                <div className="flex-1 p-4 bg-surface-container-low rounded-xl">
                  <p className="text-xs text-on-surface-variant mb-1">Latency</p>
                  <p className="text-xl font-bold">12ms</p>
                </div>
              </div>
            </div>

            {/* 2. The Ghostbuster Churn Detector */}
            <div className="col-span-12 lg:col-span-4 bg-white rounded-lg p-8 shadow-[0px_20px_40px_rgba(132,119,242,0.06)] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>mist</span>
                  <h3 className="font-headline font-bold text-2xl">The Ghostbuster</h3>
                </div>
                <p className="text-on-surface-variant text-sm">Churn Risk Detection</p>
              </div>
              <div className="my-10 text-center">
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-[8px] border-error-container relative">
                  <div className="absolute inset-0 border-[8px] border-error rounded-full" style={{ clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 0 100%, 0 0, 50% 0)' }}></div>
                  <span className="text-3xl font-extrabold text-error">100%</span>
                </div>
                <p className="mt-4 text-error font-bold uppercase text-xs tracking-widest">Volume Drop Detected</p>
              </div>
              <div className="space-y-3">
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-tighter">High Risk Client List</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-error/5 rounded-lg border border-error/10">
                    <span className="text-sm font-medium">Aero-Dynamics Inc.</span>
                    <span className="material-symbols-outlined text-error text-sm">warning</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-error/5 rounded-lg border border-error/10">
                    <span className="text-sm font-medium">Global Logistics Co.</span>
                    <span className="material-symbols-outlined text-error text-sm">warning</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Predictive AI Chatbot */}
            <div className="col-span-12 lg:col-span-7 bg-white/70 backdrop-blur-xl rounded-lg p-8 shadow-[0px_20px_40px_rgba(132,119,242,0.06)] border border-white/40 min-h-[450px] flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>forum</span>
                  <h3 className="font-headline font-bold text-2xl">Predictive Chat</h3>
                </div>
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-[10px] text-white font-bold ring-2 ring-white">AI</div>
                  <div className="w-8 h-8 flex-shrink-0 rounded-full bg-surface-container-high ring-2 ring-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-xs">more_horiz</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 space-y-6 overflow-y-auto mb-6 pr-2">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`p-4 rounded-2xl max-w-[80%] text-sm shadow-sm ${msg.type === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-surface-container-low text-on-surface rounded-tl-none'}`}>
                      <p className="leading-relaxed">{msg.text}</p>
                      {msg.actionable && (
                        <div className="mt-4 flex gap-2">
                          <button className="text-[10px] bg-white text-on-surface px-3 py-1.5 rounded-full shadow-sm hover:bg-primary hover:text-white transition-colors">Alert Success Team</button>
                          <button className="text-[10px] bg-white text-on-surface px-3 py-1.5 rounded-full shadow-sm hover:bg-primary hover:text-white transition-colors">Generate Report</button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex flex-col items-start">
                    <div className="bg-surface-container-low p-5 rounded-2xl rounded-tl-none max-w-[90%] shadow-sm flex items-center h-12">
                      <div className="flex gap-1 items-center">
                        <div className="w-1.5 h-1.5 bg-outline rounded-full animate-bounce" style={{ animationDelay: '-0.3s' }}></div>
                        <div className="w-1.5 h-1.5 bg-outline rounded-full animate-bounce" style={{ animationDelay: '-0.15s' }}></div>
                        <div className="w-1.5 h-1.5 bg-outline rounded-full animate-bounce"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
              
              <form onSubmit={handleSendMessage} className="relative mt-auto">
                <input 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full bg-surface-container-low border-none rounded-xl py-4 pl-6 pr-14 focus:ring-2 focus:ring-primary/40 focus:bg-white transition-all text-sm" 
                  placeholder="Ask anything about your data..." 
                  type="text"
                />
                <button type="submit" disabled={!inputValue.trim() || isTyping} className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-white p-2 rounded-lg hover:scale-105 transition-transform disabled:opacity-50">
                  <span className="material-symbols-outlined">send</span>
                </button>
              </form>
            </div>

            {/* 4. Add Module Card */}
            <div onClick={() => setModulesAdded(prev => prev + 1)} className="col-span-12 lg:col-span-5 bg-surface-container-low border-2 border-dashed border-outline-variant/30 rounded-lg p-8 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-primary/40 hover:bg-surface-container transition-all">
              <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center text-outline-variant group-hover:text-primary group-hover:scale-110 transition-all duration-300 mb-6">
                <span className="material-symbols-outlined text-4xl">add_circle</span>
              </div>
              <h3 className="font-headline font-bold text-2xl mb-2">Add Module</h3>
              <p className="text-on-surface-variant text-sm max-w-[240px]">Customize your dashboard with new predictive models from the ecosystem.</p>
              <div className="mt-8 flex gap-2 overflow-hidden opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                <div className="px-3 py-1 bg-white rounded-full text-[10px] font-bold">Revenue</div>
                <div className="px-3 py-1 bg-white rounded-full text-[10px] font-bold">LTV</div>
                <div className="px-3 py-1 bg-white rounded-full text-[10px] font-bold text-primary">Risk</div>
              </div>
            </div>
          </div>

          {/* Footer Stats / Sub-Content */}
          <footer className="mt-16 pt-8 border-t border-surface-container-high flex flex-wrap gap-12">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-secondary-fixed text-on-secondary-fixed rounded-xl">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>memory</span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Neural Load</p>
                <p className="text-xl font-bold font-headline">24.8 GFLOPS</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-tertiary-fixed text-on-tertiary-fixed rounded-xl">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Privacy Shield</p>
                <p className="text-xl font-bold font-headline">Enterprise Grade</p>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2 text-on-surface-variant">
              <span className="text-xs font-medium">All systems operational</span>
              <div className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

// =========================================================
//            MOBILE ISOLATED LAYOUT (1:1 HTML COPY)
// =========================================================
const MobileDemo = ({ messages, inputValue, setInputValue, modulesAdded, setModulesAdded, isTyping, handleSendMessage }) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="bg-surface selection:bg-primary-fixed min-h-[max(884px,100dvh)]">
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#faf9fe]/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-[0px_20px_40px_rgba(87,73,194,0.06)] flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#8477F2]">arrow_back</span>
          <span className="text-xl font-extrabold text-[#5749c2] dark:text-[#8477F2] font-headline tracking-tight">ModularAI</span>
        </Link>
        <div className="flex items-center gap-4">
          {/* CRITICAL FIX: Add min-w-10 min-h-10 shrink-0 so flex doesnt destroy the profile picture */}
          <div className="w-10 h-10 min-w-10 min-h-10 flex-shrink-0 rounded-full overflow-hidden bg-primary-fixed flex items-center justify-center">
            <img alt="User Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuChEpLo3kZdN9EeHPqsQngjApTeAqvKjXRokmPtv3_CfYgMDRstmez_0Uf7NsdGmWhHyQM8oFBPA0p8Juih6JMWddjgRJCTuZd0wqPMyhteTU3axVLyDiduZuG6663hv_LIiQUfF_kVQcTTNEB-JQqczJbNVobpcTh5WgpoTAex5lIEkhohD-J4wvAmNTvqca_c_PHEcEdRNMuFlAtm--hGMgRegX7qmquns0jr-aAPayqWHTv45QguiZpouX1EyTfPBMC-dAUo78I"/>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-32 px-6">
        {/* Hero Section */}
        <section className="mb-12">
          <h1 className="font-headline text-4xl font-extrabold text-on-surface leading-tight tracking-tight mb-2">
              Welcome back, Alex.
          </h1>
          <p className="font-body text-lg text-on-surface-variant font-medium opacity-80">
              Your Digital Sanctuary
          </p>
        </section>

        {/* Module 1: Crystal Ball */}
        <section className="mb-8">
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0px_20px_40px_rgba(87,73,194,0.04)] overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-widest mb-1 block">Module 01</span>
                <h2 className="text-2xl font-headline font-bold text-on-surface">Crystal Ball</h2>
              </div>
              <div className="p-3 bg-primary-fixed rounded-2xl text-primary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>insights</span>
              </div>
            </div>
            <div className="relative h-32 w-full mb-6">
              <div className="absolute bottom-0 left-0 w-full h-full flex items-end justify-between px-2">
                <div className="w-2 bg-primary/10 rounded-full h-[30%]"></div>
                <div className="w-2 bg-primary/20 rounded-full h-[45%]"></div>
                <div className="w-2 bg-primary/30 rounded-full h-[40%]"></div>
                <div className="w-2 bg-primary/40 rounded-full h-[60%]"></div>
                <div className="w-2 bg-primary/50 rounded-full h-[55%]"></div>
                <div className="w-2 bg-primary/80 rounded-full h-[85%]"></div>
                <div className="w-2 bg-primary rounded-full h-[75%]"></div>
                <div className="w-2 bg-primary-container rounded-full h-[95%]"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-low p-4 rounded-lg">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-1">Stock Forecast</p>
                <p className="text-xl font-headline font-bold text-primary">+577 db</p>
                <p className="text-[10px] text-on-surface-variant/60">Procurement Target</p>
              </div>
              <div className="bg-primary-container p-4 rounded-lg text-white">
                <p className="text-[10px] font-bold uppercase mb-1 opacity-80">Predicted Peak</p>
                <p className="text-xl font-headline font-bold">Oct 24</p>
                <p className="text-[10px] opacity-70">High Demand Alert</p>
              </div>
            </div>
          </div>
        </section>

        {/* Module 2: The Ghostbuster */}
        <section className="mb-8">
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0px_20px_40px_rgba(87,73,194,0.04)]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold text-tertiary uppercase tracking-widest mb-1 block">Module 02</span>
                <h2 className="text-2xl font-headline font-bold text-on-surface">The Ghostbuster</h2>
              </div>
              <div className="p-3 bg-tertiary-fixed rounded-2xl text-tertiary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>detector_status</span>
              </div>
            </div>
            <div className="flex flex-col items-center mb-8">
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle className="text-surface-container-low" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeWidth="8"></circle>
                  <circle className="text-error" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeDasharray="440" strokeDashoffset="0" strokeLinecap="round" strokeWidth="12"></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-headline font-extrabold text-on-surface">100%</span>
                  <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase">Volume Drop</span>
                </div>
              </div>
            </div>
            <h3 className="text-sm font-bold text-on-surface-variant mb-4 px-1">High Risk Clients</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-error/10 flex items-center justify-center text-error">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                  </div>
                  <span className="text-sm font-bold text-on-surface">Nexus Corp</span>
                </div>
                <span className="px-2 py-1 bg-error-container text-on-error-container text-[10px] font-bold rounded-full">Critical</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg opacity-80">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-warning/10 flex items-center justify-center text-orange-500">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                  </div>
                  <span className="text-sm font-bold text-on-surface">Aura Labs</span>
                </div>
                <span className="px-2 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-bold rounded-full">Warning</span>
              </div>
            </div>
          </div>
        </section>

        {/* Module 3: Predictive Chat */}
        <section className="mb-8">
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0px_20px_40px_rgba(87,73,194,0.04)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-xl">smart_toy</span>
              </div>
              <h2 className="text-xl font-headline font-bold text-on-surface">Predictive Assistant</h2>
            </div>
            <div className="space-y-6">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.type === 'user' ? (
                    <div className="bg-primary/5 p-4 rounded-2xl rounded-tr-none max-w-[85%]">
                      <p className="text-sm text-on-surface-variant font-medium">{msg.text}</p>
                    </div>
                  ) : (
                    <div className="bg-surface-container-low p-5 rounded-2xl rounded-tl-none border-l-4 border-primary max-w-[90%]">
                      <p className="text-sm text-on-surface leading-relaxed mb-4">{msg.text}</p>
                      {msg.actionable && (
                        <button className="w-full py-3 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center gap-2">
                          <span className="material-symbols-outlined text-sm">mail</span>
                          Reach Out Now
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-surface-container-low p-4 rounded-2xl rounded-tl-none border-l-4 border-primary max-w-[80%] flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-outline rounded-full animate-bounce" style={{ animationDelay: '-0.3s' }}></div>
                    <div className="w-1.5 h-1.5 bg-outline rounded-full animate-bounce" style={{ animationDelay: '-0.15s' }}></div>
                    <div className="w-1.5 h-1.5 bg-outline rounded-full animate-bounce"></div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="relative mt-6 w-full flex">
              <input 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full bg-surface-container-low border-none rounded-xl py-4 pl-6 pr-14 focus:ring-2 focus:ring-primary/40 focus:bg-white transition-all text-sm outline-none" 
                placeholder="Drop a prompt..." 
                type="text"
              />
              <button type="submit" disabled={!inputValue.trim() || isTyping} className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary disabled:bg-surface-container text-white w-9 h-9 flex items-center justify-center rounded-lg hover:scale-105 active:scale-95 transition-all disabled:transform-none">
                <span className="material-symbols-outlined text-sm pr-0.5">send</span>
              </button>
            </form>
          </div>
        </section>

        {/* Footer Action: Add Module */}
        <section className="mb-8">
          <div onClick={() => setModulesAdded(prev => prev + 1)} className="bg-surface-container-low border-2 border-dashed border-outline-variant/30 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer active:bg-surface-container transition-colors">
            <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center text-primary mb-4">
              <span className="material-symbols-outlined text-2xl">add</span>
            </div>
            <p className="font-headline font-bold text-on-surface mb-4">Enhance Your Sanctuary</p>
            <div className="flex flex-wrap justify-center gap-2 pointer-events-none">
              <span className="px-4 py-2 bg-white text-[10px] font-bold text-on-surface-variant rounded-full shadow-sm">Revenue</span>
              <span className="px-4 py-2 bg-white text-[10px] font-bold text-on-surface-variant rounded-full shadow-sm">LTV</span>
              <span className="px-4 py-2 bg-white text-[10px] font-bold text-on-surface-variant rounded-full shadow-sm">Risk</span>
            </div>
          </div>
        </section>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 rounded-t-[3rem] bg-[#ffffff]/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-[0px_-10px_30px_rgba(87,73,194,0.04)] flex justify-around items-center px-4 pb-6 pt-2">
        <button className="flex flex-col items-center justify-center bg-gradient-to-tr from-[#5749c2] to-[#7063dd] text-white rounded-full p-3 active:scale-90 transition-transform duration-300">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span className="font-['Manrope'] text-[10px] font-medium mt-1">Home</span>
        </button>
        <button className="flex flex-col items-center justify-center text-[#474553] dark:text-slate-400 p-3 hover:text-[#5749c2] active:scale-90 transition-transform duration-300">
          <span className="material-symbols-outlined">analytics</span>
          <span className="font-['Manrope'] text-[10px] font-medium mt-1">Insights</span>
        </button>
        <button className="flex flex-col items-center justify-center text-[#474553] dark:text-slate-400 p-3 hover:text-[#5749c2] active:scale-90 transition-transform duration-300">
          <span className="material-symbols-outlined">import_contacts</span>
          <span className="font-['Manrope'] text-[10px] font-medium mt-1">Library</span>
        </button>
        <button className="flex flex-col items-center justify-center text-[#474553] dark:text-slate-400 p-3 hover:text-[#5749c2] active:scale-90 transition-transform duration-300">
          <span className="material-symbols-outlined">settings</span>
          <span className="font-['Manrope'] text-[10px] font-medium mt-1">Settings</span>
        </button>
      </nav>
    </div>
  );
};

export default Demo;
