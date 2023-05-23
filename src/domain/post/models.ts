import {MyResult} from "@/infra/generic-view-type";

export class PostUser {
    constructor(
        public readonly writerName: String,
        public readonly writerEmail: String
    ) {
    }
}


export class TagModel {
    constructor(
        public readonly id: string
    ) {
    }

    isValid(): boolean {
        if (this.id.length < 2) {
            throw new Error("태그는 최소 2글자 이상만 가능합니다.")
        }
        if(this.id ==='All'){
            throw new Error("추가할 수 없는 태그 이름 입니다.")
        }
        return true
    }
}

export class PostModel {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly body: string,
        public readonly writer: PostUser,
        public readonly username: string,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly tags: string [],
        public readonly deleted: boolean
    ) {
    }
}