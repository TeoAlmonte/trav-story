const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Story = mongoose.model('stories');
const User = mongoose.model('users');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

// View all stories
router.get('/', (req, res) => {
  Story.find({status:'public'})
    .populate('user')
    .then(stories => {
      res.render('stories/index', {
        stories: stories
    })
  })
});

// View add stories page
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('stories/add')
});

// Add a story
router.post('/', ensureAuthenticated, (req, res) => {
  let allowComments;

  if(req.body.allowComments) {
    allowComments = true;
  } else {
    allowComments = false;
  }
  const newStory = {
    title: req.body.title,
    body: req.body.bodytext,
    status: req.body.status,
    allowComments: allowComments,
    user: req.user.id
  }
  new Story(newStory)
    .save()
    .then(story => {
      res.redirect(`/stories/show/${story.id}`);
    });
});

router.get('/show/:id', (req, res) => {
  Story.findOne({
    _id: req.params.id
  })
  .populate('user')
  .then(story => {
    res.render('stories/show', {
      story: story
    });
  });
});

router.get('/edit', (req, res) => {
  res.render('stories/edit')
});

router.get('/show', (req, res) => {
  res.render('stories/show')
});

module.exports = router;