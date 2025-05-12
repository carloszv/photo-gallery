import { useState, useEffect, useCallback } from 'react';
import { Photo } from '../types';

interface UsePhotoSearchResult {
  photos: Photo[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const usePhotoSearch = (): UsePhotoSearchResult => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [totalCount, setTotalCount] = useState<number>(0);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>('');

  // Debounce search query to avoid too many API calls
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      // Reset to first page when search query changes
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timerId);
  }, [searchQuery]);

  // Memoized fetch function to avoid recreating on every render
  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Calculate start index based on current page and page size
      const start = (currentPage - 1) * pageSize;
      // Build the API URL
      let url = `https://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=${pageSize}`;
      // Add search query parameter if present
      if (debouncedSearchQuery) {
        url += `&title_like=${encodeURIComponent(debouncedSearchQuery)}`;
      }
      // Fetch photos with pagination and optional search
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data: Photo[] = await response.json();
      // Get total count from headers or make a separate count request
      // JsonPlaceholder doesn't provide total count in headers, so we need a separate request
      let countUrl = 'https://jsonplaceholder.typicode.com/photos';
      if (debouncedSearchQuery) {
        countUrl += `?title_like=${encodeURIComponent(debouncedSearchQuery)}`;
      }
      const countResponse = await fetch(countUrl);
      if (!countResponse.ok) {
        throw new Error(`Error fetching count: ${countResponse.status}`);
      }
      const countData = await countResponse.json();
      setTotalCount(countData.length);
      setPhotos(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred'
      );
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, debouncedSearchQuery]);

  // Fetch photos whenever relevant parameters change
  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  return {
    photos,
    loading,
    error,
    totalCount,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    searchQuery,
    setSearchQuery,
  };
};