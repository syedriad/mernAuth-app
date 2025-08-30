
import {toast} from 'react-toastify'

export const toastHandleSuccess = (MSG) =>{     //MSG would come from signup page, where this func would be called from

    toast.success(MSG, {position: 'top-right' })
}

export const toastHandleError = (MSG) =>{
    toast.error(MSG, {position:'top-right' })
}