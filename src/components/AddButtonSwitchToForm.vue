<script setup lang="ts">
import { ref } from "vue"
import { Plus } from "lucide-vue-next"
import BaseButton from "@/components/BaseButton.vue"
import type { ButtonsColor } from "@/types/buttonsColor"

const props = withDefaults(
    defineProps<{
        addButtonLabel: string
        buttonColor?: ButtonsColor
    }>(),
    {
        buttonColor: "white",
    },
)

const isFormOpened = ref<boolean>(false)

const handleOpenForm = () => {
    isFormOpened.value = true
}

const handleCloseForm = () => {
    isFormOpened.value = false
}
</script>

<template>
    <div>
        <BaseButton
            v-if="!isFormOpened"
            :icon="Plus"
            @click="handleOpenForm"
            :color="props.buttonColor"
            class="w-full"
            >{{ props.addButtonLabel }}</BaseButton
        >

        <slot v-else :handleClose="handleCloseForm" :addButtonLabel="props.addButtonLabel"></slot>
    </div>
</template>

<style scoped></style>
