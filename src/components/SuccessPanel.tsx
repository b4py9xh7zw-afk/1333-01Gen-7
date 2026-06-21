import { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Shield,
  Wifi,
  Globe,
  Clock,
  Power,
  ArrowRightLeft,
} from 'lucide-react';
import { useVPNStore } from '../store/vpnStore';

export default function SuccessPanel() {
  const { detectedDepartment, formData } = useVPNStore();
  const [ip, setIp] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [connectedAt, setConnectedAt] = useState<Date | null>(null);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    setIp(`10.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 254) + 1}`);
    const rand = () => Math.random().toString(16).slice(2, 10);
    setSessionId(`${rand()}-${rand()}-${rand()}`.toUpperCase());
    setConnectedAt(new Date());
  }, []);

  useEffect(() => {
    if (!connectedAt) return;
    const t = setInterval(() => {
      setElapsed(Math.floor((Date.now() - connectedAt.getTime()) / 1000));
    }, 1000);
    return () => clearInterval(t);
  }, [connectedAt]);

  const fmtDuration = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${pad(h)}:${pad(m)}:${pad(sec)}`;
  };

  const fmtDate = (d: Date | null) => {
    if (!d) return '';
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center py-4">
        <div className="relative inline-block mb-4">
          <div className="w-20 h-20 border-2 border-security-green flex items-center justify-center animate-fade-in">
            <CheckCircle2
              className="w-12 h-12 text-security-green"
              strokeWidth={1.8}
            />
          </div>
          <div className="absolute inset-0 w-20 h-20 border-2 border-security-green/30 animate-ping" />
        </div>
        <h2 className="text-xl font-semibold text-steel-50 mb-1.5">
          VPN 安全连接已建立
        </h2>
        <p className="text-sm text-steel-400">
          正在为您接入{detectedDepartment?.name}业务网络，请稍候…
        </p>
      </div>

      <div className="divider-line" />

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="border border-steel-700 bg-navy-800/40 p-3">
          <div className="flex items-center gap-1.5 text-steel-500 mb-2">
            <Globe className="w-3.5 h-3.5" strokeWidth={1.8} />
            分配虚拟 IP
          </div>
          <div className="font-mono text-steel-100 text-sm">{ip}</div>
        </div>
        <div className="border border-steel-700 bg-navy-800/40 p-3">
          <div className="flex items-center gap-1.5 text-steel-500 mb-2">
            <Shield className="w-3.5 h-3.5" strokeWidth={1.8} />
            安全域
          </div>
          <div className="text-steel-100 text-sm font-medium">
            {detectedDepartment?.name}
          </div>
        </div>
        <div className="border border-steel-700 bg-navy-800/40 p-3">
          <div className="flex items-center gap-1.5 text-steel-500 mb-2">
            <Clock className="w-3.5 h-3.5" strokeWidth={1.8} />
            连接时间
          </div>
          <div className="font-mono text-steel-100 text-sm">
            {fmtDate(connectedAt)}
          </div>
        </div>
        <div className="border border-steel-700 bg-navy-800/40 p-3">
          <div className="flex items-center gap-1.5 text-steel-500 mb-2">
            <ArrowRightLeft className="w-3.5 h-3.5" strokeWidth={1.8} />
            已连接时长
          </div>
          <div className="font-mono text-security-green text-sm">
            {fmtDuration(elapsed)}
          </div>
        </div>
      </div>

      <div className="border border-security-green/40 bg-security-green/5 p-4 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-steel-300">
            <Wifi className="w-4 h-4 text-security-green" strokeWidth={1.8} />
            <span>加密隧道状态</span>
          </div>
          <span className="text-security-green font-medium">稳定运行</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-steel-400">
            <Power className="w-4 h-4 text-steel-400" strokeWidth={1.8} />
            <span>会话编号</span>
          </div>
          <span className="text-steel-300 font-mono text-[11px]">{sessionId}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-steel-400">
            <span className="w-4 h-4 flex items-center justify-center text-steel-500">
              ID
            </span>
            <span>当前账号</span>
          </div>
          <span className="text-steel-300 font-mono">{formData.account}</span>
        </div>
      </div>

      <div className="pt-2">
        <p className="text-[11px] text-steel-500 leading-relaxed">
          提示：会话超时自动注销时间为 8 小时。离开工位时请手动断开 VPN。
          所有操作已纳入实时审计监控，异常流量将触发安全响应。
        </p>
      </div>
    </div>
  );
}
