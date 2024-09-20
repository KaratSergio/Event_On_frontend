export const filterEvents = (events, criteria = {}) => {
  return events.filter(event => {
    const matchesTitle = criteria.title
      ? event.title.toLowerCase().includes(criteria.title.toLowerCase())
      : true;
    const matchesOrganizer = criteria.organizer
      ? event.organizer.toLowerCase().includes(criteria.organizer.toLowerCase())
      : true;

    let matchesDate = true;
    if (criteria.date) {
      const eventDate = new Date(event.eventDate).toISOString().split('T')[0];
      matchesDate = eventDate === criteria.date;
    }

    return matchesTitle && matchesOrganizer && matchesDate;
  });
};

export const filterParticipants = (participants, searchTerms) => {
  const { fullName, email } = searchTerms;
  return participants.filter(participant => {
    const matchesFullName = fullName
      ? participant.fullName.toLowerCase().includes(fullName.toLowerCase())
      : true;
    const matchesEmail = email
      ? participant.email.toLowerCase().includes(email.toLowerCase())
      : true;
    return matchesFullName && matchesEmail;
  });
};
