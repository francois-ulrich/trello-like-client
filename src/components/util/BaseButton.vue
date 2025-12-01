<script setup lang="ts">
import { useSlots, type Component } from "vue"

const colorClasses: Record<string, Record<string, string>> = {
    primary: {
        solid: "bg-blue-600 text-white hover:bg-blue-700",
        outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
        ghost: "text-blue-600 hover:bg-blue-50",
    },
    secondary: {
        solid: "bg-gray-600 text-white hover:bg-gray-700",
        outline: "border border-gray-600 text-gray-600 hover:bg-gray-50",
        ghost: "text-gray-700 hover:bg-gray-100",
    },
    danger: {
        solid: "bg-red-600 text-white hover:bg-red-700",
        outline: "border border-red-600 text-red-600 hover:bg-red-50",
        ghost: "text-red-600 hover:bg-red-50",
    },
    success: {
        solid: "bg-green-600 text-white hover:bg-green-700",
        outline: "border border-green-600 text-green-600 hover:bg-green-50",
        ghost: "text-green-600 hover:bg-green-50",
    },
    neutral: {
        solid: "bg-gray-200 text-gray-800 hover:bg-gray-300",
        outline: "border border-gray-300 text-gray-800 hover:bg-gray-100",
        ghost: "text-gray-800 hover:bg-gray-200",
    },
    lightgray: {
        solid: "bg-gray-200 hover:bg-gray-400 text-black",
        outline: "border border-gray-300 text-gray-800 hover:bg-gray-100",
        ghost: "text-gray-800 hover:bg-gray-200",
    },
}

const props = withDefaults(
    defineProps<{
        icon?: Component
        type?: "button" | "submit"
        as?: "button" | "a"
        color?: "primary" | "secondary" | "danger" | "success" | "neutral" | "lightgray"
        variant?: "solid" | "outline" | "ghost"
    }>(),
    {
        as: "button",
        variant: "solid",
        type: "button",
        color: "primary",
    },
)

const { color, variant } = props

const classes = colorClasses[color]?.[variant] ?? ""

const emit = defineEmits<{
    (e: "click"): void
}>()

const onClick = () => {
    emit("click")
}
</script>

<template>
    <component
        :is="props.as"
        @click="onClick"
        class="p-2 cursor-pointer text-left flex flex-row transition-colors rounded-md"
        :class="classes"
    >
        <component
            v-if="icon !== undefined"
            :is="icon"
            :class="{ 'mr-2': !!useSlots().default?.() }"
        />
        <span>
            <slot></slot>
        </span>
    </component>
</template>
