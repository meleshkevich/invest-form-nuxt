<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { useFormStore } from '@/stores/useFormStore';

interface FormData {
  investmentAmount?: number;
  name?: string;
  surname?: string;
  telephone?: string;
  email?: string;
  socialSecurityNumber?: string;
  dateOfBirth?: string;
  identityCardNumber?: string;
  address?: string;
  bankAccountNumber?: string;
  consent?: boolean;
}

const data = ref<FormData>({});
const formStore = useFormStore();
const router = useRouter();

onBeforeMount(() => {
  const route = useRoute();
  const routeData = route.query.data as string | undefined;
  if (routeData) {
    try {
      data.value = JSON.parse(routeData);
    } catch (error) {
      console.error('Failed to parse query data:', error);
    }
  }
});

function handleClick() {
  router.back();
  formStore.clear();
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
            Souhrn odeslaných údajů
          </h2>
          <v-card class="p-4 bg-gray-100 rounded-md">
            <v-row class="gap-4">
              <v-col cols="12" md="8">
                <strong>Pravidelná výše investice v CZK:</strong>
                <div>{{ data.investmentAmount }}</div>
              </v-col>
              <v-col cols="12" md="8">
                <strong>Jméno:</strong>
                <div>{{ data.name }}</div>
              </v-col>
              <v-col cols="12" md="8">
                <strong>Příjmení:</strong>
                <div>{{ data.surname }}</div>
              </v-col>
              <v-col cols="12" md="8">
                <strong>Datum narození:</strong>
                <div>{{ data.dateOfBirth }}</div>
              </v-col>
              <v-col cols="12" md="8">
                <strong>Telefonní číslo:</strong>
                <div>{{ data.telephone }}</div>
              </v-col>
              <v-col cols="12" md="8">
                <strong>Emailová adresa:</strong>
                <div>{{ data.email }}</div>
              </v-col>
              <v-col cols="12" md="8">
                <strong>Rodné číslo:</strong>
                <div>{{ data.socialSecurityNumber }}</div>
              </v-col>

              <v-col cols="12" md="8">
                <strong>Číslo občanského průkazu:</strong>
                <div>{{ data.identityCardNumber }}</div>
              </v-col>
              <v-col cols="12">
                <strong>Adresa trvalého pobytu:</strong>
                <div>{{ data.address }}</div>
              </v-col>
              <v-col cols="12" md="8">
                <strong>Číslo bankovního účtu:</strong>
                <div>{{ data.bankAccountNumber }}</div>
              </v-col>
              <v-col cols="12">
                <strong>Souhlas se zpracováním osobních údajů:</strong>
                <div>{{ data.consent ? 'Ano' : 'Ne' }}</div>
              </v-col>
            </v-row>
            <div class="flex justify-center items-center mb-4">
              <v-btn
                @click="handleClick"
                color="primary"
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                OK, jdeme na hlávní stránku
              </v-btn>
            </div>
          </v-card>
        </div>
      </v-container>
    </v-app>
  </NuxtLayout>
</template>
