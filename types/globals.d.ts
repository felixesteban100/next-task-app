
declare global {
    declare type Task = {
        name: string,
        type: 'normal' | 'important' | 'spiritual',
        state: "done" | "no done" | "occupied",
    }
}