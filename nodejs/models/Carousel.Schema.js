import mongoose from "mongoose";

const CarouselSchema = new mongoose.Schema({
    image: {
        required: true,
        type: String
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    badge: {
        type: String,
    },
    ctaText: {
        type: String,
    }
}, { timestamps: true });

export const Carousel = mongoose.model("Carousel", CarouselSchema);
