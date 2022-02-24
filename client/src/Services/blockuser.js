import { BehaviorSubject } from 'rxjs';
import { useSnackbar } from 'notistack';
import useHandleResponse from '../Utilities/handle-response';


const currentUserSubject = new BehaviorSubject(
    JSON.parse(localStorage.getItem('currentUser'))
); 
export const authenticationService = {
    
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() {
        return currentUserSubject.value;
    },
};




export function useBlockuser() {
    const { enqueueSnackbar } = useSnackbar();
    const handleResponse = useHandleResponse();
    const blockuser = (userId ) => {
        const requestOptions = {
            method: 'PUT',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
        };

        return fetch(
            `${process.env.REACT_APP_API_URL}/api/users/admin/${userId}`,
            requestOptions
        )
            .then(handleResponse)
            .then(data => alert(data.msg))
            .then(user => {
                currentUserSubject.next(user);
                return user;
            })
            .catch(function(response) {
                if (response) {
                    enqueueSnackbar(response, {
                        variant: 'error',
                    });
                } else {
                    enqueueSnackbar('Failed to update', {
                        variant: 'error',
                    });
                }
            });
    };

    return blockuser;
}