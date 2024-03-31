import type { ElementTableView, StepSequencePos, AudioMetaData } from '@/interfaces'

const elements: ElementTableView[] = []
const currentDraggableElement: HTMLElement | null = null
const isConstructorEditable: boolean = true
const stepSequence: StepSequencePos[] = []
const audioMetaData: AudioMetaData = {}
const lastElementStartTime: number = 0
const programName: string = ''

export const useTableElements = () => useState<ElementTableView[]>('elements', () => elements)
export const useCurrentDraggableElement = () => useState<HTMLElement | null>('currentDraggable', () => currentDraggableElement)
export const useIsConstructorEditable = () => useState<boolean>('isConstructorEditable', () => isConstructorEditable)
export const useStepSequence = () => useState<StepSequencePos[]>('stepSequence', () => stepSequence)
export const useAudioMetaData = () => useState<AudioMetaData>('audioMetaData', () => audioMetaData)
export const useLastElementStartTime = () => useState<number>('lastElementStartTime', () => lastElementStartTime)
export const useProgramName = () => useState<string>('programName', () => programName)
