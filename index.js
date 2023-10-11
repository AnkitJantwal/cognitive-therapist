import mongoose from "mongoose";
import express from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from "body-parser";
import User from "./models/userSchema.js";
import multer from "multer";
const app = express();

// Get the directory name of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));

// Parse form data using body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Files will be uploaded to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Create a Mongoose model for storing file information
const File = mongoose.model('File', {
  name: String,
  data: Buffer,
});


// Handle the file upload POST request
app.post('/upload', upload.single('file'), async (req, res) => {
  if (req.file) {
    try {
      // Read the uploaded file into memory
      const data = fs.readFileSync(req.file.path);
      // Create a new document in MongoDB with file data
      const file = new File({ name: req.file.originalname, data: data });
      await file.save();
      res.send('File uploaded and saved to MongoDB.');
    } catch (err) {
      res.status(500).send('Error uploading and saving the file.');
    }
  } else {
    res.send('File upload failed.');
  }
});

app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/public/views/index.html")
})
// Route to render the login.html file when /login is accessed
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/views/login.html');
});


// route to handle submission of details
app.post('/submit',async(req,res)=>{
    try {
        const { username, password } = req.body;
    
        const newUser = new User({username,password});
        const savedUser=await newUser.save();

        res.redirect('/');
      } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).send('Error registering user');
      }
})
// Serve the HTML form for file upload
app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'upload.html'));
});
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'createanaccounnt.html'));
});



// Set up a static directory to serve uploaded files
app.use('/uploads', express.static('uploads'));
// Connect to MongoDB
mongoose.connect('mongodb+srv://ankit:ankit111@cluster0.ybhmt.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
