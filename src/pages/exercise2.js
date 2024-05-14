import { useEffect, useState } from 'react';
import Range from '../components/range';
import Head from 'next/head';
import '../styles/globals.css';

const Exercise2 = () => {
  const [rangeValues, setRangeValues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/range-values')
      .then(response => response.json())
      .then(data => {
        setRangeValues(data.rangeValues);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <Head>
        <title>Fixed Values Range - Exercise 2</title>
      </Head>
      <div className='container'>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <h1 className='title'>Fixed Values Range</h1>
            <Range fixedValues={rangeValues} min={Math.min(...rangeValues)} max={Math.max(...rangeValues)} />
          </>
        )}
      </div>
    </div>
  );
};
export default Exercise2;
