import { FileCheck, Check, AlertTriangle } from 'lucide-react';
import { useVPNStore } from '../store/vpnStore';
import { SECURITY_POLICY } from '../data/mock';

export default function PolicyAgreement() {
  const { formData, setFormField } = useVPNStore();

  return (
    <div className="border border-steel-700/70 bg-navy-900/40">
      <div className="px-4 py-3 border-b border-steel-700/70 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-steel-300" strokeWidth={1.8} />
          <h4 className="text-sm font-medium text-steel-200">
            {SECURITY_POLICY.title}
          </h4>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-steel-500 font-mono">
          <span>{SECURITY_POLICY.version}</span>
          <span>·</span>
          <span>{SECURITY_POLICY.lastUpdated}</span>
        </div>
      </div>

      <div className="h-40 overflow-y-auto px-4 py-3 space-y-2 text-xs leading-relaxed text-steel-300">
        {SECURITY_POLICY.content.map((line, idx) =>
          line === '' ? (
            <div key={idx} className="h-2" />
          ) : line.startsWith('一、') ||
            line.startsWith('二、') ||
            line.startsWith('三、') ||
            line.startsWith('四、') ? (
            <h5
              key={idx}
              className="text-steel-100 font-medium pt-1 pb-0.5 text-[13px]"
            >
              {line}
            </h5>
          ) : (
            <p key={idx} className="pl-4 relative">
              <span className="absolute left-0 text-steel-500 select-none">
                {line.match(/^\d+\./) ? '' : '•'}
              </span>
              {line}
            </p>
          )
        )}
      </div>

      <div className="divider-line" />

      <label className="flex items-start gap-3 px-4 py-3 cursor-pointer select-none hover:bg-navy-800/30 transition-colors">
        <div className="flex-shrink-0 mt-0.5">
          <div
            className={`w-5 h-5 border flex items-center justify-center transition-all duration-200 ${
              formData.agreedPolicy
                ? 'bg-security-green border-security-green'
                : 'bg-navy-800 border-steel-600 hover:border-steel-400'
            }`}
          >
            {formData.agreedPolicy && (
              <Check className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            )}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <input
            type="checkbox"
            className="sr-only"
            checked={formData.agreedPolicy}
            onChange={(e) => setFormField('agreedPolicy', e.target.checked)}
          />
          <p
            className={`text-xs leading-relaxed ${
              formData.agreedPolicy ? 'text-steel-100' : 'text-steel-300'
            }`}
          >
            我已仔细阅读并同意遵守上述
            <span className="font-medium text-steel-100">
              《{SECURITY_POLICY.title}》
            </span>
            的全部条款。我理解任何违规行为将被审计系统记录，并承担相应责任。
          </p>
          {!formData.agreedPolicy && (
            <p className="mt-1.5 text-[11px] text-security-orange flex items-center gap-1">
              <AlertTriangle
                className="w-3 h-3"
                strokeWidth={1.8}
              />
              认证提交前必须勾选同意
            </p>
          )}
        </div>
      </label>
    </div>
  );
}
