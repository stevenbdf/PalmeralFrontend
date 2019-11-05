import axios from '../controllers/index'

class Auth {

    logout() {
        localStorage.clear()
    }

    isAuthenticated() {
        if (localStorage.getItem('token')) {
            return true
        }
        return false
    }

    async validateToken() {
        const TOKEN = localStorage.getItem('token')
        if (TOKEN) {
            const res = await axios.get('users/validateToken', { headers: { Authorization: `Bearer ${TOKEN}` } })
            if (res.status) {
                return true
            }
            localStorage.clear()
            return false
        }
        return false
    }
}

export default new Auth()