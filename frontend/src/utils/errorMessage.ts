import ErrorMessage from '../viewModels/error';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function handleLoginResult(result:ErrorMessage) {
        toast.error(result.error, {
            autoClose: 5000  
});
}

