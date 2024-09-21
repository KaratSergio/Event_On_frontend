import Chart from 'chart.js/auto';
import { fetchParticipants } from '../services/participantService';

const renderChart = data => {
  const ctx = document.getElementById('registrationsChart').getContext('2d');

  const labels = data.map(entry => entry.date);
  const registrations = data.map(entry => entry.count);

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Registrations per Day',
          data: registrations,
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        title: {
          display: true,
          text: 'Daily Registrations',
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Date',
          },
          ticks: {
            autoSkip: true,
            maxTicksLimit: 10,
          },
        },
        y: {
          title: {
            display: true,
            text: 'Registrations',
          },
          beginAtZero: true,
        },
      },
    },
  });
};

export const fetchAndRenderChart = async () => {
  const eventId = new URLSearchParams(window.location.search).get('eventId');

  if (!eventId) {
    console.error('Event ID not found in URL.');
    return;
  }

  try {
    const participants = await fetchParticipants(eventId);

    if (participants.length === 0) {
      console.warn('No participants found for this event.');
      const chartContainer = document.getElementById('chartContainer');
      if (chartContainer) {
        chartContainer.style.display = 'none';
      }
      return;
    }

    const registrationCounts = {};

    participants.forEach(participant => {
      if (participant.registrationDate) {
        const registrationDate = new Date(participant.registrationDate);

        if (!isNaN(registrationDate.getTime())) {
          const dateString = registrationDate.toISOString().split('T')[0];

          if (registrationCounts[dateString]) {
            registrationCounts[dateString] += 1;
          } else {
            registrationCounts[dateString] = 1;
          }
        } else {
          console.warn(`Invalid registration date for participant: ${participant.fullName}`);
        }
      } else {
        console.warn(`Missing registration date for participant: ${participant.fullName}`);
      }
    });

    const chartData = Object.keys(registrationCounts)
      .map(date => ({
        date,
        count: registrationCounts[date],
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    renderChart(chartData);

    const chartContainer = document.getElementById('chartContainer');
    if (chartContainer) {
      chartContainer.style.display = 'block';
    }
  } catch (error) {
    console.error('Error fetching participants for chart:', error);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const chartContainer = document.getElementById('chartContainer');
  if (chartContainer) {
    fetchAndRenderChart();
  }
});
