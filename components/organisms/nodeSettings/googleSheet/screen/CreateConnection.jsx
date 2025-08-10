'use client'
import React, { useState, useEffect } from "react";
import { useWizard } from "react-use-wizard";


const CreateConnection = () => {
  const { nextStep } = useWizard();
  const [connectionName, setConnectionName] = useState('')



  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.success) {
        nextStep();
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);





  const handleGoogleSignIn = () => {
    if (!connectionName.trim()) {
      alert('Connection name is required')
      return
    }

    const GOOGLE_AUTH_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/sheet`

    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;

    window.open(
      GOOGLE_AUTH_URL,
      'Google Login',
      `width=${width},height=${height},left=${left},top=${top},resizable=no,scrollbars=yes,status=no`
    );


  }




  return (

    <div
      className="mt-5 space-y-3 animate-fade-in"
      >
      <h2>Create Google connection</h2>
      <input
        type="text"
        value={connectionName}
        onChange={(e) => setConnectionName(e.target.value)}
        placeholder="Connection name"
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <button
        onClick={handleGoogleSignIn}
        className="w-full border flex items-center justify-center gap-2 px-4 py-2 rounded cursor-pointer transition"
      >
        <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5" />
        Sign in with Google
      </button>
    </div>

  );
};


export default CreateConnection