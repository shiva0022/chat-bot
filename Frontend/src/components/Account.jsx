import React from 'react';

const Account = () => {
    // Mock user data - replace with actual user data from your auth system
    const user = {
        firstName: "John",
        lastName: "Doe"
    };

    const getInitials = (firstName, lastName) => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    };

    return (
        <div className="flex items-center mr-4 gap-4">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-200 font-medium">
                {getInitials(user.firstName, user.lastName)}
            </div>
            <button 
                className="sign-out-button"
                onClick={() => alert('Signed out successfully!')} 
            />
        </div>
    );
}

export default Account;