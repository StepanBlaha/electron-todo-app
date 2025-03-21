const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://stepa15b:VIHctgxlrjBB45io@firstcluster.fbyfb.mongodb.net/?retryWrites=true&w=majority&appName=firstCluster";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("Electron-todo-app").command({ ping: 1 });

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}


// Function to list the databases in the cluster
async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}
//listDatabases(client).catch(console.dir);

// Function for getting all the posts from the collection
async function getAllPosts() {
    try {
      // Connect to the MongoDB client
      await client.connect();
  
      // Access the specific database and collection
      const db = client.db('Electron-todo-app');
      const collection = db.collection('todo');
  
      // Fetch all posts from the collection
      const posts = await collection.find({}).toArray();
  
      // Log the posts
      console.log(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      await client.close();
    }
}
/*
post format:

{
  title: 'My first todo',
  state: 'todo',
  date: new Date()
  }
*/
// Function for inserting a post into the collection
async function insertPost(post) {
    try{
        // Connect to the MongoDB client
        await client.connect();
        
        // Access the specific database and collection
        const db = client.db('Electron-todo-app');
        const collection = db.collection('todo');
        const result = await collection.insertOne(post);
        console.log(`A post was inserted with the following id: ${result.insertedId}`);
    }
    catch(error){
        console.error('Error inserting post:', error);
    }
    finally{
        await client.close();
    }
}
/*
insertPost({
    title: 'My first todo',
    state: 'todo',
    date: new Date()
    });
    */

// Function to update a post in the collection
async function updatePost(postID, newPost) {
    try {
        // Connect to the MongoDB client
        await client.connect();
        
        // Access the specific database and collection
        const db = client.db('Electron-todo-app');
        const collection = db.collection('todo');

        const objectID = new ObjectId(postID);
        
        const result = await collection.updateOne({ _id: objectID }, { $set: newPost });
        console.log(`Updated ${result.modifiedCount} post(s)`);
    } 
    catch (error) {
        console.error('Error updating post:', error);

    }
    finally {
        await client.close();
    }
}
  
getAllPosts();
//hh().catch(console.dir);
//run().catch(console.dir);