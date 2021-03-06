declare interface Math {
    round(number: number): number;
    ceil(number: number): number;
    floor(number: number): number;
    exp(number: number): number;
    log(number: number): number;
    pow(number: number, exponent?: number): number;
    E: number;
    LN10: number;
    LN2: number;
    LOG2E: number;
    LOG10E: number;
    PI: number;
    SQRT1_2: number;
    SQRT1_2: number;
    abs(number: number): number;
    acos(number: number): number;
    asin(number: number): number;
    atan(number: number): number;
    atan2(x: number, y: number): number;
    cos(number: number): number;
    max(...numbers: Array<number>): number;
    min(...numbers: Array<number>): number;
    random(): number;
    sin(number: number): number;
    sqrt(number: number): number;
    tan(number: number): number;

}
declare interface console {
    log(...messages: string[]): void;
}
declare class Array<T> {
    length: number;
    toString(): string;
    push(...elements: Array<T>[]): void;
    pop(): T;
    concat(array: Array<T>): Array<T>;
    join(separator: string): string;
    reverse(): Array<T>;
    shift(): T;
    slice(start: number, end: number): Array<T>;
    sort(predicate: (a: T, b: T) => number): Array<T>;
    splice(start: number, deleteCount: number): Array<T>;
    unshift(...elements: Array<T>): Array<T>;
    indexOf(element: T): number;
    lastIndexOf(element: T): number;
    every(predicate: (value: T, index: number, array: Array<T>) => boolean): boolean;
    some(predicate: (value: T, index: number, array: Array<T>) => boolean): boolean;
    forEach(predicate: (value: T, index: number, array: Array<T>) => void): void;
    reduce(predicate: (sum: number, element: T) => number): number;
}