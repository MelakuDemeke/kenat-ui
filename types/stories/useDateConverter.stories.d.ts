declare namespace _default {
    export let title: string;
    export { DateConverterHarness as component };
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
export namespace WithInvalidDate {
    export namespace args_1 {
        namespace initialDate {
            namespace ec {
                let year: number;
                let month: number;
                let day: number;
            }
        }
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
declare function DateConverterHarness(initialDate: any): any;
