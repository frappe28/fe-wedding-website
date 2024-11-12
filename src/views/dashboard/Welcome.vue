<script setup>
import { onBeforeMount } from 'vue';
import { router } from '../../plugins/router';


onBeforeMount(() => { });
onMounted(() => {
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
      labelWelcome.value = 'E quindi, ci sarai al nostro matrimonio?';
    else if (data.invito === 'dopofesta')
      labelWelcome.value = 'Scateniamoci insieme! Il dopofesta ti attende!';
    else
      labelWelcome.value = 'Sii con noi nel momento del grande "si"!'; // TODO far capire che può partecipare solo in chiesa
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

async function registrati() {
  //console.log("Conferma la tua presenza");
  if ((form.value.nome !== null && form.value.cognome !== null)
    && (form.value.nome !== '' && form.value.cognome !== '')) {
    try {
      router.push({ name: 'register', query: {} })
    } catch (e) {
      console.log("ERR: ", e);
    }
  }
}

async function registraFiglio(figlioId) {
  if ((form.value.nome !== null && form.value.cognome !== null)
    && (form.value.nome !== '' && form.value.cognome !== '')) {
    try {
      router.push({ name: 'registraFiglio', query: { figlioId } })
    } catch (e) {
      console.log("ERR: ", e);
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
      <VBtn class="mr-2 mt-2" size="small" @click="registrati" v-if="invito === 'sala' || invito === 'dopofesta'">
        {{ labelBtn }}
      </VBtn>

      <!-- Generazione dinamica dei bottoni per ogni figlio -->
      <VBtn v-if="form?.figliId != null && form?.figliId.length > 0" v-for="(figlio, index) in form?.figliId"
        :key="figlio" class="mr-2 mt-2" size="small" @click="registraFiglio(figlio.id)">
        <!-- TODO metti un'icona diversa per i figli -->
        Registra {{ figlio.nome }} {{ getRandomIcon() }}
      </VBtn>
    </VCardText>
  </VCard>
</template>
