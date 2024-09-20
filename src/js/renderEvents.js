import { fetchEvents } from '../services/eventService';
import { renderPagination } from './renderPagination';
import { filterEvents } from './filters';
import { getFilterElements, renderEventsContainer, displayMessage } from '../utils/domUtils';

let currentPage = 1;
let totalPages = 1;
let filtersInitialized = false;

const applyFilters = (filterCriteria = {}, page = 1) => {
  renderEvents(page, filterCriteria);
};

const setupFilters = () => {
  const { titleInput, organizerInput, dateInput } = getFilterElements();

  if (titleInput && organizerInput && dateInput && !filtersInitialized) {
    const handleFilterChange = () => {
      const criteria = {
        title: titleInput.value,
        organizer: organizerInput.value,
        date: dateInput.value,
      };
      applyFilters(criteria, currentPage);
    };

    titleInput.addEventListener('input', handleFilterChange);
    organizerInput.addEventListener('input', handleFilterChange);
    dateInput.addEventListener('input', handleFilterChange);

    filtersInitialized = true;
  } else {
    console.error('Filter input elements not found.');
  }
};

export const renderEvents = async (page = 1, filterCriteria = {}) => {
  const eventsContainer = document.querySelector('.events');

  if (!eventsContainer) {
    console.error('Events container not found.');
    return;
  }

  const savedPage = sessionStorage.getItem('currentPage');
  const currentPageToUse = savedPage ? Number(savedPage) : page;

  try {
    const { events, totalPages: total } = await fetchEvents(currentPageToUse);
    totalPages = total;

    const filteredEvents = filterEvents(events, filterCriteria);

    if (filteredEvents.length === 0) {
      displayMessage(eventsContainer, '<p>No events available.</p>');
      return;
    }

    const eventsHTML = filteredEvents
      .map(
        event => `
      <li class="event-item">
        <div class="event-content">
          <div>
            <h3>${event.title}</h3>
            <p class="event-description">${event.description}</p>
          </div>
          <div>
            <p>Organizer: ${event.organizer}</p>
            <p>Date of the event: ${new Date(event.eventDate).toLocaleDateString()}</p>
          </div>
        </div>
        <div class="event-link-container">
          <a class="link-register" href="../registration-page.html?eventId=${
            event._id
          }">Register</a>
          <a class="link-view" href="../participants-page.html?eventId=${
            event._id
          }&title=${encodeURIComponent(event.title)}">View</a>
        </div>
      </li>
    `
      )
      .join('');

    renderEventsContainer(eventsContainer, eventsHTML);

    renderPagination(currentPageToUse, totalPages, newPage => {
      currentPage = newPage;
      sessionStorage.setItem('currentPage', newPage);
      renderEvents(currentPage, filterCriteria);
    });
  } catch (error) {
    displayMessage(eventsContainer, '<p>Error loading events. Please try again later.</p>');
    console.error('Error fetching events:', error);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const checkEventsContainer = setInterval(() => {
    const eventsContainer = document.querySelector('.events');
    if (eventsContainer) {
      clearInterval(checkEventsContainer);
      renderEvents();
      setupFilters();
    }
  }, 100);
});
