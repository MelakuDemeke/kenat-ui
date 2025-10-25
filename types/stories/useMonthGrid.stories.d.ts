declare namespace _default {
    export let title: string;
    export { MonthGridHarness as component };
    export namespace args {
        namespace initialOptions {
            let year: number;
            let month: number;
            let useGeez: boolean;
            let weekdayLang: string;
            let holidayFilter: never[];
        }
    }
}
export default _default;
export namespace FullCalendarView {
    export let name: string;
    export namespace args_1 {
        let showHolidayNames: boolean;
    }
    export { args_1 as args };
}
export namespace MonthYearSelector {
    let name_1: string;
    export { name_1 as name };
    export namespace args_2 {
        let showNavigation: boolean;
        let showToggles: boolean;
        let showFilters: boolean;
        let showGrid: boolean;
        let showOutputOnly: boolean;
    }
    export { args_2 as args };
}
declare function MonthGridHarness({ initialOptions, showNavigation, showSelectors, showToggles, showFilters, showGrid, showHolidayNames, showOutputOnly, }: {
    initialOptions: any;
    showNavigation?: boolean | undefined;
    showSelectors?: boolean | undefined;
    showToggles?: boolean | undefined;
    showFilters?: boolean | undefined;
    showGrid?: boolean | undefined;
    showHolidayNames?: boolean | undefined;
    showOutputOnly?: boolean | undefined;
}): any;
