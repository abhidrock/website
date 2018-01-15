var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//The allowed SchemaTypes are: String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array
var UserSchema = new Schema(
    {
        first_name: {type: String, required: true, max: 100},
        last_name: {type: String, required: true, max: 100},
        email_id:{type: String, required: true, max: 100},
        password:{type: String, required: true, max: 100},
        date_of_birth: {type: Date},
        is_admin:{type: Boolean, required: true}
    }
);

// Virtual for user's full name
UserSchema
    .virtual('name')
    .get(function () {
        return this.last_name + ', ' + this.first_name;
    });

// Virtual for user's URL
// We've also declared a virtual for the UserSchema named "url" that returns the absolute URL required to get a particular instance of the model
// we'll use the property in our templates whenever we need to get a link to a particular author.
UserSchema
    .virtual('url')
    .get(function () {
        return '/users/user/' + this._id;
    });

//Export model
module.exports = mongoose.model('User', UserSchema);