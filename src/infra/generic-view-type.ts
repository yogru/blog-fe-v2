export interface ViewItem {
    id: string
    viewValue: string
}


export class ViewResponse {
    constructor(
        public readonly success: boolean,
        public readonly errorMessage?: string
    ) {
    }
}