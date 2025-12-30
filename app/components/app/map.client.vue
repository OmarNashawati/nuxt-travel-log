<script lang="ts" setup>
import type { LngLat } from 'maplibre-gl';

import type { MglEvent } from '~/lib/types';

import { CENTER_DAMASCUS, CENTER_MAKKAH } from '~/lib/constants';

const colorMode = useColorMode()
const mapStore = useMapStore()

const style = computed(() => 
  colorMode.value === 'dark' 
  ? "/styles/dark.json" 
  : 'https://tiles.openfreemap.org/styles/liberty'
);

const center = CENTER_DAMASCUS;
const zoom = 4;

function updateAddedPoint(location: LngLat) {
  if(mapStore.addedPoint) {
    mapStore.addedPoint.lat = location.lat
    mapStore.addedPoint.long = location.lng
  }
}

function onDoubleClick (event: MglEvent<"dblclick">) {
  if(mapStore.addedPoint){
    mapStore.addedPoint.lat = event.event.lngLat.lat
    mapStore.addedPoint.long = event.event.lngLat.lng
  }
}

onMounted(() => {
  mapStore.init()
})
</script>

<template>
    <MglMap
      :map-style="style"
      :zoom="zoom"
      :center="center"
      @map:dblclick="onDoubleClick"
    >
      <MglNavigationControl />

      <MglMarker
        v-if="mapStore.addedPoint"
        draggable
        :coordinates="[mapStore.addedPoint.long, mapStore.addedPoint.lat]"
        @update:coordinates="updateAddedPoint"
      >
        <template #marker>
          <div 
            class="tooltip tooltip-top tooltip-open hover:cursor-pointer"
            data-tip="Drag to your desired location" 
          >
            <Icon 
            name="tabler:map-pin-filled" 
            size="30"
            class="text-warning"/>
          </div>
        </template>
      </MglMarker>

      <MglMarker
        v-for="point in mapStore.mapPoints" 
        :key="point.id" 
        :coordinates="[point.long, point.lat]"
      >
        <template #marker>
          <div 
            class="tooltip tooltip-top hover:cursor-pointer" 
            :class="{
              'tooltip-open': mapStore.selectedPoint === point
            }"
            :data-tip="point.name"
            @mouseenter="mapStore.selectPointWithoutFlyTo(point)"  
            @mouseleave="mapStore.selectPointWithoutFlyTo(null)"  
          >
            <Icon 
            name="tabler:map-pin-filled" 
            size="30"
            :class="mapStore.selectedPoint?.id === point.id ?  'text-accent' : 'text-primary'"/>
          </div>
        </template>

        <mgl-popup>
          <h3 class="text-xl">{{ point.name }}</h3>
           <p v-if="point.description" class="">{{ point.description }}</p>
      </mgl-popup>
      </MglMarker>
      
  </MglMap>
</template>