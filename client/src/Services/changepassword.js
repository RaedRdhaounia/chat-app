import { BehaviorSubject } from 'rxjs';
import { useSnackbar } from 'notistack';
import useHandleResponse from '../Utilities/handle-response';
import { useHistory } from "react-router-dom";

const currentUserSubject = new BehaviorSubject(
    JSON.parse(localStorage.getItem('currentUser'))
); 
export const authenticationService = {
    
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() {
        return currentUserSubject.value;
    },
};
export function useDelate() {
    const { enqueueSnackbar } = useSnackbar();
    const handleResponse = useHandleResponse();
    let history = useHistory();
    const currentUseract= localStorage.getItem('currentUser')
    let userIdd = JSON.parse(currentUseract);
    console.log(userIdd.userId)
    const delate = (oldpassword, password, password2  ) => {
        
        const requestOptions = {
            method: 'PUT',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ oldpassword, password, password2  }),
        };

        return fetch(
            `${process.env.REACT_APP_API_URL}/api/users/setting/${userIdd.userId}`,
            requestOptions
        )
            .then(handleResponse)
            .then(data =>{
            alert(data.msg);  history.push("/chat"); })
            .then(user => {
                currentUserSubject.next(user);
                logout()
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

    return delate;
}
function logout() {
    currentUserSubject.next(null);
}