<script setup>
import authV1MaskDark from '@images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@images/pages/auth-v1-mask-light.png'
import authV1Tree2 from '@images/pages/auth-v1-tree-2.png'
import authV1Tree from '@images/pages/auth-v1-tree.png'
import rings from '@images/rings.svg?raw'
import { useRoute } from 'vue-router'
import { useTheme } from 'vuetify'
import { confermaPresenza } from '../service/backend'


onMounted(() => {
  const route = useRoute();  
  console.log(route);
  const {nome, cognome} = route.query; 
  console.log({nome, cognome});
  form.value.nome = nome
  form.value.cognome = cognome
  form.value.nome_cognome = `${form.value.nome} ${form.value.cognome}`
});

const form = ref({
  nome_cognome: '',
  nome: '',
  cognome:'',
  username: '',
  intolleranze: false,
  intolleranze_list: '',
  email: '',
  telefono: '',
  forestiero: false,
})

async function submit() {
  console.log(JSON.stringify(form.value));
  const response = await confermaPresenza(form.value);
  console.log(response);
  router.push({name: 'dashboard', query: { username: form.value.username }})
}

const vuetifyTheme = useTheme()

const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})

</script>

<template>
  <!-- eslint-disable vue/no-v-html -->

  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
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
        <VForm @submit.prevent="() => {}">
          <VRow>
            <!-- Nome -->
            <VCol cols="12">
              <VTextField
                v-model="form.nome_cognome"
                disabled
              />
            </VCol>

            <!-- Username -->
            <VCol cols="12">
              <VTextField
                v-model="form.username"
                label="Username"
              />
            </VCol>

            <!-- Intolleranze -->
             <VCol cols="12">
              <div class="d-flex align-center mt-1 mb-4">
                <VLabel
                  for="intolleranze"
                  style="opacity: 1;"
                >
                  <span class="me-1">Sei intollerante/allergico a qualcosa? </span>
                </VLabel>
                <VCheckbox
                  id="intolleranze"
                  v-model="form.intolleranze"
                  inline
                />
              </div>
              <VTextField
                v-if="form.intolleranze"
                v-model="form.intolleranze_list"
                label="Intolleranze/Allergie"
                hint="Si intendono le intolleranze/allergie alimentari: sappiamo tutti che solo la sposa sopporta frasanz"
              />
            </VCol>


            <!-- forestiero -->
            <VCol cols="12">
              <div class="d-flex align-center mt-1 mb-4">
                <VLabel
                  for="forestiero"
                  style="opacity: 1;"
                >
                  <span class="me-1">Sei un forestiero?</span>
                </VLabel>
                <VCheckbox
                  id="forestiero"
                  v-model="form.forestiero"
                  inline
                />
              </div>

            </VCol>

            <VCardText class="pt-2">
              <h5 class="text-h5 font-weight-semibold mb-1">
                Vuoi rimanere aggiornato sul nostro matrimonio? 💌
              </h5>
            </VCardText>
             <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                label="Email"
                type="email"
              />
            </VCol>

            <!-- telefono -->
            <VCol cols="12">
              <VTextField
                v-model="form.telefono"
                label="Telefono"
                type="tel"
                hint="si, probabilmente, anzi quasi sicuramente, abbiamo già questi dati, ma se ci conosci sai che siamo molto pigri e non ci andava di ricopiarli!"
              />
            </VCol>
            
             <VCol cols="12">
              <VBtn
                  block
                  type="submit"
                  @click="submit"
                >
                  Conferma tua presenza!
              </VBtn>
            </VCol>

          </VRow>
        </VForm>
      </VCardText>
    </VCard>

    <VImg
      class="auth-footer-start-tree d-none d-md-block"
      :src="authV1Tree"
      :width="250"
    />

    <VImg
      :src="authV1Tree2"
      class="auth-footer-end-tree d-none d-md-block"
      :width="350"
    />

    <!-- bg img -->
    <VImg
      class="auth-footer-mask d-none d-md-block"
      :src="authThemeMask"
    />
  </div>
</template>

<style lang="scss">
@use "@core/scss/pages/page-auth.scss";
.text-wrap {
  word-wrap: break-word; /* Consente al testo di andare a capo a livello di parola */
  //word-break: break-all; /* Consente al testo di andare a capo a livello di carattere */
}
</style>
