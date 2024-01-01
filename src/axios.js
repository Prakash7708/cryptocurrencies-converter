import axios from "axios";

let instance=axios.create({
    // baseURL:"http://localhost:5001/api",
    
     baseURL:"https://cryptocurrncy-converter-server.onrender.com/api",
    headers: {
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
        'Content-Type': 'application/json', 
      },
})

export default instance;