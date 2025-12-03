<script setup lang="ts">
import BaseButton from "@/components/util/BaseButton.vue"
import TextInput from "@/components/util/form/TextInput.vue"
import { X } from "lucide-vue-next"
import { onMounted, ref } from "vue"

const props = defineProps<{
    addButtonLabel: string
}>()

const emit = defineEmits<{
    submit: [value: string]
    close: [value: void]
}>()

const elementName = ref<string>("")
const formRef = ref<HTMLElement | null>(null)
const elementNameInputRef = ref<InstanceType<typeof TextInput> | null>(null)

const onSubmit = () => {
    if (elementName.value.length === 0) return

    emit("submit", elementName.value)
}

const onClose = () => {
    emit("close")
}

const handleFocusOut = (event: FocusEvent) => {
    if (
        formRef.value === event.target ||
        formRef.value?.contains(event.relatedTarget as HTMLElement | null)
    )
        return
    emit("close")
}

onMounted(() => {
    elementNameInputRef.value?.inputRef?.focus()
})
</script>

<template>
    <form
        @submit.prevent="onSubmit"
        class="flex flex-col gap-2"
        @focusout="handleFocusOut"
        ref="formRef"
    >
        <TextInput
            id="cardName"
            label="Name"
            v-model="elementName"
            :hide-label="true"
            class="w-full"
            ref="elementNameInputRef"
        />

        <div class="flex flex-row gap-2">
            <BaseButton type="submit" class="flex-auto">{{ props.addButtonLabel }}</BaseButton>
            <BaseButton
                :icon="X"
                @click="onClose"
                type="button"
                class="flex-none"
                color="lightgray"
            ></BaseButton>
        </div>
    </form>
</template>

<style scoped></style>
