const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const axios = require("axios");
const path = require("path");
// const uploadImages = require("./uploads/uploadImage");
const User = require("./models/User");
const UserData = require("./models/UserData");
// const Post = require("./models/Posts");

// Middlewares
app.use(cors({ credentials: true, origin: "http://localhost:8080" }));
app.use(express.json());
app.use(cookieParser());

// Configuration from environment variables
const client_id = "Z8HyyhbzGVSIpJ1to9q9RMR2SRPgZve6P90locQD";
const client_secret =
  "9XkaESUebdHoW5RsxRBt54fSKrJXOlT1nXIbLltB480zPJdiSwq5GtygojHzd5Rm4FFecxL3STW4OdD16UJWE4WipuQHc7VRuA7V1aNqkizcAbnWriRX8uMu6PU9wjyz";
const redirect_uri = "http://localhost:3000/oauth/authorise";
const oauth_provider_base_url = "https://channeli.in";
const state = "gjfthd";

let userData;

// Define the /login route to redirect to the OAuth provider
app.get("/login", (req, res) => {
  const authorizationUrl = `${oauth_provider_base_url}/oauth/authorise/?client_id=${client_id}&redirect_uri=${encodeURIComponent(
    redirect_uri
  )}&state=${state}`;
  console.log("Authorization URL:", authorizationUrl);
  res.redirect(authorizationUrl);
});

app.get("/oauth/authorise", async (req, res) => {
  const { code, state } = req.query;

  console.log("Received code:", code);
  console.log("Received state:", state);

  try {
    // Exchange the authorization code for an access token
    const tokenResponse = await axios.post(
      `${oauth_provider_base_url}/open_auth/token/`,
      new URLSearchParams({
        client_id,
        client_secret,
        grant_type: "authorization_code",
        redirect_uri,
        code,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("Token response:", tokenResponse.data);

    const accessToken = tokenResponse.data.access_token;

    // Use the access token to get user data
    const userDataResponse = await axios.get(
      `${oauth_provider_base_url}/open_auth/get_user_data/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("User data response:", userDataResponse.data);

    // Set the user data in the cookie

    userData = JSON.stringify(userDataResponse.data)
    // localStorage.setItem('tokencc',JSON.stringify(userDataResponse.data));
    res.cookie("userData", JSON.stringify(userDataResponse.data), {
      httpOnly: true,
    //   secure: false, // Set to true in production with HTTPS
    //   sameSite: "None", // Allow cross-origin cookies
      maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 1 day
    });

    res.redirect("http://localhost:8080/profilepage"); // Redirect to the profile page

  } 
  catch (error) {
    console.error("Error during token exchange or user data retrieval:", {
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers,
      message: error.message,
    });
    res
      .status(500)
      .send("Authentication failed. Check the console for details.");
  }
});

// MongoDB Connection
mongoose.connect(
  "mongodb+srv://milins2710:milinsocin32@socin.mmlzaer.mongodb.net/caffeinecoderz"
);

// Set up multer for file upload handling
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    });
    res.status(200).json(userDoc);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.findOne({ username });
    if (!userDoc) {
      return res.status(400).json("User not found");
    }

    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      //   jwt.sign(
      //     { username, id: userDoc._id },
      //     "oierluhkt347rhye4jeikrhy8iwerh483ijrehtr84irjoqpz",
      //     {},
      //     (err, tokencc) => {
      //       if (err) {
      //         console.error(err);
      //         return res.status(500).json("Failed to generate tokencc");
      //       }
      
      res
        .cookie("tokencc", tokencc, {
          // httpOnly: true,
          // secure: true, // used in production ready projects as they have https but localhost runs on http
          // sameSite: "None", // Allow cross-origin cookies
        })
        .json({
          id: userDoc._id,
          username,
        });
      //     }
      //   );
    } else {
      res.status(400).json("Wrong credentials");
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("tokencc", "").json("Logged out");
});

app.get("/profile", (req, res) => {
    
  const { tokencc } = req.cookies;
  if (!tokencc) {
    return res.status(401);
  }

  jwt.verify(
    tokencc,
    "oierluhkt347rhye4jeikrhy8iwerh483ijrehtr84irjoqpz",
    (err, info) => {
      if (err) {
        console.error("tokencc verification error:", err);
        return res.status(401).json("Invalid tokencc");
      }
      res.json(info);
    }
  );
});

app.get("/profilepage", async (req, res) => {
//   const { userData } = localStorage.getItem('userData');

//   console.log(userData);
  if (!userData) {
    return res.status(401).json("No tokencc provided");
  }

  const info =  JSON.parse(userData);

  const username = info.username;

  try {
    const usero = await UserData.create(userData);
    // const userDoc = await UserData.findOne({ username });
    // if (!userDoc) {
    //   console.error("User not found for username:", username);
    //   return res.status(400).json("Complete the registration first");
    // } else {
    //   res.json(userDoc); // Send the user data as JSON
    // }
  } catch (e) {
    res.status(500).json("Registration error");
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
// server.js
