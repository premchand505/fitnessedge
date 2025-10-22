'use client';

import { useState, useEffect, useRef } from 'react';

export default function VisitCounter() {
  const [count, setCount] = useState<number | null>(null);
  // 1. Create a Ref to track if the POST request has already been made
  const hasCounted = useRef(false); 

  useEffect(() => {
    // Prevent the logic from running if it's already counted OR 
    // if we are in React's Strict Mode doing a double render for the second time.
    if (hasCounted.current) {
      // If the ref is true, exit immediately.
      return; 
    }

    const incrementAndFetchCount = async () => {
      try {
        // 2. Set the ref to true BEFORE making the call
        hasCounted.current = true; 

        // Make the POST call to increment the counter
        const response = await fetch('/api/visits', {
          method: 'POST',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch count');
        }

        const data: { count: number } = await response.json();
        setCount(data.count);
      } catch (error) {
        console.error('Error fetching visit count:', error);
        setCount(0);
      }
    };

    incrementAndFetchCount();
  }, []); // Only runs on initial mount

  if (count === null) {
    return <span className="font-bold text-accent">...</span>;
  }

  if (count === 0) {
    return <span className="font-bold text-accent">---</span>;
  }

  return (
    <span className="font-bold text-accent">
      {count.toLocaleString('en-IN')}
    </span>
  );
}