<script setup>
import { THE_DATE } from '@/costants';
import { onMounted, onUnmounted, ref } from 'vue';

const targetDate = new Date(THE_DATE);
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

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

  timeRemainingDays.value = `${days} giorni`;
  timeRemainingMinutes.value = `${hours} ore, ${minutes} minuti`;
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
  <VCard title="Save the Date!" class="position-relative">
    <template #subtitle>
      <p v-if="!isCountdownFinished" class="text-body-1 mb-0">
        <span class="d-inline-block font-weight-medium text-high-emphasis v-text-wrap-justify">Manca sempre meno!
          🎯</span>
        <br><span class="v-text-wrap-justify"> ok, la sposa non è in ansia (forse) 🤯 </span>
      </p>
    </template>
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

