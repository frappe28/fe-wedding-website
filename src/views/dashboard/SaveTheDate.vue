<script setup>
import { BASE_URL } from '@/costants';

const videoSrc = `${BASE_URL}/photos/SaveTheDate.mov`;
</script>

<template>
  <VCard>
    <VResponsive aspect-ratio="9/16">
      <video autoplay muted loop controls :src="videoSrc" class="v-responsive__content"
        style="width: 100%; height: 100%; object-fit: cover;">
        Il tuo browser non supporta il video.
      </video>
    </VResponsive>
  </VCard>
</template>
