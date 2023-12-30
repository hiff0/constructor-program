import type { Track } from '~/interfaces'

const tracks: Track[] = [
    {
        key: 'StSq',
        name: 'StSq',
        title: 'Дорожка шагов базовый уровень',
        difficultLvls: {
            B: {
                baseCost: 1.5
            },
            1: {
                baseCost: 1.8
            },
            2: {
                baseCost: 2.6
            },
            3: {
                baseCost: 3.3
            },
            4: {
                baseCost: 3.9
            }
        }
    },
    {
        key: 'ChSq',
        name: 'ChSq',
        title: 'Хореографическая последовательность',
        difficultLvls: {
            1: {
                baseCost: 3
            }
        }
    }
]

export const useTracks = () => useState<Track[]>('tracks', () => tracks)
