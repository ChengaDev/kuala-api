const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
            trim: true,
            minlength: 2
        },
        lastname: {
            type: String,
            required: true,
            trim: true,
            minlength: 2
        },
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            minlength: 6
        },
        password: { type: String, trim: true, required: true, minlength: 7 },
        email: {
            unique: true,
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Email is invalid');
                }
            }
        },
        phone: {
            type: String
        },
        address: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

userSchema.virtual('projects', {
    ref: 'Project',
    localField: '_id',
    foreignField: 'owner'
});

userSchema.virtual('experiences', {
    ref: 'Experience',
    localField: '_id',
    foreignField: 'owner'
});

userSchema.virtual('educations', {
    ref: 'Education',
    localField: '_id',
    foreignField: 'owner'
});

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Unable to login');
    }

    return user;
};

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const currentDatePlusOneMonth = new Date(
        new Date().setMonth(new Date().getMonth() + 1)
    );
    const token = jwt.sign(
        { _id: user._id.toString(), expires: currentDatePlusOneMonth },
        process.env.JWT_SECRET,
        { expiresIn: 10800 }
    );

    return token;
};

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;

    return userObject;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
