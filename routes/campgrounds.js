const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campground')
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const multer  = require('multer')
const  {storage} = require('../cloudinary')
const upload = multer({ storage });

//import from models Campground is missing.


router.route('/')
    .get(catchAsync(campgrounds.index)) //all 
    .post(isLoggedIn, upload.array('image'), validateCampground,  catchAsync(campgrounds.createCampground)); // new form post


router.get('/new', isLoggedIn, campgrounds.newForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground)) //details
    .put(isLoggedIn,isAuthor, upload.array('image'), validateCampground, catchAsync( campgrounds.UpdateCampground)) //edit put
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground)) //delete

router.get('/:id/edit',isLoggedIn, isAuthor, catchAsync( campgrounds.renderEditForm)); //edit form


module.exports = router;