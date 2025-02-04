import axios from 'axios'

export const axiosBase = axios.create({
	baseURL: 'https://maxinumconsultingltd-test-default-rtdb.firebaseio.com/',
})

export default axiosBase