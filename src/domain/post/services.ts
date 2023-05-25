import {makeAutoObservable, observable, computed, action, flow} from "mobx"
import {PostModel, TagModel} from "@/domain/post/models";
import postRepository from "@/domain/post/repositories";
import userRepository from "@/domain/user/repositories";
import {ViewItem} from "@/infra/generic-type";


export class PostService {
    post: PostModel

    constructor() {
        makeAutoObservable(this, {
            post: observable,
            addTag: flow,
            changeTitle: action,
        })
        this.post = PostModel.createInitialModel()
    }

    changeTitle(title: string) {
        this.post.title = title
    }

    tags(): ViewItem[] {
        return this.post.tags.map(t => new ViewItem(t.id, t.id))
    }


    addTag = flow(function* (this: PostService, tagName: string) {
        try {
            const accessKey = userRepository.getAccessKey()
            const res = yield postRepository.addTag(new TagModel(tagName), accessKey)
            res.ok && this.post.addTag(tagName)
        } catch (e) {
            throw e
        }
    })

}


const postService = new PostService()

export default postService