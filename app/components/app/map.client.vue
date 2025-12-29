<script lang="ts" setup>
  import { CENTER_DAMASCUS } from '~/lib/constants';

const colorMode = useColorMode();
const style = computed(() => 
  colorMode.value === 'dark' 
  ? "/styles/dark.json" 
  : 'https://tiles.openfreemap.org/styles/liberty'
);

const center = CENTER_DAMASCUS;
const zoom = 4;
</script>

<template>
    <MglMap
      :map-style="style"
      :zoom="zoom"
      :center="center as [number, number]"
    >
      <MglNavigationControl />
  </MglMap>
</template>