import { useEffect, useState } from 'react';

interface StatCardProps {
  target: number;
  caption: string;
}

const StatCard: React.FC<StatCardProps> = ({ target, caption }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => (prevCount < target ? prevCount + 1 : prevCount));
    }, 50); 

    return () => clearInterval(interval); 
  }, [target]);

  return (
    <div className="flex items-center gap-3  w-64">
      <h2 className="text-5xl  text-indigo-600">{count}</h2>
      <p className="text-gray-500">{caption}</p>
    </div>
  );
};

const StatsGrid: React.FC = () => {
  return (
    <div className="grid xl:grid-cols-3 px-20  gap-6 bg-indigo-100/80 py-10   rounded-md max-w-[90rem]">
      <StatCard target={90} caption="People believe in our service" />
      <StatCard target={110} caption="Property and house ready for occupancy" />
      <StatCard target={40} caption="Partners who have worked with us" />
    </div>
  );
};

export default StatsGrid;
