<script setup>
import AnalyticsDepositWithdraw from '@/views/dashboard/AnalyticsDepositWithdraw.vue'
import AnalyticsSalesByCountries from '@/views/dashboard/AnalyticsSalesByCountries.vue'
import AnalyticsUserTable from '@/views/dashboard/AnalyticsUserTable.vue'
import Countdown from '@/views/dashboard/Countdown.vue'
import MappaChiesa from '@/views/dashboard/MappaChiesa.vue'
import MappaLocation from '@/views/dashboard/MappaLocation.vue'
import Welcome from '@/views/dashboard/Welcome.vue'
import logo from '@images/pages/logo3.png'


</script>

<template>
  <VRow class="match-height">
    <VCol cols="12" md="4">
      <!-- logo -->
      <VImg :src="logo" class="logo" />
    </VCol>
    <VCol cols="12" md="4">
      <VRow class="match-height">
        <Welcome />
      </VRow>
      <VRow class="match-height">
        <!-- <Carosello /> -->
        EHI
      </VRow>
    </VCol>

    <VCol cols="12" md="4">
      <Countdown />
    </VCol>

    <VCol cols="12" md="6">
      <MappaChiesa />
    </VCol>

    <VCol cols="12" md="6">
      <MappaLocation />
    </VCol>

    <VCol cols="12" md="4">
      <AnalyticsSalesByCountries />
    </VCol>

    <VCol cols="12" md="8">
      <AnalyticsDepositWithdraw />
    </VCol>

    <VCol cols="12">
      <AnalyticsUserTable />
    </VCol>
  </VRow>
</template>
