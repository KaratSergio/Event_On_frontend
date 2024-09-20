export const getFilterElements = () => {
  return {
    titleInput: document.querySelector('#titleFilter'),
    organizerInput: document.querySelector('#organizerFilter'),
    dateInput: document.querySelector('#dateFilter'),
    fullNameInput: document.getElementById('fullNameFilter'),
    emailInput: document.getElementById('emailFilter'),
  };
};

export const renderEventsContainer = (eventsContainer, eventsHTML) => {
  eventsContainer.innerHTML = eventsHTML;
};

export const renderParticipantsList = (participantsList, html) => {
  participantsList.innerHTML = html;
};

export const displayMessage = (container, message) => {
  container.innerHTML = message;
};

export const clearContainer = container => {
  container.innerHTML = '';
};

export const setElementText = (element, text) => {
  if (element) {
    element.textContent = text;
  }
};

export const createBackToEventsLink = participantsList => {
  participantsList.innerHTML += `<a class="back-to-link list-link" href="../index.html">back to events</a>`;
};
