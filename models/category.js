const mongoose = require('mongoose');





const categorySchema = mongoose.Schema({
   
    name: {type :String,
        required: true},
})
exports.Category = mongoose.model('category',categorySchema);