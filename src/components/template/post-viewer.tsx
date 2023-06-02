"use client"
import dynamic from "next/dynamic";
import {useEffect, useState} from "react";

import {PostModel} from "@/domain/post/repositories";
import ToastViewer from "@/components/base/toast/viewer";
import {showJavaLocalDataToYYYYMMDD} from "@/infra/time-string";
import ChipList from "@/components/base/chip/chip-list";
import {ViewItem} from "@/infra/generic-type";
import LoadingBox from "../base/loading-box";
import Footer from "../base/footer";
import MenuObserver from "../observing/menu";
import useClientSide from "@/infra/hooks/useClientSide";
import useMyTimer from "@/infra/hooks/useMyTimer";


type Props = {
    post: PostModel
}

const NoSSrPostViewer = dynamic(() => import("@/components/base/toast/viewer"), {ssr: false})


function BodyHeader({title, writerName, createdAt, updatedAt, tags}: {
    title: string,
    writerName: string,
    createdAt: string,
    updatedAt: string
    tags: string[]
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
    title: string,
    writerName: string,
    createdAt: string,
    updatedAt: string,
    tags: string[],
    body: string,
    isLoaded: boolean
}

export function PostViewerBody(props: PostViewerBodyProps) {
    const {
        title,
        writerName,
        createdAt,
        updatedAt,
        tags,
        body,
        isLoaded
    } = props
    return (
        <div className={"flex flex-col divide-y-2"}>
            <div>
                <BodyHeader title={title}
                            writerName={writerName}
                            createdAt={createdAt}
                            updatedAt={updatedAt}
                            tags={tags}
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
    const {isEndTimer} = useMyTimer({second: 2})
    const [post,] = useState(props.post)

    return (
        <div>
            <div>
                <MenuObserver/>
            </div>

            <div className={"flex pt-8 mb-[80px] min-h-[100%] h-auto"}>
                <div className={"w-[64rem] ml-auto mr-auto"}>
                    <PostViewerBody
                        title={post.title}
                        body={post.body}
                        tags={post.tags}
                        writerName={post.writer.writerName}
                        createdAt={post.createdAt}
                        updatedAt={post.updatedAt}
                        isLoaded={isEndTimer}
                    />
                </div>
            </div>

            <div>
                <Footer/>
            </div>
        </div>
    )
}

