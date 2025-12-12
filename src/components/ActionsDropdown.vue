<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue"
import ModalDialog from "@/components/ModalDialog.vue"
import { Ellipsis } from "lucide-vue-next"
import { v4 as uuidv4 } from "uuid"
import { ref } from "vue"

const modalContainerElementId = `modal-container-${uuidv4()}`

const props = withDefaults(
    defineProps<{
        buttonIconSize?: number
        alignModal?: "right" | "left"
    }>(),
    {
        buttonIconSize: 16,
        alignModal: "left",
    },
)

const modalRef = ref<InstanceType<typeof ModalDialog> | null>(null)

const handleButtonClick = () => {
    if (modalRef.value == null) return
    modalRef.value.toggle()
}

const positioningValue = props.alignModal === "left" ? "absoluteAlignLeft" : "absoluteAlignRight"
</script>

<template>
    <div>
        <BaseButton color="white" variant="ghost" @click="handleButtonClick"
            ><Ellipsis :size="props.buttonIconSize"
        /></BaseButton>
        <div :id="modalContainerElementId" class="relative"></div>

        <ModalDialog
            ref="modalRef"
            :teleport-to="'#' + modalContainerElementId"
            :positioning="positioningValue"
            width="md"
            classOnBody="pb-4"
        >
            <template #header>
                <slot name="header">
                    <p class="font-medium text-center">Actions list</p>
                </slot>
            </template>

            <slot></slot>
        </ModalDialog>
    </div>
</template>
