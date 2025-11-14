const { Schema, model } = require("mongoose");

const libroSchema = new Schema({
    titulo: {
        type: String,
        required: true,
        unique: true
    },

    autor: {
        type: String,
        required: true
    },

    apublicacion: {
        type: String
    },

    editorial: {
        type: String
    },

    categoria: {
        type: String
    },

    sede: {
        type: String
    }
}, {
    timestamps: true
});

libroSchema.methods.toJSON = function () {
    const { __v, _id, ...object } = this.toObject();
    return object;
};


module.exports = model("Libro", libroSchema);

