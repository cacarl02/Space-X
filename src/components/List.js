import React, { useEffect, useRef, useState } from 'react';

function List() {
  const [launchData, setLaunchData] = useState([]);
  const [shownData, setShownData] = useState([]);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(19);
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showLast, setShowLast] = useState(false)

  const fetchLaunch = async () => {
    try {
      const response = await fetch('https://api.spacexdata.com/v4/launches/', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      });
      const data = await response.json();
      setLaunchData(data);
    } catch (error) {
        console.error(error);
    }
};

useEffect(() => {
    fetchLaunch();
}, []);

  const renderMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setFirstIndex(firstIndex + 20);
      setLastIndex(lastIndex + 20);
      setIsLoading(false);
    }, 1000);
  };

  const lastRender = () => {
    setShowLast(true)
    setTimeout(() => {
        setShowLast(false)
    }, 1000);
  }

  useEffect(() => {
    setShownData(launchData.slice(0, lastIndex + 1));
  }, [launchData, firstIndex, lastIndex]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
      const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight;
      const lastVisibleIndex = shownData.length - 1;
      const isLastItemVisible = lastVisibleIndex < launchData.length - 1;
        console.log(isLastItemVisible, isScrolledToBottom, shownData.length, launchData.length)
      if (isScrolledToBottom && isLastItemVisible) {
        renderMore();
      }
      if(!isLastItemVisible && isScrolledToBottom) {
        lastRender()
      }
    };

    containerRef.current.addEventListener('scroll', handleScroll);
    return () => containerRef.current.removeEventListener('scroll', handleScroll);
  }, [lastIndex, isLoading, launchData.length]);

  return (
    <section>
        <div ref={containerRef} className="flex flex-col h-96 overflow-y-scroll overflow-hidden mt-4 bg-white">
        {shownData && shownData.length ? (
            shownData.map((obj) => (
            <div 
                key={obj.id}
                className='my-2'
                >
                <div className="flex flex-col justify-center">
                <div className="flex">
                    <div className="pr-2 font-bold">{obj.flight_number}:</div>
                    <div className="pr-2 font-bold">{obj.name}</div>
                    <div className="font-bold">{`(${obj.date_utc.slice(0, 4)})`}</div>
                </div>
                <div>{obj.details}</div>
                </div>
            </div>
            ))
        ) : (
            <div>No records found.</div>
        )}
        </div>
        <div className='flex items-center justify-center mt-8'>
            {isLoading && <svg
            className="animate-spin h-10 w-10 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            ></circle>
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-1.647zM20 12c0-3.042-1.135-5.824-3-7.938l-3 1.647A7.962 7.962 0 0120 12h4a8 8 0 01-8 8v-4zm-2-5.291l-3 1.647A5.978 5.978 0 0012 10V2.01c3.314 0 6 2.687 6 5.99h-2z"
            ></path>
            </svg>}
            {showLast && <div>No more to show.</div>}
        </div>
    </section>
  );
}

export default List;
