const mongoose = require('mongoose');

const allowedResorts = ['Maui', 'Oahu', 'Kauai', 'Hawaii']; // adjust to your data

const tripSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true, trim: true, minlength: 3, maxlength: 16 },
    name: { type: String, required: true, trim: true, minlength: 3, maxlength: 80, index: true },
    length: { type: Number, required: true, min: 1, max: 60 },
    start: {
        type: Date,
        required: true,
        validate: {
            validator: v => v instanceof Date && v.getTime() > Date.now(),
            message: 'Start date must be in the future.'
        },
        index: true
    },
    resort: { type: String, required: true, enum: allowedResorts, index: true },
    perPerson: { type: Number, required: true, min: 0, max: 100000 },
    image: {
        type: String,
        trim: true,
        validate: {
            validator: v => !v || /^https?:\/\/.+/i.test(v),
            message: 'Image must be an absolute URL.'
        }
    },
    description: { type: String, trim: true, maxlength: 2000 }
}, {
    timestamps: true,
    versionKey: false,
    toJSON: {
        virtuals: true,
        transform(_doc, ret) {
            ret.id = ret._id; 
            delete ret._id;
        }
    }
});

//Text index for ranked search (name + description)
tripSchema.index({ name: 'text', description: 'text' }, { name: 'trip_text_idx' });

//Compound index for common queries (resort + start)
tripSchema.index({ resort: 1, start: 1 }, { name: 'trip_resort_start_idx' });

//Ensure unique code with a dedicated index (robust unique)
tripSchema.index({ code: 1 }, { unique: true, name: 'trip_code_unique' });

//Opt in to autoIndex ONLY in dev to avoid unintended prod builds
if (process.env.NODE_ENV === 'development') {
    tripSchema.set('autoIndex', true);
}

module.exports = mongoose.model('Trip', tripSchema);
