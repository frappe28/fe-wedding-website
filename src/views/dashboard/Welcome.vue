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
  form.value.nome = nome ?? 'amico'
  form.value.cognome = cognome
  form.value.nome_cognome = `${form.value.nome} ${form.value.cognome}`
});
const form = ref({
  nome_cognome: '',
  nome: '',
  cognome: '',
})
</script>


<template>
  <VCard class="position-relative">
    <VCardText>
      <div class="mb-2">
        <h5 class="text-h5 v-text-wrap-justify">
          Ciao {{ form.nome }} <span class="text-high-emphasis">🎉</span>
        </h5>
        <div class="text-body-1">
          <span class="v-text-wrap-justify">E quindi ci sarai al nostro matrimonio? </span>
        </div>
      </div>
      <VBtn size="small">
        Conferma la tua presenza 💌
      </VBtn>
    </VCardText>
  </VCard>
</template>
