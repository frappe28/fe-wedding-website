<script setup>
import timeline from '@images/misc/timeline.png';
</script>

<template>
  <VCard class="position-relative mb-7">
    <VImg :src="timeline" class="fransci" max-width="100%" />
  </VCard>
</template>

<style lang="scss">
.v-card .calendar {
  position: absolute;
  inline-size: 5.188rem;
  inset-block-end: 1.25rem;
  inset-inline-end: 1.25rem;
}

// .fransci>.v-responsive__sizer {
//   padding-bottom: 100% !important;
// }
</style>
