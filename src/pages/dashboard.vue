<script setup>
import Calendar from '@/views/dashboard/Calendar.vue'
import Carosello from '@/views/dashboard/Carosello.vue'
import Contatti from '@/views/dashboard/Contatti.vue'
import Countdown from '@/views/dashboard/Countdown.vue'
import Iban from '@/views/dashboard/Iban.vue'
import MappaChiesa from '@/views/dashboard/MappaChiesa.vue'
import Welcome from '@/views/dashboard/Welcome.vue'
import logo from '@images/pages/logo3.png'
import { onMounted, onUnmounted, ref } from 'vue'

import { disabilitaEventiDevTools, router } from '../plugins/router'

//le magie di checco
import { DATE_AFTER_XMAS, THE_DATE, THE_DATE_SALA } from '@/costants'
import LibrettoMessa from '@/views/dashboard/LibrettoMessa.vue'
import Tavolo from '@/views/dashboard/Tavolo.vue'
import MappaLocationDopoFesta from '@/views/dashboard/MappaLocationDopoFesta.vue'
import MappaLocationSala from '@/views/dashboard/MappaLocationSala.vue'
import PhotoFranci from '@/views/dashboard/PhotoFranci.vue'
import SaveTheDate from '@/views/dashboard/SaveTheDate.vue'
import Timeline from '@/views/dashboard/Timeline.vue'
import '../assets/styles/frasanz-dash.scss'

//TODO GESTIRE FOCUS ALL'INIZIO DELLA PAGINA (SU IPHONE DI FRANCESCA NON VA)
//GIORNO DEL MATRIMONIO 
const targetDate = new Date(THE_DATE);
const targetDateSala = new Date(THE_DATE_SALA);
const isCountdownFinished = ref(false);
const isCountdownFinishedSala = ref(false);
const timeRemainingDays = ref('');
const timeRemainingMinutes = ref('');

const calculateTimeRemaining = () => {
  const now = new Date();
  const difference = targetDate - now;
  const differenceSala = targetDateSala - now;

  if (difference <= 0) {
    isCountdownFinished.value = true;
    timeRemainingDays.value = '';
    timeRemainingMinutes.value = '';
  }

  if (differenceSala <= 0) {
    isCountdownFinishedSala.value = true;
  }
  return;
};

//DOPO NATALE
const afterXmas = new Date(DATE_AFTER_XMAS);
const isXmasFinished = ref(false);
const calculateAfterXmas = () => {
  const now = new Date();
  const difference = afterXmas - now;

  if (difference <= 0) {
    isXmasFinished.value = true;
    return;
  }
};


let countdownInterval;
var caricaPagina = false;
let invito = 'chiesa';
onBeforeMount(() => {

  const route = useRoute();
  //console.log(route);
  try {
    document.getElementById('nascondi-pagina-dashboard').style.display = 'none';
  } catch (e) { }
  let data = {};
  try {
    if (localStorage.getItem("signInData")) {
      data = JSON.parse(localStorage.getItem("signInData"));
    }
  } catch (e) { }
  const nome = data.nome;
  const cognome = data.cognome;
  const username = data.username;
  invito = data.invito;

  if (nome == null || nome == "" || cognome == null || cognome == "") {
    //router.push({ name: 'welcome', query: {} });
    router.replace({ path: '/welcome' });
  } else {
    caricaPagina = true;
  }
});
onMounted(() => {
  disabilitaEventiDevTools();
  calculateTimeRemaining();
  calculateAfterXmas();
  countdownInterval = setInterval(calculateTimeRemaining, 1000);

  if (caricaPagina) {
    try {
      var primoDiv = document.getElementById('nascondi-pagina-dashboard');
      primoDiv.style.display = 'block';
      setTimeout(() => VueScrollTo.scrollTo(primoDiv, 1000), 1);
      //console.log("display: ", document.getElementById('nascondi-pagina-dashboard').style.display);
    } catch (e) {
      console.log("element not found: nascondi-pagina-dashboard");
    }
  }
});

onUnmounted(() => {
  clearInterval(countdownInterval);
});
</script>

<template>
  <div id="nascondi-pagina-dashboard" style="display: none;">

    <VRow class="dashboard-padding">
      <VCol cols="12" md="4">
        <VImg :src="logo" class="logo" />
      </VCol>

      <VCol cols="12" md="3" v-if="!isXmasFinished">
        <SaveTheDate />
      </VCol>

      <VCol cols="12" :md="!isXmasFinished ? 5 : 8">
        <VRow>
          <VCol cols="12">
            <Welcome />
          </VCol>
          <VCol cols="12">
            <VCard>
              <LibrettoMessa v-if="isCountdownFinished" />
              <Countdown v-else />
            </VCard>
          </VCol>
          <VCol cols="12" v-if="isCountdownFinishedSala && invito === 'sala'">
            <VCard>
              <Tavolo />
            </VCard>
          </VCol>
          <VCol cols="12" v-if="isCountdownFinished">
            <VCard>
              <PhotoFranci />
            </VCard>
          </VCol>
        </VRow>
      </VCol>

      <VCol cols="12">
        <VRow>
          <VCol cols="12" md="4" v-if="isCountdownFinished">
            <Timeline />
            <Calendar />
          </VCol>
          <VCol cols="12" md="4" v-else>
            <Calendar />
            <Carosello />
          </VCol>
          <VCol cols="12" md="8">
            <MappaChiesa />
            <MappaLocationDopoFesta v-if="invito === 'dopofesta'" />
            <MappaLocationSala v-if="invito === 'sala'" />
          </VCol>
        </VRow>
      </VCol>

      <VCol cols="12">
        <Iban />
      </VCol>

      <VCol cols="12">
        <Contatti />
      </VCol>
    </VRow>
  </div>
</template>

<style lang="css">
.dashboard-padding {
  padding: 30px 20px 30px 20px
}
</style>
