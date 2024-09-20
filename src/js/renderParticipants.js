import { fetchParticipants } from '../services/participantService';
import { filterParticipants } from './filters';
import {
  renderParticipantsList,
  displayMessage,
  createBackToEventsLink,
  setElementText,
  clearContainer,
} from '../utils/domUtils';

const getURLParam = paramName => {
  const params = new URLSearchParams(window.location.search);
  return params.get(paramName);
};

const isProduction = window.location.hostname.includes('github.io');
const basePath = isProduction ? '/Event_On_frontend/assets/' : './img/';

const generateParticipantsHTML = participants => {
  return participants
    .map(
      participant => `
    <li class="participant-item">
      <svg class="participant-icon" width="44" height="44">
        <use href="${basePath}icon.svg#icon-user"></use>
      </svg>
      <div>
        <h3>${participant.fullName}</h3>
        <p>Email: ${participant.email}</p>
      </div>
    </li>
  `
    )
    .join('');
};

const renderParticipants = async (searchTerm = {}) => {
  const participantsContainer = document.querySelector('.participants-list-container');
  const participantsList = document.querySelector('.participants-list');
  const eventTitleElement = document.querySelector('.event-title');

  if (!participantsContainer || !participantsList) {
    console.error('Participants container or list not found.');
    return;
  }

  const eventId = getURLParam('eventId');
  const eventTitle = getURLParam('title');

  clearContainer(participantsList);

  setElementText(eventTitleElement, eventTitle || 'Event Participants');

  if (!eventId) {
    displayMessage(participantsList, '<p>Event ID not provided.</p>');
    return;
  }

  try {
    const participants = await fetchParticipants(eventId);
    const filteredParticipants = filterParticipants(participants, searchTerm);

    if (filteredParticipants.length === 0) {
      displayMessage(participantsList, '<p class="message">There are no participants.</p>');
    } else {
      const participantsHTML = generateParticipantsHTML(filteredParticipants);
      renderParticipantsList(participantsList, participantsHTML);
    }

    createBackToEventsLink(participantsList);
  } catch (error) {
    displayMessage(participantsList, '<p>Error loading participants. Please try again later.</p>');
    console.error('Error fetching participants:', error);
  }
};

const setupFilters = () => {
  const { fullNameInput, emailInput } = getFilterElements();

  if (!fullNameInput || !emailInput) {
    console.error('Filter input elements not found.');
    return;
  }

  const handleFilterChange = () => {
    const searchTerm = {
      fullName: fullNameInput.value,
      email: emailInput.value,
    };
    renderParticipants(searchTerm);
  };

  fullNameInput.addEventListener('input', handleFilterChange);
  emailInput.addEventListener('input', handleFilterChange);
};

const initializeParticipantsPage = () => {
  const participantsContainer = document.querySelector('.participants-list-container');
  if (participantsContainer) {
    renderParticipants();
    setupFilters();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const checkParticipantsContainer = setInterval(() => {
    const participantsContainer = document.querySelector('.participants-list-container');
    if (participantsContainer) {
      clearInterval(checkParticipantsContainer);
      initializeParticipantsPage();
    }
  }, 100);
});
