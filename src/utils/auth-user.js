export function isCurrentUser(user) {
    let loginedUser = localStorage.getItem("user")
    return user.id === loginedUser.id && user.user_name === loginedUser.user_name
}

export function isAuthenticated() {
    let loginedUser = localStorage.getItem("user")
    return loginedUser !== null && loginedUser.id !== null && loginedUser.user_name  !== null && loginedUser.token !== null
}