import LiveMatches from './LiveMatches';
import PastMatches from './PastMatches';
import TournamentList from './TournamentList';
const LivePage = () => {
  return (
    <div className="container-fluid">
      <LiveMatches />
      <PastMatches />
      <TournamentList />
    </div>
  );
};

export default LivePage;
