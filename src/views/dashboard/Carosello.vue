<script setup>
import { BASE_URL } from '@/costants';

//TODO le foto si vedono male su smartphone, bisogna fare qualche modifica al carosello
const items = [
  `${BASE_URL}/photos/photo_1.jpg`,
  `${BASE_URL}/photos/photo_2.jpg`,
  `${BASE_URL}/photos/photo_3.jpg`,
  `${BASE_URL}/photos/photo_4.jpg`,
  `${BASE_URL}/photos/photo_5.jpg`,
  `${BASE_URL}/photos/photo_6.jpg`,
  `${BASE_URL}/photos/photo_7.png`,
  `${BASE_URL}/photos/photo_8.jpg`,
  `${BASE_URL}/photos/photo_9.jpg`,
  `${BASE_URL}/photos/photo_10.jpg`,
  `${BASE_URL}/photos/photo_11.jpg`,
  `${BASE_URL}/photos/photo_12.jpg`,
  `${BASE_URL}/photos/photo_13.jpg`,
  `${BASE_URL}/photos/photo_14.jpg`,
  `${BASE_URL}/photos/photo_15.jpg`,
  `${BASE_URL}/photos/photo_16.jpg`,
  `${BASE_URL}/photos/photo_17.jpg`,
  `${BASE_URL}/photos/photo_18.jpg`,
]

</script>

<template>
  <VCard>
    <VCarousel hide-delimiters cycle show-arrows="hover">
      <VCarouselItem v-for="(item, i) in items" :key="i" :src="item" cover> </VCarouselItem>
    </VCarousel>
  </VCard>
</template>
