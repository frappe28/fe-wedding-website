<script setup>
import { THE_DATE } from '@/costants';
import { onBeforeMount } from 'vue';
import { disabilitaEventiDevTools, router } from '../../plugins/router';

const targetDate = new Date(THE_DATE);
const now = new Date();
const difference = targetDate - now;

onBeforeMount(() => {
  const route = useRoute();
  const query = { ...route.query };

  if (query.showError) {
    showError.value = true;

    // Rimuove il parametro 'showError' dal percorso una volta mostrato
    delete query.showError;
    router.replace({ query }); // Aggiorna il percorso senza ricaricare la pagina
  }
});

onMounted(() => {
  disabilitaEventiDevTools();
  var caricaPagina = true;
  const route = useRoute();

  let data = {};
  try {
    if (localStorage.getItem("signInData")) {
      data = JSON.parse(localStorage.getItem("signInData"));
    }
  } catch (e) { }
  const nome = data.nome;
  const cognome = data.cognome;
  const username = data.username;

  /*console.log('Recupero da LS! - dashboard welcome');
  console.log(data);
  console.log({ nome, cognome, username });*/

  if (nome == null || nome == "" || cognome == null || cognome == "") {
    caricaPagina = false;
    //router.push({ name: 'welcome', query: {} });
    router.replace({ path: '/welcome' });
  }
  if (caricaPagina == true) {
    let userSaluto = "amico";
    if (username != null && username != "") {
      userSaluto = username;
    } else if (route.query.username != null && route.query.username.trim() != "") {
      userSaluto = route.query.username.trim();
    } else if (nome != null && nome != "") {
      userSaluto = nome;
    }

    form.value.userSaluto = userSaluto;
    form.value.nome = nome;
    form.value.cognome = cognome;
    form.value.nome_cognome = `${form.value.nome} ${form.value.cognome}`;
    invito.value = data.invito;

    form.value.figliId = data.figliId;

    form.value.conferma = data.conferma;
    labelBtn.value = form.value.conferma === 'si' ? 'Aggiorna i miei dati 💌' : 'Conferma la tua presenza 💌';



    if (data.invito === 'sala')
      labelWelcome.value = difference > 0 ? 'E quindi, ci sarai al nostro matrimonio?' : 'Il gran giorno è finalmente arrivato!';
    else if (data.invito === 'dopofesta')
      labelWelcome.value = 'Scateniamoci insieme! Il dopofesta ti attende!';
    else
      labelWelcome.value = 'Ci farebbe molto piacere se fossi presente alla celebrazione del nostro matrimonio in chiesa e al momento del grande "SI"!';
  }

});

const form = ref({
  nome_cognome: '',
  nome: '',
  cognome: '',
  conferma: '',
  figliId: null
})
const invito = ref();
const labelBtn = ref();
const labelWelcome = ref();
const showError = ref(false);

async function registrati() {
  //console.log("Conferma la tua presenza");
  if ((form.value.nome !== null && form.value.cognome !== null)
    && (form.value.nome !== '' && form.value.cognome !== '')) {
    try {
      router.push({ path: '/register', query: {} })
    } catch (e) {
      console.log("ERR: ", e);
      showError.value = true;

      // Nascondi il pop-up dopo 3 secondi
      setTimeout(() => {
        showError.value = false;
      }, 3000);
    }
  }
}

async function registraFiglio(figlioId) {
  if ((form.value.nome !== null && form.value.cognome !== null)
    && (form.value.nome !== '' && form.value.cognome !== '')) {
    try {
      router.push({ path: '/registraFiglio', query: { figlioId } })
    } catch (e) {
      console.log("ERR: ", e);
      showError.value = true;

      // Nascondi il pop-up dopo 3 secondi
      setTimeout(() => {
        showError.value = false;
      }, 3000);
    }
  }
}

const iconArray = ['🧸', '🦄', '🌼', '🍄', '🏐', '🚀', '🤖', '🧢', '🚗', '🎨', '🌟'];

const getRandomIcon = () => {
  return iconArray[Math.floor(Math.random() * iconArray.length)];
};
</script>


<template>
  <VCard class="position-relative">
    <VCardText>
      <div class="mb-2">
        <h5 class="text-h5 v-text-wrap-justify" style="text-transform: capitalize !important;">
          Ciao {{ form?.userSaluto }} <span class="text-high-emphasis">🎉</span>
        </h5>
        <div class="text-body-1">
          <span class="v-text-wrap-justify">{{ labelWelcome }} </span>
        </div>
      </div>
      <VBtn class="mr-2 mt-2" size="small" @click="registrati"
        v-if="(invito === 'sala' || invito === 'dopofesta') && difference > 0">
        {{ labelBtn }}
      </VBtn>

      <!-- Generazione dinamica dei bottoni per ogni figlio -->
      <VBtn v-if="form?.figliId != null && form?.figliId.length > 0 && difference > 0" v-for="(figlio, index) in form?.figliId"
        :key="figlio" class="mr-2 mt-2" size="small" @click="registraFiglio(figlio.id)">
        Registra {{ figlio.nome }} {{ getRandomIcon() }}
      </VBtn>

      <VSnackbar v-if="showError" v-model="showError" timeout="3000">
        Ops qualcosa è andato storto! 🥲 Contatta gli sposi per capire cosa c'è che non va!
      </VSnackbar>
    </VCardText>
  </VCard>
</template>
