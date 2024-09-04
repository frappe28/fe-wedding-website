<script setup>
import calendar_may from '@images/misc/calendar_may14.png';
import calendar from '@images/misc/calendar.png';
import { onMounted, onUnmounted, ref } from 'vue';

const targetDate = new Date('2025-05-14T00:00:00'); // Data di destinazione
const timeRemainingDays = ref('');
const timeRemainingMinutes = ref('');

const calculateTimeRemaining = () => {
  const now = new Date();
  const difference = targetDate - now;

  if (difference <= 0) {
    timeRemaining.value = `Today is the day!`;
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
      <p class="text-body-1 mb-0">
        <span class="d-inline-block font-weight-medium text-high-emphasis">Manca sempre meno! 🎯</span>
        <br> ok, la sposa non è in ansia (forse) 🤯
      </p>
    </template>
    <!--TODO sistemare allineamneto -->
    <VCardText class="pt-10">
      <VRow>
        <h3 class="d-inline-block text-h3 text-high-emphasis">{{ timeRemainingDays }}</h3>
      </VRow>
      <VRow>
        <span class="d-inline-block text-high-emphasis">{{ timeRemainingMinutes }}</span>
      </VRow>
    </VCardText>
    <VImg :src="calendar_may" />
  </VCard>
</template>

<style lang="scss">
.v-card .calendar {
  position: absolute;
  inline-size: 5.188rem;
  inset-block-end: 1.25rem;
  inset-inline-end: 1.25rem;
}
</style>
