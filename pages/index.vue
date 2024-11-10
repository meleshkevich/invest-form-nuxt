<script setup lang="ts">
import { ref, computed } from 'vue';
import Step1 from '@/components/Step1.vue';
import Step2 from '@/components/Step2.vue';
import Step3 from '@/components/Step3.vue';

const steps = [Step1, Step2, Step3] as const; // Use 'as const' to preserve array element types.
const currentStep = ref<number>(0);
const currentStepComponent = computed(() => steps[currentStep.value]);

function goNext(): void {
  if (currentStep.value < steps.length - 1) currentStep.value++;
}

function goBack(): void {
  if (currentStep.value > 0) currentStep.value--;
}

function clearForm(): void {
  // Placeholder for clear form logic. Implement as necessary.
  console.log('Clear form logic here.');
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
            Step {{ currentStep + 1 }} z 3
          </h3>
          <component
            :is="currentStepComponent"
            :goNext="goNext"
            :goBack="goBack"
            :clearForm="clearForm"
          />
        </div>
      </v-container>
    </v-app>
  </NuxtLayout>
</template>
