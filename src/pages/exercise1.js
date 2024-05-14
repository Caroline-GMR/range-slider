import { useEffect, useState } from 'react';
import Range from '../components/range';
import Head from 'next/head';
import '../styles/globals.css';

const Exercise1 = () => {
  const [minMax, setMinMax] = useState({ min: 1, max: 100 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/range-values')
      .then(response => response.json())
      .then(data => {
        setMinMax({ min: data.min, max: data.max });
        setIsLoading(false);
      });
  }, []);


  return (
    <div>
      <Head>
        <title>Normal Range - Exercise 1</title>
      </Head>
      <div className='container'>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <h1 className='title'>Normal Range</h1>
          <Range min={minMax.min} max={minMax.max} />
          </>
        )}
      </div>
    </div>
  );
};

export default Exercise1;
