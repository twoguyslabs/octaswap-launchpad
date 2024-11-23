import { useEffect, useState } from 'react';

export default function useOctaPrice() {
  const [octaPrice, setOctaPrice] = useState(0);

  useEffect(() => {
    const fetchOctaPrice = async () => {
      try {
        const res = await fetch('/api/octa/');

        if (!res.ok) {
          throw new Error('Failed to fetch price');
        }

        const data = await res.json();
        setOctaPrice(data.data['24261'].quote.USD.price);
      } catch (error) {
        console.error('Error fetching OCTA price:', error);
      }
    };

    // Initial fetch
    fetchOctaPrice();

    // Set up interval to fetch every 1 minute
    const interval = setInterval(fetchOctaPrice, 60000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return octaPrice;
}
