import React from "react";

const AuthButtons = () => {
  return (
    <div className="mr-2 flex gap-[10px] auth-buttons">
      <button type="button" onClick={() => alert("redirect to login")}>
        Login
      </button>
      <button type="button" onClick={() => alert("redirect to register")}>
        SignUp
      </button>
    </div>
  );
};

export default AuthButtons;
