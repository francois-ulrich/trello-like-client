import { ref } from "vue"

const currentModal = ref<string | null>(null)
const previousModal = ref<string | null>(null)

const openModal = (name: string) => {
    closeModal()
    currentModal.value = name
    previousModal.value = name
}

const closeModal = () => {
    currentModal.value = null
}

const isModalOpen = (name: string) => {
    return currentModal.value === name
}

export default function useModal() {
    return {
        currentModal,
        openModal,
        closeModal,
        isModalOpen,
    }
}
