import React, { useState } from "react";
import Welcome from "./Welcome";
import Responses from "./Responses";

const ChatResponse = () => {
  const [responses, setResponses] = useState([1]);

  return (
    <div className="h-full w-full">
      {responses.length === 0 ? (
        <div className="flex items-center justify-center w-full h-full">
          <Welcome />
        </div>
      ) : (
        <Responses />
      )}
    </div>
  );
};

export default ChatResponse;
