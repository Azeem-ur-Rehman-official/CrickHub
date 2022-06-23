const app = require('./app');
const connectDatabase = require('./config/database');
const Team = require('./models/Tournaments/team');
const Schedule = require('./models/Tournaments/schedule');
const http = require('http');
const axios = require('axios');
const server = http.createServer(app);
const dotenv = require('dotenv');
dotenv.config({ path: 'backend/config/config.env' });
const cloudinary = require('cloudinary');
const { Server } = require('socket.io');
const io = new Server(server);
const Comments = require('./models/discusionForm');
const liveScore = require('./models/Tournaments/liveScore');
const Ining = require('./models/Tournaments/Inings');
// Handle Uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log('Shutting down due to uncaught exception');
  process.exit(1);
});

// Setting up config file
if (process.env.NODE_ENV === 'PRODUCTION')
  require('dotenv').config({ path: 'backend/config/config.env' });

// Connecting to database
connectDatabase();
// Sockets.io operations
// Soketio
//chatt
io.on('connection', (socket) => {
  console.log(socket.id + ' connected.');

  socket.on('createComment', async (msg) => {
    const {
      username,
      avatar,
      content,
      replyName,
      replyContent,
      userId,
      createdAt,
      send,
      id,
    } = msg;

    // console.log(newComment);
    if (send === 'replyComment') {
      console.log('replyComment ');

      // const comment = await Comments.findById(id);
      // if (comment) {

      // }
      const replyComment = new Comments({
        username,
        avatar,
        content,
        replyName,
        replyContent,
        userId,
        createdAt,
      });
      await replyComment.save();
      io.emit('sendReplyCommentToClient', replyComment);
    } else {
      console.log('createComment ');
      const newComment = new Comments({
        username,
        avatar,
        content,
        userId,
        createdAt,
      });
      await newComment.save();
      io.emit('sendCommentToClient', newComment);
    }
  });

  socket.on('pushLiveTeamScore', async (msg) => {
    try {
      const live_score = new liveScore(msg);

      let _id = msg.toss;
      const allScore = await Ining.findById(_id);
      const remainingBalls = msg.previousPlayedBalls - msg.playedBalls;
      if (allScore.team_A_id == msg.batingTeamID) {
        allScore.teamA_Score = allScore.teamA_Score + msg.totalScore;
        if (msg.out == true) {
          allScore.teamA_out = allScore.teamA_out + 1;
        }
        if (remainingBalls > 0) {
          allScore.teamA_balls = msg.playedBalls;
        } else {
          allScore.teamA_over = msg.over + 1;
          allScore.teamA_balls = 0;
        }
      } else {
        allScore.teamB_Score = allScore.teamB_Score + msg.totalScore;
        if (msg.out == true) {
          allScore.teamB_out = allScore.teamB_out + 1;
        }
        if (remainingBalls > 0) {
          if (allScore.teamB_balls + msg.playedBalls > 5) {
            allScore.teamB_over = msg.over + 1;
            allScore.teamB_balls = 0;
          } else allScore.teamB_balls = allScore.teamB_balls + msg.playedBalls;
        } else {
          allScore.teamB_over = msg.over + 1;
          allScore.teamB_balls = 0;
        }
      }
      await live_score.save();
      await allScore.save();

      io.emit('sendLiveScore', { success: true });
      // io.emit('getAllLiveScore', { success: true });
    } catch (err) {
      console.log(err);
    }
  });
  socket.on('finishIning', async (msg) => {
    try {
      console.log(msg);
      let _id = msg.toss;

      const allScore = await Ining.findById(_id);
      if (msg.finishIningId == 'teamA') allScore.teamA_Ining_Status = true;
      else allScore.teamB_Ining_Status = true;
      if (
        allScore.teamA_Ining_Status == true &&
        allScore.teamB_Ining_Status == true
      ) {
        const team1 = await Team.findById(msg.winnerTeam);
        const team2 = await Team.findById(msg.loserTeam);
        if (team1) team1.points = team1.points + 1;
        if (team2) team2.points = team2.points - 1;
        await team1.save();
        await team2.save();
        const schedule = await Schedule.findById(msg._id);
        schedule.MatchCompleted = true;
        await schedule.save();
        allScore.liveStatus = false;
      }
      await allScore.save();
      io.emit('finishSuccess', { success: true });
    } catch (err) {
      console.log(error);
    }
  });
  socket.on('disconnect', () => {
    console.log(socket.id + ' disconnected.');
    // users = users.filter((user) => user.userId !== socket.id);
  });
});
//liveScore

// Setting up cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const myserver = server.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

// Handle Unhandled Promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log('Shutting down the server due to Unhandled Promise rejection');
  myserver.close(() => {
    process.exit(1);
  });
});
