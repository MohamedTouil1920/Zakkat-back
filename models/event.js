const mongoose = require('mongoose');




const eventSchema = mongoose.Schema({
    
    name: {type :String,
        required: true},
    description: {type :String,
        required: true},
        image: {type :String,
            required: true},
      
        
        
            category: {
        type :mongoose.Schema.Types.ObjectId, 
        ref: 'category',
        required: true},
        dateCreated: {
            type :Date, 
            default: Date.now()},
})
eventSchema.virtual('id').get(function(){
    return this._id.toHexString();
});
eventSchema.set('toJSON',{
    virtuals : true,
});
        exports.event = mongoose.model('event',productSchema);

