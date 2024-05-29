<script setup lang="ts">
const { isHelpSlideoverOpen } = useDashboard();

const websites = [{ label: "Gravastar", id: 1 }, { label: "Test website", id: 2 }];

const selectedWebsite = ref();

const links = [
  {
    id: "home",
    label: "Home",
    icon: "i-heroicons-home",
    to: "/",
    tooltip: {
      text: "Home",
      shortcuts: ["G", "H"],
    },
  },
  {
    id: "users",
    label: "Users",
    icon: "i-heroicons-user-group",
    to: "/users",
    tooltip: {
      text: "Users",
      shortcuts: ["G", "U"],
    },
  },
  {
    id: "settings",
    label: "Settings",
    to: "/settings",
    icon: "i-heroicons-cog-8-tooth",
    children: [
      {
        label: "General",
        to: "/settings",
        exact: true,
      },
      {
        label: "Members",
        to: "/settings/members",
      },
      {
        label: "Notifications",
        to: "/settings/notifications",
      },
    ],
    tooltip: {
      text: "Settings",
      shortcuts: ["G", "S"],
    },
  },
];

const footerLinks = [
  {
    label: "Invite people",
    icon: "i-heroicons-plus",
    to: "/settings/members",
  },
  {
    label: "Help & Support",
    icon: "i-heroicons-question-mark-circle",
    click: () => (isHelpSlideoverOpen.value = true),
  },
];

const groups = [
  {
    key: "links",
    label: "Go to",
    commands: links.map(link => ({
      ...link,
      shortcuts: link.tooltip?.shortcuts,
    })),
  },
];
</script>
<template>
  <UDashboardLayout>
    <UDashboardPanel
      :width="250"
      :resizable="{
        min: 200,
        max: 400,
      }">
      <UDashboardNavbar class="!border-transparent" :ui="{ left: 'flex-1' }">
        <template #left>
          <img class="h-12 w-auto text-black" src="/img/hp-logo-white.svg" />
        </template>
      </UDashboardNavbar>

      <UDashboardSidebar>
        <template #header>
          <USelectMenu
            v-model="selectedWebsite"
            :options="websites"
            placeholder="Select Website..."
            searchable
            option-attribute="label" />
        </template>
        <UDashboardSidebarLinks :links="links" />
        <UDivider />

        <div class="flex-1" />

        <UDashboardSidebarLinks :links="footerLinks" />

        <UDivider class="sticky bottom-0" />

        <template #footer>
          <!-- ~/components/UserDropdown.vue -->
          <UserDropdown />
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>

    <slot />

    <!-- ~/components/HelpSlideover.vue -->
    <HelpSlideover />
    <!-- ~/components/NotificationsSlideover.vue -->
    <NotificationsSlideover />

    <ClientOnly>
      <LazyUDashboardSearch :groups="groups" />
    </ClientOnly>
  </UDashboardLayout>
</template>
