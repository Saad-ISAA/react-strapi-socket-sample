import { getCurrentUserData } from "actions/user";
// import io from "socket.io-client"
import * as io from "socket.io-client";

export class SocketClient {

    static socket;
    static initializeSocket() {
        const currentUser = getCurrentUserData()

        if (currentUser) {

            const io = require("socket.io-client");
            const API_URL = "http://localhost:1337/";
            const token = currentUser.token.replace("Bearer ", "");
            console.log(token)

            var socket = io.connect(API_URL);
            socket.on("hello", (payload) => {
                console.log(payload);
            });
        }

    }
}