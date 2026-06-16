import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import "../style/index.css";
import React from "react";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user, saveUser } = useUser();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (user.isLoggedIn) {
      navigate("/dashboard");
    }
  }, [user.isLoggedIn]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    if (!input.trim()) {
      setError("Name cannot be empty.");
      inputRef.current?.focus();
      return;
    }
    setError("");
    saveUser(input.trim());
  };

  return (
    <main className="containerHome" id="main-content">
      <Helmet>
        <title>Home</title>
      </Helmet>

      <section className="nameFormWrapper" aria-labelledby="form-heading">
        <h1 id="form-heading" className="nameFormTitle">
          What&apos;s Your Name?
        </h1>
        <p className="nameFormSub" id="form-desc">
          Enter your name to get started.
        </p>
        <div className="nameFormRow" aria-describedby="form-desc">
          <input
            ref={inputRef}
            className={`nameInput${error ? " nameInput--error" : ""}`}
            placeholder="Your name..."
            value={input}
            onChange={(e) => { setInput(e.target.value); if (error) setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            aria-label="Enter your name"
            aria-required="true"
            aria-invalid={!!error}
            aria-describedby={error ? "name-error" : "form-desc"}
            autoComplete="given-name"
          />
          <button className="nameSubmitBtn" onClick={handleSubmit}>
            Enter
          </button>
        </div>
        {error && (
          <p id="name-error" className="nameFormError" role="alert" aria-live="assertive">
            {error}
          </p>
        )}
      </section>
    </main>
  );
}

export default React.memo(Home);