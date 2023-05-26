import {FailResult} from "@/infra/generic-type";

type ErrorLanguage = "ko" | "en"

export interface CustomErrorInterface {
    readonly kind: string,
    readonly defaultMessage: string
    getMessage: (lang?: ErrorLanguage) => string
    // catch: <T extends CustomErrorInterface> (e: unknown, fn: (error: T) => void) => void
    // catchAsync: <T extends CustomErrorInterface>(e: unknown, fn: (error: T) => Promise<void>) => Promise<void>
}


export class CustomError extends Error implements CustomErrorInterface {
    constructor(
        public readonly kind: string,
        public readonly defaultMessage: string) {
        super(defaultMessage);
    }

    getMessage(lang: ErrorLanguage = 'ko'): string {
        return this.defaultMessage
    }

    static catch<T extends CustomErrorInterface, U>(e: unknown, fn: (err: T) => U): U {
        const error = e as CustomErrorInterface
        if (error && error.kind && error.defaultMessage) {
            return fn(error as T)
        }
        throw e
    }

    static catchAndReturnFail<T extends CustomErrorInterface>(e: unknown): FailResult {
        const error = e as CustomErrorInterface
        if (error && error.kind && error.defaultMessage) {
            return {success: false, errorMessage: error.getMessage()!!}
        }
        throw e
    }
}


export class EnvironmentError extends CustomError {
    constructor() {
        super("EnvironmentError", "잘못된 환경에서 호출 된 로직");
    }
}

