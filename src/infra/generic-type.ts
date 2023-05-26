export class ViewItem {
    constructor(
        public readonly id: string,
        public readonly viewValue: string
    ) {
    }
}

export type FailResult = {
    success: false,
    errorMessage: string
}

export type SuccessResult<T> = {
    success: true,
    message?: string
    data?: T
}

export type Result<T> = FailResult | SuccessResult<T>