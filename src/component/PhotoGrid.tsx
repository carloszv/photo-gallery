import React from 'react';
import { Photo } from '../types';

interface PhotoGridProps {
  photos: Photo[];
  loading: boolean;
  error: string | null;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos, loading, error }) => {
  if (error) {
    return <div className='error-message'>Error: {error}</div>;
  }

  if (loading) {
    return (
      <div className='loading-container'>
        <div className='spinner'></div>
        <p>Loading photos...</p>
      </div>
    );
  }

  if (photos.length === 0) {
    return <div className='no-photos-message'>No photos found</div>;
  }

  return (
    <div className='photo-grid'>
      {photos.map(photo => (
        <div key={photo.id} className='photo-card'>
          <div className='photo-image'>
            <img src='no-image.jpeg' alt={photo.title} loading='lazy' />
          </div>
          <div className='photo-info'>
            <h3 className='photo-title'>{photo.title}</h3>
            <p className='photo-id'>ID: {photo.id}</p>
            <p className='photo-album'>Album: {photo.albumId}</p>
          </div>
        </div>
      ))}

      <style>{`
        .photo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .photo-card {
          background-color: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .photo-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
        }

        .photo-image {
          width: 100%;
          height: 50px;
          overflow: hidden;
        }

        .photo-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }

        .photo-card:hover .photo-image img {
          transform: scale(1.05);
        }

        .photo-info {
          padding: 15px;
        }

        .photo-title {
          font-size: 16px;
          margin: 0 0 10px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .photo-id, .photo-album {
          margin: 5px 0;
          font-size: 14px;
          color: #666;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 50px 0;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(33, 150, 243, 0.2);
          border-top-color: #2196f3;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 16px;
        }

        .error-message {
          padding: 15px;
          margin: 20px 0;
          background-color: #ffebee;
          color: #c62828;
          border-radius: 4px;
        }

        .no-photos-message {
          text-align: center;
          padding: 40px;
          color: #666;
          background-color: #f5f5f5;
          border-radius: 4px;
          margin: 20px 0;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .photo-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          }
        }

        @media (max-width: 480px) {
          .photo-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default PhotoGrid;
