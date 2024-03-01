"use client";
import {useState, useEffect} from 'react';
import { Canvas, ComponentsBar } from '@/components/workspace';
import { DndContext } from '@dnd-kit/core';

function Main() {
    return (
        <div className="flex flex-row">
            <DndContext>
                <ComponentsBar/>
                <Canvas/>
            </DndContext>
        </div>
    )
}

export default Main;