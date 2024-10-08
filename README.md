# **Attendance Management System**

## **Introduction**

The **Attendance Management System** is a comprehensive solution designed to streamline attendance tracking with a web interface, enhanced by advanced face recognition capabilities. This system integrates a modern frontend developed with React.js, a robust backend using Node.js and MongoDB, and a sophisticated machine learning (ML) component for facial recognition using PyTorch.

## **Project Structure**

- **Frontend**: Developed with React.js and styled with Bootstrap.
- **Backend**: Utilizes Node.js and Express.js, with MongoDB as the database.
- **Machine Learning (ML)**: Employs PyTorch for face recognition, integrating model training and inference into the system.

## **Prerequisites**

Before you start, ensure you have the following installed:

- **Node.js** (v14.x or higher) and **npm** (v6.x or higher)
- **Python** (v3.8 or higher) with **pip**
- **MongoDB** (v4.x or higher)
- **Git** (latest version)
- **Virtual Environment** (recommended for managing Python dependencies)

## **Cloning the Repository**

Clone the project repository to your local machine:

```bash
git clone https://github.com/yourusername/project-name.git
cd project-name
```

## **Frontend Setup**

The frontend is developed using **React.js** and **Bootstrap**:

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm start
   ```

   The frontend will be accessible at [http://localhost:8080](http://localhost:8080).

## **Backend Setup**

The backend is powered by **Node.js** and **Express.js**, and uses **MongoDB** for data management:

1. **Navigate to the backend directory:**

   ```bash
   cd ../backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the backend server:**

   ```bash
   npm start
   ```

   The backend server will be running on [http://localhost:3000](http://localhost:3000).

### **Backend Details**

- **Database**: MongoDB is used for storing user and attendance data.
- **APIs**: RESTful APIs are exposed for CRUD operations related to attendance and user management.
- **Authentication**: OAuth via Channeli is used for secure user authentication.
- **Integration**: The backend communicates with the ML component for face recognition and manages data flow between the frontend and the database.

## **Machine Learning (ML) Component Setup**

The ML component uses **PyTorch** for facial recognition. Follow these steps:

1. **Navigate to the ML directory:**

   ```bash
   cd ../ml
   ```

2. **Set up a Python virtual environment (optional but recommended):**

   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows, use venv\Scripts\activate
   ```

3. **Install required Python libraries:**

   If a `requirements.txt` file is provided:

   ```bash
   pip install -r requirements.txt
   ```

   If `requirements.txt` is not available, manually install the necessary libraries:

   ```bash
   pip install torch torchvision opencv-python pandas pillow matplotlib
   ```

4. **Run the face recognition model:**

   Ensure your training data is in the correct format and location. Execute the following command to train and save the face recognition model:

   ```bash
   python face_recognition_model.py
   ```

### **ML Details**

- **model**: vector embeddings are taken from the source database. then for checking we use yolov5 to detect faces and the used dlib for alignment and to get the embeddings out of the test img we used facenet and then implied eucledian distance to find the best match. but as we tried including threshold into the algo we ran into pretained errors.
- **Model Training**: so we train a new VGG19 model based  convolutional neural network (CNN) architecture at last. The "19" in VGG19 refers to the total number of layers in the network, which includes 16 convolutional layers and 3 fully connected layers.The original VGG19 model was trained on ImageNet, so it outputs probabilities across 1,000 different classes.The model typically takes an input image of size 224x224 with three color channels (RGB).

- **Face Recognition Model**: [Model Link](https://colab.research.google.com/drive/1NWVkfVhQEDpcPFvKWXasPfq-alJkvEYQ?usp=sharing)
- **Files for Dataset Creation**: [Dataset Files Link](https://colab.research.google.com/drive/1NWVkfVhQEDpcPFvKWXasPfq-alJkvEYQ?usp=sharing)

## **Integrating and Running the Full Application**

1. **Ensure MongoDB, the backend server, and the frontend server are running.**
2. **Execute the face recognition model** if it has not been trained and saved already.

Access the application via the frontend at [http://localhost:8080](http://localhost:8080). The frontend interacts with the backend to manage attendance, while the backend integrates with the face recognition model for authentication and attendance verification.

## **Additional Information**

- **APIs**: The backend exposes RESTful APIs for interactions related to attendance and user management.
- **Environment Variables**: Configure all `.env` files with the appropriate environment variables for MongoDB, OAuth, and other configurations.
- **Development Tools**: Use tools like **Postman** for testing API endpoints and **PyCharm** or **VSCode** for developing and running Python scripts.

By following these detailed instructions, you will be able to set up and run the full Attendance Management System, encompassing all components of the project.

--- 
