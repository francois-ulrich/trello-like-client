<script setup lang="ts">
import BaseButton from "@/components/util/BaseButton.vue"
import TextInput from "@/components/util/form/TextInput.vue"
import { X } from "lucide-vue-next"
import { ref } from "vue"

const cardNameInput = ref<string>("")

const onSubmit = () => {
    console.log(cardNameInput)
}
</script>

<template>
    <form @submit.prevent="onSubmit" class="flex flex-col gap-2">
        <TextInput id="cardName" label="Name" v-model="cardNameInput" :hide-label="true" />

        <div class="flex flex-row">
            <BaseButton>Add card</BaseButton>
            <BaseButton :icon="X"></BaseButton>
        </div>
    </form>
</template>

<style scoped></style>
