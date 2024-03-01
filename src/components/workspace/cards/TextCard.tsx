"use client";
import { TextArea } from "@/components/UI";
import { useRef, useState } from "react";
import Draggable, {
  DraggableData,
  DraggableEventHandler,
} from "react-draggable";
import { ResizableBox } from "react-resizable";
import "@/styles/test/TextCard.css";
import useFactory from "@/Hooks/Factory";

function TextCard({
  id = "0",
  initialX = 1,
  initialY = 1,
  content,
  isDisabled,
  style,
}: {
  id?: string;
  initialX?: number;
  initialY?: number;
  content?: string;
  isDisabled?: boolean;
  style?: any;
}) {
  const [cardPosition, setCardPosition] = useState({
    x: initialX,
    y: initialY,
  });
  const [isFocused, setIsFocused] = useState(false);

  const resizable = useRef<ResizableBox>(null);
  const textArea = useRef<HTMLTextAreaElement>(null);
  const [lastH, setLastH] = useState(70);

  const { UpdateComponent } = useFactory();

  const UpdateFocus = (isFocused: boolean) => {
    setIsFocused(isFocused);
    // On Focus set the size of the card to be the same as the text area
    if (isFocused) {
      setLastH(resizable.current?.state.height || 70);

      if (!resizable.current || !textArea.current) return;
      textArea.current.style.height = "auto";

      resizable.current.setState({
        height: Math.max(textArea.current?.scrollHeight || 70, 70),
      });

      textArea.current.style.setProperty(
        "height",
        `${textArea.current?.scrollHeight}px`
      );
    } else {
      resizable.current?.setState({ height: lastH });

      // Set textarea height to auto
      textArea.current?.style.setProperty(
        "height",
        resizable.current?.state.height + "px"
      );
    }
  };

  const UpdateSize = (height: number) => {
    // Update the content of the card
    if (!resizable.current || !textArea.current) return;
    resizable.current.setState({ height: Math.max(height || 70, 70) });
  };

  const OnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    content = e.target.value;
    UpdateComponent(id, { content: e.target.value });
  };

  const updateCardPosition: DraggableEventHandler = (
    e,
    data: DraggableData
  ) => {
    // If resizing the card then do not

    const xCordinate = data.x;
    const yCordinate = data.y;

    // Update the card position
    setCardPosition({ x: xCordinate, y: yCordinate });

    // Update the component position
    UpdateComponent(id, { x: xCordinate, y: yCordinate });
  };

  return (
    <Draggable
      position={cardPosition}
      onDrag={updateCardPosition}
      handle=".handle"
      bounds="parent"
      disabled={isFocused || isDisabled}
    >
      <ResizableBox
        ref={resizable}
        className={"absolute block bg-white dark:bg-neutral-700 "
    + (isFocused ? "border-2" : "")}
        width={500}
        height={70}
        handle={
          isDisabled ? undefined : (
            <span className="custom-handle custom-handle-se" />
          )
        }
        handleSize={[8, 8]}
        minConstraints={[200, 70]}
        style={style}
      >
        <div className="handle w-full h-full overflow-hidden">
          <TextArea
            ref={textArea}
            OnHeightChange={UpdateSize}
            onChange={OnChange}
            onBlur={(e) => UpdateFocus(false)}
            onFocus={(e) => UpdateFocus(true)}
            className={
              "w-full p-6 resize-none bg-transparent text-white outline-none active:hover:cursor-grabbing " +
              (isFocused
                ? "cursor-text"
                : "cursor-grab")
            }
            placeholder="Start Writing..."
            value={content}
          />
        </div>
      </ResizableBox>
    </Draggable>
  );
}

export const TextCardTemplate = (props: any) => {
  return (
    <div
      {...props}
      className="w-[500px] h-[70px] absolute block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
    >
      <div className="handle w-full h-full overflow-hidden">
        <textarea
          className="pointer-events-none w-full p-6 resize-none bg-transparent text-white outline-none "
          placeholder="Start Writing..."
          disabled={true}
        />
      </div>
    </div>
  );
};

export default TextCard;
