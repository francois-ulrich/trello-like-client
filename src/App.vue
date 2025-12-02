<script setup lang="ts">
import BoardCard from "@/components/BoardItem.vue"
import ModalDialog from "@/components/ModalDialog.vue"
import { useBoardStore } from "@/stores/board"

const { items } = useBoardStore()
</script>

<template>
    <div>
        <BoardCard v-if="items[0]" :board="items[0]"></BoardCard>
    </div>
    <ModalDialog>
        <template #header>
            <h1>Here might be a page title</h1>
        </template>
        <p>hey</p>
    </ModalDialog>
</template>

<style scoped></style>
