<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue"
import RoundedCard from "@/components/RoundedCard.vue"
import useModal from "@/composables/useModal"
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap"
import { X } from "lucide-vue-next"
import { v4 as uuidv4 } from "uuid"
import { nextTick, useTemplateRef, watch } from "vue"

const { openModal, closeModal, isModalOpen } = useModal()
const modalId = `modal-${uuidv4()}`
const rootElementRef = useTemplateRef("rootElementRef")

type ModalSizes = "xl" | "lg" | "md" | "sm"

const focusTrap = useFocusTrap(rootElementRef, {
    allowOutsideClick: true,
    returnFocusOnDeactivate: false,
})

const props = withDefaults(
    defineProps<{
        withBackdrop?: boolean
        positioning?: "screenCenter" | "absolute" | "absoluteAlignRight" | "absoluteAlignLeft"
        width?: "xl" | "lg" | "md" | "sm"
        classOnBody?: string
        teleportTo?: string
    }>(),
    {
        withBackdrop: false,
        positioning: "screenCenter",
        width: "md",
        classOnBody: "p-4",
        teleportTo: "body",
    },
)

const { positioning, width } = props

const positioningClassesOptions = {
    screenCenter: "fixed top-1/2 left-1/2 -translate-1/2",
    absolute: "absolute",
    absoluteAlignRight: "absolute right-0! left-auto!",
    absoluteAlignLeft: "absolute left-0! right-auto!",
}

const positioningClasses = positioningClassesOptions[positioning]

const getWidthClass = (size: ModalSizes): string => {
    switch (size) {
        case "xl":
            return "w-xl"
        case "lg":
            return "w-lg"
        case "md":
            return "w-md"
        case "sm":
            return "w-sm"
        default:
            return ""
    }
}

const widthClass = getWidthClass(width)

const classes = [widthClass, positioningClasses].join(" ")

const emit = defineEmits<{
    (e: "close"): void
}>()

const open = () => {
    openModal(modalId)
}

const close = () => {
    closeModal()
    emit("close")
}

const toggle = () => {
    if (isModalOpen(modalId) === true) {
        close()
    } else {
        open()
    }
}

watch(
    () => isModalOpen(modalId),
    async (open) => {
        if (open) {
            await nextTick()
            focusTrap.activate()
        } else {
            focusTrap.deactivate()
            await nextTick()
        }
    },
)

defineExpose({
    open,
    close,
    toggle,
})
</script>

<template>
    <div>
        <Teleport :to="teleportTo" v-if="isModalOpen(modalId)">
            <div
                v-if="props.withBackdrop"
                @click="close"
                class="fixed top-0 left-0 w-full h-full bg-black opacity-50 cursor-pointer z-10"
            ></div>

            <div ref="rootElementRef">
                <RoundedCard
                    class="z-20 bg-gray-50 p-0! divide-gray-400"
                    :class="classes"
                    @keydown.esc="close"
                    v-if="isModalOpen(modalId)"
                >
                    <div class="relative">
                        <div>
                            <header class="p-4">
                                <BaseButton
                                    @click="close"
                                    color="white"
                                    class="absolute top-3 right-3 group-hover:opacity-100 cursor-pointer color rounded-full!"
                                >
                                    <X :size="18" />
                                </BaseButton>
                                <slot name="header"></slot>
                            </header>
                            <main :class="classOnBody">
                                <slot></slot>
                            </main>
                        </div>
                    </div>
                </RoundedCard>
            </div>
        </Teleport>
    </div>
</template>
