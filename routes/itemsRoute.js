const Item = require('../models/itemModel');

module.exports = (app) => {
   app.get('/', async (req, res) => {
      try {
         // send collection in response
         const collection = await Item.find({});
         res.send(collection)
      } catch(error) {
         console.log(error)
      }
   })

   app.post('/new', async (req, res) => {
      // create a new item with name provided from request body
      const newItem = new Item({
         name: req.body.name
      })
      await newItem.save((error, item) => {
         if(error) { return console.log(error) };
         console.log(`${item.name} has been saved to the database`);
      }); 
      res.send(newItem)
   });

   app.post('/remove', async (req,res) => {
      console.log(req.body)
      try {
         await Item.findOneAndRemove({
            _id: req.body.id
         });
         const collection = await Item.find({});
         res.send(collection);
      } catch(error) {
         console.log(error);
      }
   });

   app.post('/update', async (req, res) => {
      try {
         await Item.findOneAndUpdate(
            {
               name: req.body.originalName
            },
            {
               name: req.body.name
            }, 
            {
               new: true, // return updated doc
               runValidators: true
            }
         );
         console.log(`Item named ${req.body.originalName} has been updated to ${req.body.name}`)
         const collection = await Item.find({});
         res.send(collection);
      } catch(error) {
         console.log(error)
      }
   })
}