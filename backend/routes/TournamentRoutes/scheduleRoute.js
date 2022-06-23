const express = require('express');
const router = express.Router();

const {
  createSchedule,
  getSingleSchedule,
  getSingleTournamentSchedules,
  getAllSchedules,
  joinTournamentSchedule,
  adminDeleteSchedule,
  updateSchedule,
  AdminUpdateSchedule,
} = require('../../controllers/TournamentController/scheduleController');

const {
  isAuthenticatedUser,
  authorizeRoles,
} = require('../../middlewares/auth');
router
  .route('/tournament/schedule/create')
  .post(isAuthenticatedUser, createSchedule);
// router
//   .route('/join/tournament/schedule')
//   .post(isAuthenticatedUser, joinTournamentSchedule);
// router.route('/get/all/schedule').get(getAllSchedules);

router
  .route('/single/tournament/schedules/:id')
  .get(getSingleTournamentSchedules);
router
  .route('/admin/schedule/:id')
  .delete(isAuthenticatedUser, adminDeleteSchedule);
router
  .route('/tournament/schedule/:id')
  .get(isAuthenticatedUser, getSingleSchedule)
  .put(isAuthenticatedUser, updateSchedule);
  router
  .route('/tournament/schedule/:id')
  .get(isAuthenticatedUser, getSingleSchedule)
  .put(isAuthenticatedUser, updateSchedule);

module.exports = router;
