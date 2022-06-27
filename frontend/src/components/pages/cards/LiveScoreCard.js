import '../../css/scoreCard.css';
const LiveScoreCard = (props) => {
  console.log('livescorecard');
  console.log(props);
  return (
    <div className="col-12 col-md-6 col-lg-4 p-4">
      <div className="score-card container shadow p-4 rounded">
        <div className="headingName">
          <h6>
            {props.payload.schedule.team_A_name} VS{' '}
            {props.payload.schedule.team_B_name}
          </h6>
        </div>
        <div className="row headingDate px-3">
          {props.payload.schedule.MatchCompleted == true ? (
            <p>Result</p>
          ) : (
            <p>
              Today(<b className="liveMatch">Live</b>)
            </p>
          )}
        </div>

        <div className=" middleTeams py-2">
          <div className="row text-white">
            <div className="col">
              <span className="card-img">
                <img
                  className="rounded float-left"
                  src={props.payload.team_A_id.image.url}
                  alt="teamA"
                />
              </span>
              <span className="text-center">
                <p>
                  {props.payload.teamA_Ining_Status == true &&
                  props.payload.teamB_Ining_Status == false
                    ? 'Target'
                    : 'Score'}{' '}
                  : {props.payload.teamA_Score}/{props.payload.teamA_out}
                </p>
                <p>
                  Overs({props.payload.teamA_over}.{props.payload.teamA_balls})
                </p>
              </span>
            </div>
            <div className="col">
              <span className="card-img">
                <img
                  className="rounded float-right"
                  src={props.payload.team_B_id.image.url}
                  alt="teamA"
                />
              </span>
              <span className="text-center">
                <p>
                  {props.payload.teamB_Ining_Status == true &&
                  props.payload.teamA_Ining_Status == false
                    ? 'Target'
                    : 'Score'}{' '}
                  : {props.payload.teamB_Score}/{props.payload.teamB_out}
                </p>
                <p>
                  Overs({props.payload.teamB_over}.{props.payload.teamB_balls})
                </p>
              </span>
            </div>
          </div>
        </div>
        <div className="footerToss text-center">
          <p className="">
            {props.payload.toss.name} wins the toss and elected to{' '}
            {props.payload.tossDecision} first
          </p>
          <h6 className="text-uppercase text-white p-2 bg-success">
            {' '}
            {props.payload.schedule.MatchCompleted &&
              props.payload.teamB_Score > props.payload.teamA_Score && (
                <>
                  {props.payload.schedule.team_B_name} wins by
                  {props.payload.teamB_Score - props.payload.teamA_Score}
                </>
              )}
            {props.payload.schedule.MatchCompleted &&
              props.payload.teamB_Score < props.payload.teamA_Score && (
                <>
                  {props.payload.schedule.team_A_name} wins by{' '}
                  {props.payload.teamA_Score - props.payload.teamB_Score} Runs
                </>
              )}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default LiveScoreCard;
