import type { SortableEvent } from "sortablejs"

/**
 * Évènement @change émis par vue.draggable.next
 * T correspond au type des éléments (ex: Card, Column)
 */

export type DraggableChangeEventPayloadAdded<T> = {
    element: T
    newIndex: number
    oldIndex?: number
}

export type DraggableChangeEventPayloadMoved<T> = { element: T; oldIndex: number; newIndex: number }

export type DraggableChangeEventAdded<T> = {
    type: "added"
    added: DraggableChangeEventPayloadAdded<T>
    removed?: undefined
    moved?: undefined
    originalEvent?: SortableEvent
}

export type DraggableChangeEventMoved<T> = {
    type: "moved"
    moved: DraggableChangeEventPayloadMoved<T>
    added?: undefined
    removed?: undefined
    originalEvent?: SortableEvent
}

export type DraggableChangeEvent<T> =
    | DraggableChangeEventAdded<T>
    | DraggableChangeEventMoved<T>
    | {
          type: "removed"
          removed: { element: T; oldIndex: number }
          added?: undefined
          moved?: undefined
          originalEvent?: SortableEvent
      }
    | {
          /** autres events natifs : updated, chosen, unchoose... */
          type: string
          added?: undefined
          removed?: undefined
          moved?: undefined
          originalEvent?: SortableEvent
      }
