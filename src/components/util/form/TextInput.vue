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
    set: (val) => {
        console.log(val)
        emit("update:modelValue", val)
    },
})
</script>

<template>
    <div class="form-group">
        <label :for="props.id" v-if="!hideLabel">{{ label }}</label>
        <input
            :type="props.type"
            :id="props.id"
            :placeholder="placeholder"
            v-model="value"
            class="bg-gray-300 w-100 p-2 rounded-md"
        ></input>
    </div>
</template>
