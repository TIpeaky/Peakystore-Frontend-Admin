import { IProduct } from '../../interfaces/IProduct';
import styles from './ProductDetails.module.scss';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import http from "../../http";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';

interface productDetailsInterface {
  product: IProduct,
  operation: string,
  closeModal(): void,
  updateProductList(product: IProduct, operation: string): void;
}

const ProductDetails = ({ product, operation, closeModal, updateProductList }: productDetailsInterface) => {

  const [productForm, setProductForm] = useState<IProduct>(product);

  //Preencher productform com os valores do input
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProductForm(prevState => ({
      ...prevState,
      [name]: value
    }));
    console.log(productForm);
  };

  //Preencher product form com os valores do input de preços
  const handleChangeMoneyInput = (e: any) => {
    let { name, value } = e.target;
    value = moneyMask(e);
    e.target.value = value;

    let onlyNumbers = value;
    onlyNumbers = onlyNumbers.replace(/[^\d,]+/g, '')
    onlyNumbers = onlyNumbers.replace(",", ".")
    setProductForm(prevState => ({
      ...prevState,
      [name]: onlyNumbers
    }));
    console.log(productForm);
  }

  function moneyMask(e: any) {
    const onlyDigits = e.target.value
      .split("")
      .filter((s: any) => /\d/.test(s))
      .join("")
      .padStart(3, "0");
    const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2);
    return maskCurrency(digitsFloat);
  }
  function maskCurrency(valor: any, locale = 'pt-BR', currency = 'BRL') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency
    }).format(valor)
  }
  //impedir números negativos no input number
  const preventMinus = (e: any) => {
    if (e.code === 'Minus' || e.code === "KeyE") {
      e.preventDefault();
    }
  };

  //Chamar endpoint de atualizar produto
  const updateProduct = () => {
    if (!validateForm()) return;

    http.put('product/' + productForm.id, productForm)
      .then((response) => {
        updateProductList(response.data, "updateItem");
        closeModal();
      })
      .catch(error => {
        if (error?.response?.data?.message) {
          alert(error.response.data.message);
        } else {
          alert('Aconteceu um erro inesperado ao atualizar o produto! Entre em contato com o suporte!');
          console.log(error);
        }
      })
  }

  //Chamar endpoint de salvar novo produto
  const saveProduct = () => {
    if (!validateForm()) return;

    http.post('product', productForm)
      .then((response) => {
        updateProductList(response.data, "addItem");
        closeModal();
      })
      .catch(error => {
        if (error?.response?.data?.message) {
          alert(error.response.data.message);
        } else {
          alert('Aconteceu um erro inesperado ao cadastrar o produto! Entre em contato com o suporte!');
          console.log(error);
        }

      })
  }

  //validar formulário

  const [nameError, setNameError] = useState("");
  const [purchasePriceError, setPurchasePriceError] = useState("");
  const [salePriceError, setSalePriceError] = useState("");
  const [colorError, setColorError] = useState("");
  const [brandError, setBrandError] = useState("");
  const [sizeError, setSizeError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [sectionError, setSectionError] = useState("");
  const [stockError, setStockError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");


  const nameIsValid = (): boolean => {
    if (productForm?.name === undefined || productForm?.name === "") {
      setNameError("Campo obrigatório");
      return false;
    } else if (productForm?.name.length < 3) {
      setNameError("Este campo deve conter ao menos 3 caracteres");
      return false;
    } else setNameError("");

    return true;
  }

  const purchasePriceIsValid = (): boolean => {
    if (productForm?.purchasePrice === undefined) {
      setPurchasePriceError("Campo obrigatório");
      return false;
    } else setPurchasePriceError("");
    return true;
  }

  const salePriceIsValid = (): boolean => {
    if (productForm?.salePrice === undefined) {
      setSalePriceError("Campo obrigatório");
      return false;
    } else setSalePriceError("");
    return true;
  }

  const colorIsValid = (): boolean => {
    if (productForm?.color === undefined) {
      setColorError("Campo obrigatório");
      return false;
    } else setColorError("");
    return true;
  }

  const brandIsValid = (): boolean => {
    if (productForm?.productBrand === undefined) {
      setBrandError("Campo obrigatório");
      return false;
    } else setBrandError("");
    return true;
  }
  const sizeIsValid = (): boolean => {
    if (productForm?.size === undefined) {
      setSizeError("Campo obrigatório");
      return false;
    } else setSizeError("");
    return true;
  }
  const categoryIsValid = (): boolean => {
    if (productForm?.category === undefined) {
      setCategoryError("Campo obrigatório");
      return false;
    } else setCategoryError("");
    return true;
  }
  const sectionIsValid = (): boolean => {
    if (productForm?.section === undefined) {
      setSectionError("Campo obrigatório");
      return false;
    } else setSectionError("");
    return true;
  }
  const stockIsValid = (): boolean => {
    if (productForm?.stockQuantity === undefined || productForm?.stockQuantity.toString() === "") {
      setStockError("Campo obrigatório");
      return false;
    } else setStockError("");
    return true;
  }
  const descriptionIsValid = (): boolean => {
    if (productForm?.description === undefined || productForm?.description === "") {
      setDescriptionError("Campo obrigatório");
      return false;
    } else setDescriptionError("");
    return true;
  }

  const validateForm = (): boolean => {
    let errorExists = false;
    
    if (!nameIsValid()) errorExists = true;
    if (!purchasePriceIsValid()) errorExists = true;
    if (!salePriceIsValid()) errorExists = true;
    if (!colorIsValid()) errorExists = true;
    if (!brandIsValid()) errorExists = true;
    if (!sizeIsValid()) errorExists = true;
    if (!categoryIsValid()) errorExists = true;
    if (!sectionIsValid()) errorExists = true;
    if (!stockIsValid()) errorExists = true;
    if (!descriptionIsValid()) errorExists = true;

    if (errorExists) return false;
    return true;
  }

  return (
    <Box component="form" noValidate autoComplete="off" className={styles.container}>
      {operation === "read" && (<h2>Modo de leitura</h2>)}
      {operation === "update" && (<h2>Atualizar produto</h2>)}
      {operation === "create" && (<h2>Novo produto</h2>)}
      <CloseIcon className={styles.close_icon} onClick={closeModal} />

      <Grid container spacing={2}>
        {operation === "read" && (
          <>
            <Grid item xs={6}>
              <TextField value={productForm.id} label="ID" fullWidth InputProps={{ readOnly: true }} />
            </Grid>

            <Grid item xs={6}>
              <TextField value={productForm.sku} label="SKU" fullWidth InputProps={{ readOnly: true }} />
            </Grid>
          </>
        )}

        {/* Coluna da esquerda */}
        <Grid container spacing={2} item xs={6}>

          <Grid item xs={12}>
            <TextField value={operation !== "create" ? productForm.name : undefined}
              {...(operation === "read" ? { inputProps: { readOnly: true } } : {})}
              label="Nome" fullWidth name="name" onChange={handleChange} onBlur={nameIsValid}
              error={nameError !== ""} helperText={nameError}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField value={operation !== "create" ? productForm.purchasePrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : undefined}
              {...(operation === "read" ? { inputProps: { readOnly: true } } : {})}
              label="Preço de compra" fullWidth name="purchasePrice" onChange={handleChangeMoneyInput} onBlur={purchasePriceIsValid}
              error={purchasePriceError !== ""} helperText={purchasePriceError}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField value={operation !== "create" ? productForm.salePrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : undefined}
              {...(operation === "read" ? { inputProps: { readOnly: true } } : {})}
              label="Preço de venda" fullWidth name="salePrice" onChange={handleChangeMoneyInput} onBlur={salePriceIsValid}
              error={salePriceError !== ""} helperText={salePriceError} />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth error={colorError !== ""}>
              <InputLabel id="product-color-label">Cor</InputLabel>
              <Select
                labelId="product-color-label" name="color" label="Cor" onChange={handleChange} onBlur={colorIsValid}
                value={productForm && productForm.color ? productForm.color : ''}
                {...(operation === "read" ? { inputProps: { readOnly: true } } : {})}
              >
                <MenuItem value={"BLACK"}>Preto</MenuItem>
                <MenuItem value={"WHITE"}>Branco</MenuItem>
                <MenuItem value={"GREY"}>Cinza</MenuItem>
                <MenuItem value={"BLUE"}>Azul</MenuItem>
                <MenuItem value={"GREEN"}>Verde</MenuItem>
                <MenuItem value={"RED"}>Vermelho</MenuItem>
                <MenuItem value={"YELLOW"}>Amarelo</MenuItem>
                <MenuItem value={"PURPLE"}>Roxo</MenuItem>
                <MenuItem value={"PINK"}>Rosa</MenuItem>
                <MenuItem value={"ORANGE"}>Laranja</MenuItem>
                <MenuItem value={"BROWN"}>Marrom</MenuItem>
              </Select>
              <FormHelperText>{colorError}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth error={brandError !== ""}>
              <InputLabel id="product-brand-label">Marca</InputLabel>
              <Select
                labelId="product-brand-label" name="productBrand" onChange={handleChange} onBlur={brandIsValid}
                value={productForm && productForm.productBrand ? productForm.productBrand : ''} label="Marca"
                {...(operation === "read" ? { inputProps: { readOnly: true } } : {})} >
                <MenuItem value={"NIKE"}>Nike</MenuItem>
                <MenuItem value={"ADIDAS"}>Adidas</MenuItem>
                <MenuItem value={"PUMA"}>Puma</MenuItem>
                <MenuItem value={"POLO_WEAR"}>Polo Wear</MenuItem>
                <MenuItem value={"FILA"}>Fila</MenuItem>
                <MenuItem value={"LACOSTE"}>Lacoste</MenuItem>
                <MenuItem value={"GUCCI"}>Gucci</MenuItem>
                <MenuItem value={"LUPA"}>Lupo</MenuItem>
              </Select>
              <FormHelperText>{brandError}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth error={sizeError !== ""}>
              <InputLabel id="product-size-label">Tamanho</InputLabel>
              <Select
                labelId="product-size-label" name="size" onChange={handleChange} onBlur={sizeIsValid}
                value={productForm && productForm.size ? productForm.size : ''} label="Tamanho"
                {...(operation === "read" ? { inputProps: { readOnly: true } } : {})}>
                <MenuItem value={"XS"}>XP</MenuItem>
                <MenuItem value={"S"}>P</MenuItem>
                <MenuItem value={"M"}>M</MenuItem>
                <MenuItem value={"L"}>G</MenuItem>
                <MenuItem value={"XL"}>XG</MenuItem>
                <MenuItem value={"XXL"}>XXG</MenuItem>
              </Select>
              <FormHelperText>{sizeError}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth error={categoryError !== ""}>
              <InputLabel id="product-category-label">Categoria</InputLabel>
              <Select
                labelId="product-category-label" name="category" onChange={handleChange} onBlur={categoryIsValid}
                value={productForm && productForm.category ? productForm.category : ''} label="Categoria"
                {...(operation === "read" ? { inputProps: { readOnly: true } } : {})}>
                <MenuItem value={"SHIRT"}>Camisa</MenuItem>
                <MenuItem value={"TSHIRT"}>Camiseta</MenuItem>
                <MenuItem value={"PANTS"}>Calça</MenuItem>
                <MenuItem value={"JEANS"}>Jeans</MenuItem>
                <MenuItem value={"SHORTS"}>Bermuda</MenuItem>
                <MenuItem value={"BLOUSE"}>Blusa</MenuItem>
                <MenuItem value={"JACKET"}>Jaqueta</MenuItem>
                <MenuItem value={"COAT"}>Casaco</MenuItem>
                <MenuItem value={"SWEATER"}>Suéter</MenuItem>
                <MenuItem value={"PAJAMAS"}>Pijama</MenuItem>
                <MenuItem value={"SKIRT"}>Saia</MenuItem>
                <MenuItem value={"DRESS"}>Vestido</MenuItem>
                <MenuItem value={"BATHROBE"}>Roupão</MenuItem>
                <MenuItem value={"NIGHTGOWN"}>Camisola</MenuItem>
                <MenuItem value={"PANTS_HOSE"}>Meia-calça</MenuItem>
                <MenuItem value={"UNDERWEAR"}>Roupa Íntima</MenuItem>
                <MenuItem value={"SWINSUITS"}>Maiô</MenuItem>
              </Select>
              <FormHelperText>{categoryError}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth error={sectionError !== ""}>
              <InputLabel id="product-section-label">Seção</InputLabel>
              <Select
                labelId="product-section-label" name="section" onChange={handleChange} onBlur={sectionIsValid}
                value={productForm && productForm.section ? productForm.section : ''} label="Seção"
                {...(operation === "read" ? { inputProps: { readOnly: true } } : {})}>
                <MenuItem value={"MALE"}>Masculina</MenuItem>
                <MenuItem value={"FEMALE"}>Feminina</MenuItem>
                <MenuItem value={"UNISEX"}>Unisex</MenuItem>
                <MenuItem value={"MALE_CHILDREN"}>Infantil masculina</MenuItem>
                <MenuItem value={"FEMALE_CHILDREN"}>Infantil feminina</MenuItem>
                <MenuItem value={"UNISEX_CHILDREN"}>Infantil unisex</MenuItem>
              </Select>
              <FormHelperText>{sectionError}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField value={operation !== "create" ? productForm.stockQuantity : undefined}
              {...(operation === "read" ? { inputProps: { readOnly: true } } : {})}
              type="number" label="Estoque" fullWidth inputProps={{ min: 0 }}
              onKeyPress={preventMinus}
              name="stockQuantity" onChange={handleChange} onBlur={stockIsValid}
              error={stockError !== ""} helperText={stockError} />
          </Grid>

        </Grid>

        {/* Coluna da direita */}
        <Grid container spacing={2} item xs={6}>
          <Grid item xs={12}>
            <TextField label="Espaço destinado a inserção de fotos do produto"
              multiline rows={4} fullWidth disabled />
          </Grid>

          <Grid item xs={12}>
            <TextField value={operation !== "create" ? productForm.description : undefined}
              label="Descrição" name="description" onChange={handleChange} onBlur={descriptionIsValid} fullWidth multiline
              rows={7} {...(operation === "read" ? { inputProps: { readOnly: true } } : {})}
              error={descriptionError !== ""} helperText={descriptionError} />
          </Grid>

          <Grid item className={styles.btn_container}>
            <Button className={styles.btn_voltar} onClick={closeModal}>
              Voltar
            </Button>

            {operation === "update" && (
              <Button className={styles.btn} onClick={updateProduct} variant="contained" sx={{ marginLeft: 1 }}>
                Salvar alterações
              </Button>
            )}

            {operation === "create" && (
              <Button className={styles.btn} onClick={saveProduct} variant="contained" sx={{ marginLeft: 1 }}>
                Adicionar produto
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ProductDetails
