<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue"
import ModalDialog from "@/components/ModalDialog.vue"
import useModal from "@/composables/useModal"
import { Ellipsis } from "lucide-vue-next"
import { v4 as uuidv4 } from "uuid"

const modalContainerElementId = `modal-container-${uuidv4()}`
const modalId = `modal-${uuidv4()}`

const { closeModal, isModalOpen, toggleModal } = useModal()

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
        <BaseButton color="white" variant="ghost" @click="toggleModal(modalId)"
            ><Ellipsis :size="props.buttonIconSize"
        /></BaseButton>
        <div :id="modalContainerElementId" class="relative"></div>

        <ModalDialog
            :isOpened="isModalOpen(modalId)"
            :teleport-to="'#' + modalContainerElementId"
            @close="closeModal"
            positioning="absoluteAlignRight"
            width="md"
            classOnBody="pb-4"
        >
            <template #header>
                <p class="font-medium text-center">Actions list</p>
            </template>

            <slot></slot>
        </ModalDialog>
    </div>
</template>
