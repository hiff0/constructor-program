export interface Element {
    key: string;
    name: string;
    title: string;
}

type DifficultLvl = '1' | '2' | '3' | '4' | 'B';

export type DefaultDifficultLvls = {
    [key in DifficultLvl]?: {
        baseCost: number;
    }
}

// ---------------------------- Jumps ------------------------------------

type JumpDifficultLvl = '1' | '2' | '3' | '4';
type JumpsKeys = 'T' | 'S' | 'Lo' | 'Eu' | 'F' | 'Lz' | 'A';

export type JumpsDifficultLvls = {
    [key in JumpDifficultLvl]?: {
        baseCost: number;
    }
}

export interface Jump extends Element {
    key: JumpsKeys;
    name: JumpsKeys;
    difficultLvls: JumpsDifficultLvls;
}

// ---------------------------- Track ------------------------------------

export interface Track extends Element {
    difficultLvls: DefaultDifficultLvls,
}

// ---------------------------- Spin ------------------------------------

export interface Spin extends Element {
    difficultLvls: DefaultDifficultLvls,
}

export type ElementView = Jump | Track | Spin;
export type ElementTableView = ElementView & {
    fullname: string;
    lvlName: string;
    timeExecute: string;
    draggebleDom?: HTMLElement;
    isInIce: boolean;
    startTime: number;
    endTime: number;
}

// ---------------------------- Auth ------------------------------------

export interface Auth {
    isAuthenticated: boolean;
}

// ---------------------------- Step Sequence ------------------------------------

export interface StepSequence {
    x0: number;
    y0: number;
    x1: number;
    y1: number;

    cx1: number;
    cy1: number;
    cx2: number;
    cy2: number;

    from: HTMLElement;
    to: HTMLElement;

    id: number;
}

// ---------------------------- Audio ------------------------------------

export interface AudioMetaData {
    audioName: string;
    audioUrl: string;
    duration: number;
    currentPlayerTime;
    audioDom: HTMLMediaElement;
}

export interface CurrentThreeElements {
    currentElement: ElementTableView | null;
    nextElement: ElementTableView | null;
    prevElement: ElementTableView | null;
}
