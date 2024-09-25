import mongoose from "mongoose";

const WhatsNewVideoSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    TrailerLink: {
        type: String,
        required: true
    },

    Platform: {
        type: String,
        required: true
    }
},
    { timestamps: true })

const UpdatesSchema = mongoose.Schema({
    Title: {
        type: String,
    },
    Description: {
        type: String,
        required: true
    },
    ImageUrl: {
        type: String
    },
},
    { timestamps: true })
export const Updates = mongoose.model('Updates', UpdatesSchema)
export const WhatsNewVideo = mongoose.model('WhatsNewVideo', WhatsNewVideoSchema)

