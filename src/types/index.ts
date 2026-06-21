export type AuthMethod = 'password' | 'sms' | 'hardware_token' | 'sso';

export type ImpactLevel = 'high' | 'medium' | 'low';

export interface DepartmentConfig {
  prefix: string;
  name: string;
  fullName: string;
  authMethods: AuthMethod[];
  description: string;
  accessScope: string;
  securityLevel: 'critical' | 'high' | 'standard' | 'restricted';
}

export interface MaintenanceWindow {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  impact: ImpactLevel;
  description: string;
  affectedServices: string[];
}

export interface SecurityPolicy {
  id: string;
  title: string;
  content: string[];
  version: string;
  lastUpdated: string;
}

export interface OutsourcingInfo {
  title: string;
  steps: {
    order: number;
    title: string;
    description: string;
    timeEstimate: string;
  }[];
  contacts: {
    name: string;
    role: string;
    email: string;
    phone: string;
  }[];
  requirements: string[];
  validPeriod: string;
}

export interface LoginFormData {
  account: string;
  password: string;
  smsCode: string;
  hardwareToken: string;
  agreedPolicy: boolean;
}

export type LoginStep =
  | 'maintenance'
  | 'account_input'
  | 'authenticating'
  | 'success'
  | 'outsourcing';
