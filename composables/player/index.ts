const currentPlayerTime: number = 0

export const useCurrentPlayerTime = () => useState<number>('currentPlayerTime', () => currentPlayerTime)
