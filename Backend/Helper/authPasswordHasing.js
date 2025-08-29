import bcrypt from "bcrypt"

// hasing new passsword
export const hasedPassword = async(password)=>{
    try {
        const hasedPassword = await bcrypt.hash(password,10);
        return hasedPassword
    } catch (error) {
        console.log("Error in hasing password ",error)
    }
}


// password decreption and compare hasing password 
export const comparePassword = async(password,hasedPassword)=>{
    try {
        return bcrypt.compare(password,hasedPassword)
    } catch (error) {
        console.log("Error in compare hasing Password")
    }
}