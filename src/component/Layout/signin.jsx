import React from "react";

function Signin({ toggleLoginModal, switchToSignup, onLoginSuccess }) {
  const handleLogin = (e) => {
    e.preventDefault();
    onLoginSuccess();        
    toggleLoginModal(false); 
  };

  return (
    <div
  className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/70 z-[1000] font-inter overflow-auto"
  onClick={() => toggleLoginModal(false)}
  role="dialog"
  aria-modal="true"
  aria-labelledby="login-title"
>
  <div
    className="bg-white p-8 rounded-2xl w-[624px] max-w-full sm:w-[90%] sm:p-4 overflow-auto"
    onClick={(event) => event.stopPropagation()}
  >
    <div className="flex justify-between items-start">
      <h2 id="login-title" className="text-[3rem] font-semibold text-zinc-800 tracking-tight sm:text-[1.75rem]">
        Sign in
      </h2>
      <button
        className="text-xl px-2 mt-0 mr-[-1rem] text-stone-400 hover:text-black transition-colors"
        onClick={() => toggleLoginModal(false)}
        aria-label="Close"
      >
        ×
      </button>
    </div>

    <p className="text-base text-zinc-800">
      <span>Don't have an account yet?</span>
      <span
        className="font-semibold text-orange-600 cursor-pointer hover:underline ml-1"
        onClick={switchToSignup}
      >
        Sign up
      </span>
    </p>

    <form className="flex flex-col gap-8" onSubmit={handleLogin}>
      <div className="border-b border-gray-300 h-13">
        <input
          type="text"
          placeholder="Your email or phone number"
          className="w-full h-full text-base text-zinc-800 bg-transparent border-none outline-none placeholder:text-gray-400"
          aria-label="Email or phone number"
          required
        />
      </div>

      <div className="border-b border-gray-300 h-13">
        <input
          type="password"
          placeholder="Password"
          className="w-full h-full text-base text-zinc-800 bg-transparent border-none outline-none placeholder:text-gray-400"
          aria-label="Password"
          required
        />
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center text-base text-slate-600">
          <input
            type="checkbox"
            id="remember"
            className="w-[18px] h-[18px] border border-slate-600 rounded"
          />
          <label htmlFor="remember">Remember me</label>
        </div>

        <button
          type="button"
          className="text-base font-semibold text-orange-600 bg-none border-none cursor-pointer hover:underline"
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        className="text-xl font-semibold text-white bg-orange-600 px-7 py-3.5 rounded-md hover:bg-orange-700 transition"
      >
        Sign in
      </button>
    </form>
  </div>
</div>

  );
}

export default Signin;
