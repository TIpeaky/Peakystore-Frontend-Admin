import styles from './CategoriesPopUp.module.scss'


function CategoriesPopUp() {


    return (
        <div id="categories_container" className={styles.categories_container}>
            <div className={styles.category}>
                <h4><a href='#'>Feminino</a></h4>
                <ul>
                    <li><a href="#">Camisa</a></li>
                    <li><a href="#">Camiseta</a></li>
                    <li><a href="#">Blusa</a></li>
                    <li><a href="#">Jaquetas</a></li>
                    <li><a href="#">Casacos</a></li>
                    <li><a href="#">Saia</a></li>
                    <li><a href="#">Vestido</a></li>
                    <li><a href="#">Jeans</a></li>
                    <li><a href="#">Calça</a></li>
                    <li><a href="#">Calça Mangueira</a></li>
                    <li><a href="#">Shorts</a></li>
                    <li><a href="#">Maiôs</a></li>
                    <li><a href="#">Roupão</a></li>
                    <li><a href="#">Pijamas</a></li>
                    <li><a href="#">Camisola</a></li>
                    <li><a href="#">Lingerie</a></li>
                </ul>
            </div>




            <div className={styles.category}>
                <h4><a href='#'>Masculino</a></h4>
                <ul>
                <li><a href="#">Camisa</a></li>
                    <li><a href="#">Camiseta</a></li>
                    <li><a href="#">Blusa</a></li>
                    <li><a href="#">Jaquetas</a></li>
                    <li><a href="#">Casacos</a></li>
                    <li><a href="#">Jeans</a></li>
                    <li><a href="#">Calça</a></li>
                    <li><a href="#">Bermudas</a></li>
                    <li><a href="#">Roupão</a></li>
                    <li><a href="#">Pijamas</a></li>
                    <li><a href="#">Roupas íntimas</a></li>
                </ul>
            </div>
            
            <div className={styles.category}>
                <h4><a href='#'>Infantil</a></h4>
                <ul>
                <li><a href="#">Camisa</a></li>
                    <li><a href="#">Camiseta</a></li>
                    <li><a href="#">Blusa</a></li>
                    <li><a href="#">Jaquetas</a></li>
                    <li><a href="#">Casacos</a></li>
                    <li><a href="#">Jeans</a></li>
                    <li><a href="#">Calça</a></li>
                    <li><a href="#">Roupão</a></li>
                    <li><a href="#">Pijamas</a></li>
                    <li><a href="#">Roupas íntimas</a></li>
                </ul>
            </div>
            <div className={styles.category}>
                <h4><a href='#'>Marcas</a></h4>
                <ul>
                    <li><a href="#">Nike</a></li>
                    <li><a href="#">Adidas</a></li>
                    <li><a href="#">Puma</a></li>
                    <li><a href="#">Polo Wear</a></li>
                    <li><a href="#">Fila</a></li>
                    <li><a href="#">Lacoste</a></li>
                    <li><a href="#">Gucci</a></li>
                    <li><a href="#">Lupo</a></li>
                </ul>
            </div>
        </div>
    )
}

export default CategoriesPopUp