<script setup>
import UpgradeToPro from '@/components/UpgradeToPro.vue';
</script>

<template>
  <VApp>
    <div id="loading-bg-http" style="display: none;">
      <div id="global-loader-http">
        <div id="loading-overlay" style="pointer-events: none;"></div>
        <div class="loading-http">
          <div class="effect-1 effects"></div>
          <div class="effect-2 effects"></div>
          <div class="effect-3 effects"></div>
        </div>
      </div>
    </div>
    <RouterView />
    <UpgradeToPro />
  </VApp>
</template>


<style lang="css">
.v-alert-title {
  font-size: 0.9rem !important;
}

body .v-alert .v-alert__content {
  font-size: 0.75rem !important;
}
/* Sfondo opacizzato sopra il DOM */
#loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.15);
  /* Poco opacizzato per trasparenza */
  backdrop-filter: blur(3px);
  /* Leggero effetto sfocato */
  z-index: 9998;
  /* Sopra il contenuto DOM */
  pointer-events: none;
  /* Non interferisce con i clic */
}
</style>
