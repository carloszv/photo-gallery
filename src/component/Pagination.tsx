import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  loading = false,
}) => {
  // Generate pagination buttons
  const renderPaginationButtons = () => {
    const buttons = [];

    // Previous button
    buttons.push(
      <button
        key='prev'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || loading}
        className='pagination-button'
        aria-label='Previous page'
      >
        &laquo;
      </button>
    );

    // Calculate which page buttons to show
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    // Adjust if we're near the end
    if (endPage - startPage < 4 && startPage > 1) {
      startPage = Math.max(1, endPage - 4);
    }

    // First page button if not in first group
    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className='pagination-button'
          disabled={loading}
        >
          1
        </button>
      );

      if (startPage > 2) {
        buttons.push(
          <span key='ellipsis1' className='pagination-ellipsis'>
            ...
          </span>
        );
      }
    }

    // Page number buttons
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`pagination-button ${i === currentPage ? 'active' : ''}`}
          aria-current={i === currentPage ? 'page' : undefined}
          disabled={loading}
        >
          {i}
        </button>
      );
    }

    // Last page button if not in last group
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key='ellipsis2' className='pagination-ellipsis'>
            ...
          </span>
        );
      }

      buttons.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className='pagination-button'
          disabled={loading}
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    buttons.push(
      <button
        key='next'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || loading}
        className='pagination-button'
        aria-label='Next page'
      >
        &raquo;
      </button>
    );

    return buttons;
  };

  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null;

  return (
    <div className='pagination-container'>
      <div className='pagination-info'>
        Page {currentPage} of {totalPages}
      </div>
      <div className='pagination-buttons'>{renderPaginationButtons()}</div>
      <style>{`
        .pagination-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
        }

        .pagination-buttons {
          display: flex;
          align-items: center;
        }

        .pagination-button {
          padding: 8px 12px;
          margin: 0 4px;
          border: 1px solid #ddd;
          background: white;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .pagination-button:hover:not(:disabled) {
          background-color: #f5f5f5;
        }

        .pagination-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .pagination-button.active {
          background-color: #2196f3;
          color: white;
          border-color: #2196f3;
        }

        .pagination-ellipsis {
          margin: 0 8px;
        }
      `}</style>
    </div>
  );
};

export default Pagination;
