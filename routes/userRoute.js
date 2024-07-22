const express=require('express')
const router=express.Router();
const User=require('../models/User');
//get all the users//

router.get('/',async(req,res)=>{
    try{
           const users=await User.find();
           res.json(users)
    }
    catch(error)
    {
          res.status(500).json({message:error.message})
    }
})

router.post('/', async(req,res)=>{
    try{
          const data={
            name:req.body.name,
            email:req.body.email,
            image:req.body.image
          }

          const userRef=await User.findOneAndUpdate(data,data,{
            new:true,
            upsert:true,
            runValidators:true
          });

          const userRes=await userRef.save();
          res.status(201).json(userRes)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})

// Get user by email
router.get('/by-email/:email', async (req, res) => {
  try {
      const user = await User.findOne({ email: req.params.email });
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});



module.exports=router