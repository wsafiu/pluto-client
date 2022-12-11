import axios from 'axios';
import { useState } from 'react'

const useRequest = ({ url, method }) => {

    const [errors, setErrors] = useState([])

    const doRequest = async (body) => {
        console.log("do Request", body)
        try {
            setErrors(null)
            const resp = await axios[method](url, body)
            // if(onSuccess) onSuccess(resp.data)
            return resp.data
        }catch (err) {
            throw err
        }
    }

    return { errors, doRequest }
}

export default useRequest;
