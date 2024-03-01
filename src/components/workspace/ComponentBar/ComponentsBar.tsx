'use client';
import "@/styles/test/ComponentsBar.css";
import React from 'react'
import { Draggable } from "@/app/test2/Draggable";
import { TextCardItem } from "./Items";
import { Droppable } from "@/app/test2/Droppable";

const ComponentsBar = (props: any) => {

    return ( 
        <Droppable id="droppable" className="bar" >
            <TextCardItem />
        </Droppable>
    )
}

export default ComponentsBar;