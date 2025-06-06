import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FormContainer from "../components/FormContainer";
import FormInput from "../components/FormInput";
import GoogleButton from "../components/GoogleButton";
import FormDivider from "../components/FormDivider";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Registration attempt with:", {
      name,
      email,
      password,
      confirmPassword,
    });
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5001/api/register", {
        name,
        email,
        password,
      });
      console.log("Success:", res.data);
    } catch (err) {
      console.error("Error:", err.response.data);
    }
  };

  const handleGoogleSignIn = () => {
    console.log("Google sign in clicked");
    window.location.href = "http://localhost:5001/api/auth/google";
  };

  return (
    <FormContainer title="Create Account">
      <form
        onSubmit={handleSubmit}
        method="post"
        className="space-y-3 relative"
      >
        <div className="space-y-3">
          <FormInput
            label="Full Name"
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <FormInput
            label="Email"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FormInput
            label="Password"
            id="password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FormInput
            label="Confirm Password"
            id="confirm-password"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center space-x-3">
          <input
            id="terms"
            type="checkbox"
            className="h-4 w-4 rounded border-[#a970ff]/10 bg-[#0a0a0a] text-[#a970ff] focus:ring-[#a970ff] transition-all duration-200"
            required
          />
          <label htmlFor="terms" className="text-sm text-gray-400">
            I agree to the{" "}
            <a
              href="#"
              className="text-[#a970ff] hover:text-[#8a4fff] transition-colors"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-[#a970ff] hover:text-[#8a4fff] transition-colors"
            >
              Privacy Policy
            </a>
          </label>
        </div>

        <button
          className="w-full py-2 px-4 bg-gradient-to-r from-[#a970ff] to-[#8a4fff] hover:from-[#8a4fff] hover:to-[#a970ff] text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#a970ff] focus:ring-offset-2 focus:ring-offset-[#0a0a0a] shadow-lg hover:shadow-[#a970ff]/20"
          type="submit"
        >
          Create Account
        </button>

        <FormDivider text="Or continue with" />

        <GoogleButton onClick={handleGoogleSignIn} text="Sign up with Google" />

        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#a970ff] hover:text-[#8a4fff] transition-colors font-medium"
          >
            Sign in
          </Link>
        </p>
      </form>
    </FormContainer>
  );
};

export default Register;
