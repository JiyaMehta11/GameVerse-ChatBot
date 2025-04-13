import React, { useState } from "react";
import "../components/Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = {
    "Game Issues": ["Game Not Launching", "Performance Issues", "Other"],
    "Account Issues": ["Forgot Password", "Account Banned", "Other"],
    "Store Issues": ["Purchase Not Going Through", "Refund Request", "Other"],
    "Game Features": ["Game Updates", "DLC & Expansions", "Other"],
    "Technical Support": ["Graphics Settings", "Audio Issues", "Other"],
    "Contact Support": ["Email", "Phone", "Live Chat"],
  };

  const responses = {
    "Game Not Launching":
      "Ensure your game files are up to date and check system requirements.",
    "Performance Issues":
      "Try lowering the game graphics settings or closing background applications.",
    "Forgot Password":
      "Reset your password by clicking 'Forgot Password' on the login page.",
    "Account Banned": "Please contact support for more details on the ban.",
    "Purchase Not Going Through":
      "Check your payment method and try again, or contact support.",
    "Refund Request":
      "You can request a refund through your account settings or contact support.",
    "Game Updates":
      "Make sure your game is up to date by checking for updates in the game launcher.",
    "DLC & Expansions":
      "You can check and purchase additional content via the in-game store or launcher.",
    "Graphics Settings":
      "Try adjusting the graphics settings in the options menu or updating your graphics drivers.",
    "Audio Issues":
      "Ensure your sound settings are correct and that your audio drivers are up to date.",
    Email: "You can reach us at support@gamingwebsite.com.",
    Phone: "Call us at +1-234-567-890 for immediate assistance.",
    "Live Chat":
      "Visit our support page to chat with a representative for real-time help.",
    Other:
      "Please provide more details about your issue to us through our contact information.",
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setMessages((prev) => [
      ...prev,
      { text: `You selected: ${category}`, sender: "user" },
      { text: "What type of issue?", sender: "bot", type: "subcategories" },
    ]);
  };

  const handleSubCategoryClick = (subCategory) => {
    setMessages((prev) => [
      ...prev,
      { text: `You selected: ${subCategory}`, sender: "user" },
      {
        text: responses[subCategory] || "I don't have an answer yet.",
        sender: "bot",
      },
      { text: "Do you need further help?", sender: "bot", type: "yesno" },
    ]);
  };

  const handleYesNoClick = (answer) => {
    setMessages((prev) => [...prev, { text: answer, sender: "user" }]);

    if (answer === "Yes") {
      setMessages((prev) => [
        ...prev,
        {
          text: "Okay! Please select a category.",
          sender: "bot",
          type: "categories",
        },
      ]);
      setSelectedCategory(null);
    } else {
      setMessages((prev) => [
        ...prev,
        { text: "Glad to help! Enjoy your gaming experience!", sender: "bot" },
      ]);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: "40px",
        backgroundColor: "#0d1117",
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
      }}
    >
      {/* Welcome Section */}
      <div
        style={{
          maxWidth: "400px",
          marginRight: "40px",
          marginLeft: "40px",
          marginTop: "100px",
        }}
      >
        <h1
          style={{ fontSize: "3.8rem", color: "#2e8bc0", marginBottom: "10px" }}
        >
          WELCOME TO GAMEVERSE
        </h1>
        <p style={{ fontSize: "1.5rem", color: "#ccc", fontStyle: "italic" }}>
          Your hub for all things support — Let’s get you back to gaming in no
          time.
        </p>
      </div>

      {/* Chatbot */}
      <div className="chatbot-container">
        <div
          style={{
            width: "720px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            backgroundColor: "#1f1f1f",
            marginRight: "100px",
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
            Gaming Support Chatbot
          </h2>
          <div
            style={{
              maxHeight: "400px",
              overflowY: "auto",
              marginBottom: "10px",
              padding: "10px",
              backgroundColor: "#f3f5f9",
              borderRadius: "5px",
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  textAlign: msg.sender === "user" ? "right" : "left",
                  margin: "5px 0",
                }}
              >
                <span
                  style={{
                    padding: "8px",
                    borderRadius: "5px",
                    display: "inline-block",
                    backgroundColor:
                      msg.sender === "user" ? "#0c2d48" : "#145da0",
                  }}
                >
                  {msg.text}
                </span>

                {msg.type === "categories" && (
                  <div>
                    {Object.keys(categories).map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        style={{
                          margin: "5px",
                          padding: "10px",
                          display: "block",
                        }}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}

                {msg.type === "subcategories" && (
                  <div>
                    {categories[selectedCategory]?.map((subCategory) => (
                      <button
                        key={subCategory}
                        onClick={() => handleSubCategoryClick(subCategory)}
                        style={{
                          margin: "5px",
                          padding: "8px",
                          display: "block",
                        }}
                      >
                        {subCategory}
                      </button>
                    ))}
                  </div>
                )}

                {msg.type === "yesno" && (
                  <div>
                    <button
                      onClick={() => handleYesNoClick("Yes")}
                      style={{ margin: "5px", padding: "8px" }}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => handleYesNoClick("No")}
                      style={{ margin: "5px", padding: "8px" }}
                    >
                      No
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Start Chat */}
          {messages.length === 0 && (
            <div>
              <p style={{ textAlign: "center", fontWeight: "bold" }}>
                Please select a category of your issue:
              </p>
              {Object.keys(categories).map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  style={{
                    margin: "5px",
                    padding: "8px",
                    display: "block",
                    width: "100%",
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
