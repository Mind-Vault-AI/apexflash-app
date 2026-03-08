import { Star } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Mark D.',
    location: 'Netherlands',
    stars: 4,
    text: 'Was looking for a simple way to trade SOL on the go. Setup took like 2 minutes. The whale alerts are surprisingly useful — caught a nice BONK pump early because of it.',
    date: 'Feb 2026',
  },
  {
    name: 'Priya S.',
    location: 'Singapore',
    stars: 5,
    text: 'Finally a bot that doesn\'t feel like a scam. The 1% fee is transparent, no hidden stuff. I like that my keys stay encrypted. Been using it for a few weeks without issues.',
    date: 'Mar 2026',
  },
  {
    name: 'Tom K.',
    location: 'Germany',
    stars: 4,
    text: 'Solid for quick swaps. Not gonna lie, the UI is basic since it\'s Telegram, but that\'s also what makes it fast. Whale alerts could be more detailed though.',
    date: 'Feb 2026',
  },
  {
    name: 'Carlos M.',
    location: 'Spain',
    stars: 5,
    text: 'I referred 3 friends and already got some fee-share back. The referral system actually works. Bot is fast, Jupiter routes are good. Happy so far.',
    date: 'Mar 2026',
  },
  {
    name: 'Lisa V.',
    location: 'Belgium',
    stars: 4,
    text: 'Handig dat het direct via Telegram werkt. Geen extra app nodig. De whale alerts zijn leuk, al snap ik niet altijd wat ze betekenen. Misschien meer uitleg toevoegen?',
    date: 'Mar 2026',
  },
  {
    name: 'James W.',
    location: 'UK',
    stars: 5,
    text: 'Used a few Telegram bots before. This one is cleaner than most. The affiliate exchange thing is a nice touch — got me signed up on MEXC with a discount I didn\'t know about.',
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
            Real feedback from real users. No fluff.
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
                  {review.name[0]}
                </div>
                <div>
                  <p className="text-xs font-medium text-dark-200">{review.name}</p>
                  <p className="text-xs text-dark-500">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
