const express = require("express");
const {sequelize, Flashcard} = require("./models");
const app = express();
app.use(express.json());
const port = 3002;

app.post('/flashcards',async(req,res)=>{
const {category, front, back}=req.body;
try{
    const flashcard=await Flashcard.create({category, front, back});
    return res.json(flashcard);
}
catch(err){
    console.error(err);
    return res.status(500);
}
});

app.get("/", (req, res) => {
  res.send("Welcome to my API!");
});

app.get("/flashcards", async (req,res)=>{
    try{
        const flashcards=await Flashcard.findAll();
        return res.json(flashcards)
    }catch(err){
        console.error(err);
        return res.status(500);
    }
    
})
app.get("/flashcards/:id", async (req,res)=>{
    const id=req.params.id;
    try{
        const flashcard=await Flashcard.findOne({
            where: {id}
        });
        return res.json(flashcard)
    }catch(err){
        console.error(err);
        return res.status(500);
    }
    
})
app.put("/flashcards/:id", async (req,res)=>{
    const id=req.params.id;
    const {category, front, back}=req.body;
    try{
        const flashcard=await Flashcard.findOne({
            where: {id}
        });

        flashcard.category=category;
        flashcard.front=front;
        flashcard.back=back;
        await flashcard.save();
        return res.json(flashcard)
    }catch(err){
        console.error(err);
        return res.status(500);
    }
    
})
app.delete("/flashcards/:id", async (req,res)=>{
    const id=req.params.id;
    try{
        const flashcard=await Flashcard.findOne({
            where: {id}
        });
        flashcard.destroy();
        return res.json({message:`Flashcard with id ${id} deleted.`})
    }catch(err){
        console.error(err);
        return res.status(500);
    }
    
})
app.listen(port, async () => {
  console.log(`Server runs on http://localhost:${port}`);
  await sequelize.sync();
});
