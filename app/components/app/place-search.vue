<script setup lang="ts">
  import type {NominatimResult} from '~~/app/lib/types'
  import type {FetchError} from 'ofetch'

  import {SearchSchema} from '~~/app/lib/zod-schema'
import getFetchErrorMessage from '~~/utils/get-fetch-error-message';


  const emit = defineEmits<{
    resultSelected: [result: NominatimResult]
  }>()
  
  const searchResult = ref<NominatimResult[]>([])
  const searchForm = useTemplateRef('searchForm')
  const loading = ref(false)
  const hasSearched = ref(false)
  const errorMessage = ref("")

  async function onSubmit (query: Record<string, string>) {
    try {
      loading.value = true
      searchResult.value = []
      errorMessage.value = ""
      hasSearched.value = true
      const result = await $fetch('/api/search', {
        query,
      })
      
      searchResult.value = result

    } catch (e) {
      const error = e as FetchError
      errorMessage.value = getFetchErrorMessage(error)
    }
    loading.value = false
  }

  function setLocation (result: NominatimResult) {
    emit('resultSelected', result)

    searchResult.value = []
    errorMessage.value = ""
    hasSearched.value = false

    if(searchForm.value){
      searchForm.value.resetForm()
    } 
  }

</script>

<template>

  <div class="flex flex-col gap-2">
   
    <Form 
      ref="searchForm"
      v-slot="{errors}"
      class="flex flex-col gap-2 items-center" 
      :validation-schema="toTypedSchema(SearchSchema)"
      @submit="onSubmit"
    >
      <div class="join  my-4">
        <div>
          <label class="input join-item">
            <Icon name="tabler:search" size="24"/>
            <Field 
              :disabled="loading"
              type="text" 
              name="q"
              placeholder="Search for a location..." 
              :class="{
                'input-error': errors.q
              }"
            />
          </label>
          <div v-if="errors.q" class="text-sm text-error">{{ errors.q }}</div>
        </div>    
        <button type="submit" :disabled="loading" class="btn btn-neutral join-item">Search</button>
      </div>
    </Form>

    <div v-if="errorMessage && !loading" role="alert" class="alert alert-error">
      {{ errorMessage }}
    </div>

    <div v-if="hasSearched && !loading && !searchResult.length" role="alert" class="alert alert-warning">
      No result found.
    </div>

    <div v-if="loading" class="flex justify-center">
      <div class="loading loading-lg"></div>
    </div>

    <div class="flex flex-col overflow-auto gap-2 max-h-72">
      <div 
        class="card-sm bg-base-100" 
        v-for="result in searchResult" 
        :key="result.place_id"
      >
        <div class="card-body">
          <h4 class="card-title">{{ result.display_name }}</h4>
          <div class="justify-end card-actions">
            <button class="btn btn-sm btn-warning" @click="setLocation(result)">
              Set Location
              <Icon name="tabler:map-pin-share" size="20"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>