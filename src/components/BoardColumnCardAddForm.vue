<script setup lang="ts">
import BaseButton from "@/components/util/BaseButton.vue"
import TextInput from "@/components/util/form/TextInput.vue"
import { useBoardStore } from "@/stores/board"
import { X } from "lucide-vue-next"
import { onMounted, ref } from "vue"

const props = defineProps<{
    boardId: string
    columnId: string
}>()

const emit = defineEmits<{
    (e: "cancel"): void
}>()

const cardName = ref<string>("")

const formRef = ref<HTMLElement | null>(null)
const cardNameInputRef = ref<InstanceType<typeof TextInput> | null>(null)
defineExpose({ cardNameInputRef })

const onSubmit = () => {
    if (cardName.value.length === 0) return
    const { createCard } = useBoardStore()
    createCard(cardName.value, props.boardId, props.columnId)
    emit("cancel")
}

const onCancel = () => {
    emit("cancel")
}

const handleFocusOut = (event: FocusEvent) => {
    if (
        formRef.value === event.target ||
        formRef.value?.contains(event.relatedTarget as HTMLElement | null)
    )
        return
    emit("cancel")
}

onMounted(() => {
    cardNameInputRef.value?.inputRef?.focus()
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
            v-model="cardName"
            :hide-label="true"
            class="w-full"
            ref="cardNameInputRef"
        />

        <div class="flex flex-row gap-2">
            <BaseButton type="submit" class="flex-auto">Add card</BaseButton>
            <BaseButton
                :icon="X"
                @click="onCancel"
                type="button"
                class="flex-none"
                color="lightgray"
            ></BaseButton>
        </div>
    </form>
</template>

<style scoped></style>
