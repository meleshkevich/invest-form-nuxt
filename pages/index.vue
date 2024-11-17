<script setup lang="ts">
import { ref, computed } from 'vue';
import step1 from '@/components/step1.vue';
import step2 from '@/components/step2.vue';
import step3 from '@/components/step3.vue';

const steps = [step1, step2, step3] as const;
const currentStep = ref<number>(0);
const currentStepComponent = computed(() => steps[currentStep.value]);
const { sendData, toastMessage, showToast } = useSendData();

function goNext(): void {
  if (currentStep.value < steps.length - 1) currentStep.value++;
}

function goBack(): void {
  if (currentStep.value > 0) currentStep.value--;
}
</script>

<template>
  <NuxtLayout>
    <v-app>
      <v-container class="flex justify-center items-center min-h-screen px-4">
        <div class="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 md:p-8">
          <h2
            class="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6"
          >
            Investování máte v kapse - v mobilu, doma i na cestách.
          </h2>
          <h3
            class="text-xl md:text-2xl font-semibold text-center text-gray-700 mb-4"
          >
            Krok {{ currentStep + 1 }} z 3
          </h3>
          <component
            :is="currentStepComponent"
            :goNext="goNext"
            :goBack="goBack"
          />
          <v-snackbar v-model="showToast" timeout="3000">
            {{ toastMessage }}
          </v-snackbar>
        </div>
      </v-container>
    </v-app>
  </NuxtLayout>
</template>
