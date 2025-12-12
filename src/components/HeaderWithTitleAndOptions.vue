<script setup lang="ts"></script>

<template>
    <div class="flex flex-row gap-4 bg-gray-200 flex-none items-center">
        <div class="flex-none">
            <slot></slot>
        </div>

        <div class="flex-auto flex justify-end">
            <slot name="options"></slot>
        </div>
    </div>
</template>
