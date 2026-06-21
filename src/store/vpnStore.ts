import { create } from 'zustand';
import type { DepartmentConfig, LoginStep, LoginFormData } from '../types';

interface VPNStore {
  step: LoginStep;
  maintenanceConfirmed: boolean;
  formData: LoginFormData;
  detectedDepartment: DepartmentConfig | null;
  accountValidation: { valid: boolean; message: string } | null;
  smsCountdown: number;
  authError: string | null;
  loginSuccess: boolean;

  setStep: (step: LoginStep) => void;
  setMaintenanceConfirmed: (confirmed: boolean) => void;
  setAccount: (account: string) => void;
  setDetectedDepartment: (dept: DepartmentConfig | null) => void;
  setAccountValidation: (v: { valid: boolean; message: string } | null) => void;
  setFormField: <K extends keyof LoginFormData>(
    key: K,
    value: LoginFormData[K]
  ) => void;
  setSmsCountdown: (n: number) => void;
  decreaseSmsCountdown: () => void;
  setAuthError: (err: string | null) => void;
  setLoginSuccess: (v: boolean) => void;
  resetAll: () => void;
}

const initialForm: LoginFormData = {
  account: '',
  password: '',
  smsCode: '',
  hardwareToken: '',
  agreedPolicy: false,
};

export const useVPNStore = create<VPNStore>((set) => ({
  step: 'maintenance',
  maintenanceConfirmed: false,
  formData: { ...initialForm },
  detectedDepartment: null,
  accountValidation: null,
  smsCountdown: 0,
  authError: null,
  loginSuccess: false,

  setStep: (step) => set({ step }),
  setMaintenanceConfirmed: (confirmed) =>
    set({
      maintenanceConfirmed: confirmed,
      step: confirmed ? 'account_input' : 'maintenance',
    }),
  setAccount: (account) =>
    set((state) => ({
      formData: { ...state.formData, account },
    })),
  setDetectedDepartment: (dept) => set({ detectedDepartment: dept }),
  setAccountValidation: (v) => set({ accountValidation: v }),
  setFormField: (key, value) =>
    set((state) => ({
      formData: { ...state.formData, [key]: value },
    })),
  setSmsCountdown: (n) => set({ smsCountdown: n }),
  decreaseSmsCountdown: () =>
    set((state) => ({
      smsCountdown: state.smsCountdown > 0 ? state.smsCountdown - 1 : 0,
    })),
  setAuthError: (err) => set({ authError: err }),
  setLoginSuccess: (v) =>
    set((state) => ({ loginSuccess: v, step: v ? 'success' : state.step })),
  resetAll: () =>
    set({
      step: 'maintenance',
      maintenanceConfirmed: false,
      formData: { ...initialForm },
      detectedDepartment: null,
      accountValidation: null,
      smsCountdown: 0,
      authError: null,
      loginSuccess: false,
    }),
}));
