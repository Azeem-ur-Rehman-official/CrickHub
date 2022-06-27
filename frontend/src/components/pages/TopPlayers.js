import { useState } from 'react';
import TopBatsman from './TopBatsman';
import TopBowler from './TopBowler';
const TopPlayers = () => {
  const [playerType, setplayerType] = useState(true);
  return (
    <div>
      <TopBatsman />
      <TopBowler />
    </div>
  );
};

export default TopPlayers;
