import {
  ArrowLeft,
  ClipboardList,
  UserCheck,
  KeyRound,
  MonitorPlay,
  Mail,
  Phone,
  ShieldAlert,
  FileCheck2,
  Timer,
  AlertTriangle,
  Hexagon,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { OUTSOURCING_INFO } from '../data/mock';

const stepIcons = [ClipboardList, UserCheck, KeyRound, MonitorPlay];

export default function OutsourcingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <div className="w-full border-b border-steel-700/60 bg-navy-900/60 backdrop-blur-sm">
        <div className="max-w-[1200px] mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 border border-steel-500/60 bg-navy-800 flex items-center justify-center">
              <Hexagon className="w-5 h-5 text-steel-300" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-steel-100 tracking-wide">
                NEXUS GATE · 外包访问中心
              </h1>
              <p className="text-[10px] text-steel-500 font-mono tracking-widest">
                OUTSOURCING ACCESS PORTAL
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 text-xs text-steel-300 hover:text-steel-100 px-3 py-2 border border-steel-700 hover:border-steel-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.8} />
            返回登录
          </button>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 py-10 md:py-14">
        <div className="mb-10 relative">
          <div className="absolute -left-6 top-1 bottom-1 w-1 bg-security-orange/60 hidden md:block" />
          <div className="flex items-start gap-4 mb-3">
            <div className="w-12 h-12 border-2 border-security-orange bg-security-orange/10 flex items-center justify-center flex-shrink-0">
              <ShieldAlert
                className="w-6 h-6 text-security-orange"
                strokeWidth={1.8}
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-steel-50 mb-2">
                {OUTSOURCING_INFO.title}
              </h2>
              <p className="text-sm text-steel-400 leading-relaxed">
                外包及临时合作人员不具备 VPN 直接接入权限，须按以下流程申请临时访问授权。
                所有访问全程接受录屏审计，访问结束账号自动注销。
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-16 md:ml-[72px]">
            <Timer className="w-4 h-4 text-security-orange" strokeWidth={1.8} />
            <span className="text-xs text-security-orange font-medium">
              {OUTSOURCING_INFO.validPeriod}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <section>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-navy-700 border border-steel-600 flex items-center justify-center text-[11px] font-semibold text-steel-200">
                  1
                </div>
                <h3 className="text-base font-semibold text-steel-100">
                  申请审批流程
                </h3>
              </div>

              <div className="ml-3 relative">
                <div className="absolute left-[18px] top-4 bottom-4 w-px bg-gradient-to-b from-steel-600/60 via-steel-600/40 to-transparent" />

                <div className="space-y-6">
                  {OUTSOURCING_INFO.steps.map((step, idx) => {
                    const IconComp = stepIcons[idx] || ClipboardList;
                    return (
                      <div
                        key={step.order}
                        className="relative flex gap-5 animate-slide-up"
                        style={{ animationDelay: `${idx * 80}ms` }}
                      >
                        <div className="flex-shrink-0 w-[38px] h-[38px] bg-navy-800 border border-steel-600 flex items-center justify-center relative z-10">
                          <IconComp
                            className="w-5 h-5 text-steel-300"
                            strokeWidth={1.8}
                          />
                        </div>
                        <div className="flex-1 border border-steel-700/70 bg-navy-800/40 p-4">
                          <div className="flex items-center justify-between gap-3 mb-2">
                            <h4 className="text-sm font-semibold text-steel-100">
                              步骤 {step.order} · {step.title}
                            </h4>
                            <span className="tag-badge border-security-orange/60 text-security-orange text-[10px] font-mono">
                              {step.timeEstimate}
                            </span>
                          </div>
                          <p className="text-xs text-steel-300 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-navy-700 border border-steel-600 flex items-center justify-center text-[11px] font-semibold text-steel-200">
                  2
                </div>
                <h3 className="text-base font-semibold text-steel-100">
                  接入前置要求
                </h3>
              </div>

              <div className="ml-3 border border-steel-700/70 bg-navy-800/40">
                {OUTSOURCING_INFO.requirements.map((req, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 px-4 py-3 ${
                      idx !== 0 ? 'border-t border-steel-700/50' : ''
                    }`}
                  >
                    <FileCheck2
                      className="w-4 h-4 text-security-orange flex-shrink-0 mt-0.5"
                      strokeWidth={1.8}
                    />
                    <p className="text-xs text-steel-300 leading-relaxed">
                      {req}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="border border-security-orange/40 bg-security-orange/5 p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle
                  className="w-4 h-4 text-security-orange"
                  strokeWidth={1.8}
                />
                <h4 className="text-sm font-semibold text-security-orange">
                  合作方合规声明
                </h4>
              </div>
              <p className="text-[11px] text-steel-300 leading-relaxed space-y-2">
                <span>
                  我司（合作方）已向其员工充分告知《NEXUS 企业数据保密协议》全部条款，
                  并确保所有临时访问人员知悉并承担以下责任：
                </span>
              </p>
              <ul className="mt-3 space-y-1.5 text-[11px] text-steel-300 pl-4">
                <li className="relative">
                  <span className="absolute left-[-12px] text-security-orange">
                    ·
                  </span>
                  不得拍摄、截屏、下载或通过任何方式留存企业敏感数据
                </li>
                <li className="relative">
                  <span className="absolute left-[-12px] text-security-orange">
                    ·
                  </span>
                  不得以任何形式将访问权限转借或共享给第三方
                </li>
                <li className="relative">
                  <span className="absolute left-[-12px] text-security-orange">
                    ·
                  </span>
                  因违规操作造成的数据泄露须承担全部经济及法律责任
                </li>
              </ul>
            </div>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-navy-700 border border-steel-600 flex items-center justify-center text-[11px] font-semibold text-steel-200">
                  3
                </div>
                <h3 className="text-sm font-semibold text-steel-100">
                  审批联系人
                </h3>
              </div>

              <div className="space-y-3">
                {OUTSOURCING_INFO.contacts.map((c) => (
                  <div
                    key={c.email}
                    className="border border-steel-700/70 bg-navy-800/40 p-4"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 bg-navy-700 border border-steel-600 flex items-center justify-center text-xs font-semibold text-steel-200">
                        {c.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="text-sm font-medium text-steel-100">
                          {c.name}
                        </h5>
                        <p className="text-[11px] text-steel-400 truncate">
                          {c.role}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2 text-[11px] pl-12">
                      <div className="flex items-center gap-2 text-steel-300">
                        <Mail className="w-3.5 h-3.5 text-steel-500" strokeWidth={1.8} />
                        <span className="font-mono">{c.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-steel-300">
                        <Phone className="w-3.5 h-3.5 text-steel-500" strokeWidth={1.8} />
                        <span className="font-mono">{c.phone}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="pt-2">
              <button
                onClick={() => navigate('/')}
                className="btn-secondary flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" strokeWidth={1.8} />
                <span>返回企业登录入口</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 divider-line" />
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-steel-500">
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
            <span>© 2026 NEXUS CORP. 信息安全部</span>
          </div>
          <div className="flex items-center gap-3 font-mono flex-wrap justify-center sm:justify-end">
            <span>版本 v2.8.1</span>
            <span>·</span>
            <span>紧急联系内线 9110</span>
          </div>
        </div>
      </div>
    </div>
  );
}
