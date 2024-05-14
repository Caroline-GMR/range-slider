import Link from 'next/link';

const Home = () => {
  return (
    <div className='container'>
      <h1>Range Component</h1>
      <div className='links'>
          <Link href="/exercise1">Normal Range</Link>
          <Link href="/exercise2">Fixed Values Range</Link>
      </div>
    </div>
  );
};

export default Home;
