import { registerParticipant } from '../services/participantService';
import { calculateAge } from '../utils/ageValidator';

const getEventIdFromURL = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get('eventId');
};

const handleRegistrationFormSubmit = async event => {
  event.preventDefault();

  const eventId = getEventIdFromURL();

  if (!eventId) {
    alert('Event ID is missing!');
    return;
  }

  const formData = new FormData(event.target);
  const birthday = formData.get('birthday');

  const age = calculateAge(birthday);

  if (age < 18) {
    alert('Participants must be at least 18 years old.');
    return;
  }

  if (age > 100) {
    alert('Participants must be younger than 100 years old.');
    return;
  }

  const participantData = {
    fullName: formData.get('fullName'),
    email: formData.get('email'),
    birthday,
    source: formData.get('source'),
    eventId,
  };

  try {
    const response = await registerParticipant(participantData);
    console.log('Participant registered successfully:', response);
    alert('The participant has been successfully registered!');
    event.target.reset();
  } catch (error) {
    console.error('Error registering participant:', error);
    alert('Error while registering participant. Please try again.');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const registrationForm = document.querySelector('#registrationForm');
  if (registrationForm) {
    registrationForm.addEventListener('submit', handleRegistrationFormSubmit);
  }
});
