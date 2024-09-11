<script setup>
import { onBeforeMount } from 'vue';
import { router } from '../../plugins/router';
//import store from '../../store/index';


onBeforeMount(() => { });
onMounted(() => {
  var caricaPagina = true;
  const route = useRoute();
  //console.log(route);
  //const { nome, cognome } = route.query;
  /*const nome = store.getters.getNome;
  const cognome = store.getters.getCognome;
  const username = store.getters.getUsername;
  console.log({ nome, cognome });
  */
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
  }

});
const form = ref({
  nome_cognome: '',
  nome: '',
  cognome: '',
})

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
</script>


<template>
  <VCard class="position-relative">
    <VCardText>
      <div class="mb-2">
        <h5 class="text-h5 v-text-wrap-justify" style="text-transform: capitalize !important;">
          Ciao {{ form?.userSaluto }} <span class="text-high-emphasis">🎉</span>
        </h5>
        <div class="text-body-1">
          <span class="v-text-wrap-justify">E quindi, ci sarai al nostro matrimonio? </span>
        </div>
      </div>
      <VBtn size="small" @click="registrati">
        Conferma la tua presenza 💌
      </VBtn>
    </VCardText>
  </VCard>
</template>
