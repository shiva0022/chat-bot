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
    <div className="relative">
      <form className="flex gap-4 items-center">
        <div className="w-full bg-[#0a0a0a]/50 border border-[#a970ff]/10 rounded-2xl p-3 pl-5 transition-all duration-300 hover:border-[#a970ff]/20 focus-within:border-[#a970ff] focus-within:ring-2 focus-within:ring-[#a970ff]/20">
          <textarea
            className="w-full bg-transparent text-white placeholder-gray-500 resize-none focus:outline-none font-mono text-sm"
            type="text"
            placeholder="Ask anything..."
            rows={1}
            value={inputValue}
            onChange={handleInputChange}
            ref={textareaRef}
          />
        </div>
        <button 
          type="button" 
          onClick={() => alert("request sent")}
          className="p-2 rounded-full bg-gradient-to-r from-[#a970ff] via-[#8a4fff] to-[#6a3fff] hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#a970ff]/20"
        >
          <RocketLaunchIcon
            className="w-6 h-6 text-white"
            strokeWidth={2.5}
          />
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
