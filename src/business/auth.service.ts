import { compare } from 'bcrypt';
import Auth from '../data/auth';

const authService = {
    getByCredentials(login: string, password: string): Promise<{ id: number;
                                                                 login: string;
                                                                 role: string;
                                                                 firstName: string;
                                                                 lastName: string;
                                                                 middleName: string; } | null> {
        return Auth.getByLogin(login).then(function (auth) {
            if (auth === null) {
                return null;
            }

            return compare(password, auth.password).then(function (isPasswordValid) {
                if (!isPasswordValid) {
                    return null;
                }

                return {
                    id: auth.id,
                    login: auth.login,
                    role: auth.role.name,
                    firstName: auth.user.firstName,
                    lastName: auth.user.lastName,
                    middleName: auth.user.middleName
                };
            });
        });
    }
};

export default authService;
