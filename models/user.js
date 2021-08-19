const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require('uuid/v1');


const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxength: 32,
        trim: true
    },
    lastname: {
        type: String,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    userinfo: {
        type: String,
        trim: true
    },
    encry_password: {
        type: String,
        required: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0,
    },
    purchases: {
        type: Array,
        default: []
    }
}, { timestamps: true });

UserSchema
    .virtual("password")
    .set(function (password) {
        this._password = password;
        this.salt = uuidv1();
        this.encry_password = this.securePassword(password);
    })
    .get(function () {
        return this._password;
    })


UserSchema.methods = {

    authenticate: function (plainpassowrd) {
        return this.securePassword(plainpassowrd) === this.encry_password
    },

    securePassword: function (passowrd) {
        if (!passowrd) return "";
        try {
            return crypto.createHmac('sha256', this.salt)
                .update(passowrd)
                .digest('hex');
        } catch (err) {
            return "";
        }
    }
}

module.exports = mongoose.model("User", UserSchema);