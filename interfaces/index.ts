export interface Element {
    readonly key: string;
    readonly name: string;
    readonly title: string;
}

type DifficultLvl = '1' | '2' | '3' | '4' | 'B';

export type DefaultDifficultLvls = {
    [key in DifficultLvl]?: {
        readonly baseCost: number;
    }
}

// ---------------------------- Jumps ------------------------------------

type JumpDifficultLvl = '1' | '2' | '3' | '4';
type JumpsKeys = 'T' | 'S' | 'Lo' | 'Eu' | 'F' | 'Lz' | 'A';

export type JumpsDifficultLvls = {
    [key in JumpDifficultLvl]?: {
        readonly baseCost: number;
    }
}

export interface Jump extends Element {
    readonly key: JumpsKeys;
    readonly name: JumpsKeys;
    readonly difficultLvls: JumpsDifficultLvls;
}

// ---------------------------- Track ------------------------------------

export interface Track extends Element {
    readonly difficultLvls: DefaultDifficultLvls,
}

// ---------------------------- Spin ------------------------------------

export interface Spin extends Element {
    readonly difficultLvls: DefaultDifficultLvls,
}

// ---------------------------- Step Sequence ------------------------------------

export interface StartPoint {
    x0: number;
    y0: number;
}

export interface QuadraticCurvePos {
    cpx: number;
    cpy: number;
    x: number;
    y: number;
}

export interface StepSequencePos {
    startPos: StartPoint;
    quadraticCurvePos: QuadraticCurvePos;
    toIndex: number;
    d: string;
}

// ---------------------------- Element in Table and Canvas ------------------------------------

export type ElementView = Jump | Track | Spin;
export type ElementTableView = ElementView & {
    fullname: string;
    lvlName: string;
    timeExecute: string;
    draggebleDom?: HTMLElement;

    startTime: number;
    endTime: number;

    xCenter?: number;
    yCenter?: number;
    x?: number;
    y?: number;
    cpx?: number;
    cpy?: number;

    isShow?: boolean;
    isInIce: boolean;
}

// ---------------------------- Auth ------------------------------------

export interface Auth {
    isAuthenticated: boolean;
}

// ---------------------------- Audio ------------------------------------

export interface AudioMetaData {
    audioName: string;
    audioUrl: string;
    duration: number;
    currentPlayerTime: number;
    audioDom: HTMLMediaElement;
    audioAnalyser: AnalyserNode;
}
