const { Category } = require('../models/category');
const {Product}= require('../models/product');

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const multer = require('multer');
const { event } = require('../models/event');
const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

//file upload 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const isValid = FILE_TYPE_MAP[file.mimetype];
      let uploadError = new Error('invalid image type');
      if(isValid) {
        uploadError = null
      }
      
      cb(uploadError, 'public/uploads')
    }
    , filename: function (req, file, cb) {
      
      const filename = file.originalname.toLowerCase().split(' ').join('-'); 
      const extension = FILE_TYPE_MAP[file.mimetype];
      cb(null, `${filename}-${Date.now()}.${extension}`);
    }
  })
  const uploadOptions = multer({storage: storage})







router.get(`/`, async (req, res) => {
    //localhost:3000/api/v1/products?categories=2342342,123354
    //Filtering products by category
    try {
    let filter = {}
    if (req.query.categories){
        filter ={category : req.query.categories.split(',') }
    }
    console.log(filter)
    const  eventList = await event.find(filter).populate('category'); //.select('name image -_id');
    if (!eventList){
        res.status(404).json({"success":false , message :'no event within this category is found '}); 
    }
    res.send(eventList);
  }catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
})
router.get(`/:id`, async (req, res) => {
    const event = await event.findById(req.params.id).populate('category');//.select('name image -_id');
    if (!event){
        res.status(500).json({"success":false});
    }
    res.send(event);
})
router.post(`/`, uploadOptions.single('image'), async (req, res) => {
  // Trying a wrong category id will work only if the id contain 24 characters(as its in the DB)
   const category = await Category.findById(req.body.category);
   if(!category) return res.status(400).send('Invalid category')
   
   //file upload
   const file = req.file;
   if (!file) return res.status(400).send('No image in the request')

  
 const filename = req.file.filename;
 const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`
  

    let evenT = new evenT({
       
       name : req.body.name,
       description : req.body.description,
       image : `${basePath}${filename}`, //"http://localhost:3000/public/uploads/image-232323"
       timing : req.body.timing,
       category : req.body.category,
       isFeatured : req.body.isFeatured
    })
      event = await event.save();
    
    if (!event)
        return res.status(500).send('event cannot be created');
     res.send(event);  
})



router.put('/:id', async (req, res) => {
    
   if (!mongoose.isValidObjectId(req.params.id)){
    return res.status(400).send('Invalid event Id')
   }
    //TODO: SAME OTHER TO DO EROOR
    const category = await Category.findById(req.body.category);
   if(!category) return res.status(400).send('Invalid category')
    const product = await Product.findByIdAndUpdate(
      req.params.id,{
        id : req.body.id,
       name : req.body.name,
       description : req.body.description,
       image : req.body.image,
       timing : req.body.timing,
       category : req.body.category,
       isFeatured : req.body.isFeatured
      
      },
      {new : true}
    )
    if(!event) 
    {res.status(404).send('the event cannot be updated!')
     return; }
    res.send(event);
  })


  router.delete('/:id',  (req , res) => {
    event.findByIdAndDelete(req.params.id).then(event => { if (event){
      return res.status(200).json({success: true ,  messaage : 'event successfully removed'})
  }else {
       return res.status(404).json({success: false , message : 'event not found'})
  }}).catch(err=>{
    
      return res.status(400).json({success: false , error: err})
  })
  
  }
  )

  // DB event Counter
  router.get('/get/count', async (req, res) => {
    try {
        const eventCount = await event.countDocuments();
        if (!eventCount) {
            return res.status(500).json({ success: false });
        }
        res.send({ count: eventCount });
    } catch (error) {
        
        res.status(500).json({ success: false });
    }
});

//Getting only the events that are displayed in the homepage
  router.get(`/get/featured`, async (req, res) => {
    const count = req.params.count ? req.params.count : 0
        const events = await Product.find({isFeatured : true})
        if (!events) {
            return res.status(500).json({ success: false });
        }
        res.send(events );
    }
  );
  //get only number chosen featured event 
  router.get(`/get/featured/:count`, async (req, res) => {
    const count = req.params.count ? req.params.count : 0
        const events = await event.find({isFeatured : true}).limit(+count)
        if (!event) {
            return res.status(500).json({ success: false });
        }
        res.send(events );
    }
  );
  router.put('/gallery-images/:id', uploadOptions.array('images', 10), async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)){
      return res.status(400).send('Invalid events Id')
     }
     const files = req.files;
     let imagespaths = [];
     const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
     if(files){
      files.map(file => {
        imagespaths.push(`${basePath}${file.filename}`);
     })
    }
    
     
     if(!event)
     {res.status(404).send('the event cannot be updated!')
      return; }
      res.send(event);
  })


module.exports = router;