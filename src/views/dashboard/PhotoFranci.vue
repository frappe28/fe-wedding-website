<script setup>

function openLink() {
  window.open(`https://drive.google.com/drive/folders/1a4QSvDNu2HIO0HEOFS2aem-e9Vm09gPS?usp=sharing`, '_blank');
}
</script>

<template>
  <VCard class="position-relative">
    <VCardText>
      <div class="mb-2">
        <h5 class="text-h5">
          Immortala tutti i momenti della giornata! <span class="text-high-emphasis">✨</span>
        </h5>
        <div class="text-body-1">
          Carica qui le foto e i video per condividerli con gli sposi e tutti gli invitati!
        </div>
      </div>

      <VBtn size="small" @click="openLink">
        Franci&Franci Wedding Photos 📸
      </VBtn>
    </VCardText>
  </VCard>
</template>
