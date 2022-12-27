import React, { useState } from "react";
import estilos from "./UserRegister.module.scss";
import http from "../../http";
import ButtonRegister from "../ButtonRegister";
import logoGoogle from "./assets/logo-google.png";
import logoFacebook from "./assets/logo-facebook.png";
import { IGender } from "../../interfaces/IGender";
import { maskCPF } from "../../Util/Mask"

const UserRegister = () => {
  
  const [cpf, setCpf] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [passwordConfirm, setPassWordConfirm] = useState("");
  const [genderFormList, setGenderFormList] = useState<IGender[]>([]);
  const [birthDate, setBirthDate] = useState("");
  const [notification, setNotification] = useState(false);

  const register = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    const user = {
      cpf,
      name,
      email,
      password,
      genderFormList,
      birthDate,
      notification,
    };

    console.log("Usuário - cpf: " + user.cpf);
    console.log("Usuário - nome: " + user.name);
    console.log("Usuário - email: " + user.email);
    console.log("Usuário - senha: " + user.password);
    console.log("Usuário - preferências (lista): " + user.genderFormList);
    console.log("Usuário - data de nascimento: " + user.birthDate);
    console.log("Usuário - notificação: " + user.notification);

    if(validatePassword()) {
      http
      .post("user/client", user)
      .then((response) => {
        setCpf("");
        setName("");
        setEmail("");
        setPassWord("");
        setGenderFormList([]);
        setBirthDate("");
        setNotification(Boolean);
      })
      .catch((error) => {
        if (error?.response?.data?.message) {
          alert(error.response.data.message);
        } else {
          alert("Erro ao realizar o cadastro!");
        }
      });
    }

  };

  function handleChangeMaskCPF(event: any) {
      const { value } = event.target

      setCpf(maskCPF(value))
  }

  const handleChangeNotification = (
    evento: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (evento.target.value == "true") {
      if (notification == true) {
        console.log("Desmarcado");
      }
      setNotification(!notification);
    }
  };

  const handleChangePreferences = (
    evento: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGenderFormList((prevState) => {
      let exist: boolean = false;

      prevState.forEach(function (value) {
        if(value.genderEnum == evento.target.value) {
          exist = true;
        }
      })

      if(exist) {
        const newArray = [...prevState];
        newArray.splice(prevState.indexOf({genderEnum: evento.target.value}), 1);
        return newArray;
      } else {
        return [...prevState, {genderEnum: evento.target.value}];
      }
    });
  };

  const validatePassword = () => {
    if(passwordConfirm != password) {
      alert("Senhas estão diferentes!");
      return false;
    } return true;
  }

  return (
    <div className={estilos.background}>
      <section className={estilos.container_social_medias}>
        <label htmlFor="" className={estilos.label}>
          Cadastrar com rede social
        </label>
        <div className={estilos.logo}>
          <a href="#">
            <div className={estilos.container_social_medias_register}>
              <img src={logoGoogle} alt="Logo Google" width="30rem" />
              <p className={estilos.container_social_medias_register_paragrafo}>Cadastrar com Google</p>
            </div>
          </a>

          <a href="#">
            <div className={estilos.container_social_medias_register}>
              <img src={logoFacebook} alt="Logo Facebook" width="30rem" />
              <p className={estilos.container_social_medias_register_paragrafo}>Cadastrar com Facebook</p>
            </div>
          </a>
        </div>
      </section>

      <section className={estilos.container}>
        <form onSubmit={register}>
          <div className="form-item">
            <label htmlFor="name" className={estilos.label}>
              CPF
            </label>
            <input
              type="text"
              className={estilos.input}
              id="cpf"
              name="cpf"
              value={cpf}
              onChange={handleChangeMaskCPF}
              placeholder="xxx.xxx.xxx-xx"
              required
            />
          </div>

          <div className="form-item">
            <label htmlFor="name" className={estilos.label}>
              Nome completo
            </label>
            <input
              type="text"
              className={estilos.input}
              id="name"
              name="name"
              value={name}
              onChange={(evento) => setName(evento.target.value)}
              placeholder="Digite seu nome completo"
              required
            />
          </div>

          <div className="">
            <label htmlFor="email" className={estilos.label}>
              Email
            </label>
            <input
              type="email"
              className={estilos.input}
              id="email"
              name="email"
              value={email}
              onChange={(evento) => setEmail(evento.target.value)}
              placeholder="Digite seu email"
              required
            />
          </div>

          <div className="">
            <label htmlFor="birthdate" className={estilos.label}>
              Data de nascimento
            </label>
            <input
              type="date"
              className={estilos.input}
              id="birthdate"
              name="birthdate"
              value={birthDate}
              onChange={(evento) => setBirthDate(evento.target.value)}
              placeholder="data"
              required
            />
          </div>

          <div className="">
            <label htmlFor="" className={estilos.label}>
              Quais as preferências
            </label>

            <div className={estilos.preferencia}>
              <input
                type="checkbox"
                className={estilos.preferencia_input}
                id="moda-masculina"
                name="Moda-Masculina"
                value="MALE"
                onChange={handleChangePreferences}
              />
              <label
                htmlFor="moda-masculina"
                className={estilos.preferencia_label}
              >
                Moda Masculina
              </label>
            </div>

            <div className={estilos.preferencia}>
              <input
                type="checkbox"
                className={estilos.preferencia_input}
                id="moda-feminina"
                name="Moda-Feminina"
                value="FEMALE"
                onChange={handleChangePreferences}
              />
              <label
                htmlFor="moda-feminina"
                className={estilos.preferencia_label}
              >
                Moda Feminina
              </label>
            </div>

            <div className={estilos.preferencia}>
              <input
                type="checkbox"
                className={estilos.preferencia_input}
                id="moda-infantil"
                name="Moda-Infantil"
                value="KIDS"
                onChange={handleChangePreferences}
              />
              <label
                htmlFor="moda-infantil"
                className={estilos.preferencia_label}
              >
                Moda Infantil
              </label>
            </div>

            <div className={estilos.preferencia}>
              <input
                type="checkbox"
                className={estilos.preferencia_input}
                id="nenhuma"
                name="Nenhuma"
                value="UNINFORMED"
                onChange={handleChangePreferences}
              />
              <label htmlFor="nenhuma" className={estilos.preferencia_label}>
                Prefiro não informar
              </label>
            </div>
          </div>

          <div className="">
            <label htmlFor="password" className={estilos.label}>
              Senha
            </label>
            <input
              type="password"
              className={estilos.inputPassword}
              id="password"
              name="password"
              value={password}
              onChange={(evento) => setPassWord(evento.target.value)}
              placeholder="Digite sua senha"
              required
            />
            <p className={estilos.p}>(Mínimo de 6 caractéres)</p>
          </div>

          <div className="">
            <label htmlFor="password-confirm" className={estilos.label}>
              Confirmar senha
            </label>
            <input
              type="password"
              className={estilos.input}
              id="password-confirm"
              name="password-confirm"
              value={passwordConfirm}
              onChange={(evento) => setPassWordConfirm(evento.target.value)}
              placeholder="Digite sua senha novamente"
              required
            />
          </div>

          <div className={estilos.notificacao}>
            <input
              type="checkbox"
              id="notification"
              className={estilos.notificacao_input}
              name="notification"
              value="true"
              onChange={handleChangeNotification}
            />
            <label htmlFor="notification" className={estilos.notificacao_label}>
              Desejo receber promoções e novidades por email
            </label>
          </div>

          <div className={estilos.notificacao}>
            <input
              type="checkbox"
              id="termos"
              className={estilos.notificacao_input}
            />
            <label htmlFor="termos" className={estilos.notificacao_label}>
              Li e aceito a{" "}
              <a href="https://github.com/TIpeaky/PeakyStore" target="blank">
                Política de Privacidade
              </a>{" "}
              da PeakyStore e os{" "}
              <a href="https://github.com/TIpeaky/PeakyStore" target="blank">
                Termos de Uso
              </a>
            </label>
          </div>

          <div className={estilos.button}>
            <ButtonRegister type="submit">Cadastrar</ButtonRegister>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UserRegister;
