<script setup lang="ts">
const countries = [
  {
    label: "Poland",
    value: 31,
    color: "red",
  },
  {
    label: "Germany",
    value: 21,
    color: "orange",
  },
  {
    label: "Italy",
    value: 15,
    color: "yellow",
  },
  {
    label: "France",
    value: 10,
    color: "green",
  },
  {
    label: "Spain",
    value: 6,
    color: "teal",
  },
  {
    label: "Sweden",
    value: 4,
    color: "pink",
  },
  {
    label: "Norway",
    value: 3,
    color: "indigo",
  },
  {
    label: "Netherlands",
    value: 1,
    color: "blue",
  },
];
</script>

<template>
  <UDashboardCard
    title="Top Countries"
    description="Notification subscriptions by country."
    icon="i-heroicons-globe-alt-20-solid">
    <div class="space-y-2">
      <UMeter
        v-for="(country, index) in countries"
        :key="index"
        :value="country.value"
        :label="country.label"
        :color="country.color"
        size="lg"
        class="flex-row-reverse items-center"
        :ui="{
          label: { base: 'flex-shrink-0 w-24' },
          indicator: { container: '!w-auto' },
          meter: { base: 'flex-1' },
        }"
        indicator />
    </div>
  </UDashboardCard>
</template>
