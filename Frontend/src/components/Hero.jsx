import React from "react";
import ChatResponse from "./ChatResponse";
import SearchInput from "./SearchInput";

const Hero = () => {
  return (
    <div className="m-3 h-[90vh] w-[76vw] flex flex-col items-center rounded-[8px] hero">
      <div className="chat-response w-[96%] h-[74vh] my-2">
        <ChatResponse />
      </div>
      <div className="search-input">
        <SearchInput />
      </div>
    </div>
  );
};

export default Hero;
