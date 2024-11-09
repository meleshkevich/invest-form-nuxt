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

    <!-- Date of Birth Date Picker -->
    <div>
      <div class="mb-6">
        Active picker: <code>{{ activePicker || 'null' }}</code>
      </div>
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Birthday date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          :active-picker.sync="activePicker"
          :max="
            new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
              .toISOString()
              .substring(0, 10)
          "
          min="1950-01-01"
          @change="save"
        ></v-date-picker>
      </v-menu>
    </div>

    <div class="flex justify-between">
      <v-btn @click="clearStep" color="secondary">Vymazat</v-btn>
      <v-btn @click="goNext" :disabled="!isFormValid" color="primary">
        Další
      </v-btn>
    </div>
  </v-form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useFormStore } from '@/stores/useFormStore';
import { defineProps } from 'vue';

const props = defineProps<{
  goNext: () => void;
}>();

// Form store and validation setup
const formStore = useFormStore();
const isFormValid = ref<boolean>(false);
const date = ref<string | null>(null);
const activePicker = ref<string | null>(null);
const menu = ref<boolean>(false);

// Watcher for menu state to trigger the active picker when menu is opened
watch(menu, (val) => {
  if (val) {
    setTimeout(() => {
      activePicker.value = 'YEAR';
    });
  }
});

// Method to save the selected date
function save(date: string): void {
  menu.value && (menu.value = false); // Close the menu after saving
  formStore.dateOfBirth = date; // Optionally store date in form store
}

// Reset fields
function clearStep(): void {
  formStore.resetFields(['investmentAmount', 'name', 'surname', 'dateOfBirth']);
}

// Validation rules
const rules = {
  name: (value: string): true | string =>
    /^[A-Za-z]+$/.test(value) || 'Povolena jsou pouze písmena.',
  dateOfBirth: (value: string): true | string =>
    !!value || 'Datum narození je povinné.',
};
</script>
