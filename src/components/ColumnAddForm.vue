<script setup lang="ts">
import BaseButton from "@/components/util/BaseButton.vue"
import TextInput from "@/components/util/form/TextInput.vue"
import { useColumnStore } from "@/stores/column"
import { X } from "lucide-vue-next"
import { onMounted, ref } from "vue"

const props = defineProps<{
    boardId: string
    addButtonLabel: string
}>()

const emit = defineEmits<{
    (e: "submit"): void
    (e: "close"): void
}>()

const columnName = ref<string>("")
const formRef = ref<HTMLElement | null>(null)
const columnNameInputRef = ref<InstanceType<typeof TextInput> | null>(null)

const onSubmit = () => {
    if (columnName.value.length === 0) return
    const { create } = useColumnStore()
    create({ boardId: props.boardId, name: columnName.value, cards: [] })
    emit("close")
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
    columnNameInputRef.value?.inputRef?.focus()
})
</script>

<template>
    <div class="w-80">
        <form
            @submit.prevent="onSubmit"
            class="flex flex-col gap-2"
            @focusout="handleFocusOut"
            ref="formRef"
        >
            <TextInput
                id="cardName"
                label="Name"
                v-model="columnName"
                :hide-label="true"
                class="w-full"
                ref="columnNameInputRef"
            />

            <div class="flex flex-row gap-2">
                <BaseButton type="submit" class="flex-auto">{{ addButtonLabel }}</BaseButton>
                <BaseButton
                    :icon="X"
                    @click="onClose"
                    type="button"
                    class="flex-none"
                    color="lightgray"
                ></BaseButton>
            </div>
        </form>
    </div>
</template>

<style scoped></style>
