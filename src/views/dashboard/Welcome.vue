<script setup>
import { router } from '../../plugins/router';
import store from '../../store/index';

onMounted(() => {
  const route = useRoute();
  console.log(route);
  //const { nome, cognome } = route.query;
  const nome = store.getters.getNome;
  const cognome = store.getters.getCognome;
  console.log({ nome, cognome });
  if (nome == null || nome == "" || cognome == null || cognome == "") {
    router.push({ name: 'welcome', query: {} });
  }

  let userSaluto = "amico";
  if (route.query.username != null && route.query.username.trim() != "") {
    userSaluto = route.query.username.trim();
  } else if (nome != null && nome != "") {
    userSaluto = nome;
  }

  form.value.userSaluto = userSaluto
  form.value.nome = nome
  form.value.cognome = cognome
  form.value.nome_cognome = `${form.value.nome} ${form.value.cognome}`
});
const form = ref({
  nome_cognome: '',
  nome: '',
  cognome: '',
})

async function registrati() {
  console.log("Conferma la tua presenza");
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
          Ciao {{ form.userSaluto }} <span class="text-high-emphasis">🎉</span>
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
