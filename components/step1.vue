<script setup lang="ts">
import { ref } from 'vue';
import { useFormStore } from '@/stores/useFormStore';
import { defineProps } from 'vue';

const props = defineProps<{
  goNext: () => void;
}>();

const formStore = useFormStore();
const isFormValid = ref<boolean>(false);

function clearStep(): void {
  formStore.resetFields(['investmentAmount', 'name', 'surname', 'dateOfBirth']);
}

const rules = {
  name: (value: string): true | string =>
    /^[A-Za-z]+$/.test(value) || 'Povolena jsou pouze písmena.',
  dateOfBirth: (value: string): true | string => {
    const datePattern =
      /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2}$/;
    if (!datePattern.test(value)) {
      return 'Datum musí být ve formátu DD.MM.RRRR.';
    }

    const [day, month, year] = value.split('.').map(Number);
    const date = new Date(year, month - 1, day);

    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      return 'Neplatné datum.';
    }

    return true;
  },
};
</script>
<template>
  <v-form v-model="isFormValid" class="space-y-4">
    <v-slider
      v-model="formStore.investmentAmount"
      label="Pravidelná výše investice v CZK"
      :max="100000"
      :min="500"
      thumb-label="always"
    ></v-slider>

    <v-text-field
      v-model="formStore.name"
      label="Jméno"
      :rules="[rules.name]"
    ></v-text-field>
    <v-text-field
      v-model="formStore.surname"
      label="Příjmení"
      :rules="[rules.name]"
    ></v-text-field>

    <v-text-field
      v-model="formStore.dateOfBirth"
      label="Datum narození"
      v-mask="'##.##.####'"
      placeholder="DD.MM.RRRR"
      :rules="[rules.dateOfBirth]"
    ></v-text-field>

    <div class="flex justify-between">
      <v-btn @click="clearStep" color="secondary">Vymazat</v-btn>
      <v-btn @click="goNext" :disabled="!isFormValid" color="primary">
        Další
      </v-btn>
    </div>
  </v-form>
</template>
