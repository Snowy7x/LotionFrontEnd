"use client";
import { GrTextAlignFull } from "react-icons/gr";
import "@/styles/test/Items.css";
import { DragOverlay, useDraggable } from "@dnd-kit/core";
import {TextCardTemplate} from "@/components/workspace/cards"
import { useEffect, useState } from "react";
import { Transform } from '@dnd-kit/utilities';
import useFactory from "@/Hooks/Factory";

const TextCardItem = (props: any) => {

    const {AddComponent} = useFactory();

    const {attributes, listeners, setNodeRef, transform, isDragging, over} = useDraggable({
        id: 'text-card-item',
    });

    const [transformState, setTransformState] = useState<Transform | null>();

    useEffect(() => {
        if (!isDragging) {
            console.log("Dropped", transformState)
            if (transformState) {
                AddComponent("TextCard", "TextCard", {
                    x: transformState.x - 100,
                    y: transformState.y + 50,
                    content: "Hello World",
                });
            }
        }
    }, [isDragging])

    useEffect(() => {
        if (transform && over?.id == "canvas") {
            setTransformState(transform)
            // Set cursor icon to move selected
            document.body.style.cursor = "grabbing"
        }
        else if (transform && over?.id != "canvas") {
            setTransformState(null)
            // Set cursor icon to not allowed
            document.body.style.cursor = "not-allowed"
        }else{
            setTransformState(null)
            // Set cursor icon to default
            document.body.style.cursor = "auto"
        }
    }, [transform])
      
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : {
        display: 'none',
    };
    
    return (
        <>
            <div className="w-full bg-[#363636] py-3 rounded cursor-pointer" ref={setNodeRef} {...listeners} {...attributes}>
                <GrTextAlignFull className="w-full text-2xl" />
            </div>
            
            <DragOverlay dropAnimation={{
                duration: 0
            }}>
                {isDragging ? (
                    <TextCardTemplate />
                ) : null}
            </DragOverlay>
        </>
    );
}

export default TextCardItem;