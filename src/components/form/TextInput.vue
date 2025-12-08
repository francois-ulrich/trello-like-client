<script setup lang="ts">
import { computed, useTemplateRef } from "vue"

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
    set: (val) => 
        emit("update:modelValue", val)
    ,
})

const focus = () => {
  inputRef.value?.focus()
}

const inputRef = useTemplateRef('input-ref');
defineExpose({ inputRef, focus })
</script>

<template>
    <div class="form-group">
        <label :for="props.id" v-if="!hideLabel">{{ label }}</label>
        <input
            :type="props.type"
            :id="props.id"
            :placeholder="placeholder"
            v-model="value"
            ref="input-ref"
            class="bg-gray-300 p-2 rounded-md w-full"
        ></input>
    </div>
</template>
