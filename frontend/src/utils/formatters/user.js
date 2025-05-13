export const formatUserName = user => {
    let name = user.name
    if (user.nickname) {
        name += " '" + user.nickname + "'"
    }
    name += " " + user.surname
    return name;
}