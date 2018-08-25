const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto'),
    passLenMin = 5;

// Schema Definition - USER
let UserSchema = new Schema({
    firstName: {
        required: 'Your First Name is required.',
        type: String
    },
    lastName: {
        required: 'Your Last Name is required.',
        type: String
    },
    email: {
        index: true,
        match: [
            /.+\@.+\..+/,
            'Please fill in a valid email address.'
        ],
        required: 'An Email address is required.',
        type: String,
        unique: true
    },
    username: {
        required: 'A Username is required.',
        trim: true,
        type: String,
        unique: true
    },
    password: {
        required: [
            function(provider) {
                return provider === 'local';
            },
            true,
            false
        ],
        type: String,
        validate: [
            function(password) {
                return password && (password.length >= passLenMin);
            },
            `Password should be at least ${passLenMin} characters long.`
        ]
    },
    salt: {
        type: String
    },
    provider: {
        type: String,
        required: 'A Provider is required.'
    },
    providerId: String,
    providerData: {},
    website: {
        type: String,
        set: function(url) {
            if(!url) {
                return url;
            } else {
                if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
                    url = 'http://' + url;
                }
                return url;
            }
        }
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// Custom Static Method
UserSchema.statics.findOneByUsername = function(username, callback) {
  this.findOne({ username: new RegExp(username, 'i')}, callback);
};

UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
  let _this = this,
      possibleUsername = username + (suffix || '');

  _this.findOne({
      username: possibleUsername
  }, function(err, user) {
      if(!err && !user) {
          callback(possibleUsername);
      } else if (err) {
          return callback(null);
      } else {
          return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
      }
  });
};

// Custom Instance Method
UserSchema.methods.authenticate = function (password) {
    return this.password === this.hashPassword(password);
};

UserSchema.methods.hashPassword = function(password) {
    return crypto.pbkdf2Sync(password, this.salt, 100000, 64, 'sha512').toString('base64');
};

// Virtual Attribute
UserSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
}).set(function(fullName) {
    let splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
});

//Using pre Middleware
UserSchema.pre('save', function(next) {
    if (this.password) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }

    next();
});

// Using post Middleware
UserSchema.post('save', function(next) {
    console.log(this); //this.isNew returned false...
/*    if(this.isNew) {
        console.log('A new user has been created');
    } else {
        console.log('A user has updated their details.');
    }*/
});

UserSchema.set('toJson', {
    getters: true,
    virtuals: true
});
mongoose.model("User", UserSchema);