function addUpdate(message) {
    const chatContainer = document.querySelector('.chat-container');
    const chatMessage = document.createElement('div');
    const messageText = document.createElement('p');
    const timestampElement = document.createElement('span');
  
    chatMessage.classList.add('chat-message', 'chat-message-left');
    chatMessage.dataset.timestamp = new Date().toISOString();
    messageText.textContent = message;
  
    timestampElement.classList.add('timestamp');
  
    chatMessage.appendChild(messageText);
    chatMessage.appendChild(timestampElement);
  
    chatContainer.appendChild(chatMessage);
    formatTimestamp(chatMessage);
  }
  
  function formatTimestamp(chatMessage) {
    const timestamp = new Date(chatMessage.dataset.timestamp);
    const timestampElement = chatMessage.querySelector('.timestamp');
  
    timestampElement.textContent = `${timestamp.toLocaleTimeString()} ${timestamp.toLocaleDateString()}`;
  }
  
  function loadUpdates() {
    const updates = JSON.parse(localStorage.getItem('updates') || '[]');
    updates.forEach(update => addUpdate(update.message, update.timestamp));
  }
  
  function saveUpdate(message) {
    const updates = JSON.parse(localStorage.getItem('updates') || '[]');
    updates.push({ message, timestamp: new Date().toISOString() });
    localStorage.setItem('updates', JSON.stringify(updates));
  }
  
  function handleNewUpdate() {
    const message = prompt('Enter your update message:');
    if (message) {
      saveUpdate(message);
      addUpdate(message);
    }
  }
  
  document.addEventListener('DOMContentLoaded', loadUpdates);
  