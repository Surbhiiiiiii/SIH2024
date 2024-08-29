document.addEventListener('DOMContentLoaded', function () {
    const chatWindow = document.getElementById('chat-window');
    const chatPopupBtn = document.getElementById('chat-popup-btn');
    const closeChatBtn = document.getElementById('close-chat');
    const sendMessageBtn = document.getElementById('send-message');
    const userMessageInput = document.getElementById('user-message');
    const chatBody = document.querySelector('.chat-body');
  
    // Open chat window
    chatPopupBtn.addEventListener('click', function () {
        chatWindow.style.display = 'flex';
        this.parentElement.style.display = 'none';
    });
  
    // Close chat window
    closeChatBtn.addEventListener('click', function () {
        chatWindow.style.display = 'none';
        document.querySelector('.chat-popup').style.display = 'flex';
    });
  
    // Send message
    sendMessageBtn.addEventListener('click', function () {
        const userMessage = userMessageInput.value.trim();
        if (userMessage) {
            // User message
            const messageElement = document.createElement('div');
            messageElement.textContent = userMessage;
            messageElement.classList.add('user-message');
            chatBody.appendChild(messageElement);
            userMessageInput.value = '';
  
            // Scroll to the bottom
            chatBody.scrollTop = chatBody.scrollHeight;
  
            // Simulate chatbot response
            setTimeout(() => {
                const botMessageElement = document.createElement('div');
                botMessageElement.textContent = 'How can I assist you with booking tickets?';
                botMessageElement.classList.add('bot-message');
                chatBody.appendChild(botMessageElement);
  
                // Scroll to the bottom
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 1000);
        }
    });
  });
  
  
  
  
        