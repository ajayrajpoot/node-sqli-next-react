// import { useSelector } from 'react-redux'
// import { selectCurrentToken } from "../features/auth/authSlice"
import {jwtDecode} from 'jwt-decode'

const useAuth = () => { 
    const token = localStorage.getItem('token')
    let isManager = false
    let isAdmin = false
    let status = "Employee"
    console.log("token===", token)

    if (token) {
        const decoded = jwtDecode(token)
        console.log("decoded", decoded)
        // const { username, roles } = decoded.UserInfo
        const    roles  = [decoded.UserInfo.role]
        const username  = decoded.UserInfo.username

        isManager = roles.includes('Manager')
        isAdmin = roles.includes('Admin')

        if (isManager) status = "Manager"
        if (isAdmin) status = "Admin"

        return { username, roles, status, isManager, isAdmin }
    }

    return { username: '', roles: ['admin'], isManager, isAdmin, status }
}
export default useAuth