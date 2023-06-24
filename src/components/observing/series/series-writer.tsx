import {observer} from "mobx-react-lite";
import {SeriesWriteStore} from "@/domain/post/store/SeriesWriteStore";
import React from "react";
import ToastEditor from "@/components/base/toast/editor";
import Autocomplete from "@/components/base/autocomplete";
import {PostListStore} from "@/domain/post/store/PostListStore";
import {ViewItem} from "@/infra/generic-type";
import DraggableList from "@/components/base/draggable/draggable-list";
import {DropResult} from "react-beautiful-dnd";

type Props = {
    seriesWriteStore: SeriesWriteStore
    postListStore: PostListStore
}

const itemCls: string = 'flex mb-4 w-full'

const SeriesWriterObserver = observer((props: Props) => {
    const ref = React.useRef<any>(null)
    const seriesWriteStore = props.seriesWriteStore
    const postListStore = props.postListStore

    async function onSubmit(e: any) {
        e.stopPropagation()
        await seriesWriteStore.submit()
    }
    function onChangeTitle(e: any) {
        e.stopPropagation()
        seriesWriteStore.onChangeTitle(e.target.value)
    }

    async function searchKeyword(keyword: string) {
        await postListStore.searchTitleList(keyword)
        return postListStore.posts.map((post) => new ViewItem(post.id, post.title, false))
    }

    function onSelectPostTitle(vi: ViewItem) {
        seriesWriteStore.onSelectPostViewItem(vi)
    }

    function onDeletePostViewItem(vi: ViewItem) {
        seriesWriteStore.onDeletePostViewItem(vi)
    }

    function onDragEnd({destination, source}: DropResult) {
        if (!destination) return;
        seriesWriteStore.onReorderPostViewItem(source.index, destination.index)
    }


    return (
        <div className={"w-screen flex flex-col"}>
            <div className={itemCls}>
                <button onClick={onSubmit}
                        className={"block shadow-lg rounded w-32 h-10 bg-indigo-600 text-amber-50"}>
                    시리즈 생성
                </button>
            </div>

            <div className={itemCls}>
                <input type="text"
                       value={seriesWriteStore.title}
                       onChange={onChangeTitle}
                       className={"rounded w-full h-12 border-2 p-4"}
                       placeholder="제목 입력 해주세요"/>
            </div>

            <div className={[itemCls, 'h-[28rem]'].join(' ')}>
                <ToastEditor editorRef={ref}/>
            </div>

            <div className={itemCls}>
                <Autocomplete load={searchKeyword} onSelect={onSelectPostTitle}/>
            </div>

            <div className={itemCls}>
                <DraggableList
                    items={seriesWriteStore.postViewItems}
                    onDelete={onDeletePostViewItem}
                    onDragEnd={onDragEnd}
                />

            </div>

        </div>
    )
})

export default SeriesWriterObserver