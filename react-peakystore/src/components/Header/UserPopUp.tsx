import { Session } from 'inspector';
import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './UserPopUp.module.scss'

function UserPopUp() {
    let navigate = useNavigate();
    const token = sessionStorage.getItem('token')
    const fullName = sessionStorage.getItem('name')


    const [userIsLoggedIn, setUserIsLoggedIn] = useState<boolean>(token != null)
    const [user, setUser] = useState<string>()

    useEffect(() => {
        if (token) {
            setUserIsLoggedIn(true)
            if(fullName != null) {
                let name = fullName.split(" ")
                setUser(name[0])
            }
        }
    }, [])


    const efetuarLogout = () => {
        setUserIsLoggedIn(false)
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('name')
        navigate('/')
    }

    return (
        <div className={styles.container}>
            {userIsLoggedIn? (
                <div>
                <h3 className={styles.account_title}>Olá, {user}!</h3>
                <ul className={styles.account_menu}>
                    <li className={styles.link_standard}><a  href="#">Minha conta</a></li>
                    <li className={styles.link_standard}><a  href="#">Meus pedidos</a></li>
                    <li className={styles.link_standard}><a  href="#">Minha lista de desejos</a></li>
                    <li className={styles.link_standard}><a  href="newPassword">Alterar senha</a></li>
                    <li className={styles.link_logout} onClick={efetuarLogout}>Sair da conta</li>
                </ul>
                </div>
            ) : (
                <div>
                    <button 
                    className={styles.btn_login} 
                    onClick={() => navigate('/login')}>Fazer Login</button>
                    <span className={styles.span_signup}>Cliente novo?</span>
                    <a className={styles.link_signup} href="#" onClick={() => navigate('/register')}>Cadastrar</a>
                </div>
            )}
        </div>
    )
}

export default UserPopUp