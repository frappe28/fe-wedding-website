<script setup>
import link from '@images/misc/external-link.png';
import * as L from 'leaflet';
import "leaflet/dist/leaflet.css";
const chiesaMap = ref(null);

onMounted(() => {
  chiesaMap.value = L.map('mapchiesa').setView([41.11411805728088, 16.8895265448409], 15);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(chiesaMap.value);

  // Aggiungi un marker alla mappa con un link nel popup
  L.marker([41.11411805728088, 16.8895265448409]).addTo(chiesaMap.value)
    .bindPopup(`
      <div>
        <a href="https://maps.app.goo.gl/QFdxucjyQtXxkV387" target="_blank">Chiesa San Francesco D\'Assisi</a>
        <img src="${link}" alt="Icona" style="width:10px; height:10px; vertical-align:middle; margin-left:4px;">
      </div>
    `);
});
</script>

<template>
  <VCard title="💒 Ehi! alle 10.30 devi essere qui:" class="position-relative v-text-wrap-justify">
    <template #subtitle>
      <p class="text-body-1 mb-0 mt- v-text-wrap-justify">
        <span class="d-inline-block font-weight-medium text-high-emphasis v-text-wrap-justify">
          Mi raccomando massima puntualità
        </span>
        <br>
        <span class="v-text-wrap-justify">ma soprattutto assicuratevi che frasanz sia in orario!</span>
      </p>
    </template>

    <VCardItem>
      <div id="mapchiesa" style="height:40vh;"></div>
    </VCardItem>
  </VCard>
</template>
