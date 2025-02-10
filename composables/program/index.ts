import type { Program } from '@interfaces'

const programs: Program[] = []

export const usePrograms = () => useState<Program[]>('programs', () => programs)
