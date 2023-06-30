import { model, Schema, models } from 'mongoose';

const FavoriteSchema = new Schema({
    carTitle: {
        type: String,
        required: [true, 'Car title is required']
    },
    location: {
        type: String,
        required: [true, 'Location is required']
    },
    rentPrice: {
        type: Number,
        required: [true, 'cylinders is required']
    },
    capacity: {
        type: Number,
        required: [true, 'Capacity is required']
    },
    fuelCapacity: {
        type: Number,
        required: [true, 'FuelCapacity is required']
    },
    shortDescription: {
        type: String,
        required: [true, 'Description is required']
    },
    typeOfclass: {
        type: String,
        required: [true, 'Typeofclass is required']
    },
    model: {
        type: String,
        required: [true, 'Model is required']
    },
    manufacturer: {
        type: String,
        required: [true, 'Manufacturer is required']
    },
    cylinders: {
        type: Number,
        required: [true, 'Cylinders is required']
    },
    cityMPG: {
        type: Number,
        required: [true, 'CityMPG is required']
    },
    combinationMPG: {
        type: Number,
        required: [true, 'CombinationMPG is required']
    },
    highwayMPG: {
        type: Number,
        required: [true, 'HighwayMPG is required']
    },
    year: {
        type: String,
        required: [true, 'year is required']
    },
    transmission: {
        type: String,
        required: [true, 'Transmission is required']
    },
    fuelType: {
        type: String,
        required: [true, 'Fuel type is required']
    },
    carType: {
        type: String,
        required: [true, 'Car type is required']
    },
    drive: {
        type: String,
        required: [true, 'Drive is required']
    },
    imageFiles: {
        type: [String],
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    isFavorite:{
        type: Boolean
    }
});

const Favorite = models.Favorite || model('Favorite', FavoriteSchema);
export default Favorite;
