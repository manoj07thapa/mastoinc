import { useState, useEffect } from 'react';
import { Auth } from "aws-amplify";


type UserProp = {
    username: string,
    attributes: {
        email: string,
        name: string,
        phone_number: string,
        sub: string
    },

}

export function useAuthUser() {
    const [user, setUser] = useState<UserProp | null>(null);
    useEffect(() => {
        async function authListner() {
            const user = await Auth.currentAuthenticatedUser();
            setUser(user);
        }
        authListner();
    }, [setUser, user]);


    return { user, setUser };
}
