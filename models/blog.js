var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// created a reference of other model
// user is a reference to a single User model object, and is required.
var BlogSchema = new Schema({
    title: {type: String, required: true},
    user: {type: Schema.ObjectId, ref: 'User', required: true}, //reference to the associated user
    description: {type: String, required: true},
    summary: {type: String},
    date_of_submission: {type: date, default: Date.now},
    ref_url: {type: String}
});

// Virtual for blog's URL
BlogSchema
    .virtual('url')
    .get(function () {
        return '/user/blog/' + this._id;
    });

//Export model
module.exports = mongoose.model('Blog', BlogSchema);