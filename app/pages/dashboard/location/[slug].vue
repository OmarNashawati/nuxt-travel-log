<script setup lang="ts">
import { createMapPointFromLocation } from '~~/utils/map-points'

  const route = useRoute()
  const mapStore = useMapStore()

  const {slug } = route.params
  const {data: location, status, error} = await useFetch(`/api/locations/${slug}`, {
    lazy: true,
  })

  effect(() => {
    if(location.value) {
      mapStore.mapPoints = [location.value]
    }
  })
</script>

<template>
  <div class="p-4 min-h-64">
    <div v-if="status === 'pending'" >
      <div class="loading"></div>
    </div>
    <div v-if="location && status !== 'pending'">
      <h2 class="text-lg">
        {{ location?.name }}
      </h2>
      <p>{{ location.description }}</p>

      <div v-if="!location.locationLog.length " class="mt-4">
        <p class="italic ">
          Add a location log to get started.
        </p>
      </div>

      <button class="btn btn-primary mt-2">
        Add Location Log
        <Icon name="tabler:map-pin-plus" size="24"/>
      </button>
    </div>
    <div v-if="error && status !== 'pending'" class="alert alert-error">
      <h2 class="text-lg">
        {{ error.statusMessage }}
      </h2>
    </div>

  </div>
</template>