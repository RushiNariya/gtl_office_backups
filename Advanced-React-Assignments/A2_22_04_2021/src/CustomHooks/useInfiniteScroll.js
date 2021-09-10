import { useState, useEffect } from 'react';

export default function useInfiniteScroll(start = 10, page = 10) {
  const [limit, setLimit] = useState(start);

  useEffect(() => {
    const scrollParent = document.querySelector('.todolist');
    scrollParent.addEventListener('scroll', () => {
      if (
        scrollParent.scrollHeight - scrollParent.scrollTop
        <= scrollParent.offsetHeight + 70
      ) {
        setLimit((prevLimit) => prevLimit + page);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return limit;
}
