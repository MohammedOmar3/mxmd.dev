import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import type { HealthStatus } from '../types';

export function StatusBar() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [latencyMs, setLatencyMs] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;

    const poll = async () => {
      const t0 = performance.now();
      try {
        const data = await api.getHealth();
        const elapsed = Math.round(performance.now() - t0);
        if (mounted) {
          setHealth(data);
          setLatencyMs(elapsed);
        }
      } catch {
        if (mounted) setHealth(null);
      }
    };

    poll();
    const interval = setInterval(poll, 30_000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const online = health?.status === 'ONLINE';

  return (
    <div role="status" className="fixed bottom-0 inset-x-0 z-50 h-8 bg-night text-night-muted font-mono text-xs">
      <div className="frame h-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className={`size-1.5 rounded-full ${online ? 'bg-neon' : 'bg-danger'}`} />
            <span>
              system <span className={online ? 'text-neon' : 'text-danger'}>{health ? health.status.toLowerCase() : 'checking'}</span>
            </span>
          </span>
          {health?.version && <span className="hidden sm:inline">{health.version}</span>}
        </div>

        <div className="flex items-center gap-4">
          {latencyMs !== null && (
            <span>
              latency <span className="text-paper">{latencyMs}ms</span>
            </span>
          )}
          <span className="hidden sm:inline">
            {new Date().toLocaleTimeString('en-GB', { hour12: false, timeZone: 'UTC' })} UTC
          </span>
        </div>
      </div>
    </div>
  );
}
