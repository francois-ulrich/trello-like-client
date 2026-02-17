import { ref, type Ref } from "vue"

export function crudStore<T extends { id: number }>() {
    const items = ref<T[]>([]) as Ref<T[]>

    function create(item: Omit<T, "id">): T {
        const newItem = { ...item } as T
        items.value.push(newItem)
        return newItem
    }

    function get(id: number) {
        return items.value.find((i) => i.id === id)
    }

    function update(updatedItem: T) {
        const index = items.value.findIndex((i) => i.id === updatedItem.id)
        if (index !== -1) items.value[index] = updatedItem
    }

    function remove(id: T["id"]) {
        items.value = items.value.filter((i) => i.id !== id)
    }

    function removeWhere(predicate: (item: T) => boolean) {
        items.value = items.value.filter((i) => !predicate(i))
    }

    return { items, create, get, update, remove, removeWhere }
}
