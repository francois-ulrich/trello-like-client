import type { Repository } from "@/shared/models"
import { ref, type Ref } from "vue"

export function crudStore<T extends { id: number }, TCreateDTO, TUpdateDTO>(
    api: Repository<T, TCreateDTO, TUpdateDTO>,
) {
    const items = ref<T[]>([]) as Ref<T[]>

    async function getAll() {
        const res = await api.getAll()
        items.value = res.data
    }

    function get(id: number) {
        return items.value.find((i) => i.id === id)
    }

    // function create(item: Omit<T, "id">): T {
    //     const newItem = { ...item } as T
    //     items.value.push(newItem)
    //     return newItem
    // }

    // function update(updatedItem: T) {
    //     const index = items.value.findIndex((i) => i.id === updatedItem.id)
    //     if (index !== -1) items.value[index] = updatedItem
    // }

    // function remove(id: T["id"]) {
    //     items.value = items.value.filter((i) => i.id !== id)
    // }

    // function removeWhere(predicate: (item: T) => boolean) {
    //     items.value = items.value.filter((i) => !predicate(i))
    // }

    // return { items, getAll, get, create, update, remove, removeWhere }
    return { items, getAll, get }
}
