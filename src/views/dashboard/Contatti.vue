<script setup>
import gmail from '@images/misc/gmail.png';
import instagram from '@images/misc/instagram.png';
import cell from '@images/misc/phone-call.png';
import telegram from '@images/misc/telegram.png';
import whastapp from '@images/misc/whastapp-logo.png';

</script>

<template>
  <VCard class="position-relative">
    <VCardText>
      <div class="mb-2 text-center">
        <h5 class="text-h5 v-text-wrap-justify">
          Hai bisogno degli sposi? <span class="text-high-emphasis">🤗</span>
        </h5>
        <div class="text-body-1">
          <p class="v-text-wrap-justify">
            Dovresti già avere i nostri contatti,
            ma nel caso in cui la tua rubrica
            abbia misteriosamente cancellato da
            sola i nostri numeri di telefono ti lasciamo qui i nostri recapiti
          </p>
        </div>
      </div>

      <VRow class="justify-center text-center mt-5">
        <VCol cols="12" md="6" class="d-flex flex-column align-items-center">
          <p class="text-high-emphasis">Sposo 🤵🏻</p>
          <div class="d-flex justify-center align-items-center mb-2">
            <a href="tel:+393426734350" target="_blank" class="me-2">
              <VImg :src="cell" :width="40"></VImg>
            </a>
            <a href="https://wa.me/393426734350" target="_blank" class="me-2">
              <VImg :src="whastapp" :width="40"></VImg>
            </a>
            <a href="https://t.me/sanzo95" target="_blank" class="me-2">
              <VImg :src="telegram" :width="40"></VImg>
            </a>
            <a href="mailto:sanzone95@gmail.com,francescadeperte@gmail.com" target="_blank" class="me-2">
              <VImg :src="gmail" :width="40"></VImg>
            </a>
            <a href="https://www.instagram.com/frasanz?igsh=MWl1dTY3dnBnZDE0eA==" target="_blank" class="me-2">
              <VImg :src="instagram" :width="40"></VImg>
            </a>
          </div>
        </VCol>

        <VCol cols="12" md="6" class="d-flex flex-column align-items-center">
          <p class="text-high-emphasis">Sposa 👰🏻‍♀️</p>
          <div class="d-flex justify-center align-items-center mb-2">
            <a href="tel:+393923923453" target="_blank" class="me-2">
              <VImg :src="cell" :width="40"></VImg>
            </a>
            <a href="https://wa.me/393923923453" target="_blank" class="me-2">
              <VImg :src="whastapp" :width="40"></VImg>
            </a>
            <a href="https://t.me/frappee" target="_blank" class="me-2">
              <VImg :src="telegram" :width="40"></VImg>
            </a>
            <a href="mailto:sanzone95@gmail.com,francescadeperte@gmail.com" target="_blank" class="me-2">
              <VImg :src="gmail" :width="40"></VImg>
            </a>
            <a href="https://www.instagram.com/fradeps?igsh=dHhvazZ0MXcyMXJp" target="_blank" class="me-2">
              <VImg :src="instagram" :width="40"></VImg>
            </a>
          </div>
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
.text-center {
  text-align: center;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.me-2 {
  margin-right: 0.5rem;
}

.d-flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.align-items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}
</style>
