import React from 'react';

interface SearchBoxProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isLoading?: boolean;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  searchQuery,
  setSearchQuery,
  isLoading = false,
}) => {
  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <div className='search-box'>
      <div className='search-input-wrapper'>
        <input
          id='photo-search'
          type='text'
          placeholder='Search photos...'
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className='search-input'
          aria-label='Search photos'
          disabled={isLoading}
          autoFocus
        />
        {searchQuery && (
          <button
            onClick={handleClear}
            className='clear-button'
            aria-label='Clear search'
            disabled={isLoading}
          >
            ×
          </button>
        )}
        {isLoading && <div className='search-spinner' aria-hidden='true'></div>}
      </div>

      <style>{`
        .search-box {
          margin-bottom: 20px;
          width: 100%;
        }
        
        .search-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .search-input {
          width: 100%;
          padding: 12px 40px 12px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
          transition: border-color 0.2s;
        }
        
        .search-input:focus {
          outline: none;
          border-color: #2196f3;
          box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.2);
        }

        .search-input:disabled {
          background-color: #f5f5f5;
          cursor: not-allowed;
        }
        
        .clear-button {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #888;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
        }

        .clear-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .clear-button:hover:not(:disabled) {
          color: #333;
        }

        .search-spinner {
          position: absolute;
          right: 12px;
          width: 20px;
          height: 20px;
          border: 2px solid rgba(33, 150, 243, 0.2);
          border-top-color: #2196f3;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SearchBox;
