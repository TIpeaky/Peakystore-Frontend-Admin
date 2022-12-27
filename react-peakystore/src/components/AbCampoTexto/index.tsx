import React from "react";
import styled from "styled-components";

const LabelEstilizada = styled.label<{ darkmode: boolean }>`
    display: block;
    width: 70px;
    height: 20px;
    margin-top: 22px;

    font-family: 'Poppins', sans-serif;
    font-size: 20px;

    color: #7C838A;
`

const InputEstilizado = styled.input<{ placeholderAlign: string, darkmode: boolean }>`
    box-sizing: border-box;
    width: 100%;
    height: 44px;
    margin-top: 9px;

    background: rgba(255, 255, 255, 0.4);
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
    border-radius: 20px;

    font-size: 16px;
    padding: 8px 24px;
    &:focus{
        outline: none;
    }
    text-align: ${(props) => props.placeholderAlign};
    ::placeholder,
    ::-webkit-input-placeholder  {
        color: ${(props) => props.darkmode ? '#FFF' : 'rgba(0, 0, 0, 0.5)'};
        font-family: 'Poppins';
        font-size: 20px;
    }
`

export interface AbCampoTextoProps {
    label?: string;
    placeholder?: string;
    placeholderAlign?: 'left' | 'center' | 'right';
    value: string;
    type?: 'text' | 'email' | 'password' | 'date';
    onChange: (value: string) => void
    darkmode?: boolean
}

export const AbCampoTexto = ({ 
        label, 
        value, 
        onChange, 
        type = 'text', 
        placeholder = "", 
        placeholderAlign = 'left', 
        darkmode = false 
}: AbCampoTextoProps) => {
    return (
        <div>
            {label && <LabelEstilizada darkmode={darkmode}>
                {label}
            </LabelEstilizada>}
            <InputEstilizado
                placeholder={placeholder}
                placeholderAlign={placeholderAlign}
                darkmode={darkmode}
                type={type}
                value={value}
                onChange={event => onChange(event.target.value)}
                required
            />
        </div>
    )
}
