import type { Element } from '~/interfaces'

// TODO: вернуть объединение всех элементов, если это необходимо
const elements: Element[] = []

export { useTracks } from '@/composables/stores/elements/tracks'
export { useJumps } from '@/composables/stores/elements/jumps'
export { useSpins } from '@/composables/stores/elements/spins'
export const useElements = () => useState<Element[]>('elements', () => elements)
