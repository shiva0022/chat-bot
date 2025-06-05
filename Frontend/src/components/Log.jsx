import React from "react";

const Log = () => {
  return (
    <div
      className="w-full cursor-pointer p-3 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-[#a970ff]/10 transition-all duration-200 border border-transparent hover:border-[#a970ff]/20"
      onClick={() => alert("loadPreviousChat")}
    >
      <div className="flex items-center gap-2">
        {/* <div className="w-2 h-2 rounded-full bg-[#a970ff]"></div> */}
        <span className="truncate">Previous Chat History hjj jknsaj JN AknlanKANKNak</span>
      </div>
    </div>
  );
};

export default Log;
