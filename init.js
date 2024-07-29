const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
main()
.then (() =>{
    console.log("connecction successful");
})
.catch ((err) => console.log(err));
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");

}
let allChats  = [
    {
    from: "neha",
    to: "priya",
    msg: "hello simran",
    created_at : new Date(),
},
{
    from: "na",
    to: "a",
    msg: "hean",
    created_at : new Date(),
},
{
    from: "nea",
    to: "iya",
    msg: "simran",
    created_at : new Date(),
},
];
 await Chat.insertMany(allChats);