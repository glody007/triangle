export default function getMatchedUser(matche, userId) {
    const users = {...matche.users}
    delete users[userId]
    const [matchedUserId, matchedUser] = Object.entries(users).flat()
    return matchedUser
}