import { SetStateAction, createContext, Dispatch, ReactNode } from "react";

type UserProp = {
    username: string,
    attributes: {
        email: string,
        name: string,
        phone_number: string,
        sub: string
    }

}

type UserContextProps = {
    user: UserProp | null,
    setUser: Dispatch<SetStateAction<UserProp | null>>
}



export const UserContext = createContext({} as UserContextProps);


