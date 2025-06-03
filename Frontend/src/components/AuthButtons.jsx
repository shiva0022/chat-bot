import React from 'react';

const AuthButtons = () => {
    return (
        <div className="mr-2 flex gap-[10px] auth-buttons">
            <button type="button">Login</button>
            <button type="button">SignUp</button>
        </div>
    );
}

export default AuthButtons;