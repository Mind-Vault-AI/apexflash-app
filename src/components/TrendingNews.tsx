'use client';

import { Flame, ExternalLink, Clock } from 'lucide-react';

interface NewsItem {
  title: string;
  source: string;
  time: string;
  tag: string;
  tagColor: string;
  url: string;
}

const NEWS: NewsItem[] = [
  {
    title: 'Solana TVL hits new all-time high as DeFi activity surges',
    source: 'CoinDesk',
    time: '2h ago',
    tag: 'DeFi',
    tagColor: 'bg-blue-500/20 text-blue-400',
    url: 'https://www.coindesk.com',
  },
  {
    title: 'Bitcoin ETF inflows top $800M in single day — institutional demand rising',
    source: 'The Block',
    time: '3h ago',
    tag: 'BTC',
    tagColor: 'bg-orange-500/20 text-orange-400',
    url: 'https://www.theblock.co',
  },
  {
    title: 'Jupiter announces V2 Limit Order engine with MEV protection',
    source: 'DL News',
    time: '5h ago',
    tag: 'Solana',
    tagColor: 'bg-purple-500/20 text-purple-400',
    url: 'https://www.dlnews.com',
  },
  {
    title: 'Whale accumulation on Ethereum hits 6-month peak per Santiment data',
    source: 'CryptoSlate',
    time: '6h ago',
    tag: 'Whales',
    tagColor: 'bg-apex-500/20 text-apex-400',
    url: 'https://cryptoslate.com',
  },
  {
    title: 'BONK ecosystem expands with new staking and governance features',
    source: 'Decrypt',
    time: '8h ago',
    tag: 'Meme',
    tagColor: 'bg-yellow-500/20 text-yellow-400',
    url: 'https://decrypt.co',
  },
  {
    title: 'SEC Commissioner signals potential pivot on crypto regulation stance',
    source: 'Bloomberg',
    time: '10h ago',
    tag: 'Regulation',
    tagColor: 'bg-red-500/20 text-red-400',
    url: 'https://www.bloomberg.com',
  },
];

export default function TrendingNews() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            <Flame className="inline w-7 h-7 text-orange-400 mr-2 -mt-1" />
            Trending <span className="gradient-text">News</span>
          </h2>
          <p className="text-dark-400">
            Stay ahead with the latest crypto headlines.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {NEWS.map((item, i) => (
            <a
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-5 hover:border-apex-500/30 transition-all duration-300 group block"
            >
              <div className="flex items-start justify-between mb-3">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${item.tagColor}`}>
                  {item.tag}
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-dark-600 group-hover:text-apex-400 transition-colors" />
              </div>

              <h3 className="text-sm font-semibold text-dark-100 mb-3 leading-snug group-hover:text-white transition-colors">
                {item.title}
              </h3>

              <div className="flex items-center gap-3 text-xs text-dark-500">
                <span className="font-medium">{item.source}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {item.time}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
