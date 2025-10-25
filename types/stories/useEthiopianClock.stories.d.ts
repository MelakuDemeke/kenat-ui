declare namespace _default {
    export let title: string;
    export { ClockHarness as component };
}
export default _default;
export namespace DigitalClock {
    namespace args {
        let showDigital: boolean;
        let showAnalog: boolean;
    }
    namespace parameters {
        namespace docs {
            namespace description {
                let story: string;
            }
        }
    }
}
export namespace AnalogClock {
    export namespace args_1 {
        let showDigital_1: boolean;
        export { showDigital_1 as showDigital };
        let showAnalog_1: boolean;
        export { showAnalog_1 as showAnalog };
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
export namespace CombinedDisplay {
    export let name: string;
    export namespace args_2 {
        let showDigital_2: boolean;
        export { showDigital_2 as showDigital };
        let showAnalog_2: boolean;
        export { showAnalog_2 as showAnalog };
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
declare function ClockHarness({ showDigital, showAnalog }: {
    showDigital?: boolean | undefined;
    showAnalog?: boolean | undefined;
}): any;
