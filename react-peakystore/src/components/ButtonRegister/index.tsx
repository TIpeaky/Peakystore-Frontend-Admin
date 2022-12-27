import React from "react";
import estilos from "./ButtonRegister.module.scss";

interface Props {
  type?: "button" | "reset" | "submit" | undefined,
  onClick?: () => void,
  children?: React.ReactNode
}

function Button({ onClick, type, children }: Props) {
  return (
    <button onClick={onClick} type={type} className={estilos.button}>
      {children}
    </button>
  );
}

export default Button;
