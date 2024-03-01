"use client";
import { useState, useEffect } from "react";
import "@/styles/test/Canvas.css";

import useFactory from "@/Hooks/Factory";
import { RenderComponents } from "@/utils/ComponentManager";
import { Droppable } from "@/app/test2/Droppable";

function Main() {
  const {
    components,
    AddComponent,
    LoadAllComponents,
    SaveAllComponents,
    ClearAllComponents,
  } = useFactory();

  useEffect(() => {
    // Load all components from local storage
    LoadAllComponents();
  }, []);

  return (
    <div className="grid">
      <Droppable id="canvas">
        <div className="debug-menu">
          <button
            onClick={() => {
              // Add a text card to the components
              AddComponent("TextCard", "TextCard", {
                x: 100,
                y: 1,
                content: "Hello World",
              });
            }}
          >
            Add Text Card
          </button>

          <button
            onClick={() => {
              // Save all components to local storage
              SaveAllComponents();
            }}
          >
            Save All
          </button>

          <button
            onClick={() => {
              // Save all components to local storage
              ClearAllComponents();
            }}
          >
            Clear All
          </button>
        </div>

        {RenderComponents(components)}
      </Droppable>
    </div>
  );
}

export default Main;
