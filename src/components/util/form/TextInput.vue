<script setup lang="ts">
import { computed } from "vue"

interface Props {
    modelValue: string
    id: string
    label: string
    hideLabel?: boolean
    type?: string
    placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
    type: "text",
})

const emit = defineEmits<{
    "update:modelValue": [value: string]
}>()

const value = computed({
    get: () => props.modelValue,
    set: (val) => emit("update:modelValue", val),
})
</script>

<template>
    <div class="form-group">
        <label :for="props.id" v-if="!hideLabel">{{ props.label }}</label>
        <component
            :is="type === 'textarea' ? 'textarea' : 'input'"
            v-model="value"
            :id="props.id"
            :placeholder="placeholder ?? placeholder"
            class="bg-gray-300 w-100 p-2 rounded-md"
        ></component>
    </div>
</template>
