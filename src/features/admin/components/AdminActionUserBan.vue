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

const handleUserBan = async () => {
    await adminStore.banUser(props.user.id)
    modalRef.value?.close()
}
</script>
<template>
    <BaseButton color="danger" @click="handleModalOpen">Ban</BaseButton>
    <ModalDialog ref="modalRef" :withBackdrop="true">
        <template #header
            ><p class="text-center font-medium">Ban user {{ user.name }} ?</p>
        </template>

        <div class="flex flex-col gap-4">
            <p>Proceed with banning user {{ user.name }} ?</p>
            <p>You can unban any user at any time.</p>

            <BaseButton color="danger" @click="handleUserBan">
                <p class="text-center">Ban {{ user.name }}</p>
            </BaseButton>
        </div>
    </ModalDialog>
</template>
