import {
  Shield,
  Building2,
  Server,
  Lock,
  Eye,
  FileCheck,
  Hexagon,
} from 'lucide-react';

export default function InfoSidebar() {
  return (
    <aside className="hidden lg:flex w-[320px] xl:w-[360px] flex-shrink-0 border-r border-steel-700/50 bg-navy-900/50 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-60 pointer-events-none" />

      <div className="relative z-10 flex flex-col w-full p-8">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 border border-steel-500/60 bg-navy-800 flex items-center justify-center">
              <Hexagon className="w-6 h-6 text-steel-300" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-steel-100 tracking-wide">
                NEXUS GATE
              </h1>
              <p className="text-[11px] text-steel-500 font-mono tracking-widest">
                VPN SECURE ACCESS
              </p>
            </div>
          </div>
          <p className="text-xs text-steel-400 leading-relaxed border-t border-steel-700/50 pt-4">
            企业边界安全接入网关 v2.8.1 — 所有连接受 24/7 实时监控与审计，
            违规操作将触发自动响应预案。
          </p>
        </div>

        <div className="space-y-5 flex-1">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Building2
                className="w-4 h-4 text-steel-400"
                strokeWidth={1.8}
              />
              <h3 className="text-sm font-medium text-steel-200">
                企业网络概览
              </h3>
            </div>
            <div className="space-y-2.5 pl-6">
              <div className="flex items-center justify-between text-xs">
                <span className="text-steel-400">在线接入节点</span>
                <span className="text-steel-200 font-mono">8 / 8</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-steel-400">当前在线用户</span>
                <span className="text-security-green font-mono">2,847</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-steel-400">今日告警事件</span>
                <span className="text-steel-200 font-mono">0</span>
              </div>
            </div>
          </div>

          <div className="divider-line" />

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Server className="w-4 h-4 text-steel-400" strokeWidth={1.8} />
              <h3 className="text-sm font-medium text-steel-200">接入区域</h3>
            </div>
            <div className="grid grid-cols-2 gap-2 pl-6">
              {['总部 A 区', '总部 B 区', '研发中心', '灾备中心'].map((r) => (
                <div
                  key={r}
                  className="text-xs px-2.5 py-2 bg-navy-800/60 border border-steel-700/60 text-steel-300 flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 bg-security-green" />
                  {r}
                </div>
              ))}
            </div>
          </div>

          <div className="divider-line" />

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-steel-400" strokeWidth={1.8} />
              <h3 className="text-sm font-medium text-steel-200">安全基线</h3>
            </div>
            <div className="space-y-2 pl-6">
              {[
                { icon: Lock, label: '多因子认证', ok: true },
                { icon: Eye, label: '全程操作审计', ok: true },
                { icon: FileCheck, label: '终端合规检查', ok: true },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2 text-steel-400">
                    <item.icon
                      className="w-3.5 h-3.5 text-steel-500"
                      strokeWidth={1.8}
                    />
                    {item.label}
                  </div>
                  <span className="text-security-green">已启用</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 mt-6 border-t border-steel-700/50">
          <div className="flex items-center justify-between text-[11px] text-steel-500 font-mono">
            <span>NODE · SHA-GW-01</span>
            <span>BUILD · 20260615</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
