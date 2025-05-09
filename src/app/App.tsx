import React from 'react';
import { usePhotoSearch } from '../hook/usePhotoSearch';
import SearchBox from '../component/SearchBox';
import PhotoGrid from '../component/PhotoGrid';
import Pagination from '../component/Pagination';

const App: React.FC = () => {
  const {
    photos,
    loading,
    error,
    totalCount,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    searchQuery,
    setSearchQuery
  } = usePhotoSearch();

  return (
    <div className="photo-gallery-app">
      <header className="app-header">
        <h1>Photo Gallery</h1>
        <div className="stats-bar">
          {!loading && (
            <p className="photo-count">
              Showing {photos.length} of {totalCount} photos
            </p>
          )}
          <div className="page-size-control">
            <label htmlFor="page-size">Photos per page:</label>
            <select
              id="page-size"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              disabled={loading}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
      </header>

      <main className="app-content">
        <SearchBox
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isLoading={loading}
        />

        <PhotoGrid
          photos={photos}
          loading={loading}
          error={error}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalCount / pageSize)}
          onPageChange={setCurrentPage}
          loading={loading}
        />
      </main>

      <style>{`
        .photo-gallery-app {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
                      Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        .app-header {
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
        }

        .app-header h1 {
          margin: 0 0 20px;
          color: #333;
        }

        .stats-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .photo-count {
          margin: 0;
          font-size: 14px;
          color: #666;
        }

        .page-size-control {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .page-size-control select {
          padding: 6px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .app-content {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          padding: 24px;
        }

        @media (max-width: 768px) {
          .stats-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default App;