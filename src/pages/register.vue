<script setup>
import authV1MaskDark from '@images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@images/pages/auth-v1-mask-light.png'
import sposini from '@images/pages/sposini.png'
import wrings from '@images/pages/wedding-ring.png'
import rings from '@images/rings.svg?raw'
import { useRoute } from 'vue-router'
import { useTheme } from 'vuetify'
import { router , disabilitaEventiDevTools } from '../plugins/router'
import { confermaPresenza } from '../service/backend'


//le magie di checco
import '../assets/styles/frasanz-register.scss'

var caricaPagina = false;
onBeforeMount(() => {
  const route = useRoute();
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
  const invito = data.invito;

  if (nome == null || nome == "" || cognome == null || cognome == "") {
    router.replace({ path: '/welcome' });
  } else {
    caricaPagina = true;
  }

  if (caricaPagina) {
    form.value.nome = nome;
    form.value.cognome = cognome;
    form.value.username = username;
    form.value.invito = invito;
    form.value.nome_cognome = `${form.value.nome} ${form.value.cognome}`;
    if (data.intolleranze != null) {
      form.value.intolleranze = data.intolleranze;
    }
    if (form.value.intolleranze == true && data.intolleranze_list != null) {
      form.value.intolleranze_list = data.intolleranze_list;
      data.intolleranze_list.forEach(intolleranza => {
        if (!intolleranzeDisponibili.includes(intolleranza)) {
          form.value.altroAttivo = true;
          form.value.altraIntolleranza += intolleranza;
          const index = form.value.intolleranze_list.indexOf(form.value.altraIntolleranza);
          if (index >= 0) {
            form.value.intolleranze_list.splice(index, 1);
          }
        }
      });
    } else {
      form.value.intolleranze_list = [];
    }
    if (data.email != null) {
      form.value.email = data.email;
    }
    if (data.telefono != null) {
      form.value.telefono = data.telefono;
    }
    // if (data.forestiero != null) {
    //   form.value.forestiero = data.forestiero;
    // }
  }
});

onMounted(() => {
  disabilitaEventiDevTools();
  if (caricaPagina) {
    try {
      var primoDiv = document.getElementById('nascondi-pagina-register');
      primoDiv.style.display = 'block';
      setTimeout(() => VueScrollTo.scrollTo(primoDiv, 1000), 1);
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
  intolleranze_list: [],
  email: '',
  telefono: '',
  invito: '',
  //forestiero: false,
  altroAttivo: false,
  altraIntolleranza: '',
  conferma: 'no'
});

async function submit(conferma) {
  let emailValida = true;
  if (form.value.email != null && form.value.email.trim() != "" && !isValidEmail()) {
    emailValida = false;
  }

  if (!emailValida) {
    console.debug("email non valida");
  } else {
    if (form.value.intolleranze == false ||
      form.value.intolleranze_list == null || form.value.intolleranze_list.length === 0) {
      form.value.intolleranze_list = [];
    }
    if (form.value.intolleranze && form.value.altroAttivo === true && form.value.altraIntolleranza != null && form.value.altraIntolleranza != '') {
      form.value.intolleranze_list.push(form.value.altraIntolleranza);
    }
    try {
      document.getElementById('loading-bg-http').style.display = 'flex';
      form.value.conferma = conferma ? 'si' : 'no';
      await confermaPresenza(form.value);

      let dataLS = {};
      try {
        if (localStorage.getItem("signInData")) {
          dataLS = JSON.parse(localStorage.getItem("signInData"));
          dataLS.intolleranze = form.value.intolleranze;
          dataLS.intolleranze_list = form.value.intolleranze_list;
          dataLS.email = form.value.email;
          dataLS.telefono = form.value.telefono;
          dataLS.username = form.value.username;
          dataLS.conferma = form.value.conferma;

          localStorage.setItem('signInData', JSON.stringify(dataLS));
        }
      } catch (e) { }
      router.back();
    } catch (e) {
      console.log("Register ERR: ", e);
    } finally {
      document.getElementById('loading-bg-http').style.display = 'none';
    }
  }
}

var erroreMail = ref("");

async function onfocus() {
  erroreMail.value = "";
}

async function onblur() {
  let emailValida = true;
  if (form.value.email && form.value.email.trim() !== "" && !isValidEmail()) {
    emailValida = false;
  }

  if (!emailValida) {
    erroreMail.value = "indirizzo email inserito non valido.";
  } else {
    erroreMail.value = "";
  }
}

const vuetifyTheme = useTheme();
const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark;
});

function isValidEmail() {
  return /^[^@]+@\w+(\.\w+)+\w$/.test(form.value.email.trim());
}

const intolleranzeDisponibili = ['Glutine', 'Lattosio', 'Nichel', 'Frutta secca', 'Crostacei', 'Uova', 'Altro'];


function toggleIntolleranza(intolleranza) {
  if (intolleranza === 'Altro') {
    form.value.altroAttivo = !form.value.altroAttivo; // Toggle il campo "Altro"
    if (!form.value.altroAttivo) {
      form.value.altraIntolleranza = ''; // Se si deseleziona, rimuove il valore
    }
  } else {
    const index = form.value.intolleranze_list.indexOf(intolleranza);
    if (index === -1) {
      form.value.intolleranze_list.push(intolleranza);
    } else {
      form.value.intolleranze_list.splice(index, 1);
    }
  }
}

function chipClass(intolleranza) {
  if (intolleranza === 'Altro') {
    return form.value.altroAttivo ? 'chip-selected' : '';
  }
  return form.value.intolleranze_list.includes(intolleranza) ? 'chip-selected' : '';
}
</script>

<template>
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
              <VCol cols="12">
                <VTextField v-model="form.nome_cognome" disabled />
              </VCol>

              <!-- Username -->
              <!-- rinominato in nickname per prevenire AUTOCOMPLETAMENTO -->
              <VCol cols="12">
                <VTextField v-model="form.username" placeholder="Nickname" id="nickname" type="text"
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
                <div v-if="form.intolleranze" class="text-center">
                  <h4>Si intendono le intolleranze/allergie alimentari: sappiamo tutti che solo la sposa
                    sopporta frasanz</h4>
                  <VChip v-for="intolleranza in intolleranzeDisponibili" :key="intolleranza"
                    :class="chipClass(intolleranza)" variant="outlined" class="mr-2 mb-2 "
                    @click="toggleIntolleranza(intolleranza)">
                    {{ intolleranza }}
                  </VChip>

                  <!-- Campo per "Altro" -->
                  <VTextField v-if="form?.altroAttivo" v-model="form.altraIntolleranza"
                    placeholder="Specificare altre intolleranze" type="text" />
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
                <VBtn block type="submit" @click="submit(true)">
                  Conferma la tua presenza! 😍
                </VBtn>
              </VCol>
              <VCol cols="12" style="text-align: center;">
                <a href="#" @click.prevent="submit(false)" style="text-decoration: none; color: #9d1212;">
                  <span style="text-decoration: underline; font-size: 0.85rem">Purtroppo non potrò
                    partecipare</span> 🥲
                </a>
              </VCol>

            </VRow>
          </VForm>
        </VCardText>
      </VCard>

      <VImg :src="sposini" class="auth-footer-start-tree d-none d-md-block" :width="200" eager />

      <VImg :src="wrings" class="auth-footer-end-tree d-none d-md-block" :width="150" eager />

      <!-- bg img -->
      <VImg class="auth-footer-mask d-none d-md-block" :src="authThemeMask" eager />
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

<style scoped>
.chip-selected {
  background-color: #00A455;
  /* Cambia il colore della chip quando selezionata */
  color: white;
}
</style>
