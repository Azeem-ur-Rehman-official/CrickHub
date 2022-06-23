const express = require('express');
const router = express.Router();

const {
  createNewPlayerProfile,
  getSinglePlayerProfile,
  getAllPlayerProfiles,
  playerUpdate,
  deletePlayer,
} = require('../../controllers/TournamentController/playerController');

const {
  isAuthenticatedUser,
  authorizeRoles,
} = require('../../middlewares/auth');
router
  .route('/tournament/player/profile')
  .post(isAuthenticatedUser, createNewPlayerProfile);
router.route('/tournament/players/profile').get(getAllPlayerProfiles);
router
  .route('/tournament/single/player/profile')
  .get(isAuthenticatedUser, getSinglePlayerProfile);
router
  .route('/tournament/player/profile/:id')
  .put(isAuthenticatedUser, playerUpdate)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deletePlayer);
module.exports = router;
