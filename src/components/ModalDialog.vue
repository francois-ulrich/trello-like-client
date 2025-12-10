<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue"
import RoundedCard from "@/components/RoundedCard.vue"
import { X } from "lucide-vue-next"

type ModalSizes = "xl" | "lg" | "md" | "sm"

const props = withDefaults(
    defineProps<{
        withBackdrop?: boolean
        positioning?: "screenCenter" | "absolute" | "absoluteAlignRight"
        width?: "xl" | "lg" | "md" | "sm"
    }>(),
    {
        withBackdrop: false,
        positioning: "screenCenter",
        width: "md",
    },
)

const { positioning, width } = props

const positioningClassesOptions = {
    screenCenter: "fixed top-1/2 left-1/2 -translate-1/2",
    absolute: "absolute",
    absoluteAlignRight: "absolute right-0! left-auto!",
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

const handleClose = () => {
    emit("close")
}
</script>

<template>
    <div
        v-if="props.withBackdrop"
        @click="handleClose"
        class="fixed top-0 left-0 w-full h-full bg-black opacity-50 cursor-pointer z-10"
    ></div>
    <RoundedCard class="z-20 bg-gray-50 p-0! divide-gray-400" :class="classes">
        <div class="relative">
            <header class="p-4">
                <BaseButton
                    @click="handleClose"
                    color="white"
                    class="absolute top-3 right-3 group-hover:opacity-100 cursor-pointer color rounded-full!"
                >
                    <X :size="18" />
                </BaseButton>
                <slot name="header"></slot>
            </header>
            <main class="p-6">
                <slot></slot>
            </main>
        </div>
    </RoundedCard>
</template>
