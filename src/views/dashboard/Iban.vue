<script setup>
import { ref } from 'vue';

const iban = 'IT32D0100504001000000003260 - Intestato a: Francesca Deperte';
const showPopup = ref(false);

const copyIbanToClipboard = () => {
  navigator.clipboard.writeText(iban)
    .then(() => {
      //console.log('IBAN copiato negli appunti!');
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
          <span class="v-text-wrap-justify">Per noi è molto importante che tu ci sia! </span>
          <span class="text-high-emphasis">💚</span>
        </h5>
        <div class="text-body-1">
          <p class="v-text-wrap-justify">
            Il pensiero più bello che tu possa farci è essere con noi nel nostro grande giorno. <br>
            Ma se gradisci farci un regalo, puoi aiutarci a realizzare il nostro sogno di un’avventura in giro per
            il mondo 🌈
          </p>
        </div>
      </div>

      <VBtn class="d-flex flex-column align-items-center" size="small" @click="copyIbanToClipboard">
        Copia il nostro iban 🎁
      </VBtn>

      <!-- Mostra il pop-up solo quando showPopup è true -->
      <VSnackbar v-if="showPopup" v-model="showPopup" timeout="3000">
        IBAN copiato negli appunti! ✅
      </VSnackbar>
    </VCardText>
  </VCard>
</template>
