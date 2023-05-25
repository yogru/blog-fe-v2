'use client'

import React from "react";
import {SnackbarProvider} from "notistack";

import PostWriterObserver from "@/observer/post/writer";
import postService from "@/domain/post/services";


export default function PostWritePage() {

    return (
        <SnackbarProvider maxSnack={3}>
            <PostWriterObserver postService={postService}/>
        </SnackbarProvider>
    )
}