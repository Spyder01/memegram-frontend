import { atom } from "recoil";


const Store = {
    username: atom({
        key: "username",
        default: "",
    }),
    token: atom({
        key: "token",
        default: "",
    }),
    isLoggedIn: atom({
        key: "isLoggedIn",
        default: false
    })
}

export default Store;