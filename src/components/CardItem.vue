<script setup lang="ts">
import ModalDialog from "@/components/ModalDialog.vue"
import TextareaInput from "@/components/util/form/TextareaInput.vue"
import TextInput from "@/components/util/form/TextInput.vue"
import RoundedCard from "@/components/util/RoundedCard.vue"
import type { Card } from "@/types/card"
import type { CardForm } from "@/types/cardForm"
import type { Column } from "@/types/column"
import { SquarePen } from "lucide-vue-next"
import { ref } from "vue"

const props = defineProps<{ card: Card; column: Column }>()

const showModal = ref<boolean>(false)

const cardEditForm = ref<CardForm>({
    name: props.card.name,
    description: props.card.description ?? "",
})

const handleModalOpen = () => {
    showModal.value = true
}

const handleModalClose = () => {
    showModal.value = false
}

const handleFormSubmit = () => {}
</script>

<template>
    <RoundedCard
        class="bg-gray-300 p-4 cursor-pointer box-border relative group"
        @click="handleModalOpen"
    >
        <p class="font-medium">{{ props.card.name }}</p>
        <SquarePen class="absolute top-2 right-2 opacity-0 group-hover:opacity-100" :size="16" />

        <Teleport to="body" v-if="showModal">
            <ModalDialog @close="handleModalClose">
                <template #header>
                    <p class="font-medium">{{ props.column.name }}</p>
                </template>

                <form @submit.prevent="handleFormSubmit">
                    <TextInput
                        id="name"
                        label="Name"
                        v-model="cardEditForm.name"
                        class="w-full mb-2"
                    />

                    <TextareaInput
                        id="description"
                        label="Description"
                        v-model="cardEditForm.description"
                        class="w-full"
                    />
                </form>
            </ModalDialog>
        </Teleport>
    </RoundedCard>
</template>

<style scoped></style>
