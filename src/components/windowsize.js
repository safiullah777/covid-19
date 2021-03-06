import { useState, useEffect } from 'react';

export default function useWindowSize() {
  const isClient = typeof window === 'object';

  function getSize() {
    if(window.innerWidth<500){
    return {
      height: isClient ? 300 : undefined
        }
    }
    else{
        return{
        height: isClient ? 150: undefined
        }
    }
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}