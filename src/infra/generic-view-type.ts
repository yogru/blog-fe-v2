export class ViewItem {
    constructor(
        public readonly id: string,
        public readonly viewValue: string
    ) {
    }
}

export class ViewResponse {
    constructor(
        public readonly success: boolean,
    ) {
    }
}

export class MyResult<T> {
    constructor(
        public readonly success: boolean,
        public readonly data: T
    ) {
    }
}