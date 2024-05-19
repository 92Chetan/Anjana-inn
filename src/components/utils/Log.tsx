'use client';
import { useEffect } from 'react';
import axios from 'axios';
import { hasCookie, setCookie } from 'cookies-next';
const Log = () => {
  useEffect(() => {
    const countTraffic = async () => {
      try {
        await axios.post('/api/traffic');
      } catch (error) {
        console.error('Error counting traffic:', error);
      }
    };

    const hasVisitedToday = hasCookie('hasVisitedToday');
    console.log(hasVisitedToday);
    if (!hasVisitedToday) {
      countTraffic();
      setCookie('hasVisitedToday', true, { maxAge: 23 * 59 * 59 * 999 });
    }
  }, []);

  return null;
};

export default Log;
