<script setup lang="ts">
import { Field } from "vee-validate";

const props = defineProps<{
  label: string;
  name: string;
  type?: string;
  error?: string;
  disabled?: boolean;
}>();
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">
      {{ props.label }}
    </legend>
    <Field
      :as="props.type === 'textarea' ? 'textarea' : 'input'"
      :name="props.name"
      :type="props.type"
      :disabled="disabled"
      class="w-full"
      :class="{ 
        'input-error': props.error, 
        'input': props.type === 'text' || props.type === 'number', 
        'textarea': props.type === 'textarea', 
      }"
    />
    <p v-if="props.error" class="label text-error">
      {{ props.error }}
    </p>
  </fieldset>
</template>
