import React from "react";

const Account = () => {
  // Mock user data - replace with actual user data from your auth system
  const user = {
    firstName: "Jakka",
    lastName: "Shiva",
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="flex items-center mr-4 gap-4">
      <div className="w-8 h-8 flex items-center justify-center bg-[#a970ff]/20 backdrop-blur-sm border-0 text-white rounded-full hover:border-violet-500 hover:shadow-[0_0_8px_#a855f7] transition duration-200 cursor-pointer">
        {getInitials(user.firstName, user.lastName)}
      </div>
      <button
        className="sign-out-button cursor-pointer"
        onClick={() => alert("Signed out successfully!")}
      />
    </div>
  );
};

export default Account;
