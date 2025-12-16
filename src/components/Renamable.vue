<script setup lang="ts">
import { nextTick, ref, useTemplateRef } from "vue"

const props = defineProps<{ text: string; textClass?: string }>()

const inputRef = useTemplateRef("inputRef")
const inputValue = ref<string>(props.text)
const isInEditMode = ref<boolean>(false)

const emit = defineEmits<{
    textUpdate: [value: string]
}>()

const handleSwitchToEditMode = async () => {
    isInEditMode.value = true
    await nextTick()
    inputRef.value?.focus()
}

const handleFocusOut = () => {
    handleSubmit()
}

const handleSubmit = () => {
    if (inputValue.value === "") inputValue.value = props.text

    isInEditMode.value = false

    if (inputValue.value !== props.text) emit("textUpdate", inputValue.value)
}

const open = () => {
    handleSwitchToEditMode()
}

defineExpose({
    open,
})
</script>

<template>
    <div>
        <div v-if="!isInEditMode" class="cursor-pointer" @click="handleSwitchToEditMode">
            <span :class="textClass">{{ inputValue }}</span>
        </div>
        <div v-else>
            <form @submit.prevent="handleSubmit">
                <input
                    type="text"
                    ref="inputRef"
                    :class="textClass"
                    v-model="inputValue"
                    @focusout="handleFocusOut"
                />
            </form>
        </div>
    </div>
</template>
