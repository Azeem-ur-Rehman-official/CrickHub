const express = require('express');
const router = express.Router();

const {
  createIning,
  getAllInings,
  getSingleMatchIning,
  getSingleTournamentSchedules,

  joinTournamentSchedule,
  adminDeleteIning,
  getSingleInings,
} = require('../../controllers/TournamentController/iningController');
const {
  createMatchLiveScore,
  topPlayersList,
} = require('../../controllers/TournamentController/liveScoreController');
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require('../../middlewares/auth');
router
  .route('/tournament/match/ining/create')
  .post(isAuthenticatedUser, createIning);
router
  .route('/tournament/match/live/score/update')
  .post(isAuthenticatedUser, createMatchLiveScore);
router.route('/get/all/tournament/match/inings').get(getAllInings);
router
  .route('/get/all/tournament/match/single/inings/:id')
  .get(getSingleMatchIning);
router
  .route('/get/all/tournament/match/single/inings/:id')
  .get(getSingleMatchIning);
router.route('/get/all/top/players/list').get(topPlayersList);
// router
//   .route('/join/tournament/schedule')
//   .post(isAuthenticatedUser, joinTournamentSchedule);

// router
//   .route('/single/tournament/schedules/:id')
//   .get(getSingleTournamentSchedules);
router
  .route('/admin/tournament/match/ining/:id')
  .delete(isAuthenticatedUser, adminDeleteIning);
// router
//   .route('/user/schedule/:id')

//   .get(isAuthenticatedUser, getSingleMatchIning)
//   .put(isAuthenticatedUser, updateSchedule);

module.exports = router;
