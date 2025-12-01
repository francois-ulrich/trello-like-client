import { ref } from "vue"

export function crudStore<T>() {
    const items = ref<T[]>([])

    return { items }
}
