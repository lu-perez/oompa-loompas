import { useEffect, useRef } from 'react';

const useInfiniteScroll = (
  getData: () => void,
  currentPage: number,
  totalPages: number,
  isLoading: boolean,
) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (
        bottomRef.current &&
        window.innerHeight + window.scrollY >= bottomRef.current.offsetTop
      ) {
        if (currentPage < totalPages && !isLoading) {
          getData();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage, totalPages, isLoading, getData]);

  return bottomRef;
};

export default useInfiniteScroll;
