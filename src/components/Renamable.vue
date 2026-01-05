<script setup lang="ts">
import { nextTick, ref, useTemplateRef } from "vue"

const props = withDefaults(
    defineProps<{ text: string; textClass?: string; inputType?: "input" | "textarea" }>(),
    { inputType: "input" },
)

const inputRef = useTemplateRef<HTMLInputElement | HTMLTextAreaElement>("inputRef")
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

const textareaElClass =
    props.inputType === "textarea" ? `${props.textClass} resize-none w-full h-32` : props.textClass
</script>

<template>
    <div>
        <div v-if="!isInEditMode" class="cursor-pointer" @click="handleSwitchToEditMode">
            <span :class="textClass">{{ inputValue }}</span>
        </div>
        <div v-else class="w-full">
            <form @submit.prevent="handleSubmit">
                <textarea
                    v-if="props.inputType === 'textarea'"
                    ref="inputRef"
                    :class="textareaElClass"
                    v-model="inputValue"
                    @focusout="handleFocusOut"
                    >{{ inputValue }}</textarea
                >

                <input
                    v-else
                    type="text"
                    ref="inputRef"
                    :class="props.textClass"
                    v-model="inputValue"
                    @focusout="handleFocusOut"
                />
            </form>
        </div>
    </div>
</template>
