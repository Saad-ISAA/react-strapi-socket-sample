import axios from "axios"


export const getCurrentUserData = () => {
    let user = localStorage.getItem('user')
    const token = localStorage.getItem('token')

    if (user) {
        const parsedUser = JSON.parse(user)
        return { user: parsedUser, token }
    } else
        return null

}
export const fetchUsers = () => {

    const currentUser = getCurrentUserData()

    return fetch(`http://localhost:1337/users?id_ne=${currentUser.user.id}`, { method: "get", headers: { "Authorization": currentUser.token } })
        .then(async response => {
            if (response.status === 200) {

                const res = await response.json()
                return res

            }
            else {
                const err = response.json()
                throw new Error(err)
            }
        })
}

export const likeUserProfile = (id) => {
    const token = localStorage.getItem('token')
    return fetch(`http://localhost:1337/user/like/${id}`, {
        method: "PUT", headers: {
            "Authorization": token, 'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            return response.data
        })
        .catch(err => {
            throw err
        })
}

export const updateUserProfile = (id, updatedUser) => {
    const currentUser = getCurrentUserData()
    return fetch(`http://localhost:1337/users/${id}`, {
        method: "PUT", body: JSON.stringify(updatedUser), headers: {
            "Authorization": currentUser.token, 'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(async response => {

        if (response.status === 200) {
            const res = await response.json()
            return res

        } else {
            const err = await response.json()
            return err
        }
    })

}