<script lang="ts" setup>
  import type {FetchError} from 'ofetch';
  
  import { toTypedSchema } from "@vee-validate/zod";
  import getFetchErrorMessage from '~~/utils/get-fetch-error-message'

  import type { NominatimResult } from '~/lib/types';

  import { CENTER_MAKKAH } from '~/lib/constants';
  import { InsertLocation } from "~/lib/db/schema";


const { $csrfFetch } = useNuxtApp()
const router = useRouter()
const mapStore = useMapStore()

const submitError = ref("");
const loading = ref(false);
const submitted = ref(false);

const { handleSubmit, errors ,meta , setErrors , setFieldValue, controlledValues} = useForm({
  validationSchema: toTypedSchema(InsertLocation),
  initialValues : {
    name: "",
    description: "",
    lat: (CENTER_MAKKAH as [number, number])[0],
    long: (CENTER_MAKKAH as [number, number])[1],
  }
});

const onSubmit = handleSubmit(async (values) => {
  try {
    submitError.value = ""
    loading.value = true
    await $csrfFetch("/api/locations", {
      method: 'post',
      body: values,
    })

    submitted.value = true;
    navigateTo("/dashboard")

  } catch (e) {
    const error = e as FetchError;
    if(error.data?.data) setErrors(error.data?.data)

    submitError.value = getFetchErrorMessage(error)
  }
  loading.value = false
});

function formatNumber(value?: number) {
  if(!value) return 0
  return value.toFixed(5)
}


function searchResultSelected (result: NominatimResult) {
  setFieldValue('name', result.name)
  mapStore.addedPoint = {
    id: 1,
    name: 'Added Point',
    description: '',
    lat: Number(result.lat),
    long: Number(result.lon),
    centerMap: true,
  }
}

effect(() => {
  if(mapStore.addedPoint) {
    setFieldValue('long', mapStore.addedPoint.long)
    setFieldValue('lat', mapStore.addedPoint.lat)
  }
})

onMounted(() => {
  mapStore.addedPoint = {
    id: 1,
    name: 'Added Point',
    description: '',
    lat: (CENTER_MAKKAH as [number, number])[0],
    long: (CENTER_MAKKAH as [number, number])[1],
  }
})

onBeforeRouteLeave(() => {
  if(!submitted.value && meta.value.dirty) {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm("Are you sure you want to leave? All unsaved changes will be lose.")
    if(!confirm) {
      return false
    }
  }
  mapStore.addedPoint = null
  return true;
})
</script>

<template>
  <div class="container max-w-md mx-auto p-4">
    <div class="my-4">
      <h1>Add Location</h1>
      <p class="text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti libero sint vitae earum eius placeat enim fuga illum accusantium veniam?
      </p>
    </div>

    <div v-if="submitError" role="alert" class="alert alert-error">
      <Icon name="tabler:info-triangle" size="24"/>
      <span>{{ submitError }}</span>
    </div>

    <form class="flex flex-col gap-2" @submit="onSubmit">
      <AppFormField
        label="Name"
        name="name"
        type="text"
        :disabled="loading"
        :error="errors.name"
        />

        <AppFormField
        label="Description"
        name="description"
        type="textarea"
        :disabled="loading"
        :error="errors.description"
        />

        <p class="text-xs text-gray-500">
          Current coordinates: {{ formatNumber(controlledValues.lat) }}, {{ formatNumber(controlledValues.long) }}
        </p>

        <p>To set the coordinates:</p>
        <ul class="list-disc ml-4 text-sm">
          <li>
              Drag the <Icon name="tabler:map-pin-filled" class="text-warning" /> marker on the map <Icon name="tabler:map" class="text-warning" />.
          </li>
          <li>
              Double click on the map <Icon name="tabler:map" class="text-warning" />.
          </li>
          <li>
              Search for location below.
          </li>
        </ul>
        


        
        
      <div class="flex justify-end gap-2">
        <button 
          :disabled="loading" 
          type="button" 
          class="btn btn-outline" 
          @click="router.back()"
        >
          <Icon name="tabler:arrow-left" size="24" />
          Cancel
        </button>

        <button :disabled="loading" type="submit" class="btn btn-primary">
          <span v-if="loading" class="loading loading-spinner loading-sm" />
          <Icon v-else name="tabler:circle-plus-filled" size="24" />
          Add
        </button>
      </div>
    </form>

    <div class="divider"></div>

    <AppPlaceSearch @result-selected="searchResultSelected"/>
  </div>
</template>
