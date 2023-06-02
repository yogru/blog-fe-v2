"use client"
import dynamic from "next/dynamic";
import {useState} from "react";

import {PostModel} from "@/domain/post/repositories";
import ToastViewer from "@/components/toast/viewer";
import {showJavaLocalDataToYYYYMMDD} from "@/infra/time-string";
import ChipList from "@/components/chip/chip-list";
import {ViewItem} from "@/infra/generic-type";
import LoadingBox from "@/components/loading-box";


type Props = {
    post: PostModel
}

const NoSSrPostViewer = dynamic(() => import("@/components/toast/viewer"), {ssr: false})


function HeadComponent({title, writerName, createdAt, updatedAt, tags}: {
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

function BodyComponent({content}: { content: string }) {

    return (
        <div className={"mt-4"}>
            <div className={"h-[960px]"}>
                <LoadingBox isLoaded={false} clientLazySecond={2}>
                    <NoSSrPostViewer content={content}/>
                </LoadingBox>
            </div>
        </div>
    )
}

export default function PostViewerObserver(props: Props) {
    const [post, setPost] = useState<PostModel>(props.post)
    return (

        <div className={"flex flex-col divide-y-2"}>
            <div>
                <HeadComponent title={post.title}
                               writerName={post.writer.writerName!!}
                               createdAt={post.createdAt}
                               updatedAt={post.updatedAt} tags={post.tags}/>
            </div>

            <div className={"mt-1"}>
                <BodyComponent content={post.body}/>
            </div>
        </div>
    )
}

