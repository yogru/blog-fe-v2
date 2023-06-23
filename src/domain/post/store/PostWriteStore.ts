import {makeAutoObservable, runInAction} from "mobx"
import userRepository from "@/domain/user/repositories";
import {CustomError} from "@/infra/errors";
import {Result} from "@/infra/generic-type";
import postRepository from "@/domain/post/repository/PostRepository";
import tagRepository from "@/domain/post/repository/TagRepository";


export class PostWriteStore {
    constructor(
        public id: string | null = null,
        public title: string = '',
        public tags: string [] = ["All"],
    ) {
        makeAutoObservable(this)
    }

    onChangeTitle(title: string) {
        this.title = title
    }

    async addTag(tagName: string): Promise<Result<null>> {
        const checkNewTag = (tagName: string) => {
            if (tagName.length < 2) {
                // 여기 에러 여러개 만들어야함..
                throw new InvalidNewTag("태그는 최소 2글자 이상만 가능합니다.")
            }
            if (tagName === 'All') {
                throw new InvalidNewTag("추가할 수 없는 태그 이름 입니다.")
            }
        }
        try {
            checkNewTag(tagName)
            const accessKey = userRepository.getAccessKey()
            const res = await tagRepository.addTag(tagName, accessKey)
            res.ok && runInAction(() => {
                this.tags.push(tagName)
            })
            return {success: true}
        } catch (e) {
            return CustomError.catchAndReturnFail(e)
        }
    }

    async deleteTag(tagName: string): Promise<Result<null>> {
        const checkDeleteTag = (tagId: string) => {
            const found = this.tags.find(t => t === tagId)
            if (!found) throw new NotFoundTag(tagId)
        }
        const removeTag = () => {
            checkDeleteTag(tagName)
            this.tags = this.tags.filter(t => t !== tagName)
        }
        try {
            checkDeleteTag(tagName)
            const accessKey = userRepository.getAccessKey()
            await tagRepository.deleteTag(tagName, accessKey)
            runInAction(removeTag)
            return {success: true, message: "태그 삭제 성공 했습니다."}
        } catch (e) {
            return CustomError.catchAndReturnFail(e)
        }
    }

    async post(content: string): Promise<Result<null>> {
        const checkContent = () => {
            if (!content || content.length < 2) {
                throw new ContentTooShortError()
            }
        }
        const checkTitle = () => {
            if (!this.title || this.title.length < 2) {
                throw new TitleTooShortError()
            }
        }
        try {
            checkContent()
            checkTitle()
            const accessKey = userRepository.getAccessKey()
            await postRepository.createPost({
                body: content,
                title: this.title,
                tags: this.tags,
                deleted: false
            }, accessKey)
            return {success: true}
        } catch (e) {
            return CustomError.catchAndReturnFail(e)
        }
    }
}


// errors
class InvalidNewTag extends CustomError {
    constructor(message: string) {
        super("InvalidNewTag", message);
    }
}

class NotFoundTag extends CustomError {
    constructor(tagName: string) {
        super("NotFoundTag", "해당 태그는 존재 하지 않습니다. " + tagName);
    }
}

class ContentTooShortError extends CustomError {
    constructor() {
        super("ContentTooShortError", "에디터의 본문 내용이 최소 2글자 이상 되어야 합니다.");
    }
}

class TitleTooShortError extends CustomError {
    constructor() {
        super("TitleTooShortError", "제목의 길이가 2글자 이상 되어야 합니다.");
    }
}