declare namespace _default {
    export let title: string;
    export { DatePickerHarness as component };
}
export default _default;
export namespace Default {
    let args: {};
    namespace parameters {
        namespace docs {
            namespace description {
                let story: string;
            }
        }
    }
}
export namespace WithGeez {
    export namespace args_1 {
        let useGeez: boolean;
    }
    export { args_1 as args };
    export namespace parameters_1 {
        export namespace docs_1 {
            export namespace description_1 {
                let story_1: string;
                export { story_1 as story };
            }
            export { description_1 as description };
        }
        export { docs_1 as docs };
    }
    export { parameters_1 as parameters };
}
export namespace WithInitialDate {
    export namespace args_2 {
        namespace initialDate {
            let year: number;
            let month: number;
            let day: number;
        }
    }
    export { args_2 as args };
    export namespace parameters_2 {
        export namespace docs_2 {
            export namespace description_2 {
                let story_2: string;
                export { story_2 as story };
            }
            export { description_2 as description };
        }
        export { docs_2 as docs };
    }
    export { parameters_2 as parameters };
}
declare function DatePickerHarness(options: any): any;
