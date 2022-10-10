const users = []

const addUser = ({id,name,room}) => {
    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()
    const existingUser = users.find((user) => user.room == room && user.name == name)
    if(existingUser){
        return {error:"User Already Exist"}
    }
    const newUser = {id,name,room}
    users.push(newUser)
    return { newUser }
}
const removeUser = (id)=>{
    const existingUserIndex = users.findIndex((user) => user.id == id)
    if(existingUser == -1){
        return {error:"User Doesn't Exist"}
    }
    return users.splice(existingUserIndex,1)[0]
}
const getUser = (id)=>{
    const existingUser = users.find((user) => user.id == id)
    if(!existingUser){
        return {error:"User Doesn't Exist"}
    }
    return {existingUser}
}
const getUsersInRoom = (room)=>{
    const existingUsers = users.filter((user) => user.room == room)
    return existingUsers
}

module.exports = { addUser, removeUser, getUser, getUsersInRoom }