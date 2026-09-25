const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const users = [];
const menuItems = [
  {
    id: 1,
    name: "Crispy Corn",
    category: "Starters",
    price: 220,
    description: "Crispy sweet corn with special spices",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950"
  },
  {
    id: 2,
    name: "Paneer Tikka",
    category: "Starters",
    price: 280,
    description: "Soft paneer grilled with aromatic spices",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8"
  },
  {
    id: 3,
    name: "Creamy Truffle Pasta",
    category: "Main Course",
    price: 420,
    description: "Creamy pasta infused with rich truffle flavour",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601"
  },
  {
    id: 4,
    name: "Paneer Butter Masala",
    category: "Main Course",
    price: 320,
    description: "Paneer cooked in rich buttery tomato gravy",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7"
  },
  {
    id: 5,
    name: "Royal Biryani",
    category: "Signature",
    price: 450,
    description: "Aromatic basmati rice with traditional spices",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 6,
    name: "Chef's Special Steak",
    category: "Signature",
    price: 680,
    description: "Perfectly grilled steak with chef's special sauce",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d"
  },
  {
    id: 7,
    name: "Chocolate Lava Cake",
    category: "Dessert",
    price: 250,
    description: "Warm chocolate cake with a molten centre",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c"
  },
  {
    id: 8,
    name: "Classic Cheesecake",
    category: "Dessert",
    price: 280,
    description: "Smooth and creamy classic cheesecake",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187"
  },
  {
    id: 9,
    name: "Classic Mojito",
    category: "Drinks",
    price: 180,
    description: "Refreshing mint and lime mojito",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307"
  },
  {
    id: 10,
    name: "Iced Coffee",
    category: "Drinks",
    price: 160,
    description: "Cold creamy coffee served with ice",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c"
  }
];


app.get("/",(req,res)=>{
    res.send("backend is running")
})

app.get("/api/menu",(req,res)=>{
  res.json(menuItems);
});


app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  users.push({
    name,
    email,
    password});
    console.log("New User:",{
        name,
        email,
        password
    });
    res.json({
        message:"Signup successful",


  
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(401).json({
      message: "User not found",
    });
  }

  if (user.password !== password) {
    return res.status(401).json({
      message: "Incorrect password",
    });
  }

  res.json({
    message: "Login successful",
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});