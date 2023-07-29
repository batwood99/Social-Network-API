const router = require('express').Router();

// Bringing all methods over
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    removeThought,
    removeReaction,
    addReaction
} = require('../../controllers/thoughtController');

// Routes for getting all thoughts and getting a thought by ID
router
    .route('/')
    .get(getAllThoughts);

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought);

// Route for adding a thought
router
    .route('/:userId')
    .post(addThought);

// Routes for deleting and updating
router
    .route('/:userId/:thoughtId')
    .put(updateThought)
    .delete(removeThought);

// Reaction routes
router
    .route('/:userId/:thoughtId/:reactionId')
    .delete(removeReaction)
    .post(addReaction);

module.exports = router;
