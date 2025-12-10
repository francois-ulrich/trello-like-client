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
        buttonIconSize?: number
        align?: "right" | "center" | "left"
    }>(),
    {
        buttonIconSize: 16,
        align: "left",
    },
)
</script>

<template>
    <div>
        <BaseButton color="white" variant="ghost" @click="toggleModal"
            ><Ellipsis :size="props.buttonIconSize"
        /></BaseButton>
        <div :id="modalContainerElementId" class="relative"></div>

        <Teleport :to="'#' + modalContainerElementId" v-if="showModal">
            <ModalDialog
                @close="handleModalClose"
                positioning="absoluteAlignRight"
                width="md"
                classOnBody="pb-4"
            >
                <template #header>
                    <p class="font-medium text-center">Actions list</p>
                </template>

                <slot></slot>
            </ModalDialog>
        </Teleport>
    </div>
</template>
