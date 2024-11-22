<script setup>
import calendar_may from '@images/misc/calendar_may14.png';
</script>

<template>
  <VCard class="position-relative">
    <VImg :src="calendar_may" class="fransci" />
  </VCard>
</template>

<style lang="scss">
.v-card .calendar {
  position: absolute;
  inline-size: 5.188rem;
  inset-block-end: 1.25rem;
  inset-inline-end: 1.25rem;
}
.fransci>.v-responsive__sizer {
  padding-bottom: 100% !important;
}
</style>
