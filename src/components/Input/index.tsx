import type { FC } from "react";
import './styles/Input.scss';

interface InputProps {
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    className?: string;
    disabled?: boolean;
    required?: boolean;
    autoFocus?: boolean;
    autoComplete?: string;
    name?: string;
    max?: number;
    min?: number;
    id?: string;
    style?: React.CSSProperties;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    spellCheck?: boolean;
    title?: string;
    autoCapitalize?: string;
    autoCorrect?: string;
}

const Input:FC<InputProps> = ({
    type = 'text',
    placeholder = '',
    value = '',
    onChange = () => {},
    onKeyPress = () => {},
    style = undefined,
    onBlur = () => {},
    onFocus = () => {},
    className = '',
    disabled = false,
    required = false,
    autoFocus = false,
    autoComplete = 'off',
    name = '',
    max=undefined,
    min=undefined,
    id = '',
    maxLength = undefined,
    minLength = 0,
    pattern = undefined,
    spellCheck = false,
    title = '',
    autoCapitalize = 'off',
    autoCorrect = 'off'
})=>{
    return (<input type={type} required={required} max={max} min={min} style={style} disabled={disabled} autoFocus={autoFocus}   placeholder={placeholder} value={value} autoComplete={autoComplete} maxLength={maxLength} minLength={minLength} autoCapitalize={autoCapitalize} autoCorrect={autoCorrect} name={name} className={className} onChange={onChange} onKeyPress={onKeyPress} id={id} title={title} pattern={pattern} spellCheck={spellCheck} onBlur={onBlur} onFocus={onFocus} />)
}

export default Input;