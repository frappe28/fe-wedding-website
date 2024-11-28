<script setup>
import authV1MaskDark from '@images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@images/pages/auth-v1-mask-light.png'
import logo from '@images/pages/logo3.png'
import sposini from '@images/pages/sposini.png'
import rings from '@images/pages/wedding-ring.png'
import { useTheme } from 'vuetify'
import { router , disabilitaEventiDevTools } from '../plugins/router'
import { signIn } from '../service/backend'
//import store from '../store/index'

//le magie di checco
import '../assets/styles/frasanz-login.scss'
//todo fare in modo che la build per production renda i file illeggibili/indebuggabili
//TODO GESTIRE FOCUS SUL CAMPO DI INPUT (apertura della tastiera occupa spazio modificando dimensioni dello schermo, non del DOM!!!)

const form = ref({
  nome: '',
  cognome: '',
  anno: null
})

let loginError = ref(false);
let warningOmonimi = ref(false);
let responseSignInOmonimi = null;

onBeforeMount(() => {
  //console.log("onBeforeMount");

  //ripulisco localstorage
  localStorage.clear();
});
onMounted(() => {
  disabilitaEventiDevTools();

  //console.log("onMounted");
  try {
    var primoDiv = document.getElementById('login-page');
    setTimeout(() => VueScrollTo.scrollTo(primoDiv, 1000), 1);
  } catch (e) {
    //ce ne faremo una ragione
  }
});
onUpdated(() => {
  //console.log("onUpdated");
});
onUnmounted(() => {
  //console.log("onUnmounted");
});
onBeforeUpdate(() => {
  //console.log("onBeforeUpdate");
});
onBeforeUnmount(() => {
  //console.log("onBeforeUnmount");
});
onErrorCaptured(() => {
  //console.log("onErrorCaptured");
});
onActivated(() => {
  //console.log("onActivated");
});
onDeactivated(() => {
  //console.log("onDeactivated");
});
onServerPrefetch(() => {
  //console.log("onServerPrefetch");
});

async function login() {

  //console.log(form.value);
  if ((form.value.nome !== null && form.value.cognome !== null)
    && (form.value.nome !== '' && form.value.cognome !== '')) {
    try {
      //reset modale di errore
      loginError.value = false;
      warningOmonimi.value = false;
      // Mostra il loader globale
      document.getElementById('loading-bg-http').style.display = 'flex';
      const params = { nome: form.value.nome, cognome: form.value.cognome }
      if (form.value.anno) {
        params['anno'] = form.value.anno;
      }
      const response = await signIn(params, responseSignInOmonimi);
      responseSignInOmonimi = null;
      console.log('login response', response);
      if (response.state && response.data.id) {
        loginError.value = false;
        warningOmonimi.value = false;

        localStorage.setItem('signInData', JSON.stringify(response.data));
        router.replace({ path: '/dashboard' });
      } else if (response.state === false && response.data != null && response.data.length > 1) {
        //OMONIMI
        loginError.value = false;
        warningOmonimi.value = true;
        form.value.anno = null;
        responseSignInOmonimi = response.data;
      } else {
        //ERRORI
        loginError.value = true
        warningOmonimi.value = false;
        form.value.anno = null;
      }
    } catch (e) {
      console.log("ERR: ", e);
    } finally {
      // Nascondi il loader globale
      document.getElementById('loading-bg-http').style.display = 'none';
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

  <div id="login-page" class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard class="auth-card pa-4 pt-7" max-width="448">
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex adatta-titolo-schermo-piccolo">
            <VImg :src="logo" :width="90" />
          </div>
        </template>
        <VCardTitle class="font-weight-semibold text-2xl text-uppercase wrap-title"> Francis' Wedding </VCardTitle>
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
            <!-- gestione omonimi -->
            <VAlert icon="$warning" closable title="Ehi sembra che ci sia un tuo omonimo!"
              text="Per favore insersci anche la tua data di nascita" type="warning" class="custom-alert"
              v-if="warningOmonimi"></VAlert>
            <VCol cols="12" v-if="warningOmonimi">
              <VTextField v-model="form.anno" label="Anno di nascita" type="text" />
            </VCol>

            <!-- remember me checkbox -->
            <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4" />
            <VCol cols="12">
              <!-- login button -->
              <VBtn block type="submit" :disabled="form.nome === '' || form.cognome === ''" @click="login">
                🍾 Join the celebration! 🍾
              </VBtn>
              <VAlert icon="$warning" closable title="Ehi a chi hai fregato il link?"
                text="Scherziamo, ma se pensi ci sia qualche problema, scrivici o chiamaci!" type="error"
                class="custom-alert" v-if="loginError"></VAlert>

            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>

    <VImg class="auth-footer-end-tree d-none d-md-block" :src="rings" :width="150" />
    <VImg class="auth-footer-start-tree d-none d-md-block" :src="sposini" :width="200" />



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
