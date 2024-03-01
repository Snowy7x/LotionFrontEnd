import React, {
	useState,
	useEffect,
	TextareaHTMLAttributes,
	ForwardedRef,
	RefObject,
} from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	OnHeightChange?: (height: number) => void;
}

/**
 * 
 * @param props 
 * @param textAreaRef {RefObject<HTMLTextAreaElement>}
 * @returns 
 */
const TextArea = (props: TextAreaProps, textAreaRef: ForwardedRef<HTMLTextAreaElement>) : JSX.Element => {
	const [text, setText] = useState("");
	const [textAreaHeight, setTextAreaHeight] = useState("auto");
	const [parentHeight, setParentHeight] = useState("auto");

	useEffect(() => {
		let ref = textAreaRef as RefObject<HTMLTextAreaElement>;
		if (ref.current) {
			ref.current.style.height = "auto";
			ref.current.style.height = `${ref.current.scrollHeight}px`;
			props.OnHeightChange?.(ref.current.scrollHeight);
		}
	}, [text]);

	const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setText(event.target.value);

		if (props.onChange) {
			props.onChange(event);
		}
	};

	return (
		
			<textarea
				{...props}
				ref={textAreaRef}
				rows={1}
				style={{
					height: textAreaHeight,
				}}
				onChange={onChangeHandler}
			/>
	);
};

export default React.forwardRef(TextArea);