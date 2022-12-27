import styles from './NotFound.module.scss';
import NotFoundImage from './../../images/svg/NotFound.svg';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className={classNames({
      [styles.Not_Found__container]: true
    })}>
      <div className={styles.Not_Found__voltar}>
        <button onClick={() => navigate(-1)}>
          {'< Voltar'}
        </button>
      </div>
      <img className={styles.Not_Found__image} src={NotFoundImage} alt="página não encontrada" />
    </div>
  );
}