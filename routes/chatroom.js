const router = require('express').Router();
const { catchErrors } = require('../handlers/errorHandlers');
const chatroomController = require('../controllers/chatroomController');

router.post('/create', catchErrors(chatroomController.createRoom));
router.patch('/join', catchErrors(chatroomController.joinRoom));
router.get('/', catchErrors(chatroomController.getRooms));
router.patch('/logout', catchErrors(chatroomController.leftRoom));

module.exports = router;
