import {makeAutoObservable, flow} from "mobx"
import postRepository from "@/domain/post/repositories";
import userRepository from "@/domain/user/repositories";



export class PostService {
    constructor(
        public id: string | null = null,
        public title: string = '',
        public body: string = '',
        public writerName: string | null = null,
        public writerEmail: string | null = null,
        public username: string | null = null,
        public createdAt: string | null = null,
        public updatedAt: string | null = null,
        public tags: string [] = [],
        public deleted: boolean = false
    ) {
        makeAutoObservable(this)
    }

    changeTitle(title: string) {
        this.title = title
    }


    addTag = flow(function* (this: PostService, tagName: string) {
        if (tagName.length < 2) {
            throw new Error("태그는 최소 2글자 이상만 가능합니다.")
        }
        if (tagName === 'All') {
            throw new Error("추가할 수 없는 태그 이름 입니다.")
        }
        try {
            const accessKey = userRepository.getAccessKey()
            const res = yield postRepository.addTag(tagName, accessKey)
            if (res.ok) {
                this.tags.push(tagName)
            }
        } catch (e) {
            throw e
        }
    })

    deleteTag = flow(function* (this: PostService, tagName: string) {
        const found = this.tags.find(t => t === tagName)
        if (!found) throw new Error("존재 하지 않는 태그 삭제 시도")
        try {
            const accessKey = userRepository.getAccessKey()
            const res = yield postRepository.deleteTag(tagName, accessKey)
            if (res.ok) {
                this.tags = this.tags.filter(t => t !== tagName)
            }
        } catch (e) {
            throw e
        }
    })

}


const postService = new PostService()

export default postService