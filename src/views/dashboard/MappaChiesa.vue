<script setup>
import targetIcon from '@images/misc/aim.png';
import link from '@images/misc/external-link.png';
import * as L from 'leaflet';
import "leaflet/dist/leaflet.css";

// Variabili reattive
const chiesaMap = ref(null);
const markerCoords = [41.11411805728088, 16.8895265448409]; // Coordinate del marker

onMounted(() => {
  // Inizializza la mappa
  chiesaMap.value = L.map('mapchiesa').setView(markerCoords, 15);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(chiesaMap.value);

  // Aggiungi un marker con un popup
  L.marker(markerCoords).addTo(chiesaMap.value)
    .bindPopup(`
      <div>
        <a href="https://maps.app.goo.gl/QFdxucjyQtXxkV387" target="_blank">Chiesa San Francesco D\'Assisi</a>
        <img src="${link}" alt="Icona" style="width:10px; height:10px; vertical-align:middle; margin-left:4px;">
      </div>
    `);

  // Forza il rendering iniziale della mappa
  setTimeout(() => {
    chiesaMap.value.invalidateSize();
  }, 500);

  // Aggiungi un controllo personalizzato per il pulsante "Ricentra"
  const recenterControl = L.Control.extend({
    options: {
      position: 'topleft', // Posiziona accanto ai controlli +/- in alto a sinistra
    },
    onAdd: function () {
      const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');

      // Stile del pulsante
      container.style.backgroundColor = 'white';
      container.style.width = '34px';
      container.style.height = '34px';
      container.style.cursor = 'pointer';
      container.style.display = 'flex';
      container.style.alignItems = 'center';
      container.style.justifyContent = 'center';

      // Aggiungi l'immagine come icona
      const icon = L.DomUtil.create('img', 'custom-icon', container);
      icon.src = targetIcon;
      icon.style.width = '20px';
      icon.style.height = '20px';

      // Azione al click
      container.onclick = () => {
        chiesaMap.value.setView(markerCoords, 15); // Ricentra sulla posizione del marker
      };

      return container;
    }
  });

  // Aggiungi il controllo alla mappa
  chiesaMap.value.addControl(new recenterControl());
});
</script>

<template>
  <VCard title="💒 Ehi! Alle 10.30 devi essere qui:" class="position-relative v-text-wrap-justify">
    <template #subtitle>
      <p class="text-body-1 mb-0 mt- v-text-wrap-justify">
        <span class="d-inline-block font-weight-medium text-high-emphasis v-text-wrap-justify">
          Mi raccomando massima puntualità.
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
