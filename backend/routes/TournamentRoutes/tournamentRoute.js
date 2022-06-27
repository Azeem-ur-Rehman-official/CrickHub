const express = require('express');
const router = express.Router();

const {
  createTournament,
  getSingleTournament,
  getUserTournaments,
  getAllTournaments,
  deleteTournament,
  adminDeleteTournament,
  updateTournament,
} = require('../../controllers/TournamentController/tournamentController');
const {
  subscriptionBuyTournament,
} = require('../../controllers/TournamentController/BuySubscriptionController');
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require('../../middlewares/auth');
router.route('/tournament/create').post(isAuthenticatedUser, createTournament);
router.route('/get/all/tournament').get(getAllTournaments);
router.route('/single/tournament').get(isAuthenticatedUser, getUserTournaments);
router
  .route('/user/subscription/buy')
  .post(isAuthenticatedUser, subscriptionBuyTournament);
router
  .route('/admin/tournament/:id')
  .delete(isAuthenticatedUser, authorizeRoles('admin'), adminDeleteTournament);
router
  .route('/user/tournament/:id')
  .delete(isAuthenticatedUser, deleteTournament)
  .get(isAuthenticatedUser, getSingleTournament)
  .put(isAuthenticatedUser, updateTournament);
module.exports = router;
