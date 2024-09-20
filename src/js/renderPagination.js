export const renderPagination = (currentPage, totalPages, onPageChange) => {
  const paginationContainer = document.querySelector('.pagination');
  let paginationHTML = '';

  paginationHTML += `<button class="pagination-btn" ${
    currentPage === 1 ? 'disabled' : ''
  } data-page="1">&laquo;</button>`;
  paginationHTML += `<button class="pagination-btn" ${
    currentPage === 1 ? 'disabled' : ''
  } data-page="${currentPage - 1}">&lt;</button>`;

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      paginationHTML += `<button class="pagination-btn ${
        i === currentPage ? 'active' : ''
      }" data-page="${i}">${i}</button>`;
    }
  } else {
    if (currentPage <= 2) {
      for (let i = 1; i <= 3; i++) {
        paginationHTML += `<button class="pagination-btn ${
          i === currentPage ? 'active' : ''
        }" data-page="${i}">${i}</button>`;
      }
      paginationHTML += `<span class="pagination-dots">...</span>`;
      paginationHTML += `<button class="pagination-btn" data-page="${totalPages}">${totalPages}</button>`;
    } else if (currentPage > totalPages - 2) {
      paginationHTML += `<button class="pagination-btn" data-page="1">1</button>`;
      paginationHTML += `<span class="pagination-dots">...</span>`;
      for (let i = totalPages - 2; i <= totalPages; i++) {
        paginationHTML += `<button class="pagination-btn ${
          i === currentPage ? 'active' : ''
        }" data-page="${i}">${i}</button>`;
      }
    } else {
      paginationHTML += `<button class="pagination-btn" data-page="1">1</button>`;
      paginationHTML += `<span class="pagination-dots">...</span>`;
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        paginationHTML += `<button class="pagination-btn ${
          i === currentPage ? 'active' : ''
        }" data-page="${i}">${i}</button>`;
      }
      paginationHTML += `<span class="pagination-dots">...</span>`;
      paginationHTML += `<button class="pagination-btn" data-page="${totalPages}">${totalPages}</button>`;
    }
  }

  paginationHTML += `<button class="pagination-btn" ${
    currentPage === totalPages ? 'disabled' : ''
  } data-page="${currentPage + 1}">&gt;</button>`;
  paginationHTML += `<button class="pagination-btn" ${
    currentPage === totalPages ? 'disabled' : ''
  } data-page="${totalPages}">&raquo;</button>`;

  paginationContainer.innerHTML = paginationHTML;

  const paginationButtons = document.querySelectorAll('.pagination-btn');
  paginationButtons.forEach(button => {
    button.addEventListener('click', e => {
      const newPage = Number(e.target.getAttribute('data-page'));
      if (newPage !== currentPage) {
        sessionStorage.setItem('currentPage', newPage);
        onPageChange(newPage);
      }
    });
  });
};
