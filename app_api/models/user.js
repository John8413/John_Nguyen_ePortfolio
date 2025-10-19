const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        name: { type: String, required: true },
        hash: { type: String, required: true }
    },
    { timestamps: true }
);

userSchema.methods.setPassword = async function (password) {
    this.hash = await bcrypt.hash(password, 10);
};

userSchema.methods.validatePassword = async function (password) {
    return bcrypt.compare(password, this.hash);
};

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
