<script setup>
import { BASE_URL } from '@/costants';

function openLink() {
  window.open(`${BASE_URL}/docs/libretto.pdf`, '_blank');
}
</script>

<template>
  <VCard class="position-relative">
    <VCardText>
      <div class="mb-2">
        <h5 class="text-h5">
          Pronto per la celebrazione? <span class="text-high-emphasis">🔔</span>
        </h5>
        <div class="text-body-1">
          Seguila dal libretto digitale!
        </div>
      </div>

      <VBtn size="small" @click="openLink">
        Apri il libretto 📖
      </VBtn>
    </VCardText>
  </VCard>
</template>

