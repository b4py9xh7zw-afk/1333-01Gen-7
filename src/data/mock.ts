import type {
  DepartmentConfig,
  MaintenanceWindow,
  SecurityPolicy,
  OutsourcingInfo,
} from '../types';

export const DEPARTMENT_CONFIGS: DepartmentConfig[] = [
  {
    prefix: 'RD',
    name: '技术研发部',
    fullName: 'Technology R&D Department',
    authMethods: ['hardware_token', 'password'],
    description: '研发及技术人员专用通道，强制双因子认证',
    accessScope: '全业务网络访问权限',
    securityLevel: 'critical',
  },
  {
    prefix: 'FIN',
    name: '财务部',
    fullName: 'Finance Department',
    authMethods: ['sms', 'password'],
    description: '财务及审计人员通道，短信验证码加密码',
    accessScope: '财务系统专用网段',
    securityLevel: 'high',
  },
  {
    prefix: 'HR',
    name: '行政人事部',
    fullName: 'HR & Administration Department',
    authMethods: ['password'],
    description: '人力资源及行政人员通道',
    accessScope: 'OA/HR 系统网段',
    securityLevel: 'standard',
  },
  {
    prefix: 'EX',
    name: '高管层',
    fullName: 'Executive Management',
    authMethods: ['sso'],
    description: '企业高管统一身份认证入口',
    accessScope: '全局访问权限',
    securityLevel: 'critical',
  },
  {
    prefix: 'OUT',
    name: '外包人员',
    fullName: 'Outsourcing Personnel',
    authMethods: [],
    description: '外部合作方及临时人员',
    accessScope: '受限访问 / 需人工审批',
    securityLevel: 'restricted',
  },
];

export const MAINTENANCE_WINDOWS: MaintenanceWindow[] = [
  {
    id: 'mw-001',
    title: 'VPN 核心网关例行维护',
    startTime: '2026-06-28 02:00:00',
    endTime: '2026-06-28 05:00:00',
    impact: 'high',
    description:
      '将进行 VPN 核心网关固件升级及安全补丁应用，期间所有用户连接将被断开，预计中断 3 小时。建议提前保存工作并断开连接。',
    affectedServices: ['主 VPN 网关', '备用 VPN 网关', 'SSO 身份认证服务'],
  },
  {
    id: 'mw-002',
    title: '财务系统网络优化',
    startTime: '2026-06-25 23:00:00',
    endTime: '2026-06-26 01:00:00',
    impact: 'medium',
    description:
      '财务系统专用网段进行网络架构优化，财务部用户在期间可能会遇到连接不稳定或短时断开。',
    affectedServices: ['财务系统网段', 'ERP 接入点'],
  },
  {
    id: 'mw-003',
    title: '日志审计系统更新',
    startTime: '2026-06-23 00:00:00',
    endTime: '2026-06-23 02:00:00',
    impact: 'low',
    description:
      '后台日志审计平台进行版本更新，不影响 VPN 正常连接，仅审计查询功能可能短时不可用。',
    affectedServices: ['日志审计平台'],
  },
];

export const SECURITY_POLICY: SecurityPolicy = {
  id: 'sp-vpn-001',
  title: '企业 VPN 接入安全规范',
  version: 'v3.2.0',
  lastUpdated: '2026-05-15',
  content: [
    '一、账号安全管理',
    '1. VPN 账号仅限本人使用，严禁转借、共享账号或告知他人密码。',
    '2. 密码须满足复杂度要求：长度不少于 12 位，包含大小写字母、数字及特殊字符，每 90 天强制更换。',
    '3. 硬件令牌须随身携带，如遗失须立即报告信息安全部门挂失。',
    '',
    '二、网络环境要求',
    '4. 接入 VPN 时严禁使用公共免费 Wi-Fi（如机场、咖啡店、酒店开放网络），须使用可信的加密网络。',
    '5. 接入设备须安装企业指定的防病毒软件及终端检测系统，并保持病毒库实时更新。',
    '6. 禁止在已接入 VPN 的设备上同时启用其他代理软件或翻墙工具。',
    '',
    '三、数据与操作规范',
    '7. 通过 VPN 访问的企业数据禁止下载至个人设备或非企业云存储。',
    '8. 远程办公期间所有操作均被安全审计系统记录，包括登录时间、IP 地址、访问资源等。',
    '9. 敏感数据访问（财务、研发核心代码、客户资料）须额外申请权限并记录审批流程。',
    '',
    '四、违规处理',
    '10. 违反以上任一条款将触发安全预警，视情节轻重处以账号锁定、通报批评、直至解除劳动合同等处罚。',
    '11. 因违规操作导致数据泄露或安全事故的，将依法追究相关法律责任。',
  ],
};

export const OUTSOURCING_INFO: OutsourcingInfo = {
  title: '外包人员临时访问申请流程',
  validPeriod: '单次访问最长有效期 72 小时，超期自动失效',
  steps: [
    {
      order: 1,
      title: '提交访问申请',
      description:
        '由贵公司对接人填写《外部人员网络访问申请表》，注明访问事由、所需系统、起止时间，加盖对接部门公章后扫描提交。',
      timeEstimate: 'T+0 日',
    },
    {
      order: 2,
      title: '审批流程',
      description:
        '对接部门负责人初审（1 工作日）→ 信息安全部复核（1 工作日）→ 涉及核心系统需 CIO 终审（1 工作日）。',
      timeEstimate: '1~3 工作日',
    },
    {
      order: 3,
      title: '账号发放',
      description:
        '审批通过后，IT 运维部门将生成一次性临时账号及初始密码，通过加密邮件发送至对接人指定邮箱。',
      timeEstimate: '审批通过后 2 小时内',
    },
    {
      order: 4,
      title: '受限登录',
      description:
        '临时账号仅可访问指定业务网段，所有操作全程录屏审计。访问结束后请立即登出，账号到期自动注销。',
      timeEstimate: '有效期内使用',
    },
  ],
  contacts: [
    {
      name: '张明',
      role: '信息安全部 · 安全运营经理',
      email: 'ming.zhang@company-security.com',
      phone: '内线 8012 / 138-0000-0001',
    },
    {
      name: '李婷',
      role: 'IT 运维中心 · 账号管理员',
      email: 'ting.li@company-it.com',
      phone: '内线 8035 / 138-0000-0002',
    },
  ],
  requirements: [
    '须安装企业指定的 EDR 终端检测程序并完成合规基线扫描',
    '访问设备须为企业注册设备，个人设备不予接入',
    '访问过程全程开启 VPN 客户端录屏审计',
    '禁止从外部网盘或邮件下载访问数据',
    '须在访问结束 24 小时内提交访问工作记录',
  ],
};

export function detectDepartment(
  account: string
): DepartmentConfig | null {
  const upperAccount = account.trim().toUpperCase();
  for (const dept of DEPARTMENT_CONFIGS) {
    if (upperAccount.startsWith(dept.prefix + '-')) {
      return dept;
    }
  }
  return null;
}

export function validateAccountFormat(account: string): {
  valid: boolean;
  message: string;
} {
  const trimmed = account.trim();
  if (!trimmed) {
    return { valid: false, message: '请输入账号' };
  }
  const pattern = /^[A-Z]{2,4}-[A-Za-z0-9._]{3,20}$/;
  if (!pattern.test(trimmed)) {
    return {
      valid: false,
      message: '账号格式不正确，格式为：部门前缀-用户名（如 RD-zhangsan）',
    };
  }
  const dept = detectDepartment(trimmed);
  if (!dept) {
    return { valid: false, message: '未识别的部门前缀，请检查账号' };
  }
  return { valid: true, message: dept.name + ' 已识别' };
}
