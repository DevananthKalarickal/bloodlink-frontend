import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function App() {
  const MAX_RESPONSE_LENGTH = 500;
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Welcome to BloodLink! I'm your Blood Donation Assistant. I can help you with information about blood donation, eligibility, and nearby donation centers. How can I assist you today?",
      isBot: true,
    },
  ]);
  const [question, setQuestion] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const generatePrompt = (userMessage) => ({
    contents: [
      {
        parts: [
          {
            text: `You are a helpful blood donation assistant chatbot. Please provide answers that are short, to the point, and formatted as a maximum of four bullet points. Keep the responses concise and focused. Previous conversation:\n${messages
              .map((m) => `${m.isBot ? "Assistant" : "User  "}: ${m.text}`)
              .join("\n")} User: ${userMessage} Assistant:`,
          },
        ],
      },
    ],
  });

  const generateAnswer = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setGeneratingAnswer(true);
    const currentQuestion = question;
    setQuestion(""); // Clear input immediately after sending

    // Add user question to chat history
    const userMessage = { id: messages.length + 1, text: currentQuestion, isBot: false };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT}`,
        generatePrompt(currentQuestion)
      );

      const aiResponse = response.data.candidates[0].content.parts[0].text;
      setMessages((prev) => [...prev, { id: prev.length + 2, text: aiResponse, isBot: true }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { id: prev.length + 2, text: "Sorry - Something went wrong. Please try again!", isBot: true }]);
    } finally {
      setGeneratingAnswer(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      generateAnswer(e);
    }
  };

  const predefinedPrompts = [
    "What are the eligibility requirements for blood donation?",
    "Where can I find a nearby blood donation center?",
    "How often can I donate blood?",
  ];

  const handlePredefinedPromptClick = (prompt) => {
    setQuestion(prompt);
    generateAnswer({ preventDefault: () => {} }); // Call generateAnswer without the event
  };

  // Animation for sliding in the chat window
  const slideInStyle = {
    animation: isOpen ? "slideIn 0.5s ease-in-out" : "",
  };

  // Hover effect for the button
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const buttonStyle = {
    backgroundColor: isButtonHovered ? "darkred" : "red",
    color: "white",
    width: "60px",
    height: "60px",
    border: "1px solid white",
    position: "relative",
    transition: "background-color 0.3s",
  };

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}>
      {isOpen ? (
        <div
          className="card shadow-lg border-0"
          style={{
            width: "350px",
            height: "600px",
            borderRadius: "15px",
            overflow: "hidden",
            ...slideInStyle, // Apply the slide-in animation
          }}
        >
          {/* Header */}
          <div
            className="card-header text-white d-flex justify-content-between align-items-center"
            style={{
              backgroundColor: "red",
              fontWeight: "bold",
            }}
          >
            <div className="d-flex align-items-center">
              <i className="fas fa-hand-holding-heart me-2"></i>
              Bloodlink
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="btn btn-sm text-white border-0 ms-5 d-flex justify-content-end"
              style={{ background: "transparent" }}
            >
              <i className="fa-solid fa-chevron-down"></i>
            </button>
          </div>

          {/* Chat Messages and Predefined Prompts */}
          <div
            ref={chatContainerRef}
            className="card-body overflow-auto px-3"
            style={{
              background: "#f8f9fa",
              padding: "1rem",
              height: "400px",
            }}
          >
            {/* Predefined Prompts */}
            <div className="mb-3">
              {predefinedPrompts.map((prompt, index) => (
                <button
                  key={index}
                  className="btn btn-outline-danger btn-sm mb-2 me-2"
                  onClick={() => handlePredefinedPromptClick(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Messages */}
            {messages.map((message) => (
              <div key={message.id} className={`d-flex mb-3 ${message.isBot ? "justify-content-start" : "justify-content-end"}`}>
                <div
                  className={`p-3 rounded-3 d-flex align-items-center ${message.isBot ? "bg-light text-dark" : "bg-danger text-white"}`}
                  style={{
                    maxWidth: "95%",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #ddd",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <i className={`me-2 ${message.isBot ? "fas fa-robot text-secondary" : "fas fa-user"}`}></i>
                  <ReactMarkdown>
                    {message.isBot && message.text.length > MAX_RESPONSE_LENGTH
                      ? `${message.text.substring(0, MAX_RESPONSE_LENGTH)}...`
                      : message.text}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            {generatingAnswer && (
              <div className="d-flex justify-content-start mb-3">
                <div className="p-3 bg-light border rounded-3 d-flex align-items-center">
                  <span className="spinner-border spinner-border-sm text-danger me-2"></span>
                  <span>Thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="card-footer p-3 bg-white">
            <div className="input-group">
              <textarea
                className="form-control border-0 shadow-sm"
                placeholder="Ask anything..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyPress={handleKeyPress}
                rows="1"
                style={{
                  borderRadius: "15px 0 0 15px",
                  background: "#f1f3f5",
                }}
              ></textarea>
              <button
                className="btn text-white"
                onClick={generateAnswer}
                disabled={generatingAnswer}
                style={{
                  borderRadius: "15px",
                  backgroundColor: "red",
                }}
              >
                <i className={`fas ${generatingAnswer ? "fa-spinner fa-spin" : "fa-paper-plane"}`}></i>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          className="btn rounded-circle p-3 shadow"
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
          style={buttonStyle}
        >
          <i className="fas fa-comment-dots"></i>
        </button>
      )}
    </div>
  );
}

export default App;
