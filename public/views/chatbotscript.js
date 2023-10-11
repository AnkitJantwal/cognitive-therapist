document.addEventListener("DOMContentLoaded", function() {
    // Your script code here

    const chatbotButton = document.getElementById("chatbot-button");
    const chatbotWindow = document.getElementById("chatbot-window");
    const chatbotMessages = document.getElementById("chatbot-messages");

    chatbotButton.addEventListener("click", () => {
        chatbotWindow.style.display = "block";
    });

    document.getElementById("user-input").addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            const userMessage = this.value;
            this.value = ""; // Clear the input field
            displayUserMessage(userMessage);

            // Handle and respond to user input
            handleUserInput(userMessage);
        }
    });

    function displayUserMessage(message) {
        const userMessageElement = document.createElement("div");
        userMessageElement.className = "user-message";
        userMessageElement.textContent = message;
        chatbotMessages.appendChild(userMessageElement);
    }

    function displayChatbotResponse(response) {
        const chatbotResponseElement = document.createElement("div");
        chatbotResponseElement.className = "chatbot-message";
        chatbotResponseElement.textContent = response;
        chatbotMessages.appendChild(chatbotResponseElement);
    }

    function handleUserInput(message) {
        // Sample logic to handle user input and provide responses
        message = message.toLowerCase();

        if (message.includes("hello")) {
            displayChatbotResponse("Hello! How can I assist you today?");
        } else if (message.includes("how are you")) {
            displayChatbotResponse("I'm just a chatbot, but I'm here to help you!");
        }
        else if (message.includes("hi")) {
            displayChatbotResponse("Hello! How can I assist you today?");
        }
        
        else if ("How to contact") {
            displayChatbotResponse("Feel free to reach us out at 111222333445");
        } 
        else if ("I am facing some trouble") {
            displayChatbotResponse("Yes! Feel free to ask. I will try my best to assist you.");
        }else {
            displayChatbotResponse("I'm sorry, I don't understand. Please ask another question.");
        }
    }
});
