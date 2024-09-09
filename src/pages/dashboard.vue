<script setup>
import Calendar from '@/views/dashboard/Calendar.vue'
import Carosello from '@/views/dashboard/Carosello.vue'
import Contatti from '@/views/dashboard/Contatti.vue'
import Countdown from '@/views/dashboard/Countdown.vue'
import Iban from '@/views/dashboard/Iban.vue'
import LibrettoMessa from '@/views/dashboard/LibrettoMessa.vue'
import MappaChiesa from '@/views/dashboard/MappaChiesa.vue'
import MappaLocation from '@/views/dashboard/MappaLocation.vue'
import Welcome from '@/views/dashboard/Welcome.vue'
import logo from '@images/pages/logo3.png'
import { onMounted, onUnmounted, ref } from 'vue'

//le magie di checco
import '../assets/styles/frasanz-dash.scss'

const targetDate = new Date('2025-05-14T00:00:00');
const isCountdownFinished = ref(false);
const timeRemainingDays = ref('');
const timeRemainingMinutes = ref('');

const calculateTimeRemaining = () => {
  const now = new Date();
  const difference = targetDate - now;

  if (difference <= 0) {
    isCountdownFinished.value = true;
    timeRemainingDays.value = '';
    timeRemainingMinutes.value = '';
    return;
  }
};

let countdownInterval;

onMounted(() => {
  calculateTimeRemaining();
  countdownInterval = setInterval(calculateTimeRemaining, 1000);
});

onUnmounted(() => {
  clearInterval(countdownInterval);
});
</script>

<template>
  <VRow class="match-height">
    <VCol cols="12" md="4">
      <!-- logo -->
      <VImg :src="logo" class="logo" />
    </VCol>

    <VCol cols="12" md="4">
      <VRow>
        <VCol cols="12">
          <Welcome />
        </VCol>
        <VCol cols="12">
          <Countdown />
        </VCol>
      </VRow>
    </VCol>

    <VCol cols="12" md="4">
      <VRow>
        <VCol cols="12">
          <Calendar />
        </VCol>
        <VCol cols="12" v-if="isCountdownFinished">
          <LibrettoMessa />
        </VCol>
      </VRow>
    </VCol>

    <VCol cols="12" md="12">
      <Carosello />
    </VCol>

    <VCol cols="12" md="6">
      <MappaChiesa />
    </VCol>

    <VCol cols="12" md="6">
      <MappaLocation />
    </VCol>

    <VCol cols="12">
      <Iban />
    </VCol>

    <VCol cols="12">
      <Contatti />
    </VCol>

  </VRow>
</template>
