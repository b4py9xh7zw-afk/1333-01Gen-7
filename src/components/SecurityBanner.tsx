import { useEffect, useState } from 'react';
import {
  ShieldCheck,
  MapPin,
  Lock,
  Wifi,
  Clock,
  AlertCircle,
} from 'lucide-react';

export default function SecurityBanner() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const fmtTime = (d: Date) => {
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  };
  const fmtDate = (d: Date) => {
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  };

  return (
    <div className="w-full border-b border-steel-700/60 bg-navy-900/60 backdrop-blur-sm">
      <div className="max-w-[1440px] mx-auto px-6 py-2.5 flex flex-wrap items-center justify-between gap-y-2 gap-x-6">
        <div className="flex items-center gap-6 flex-wrap text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck
              className="w-3.5 h-3.5 text-security-green"
              strokeWidth={1.8}
            />
            <span className="text-steel-300">安全等级：</span>
            <span className="text-security-green font-medium">
              LEVEL-3 受控
            </span>
          </div>

          <div className="h-3 w-px bg-steel-700/60 hidden sm:block" />

          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-steel-400" strokeWidth={1.8} />
            <span className="text-steel-300">最近登录地：</span>
            <span className="text-steel-200 font-mono">
              上海 / CN (192.168.10.*)
            </span>
          </div>

          <div className="h-3 w-px bg-steel-700/60 hidden md:block" />

          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-steel-400" strokeWidth={1.8} />
            <span className="text-steel-300">账号锁定：</span>
            <span className="text-security-green font-medium">正常</span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <Wifi className="w-3.5 h-3.5 text-steel-400" strokeWidth={1.8} />
            <span className="text-steel-300">TLS 1.3 / AES-256-GCM</span>
          </div>

          <div className="h-3 w-px bg-steel-700/60 hidden sm:block" />

          <div className="flex items-center gap-2 text-steel-200 font-mono">
            <Clock className="w-3.5 h-3.5 text-steel-400" strokeWidth={1.8} />
            <span>{fmtDate(now)}</span>
            <span className="text-security-orange">{fmtTime(now)}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <AlertCircle
              className="w-3.5 h-3.5 text-security-orange animate-pulse-slow"
              strokeWidth={1.8}
            />
            <span className="text-security-orange text-xs font-medium">
              1 条维护公告
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
