import SecurityBanner from '../components/SecurityBanner';
import InfoSidebar from '../components/InfoSidebar';
import MaintenanceModal from '../components/MaintenanceModal';
import AccountInput from '../components/AccountInput';
import AuthForm from '../components/AuthForm';
import PolicyAgreement from '../components/PolicyAgreement';
import SuccessPanel from '../components/SuccessPanel';
import { useVPNStore } from '../store/vpnStore';
import { Hexagon } from 'lucide-react';

export default function LoginPage() {
  const { step, detectedDepartment, loginSuccess, maintenanceConfirmed } = useVPNStore();

  const showAuthArea = maintenanceConfirmed;
  const isAuthenticated = loginSuccess;

  return (
    <div className="min-h-screen flex flex-col">
      <MaintenanceModal />
      <SecurityBanner />

      <div className="flex-1 flex min-h-0">
        <InfoSidebar />

        <main className="flex-1 flex items-center justify-center p-6 md:p-10 relative overflow-hidden">
          <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />

          <div className="relative z-10 w-full max-w-[520px]">
            <div className="lg:hidden flex items-center justify-center gap-3 mb-10">
              <div className="w-10 h-10 border border-steel-500/60 bg-navy-800 flex items-center justify-center">
                <Hexagon className="w-5 h-5 text-steel-300" strokeWidth={1.5} />
              </div>
              <div>
                <h1 className="text-base font-semibold text-steel-100 tracking-wide">
                  NEXUS GATE
                </h1>
                <p className="text-[10px] text-steel-500 font-mono tracking-widest">
                  VPN SECURE ACCESS
                </p>
              </div>
            </div>

            <div className="card-panel p-6 md:p-8">
              {!isAuthenticated ? (
                <>
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-steel-50 mb-1.5">
                      企业 VPN 安全接入
                    </h2>
                    <p className="text-xs text-steel-400 leading-relaxed">
                      请使用企业统一账号登录，所有连接受信息安全部 24 小时审计监控。
                      未授权访问将触发安全告警并追溯来源。
                    </p>
                  </div>

                  <div className="divider-line mb-6" />

                  {showAuthArea && step === 'account_input' && (
                    <AccountInput />
                  )}

                  {showAuthArea &&
                    step === 'authenticating' &&
                    detectedDepartment && (
                      <div className="space-y-6">
                        <AuthForm
                          authMethods={detectedDepartment.authMethods as any}
                          departmentName={detectedDepartment.name}
                        />
                        <PolicyAgreement />
                      </div>
                    )}

                  {!showAuthArea && (
                    <div className="py-16 text-center">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-steel-700 text-xs text-steel-400 mb-6">
                        <span className="w-1.5 h-1.5 bg-steel-500" />
                        等待维护公告确认
                      </div>
                      <p className="text-sm text-steel-300">
                        请先阅读并确认维护窗口信息
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <SuccessPanel />
              )}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-steel-500">
              <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
                <span>© 2026 NEXUS CORP.</span>
                <span className="hidden sm:inline">·</span>
                <span>信息安全部运维中心</span>
              </div>
              <div className="flex items-center gap-3 font-mono flex-wrap justify-center sm:justify-end">
                <span>SSL/TLS 加密</span>
                <span>·</span>
                <span>等保三级</span>
                <span>·</span>
                <span>ISO 27001</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
