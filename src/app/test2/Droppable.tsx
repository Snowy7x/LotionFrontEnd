"use client";
import React from 'react';
import {useDroppable} from '@dnd-kit/core';

function Droppable(props: any) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });

  return (
    <div ref={setNodeRef} {...props}>
      {props.children}
    </div>
  );
}

export { Droppable };