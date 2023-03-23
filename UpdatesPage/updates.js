function addUpdate(message, timestamp = new Date().toISOString()) {
    const chatContainer = document.querySelector('.chat-container');
    const chatMessage = document.createElement('div');
    const messageText = document.createElement('p');
    const timestampElement = document.createElement('span');
  
    chatMessage.classList.add('chat-message', 'chat-message-left');
    chatMessage.dataset.timestamp = timestamp;
    messageText.textContent = message;
  
    timestampElement.classList.add('timestamp');
  
    chatMessage.appendChild(messageText);
    chatMessage.appendChild(timestampElement);
  
    chatContainer.prepend(chatMessage);
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
    const input = document.querySelector('.updates_input');
    const message = input.value.trim();
  
    if (message !== '') {
      addUpdate(message);
      input.value = '';
  
      let updates = JSON.parse(localStorage.getItem('updates')) || [];
      updates.push({ text: message, timestamp: new Date().toISOString() });
      localStorage.setItem('updates', JSON.stringify(updates));
    }
  }
  document.addEventListener('DOMContentLoaded', () => {
    let updates = JSON.parse(localStorage.getItem('updates')) || [];
  
    updates.forEach((update) => {
      addUpdate(update.text, update.timestamp);
    });
  });
  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      handleNewUpdate();
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    let updates = JSON.parse(localStorage.getItem('updates')) || [];
  
    updates.forEach((update) => {
      addUpdate(update.text, update.timestamp);
    });
  
    // Add the event listener for the 'keydown' event on the input field
    const input = document.querySelector('.updates_input');
    input.addEventListener('keydown', handleKeyPress);
  });
  