
declare global {
    declare type Task = {
        name: string,
        type: 'normal' | 'important' | 'spiritual',
        state: "done" | "no done" | "job/occupied",
    }
}