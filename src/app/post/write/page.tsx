'use client'

import React from "react";
import {SnackbarProvider} from "notistack";

import PostWriterObserver from "@/observer/post/writer";
import postEditStore from "@/domain/post/stores";


export default function PostWritePage() {

    return (
        <SnackbarProvider maxSnack={3}>
            <PostWriterObserver postStore={postEditStore}/>
        </SnackbarProvider>
    )
}