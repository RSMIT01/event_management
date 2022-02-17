const router =require("express").Router();
const Event=require("../models/Event");

//create event
router.post("/create",async (req,res)=>{
    try {
        const newevent=new Event(req.body)
         const ev=await newevent.save();
         res.status(200).json(ev);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
   
})

//update event
router.put("/:id",async(req,res)=>{
    try {
        const ev= await Event.findById(req.params.id);
        await ev.updateOne({$set:req.body})
        res.status(200).json("Event has been updated");
    } catch (error) {
        res.status(500).json(err)
    }
})


//get particular event by id
router.get("/:id", async(req,res)=>{
    try{
        const ev= await Event.findById(req.params.id);
        res.status(200).json(ev)
    }catch(err){
        res.status(500).json(err)
    }
})

//delete event 
router.delete("/:id",async(req,res)=>{
    try{
        const ev=await Event.findById(req.params.id);
          await ev.deleteOne();
          res.status(200).json("event has been deleted")

    }catch(err){
        res.status(500).json(err)
    }
})


//get all events
router.post("/allevent", async(req,res)=>{
    try{
        const ev= await Event.find();
        res.status(200).json(ev)
    }catch(err){
        res.status(500).json(err)
    }
})


module.exports=router;