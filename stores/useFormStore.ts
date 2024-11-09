import { defineStore } from 'pinia';

export interface FormState {
  investmentAmount: number;
  name: string;
  surname: string;
  telephone: string;
  email: string;
  socialSecurityNumber: string;
  dateOfBirth: string;
  identityCardNumber: string;
  address: string;
  bankAccountNumber: string;
  consent: boolean;
}

export const useFormStore = defineStore('form', {
  state: (): FormState => ({
    investmentAmount: 0,
    name: '',
    surname: '',
    telephone: '',
    email: '',
    socialSecurityNumber: '',
    dateOfBirth: '',
    identityCardNumber: '',
    address: '',
    bankAccountNumber: '',
    consent: false,
  }),

  actions: {
    clear(): void {
      this.$reset();
    },

    resetFields(fieldsToReset: Array<keyof FormState>): void {
      fieldsToReset.forEach((fieldName) => {
        const defaultValue = (() => {
          const value = this.$state[fieldName];
          if (typeof value === 'string') return '';
          if (typeof value === 'boolean') return false;
          if (typeof value === 'number') return 0;
          return value;
        })();

        this[fieldName] = defaultValue as FormState[typeof fieldName];
      });
    },
  },
});
