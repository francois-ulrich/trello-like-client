<script setup lang="ts">
import BaseButton from "@/components/util/BaseButton.vue"
import TextInput from "@/components/util/form/TextInput.vue"
import { useBoardStore } from "@/stores/board"
import { X } from "lucide-vue-next"
import { ref } from "vue"

const props = defineProps<{
    boardId: string
    columnId: string
}>()

const emit = defineEmits<{
    (e: "cancel"): void
}>()

const cardNameInput = ref<string>("")

const onSubmit = () => {
    if (cardNameInput.value.length === 0) return
    const { createCard } = useBoardStore()
    createCard(cardNameInput.value, props.boardId, props.columnId)
    emit("cancel")
}

const onCancel = () => {
    emit("cancel")
}
</script>

<template>
    <form @submit.prevent="onSubmit" class="flex flex-col gap-2">
        <p>{{ cardNameInput }}</p>

        <TextInput id="cardName" label="Name" v-model="cardNameInput" :hide-label="true" />

        <div class="flex flex-row">
            <BaseButton type="submit">Add card</BaseButton>
            <BaseButton :icon="X" @click="onCancel" type="button"></BaseButton>
        </div>
    </form>
</template>

<style scoped></style>
