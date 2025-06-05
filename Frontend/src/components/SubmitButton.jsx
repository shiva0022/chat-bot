import React from "react";

const SubmitButton = ({ text }) => {
  return (
    <button
      className="w-full py-2 px-4 bg-gradient-to-r from-[#a970ff] to-[#8a4fff] hover:from-[#8a4fff] hover:to-[#a970ff] text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#a970ff] focus:ring-offset-2 focus:ring-offset-[#0a0a0a] shadow-lg hover:shadow-[#a970ff]/20"
      type="submit"
    >
      {text}
    </button>
  );
};

export default SubmitButton; 