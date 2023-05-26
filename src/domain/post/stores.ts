import {makeAutoObservable, flow, runInAction} from "mobx"
import postRepository from "@/domain/post/repositories";
import userRepository from "@/domain/user/repositories";
import {CustomError} from "@/infra/errors";
import {Result} from "@/infra/generic-type";


class InValidNewTag extends CustomError {
    constructor(message: string) {
        super("InValidNewTag", message);
    }
}

class NotFoundTag extends CustomError {
    constructor(tagName: string) {
        super("NotFoundTag", "해당 태그는 존재 하지 않습니다. " + tagName);
    }
}

export class PostStore {
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


    private checkNewTag(tagName: string) {
        if (tagName.length < 2) {
            throw new InValidNewTag("태그는 최소 2글자 이상만 가능합니다.")
        }
        if (tagName === 'All') {
            throw new InValidNewTag("추가할 수 없는 태그 이름 입니다.")
        }
    }

    private checkDeleteTag(tagId: string) {
        const found = this.tags.find(t => t === tagId)
        if (!found) throw new NotFoundTag(tagId)
    }

    async addTag(tagName: string): Promise<Result<null>> {
        try {
            this.checkNewTag(tagName)
            const accessKey = userRepository.getAccessKey()
            const res = await postRepository.addTag(tagName, accessKey)
            res.ok && runInAction(() => {
                this.tags.push(tagName)
            })
            return {success: true}
        } catch (e) {
            return CustomError.catchAndReturnFail(e)
        }
    }

    async deleteTag(tagName: string): Promise<Result<null>> {
        const removeTag = () => {
            this.checkDeleteTag(tagName)
            this.tags = this.tags.filter(t => t !== tagName)
        }
        try {
            this.checkDeleteTag(tagName)
            const accessKey = userRepository.getAccessKey()
            const res = await postRepository.deleteTag(tagName, accessKey)
            runInAction(removeTag)
            return {success: true, message: "태그 삭제 성공 했습니다."}
        } catch (e) {
            return CustomError.catchAndReturnFail(e)
        }
    }
}


const postStore = new PostStore()

export default postStore