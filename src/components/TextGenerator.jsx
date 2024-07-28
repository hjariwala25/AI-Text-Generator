import React, { useRef } from "react";
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import loading_img from "../assets/loading.gif";

const TextGenerator = () => {
  const [input, setInput] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);
  const copyRef = useRef("");
  const genAI = new GoogleGenerativeAI(
    "AIzaSyCc5_p5zKVQL0MY0pLQM6EbK5AKzpgmTVM"
  );

  const textGen = async () => {
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = input;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      setInput("");
      setLoading(false);
      setGeneratedText(text);
      console.log(text);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const copyText = () => {
    copyRef.current.select();
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-3xl w-full md:w-2/3 lg:w-1/2 mx-4 my-8 p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
          AI Text Generator
        </h1>
        <div className="flex flex-col gap-2">
          <div className="cursor-pointer flex justify-end">
            <p className="bg-blue-500 px-2 py-2 rounded-md" onClick={copyText}>copy</p>
          </div>
          <div>
            {loading === true ? (
              <div className="flex items-center justify-center border border-gray-300 rounded-md w-full h-72 resize-none">
                <img src={loading_img} alt="" />
              </div>
            ) : (
              <textarea
                className="border border-gray-300 rounded-md p-4 w-full h-72 resize-none"
                placeholder="Generated Text will appear here..."
                value={generatedText}
                readOnly
                ref={copyRef}
              ></textarea>
            )}
          </div>
        </div>
        <div className="flex pt-4">
          <input
            className="border border-gray-300 rounded-md py-2 px-4 w-full"
            type="text"
            placeholder="Enter your prompt here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="ml-2 px-4 bg-blue-500 text-white rounded-md"
            onClick={textGen}
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextGenerator;
