<script setup>
import UpgradeToPro from '@/components/UpgradeToPro.vue';
</script>

<template>
  <VApp>
    <div id="loading-bg-http">
      <div id="global-loader-http" style="display: none;">
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
</style>
