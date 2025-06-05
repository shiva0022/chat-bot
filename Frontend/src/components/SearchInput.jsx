import React, { useState, useRef } from "react";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";

const SearchInput = () => {
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef(null);

  const handleInputChange = (event) => {
    const textarea = textareaRef.current;
    setInputValue(event.target.value);
    // Adjust the height of the textarea based on content
    textarea.style.height = "auto";

    // Limit height to 3 rows
    const maxHeight = textarea.scrollHeight > 0 ? textarea.scrollHeight : 0;
    const rowHeight = 24; // adjust based on actual line-height
    const maxRows = 2;
    const maxAllowedHeight = rowHeight * maxRows;

    textarea.style.height = Math.min(maxHeight, maxAllowedHeight) + "px";
  };

  return (
    <div className="input-search">
      <form className="flex gap-4 items-center">
        <div className="w-[40vw] mx-h-[10vh] p-3 pl-5 rounded-[20px] transition-all input">
          <textarea
            className="font-mono text-xs resize-none w-full"
            type="text"
            placeholder="Ask anything..."
            rows={1}
            value={inputValue}
            onChange={handleInputChange}
            ref={textareaRef}
          />
        </div>
        <button type="button" onClick={() => alert("request sent")}>
          <RocketLaunchIcon
            className="w-6 h-6 text-white cursor-pointer hover:text-violet-500 transition duration-200 hover:drop-shadow-[0_0_8px_#a855f7]"
            strokeWidth={2.5}
          />
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
