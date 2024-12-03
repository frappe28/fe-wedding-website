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
import { THE_DATE } from '@/costants'
import LibrettoMessa from '@/views/dashboard/LibrettoMessa.vue'
import MappaLocationDopoFesta from '@/views/dashboard/MappaLocationDopoFesta.vue'
import MappaLocationSala from '@/views/dashboard/MappaLocationSala.vue'
import '../assets/styles/frasanz-dash.scss'

//TODO GESTIRE FOCUS ALL'INIZIO DELLA PAGINA (SU IPHONE DI FRANCESCA NON VA)

const targetDate = new Date(THE_DATE);
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
        <VRow>

        </VRow>
      </VCol>

      <VCol cols="12" md="4">
        <!-- logo -->
        <VImg :src="logo" class="logo" />
      </VCol>

      <VCol cols="12" md="4">
        <VRow>

        </VRow>
      </VCol>

      <VCol cols="12" md="4">
        <VRow>
          <VCol cols="12">
            <Welcome />
          </VCol>
          <VCol cols="12">
            <Countdown />
          </VCol>
          <VCol cols="12">
            <LibrettoMessa v-if="isCountdownFinished" />
          </VCol>
        </VRow>
      </VCol>

      <VCol cols="12" md="8">
        <VRow>
          <VCol cols="12" md="5">
            <Carosello />
          </VCol>
          <VCol cols="12" md="7">
            <Calendar />
          </VCol>
        </VRow>
      </VCol>

      <VCol cols="12">
        <VRow>
          <VCol cols="12" md="6">
            <MappaChiesa />
          </VCol>
          <VCol cols="12" md="6" v-if="invito === 'dopofesta'">
            <MappaLocationDopoFesta />
          </VCol>

          <VCol cols="12" md="6" v-if="invito === 'sala'">
            <MappaLocationSala />
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
