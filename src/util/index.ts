export function find<T>(arr: T[], pred: (val: T) => boolean): T {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        if (pred(arr[i])) { return arr[i] }
    }
    return undefined;
}