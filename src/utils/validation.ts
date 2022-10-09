
interface IValidation {
    username: string;
    password: string;
}

const Validate = ({username, password}:IValidation, setCaption:Function):boolean => {

    if (username.length < 3) {
        setCaption({
            text: 'Username must be at least 3 characters',
            visibility: true,
        })
        return false;
    }
    else if (password.length < 8) {
        setCaption({
            text: 'Password must be at least 8 characters',
            visibility: true,
        })
        return false;
    }
    else if (!/^[a-zA-Z0-9\_\.]+$/.test(username)) {
        setCaption({
            text: 'Username must be alphanumeric and can contain _ and .',
            visibility: true,
        })
        return false;
    }
    else if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password)) {
        setCaption({
            text: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
            visibility: true,
        })
        return false;
    }


    return true;
}

export default Validate