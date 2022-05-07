// remove all documents from all collections
export async function cleanDB(db){
    const collections = await db.collections()
    console.log(`Found ${collections.length} collections`)
    const cleanResult = await Promise.all(collections.map(c => c.drop())) 
    const allCleaned = cleanResult.every(x => x)
    if(allCleaned){

    console.log("All collections removed")
    } else{

    throw new Error("Not all collections could be removed.")
    }
    return
}