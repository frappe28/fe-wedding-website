<script setup>
import logo from '@images/logo.svg?raw'
import authV1MaskDark from '@images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@images/pages/auth-v1-mask-light.png'
import authV1Tree2 from '@images/pages/auth-v1-tree-2.png'
import authV1Tree from '@images/pages/auth-v1-tree.png'
import { useTheme } from 'vuetify'
import { router } from '../plugins/router'
import { signIn } from '../service/backend'
import store from '../store/index'

const form = ref({
  nome: '',
  cognome: '',
})

let loginError = ref(false);

async function login() {
  console.log(form.value);
  if ((form.value.nome !== '' && form.value.cognome !== '') && (form.value.nome !== null && form.value.cognome !== null)) {
    //TODO gestire utente farlocco per evitare chiamate a BE. ES. admin/admin non chiama signin, mock response...
    const response = await signIn({ nome: form.value.nome, cognome: form.value.cognome });
    //console.log("login -> await signIn. Response:");
    console.log(response);
    //console.log("response.data: ", response.data);
    if (response.state) {
      console.log('Sei invitato!');
      store.dispatch('setAll', response.data);

      //console.log('Recupero da store!');
      //console.log(store.getters.getAll); 
      //TODO mandare verso la dashboard
      router.push({ name: 'register', query: { nome: form.value.nome, cognome: form.value.cognome } });
    } else {
      console.log('a chi hai fregato il link?');
      loginError.value = true;
    }
  }
}

const vuetifyTheme = useTheme()

const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})

</script>

<template>
  <!-- eslint-disable vue/no-v-html -->

  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard class="auth-card pa-4 pt-7" max-width="448">
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <div v-html="logo" />
          </div>
        </template>

        <VCardTitle class="font-weight-semibold text-2xl text-uppercase"> Francis' Wedding </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 font-weight-semibold mb-1">Ciao! 👋🏻</h5>
        <p class="mb-0">Prima di entrare nel vivo del nostro matrimonio... vediamo se sei invitato!!!</p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="() => { }">
          <VRow>
            <VCol cols="12">
              <VTextField v-model="form.nome" label="Nome" type="text" />
            </VCol>

            <VCol cols="12">
              <VTextField v-model="form.cognome" label="Cognome" type="text" />
            </VCol>

            <!-- remember me checkbox -->
            <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4" />
            <VCol cols="12">
              <!-- login button -->
              <VBtn block type="submit" :disabled="form.nome === '' || form.cognome === ''" @click="login">
                🍾 Join the celebration! 🍾
              </VBtn>
              <!-- TODO Da rimpicciolire la scritta -->
              <VAlert icon="$warning" closable title="Ehi a chi hai fregato il link?"
                text="Scherziamo, ma se pensi ci sia qualche problema, scrivici o chiamaci!" type="error"
                class="custom-alert" v-if="loginError"></VAlert>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>

    <VImg class="auth-footer-start-tree d-none d-md-block" :src="authV1Tree" :width="250" />

    <VImg :src="authV1Tree2" class="auth-footer-end-tree d-none d-md-block" :width="350" />

    <!-- bg img -->
    <VImg class="auth-footer-mask d-none d-md-block" :src="authThemeMask" />
  </div>
</template>

<style lang="scss">
@use '@core/scss/pages/page-auth.scss';
.custom-alert {
  margin-top: 16px;
  font-size: 0.75rem;
}
</style>
