"use client";

import ReactPlayer from "react-player";
import React from "react";

export default function VideoComponent({src}: {src: string}) {
    return (
        <ReactPlayer url={src} />
    )
}