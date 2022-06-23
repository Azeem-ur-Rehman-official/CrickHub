const express = require('express');
const router = express.Router();

const {
  createTeam,
  getSingleTeam,
  getSingleTournamentTeams,
  getAllTeams,
  joinTournamentTeam,
  adminDeleteTeam,
  updateTeam,
  getSingleTeamSquad,
  adminDeleteTeamSquad,
  acceptRequestTeamSquad,
  getLiveMatchTeams,
} = require('../../controllers/TournamentController/TeamsController');

const {
  isAuthenticatedUser,
  authorizeRoles,
} = require('../../middlewares/auth');
router.route('/team/create').post(isAuthenticatedUser, createTeam);
router
  .route('/join/tournament/team')
  .post(isAuthenticatedUser, joinTournamentTeam);
router.route('/get/all/team').get(getAllTeams);
router.route('/get/match/teams').post(getLiveMatchTeams);
router.route('/get/all/team/squad/:id').get(getSingleTeamSquad);
router.route('/single/tournament/teams/:id').get(getSingleTournamentTeams);
router.route('/admin/team/:id').delete(isAuthenticatedUser, adminDeleteTeam);
router
  .route('/user/team/:id')

  .get(isAuthenticatedUser, getSingleTeam)
  .put(isAuthenticatedUser, updateTeam);
router
  .route('/admin/team/squad/:id')
  .delete(isAuthenticatedUser, adminDeleteTeamSquad)
  .put(isAuthenticatedUser, acceptRequestTeamSquad);
module.exports = router;
