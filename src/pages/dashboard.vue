<script setup>
import Calendar from '@/views/dashboard/Calendar.vue'
import Carosello from '@/views/dashboard/Carosello.vue'
import Contatti from '@/views/dashboard/Contatti.vue'
import Countdown from '@/views/dashboard/Countdown.vue'
import Iban from '@/views/dashboard/Iban.vue'
import LibrettoMessa from '@/views/dashboard/LibrettoMessa.vue'
import MappaChiesa from '@/views/dashboard/MappaChiesa.vue'
import Welcome from '@/views/dashboard/Welcome.vue'
import logo from '@images/pages/logo3.png'
import { onMounted, onUnmounted, ref } from 'vue'

import { router } from '../plugins/router'

//le magie di checco
import MappaLocationDopoFesta from '@/views/dashboard/MappaLocationDopoFesta.vue'
import MappaLocationSala from '@/views/dashboard/MappaLocationSala.vue'
import '../assets/styles/frasanz-dash.scss'

//TODO GESTIRE FOCUS ALL'INIZIO DELLA PAGINA (SU IPHONE DI FRANCESCA NON VA)

const targetDate = new Date('2025-05-14T00:00:00');
const isCountdownFinished = ref(false);
const timeRemainingDays = ref('');
const timeRemainingMinutes = ref('');

const calculateTimeRemaining = () => {
  const now = new Date();
  const difference = targetDate - now;

  if (difference <= 0) {
    isCountdownFinished.value = true;
    timeRemainingDays.value = '';
    timeRemainingMinutes.value = '';
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

  console.log('Recupero da LS! - dashboard');
  console.log('all', data);
  console.log('data', { nome, cognome, username, invito });

  if (nome == null || nome == "" || cognome == null || cognome == "") {
    //router.push({ name: 'welcome', query: {} });
    router.replace({ path: '/welcome' });
  } else {
    caricaPagina = true;
  }
});
onMounted(() => {
  calculateTimeRemaining();
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

    <VRow class="match-height">
      <VCol cols="12" md="4">
        <!-- logo -->
        <VImg :src="logo" class="logo" />
      </VCol>

      <VCol cols="12" md="4">
        <VRow>
          <VCol cols="12">
            <Welcome />
          </VCol>
          <VCol cols="12">
            <Countdown />
          </VCol>
        </VRow>
      </VCol>

      <VCol cols="12" md="4">
        <VRow>
          <VCol cols="12">
            <Calendar />
          </VCol>
          <VCol cols="12" v-if="isCountdownFinished">
            <LibrettoMessa />
          </VCol>
        </VRow>
      </VCol>

      <VCol cols="12" md="12">
        <Carosello />
      </VCol>

      <VCol cols="12" md="6">
        <MappaChiesa />
      </VCol>

      <VCol cols="12" md="6" v-if="invito === 'dopofesta'">
        <MappaLocationDopoFesta />
      </VCol>

      <VCol cols="12" md="6" v-if="invito === 'sala'">
        <MappaLocationSala />
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
