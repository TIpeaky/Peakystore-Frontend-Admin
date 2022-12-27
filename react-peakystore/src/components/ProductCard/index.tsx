import styles from "./ProductCard.module.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";

interface props {
  name: string;
  price: string;
  img: string;
  link?: string;
}

const ProductCard = ({ name, price, img, link }: props) => {
  const [isActive, SetIsActive] = useState(false);
  const [color, setColor] = useState("#FFFFFF");
  const [stroke, setStroke] = useState("#000000");

  const changeFavorite = () => {
    if(!isActive) {
      setColor("#FF0000");
      setStroke("#FF0000");
      SetIsActive(true);
    } else {
      setColor("#FFFFFF");
      setStroke("#000000");
      SetIsActive(false);
    }
  };

  return (
    <div className={styles.card}>
      <a href={link}>
        <img src={img} alt="" className={styles.card_img} />

        <h1 className={styles.card_h1}>{name}</h1>
      </a>

      <div className={styles.card_container}>

        <p className={styles.card_p}>R${price}</p>

        <FavoriteIcon
          className={styles.card_icon}
          onClick={changeFavorite}
          sx={{
            color: color,
            stroke: stroke,
            strokeWidth: 1.7,
            "&:hover": {
              // color: "#FF0000",
              stroke: "#FF0000",
              strokeWidth: 1.7,
              height: "101%"
            },
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
};

export default ProductCard;
