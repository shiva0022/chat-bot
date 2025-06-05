import React, { useState } from "react";
import logo from "../assets/logo.png";
import AuthButtons from "./AuthButtons";
import Account from "./Account";

const Navbar = () => {
  const [isLogged, setIsLogged] = useState(true);

  return (
    <header className="h-16 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-transparent"></div>
      <nav className="relative h-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img className="h-10 w-10 object-contain" src={logo} alt="logo" />
          <div className="flex flex-col">
            <span className="text-xl font-bold bg-gradient-to-r from-[#a970ff] via-[#8a4fff] to-[#6a3fff] text-transparent bg-clip-text">
              ChatWithMe
            </span>
            <span className="text-xs text-gray-400">Your AI Assistant</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {!isLogged ? <AuthButtons /> : <Account />}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
