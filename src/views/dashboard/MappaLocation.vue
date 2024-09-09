<script setup>
import link from '@images/misc/external-link.png';
import * as L from 'leaflet';
import "leaflet/dist/leaflet.css";

const locationMap = ref(null);

onMounted(() => {
  locationMap.value = L.map('maplocation').setView([40.73341570483446, 16.98762888087289], 10);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(locationMap.value);

  // Aggiungi un marker alla mappa con l'immagine e il link nel popup
  L.marker([40.73341570483446, 16.98762888087289]).addTo(locationMap.value)
    .bindPopup(`
      <div>
        <a href="https://maps.app.goo.gl/VrxD3yGckzizqnEbA" target="_blank">Masseria La Grande Quercia</a>
        <img src="${link}" alt="Icona" style="width:10px; height:10px; vertical-align:middle; margin-left:4px;">
      </div>
    `);
});
</script>

<template>
  <VCard title="🕺🏻💃🏻 Dopo la cerimonia, ci vediamo qui:" class="position-relative v-text-wrap">
    <template #subtitle>
      <p class="text-body-1 mb-0 mt-">
        <span class="d-inline-block font-weight-medium text-high-emphasis" style="text-wrap: wrap;">
          E ricordatevi le scarpe comode...
        </span>
        <br>
        <span style="text-wrap: wrap;">dopo l'abbuffata si continua a ballare!</span>
      </p>
    </template>

    <VCardItem>
      <div id="maplocation" style="height:40vh;"></div>
    </VCardItem>
  </VCard>
</template>
