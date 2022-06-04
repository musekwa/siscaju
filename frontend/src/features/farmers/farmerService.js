
import axios from "axios";

const API_URL = "http://localhost:8080/farmers";
// const LOGIN_URL = "http://localhost:8080/login";

const user = JSON.parse(localStorage.getItem("user"));

// register user
const farmerRegister = async (farmerData) => {
  // console.log('farmer data: ', farmerData)
    try {
        const response = await axios.post(API_URL, farmerData, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        // console.log('response: ', response)
        return response.data;
    }
    catch(error) {
        throw new Error("O registo de produtor falhou!")
    }
};

// login user
// const updateRegister = async (userData) => {
//   try {
//     const response = await axios.post(LOGIN_URL, userData);
//     if (response.data) {
//       localStorage.setItem("user", JSON.stringify(response.data));
//     }
//     return response.data;
//   } catch (error) {
//     throw new Error("O login falhou!");
//   }
// };

// login user
// const login = async (userData) => {
//   const response = await axios.post(LOGIN_URL, userData);
//   // const response = await axios.get("https://dummyjson.com/users");
//   if (response.data) {
//     localStorage.setItem("user", JSON.stringify(response.data));
//   }

//   return response.data;
// };

// logout user
// const logout = async () => {
//   localStorage.removeItem("user");
// };

const farmerService = {
  farmerRegister,
//   login,
//   logout,
};

export default farmerService;
