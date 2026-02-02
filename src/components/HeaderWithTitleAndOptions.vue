<script setup lang="ts"></script>

<template>
    <div class="flex flex-row gap-4 flex-none items-center w-full">
        <div class="flex-none">
            <slot></slot>
        </div>

        <div class="flex-auto flex justify-end">
            <slot name="options"></slot>
        </div>
    </div>
</template>
