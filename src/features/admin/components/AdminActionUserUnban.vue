<script setup lang="ts">
import type { UserDashboardEntry } from "@/features/admin/infrastructure/admin.response.dto"
import { useAdminStore } from "@/features/admin/stores/admin.store"
import BaseButton from "@/shared/components/BaseButton.vue"
import ModalDialog from "@/shared/components/ModalDialog.vue"
import { ref } from "vue"

const props = defineProps<{ user: UserDashboardEntry }>()
const adminStore = useAdminStore()

const modalRef = ref<InstanceType<typeof ModalDialog> | null>(null)

const handleModalOpen = async () => {
    modalRef.value?.open()
}

const handleUserUnban = async () => {
    await adminStore.unbanUser(props.user.id)
    modalRef.value?.close()
}
</script>
<template>
    <BaseButton color="danger" @click="handleModalOpen">Unban</BaseButton>
    <ModalDialog ref="modalRef" :withBackdrop="true">
        <template #header
            ><p class="text-center font-medium">Unban user {{ user.name }} ?</p>
        </template>

        <div class="flex flex-col gap-4">
            <p>Proceed with unbanning user {{ user.name }} ?</p>

            <BaseButton color="danger" @click="handleUserUnban">
                <p class="text-center">Unban {{ user.name }}</p>
            </BaseButton>
        </div>
    </ModalDialog>
</template>
