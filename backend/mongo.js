import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
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
export async function getAllPosts() {
    try {
      // Connect to the MongoDB client
      await client.connect();
  
      // Access the specific database and collection
      const db = client.db('Electron-todo-app');
      const collection = db.collection('todo');
  
      // Fetch all posts from the collection
      const posts = await collection.find({}).toArray();
      //Return the result
      return { success: true, posts: posts };

    } catch (error) {
      console.error('Error fetching posts:', error);
      return { success: false, error };
    } finally {
      await client.close();
    }
}

// Function for inserting a post into the collection
export async function insertPost(post) {
    try{
        // Connect to the MongoDB client
        await client.connect();
        
        // Access the specific database and collection
        const db = client.db('Electron-todo-app');
        const collection = db.collection('todo');
        const result = await collection.insertOne(post);
        console.log(`A post was inserted with the following id: ${result.insertedId}`);
        return { success: true, id: result.insertedId };
    }
    catch(error){
        console.error('Error inserting post:', error);
        return { success: false, error };
    }
    finally{
        await client.close();
    }
}

// Function to update a post in the collection
export async function updatePost(postID, newPost) {
    try {
        // Connect to the MongoDB client
        await client.connect();
        
        // Access the specific database and collection
        const db = client.db('Electron-todo-app');
        const collection = db.collection('todo');
        const objectID = new ObjectId(postID);
        
        const result = await collection.updateOne({ _id: objectID }, { $set: newPost });
        console.log(`Updated ${result.modifiedCount} post(s)`);
        return { modifiedCount: result.modifiedCount };
    } 
    catch (error) {
        console.error('Error updating post:', error);

    }
    finally {
        await client.close();
    }
}

export async function deletePost(postID) {
  try {
      await client.connect();
        
      // Access the specific database and collection
      const db = client.db('Electron-todo-app');
      const collection = db.collection('todo');
      const objectID = new ObjectId(postID);
      
      const result = await collection.deleteOne({_id: objectID});
      console.log(`Deleted ${result.modifiedCount} post(s)`);
      return { modifiedCount: result.modifiedCount };
  } catch (error) {
    console.error('Error deleting post:', error);
    
  }
}
