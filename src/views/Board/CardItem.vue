<script setup lang="ts">
import ModalDialog from "@/components/ModalDialog.vue"
import TextareaInput from "@/components/form/TextareaInput.vue"
import TextInput from "@/components/form/TextInput.vue"
import RoundedCard from "@/components/RoundedCard.vue"
import type { Card } from "@/types/card"
import type { CardForm } from "@/types/cardForm"
import type { Column } from "@/types/column"
import { SquarePen, TextAlignStart } from "lucide-vue-next"
import { ref } from "vue"
import BaseButton from "@/components/BaseButton.vue"

const props = defineProps<{ card: Card; column: Column }>()

const boardDeleteModalRef = ref<InstanceType<typeof ModalDialog> | null>(null)

const cardEditForm = ref<CardForm>({
    name: props.card.name,
    description: props.card.description ?? "",
})

const handleModalOpen = () => {
    if (boardDeleteModalRef?.value === null) return
    boardDeleteModalRef?.value.open()
}

const handleFormSubmit = () => {
    console.log("handleFormSubmit")
}
</script>

<template>
    <RoundedCard
        class="bg-gray-300 p-4 cursor-pointer box-border relative group"
        @click="handleModalOpen"
    >
        <p class="font-medium">{{ props.card.name }}</p>

        <TextAlignStart v-if="props.card.description !== undefined" :size="14" class="m-1" />

        <SquarePen class="absolute top-2 right-2 opacity-0 group-hover:opacity-100" :size="16" />

        <ModalDialog :withBackdrop="true" positioning="screenCenter" ref="boardDeleteModalRef">
            <template #header>
                <p class="font-medium">{{ props.column.name }}</p>
            </template>

            <form @submit.prevent="handleFormSubmit">
                <TextInput id="name" label="Name" v-model="cardEditForm.name" class="w-full mb-2" />

                <TextareaInput
                    id="description"
                    label="Description"
                    v-model="cardEditForm.description"
                    class="w-full"
                />

                <div>
                    <BaseButton type="submit">Save changes</BaseButton>
                </div>
            </form>
        </ModalDialog>
    </RoundedCard>
</template>
