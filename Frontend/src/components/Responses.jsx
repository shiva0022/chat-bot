import React from "react";

const dummyResponses = [
  {
    id: 1,
    sender: "AI Assistant",
    initials: "AI",
    time: "Just now",
    message: "Hello! How can I assist you today?",
  },
  {
    id: 2,
    sender: "You",
    initials: "Y",
    time: "A moment ago",
    message: "Can you explain the concept of closures in JavaScript?",
  },
  {
    id: 3,
    sender: "AI Assistant",
    initials: "AI",
    time: "Now",
    message:
      "Sure! A closure is a function that remembers variables from its lexical scope even when the function is executed outside that scope.",
  },
];

const ResponseItem = ({ sender, initials, time, message }) => {
  const isUser = sender === "You";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      {!isUser && (
        <div className="w-9 h-9 rounded-full bg-purple-700/40 text-white flex items-center justify-center font-semibold mr-2">
          {initials}
        </div>
      )}
      <div
        className={`max-w-xs sm:max-w-md p-3 rounded-lg text-sm shadow-md ${
          isUser
            ? "bg-purple-600 text-white rounded-br-none"
            : "bg-white/10 text-white rounded-bl-none"
        }`}
      >
        <p className="mb-1">{message}</p>
        <div className="text-[11px] text-gray-400 text-right">{time}</div>
      </div>
      {isUser && (
        <div className="w-9 h-9 rounded-full bg-purple-700/40 text-white flex items-center justify-center font-semibold ml-2">
          {initials}
        </div>
      )}
    </div>
  );
};

const Responses = () => {
  return (
    <div className="h-full w-full overflow-y-auto px-4 py-2 scroll-smooth">
      {dummyResponses.map((response) => (
        <ResponseItem key={response.id} {...response} />
      ))}
    </div>
  );
};

export default Responses;
