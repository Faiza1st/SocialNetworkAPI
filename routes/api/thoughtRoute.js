const router = require('express').Router();

const {
    getThoughtsAll,
    getoneThought,
    thoughtCreate,
    deleteThought,
    thoughtUpdated,
    reactionCreate,
    reactionDelete,
} = require('../../controllers/thoughtControllers')


router.route('/')
.get(getThoughtsAll)
.post(thoughtCreate);


router.route('/:thoughtId')
.get(getoneThought)
.delete(deleteThought)
.put(thoughtUpdated);


router.route('/:thoughtId/reactions')
.post(reactionCreate);


router.route('/:thoughtId/reactions/:reactionId')
.delete(reactionDelete);

module.exports = router;