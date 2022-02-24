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
/*
 const currentUserSubject={_value: {userId : "61e4900866f2270bfc50c4c4"}} */ 




export function useUpdateuser() {
    const { enqueueSnackbar } = useSnackbar();
    const handleResponse = useHandleResponse();
    let history = useHistory();
    const currentUseract= localStorage.getItem('currentUser')
    let userIdd = JSON.parse(currentUseract);
    console.log(userIdd.userId)
    const updateUser = (name, pic, age, gender, bio, location, hobbies ) => {
        const requestOptions = {
            method: 'PUT',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, pic, age, gender, bio, location, hobbies  }),
        };

        return fetch(
            `${process.env.REACT_APP_API_URL}/api/users/profile/${userIdd.userId}`,
            requestOptions
        )
            .then(handleResponse)
            .then(data =>{alert(data.msg) ; history.push("/chat")})
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
                    enqueueSnackbar('Failed to update', {
                        variant: 'error',
                    });
                }
            });
    };

    return updateUser;
}


