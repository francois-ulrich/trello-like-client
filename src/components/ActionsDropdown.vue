<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue"
import ModalDialog from "@/components/ModalDialog.vue"
import { Ellipsis } from "lucide-vue-next"
import { ref } from "vue"
import { v4 as uuidv4 } from "uuid"

const showModal = ref<boolean>(false)

const modalContainerElementId = `modal-container-${uuidv4()}`

const handleModalOpen = () => {
    showModal.value = true
}

const handleModalClose = () => {
    showModal.value = false
}

const toggleModal = () => {
    showModal.value = !showModal.value
}

const props = withDefaults(
    defineProps<{
        size?: number
        align?: "right" | "center" | "left"
    }>(),
    {
        size: 16,
        align: "left",
    },
)
</script>

<template>
    <div>
        <BaseButton color="white" variant="ghost" @click="toggleModal"
            ><Ellipsis :size="props.size"
        /></BaseButton>
        <div :id="modalContainerElementId" class="relative"></div>

        <Teleport :to="'#' + modalContainerElementId" v-if="showModal">
            <ModalDialog @close="handleModalClose" positioning="absolute">
                <template #header>
                    <p class="font-medium">Liste des actions</p>
                </template>
            </ModalDialog>
        </Teleport>
    </div>
</template>
