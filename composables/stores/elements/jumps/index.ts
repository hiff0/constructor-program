import type { Jump } from '~/interfaces'

const jumps: Jump[] = [
    {
        key: 'T',
        name: 'T',
        title: 'Тулуп',
        difficultLvls: {
            1: {
                baseCost: 0.4
            },
            2: {
                baseCost: 1.3
            },
            3: {
                baseCost: 4.2
            },
            4: {
                baseCost: 9.5
            }
        }
    },
    {
        key: 'S',
        name: 'S',
        title: 'Сальхов',
        difficultLvls: {
            1: {
                baseCost: 0.4
            },
            2: {
                baseCost: 1.3
            },
            3: {
                baseCost: 4.3
            },
            4: {
                baseCost: 9.7
            }
        }
    },
    {
        key: 'Lo',
        name: 'Lo',
        title: 'Риттбергер',
        difficultLvls: {
            1: {
                baseCost: 0.5
            },
            2: {
                baseCost: 1.7
            },
            3: {
                baseCost: 4.9
            },
            4: {
                baseCost: 10.5
            }
        }
    },
    {
        key: 'Eu',
        name: 'Eu',
        title: 'Ойлер',
        difficultLvls: {
            1: {
                baseCost: 0.5
            }
        }
    },
    {
        key: 'F',
        name: 'F',
        title: 'Флип',
        difficultLvls: {
            1: {
                baseCost: 0.5
            },
            2: {
                baseCost: 1.8
            },
            3: {
                baseCost: 5.3
            },
            4: {
                baseCost: 11
            }
        }
    },
    {
        key: 'Lz',
        name: 'Lz',
        title: 'Лутц',
        difficultLvls: {
            1: {
                baseCost: 0.6
            },
            2: {
                baseCost: 2.1
            },
            3: {
                baseCost: 5.9
            },
            4: {
                baseCost: 11.5
            }
        }
    },
    {
        key: 'A',
        name: 'A',
        title: 'Аксель',
        difficultLvls: {
            1: {
                baseCost: 1.1
            },
            2: {
                baseCost: 3.3
            },
            3: {
                baseCost: 8
            },
            4: {
                baseCost: 12.5
            }
        }
    }
] as const
// WARNING: Проверить как работает as const, можно ли будет изменить прыжки
// И нужно ли использовать его или достаточно использовать readonly

export const useJumps = () => useState<Jump[]>('jumps', () => jumps)
