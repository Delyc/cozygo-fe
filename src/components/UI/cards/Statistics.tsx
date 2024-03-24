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
    <div className="stat-card">
      <h2 className="text-6xl font-bold text-blue-600">{count}</h2>
      <p className="text-gray-500">{caption}</p>
    </div>
  );
};

const StatsGrid: React.FC = () => {
  return (
    <div className="grid xl:grid-cols-3 gap-4 px-5">
      <StatCard target={20} caption="People believe in our service" />
      <StatCard target={10} caption="Property and house ready for occupancy" />
      <StatCard target={40} caption="Partners who have worked with us" />
    </div>
  );
};

export default StatsGrid;
