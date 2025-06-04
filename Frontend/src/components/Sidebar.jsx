import React from "react";
import Log from "./Log";
import { PlusIcon } from "@heroicons/react/24/outline";
import { BookOpenIcon } from "@heroicons/react/24/solid";

const Sidebar = () => {
  return (
    <>
      <div className="m-3 h-[90vh] w-[20vw] rounded-[8px] sidebar flex flex-col">
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
        <div className="flex gap-2 my-4 mx-4 items-center border-b border-[#a970ff]/20 pb-2">
          <BookOpenIcon className="w-5 h-5 text-[#a970ff]" strokeWidth={2.5} />
          <h1 className="text-lg font-medium">History</h1>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="flex flex-col items-start mx-2 p-1 gap-1">
            {/* design later */}
            {Array.from({ length: 25 }).map((_, i) => (
              <Log key={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
