<script setup lang="ts"></script>

<template>
  <div class="grid">
    <UCard
      class="home-statistics"
      :ui="{
        body: {
          base: 'h-[260px] relative',
        },
      }">
      <div class="space-y-2">
        <div class="flex flex-col">
          <div class="text-2xl text-primary-200 dark:opacity-50">
            New Subscribers
          </div>
          <div class="text-5xl font-semibold text-primary-400">387</div>
        </div>
        <div class="flex items-start gap-4 absolute bottom-4">
          <div class="flex flex-col px-6 py-4 bg-gray-800 rounded-2xl">
            <div class="text-sm text-primary-200 dark:opacity-50">
              Pop-up Triggered
            </div>
            <div class="text-2xl font-semibold text-primary-400">679</div>
          </div>
          <div class="flex flex-col px-6 py-4 bg-gray-800 rounded-2xl">
            <div class="text-sm text-primary-200 dark:opacity-50">
              New Subscribers Rate
            </div>
            <div class="text-2xl font-semibold text-primary-400">54.28%</div>
          </div>
        </div>
      </div>
    </UCard>
    <div class="grid lg:grid-cols-3 lg:items-start gap-8 mt-8">
      <UCard
        :ui="{
          body: {
            base: 'h-[190px] relative',
          },
        }">
        <div class="flex flex-col items-start justify-between h-full">
          <div
            class="flex items-center justify-center w-12 h-12 bg-gray-800 rounded-2xl">
            <UIcon name="i-heroicons-user" class="w-6 h-6 text-primary" />
          </div>
          <div>
            <div class="text-gray-400 dark:text-primary-200 dark:opacity-50">
              Active Subscribers
            </div>
            <div class="text-4xl font-semibold text-primary-400">452</div>
          </div>
        </div>
      </UCard>
      <UCard
        :ui="{
          body: {
            base: 'h-[190px] relative',
          },
        }">
        <div class="flex flex-col items-start justify-between h-full">
          <div
            class="flex items-center justify-center w-12 h-12 bg-gray-800 rounded-2xl">
            <UIcon name="i-heroicons-eye" class="w-6 h-6 text-primary" />
          </div>
          <div>
            <div class="text-gray-400 dark:text-primary-200 dark:opacity-50">
              Notification Views
            </div>
            <div class="text-4xl font-semibold text-primary-400">2,028</div>
          </div>
        </div>
      </UCard>
      <UCard
        :ui="{
          body: {
            base: 'h-[190px] relative',
          },
        }">
        <div class="flex flex-col items-start justify-between h-full">
          <div
            class="flex items-center justify-center w-12 h-12 bg-gray-800 rounded-2xl">
            <UIcon name="i-heroicons-cursor-arrow-rays" class="w-6 h-6 text-primary" />
          </div>
          <div>
            <div class="text-gray-400 dark:text-primary-200 dark:opacity-50">
              Notification Clicks
            </div>
            <div class="text-4xl font-semibold text-primary-400">251</div>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
<style scoped>
.home-statistics {
  background-image: url("/img/home-statistics-bg.png");
  background-repeat: no-repeat;
  background-position: right top;
  height: 260px;
}
</style>
