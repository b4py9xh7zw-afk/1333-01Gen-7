import {
  AlertTriangle,
  Clock,
  ArrowRight,
  ShieldAlert,
  Shield,
  ShieldCheck,
} from 'lucide-react';
import { useVPNStore } from '../store/vpnStore';
import { MAINTENANCE_WINDOWS } from '../data/mock';
import type { ImpactLevel } from '../types';

const impactConfig: Record<
  ImpactLevel,
  { label: string; borderColor: string; bgColor: string; textColor: string; icon: typeof AlertTriangle }
> = {
  high: {
    label: '高影响',
    borderColor: 'border-security-orange',
    bgColor: 'bg-security-orange/10',
    textColor: 'text-security-orange',
    icon: ShieldAlert,
  },
  medium: {
    label: '中影响',
    borderColor: 'border-yellow-500',
    bgColor: 'bg-yellow-500/10',
    textColor: 'text-yellow-400',
    icon: Shield,
  },
  low: {
    label: '低影响',
    borderColor: 'border-steel-500',
    bgColor: 'bg-steel-500/10',
    textColor: 'text-steel-300',
    icon: ShieldCheck,
  },
};

function formatDateTimeRange(start: string, end: string) {
  const s = new Date(start);
  const e = new Date(end);
  const fmt = (d: Date) => {
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };
  return `${fmt(s)} — ${fmt(e)}`;
}

export default function MaintenanceModal() {
  const { maintenanceConfirmed, setMaintenanceConfirmed } = useVPNStore();

  if (maintenanceConfirmed) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-navy-950/85 backdrop-blur-sm" />

      <div
        className={`relative w-full max-w-2xl card-panel shadow-glow-orange border-t-4 ${
          impactConfig.high.borderColor
        } animate-slide-up`}
      >
        <div className="flex items-start gap-4 p-6 pb-5">
          <div
            className={`flex-shrink-0 w-12 h-12 flex items-center justify-center border ${impactConfig.high.borderColor} ${impactConfig.high.bgColor}`}
          >
            <AlertTriangle
              className={`w-6 h-6 ${impactConfig.high.textColor}`}
              strokeWidth={1.8}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-lg font-semibold text-steel-50">
                系统维护计划公告
              </h2>
              <span
                className={`tag-badge ${impactConfig.high.borderColor} ${impactConfig.high.textColor} ${impactConfig.high.bgColor}`}
              >
                请仔细阅读
              </span>
            </div>
            <p className="text-sm text-steel-400">
              在登录前请确认以下维护窗口信息，期间服务将受影响
            </p>
          </div>
        </div>

        <div className="divider-line" />

        <div className="px-6 py-5 space-y-5 max-h-[52vh] overflow-y-auto">
          {MAINTENANCE_WINDOWS.map((mw, idx) => {
            const cfg = impactConfig[mw.impact];
            const IconComp = cfg.icon;
            return (
              <div
                key={mw.id}
                className={`border ${cfg.borderColor} ${cfg.bgColor} p-4`}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <IconComp
                      className={`w-5 h-5 ${cfg.textColor} flex-shrink-0`}
                      strokeWidth={1.8}
                    />
                    <h3 className="text-base font-medium text-steel-100">
                      {mw.title}
                    </h3>
                  </div>
                  <span
                    className={`tag-badge flex-shrink-0 ${cfg.borderColor} ${cfg.textColor}`}
                  >
                    {cfg.label}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-steel-300 mb-3">
                  <Clock className="w-4 h-4 text-steel-400" strokeWidth={1.8} />
                  <span className="font-mono text-steel-200">
                    {formatDateTimeRange(mw.startTime, mw.endTime)}
                  </span>
                </div>

                <p className="text-sm text-steel-300 leading-relaxed mb-3">
                  {mw.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-steel-400">影响服务：</span>
                  {mw.affectedServices.map((svc) => (
                    <span
                      key={svc}
                      className="text-xs px-2 py-0.5 bg-navy-900/70 border border-steel-700 text-steel-300"
                    >
                      {svc}
                    </span>
                  ))}
                </div>

                {idx < MAINTENANCE_WINDOWS.length - 1 && (
                  <div className="divider-line mt-4 -mx-4 w-[calc(100%+2rem)]" />
                )}
              </div>
            );
          })}
        </div>

        <div className="divider-line" />

        <div className="p-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <p className="text-xs text-steel-500">
            本公告已通过企业邮件同步发送，如有疑问请联系信息安全部
          </p>
          <button
            onClick={() => setMaintenanceConfirmed(true)}
            className="btn-warning w-auto sm:min-w-[200px] flex items-center justify-center gap-2"
          >
            <span>我已知晓并继续登录</span>
            <ArrowRight className="w-4 h-4" strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </div>
  );
}
