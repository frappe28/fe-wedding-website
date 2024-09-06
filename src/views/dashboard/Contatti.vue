<script setup>
import { ref } from 'vue';
import whastapp from '@images/misc/whastapp-logo.png';
import cell from '@images/misc/phone-call.png';
const cellSposa = '3923923453';
const cellSposo = '3426734350';
const showPopup = ref(false);

const copyCellSposaToClipboard = () => {
  navigator.clipboard.writeText(cellSposa)
    .then(() => {
      console.log('Cellulare sposa copiato negli appunti');
      showPopup.value = true;

      // Nascondi il pop-up dopo 3 secondi
      setTimeout(() => {
        showPopup.value = false;
      }, 3000);
    })
    .catch(err => {
      console.error('Errore durante la copia:', err);
    });
};

const copyCellSposoToClipboard = () => {
  navigator.clipboard.writeText(cellSposo)
    .then(() => {
      console.log('Cellulare sposo copiato negli appunti');
      showPopup.value = true;

      // Nascondi il pop-up dopo 3 secondi
      setTimeout(() => {
        showPopup.value = false;
      }, 3000);
    })
    .catch(err => {
      console.error('Errore durante la copia:', err);
    });
};
</script>

<template>
  <VCard class="position-relative">
    <VCardText>
      <div class="mb-2">
        <h5 class="text-h5">
          Hai bisogno degli sposi? <span class="text-high-emphasis">🤗</span>
        </h5>
        <div class="text-body-1">
          Dovresti già avere i nostri contatti, ma nel caso in cui la tua rubrica abbia misteriosamente cancellato da
          sola i nostri numeri di telefono ti lasciamo qui i nostri recapiti
        </div>
      </div>
      <VRow>
        <VCol class="d-flex align-items-center">
          <a href="https://wa.me/393426734350" target="_blank" class="d-flex align-items-center">
            <VImg :src="whastapp" :width="50" class="me-2"></VImg>
            Sposo 🤵🏻
          </a>
        </VCol>
        <VCol class="d-flex align-items-center">
          <a href="https://wa.me/393923923453" target="_blank" class="d-flex align-items-center">
            <VImg :src="whastapp" :width="50" class="me-2"></VImg>
            Sposa 👰🏻‍♀️
          </a>
        </VCol>
        <VCol class="d-flex align-items-center">
          <VImg :src="cell" :width="2" class="me-2"></VImg>
          Sposa 👰🏻‍♀️
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}

.me-2 {
  margin-right: 0.5rem;
  /* Adjust spacing between image and text */
}

.d-flex {
  display: flex;
}

.align-items-center {
  align-items: center;
}
</style>
