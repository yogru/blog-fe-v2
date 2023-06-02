'use client'

import React from "react";
import {SnackbarProvider} from "notistack";

import PostWriterObserver from "@/components/observing/post/writer";
import postEditStore from "@/domain/post/store/post-write";


export default function PostWritePage() {

    return (
        <SnackbarProvider maxSnack={3}>
            <PostWriterObserver postStore={postEditStore}/>
        </SnackbarProvider>
    )
}