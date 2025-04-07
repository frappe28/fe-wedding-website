<script setup>
import { BASE_URL } from '@/costants';

//TODO le foto si vedono male su smartphone, bisogna fare qualche modifica al carosello
const items = [
  `${BASE_URL}/photos/0_photo_1.jpg`,
  `${BASE_URL}/photos/0_photo_2.jpg`,
  `${BASE_URL}/photos/0_photo_3.jpg`,
  `${BASE_URL}/photos/0_photo_4.jpg`,
  `${BASE_URL}/photos/0_photo_5.jpg`,
  `${BASE_URL}/photos/0_photo_6.jpg`,
  `${BASE_URL}/photos/0_photo_7.jpg`,
  `${BASE_URL}/photos/0_photo_8.jpg`,
  `${BASE_URL}/photos/0_photo_9.jpg`,
  `${BASE_URL}/photos/0_photo_10.jpg`,
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
    <VCarousel hide-delimiters cycle show-arrows="hover" height="46.5rem">
      <VCarouselItem v-for="(item, i) in items" :key="i" class="carousel-item">
        <img :src="item" class="main-image" />
        <div class="background-container">
          <img :src="item" class="background-image" />
        </div>
      </VCarouselItem>
    </VCarousel>
  </VCard>
</template>

<style scoped>
.carousel-item {
  position: relative;
  height: 500px;
  overflow: hidden;
}

.background-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(20px);
  opacity: 0.5;
}

.main-image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  object-fit: cover;
  z-index: 2;
}
</style>
