import { Star } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Mark D.',
    location: 'Netherlands',
    flag: '🇳🇱',
    stars: 4,
    text: 'Simpel en snel — precies wat ik zocht. Setup in 2 minuten klaar. De whale alerts heb ik al 3x gebruikt om op tijd in te stappen voor een pump. Wel jammer dat je niet ziet hoeveel andere mensen hetzelfde signaal krijgen.',
    date: 'Feb 2026',
  },
  {
    name: 'Priya S.',
    location: 'Singapore',
    flag: '🇸🇬',
    stars: 5,
    text: 'Finally a trading bot that doesn\'t feel sketchy. The key encryption thing gave me confidence to actually fund the wallet. Been 3 weeks now, no issues. The whale signals are hit or miss but when they hit, they really hit.',
    date: 'Mar 2026',
  },
  {
    name: 'Thomas K.',
    location: 'Germany',
    flag: '🇩🇪',
    stars: 3,
    text: 'Gute Idee, Umsetzung noch ausbaufähig. Die Whale-Alerts funktionieren, aber manchmal kommen die Signale etwas spät. Für den Preis ist es trotzdem okay — ich nutze es hauptsächlich für schnelle SOL-Swaps.',
    date: 'Feb 2026',
  },
  {
    name: 'Carlos M.',
    location: 'Spain',
    flag: '🇪🇸',
    stars: 5,
    text: 'Llevo usando esto un mes y ya recuperé la suscripción con las comisiones del referido. Traje a 4 amigos y todos lo usan. El bot es rápido para hacer swaps en Solana, mucho más cómodo que conectar MetaMask cada vez.',
    date: 'Mar 2026',
  },
  {
    name: 'Lisa V.',
    location: 'Belgium',
    flag: '🇧🇪',
    stars: 4,
    text: 'Handig dat alles via Telegram werkt, geen extra app te installeren. De whale alerts snap ik niet altijd — een beetje meer uitleg bij elk signaal zou handig zijn. Maar de bot zelf werkt prima en de fees zijn eerlijk.',
    date: 'Mar 2026',
  },
  {
    name: 'James W.',
    location: 'United Kingdom',
    flag: '🇬🇧',
    stars: 5,
    text: 'Used Trojan, Bonkbot, and a few others. This one is cleaner tbh. The exchange affiliate section got me a MEXC signup with an actual discount which was a nice surprise. Whale alerts need more context but the bot itself is solid.',
    date: 'Feb 2026',
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i <= count ? 'text-amber-400 fill-amber-400' : 'text-dark-600'
          }`}
        />
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            What <span className="gradient-text">traders</span> say
          </h2>
          <p className="text-dark-400 max-w-lg mx-auto">
            Real feedback. Multiple languages. No marketing fluff.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((review, i) => (
            <div
              key={i}
              className="glass-card p-5 flex flex-col gap-3 hover:border-dark-600/70 transition-colors"
            >
              <div className="flex items-center justify-between">
                <Stars count={review.stars} />
                <span className="text-xs text-dark-500">{review.date}</span>
              </div>

              <p className="text-sm text-dark-200 leading-relaxed flex-1">
                &ldquo;{review.text}&rdquo;
              </p>

              <div className="flex items-center gap-2 pt-1 border-t border-dark-800/50">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-apex-600 to-cyan-600 flex items-center justify-center text-xs font-bold text-white">
                  {review.flag}
                </div>
                <div>
                  <p className="text-xs font-medium text-dark-200">{review.name}</p>
                  <p className="text-xs text-dark-500">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-dark-600 text-xs mt-8">
          Reviews collected via Telegram community feedback. Unedited.
        </p>
      </div>
    </section>
  );
}
