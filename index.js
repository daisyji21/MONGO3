const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require ("path");
const methodOverride = require('method-override'); 
const Chat = require("./models/chat.js");


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); 
main()
.then (() =>{
    console.log("connecction successful");
})
.catch ((err) => console.log(err));
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");

}
app.get("/chats", async (req, res) => {
    try {
        let chats = await Chat.find();
        console.log(chats);
        res.render("index.ejs", { chats });
    } catch (err) {
        console.log("Error fetching chats:", err);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/chats/new", (req, res) =>{
    res.render("new.ejs");
});
//create route
// app.post("/chats", (req, res) => {
//     let{ from, to, msg}= req.body;
//     let newChat = new Chat({
//         from:from,
//             to:to,
//             msg:msg,
//             created_at: new Date()
        
//     });
//    newChat
//    .save()
//    .then((res) => {
//     console.log("chat is saved");
// })
//     .catch((err) => {
//     console.log(err);
//    });
//     res.redirect("/chats");
    
// });
app.post("/chats", async (req, res) => {
    try {
        const { from, to, msg } = req.body;
        let newChat = new Chat({
            from,
            to,
            msg,
            created_at: new Date(),
        });

        await newChat.save();
        console.log("Chat is saved");
        res.redirect("/chats");
    } catch (err) {
        console.error("Error saving chat:", err);
        res.status(500).send("Internal Server Error");
    }
});

      //edit route
      app.get("/chats/:id/edit" , async (req ,res) =>{
        let { id}= req.params;
        let chat = await Chat.findById(id);

        res.render("edit.ejs" , {chat});
      });
      // delete route
      app.delete("/chats/:id", async (req, res) => {
        try {
            let { id } = req.params;
            let deletedChat = await Chat.findByIdAndDelete(id);
            console.log(deletedChat);
            res.redirect("/chats");
        } catch (err) {
            console.error("Error deleting chat:", err);
            res.status(500).send("Internal Server Error");
        }
    });
       


app.get("/", ( req, res)=> {
    res.send("root is working");
});
app.listen(8080, ()=> {
    console.log("server is listening on port 8080");
});