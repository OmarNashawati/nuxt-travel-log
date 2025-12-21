<script setup lang="ts">
  const authStore = useAuthStore()
  await authStore.init()
</script>

<template>
  <div class="flex main-h-secreen flex-col">
    <AppNavBar />
    <main>
      <slot />
    </main>
  </div>
</template>