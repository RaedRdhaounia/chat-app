import { BehaviorSubject } from 'rxjs';
import { useSnackbar } from 'notistack';
import useHandleResponse from '../Utilities/handle-response';
import { useState } from 'react';

const currentUserSubject = new BehaviorSubject(
    JSON.parse(localStorage.getItem('currentUser'))
); 
export const authenticationService = {
    
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() {
        return currentUserSubject.value;
    },
};

export function useDetUsers(block) {
    const { enqueueSnackbar } = useSnackbar();
    const handleResponse = useHandleResponse();
    const currentUseract= localStorage.getItem('currentUser')
    let userIdd = JSON.parse(currentUseract);
    console.log(userIdd.userId)
    const [blockdet, setBlockdet] = useState(block);
    const getDetUsers = (blockdet) => {
        const requestOptions = {
            method: 'GET',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
        };
        return fetch(
            `${process.env.REACT_APP_API_URL}/api/users/unique/${userIdd.userId}`,
            requestOptions
        ).then(handleResponse)
        .then(user => {
            localStorage.setItem('Usersdet', JSON.stringify(user));
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
            });;
    };

    return getDetUsers;
}