import { getCurrentUserData } from "./user"

export const getUserNotifications = () => {

    const currentUser = getCurrentUserData()
    if (currentUser) {
        return fetch(`http://localhost:1337/notifications?receiver.id=${currentUser.user.id}`, {
            headers: {
                "Authorization": currentUser.token
                , 'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(async response => {
                if (response.status === 200) {
                    const res = await response.json()
                    return res
                } else {
                    const err = await response.json()
                    console.log(err)
                    throw new Error(err)
                }
            })
    }
}