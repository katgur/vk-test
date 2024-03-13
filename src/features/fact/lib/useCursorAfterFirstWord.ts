import { useRef, useEffect } from "react";

function useCursorAfterFirstWord(text?: string) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (!text) {
            return;
        }

        const setCursorAt = (pos: number) => {
            const textArea = textareaRef.current;
            if (!textArea) {
                return;
            }
            textArea.focus();
            textArea.selectionEnd = pos;
        };

        const getFirstWordEnd = (text: string) => {
            return text.split(" ")[0].length;
        };

        setCursorAt(getFirstWordEnd(text));
    }, [text]);

    return textareaRef;
}

export default useCursorAfterFirstWord;
