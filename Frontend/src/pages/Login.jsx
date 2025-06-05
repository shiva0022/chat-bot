import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import FormInput from "../components/FormInput";
import RememberMe from "../components/RememberMe";
import SubmitButton from "../components/SubmitButton";
import googleIcon from "../assets/google-icon.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement actual login logic
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google sign-in logic
  };

  return (
    <FormContainer title="Welcome Back">
      <form onSubmit={handleSubmit} method="post" className="space-y-3 relative">
        <div className="space-y-3">
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
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <RememberMe />

        <SubmitButton text="Sign In" />

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#a970ff]/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-[#0a0a0a] text-gray-400">Or continue with</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 py-2 px-4 bg-[#0a0a0a] border border-[#a970ff]/10 text-white font-medium rounded-lg transition-all duration-300 hover:bg-[#1a1a1a] hover:border-[#a970ff]/20 focus:outline-none focus:ring-2 focus:ring-[#a970ff] focus:ring-offset-2 focus:ring-offset-[#0a0a0a] group"
        >
          <img src={googleIcon} alt="Google" className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          <span className="group-hover:translate-x-1 transition-transform duration-300">Sign in with Google</span>
        </button>

        <p className="text-center text-gray-400 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#a970ff] hover:text-[#8a4fff] transition-colors font-medium">
            Sign up
          </Link>
        </p>
      </form>
    </FormContainer>
  );
};

export default Login;
