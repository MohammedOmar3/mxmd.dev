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
    <div
      role="status"
      className="label fixed bottom-0 inset-x-0 z-(--z-sticky) h-8 bg-ink text-paper-3 text-xs"
    >
      <div className="frame h-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span>
            API{' '}
            <span className={online ? 'text-paper' : 'text-error'}>
              {health ? health.status.toLowerCase() : 'checking'}
            </span>
          </span>
          {health?.version && <span className="text-rule-2">{health.version}</span>}
        </div>

        <div className="flex items-center gap-4">
          {latencyMs !== null && (
            <span>
              Latency <span className="text-paper">{latencyMs} ms</span>
            </span>
          )}
          <span className="hidden sm:inline text-rule-2">
            {new Date().toLocaleTimeString('en-GB', { hour12: false, timeZone: 'UTC' })} UTC
          </span>
        </div>
      </div>
    </div>
  );
}
