import React from "react";
import Log from "./Log";
import { PlusIcon } from "@heroicons/react/24/outline";
import { BookOpenIcon } from "@heroicons/react/24/solid";

const Sidebar = () => {
  return (
    <div className="m-3 h-[90vh] w-[20vw] rounded-[8px] sidebar">
      <div className="flex gap-2 mx-4 mt-4">
        <h1 className="text-base">New Chat</h1>
        <button
          className="cursor-pointer rounded-full bg-[#a970ff]/20 w-6 h-6 flex items-center justify-center"
          type="button"
          onClick={() => alert("new Chat")}
        >
          <PlusIcon className="w-4 h-4 text-white" strokeWidth={2.5} />
        </button>
      </div>
      <div className="flex gap-2 my-1 mx-2 mb-0 items-center">
        <h1 className="text-lg m-2">History</h1>
        <BookOpenIcon className="w-6 h-6 text-white" strokeWidth={2.5} />
      </div>
      <div className="h-[74vh] flex flex-col items-start mx-2 p-1 gap-1 logs">
        {/* design later */}
        {Array.from({ length: 25 }).map((_, i) => (
          <Log key={i}  />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
