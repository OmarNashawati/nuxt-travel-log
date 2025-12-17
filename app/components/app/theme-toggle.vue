<script setup lang="ts">
  const colorMode = useColorMode()
  const isDark = computed({
    get() {
      return colorMode.value === 'dark'
    },
    set(value) {
      colorMode.preference = value ? "dark" : "ligth"
    }
  })
</script>

<template>
  <label class="swap swap-rotate mx-4">
    <input type="checkbox" v-model="isDark" >
    <Icon class="swap-on" name="tabler:sun" size="24"/>
    <Icon class="swap-off" name="tabler:moon-filled" size="24"/>
  </label>
</template>