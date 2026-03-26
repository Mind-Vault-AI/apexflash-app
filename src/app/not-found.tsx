import { Zap, Home, MessageCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-dark-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 via-apex-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-apex-500/40">
            <Zap className="w-8 h-8 text-white" />
          </div>
        </div>

        <h1 className="text-6xl font-extrabold gradient-text mb-4">404</h1>
        <p className="text-xl text-dark-200 mb-2">Page not found</p>
        <p className="text-dark-400 mb-8">
          This page doesn&apos;t exist. Maybe the whales ate it.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="/" className="btn-primary inline-flex items-center justify-center gap-2">
            <Home className="w-4 h-4" />
            Back to Home
          </a>
          <a
            href="https://t.me/ApexFlashBot"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Open Bot
          </a>
        </div>
      </div>
    </main>
  );
}
