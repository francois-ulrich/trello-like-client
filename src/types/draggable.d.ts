import type { SortableEvent } from "sortablejs"

/**
 * Évènement @change émis par vue.draggable.next
 * T correspond au type des éléments (ex: Card, Column)
 */
export type DraggableChangeEvent<T> =
    | {
          type: "added"
          added: { element: T; newIndex: number; oldIndex?: number }
          removed?: undefined
          moved?: undefined
          originalEvent?: SortableEvent
      }
    | {
          type: "removed"
          removed: { element: T; oldIndex: number }
          added?: undefined
          moved?: undefined
          originalEvent?: SortableEvent
      }
    | {
          type: "moved"
          moved: { element: T; oldIndex: number; newIndex: number }
          added?: undefined
          removed?: undefined
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
