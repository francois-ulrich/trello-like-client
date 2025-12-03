import { ref, type Ref } from "vue"
import { v4 as uuidv4 } from "uuid"

export function crudStore<T extends { id: string }>() {
    const items = ref<T[]>([]) as Ref<T[]>

    function create(item: Omit<T, "id">) {
        const itemId = uuidv4()
        items.value.push({ ...item, id: itemId } as T)
    }

    function get(id: T["id"]) {
        return items.value.find((i) => i.id === id)
    }

    function update(updatedItem: T) {
        const index = items.value.findIndex((i) => i.id === updatedItem.id)
        if (index !== -1) items.value[index] = updatedItem
    }

    function remove(id: T["id"]) {
        items.value = items.value.filter((i) => i.id !== id)
    }

    return { items, create, get, update, remove }
}
