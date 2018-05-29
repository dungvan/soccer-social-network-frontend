export function isCurrentUser(user) {
    const loginedUser = JSON.parse(localStorage.getItem("user"));
    return user.id === loginedUser.id && user.user_name === loginedUser.user_name
}

export function isAuthenticated() {
    const loginedUser = JSON.parse(localStorage.getItem("user"));
    return loginedUser !== null && loginedUser.id !== null && loginedUser.user_name  !== null && loginedUser.token !== null
}

export function isSuperAdmin() {
    const loginedUser = JSON.parse(localStorage.getItem("user"));
    return loginedUser !== null && loginedUser.role !== null && loginedUser.role === "s_admin"
}

export function getCurrentUsername() {
    const loginedUser = JSON.parse(localStorage.getItem("user"));
    if (!loginedUser)
        return null
    return loginedUser.user_name
}

export function getCurrentUser() {
    const loginedUser = JSON.parse(localStorage.getItem("user"));
    if (!loginedUser)
        return null
    return loginedUser
}

export function clearLoginedUser() {
    localStorage.removeItem("user")
}