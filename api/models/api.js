const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

const userSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId,required: true,immutable: true},
    api_name: {type: String,required: true},
    registred_email : {type: String,required: true, match:/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/},
    password : {type: String,required: true},
    req_type: [{type: String}],
    api_url: {type: String,required: true},
    api_key : {type: String},
    key : {type: String},
    created_time: {type: Date,required: true,immutable:true, default:new Date()},
    updated_time: {type: Date,required: true, default: new Date()}

});
userSchema.index({registred_email : 1, api_name :1 },{unique:true,dropDups: true})


userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
     

/**
 * Methods
*/

userSchema.methods = {
    comparePassword: function(candidatePassword, cb) {
        bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
            if (err) return cb(err);
            cb(null, isMatch);
        });
    },
}
module.exports = mongoose.model('API',userSchema);