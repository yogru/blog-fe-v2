class PostUser {
    constructor(
        public readonly writerName: String,
        public readonly writerEmail: String
    ) {}
}

class PostModel {
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
    ) {}
}