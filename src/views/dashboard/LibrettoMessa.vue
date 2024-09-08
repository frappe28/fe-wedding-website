<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const targetDate = new Date('2025-05-14T00:00:00');
const isCountdownFinished = ref(false);

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
  <VCard title="Pronto per la celebrazione?" class="position-relative">
    <template #subtitle>
      <p v-if="!isCountdownFinished" class="text-body-1 mb-0">
        <span class="d-inline-block font-weight-medium text-high-emphasis">Seguila dal libretto digitale:</span>
      </p>
    </template>
    <VBtn class="d-flex flex-column align-items-center" size="small" @click="copyIbanToClipboard">
      Apri il libretto
    </VBtn>
    <VCardText class="pt-5 pb-10 text-center">
      <VRow justify="center">
        <h3 v-if="!isCountdownFinished" class="d-inline-block text-h3 text-high-emphasis">{{ timeRemainingDays }}</h3>
      </VRow>
      <VRow justify="center">
        <span v-if="!isCountdownFinished" class="d-inline-block text-high-emphasis">{{ timeRemainingMinutes }}</span>
        <span v-else class="d-inline-block text-h3 text-high-emphasis">TODAY IS THE DAY</span>
      </VRow>
    </VCardText>
  </VCard>
</template>

