import React, { useState } from "react";
import logo from "../assets/logo.png";
import AuthButtons from "./AuthButtons";
import Account from "./Account";

const Navbar = () => {
  const [isLogged, setIsLogged] = useState(true);

  return (
    <header className="p-2 h-12">
      <nav className="flex items-center justify-between">
        <div className="flex items-center">
          <img className="h-10" src={logo} alt="logo" />
          <span className="text-lg font-semibold">ChatWithMe</span>
        </div>
        {!isLogged ? <AuthButtons /> : <Account />}
      </nav>
    </header>
  );
};

export default Navbar;
