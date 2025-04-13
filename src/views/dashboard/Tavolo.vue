<script setup>
import { BASE_URL } from '@/costants';
import { getTavolo } from '@/service/backend';

let tavolo_numero = ref('');
let tavolo_titolo = ref('');

const iconArray = ['🌼', '🚀', '🌟', '🎈', '🥰', '🌸', '💫', '🌈', '🍽️', '🍾', '💥', '🤍', '🔝'];

const getRandomIcon = () => {
  return iconArray[Math.floor(Math.random() * iconArray.length)];
};
let onBeforeMountComplete = ref(false);

onBeforeMount(async () => {
  let data = {};
  let tavolo;
  try {
    if (localStorage.getItem("signInData")) {
      data = JSON.parse(localStorage.getItem("signInData"));
    }
    tavolo = await getTavolo(data.id);
    console.log(tavolo)
  } catch (e) { }
  tavolo_numero.value = tavolo.tavolo_numero;
  tavolo_titolo.value = tavolo.tavolo_titolo;
  onBeforeMountComplete.value = true;
});

</script>

<template>
  <VCard class="position-relative">
    <VCardText>
      <div class="mb-2">
        <h5 class="text-h5">
          Tutti in Sala! <span class="text-high-emphasis">{{ getRandomIcon() }}</span>
        </h5>
        <div class="text-body-1" v-if="tavolo_numero">
          Prendi posto al tavolo numero <strong>{{ tavolo_numero }}</strong>: <em class="text-green">{{
            tavolo_titolo }}</em>
        </div>
        <div class="text-body-1" v-else>
          Cerca e prendi posto al tuo tavolo!
        </div>
      </div>
    </VCardText>
  </VCard>
</template>

<style scoped>
.text-green {
  color: #00A455;
}
</style>
