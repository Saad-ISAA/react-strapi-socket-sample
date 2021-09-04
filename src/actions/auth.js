import axios from "axios"

export const registerUser = (user) => {
    return fetch("http://localhost:1337/auth/local/register", {
        method: "POST", headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, body: JSON.stringify(user)
    })
        .then(async response => {

            if (response.status === 200) {
                const res = await response.json()
                localStorage.setItem('user', JSON.stringify(res.user))
                localStorage.setItem('token', "Bearer " + res.jwt)
                return res

            } else {
                const err = await response.json()
                console.log(err)
                throw new Error(err)
            }
        })
}

export const getFakeData = async () => {
    return fetch("https://jsonplaceholder.typicode.com/todos/1")
        .then(async response => {
            const res = await response.json()
            return res
        })
        .catch(err => {
            throw err
        })
}

export const loginUser = (identifier, password) => {
    return fetch('http://localhost:1337/auth/local', {
        method: "POST", headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, body: JSON.stringify({ identifier, password })
    })
        .then(async response => {

            if (response.status === 200) {
                const res = await response.json()
                localStorage.setItem('user', JSON.stringify(res.user))
                localStorage.setItem('token', "Bearer " + res.jwt)
                return res
            } else {
                const err = await response.json()
                console.log(err)
                throw new Error(err)
            }
        })
}

export const logoutUser = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
}