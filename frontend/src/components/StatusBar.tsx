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

  const statusColor = health?.status === 'ONLINE' ? '#39FF14' : '#FF4444';

  return (
    <div className="fixed bottom-0 left-0 right-0 h-8 bg-black text-xs font-mono flex items-center justify-between px-4 z-50">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full inline-block"
            style={{ backgroundColor: statusColor }}
          />
          <span className="text-gray-400">
            SYSTEM:{' '}
            <span style={{ color: statusColor }}>
              {health?.status ?? '...'}
            </span>
          </span>
        </span>
        {health?.version && (
          <span className="text-gray-600">{health.version}</span>
        )}
      </div>

      <div className="flex items-center gap-4">
        {latencyMs !== null && (
          <span className="text-gray-600">
            LATENCY:{' '}
            <span className="text-gray-400">{latencyMs}MS</span>
          </span>
        )}
        <span className="text-gray-600">
          {new Date().toLocaleTimeString('en-GB', { hour12: false })} UTC
        </span>
      </div>
    </div>
  );
}
