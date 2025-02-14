const isMobile = false

export const useIsMobile = () => useState<boolean>('isMobile', () => isMobile)
