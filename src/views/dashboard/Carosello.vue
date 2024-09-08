<script setup>
//TODO le foto si vedono male su smartphone, bisogna fare qualche modifica al carosello
const items = [
  {
    src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
  },
  {
    src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
  },
  {
    src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
  },
  {
    src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
  },
]

</script>

<template>
  <VCard>
    <VCarousel hide-delimiters cycle show-arrows="hover">
      <VCarouselItem v-for="(item, i) in items" :key="i" :src="item.src" cover> </VCarouselItem>
    </VCarousel>
  </VCard>
</template>
