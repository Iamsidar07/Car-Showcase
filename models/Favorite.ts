import { model, Schema, models } from 'mongoose';

const FavoriteSchema = new Schema({
    city_mpg: {
        type: Number,
        required: [true, 'city_mpg is required']
    },
    typeOfClass: {
        type: String,
        required: [true, 'typeofclass is required']
    },
    combination_mpg: {
        type: Number,
        required: [true, 'combination_mpg is required']
    },
    cylinders: {
        type: Number,
        required: [true, 'cylinders is required']
    },
    displacement: {
        type: Number,
        required: [true, 'displacement is required']
    },
    drive: {
        type: String,
        required: [true, 'drive is required']
    },
    fuel_type: {
        type: String,
        required: [true, 'fuel_type is required']
    },
    highway_mpg: {
        type: Number,
        required: [true, 'highway_mpg is required']
    },
    make: {
        type: String,
        required: [true, 'make is required']
    },
    model: {
        type: String,
        required: [true, 'model is required']
    },
    transmission: {
        type: String,
        required: [true, 'transmission is required']
    },
    year: {
        type: Number,
        required: [true, 'year is required']
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Favorite = models.Favorite || model('Favorite', FavoriteSchema);
export default Favorite;
