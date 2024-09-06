<script setup>
import AnalyticsDepositWithdraw from '@/views/dashboard/AnalyticsDepositWithdraw.vue'
import AnalyticsSalesByCountries from '@/views/dashboard/AnalyticsSalesByCountries.vue'
import AnalyticsUserTable from '@/views/dashboard/AnalyticsUserTable.vue'
import Countdown from '@/views/dashboard/Countdown.vue'
import Calendar from '@/views/dashboard/Calendar.vue'
import Carosello from '@/views/dashboard/Carosello.vue'
import Contatti from '@/views/dashboard/Contatti.vue'
import MappaChiesa from '@/views/dashboard/MappaChiesa.vue'
import MappaLocation from '@/views/dashboard/MappaLocation.vue'
import Welcome from '@/views/dashboard/Welcome.vue'
import Iban from '@/views/dashboard/Iban.vue'
import logo from '@images/pages/logo3.png'


</script>

<template>
  <VRow class="match-height">
    <VCol cols="12" md="4">
      <!-- logo -->
      <VImg :src="logo" class="logo" />
    </VCol>

    <VCol cols="12" md="4">
      <VRow>
        <VCol cols="12">
          <Welcome />
        </VCol>
        <VCol cols="12">
          <Calendar />
        </VCol>
      </VRow>
    </VCol>

    <VCol cols="12" md="4">
      <VRow>
        <VCol cols="12">
          <Countdown />
        </VCol>
        <VCol cols="12">
          <Iban />
        </VCol>

      </VRow>
    </VCol>

    <VCol cols="12" md="12">
      <Carosello />
    </VCol>

    <VCol cols="12" md="6">
      <MappaChiesa />
    </VCol>

    <VCol cols="12" md="6">
      <MappaLocation />
    </VCol>

    <VCol cols="12">
      <Contatti />
    </VCol>

  </VRow>
</template>
