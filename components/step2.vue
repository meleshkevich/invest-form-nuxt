<script setup lang="ts">
import { ref } from 'vue';
import { useFormStore } from '@/stores/useFormStore';
import { defineProps } from 'vue';

const props = defineProps<{
  goNext: () => void;
  goBack: () => void;
}>();

const formStore = useFormStore();
const isFormValid = ref<boolean>(false);

function clearStep(): void {
  formStore.resetFields([
    'telephone',
    'email',
    'socialSecurityNumber',
    'identityCardNumber',
  ]);
}

const rules = {
  telephone: (value: string): true | string =>
    /^\+\d{3} \d{3} \d{3} \d{3}$/.test(value) ||
    'Neplatný formát. Použijte +123 123 456 789.',
  email: (value: string): true | string =>
    /.+@.+\..+/.test(value) || 'Neplatná e-mailová adresa.',
  ssn: (value: string): true | string =>
    /^\d{6}\/\d{4}$/.test(value) || 'Neplatný formát. Použijte 123456/1234',
  identityCard: (value: string): true | string =>
    /^\d{9}$/.test(value) || 'Neplatný formát. Použijte 123456789',
};
</script>

<template>
  <v-form v-model="isFormValid" class="space-y-4">
    <v-text-field
      v-model="formStore.telephone"
      label="Telefonní číslo"
      v-mask="'+### ### ### ###'"
      placeholder="+420 123 456 789"
      :rules="[rules.telephone]"
    ></v-text-field>
    <v-text-field
      v-model="formStore.email"
      label="Emailová adresa"
      :rules="[rules.email]"
    ></v-text-field>
    <v-text-field
      v-model="formStore.socialSecurityNumber"
      label="Rodné číslo"
      v-mask="'######/####'"
      placeholder="123456/1234"
      :rules="[rules.ssn]"
    ></v-text-field>
    <v-text-field
      v-model="formStore.identityCardNumber"
      label="Číslo občanského průkazu"
      v-mask="'#########'"
      placeholder="123456789"
      :rules="[rules.identityCard]"
    ></v-text-field>

    <div class="flex justify-between">
      <v-btn @click="goBack" color="secondary">Zpět</v-btn>
      <v-btn @click="clearStep" color="secondary">Vymazat</v-btn>
      <v-btn @click="goNext" :disabled="!isFormValid" color="primary">
        Další
      </v-btn>
    </div>
  </v-form>
</template>
