import { useEffect, useCallback } from 'react';
import {
  Lock,
  Smartphone,
  KeyRound,
  LogIn,
  ArrowLeft,
  Send,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import { useVPNStore } from '../store/vpnStore';

interface Props {
  authMethods: ('password' | 'sms' | 'hardware_token' | 'sso')[];
  departmentName: string;
}

export default function AuthForm({ authMethods, departmentName }: Props) {
  const {
    formData,
    setFormField,
    setStep,
    smsCountdown,
    setSmsCountdown,
    decreaseSmsCountdown,
    authError,
    setAuthError,
    setLoginSuccess,
  } = useVPNStore();

  useEffect(() => {
    if (smsCountdown <= 0) return;
    const t = setInterval(() => decreaseSmsCountdown(), 1000);
    return () => clearInterval(t);
  }, [smsCountdown, decreaseSmsCountdown]);

  const handleSendSms = useCallback(() => {
    if (smsCountdown > 0) return;
    setSmsCountdown(60);
  }, [smsCountdown, setSmsCountdown]);

  const handleSSO = useCallback(() => {
    if (!formData.agreedPolicy) {
      setAuthError('请先阅读并同意企业 VPN 接入安全规范');
      return;
    }
    setAuthError(null);
    setTimeout(() => setLoginSuccess(true), 1500);
  }, [formData.agreedPolicy, setAuthError, setLoginSuccess]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setAuthError(null);

      if (!formData.agreedPolicy) {
        setAuthError('请先阅读并同意企业 VPN 接入安全规范');
        return;
      }

      if (authMethods.includes('password') && !formData.password) {
        setAuthError('请输入密码');
        return;
      }
      if (authMethods.includes('sms') && !formData.smsCode) {
        setAuthError('请输入短信验证码');
        return;
      }
      if (authMethods.includes('hardware_token') && !formData.hardwareToken) {
        setAuthError('请输入硬件令牌动态码');
        return;
      }

      setTimeout(() => setLoginSuccess(true), 1500);
    },
    [
      authMethods,
      formData,
      setAuthError,
      setLoginSuccess,
    ]
  );

  const isSSOOnly = authMethods.length === 1 && authMethods[0] === 'sso';

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-steel-100 mb-1">
            {departmentName} · 身份认证
          </h3>
          <p className="text-xs text-steel-400">
            请按要求完成以下 {authMethods.length > 0 ? authMethods.length : '0'} 项认证
          </p>
        </div>
        <button
          onClick={() => setStep('account_input')}
          className="flex items-center gap-1.5 text-xs text-steel-400 hover:text-steel-200 transition-colors px-3 py-1.5 border border-steel-700/60 hover:border-steel-500"
        >
          <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.8} />
          修改账号
        </button>
      </div>

      {isSSOOnly ? (
        <div className="space-y-5">
          <div className="border border-steel-600 p-5 bg-navy-900/40">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-11 h-11 border border-steel-500 bg-navy-800 flex items-center justify-center flex-shrink-0">
                <ExternalLink
                  className="w-5 h-5 text-steel-300"
                  strokeWidth={1.8}
                />
              </div>
              <div>
                <h4 className="text-sm font-medium text-steel-100 mb-1.5">
                  统一身份单点登录
                </h4>
                <p className="text-xs text-steel-400 leading-relaxed">
                  点击下方按钮将跳转至企业 SSO 统一身份认证平台，
                  完成认证后将自动建立 VPN 连接。
                </p>
              </div>
            </div>

            <div className="space-y-3 pl-[60px] text-xs text-steel-400">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-steel-500" />
                SAML 2.0 协议 · AES-256 加密传输
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-steel-500" />
                会话有效期 8 小时 · 超时自动注销
              </div>
            </div>
          </div>

          <button onClick={handleSSO} className="btn-primary flex items-center justify-center gap-2">
            <ExternalLink className="w-4 h-4" strokeWidth={1.8} />
            <span>前往统一身份认证平台</span>
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {authMethods.includes('hardware_token') && (
            <div>
              <label htmlFor="token" className="label-text flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-steel-400" strokeWidth={1.8} />
                硬件令牌动态码
              </label>
              <input
                id="token"
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="请输入 6 位动态验证码"
                value={formData.hardwareToken}
                onChange={(e) =>
                  setFormField('hardwareToken', e.target.value.replace(/\D/g, ''))
                }
                className="input-base input-mono text-center tracking-[0.5em] text-lg"
                autoComplete="one-time-code"
              />
              <p className="mt-1.5 text-[11px] text-steel-500">
                请按下硬件令牌按钮，读取屏幕上显示的 6 位数字
              </p>
            </div>
          )}

          {authMethods.includes('sms') && (
            <div>
              <label htmlFor="sms" className="label-text flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-steel-400" strokeWidth={1.8} />
                短信验证码
              </label>
              <div className="flex gap-3">
                <input
                  id="sms"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="6 位短信验证码"
                  value={formData.smsCode}
                  onChange={(e) =>
                    setFormField('smsCode', e.target.value.replace(/\D/g, ''))
                  }
                  className="input-base input-mono text-center tracking-[0.4em] flex-1"
                  autoComplete="one-time-code"
                />
                <button
                  type="button"
                  onClick={handleSendSms}
                  disabled={smsCountdown > 0}
                  className={`flex-shrink-0 w-[140px] px-4 border text-sm font-medium transition-all duration-200 active:translate-y-px ${
                    smsCountdown > 0
                      ? 'border-steel-700 bg-navy-800 text-steel-500 cursor-not-allowed'
                      : 'border-steel-500 bg-navy-700 text-steel-200 hover:border-steel-400 hover:bg-navy-600'
                  }`}
                >
                  <span className="flex items-center justify-center gap-1.5">
                    {smsCountdown > 0 ? (
                      <>
                        <RefreshCw
                          className="w-3.5 h-3.5 animate-spin"
                          strokeWidth={1.8}
                        />
                        {smsCountdown}s
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" strokeWidth={1.8} />
                        获取验证码
                      </>
                    )}
                  </span>
                </button>
              </div>
              <p className="mt-1.5 text-[11px] text-steel-500">
                验证码将发送至账号绑定手机号：138****{formData.account.slice(-4) || '0000'}
              </p>
            </div>
          )}

          {authMethods.includes('password') && (
            <div>
              <label htmlFor="password" className="label-text flex items-center gap-2">
                <Lock className="w-4 h-4 text-steel-400" strokeWidth={1.8} />
                接入密码
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="请输入 VPN 接入密码"
                value={formData.password}
                onChange={(e) => setFormField('password', e.target.value)}
                className="input-base input-mono"
              />
              <p className="mt-1.5 text-[11px] text-steel-500">
                密码长度 ≥12 位，包含大小写字母、数字及特殊字符
              </p>
            </div>
          )}

          {authError && (
            <div className="border border-security-red bg-security-red/10 px-4 py-3 text-xs text-security-red animate-fade-in">
              {authError}
            </div>
          )}

          <button type="submit" className="btn-primary flex items-center justify-center gap-2">
            <LogIn className="w-4 h-4" strokeWidth={1.8} />
            <span>建立安全连接</span>
          </button>
        </form>
      )}
    </div>
  );
}
