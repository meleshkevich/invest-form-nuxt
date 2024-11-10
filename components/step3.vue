<script setup lang="ts">
import { ref } from 'vue';
import { useFormStore } from '@/stores/useFormStore';
import { useSendData } from '@/composables/useSendData';

const { sendData } = useSendData();
const formStore = useFormStore();
const isFormValid = ref(false);
const props = defineProps({
  goNext: Function,
  goBack: Function,
});
function sendDataToForm() {
  sendData();
}
function clearStep() {
  formStore.resetFields(['address', 'bankAccountNumber', 'consent']);
}
const rules = {
  required: (value: boolean) => !!value || 'Toto pole je povinné.',
  iban: (value: string): true | string =>
    /^[A-Z]{2}\d{2} \d{4} \d{4} \d{4} \d{4} \d{4}$/.test(value) ||
    'Neplatný formát IBAN. Použijte CZ12 0800 0000 0000 0000 0000',
};
</script>
<template>
  <v-form v-model="isFormValid" class="space-y-4">
    <v-textarea
      v-model="formStore.address"
      label="Adresa trvalého pobytu"
      :rules="[rules.required]"
    ></v-textarea>
    <v-text-field
      v-model="formStore.bankAccountNumber"
      label="Číslo bankovního účtu"
      v-mask="'AA## #### #### #### #### ####'"
      placeholder="CZ12 0800 0000 0000 0000 0000"
      :rules="[rules.iban]"
    ></v-text-field>
    <v-checkbox
      v-model="formStore.consent"
      label="Souhlas se zpracováním osobních údajů"
      :rules="[rules.required]"
    ></v-checkbox>

    <div class="flex justify-between">
      <v-btn @click="goBack" color="secondary">Back</v-btn>
      <v-btn @click="clearStep" color="secondary">Clear</v-btn>
      <v-btn @click="sendDataToForm" :disabled="!isFormValid" color="primary"
        >Send</v-btn
      >
    </div>
  </v-form>
</template>
