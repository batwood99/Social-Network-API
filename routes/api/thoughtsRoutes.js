const router = require('express').Router();

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
    .route('/:userId/add')
    .post(addThought);

// Routes for updating and deleting a thought
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
