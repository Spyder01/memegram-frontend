import type { FC } from "react";
import './styles/Button.scss';

interface ButtonProps {
    type?: "button" | "submit" | "reset"| undefined;
    className?: string;
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onKeyPress?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
    children?: React.ReactNode;
    style?: React.CSSProperties;
}


const Button: FC<ButtonProps> = (
    {
        type = 'button',
        className = '',
        disabled = false,
        onClick = () => {},
        onKeyPress = () => {},
        onBlur = () => {},
        style = undefined,
        onFocus = () => {},
        children = null
    }
) => {
    return (
        <button type={type} style={style} disabled={disabled} className={className} onClick={onClick} onKeyPress={onKeyPress} onBlur={onBlur} onFocus={onFocus}>
            {children}
        </button>
    )
}

export default Button;