"use client"

import dynamic from "next/dynamic";
import {useState} from "react";

import {showJavaLocalDataToYYYYMMDD} from "@/infra/time-string";
import ChipList from "@/components/base/chip/chip-list";
import {ViewItem} from "@/infra/generic-type";
import LoadingBox from "../base/loading-box";
import Footer from "../base/footer";
import MenuObserver from "../observing/menu";

import useMyTimer from "@/infra/hooks/useMyTimer";
import {PostEditStore} from "@/domain/post/store/post-edit";
import useMySnackbar from "@/infra/hooks/useMySnackbar";
import {useBlogRouter} from "@/infra/hooks/useBlogRouter";
import {useLoginStore} from "@/domain/user/hooks";
import PostModel from "@/domain/post/model/post-model";

type Props = {
    post: PostModel
}

const NoSSrPostViewer = dynamic(() => import("@/components/base/toast/viewer"), {ssr: false})


function BodyHeader({
                        title, isLogin, writerName, createdAt, updatedAt, tags,
                        onEdit, onDelete
                    }: {
    title: string,
    isLogin: boolean
    writerName: string,
    createdAt: string,
    updatedAt: string
    tags: string[],
    onDelete: () => Promise<void>,
    onEdit: () => Promise<void>
}) {
    return (
        <>
            <div className={'mb-2'}>
                <h1 className={"text-6xl text-bold"}>{title}</h1>
            </div>
            <div className={"mb-2"}>
                <span className={"text-sm"}>{writerName} </span>
                <span className={"text-sm"}>{showJavaLocalDataToYYYYMMDD(createdAt)} 작성</span>
                {createdAt !== updatedAt &&
                    <span className={"text-sm"}>{showJavaLocalDataToYYYYMMDD(updatedAt)} 수정</span>
                }
                {isLogin && <span onClick={() => onEdit()} className={"text-sm hover:cursor-pointer"}> edit</span>}
                {isLogin && <span onClick={() => onDelete()} className={"text-sm hover:cursor-pointer"}> delete</span>}

            </div>
            <div className={"mb-3"}>
                <ChipList chips={tags.map(t => new ViewItem(t, t))} blackList={["All"]}/>
            </div>

        </>
    )
}

function BodyContent({isLoaded, content}: { isLoaded: boolean, content: string }) {
    return (
        <div className={"mt-4"}>
            <div className={"min-h-[90rem]"}>
                <LoadingBox isLoaded={isLoaded} minHeight={"90rem"}>
                    <NoSSrPostViewer content={content}/>
                </LoadingBox>
            </div>
        </div>
    )
}


type PostViewerBodyProps = {
    postId: string,
    title: string,
    writerName: string,
    createdAt: string,
    updatedAt: string,
    tags: string[],
    body: string,
    isLoaded: boolean,
    isLogin: boolean,
    onEdit: (id: string) => Promise<void>,
    onDelete: (id: string) => Promise<void>
}

export function PostViewerBody(props: PostViewerBodyProps) {
    const {
        postId,
        title,
        writerName,
        createdAt,
        updatedAt,
        tags,
        body,
        isLoaded,
        isLogin
    } = props
    return (
        <div className={"flex flex-col divide-y-2"}>
            <div>
                <BodyHeader title={title}
                            writerName={writerName}
                            createdAt={createdAt}
                            updatedAt={updatedAt}
                            tags={tags}
                            isLogin={isLogin}
                            onDelete={async () => props.onDelete(postId)}
                            onEdit={async () => props.onEdit(postId)}
                />
            </div>
            <div className={"mt-1"}>
                <BodyContent content={body} isLoaded={isLoaded}/>
            </div>
        </div>
    )
}


export default function PostViewerObserver(props: Props) {
    // 일부러 지연시킴.
    const {isEndTimer} = useMyTimer({second: 1})
    const {gotoHome, gotoEditPost} = useBlogRouter()
    const [post,] = useState(props.post)
    const {loginStore} = useLoginStore()

    const [postEditStore,] = useState<PostEditStore>(new PostEditStore(props.post))
    const {upErrorSnackbar} = useMySnackbar()


    async function onDelete(postId: string) {
        try {
            const res = await postEditStore.deletePost()
            upErrorSnackbar(res)
            res.success && await gotoHome(true)
        } catch (e) {
            console.log(e)
        }
    }

    async function onEdit(postId: string) {
        await gotoEditPost(postId)
    }

    return (
        <div>
            <div>
                <MenuObserver loginStore={loginStore}/>
            </div>

            <div className={"flex pt-8 mb-[80px] min-h-[100%] h-auto"}>
                <div className={"w-[64rem] ml-auto mr-auto"}>
                    <PostViewerBody
                        postId={post.id}
                        title={post.title}
                        body={post.body}
                        tags={post.tags}
                        writerName={post.writer.writerName}
                        createdAt={post.createdAt}
                        updatedAt={post.updatedAt}
                        isLoaded={isEndTimer}
                        isLogin={loginStore.isLogin}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                </div>
            </div>

            <div>
                <Footer/>
            </div>
        </div>
    )
}

