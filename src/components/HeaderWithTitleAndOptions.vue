<script setup lang="ts"></script>

<template>
    <div class="p-4 flex flex-row gap-4 bg-gray-200 flex-none">
        <div class="flex-none">
            <!-- <p class="text-lg font-medium">{{ board.name }}</p> -->
            <slot></slot>
        </div>

        <div class="flex-auto flex justify-end">
            <!-- <ActionsDropdown></ActionsDropdown> -->
            <slot name="options"></slot>
        </div>
    </div>
</template>
