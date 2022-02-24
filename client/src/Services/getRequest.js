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

export function useAllRequests() {
    const { enqueueSnackbar } = useSnackbar();
    const handleResponse = useHandleResponse();
    const currentUseract= localStorage.getItem('currentUser')
    let userIdd = JSON.parse(currentUseract);
    console.log(userIdd.userId)
    
    const getAllRequests = () => {
        const requestOptions = {
            method: 'GET',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
        };
        let i =0
        return fetch(
            `${process.env.REACT_APP_API_URL}/api/requests/contact/${userIdd.userId}`,
            requestOptions
        )
        .then(handleResponse)
        .then(data=> data.map(el => {  localStorage.setItem(`request ${i}`, JSON.stringify(el)); i=i+1;localStorage.setItem('issus', i) } ))
        
            .then(user => {
              //  localStorage.setItem('currentUser', JSON.stringify(user));
              currentUserSubject.next(user);
                return user;
            })
            .catch(function(response) {
                if (response) {
                    enqueueSnackbar(response, {
                        variant: 'error',
                    });
                } else {
                    enqueueSnackbar('Failed to get', {
                        variant: 'error',
                    });
                }
            });
    };

    return getAllRequests;
}