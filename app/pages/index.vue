<script setup lang="ts">
import AuthButton from '~/components/auth-button.vue';

</script>

<template>
  <div class="hero bg-base-300 container mx-auto mt-4">
    <div class="hero-content text-center min-h-96">
      <div class="max-w-md">
        <p class="text-5xl font-bold">Travel Log</p>
        <p class="py-6">
          Keep track of your travels and adventures with this simple travel log application. Add locations, photos, and notes to create a digital journal of your journeys. 
        </p>
      <AuthButton/>
      </div>
    </div>
  </div>
</template>