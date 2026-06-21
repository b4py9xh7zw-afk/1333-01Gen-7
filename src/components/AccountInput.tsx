import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, CheckCircle2, XCircle, Building, ArrowRight } from 'lucide-react';
import { useVPNStore } from '../store/vpnStore';
import { detectDepartment, validateAccountFormat } from '../data/mock';
import type { DepartmentConfig } from '../types';

const securityLevelConfig: Record<
  DepartmentConfig['securityLevel'],
  { label: string; border: string; text: string; bg: string }
> = {
  critical: {
    label: '关键安全域',
    border: 'border-security-red',
    text: 'text-security-red',
    bg: 'bg-security-red/10',
  },
  high: {
    label: '高安全域',
    border: 'border-security-orange',
    text: 'text-security-orange',
    bg: 'bg-security-orange/10',
  },
  standard: {
    label: '标准安全域',
    border: 'border-steel-400',
    text: 'text-steel-300',
    bg: 'bg-steel-500/10',
  },
  restricted: {
    label: '受限访问',
    border: 'border-steel-500',
    text: 'text-steel-400',
    bg: 'bg-steel-600/10',
  },
};

const authMethodLabels: Record<string, string> = {
  password: '静态密码',
  sms: '短信验证码',
  hardware_token: '硬件令牌',
  sso: '单点登录 SSO',
};

export default function AccountInput() {
  const navigate = useNavigate();
  const {
    formData,
    detectedDepartment,
    accountValidation,
    setAccount,
    setDetectedDepartment,
    setAccountValidation,
    setStep,
    step,
  } = useVPNStore();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setAccount(val);

      if (!val.trim()) {
        setDetectedDepartment(null);
        setAccountValidation(null);
        return;
      }

      const result = validateAccountFormat(val);
      setAccountValidation(result);

      if (result.valid) {
        const dept = detectDepartment(val);
        setDetectedDepartment(dept);
      } else {
        setDetectedDepartment(null);
      }
    },
    [setAccount, setDetectedDepartment, setAccountValidation]
  );

  const handleContinue = useCallback(() => {
    if (!accountValidation?.valid || !detectedDepartment) return;

    if (detectedDepartment.prefix === 'OUT') {
      navigate('/outsourcing');
      return;
    }

    setStep('authenticating');
  }, [accountValidation, detectedDepartment, navigate, setStep]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.key === 'Enter' &&
        step === 'account_input' &&
        accountValidation?.valid
      ) {
        handleContinue();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [step, accountValidation, handleContinue]);

  const canProceed = Boolean(accountValidation?.valid && detectedDepartment);

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <label htmlFor="account" className="label-text">
          企业账号
        </label>
        <div className="relative">
          <User
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-steel-500 pointer-events-none"
            strokeWidth={1.8}
          />
          <input
            id="account"
            type="text"
            autoComplete="username"
            placeholder="例：RD-zhangsan、FIN-lisi、HR-wangwu、EX-admin、OUT-liuqi"
            value={formData.account}
            onChange={handleChange}
            className={`input-base input-mono pl-11 ${
              accountValidation
                ? accountValidation.valid
                  ? 'border-security-green/60 focus:border-security-green'
                  : 'border-security-red/60 focus:border-security-red'
                : ''
            }`}
          />
          {accountValidation && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {accountValidation.valid ? (
                <CheckCircle2
                  className="w-5 h-5 text-security-green"
                  strokeWidth={2}
                />
              ) : (
                <XCircle
                  className="w-5 h-5 text-security-red"
                  strokeWidth={2}
                />
              )}
            </div>
          )}
        </div>

        <div className="mt-2 min-h-[20px]">
          {accountValidation && (
            <p
              className={`text-xs ${
                accountValidation.valid ? 'text-security-green' : 'text-security-red'
              }`}
            >
              {accountValidation.message}
            </p>
          )}
        </div>
      </div>

      {detectedDepartment && (
        <div
          className={`border ${
            securityLevelConfig[detectedDepartment.securityLevel].border
          } ${securityLevelConfig[detectedDepartment.securityLevel].bg} p-4 animate-slide-up`}
        >
          <div className="flex items-start gap-3 mb-3">
            <div
              className={`w-9 h-9 flex items-center justify-center border ${
                securityLevelConfig[detectedDepartment.securityLevel].border
              } flex-shrink-0`}
            >
              <Building
                className={`w-5 h-5 ${
                  securityLevelConfig[detectedDepartment.securityLevel].text
                }`}
                strokeWidth={1.8}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h4 className="text-sm font-semibold text-steel-100">
                  {detectedDepartment.fullName}
                </h4>
                <span
                  className={`tag-badge ${
                    securityLevelConfig[detectedDepartment.securityLevel].border
                  } ${
                    securityLevelConfig[detectedDepartment.securityLevel].text
                  }`}
                >
                  {
                    securityLevelConfig[detectedDepartment.securityLevel]
                      .label
                  }
                </span>
                <span className="tag-badge border-steel-600 text-steel-300 font-mono text-[10px]">
                  {detectedDepartment.prefix}
                </span>
              </div>
              <p className="text-xs text-steel-400 leading-relaxed">
                {detectedDepartment.description}
              </p>
            </div>
          </div>

          <div className="divider-line mb-3" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <p className="text-[11px] text-steel-500 mb-1.5 uppercase tracking-wider">
                认证方式
              </p>
              <div className="flex flex-wrap gap-1.5">
                {detectedDepartment.authMethods.length > 0 ? (
                  detectedDepartment.authMethods.map((m) => (
                    <span
                      key={m}
                      className="text-xs px-2 py-1 bg-navy-900/70 border border-steel-700 text-steel-200 font-medium"
                    >
                      {authMethodLabels[m]}
                    </span>
                  ))
                ) : (
                  <span className="text-xs px-2 py-1 bg-navy-900/70 border border-steel-700 text-steel-400">
                    需人工审批
                  </span>
                )}
              </div>
            </div>
            <div>
              <p className="text-[11px] text-steel-500 mb-1.5 uppercase tracking-wider">
                访问范围
              </p>
              <p className="text-xs text-steel-300 font-medium">
                {detectedDepartment.accessScope}
              </p>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleContinue}
        disabled={!canProceed}
        className="btn-primary flex items-center justify-center gap-2"
      >
        <span>
          {detectedDepartment?.prefix === 'OUT'
            ? '查看临时访问流程'
            : '继续认证'}
        </span>
        <ArrowRight className="w-4 h-4" strokeWidth={1.8} />
      </button>

      <div className="pt-2">
        <p className="text-[11px] text-steel-500 leading-relaxed mb-2">
          提示：账号前缀决定部门与认证方式
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px] font-mono">
          {[
            { k: 'RD-', v: '研发部' },
            { k: 'FIN-', v: '财务部' },
            { k: 'HR-', v: '人事部' },
            { k: 'EX-', v: '高管层' },
            { k: 'OUT-', v: '外包' },
          ].map((p) => (
            <div
              key={p.k}
              className="px-2 py-1.5 bg-navy-800/50 border border-steel-700/60 text-center"
            >
              <span className="text-security-orange">{p.k}</span>
              <span className="text-steel-400 ml-1">{p.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
