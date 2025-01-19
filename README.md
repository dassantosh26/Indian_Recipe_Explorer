# **Indian Recipe Explorer**

## **Project Overview**
This project is a **MERN stack** web application designed to help users explore Indian cuisine. It provides features to search, filter, and suggest dishes based on available ingredients. The application includes **user authentication** (login, registration, and logout) using **JWT** and **bcrypt** for secure password hashing. Additionally, it implements **protected routes** to ensure only authenticated users can access certain features like the **Dish Suggester** and **Dish Table**.

---

## **Demo**

You can explore the live application using the following credentials:

- **Hosted URL**: [https://indian-cuisine-explorer.vercel.app](https://indian-recipe-explorer-rsmh.vercel.app/))
- **Demo User Credentials**:
  - **Email**: `user1@test.com`
  - **Password**: `123456`

> **Note**: This is a demo account .Please do not use this account for sensitive operations.

---


## **Features**

### **Frontend Features**
1. **User Authentication**:
   - **Login**: Users can log in using their credentials.
   - **Registration**: New users can create an account.
   - **Logout**: Users can log out of their account.

2. **Dish Details**:
   - Displays detailed information about a specific dish, including:
     - Name
     - Ingredients
     - Diet type (veg/non-veg)
     - Preparation time
     - Cooking time
     - Flavor profile
     - Course
     - State
     - Region

3. **Dishes List**:
   - Lists all dishes in a tabular format with pagination.
   - Supports sorting by dish name, preparation time, and cooking time.
   - Enables filtering by diet, flavor, state, and region.
   - Clicking on a dish name navigates to the **Dish Details** page.

4. **Dish Suggester**:
   - Allows users to select available ingredients.
   - Suggests dishes that can be prepared using the selected ingredients.
   - Example: Selecting "Rice flour," "coconut," and "jaggery" suggests "Modak" and "Kajjikaya."

5. **Header with Search Box**:
   - Provides a search box with auto-suggest functionality.
   - Users can search for dishes by name, ingredients, or origin.
   - Example: Typing "dosa" suggests "Dosa" and "Masala Dosa."

6. **Protected Routes**:
   - Only authenticated users can access the **Dish Suggester** and **Dish Table** features.

7. **Responsive Design**:
   - The application is fully responsive and works seamlessly on desktop, tablet, and mobile devices.
8.  **Lazy Loading**:
   - Implemented lazy loading for components and images to improve performance.
   - Components and images are loaded only when they are needed, reducing the initial load time of the application.

---

### **Backend Features**
1. **User Authentication**:
   - **POST /login**: Authenticates a user and returns a JWT token.
   - **POST /register**: Registers a new user.
   - **POST /logout**: Logs out the user (invalidates the token).

2. **Recipe CRUD Operations**:
   - **GET /recipes**: Fetches all recipes with optional filtering, sorting, and pagination.
   - **POST /recipes**: Adds a new recipe.
   - **GET /recipes/:id**: Fetches details of a specific recipe by ID.
   - **PUT /recipes/:id**: Updates a recipe by ID.
   - **DELETE /recipes/:id**: Deletes a recipe by ID.

3. **Protected Routes**:
   - Certain routes (e.g., `/dishList`, `/suggester`) are protected and require a valid JWT token for access.

4. **Error Handling**:
   - Proper error handling for invalid requests, missing data, and server errors.

---

## **Technical Stack**

### **Frontend**
- **React**: Functional components with hooks.
- **React Router**: For navigation between pages.
- **Material-UI**: For UI components and styling.
- **Axios**: For API calls to the backend.
- **JWT**: For user authentication and protected routes.

### **Backend**
- **Node.js**: JavaScript runtime for the backend.
- **Express.js**: Framework for building RESTful APIs.
- **MongoDB**: Database for storing recipes and user data.
- **Mongoose**: ODM (Object Data Modeling) for MongoDB.
- **JWT**: For user authentication.
- **bcrypt**: For secure password hashing.

---

## **Installation and Setup**

### **Prerequisites**
- Node.js (v16 or higher)
- npm (v8 or higher)
- MongoDB (local or cloud instance)

### **Steps to Run the Project**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/dassantosh26/Indian_Recipe_Explorer.git
   cd Indian_Recipe_Explorer
   ```

2. **Backend Setup**:
   - Navigate to the backend directory:
     ```bash
     cd server
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `backend` directory and add the following environment variables:
     ```plaintext
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/indian-cuisine
     JWT_SECRET=your_jwt_secret_key
     ```
   - Start the backend server:
     ```bash
     npm run dev
     ```
   - The backend will run on `http://localhost:5000`.

3. **Frontend Setup**:
   - Navigate to the frontend directory:
     ```bash
     cd ../client
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the frontend development server:
     ```bash
     npm start
     ```
   - The frontend will run on `http://localhost:5173`.

---

## **API Documentation**

### **User Endpoints**
1. **POST /login**:
   - Authenticates a user and returns a JWT token.
   - **Request Body**:
     ```json
     {
       "email": "user@example.com",
       "password": "password123"
     }
     ```
   - **Response**:
     ```json
     {
       "token": "your_jwt_token",
       "user": {
         "email": "user@example.com",
         "username": "user123"
       }
     }
     ```

2. **POST /register**:
   - Registers a new user.
   - **Request Body**:
     ```json
     {
       "username": "user123",
       "email": "user@example.com",
       "password": "password123"
     }
     ```
   - **Response**:
     ```json
     {
       "message": "User registered successfully"
     }
     ```

3. **POST /logout**:
   - Logs out the user (invalidates the token).
   - **Response**:
     ```json
     {
       "message": "Logged out successfully"
     }
     ```

### **Recipe Endpoints**
1. **GET /recipes**:
   - Fetches all recipes with optional filtering, sorting, and pagination.
   - **Query Parameters**:
     - `diet`: Filter by diet type (veg/non-veg).
     - `flavor`: Filter by flavor profile (sweet, spicy, etc.).
     - `state`: Filter by state.
     - `region`: Filter by region.
     - `sort`: Sort by dish name, prep time, or cook time.
     - `page`: Pagination page number.
     - `limit`: Number of items per page.
   - **Response**:
     ```json
     [
       {
         "_id": "1",
         "name": "Biryani",
         "ingredients": "Rice, Chicken, Spices",
         "diet": "non-vegetarian",
         "prep_time": "30",
         "cook_time": "60",
         "flavor_profile": "spicy",
         "course": "main course",
         "state": "Telangana",
         "region": "South India"
       }
     ]
     ```

2. **POST /recipes**:
   - Adds a new recipe.
   - **Request Body**:
     ```json
     {
       "name": "Butter Chicken",
       "ingredients": "Chicken, Butter, Cream, Spices",
       "diet": "non-vegetarian",
       "prep_time": "20",
       "cook_time": "40",
       "flavor_profile": "spicy",
       "course": "main course",
       "state": "Punjab",
       "region": "North India"
     }
     ```
   - **Response**:
     ```json
     {
       "_id": "3",
       "name": "Butter Chicken",
       "ingredients": "Chicken, Butter, Cream, Spices",
       "diet": "non-vegetarian",
       "prep_time": "20",
       "cook_time": "40",
       "flavor_profile": "spicy",
       "course": "main course",
       "state": "Punjab",
       "region": "North India"
     }
     ```

3. **GET /recipes/:id**:
   - Fetches details of a specific recipe by ID.
   - **Response**:
     ```json
     {
       "_id": "1",
       "name": "Biryani",
       "ingredients": "Rice, Chicken, Spices",
       "diet": "non-vegetarian",
       "prep_time": "30",
       "cook_time": "60",
       "flavor_profile": "spicy",
       "course": "main course",
       "state": "Telangana",
       "region": "South India"
     }
     ```

4. **PUT /recipes/:id**:
   - Updates a recipe by ID.
   - **Request Body**:
     ```json
     {
       "name": "Hyderabadi Biryani",
       "cook_time": "70"
     }
     ```
   - **Response**:
     ```json
     {
       "_id": "1",
       "name": "Hyderabadi Biryani",
       "ingredients": "Rice, Chicken, Spices",
       "diet": "non-vegetarian",
       "prep_time": "30",
       "cook_time": "70",
       "flavor_profile": "spicy",
       "course": "main course",
       "state": "Telangana",
       "region": "South India"
     }
     ```

5. **DELETE /recipes/:id**:
   - Deletes a recipe by ID.
   - **Response**:
     ```json
     {
       "message": "Recipe deleted successfully"
     }
     ```

---

## **Future Enhancements**
1. **Advanced Search**:
   - Implement fuzzy search for dish names and ingredients.
2. **Recipe Recommendations**:
   - Use machine learning to recommend dishes based on user preferences.
3. **User Profiles**:
   - Allow users to save their favorite dishes and preferences.
4. **Internationalization (i18n)**:
   - Add support for multiple languages.

---

## **Contributing**
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature/bugfix.
3. Submit a pull request with a detailed description of your changes.

---

## **License**
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## **Contact**
For any questions or feedback, please reach out to:
- **Name**: Santosh
- **Email**: santoshdas.mits@gmail.com
- **GitHub**: [[Your GitHub Profile]](https://github.com/dassantosh26)

---

Thank you for exploring the **Indian Cuisine Explorer**! 🍛
