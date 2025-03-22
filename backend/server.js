import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { insertPost, getAllPosts, updatePost} from './mongo.js';

dotenv.config();
//Create express app
const app = express();
const PORT = process.env.PORT || 3000;
//Setup
app.use(cors());
app.use(express.json());


//Routes
app.post('/add-todo', async (req, res) => {
    const response = await insertPost(req.body);
    res.json(response);
});
app.post('/update-todo', async (req, res) => {
    const { postID, newPost } = req.body;
    const response = await updatePost(postID,newPost);
    console.log("todo".response);
    res.json(response);
});

app.get('/get-todos', async (req, res) => {
    try{
        const response = await getAllPosts();
        console.log(response)
        res.json(response);

    }catch(error){
        console.error("Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});