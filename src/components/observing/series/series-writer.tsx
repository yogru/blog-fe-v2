import {observer} from "mobx-react-lite";
import {SeriesWriteStore} from "@/domain/post/store/SeriesWriteStore";
import React from "react";
import ToastEditor from "@/components/base/toast/editor";
import Autocomplete from "@/components/base/autocomplete";

type Props = {
    seriesWriteStore: SeriesWriteStore
}

const itemCls: string = 'flex mb-4 w-full'

const SeriesWriterObserver = observer((props: Props) => {
    const ref = React.useRef<any>(null)
    const store = props.seriesWriteStore

    async function onSubmit(e: any) {
        e.stopPropagation()
    }

    function onChangeTitle(e: any) {
        e.stopPropagation()
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
                       value={store.title}
                       onChange={onChangeTitle}
                       className={"rounded w-full h-12 border-2 p-4"}
                       placeholder="제목 입력 해주세요"/>
            </div>

            <div className={[itemCls, 'h-[28rem]'].join(' ')}>
                <ToastEditor editorRef={ref}/>
            </div>

            <div className={itemCls}>
                <Autocomplete items={[{viewValue:"test",id:"id",selected:false},]} />
            </div>

        </div>
    )
})

export default SeriesWriterObserver