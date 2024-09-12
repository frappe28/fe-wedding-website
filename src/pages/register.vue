<script setup>
import authV1MaskDark from '@images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@images/pages/auth-v1-mask-light.png'
import sposini from '@images/pages/sposini.png'
import wrings from '@images/pages/wedding-ring.png'
import rings from '@images/rings.svg?raw'
import { useRoute } from 'vue-router'
import { useTheme } from 'vuetify'
import { confermaPresenza } from '../service/backend'


import { router } from '../plugins/router'
//import store from '../store/index'
var caricaPagina = false;
onBeforeMount(() => {

  const route = useRoute();
  //console.log(route);
  try {
    document.getElementById('nascondi-pagina-register').style.display = 'none';
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
  /*console.log('Recupero da LS! - dashboard register');
  console.log(data);
  console.log({ nome, cognome });*/

  if (nome == null || nome == "" || cognome == null || cognome == "") {
    //router.push({ name: 'welcome', query: {} });
    router.replace({ path: '/welcome' });  } else {
    caricaPagina = true;
  }

  if (caricaPagina) {
    form.value.nome = nome;
    form.value.cognome = cognome;
    form.value.username = username;
    form.value.nome_cognome = `${form.value.nome} ${form.value.cognome}`;
    if (data.intolleranze != null) {
      form.value.intolleranze = data.intolleranze;
    }
    if (form.value.intolleranze == true && data.intolleranze_list != null) {
      form.value.intolleranze_list = data.intolleranze_list;
    } else {
      form.value.intolleranze_list = "";
    }
    if (data.email != null) {
      form.value.email = data.email;
    }
    if (data.telefono != null) {
      form.value.telefono = data.telefono;
    }
    if (data.forestiero != null) {
      form.value.forestiero = data.forestiero;
    }
  }
});
onMounted(() => {
  if (caricaPagina) {
    try {
      var primoDiv = document.getElementById('nascondi-pagina-register');
      primoDiv.style.display = 'block';
      setTimeout(() => VueScrollTo.scrollTo(primoDiv, 1000), 1);
      //console.log("display: ", document.getElementById('nascondi-pagina-register').style.display);
    } catch (e) {
      console.log("element not found: nascondi-pagina-register");
    }
  }
});

const form = ref({
  nome_cognome: '',
  nome: '',
  cognome: '',
  username: '',
  intolleranze: false,
  intolleranze_list: '',
  email: '',
  telefono: '',
  forestiero: false
})

async function submit() {
  let emailValida = true;
  if (form.value.email != null && form.value.email.trim() != "" && !isValidEmail()) {
    emailValida = false;
  }
  //console.log(JSON.stringify(form.value));

  if (!emailValida) {
    console.debug("email non valida");
    //non serve introdurre nuova logica, cliccando fuori dal campo uscirà l'errore sulla mail.
  } else {
    if (form.value.intolleranze == false || 
        form.value.intolleranze_list == null || form.value.intolleranze_list == '' ) {
      form.value.intolleranze_list = "";
    }
    try {
      document.getElementById('global-loader-http').style.display = 'block';

      const response = await confermaPresenza(form.value);
      //console.log(response);

      localStorage.setItem('signInData', JSON.stringify(form.value));
      /*console.log('Recupero da LS! - register');
      console.log(localStorage.getItem('signInData'));*/
      //router.push({ name: 'dashboard', query: { /*username: form.value.username*/ } })
      router.back();
    } catch (e) {
      console.log("Register ERR: ", e);
    } finally {
      // Nascondi il loader globale
      document.getElementById('global-loader-http').style.display = 'none';
    }
  }
}
var erroreMail = ref(""); // Usa 'ref' per renderlo reattivo

async function onfocus() {
  erroreMail.value = ""; // Nessun errore
}
async function onblur() {
  let emailValida = true;

  // Verifica se l'email è presente e valida
  if (form.value.email && form.value.email.trim() !== "" && !isValidEmail()) {
    emailValida = false;
  }

  // Se l'email non è valida, mostra il messaggio di errore
  if (!emailValida) {
    erroreMail.value = "indirizzo email inserito non valido.";
  } else {
    erroreMail.value = ""; // Nessun errore
  }
}
const vuetifyTheme = useTheme()

const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})

function isValidEmail() {
  return /^[^@]+@\w+(\.\w+)+\w$/.test(form.value.email.trim());
}
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <div id="nascondi-pagina-register" style="display: none;">
    <div class="auth-wrapper d-flex align-center justify-center pa-4">
      <VCard class="auth-card pa-4 pt-7" max-width="448">
        <VCardItem class="justify-center">
          <template #prepend>
            <div class="d-flex">
              <div v-html="rings" />
            </div>
          </template>

          <VCardTitle class="font-weight-semibold text-2xl text-uppercase text-wrap">
            join the celebration
          </VCardTitle>
        </VCardItem>

        <VCardText class="pt-2">
          <h5 class="text-h5 font-weight-semibold mb-1 text-wrap">
            Wedding starts here! 🐼 💒 🐻
          </h5>
          <p class="mb-0">
            Ci sarai?
          </p>
        </VCardText>

        <VCardText>
          <VForm @submit.prevent="() => { }" autocomplete="off">
            <VRow>
              <!-- Nome -->
              <VCol cols=" 12">
                <VTextField v-model="form.nome_cognome" disabled />
              </VCol>

              <!-- PASSWORD HIDDEN - inserita per prevenire suggerimenti password su username -->
              <!-- rimossa perché iniziava a suggerire username anche da browser oltre che cellulare
              <VCol cols="12" style="display: none;">
                <VTextField v-model="form.psw" placeholder="Password" id="psw" type="password" style="display: none;"
                  autocomplete="false" />
              </VCol>-->

              <!-- Username -->
              <!-- rinominato in nickname per prevenire AUTOCOMPLETAMENTO -->
              <VCol cols="12">
                <VTextField v-model="form.username" placeholder="Nickname" id="niclname" type="text"
                  autocomplete="false" />
              </VCol>

              <!-- Intolleranze -->
              <VCol cols="12">
                <div class="d-flex align-center mt-1 mb-4">
                  <VLabel for="intolleranze" style="opacity: 1;">
                    <span class="me-1" style="text-wrap: wrap;">Sei intollerante/allergico a qualcosa? </span>
                  </VLabel>
                  <VCheckbox id="intolleranze" v-model="form.intolleranze" inline />
                </div>
                <VTextField v-if="form.intolleranze" v-model="form.intolleranze_list" id="intolleranze_text"
                  placeholder="Intolleranze/Allergie" type="text"
                  hint="Si intendono le intolleranze/allergie alimentari: sappiamo tutti che solo la sposa sopporta frasanz" />
              </VCol>


              <!-- forestiero -->
              <VCol cols="12">
                <div class="d-flex align-center mt-1 mb-4">
                  <VLabel for="forestiero" style="opacity: 1;">
                    <span class="me-1">Sei un forestiero?</span>
                  </VLabel>
                  <VCheckbox id="forestiero" v-model="form.forestiero" inline />
                </div>

              </VCol>

              <VCardText class="pt-2">
                <h5 class="text-h5 font-weight-semibold mb-1" style="text-wrap: wrap;">
                  Vuoi rimanere aggiornato sul nostro matrimonio? 💌
                </h5>
              </VCardText>

              <!-- telefono -->
              <VCol cols="12">
                <VTextField v-model="form.telefono" placeholder="Telefono" id="tel" type="tel"
                  hint="si, probabilmente, anzi quasi sicuramente, abbiamo già questi dati, ma se ci conosci sai che siamo molto pigri e non ci andava di ricopiarli!" />
              </VCol>

              <!-- TODO al click la tastiera non deve coprire il campo di input ma spostare il focus su di esso (deve essere visibile cosa si sta scrivendo) -->
              <!-- email -->
              <VCol cols="12">
                <VTextField v-model="form.email" placeholder="Email" type="email" id="email_reg" @blur="onblur"
                  @focus="onfocus" :error-messages="erroreMail" />
              </VCol>

              <VCol cols="12">
                <VBtn block type="submit" @click="submit">
                  Conferma tua presenza!
                </VBtn>
              </VCol>

            </VRow>
          </VForm>
        </VCardText>
      </VCard>

      <VImg class="auth-footer-start-tree d-none d-md-block" :src="sposini" :width="200" />

      <VImg :src="wrings" class="auth-footer-end-tree d-none d-md-block" :width="150" />

      <!-- bg img -->
      <VImg class="auth-footer-mask d-none d-md-block" :src="authThemeMask" />
    </div>
  </div>
</template>

<style lang="scss">
@use "@core/scss/pages/page-auth.scss";

.text-wrap {
  word-wrap: break-word;
  /* Consente al testo di andare a capo a livello di parola */
  //word-break: break-all; /* Consente al testo di andare a capo a livello di carattere */
}
</style>
