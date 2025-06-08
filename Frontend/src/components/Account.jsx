import React, { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";

const Account = ({ setIsLogged }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Mock user data - replace with actual user data from your auth system
  const user = {
    firstName: "Jakka",
    lastName: "Shiva",
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="flex items-center mr-4 gap-3">
      <div
        className="group relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-10 h-10 flex items-center justify-center bg-[#7c3aed] text-white rounded-full hover:bg-[#6d28d9] transition-all duration-300 cursor-pointer shadow-[0_2px_10px_rgba(124,58,237,0.5)] hover:shadow-[0_2px_15px_rgba(124,58,237,0.7)]">
          {getInitials(user.firstName, user.lastName)}
        </div>
      </div>
      <button
        className="flex items-center gap-2 px-4 py-2 bg-[#7c3aed] text-white rounded-full hover:bg-[#6d28d9] transition-all duration-300 cursor-pointer shadow-[0_2px_10px_rgba(124,58,237,0.5)] hover:shadow-[0_2px_15px_rgba(124,58,237,0.7)]"
        onClick={() => {
          localStorage.removeItem("token");
          setIsLogged(false);
          alert("You have signed out successfully");
        }}
      >
        <FaSignOutAlt className="w-4 h-4" />
        <span className="text-sm font-medium">Sign Out</span>
      </button>
    </div>
  );
};

export default Account;
