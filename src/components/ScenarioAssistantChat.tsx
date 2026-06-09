import { useState } from 'react';
import { OverviewData } from '../features/overview/types';

type AssistantContent = NonNullable<OverviewData['assistant']>;

type ChatMessage = {
  role: 'assistant' | 'user';
  text: string;
};

export default function ScenarioAssistantChat({ assistant }: { assistant: AssistantContent }) {
  const isHu = assistant.status.toLowerCase().includes('asszisztens');
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', text: assistant.greeting },
    { role: 'assistant', text: assistant.note },
  ]);

  const addPrompt = (question: string, answer: string) => {
    setOpen(true);
    setMessages((current) => [
      ...current,
      { role: 'user', text: question },
      { role: 'assistant', text: answer },
    ]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const question = draft.trim();
    if (!question) return;

    setMessages((current) => [
      ...current,
      { role: 'user', text: question },
      {
        role: 'assistant',
        text: isHu
          ? 'Ez most bemutató mód, ezért előre megírt válaszokkal dolgozom. A lényeg: megmutatni, hogyan lesz a szétszórt adatokból érthető vezetői kép és konkrét teendő.'
          : 'This demo uses prepared responses: ModularAI shows how scattered data becomes KPIs, risk signals, recommendations, and a management-ready summary.',
      },
    ]);
    setDraft('');
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed left-4 bottom-24 md:left-6 md:bottom-6 z-50 flex items-center gap-3 rounded-full bg-surface-container-lowest border border-outline-variant/20 px-4 py-3 shadow-[0_18px_48px_rgba(87,73,194,0.18)] hover:-translate-y-0.5 transition-all"
      >
        <img src="/assets/chatbot_icon.svg" alt="" className="h-9 w-9" />
        <span className="hidden sm:block text-sm font-label font-black text-on-surface">
          {isHu ? 'Kérdezze az elemzőt' : 'Ask the analyst'}
        </span>
      </button>
    );
  }

  return (
    <div className="fixed left-4 bottom-24 md:left-6 md:bottom-6 z-50 w-[calc(100vw-2rem)] max-w-[390px] rounded-3xl bg-surface-container-lowest border border-outline-variant/20 shadow-[0_24px_80px_rgba(25,28,30,0.18)] overflow-hidden">
      <div className="flex items-center justify-between gap-4 border-b border-outline-variant/10 px-4 py-3 bg-surface-container-lowest/95">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-11 w-11 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
            <img src="/assets/chatbot_thinking.svg" alt="" className="h-10 w-10" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-label font-bold uppercase tracking-wider text-primary">{assistant.status}</p>
            <h2 className="text-base font-headline font-black text-on-surface truncate">{assistant.title}</h2>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="h-9 w-9 rounded-full bg-surface-container-low text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center"
          aria-label={isHu ? 'Chat bezárása' : 'Close chat'}
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      <div className="max-h-[360px] overflow-y-auto px-4 py-4 space-y-3 bg-surface">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                message.role === 'user'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-lowest border border-outline-variant/15 text-on-surface-variant'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 py-3 border-t border-outline-variant/10 bg-surface-container-lowest">
        <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
          {assistant.prompts.map((prompt) => (
            <button
              key={prompt.question}
              type="button"
              onClick={() => addPrompt(prompt.question, prompt.answer)}
              className="shrink-0 rounded-full bg-surface-container-low px-3 py-2 text-xs font-label font-bold text-on-surface-variant hover:text-primary transition-colors"
            >
              {prompt.question}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={isHu ? 'Írjon egy rövid kérdést...' : 'Ask a short question...'}
            className="min-w-0 flex-1 rounded-full bg-surface-container-low px-4 py-3 text-sm text-on-surface outline-none border border-outline-variant/10 focus:border-primary/40"
          />
          <button
            type="submit"
            className="h-11 w-11 rounded-full bg-primary text-on-primary flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
            aria-label={isHu ? 'Küldés' : 'Send'}
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
}
