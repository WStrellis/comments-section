export async function addUser(db, username, password) {
    try {
        const { ok } = await db.addUser(username, password, {
            roles: [{ role: "readWrite", db: db.databaseName }],
        })
        if (ok) {
            console.log("Created user", username)
        } else {
            console.warn("Could not create user", username)
        }
        return ok
    } catch (error) {
        const msg = "Error when creating user: " + error?.message
        throw new Error(msg)
    }
}
