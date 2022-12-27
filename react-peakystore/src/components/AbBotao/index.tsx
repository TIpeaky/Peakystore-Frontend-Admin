import styled, { css } from "styled-components";

export interface AbBotaoProps {
    texto?: string
    tipo?: 'primario' | 'secundario'
    onClick?: () => void
}

const BotaoEstilizado = styled.button<AbBotaoProps>`
    background: ${(props: AbBotaoProps) => props.tipo === 'primario' ? '#0083FD' : '#FFF'};
    border: 2px solid #0083FD;
    color: ${(props: AbBotaoProps) => props.tipo === 'primario' ? '#FFF' : '#0083FD'};
    font-size: 20px;
    margin-top: 25px;
    cursor: pointer;
    width: 240px;
    height: 40px;
    border-radius: 10px;

    ${(props: AbBotaoProps) => props.tipo === 'primario' 
        ? css`
            &:hover {
                background: #47A5FC;
                border: 2px solid #47A5FC;
            }
        `
        : css`
        &:hover {
            background: #FFF;
            border: 2px solid #0083FD;
            color: #47A5FC;
        }
        `
    }
`
export const AbBotao = ({ texto, onClick, tipo = 'primario' } : AbBotaoProps) => {
    return (<BotaoEstilizado onClick={onClick} tipo={tipo}>
        {texto}
    </BotaoEstilizado>)
}


