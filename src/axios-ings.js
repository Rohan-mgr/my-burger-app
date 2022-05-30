import Axios from "axios";

const instance = Axios.create({
    baseURL: "https://my-burger-app-78e53-default-rtdb.firebaseio.com/"
});
export default instance;