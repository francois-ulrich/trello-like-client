<script setup lang="ts">
import { ref } from "vue"
import { Plus } from "lucide-vue-next"
import BaseButton from "@/components/util/BaseButton.vue"

const props = defineProps<{
    addButtonLabel: string
}>()

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
            color="white"
            class="w-full"
            >{{ props.addButtonLabel }}</BaseButton
        >

        <slot v-else :handleClose="handleCloseForm" :addButtonLabel="props.addButtonLabel"></slot>
    </div>
</template>

<style scoped></style>
