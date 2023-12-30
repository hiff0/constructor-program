import type { Spin } from '~/interfaces'

const spins: Spin[] = [
    {
        key: 'USp',
        name: 'USp',
        title: 'Вращение стоя',
        difficultLvls: {
            B: {
                baseCost: 1
            },
            1: {
                baseCost: 1.2
            },
            2: {
                baseCost: 1.5
            },
            3: {
                baseCost: 1.9
            },
            4: {
                baseCost: 2.4
            }
        }
    },
    {
        key: 'SSp',
        name: 'SSp',
        title: 'Вращение сидя',
        difficultLvls: {
            B: {
                baseCost: 1.1
            },
            1: {
                baseCost: 1.3
            },
            2: {
                baseCost: 1.6
            },
            3: {
                baseCost: 2.1
            },
            4: {
                baseCost: 2.5
            }
        }
    },
    {
        key: 'CSp',
        name: 'CSp',
        title: 'Вращение Либила',
        difficultLvls: {
            B: {
                baseCost: 1.1
            },
            1: {
                baseCost: 1.4
            },
            2: {
                baseCost: 1.8
            },
            3: {
                baseCost: 2.3
            },
            4: {
                baseCost: 2.6
            }
        }
    },
    {
        key: 'LSp',
        name: 'LSp',
        title: 'Вращение Заклон',
        difficultLvls: {
            B: {
                baseCost: 1.2
            },
            1: {
                baseCost: 1.5
            },
            2: {
                baseCost: 1.9
            },
            3: {
                baseCost: 2.4
            },
            4: {
                baseCost: 2.7
            }
        }
    },
    {
        key: 'CoSp',
        name: 'CoSp',
        title: 'Комбинированное вращение',
        difficultLvls: {
            B: {
                baseCost: 1.5
            },
            1: {
                baseCost: 1.7
            },
            2: {
                baseCost: 2
            },
            3: {
                baseCost: 2.5
            },
            4: {
                baseCost: 3
            }
        }
    }
]

export const useSpins = () => useState<Spin[]>('spins', () => spins)
