import React from "react";
import logo from "../assets/logo.png";

const Welcome = () => {
  return (
    <div className="flex flex-col items-center gap-1">
      <img
        className="w-60 h-60 drop-shadow-[0_0_8px_#7e22ce]"
        src={logo}
        alt="logo-img"
      />
      <h1 className="text-5xl">ChatWithMe</h1>
      <p>Greetings, i am your personal chat Assistant</p>
      <p>How Can I help?</p>
    </div>
  );
};

export default Welcome;
