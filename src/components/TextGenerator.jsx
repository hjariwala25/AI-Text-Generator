import React, { useRef } from "react";
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import loading_img from "../assets/loading.gif";

const TextGenerator = () => {
  const [input, setInput] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyRef = useRef("");
  const key = import.meta.env.GEMENI_API_KEY;
  const genAI = new GoogleGenerativeAI(key);

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
    navigator.clipboard.writeText(generatedText).then(
      () => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000); 
      },
      (err) => {
        console.error('Could not copy text: ', err);
      }
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full md:w-2/3 lg:w-1/2 mx-auto my-8 p-6 bg-gray-800 rounded-lg shadow-2xl text-white">
        <h1 className="text-3xl font-bold text-center mb-4 py-2 bg-gray-700 rounded-md">
          AI Text Generator
        </h1>
        <div className="flex flex-col gap-2">
          <div className="flex justify-end">
            <button
              className={`px-4 py-2 rounded-md ${copied ? 'bg-green-600' : 'bg-blue-600'} transition-colors duration-300`}
              onClick={copyText}
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div>
            {loading ? (
              <div className="flex items-center justify-center border border-gray-600 rounded-md w-full h-72">
                <img src={loading_img} alt="Loading..." />
              </div>
            ) : (
              <textarea
                className="border border-gray-600 rounded-md p-4 w-full h-72 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900 text-white"
                placeholder="Generated Text will appear here..."
                value={generatedText}
                readOnly
                ref={copyRef}
              ></textarea>
            )}
          </div>
        </div>
        <div className="flex pt-4 gap-2">
          <input
            className="border border-gray-600 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900 text-white placeholder-gray-400"
            type="text"
            placeholder="Enter your prompt here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300"
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
