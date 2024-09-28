import ErrorMessage from '../viewModels/error';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function handleErrorResult(result:ErrorMessage) {
        toast.dismiss()
        toast.error(result.error, {
            autoClose: 5000  
});}

export function handleSuccessResult(message:string) {
    toast.dismiss()
    toast.success(message, {
        autoClose: 5000  
});}


