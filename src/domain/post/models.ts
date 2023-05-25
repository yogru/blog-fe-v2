import {MyResult} from "@/infra/generic-type";

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
        if (this.id === 'All') {
            throw new Error("추가할 수 없는 태그 이름 입니다.")
        }
        return true
    }
}

export class PostModel {
    constructor(
        public id: string | null,
        public title: string,
        public body: string,
        public writer: PostUser | null,
        public username: string | null,
        public createdAt: string | null,
        public updatedAt: string | null,
        public tags: TagModel [],
        public deleted: boolean
    ) {
    }

    copy(): PostModel {
        return new PostModel(
            this.id,
            this.title,
            this.body,
            this.writer,
            this.username,
            this.createdAt,
            this.updatedAt,
            [...this.tags],
            this.deleted
        )
    }

    addTag(tag: string) {
        if (tag.length < 2) {
            throw new Error("태그는 최소 2글자 이상만 가능합니다.")
        }
        if (tag === 'All') {
            throw new Error("추가할 수 없는 태그 이름 입니다.")
        }
        const found = this.tags.find(t => t.id === tag)
        if (!found) {
            // 있으면 일단 무시
            this.tags = [...this.tags, new TagModel(tag)]
        }
    }

    static createInitialModel(): PostModel {
        return new PostModel(
            null,
            '',
            '',
            null,
            null,
            null,
            null,
            [],
            false
        )
    }
}