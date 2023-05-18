export class FailException extends Error {
    readonly detail?: string

    constructor(message: string, detail?: string) {
        super(message)
        this.detail = detail
    }
}