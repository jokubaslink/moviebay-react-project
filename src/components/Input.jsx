import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Input.css";

function Input() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  return (
    <div className="inputComponent">
    <section className="input__wrapper">
      <div className="input__wrapperTextBox">
        <h1>Search For Your Movie, TV Show</h1>
      </div>
      <div className="input__wrapperInputBox">
        <input
          className="input__wrapperInputBox--input"
          type="text"
          placeholder="Search by title.."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(event) =>
            event.key === "Enter" && navigate(`${input}`)
          }
        />
        <button
          className="input__wrapperInputBox--button"
          onClick={() => navigate(`${input}`)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
    </section>
  </div>
  );
}

export default Input;
