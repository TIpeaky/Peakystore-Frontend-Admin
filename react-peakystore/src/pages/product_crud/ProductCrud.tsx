import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridToolbarQuickFilter, GridActionsCellItem } from '@mui/x-data-grid';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Modal from '@mui/material/Modal';
import http from "../../http"
import { useState, useEffect } from 'react';
import ProductDetails from './ProductDetails';
import { IProduct } from '../../interfaces/IProduct';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import styles from './ProductCrud.module.scss'
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';

//Barra de pesquisa
function QuickSearchToolbar() {
  return (
    <Box sx={{ p: 0.5, pb: 0, }}>
      <GridToolbarQuickFilter />
    </Box>
  );
}

const ProductCrud = () => {

  const [productList, setProductList] = useState<IProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProduct>()

  //Modais
  const [productDetailsModal, setProductDetailsModal] = React.useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = React.useState(false);

  const openProductDetailsModal = (operation: string, product?: IProduct): void => {
    setOperation(operation)
    setSelectedProduct(product)
    setProductDetailsModal(true)
  };
  const closeProductDetailsModal = (): void => { setProductDetailsModal(false) }

  const openDeleteConfirmModal = (product: IProduct): void => {
    setSelectedProduct(product)
    setDeleteConfirmModal(true)
  }

  const closeDeleteConfirmModal = (): void => { setDeleteConfirmModal(false) }


  //Operation pode ser read, update ou save. Modifica a forma de apresentação do modal productDetails
  const [operation, setOperation] = useState("read");


  //atualiza a lista de produtos em tempo real
  useEffect(() => {
    setProductList(productList)
  }, [productList])

  const updateProductList = (targetProduct: IProduct, operation: string): void => {
    let productListCopy = [...productList]
    let index = productList.findIndex(product => product.id === targetProduct.id)

    switch (operation) {
      case "updateItem": {
        if (index !== -1) productListCopy[index] = targetProduct;
        break;
      }
      case "addItem": {
        productListCopy.push(targetProduct);
        break;
      }
      case "removeItem": {
        if (index !== -1) productListCopy.splice(index, 1)
        break;
      }
    }
    setProductList(productListCopy)
  }

  //Chama endpoint de excluir produto
  const deleteProduct = (product: IProduct): void => {

    http.delete('product/' + product.id)
      .then(() => {
        updateProductList(product, "removeItem")
        //informar que o produto foi removido com sucesso

      })
      .catch(error => {
        if (error?.response?.data?.message) {
          alert(error.response.data.message)
        } else {
          alert('Aconteceu um erro inesperado ao excluir o produto! Entre em contato com o suporte!')
          console.log(error)
        }

      })
      setDeleteConfirmModal(false)
  }



  //COLUNAS DA TABELA
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'NOME', width: 200 },
    { field: 'category', headerName: 'CATEGORIA', width: 130 },
    { field: 'section', headerName: 'SEÇÃO', width: 130 },
    { field: 'productBrand', headerName: 'MARCA', width: 130 },
    { field: 'color', headerName: 'COR', width: 130 },
    { field: 'size', headerName: 'TAMANHO', width: 100 },
    { field: 'stockQuantity', headerName: 'ESTOQUE', width: 90 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'AÇÕES',
      width: 80,
      renderCell: (param: any) => [
        <GridActionsCellItem
          icon={<RemoveRedEyeOutlinedIcon />}
          label="Read"
          key="read"
          onClick={() => openProductDetailsModal("read", param.row)}

        />,
        <GridActionsCellItem
          icon={<EditOutlinedIcon />}
          label="Update"
          key="update"
          onClick={() => openProductDetailsModal("update", param.row)}
        />,
        <GridActionsCellItem
          icon={<DeleteOutlineOutlinedIcon />}
          label="Delete"
          key="delete"
          onClick={() => openDeleteConfirmModal(param.row)}
        />
      ]
    }
  ];


  //LINHAS DA TABELA
  useEffect(() => {
    http.get('product')
      .then(response => {
        setProductList(response.data)
      })
      .catch(erro => {
        console.log(erro)
      })
  }, [])

  return (
    <>
      <Box key={1} className={styles.container}>
        <h1>Produtos</h1>
        <Button className={styles.btn_save_product} size="small" variant="contained" startIcon={<AddShoppingCartIcon />}
          onClick={() => openProductDetailsModal("create")}>
          Adicionar novo produto
        </Button>
        <DataGrid className={styles.data_grid}
          rows={productList} columns={columns} disableSelectionOnClick disableColumnSelector disableDensitySelector
          components={{ Toolbar: QuickSearchToolbar }}
          initialState={{ pagination: { pageSize: 25, } }} />
      </Box>

      <Modal
        open={productDetailsModal}>
        <ProductDetails product={selectedProduct!} operation={operation} closeModal={closeProductDetailsModal} updateProductList={updateProductList} />
      </Modal>

      <Modal open={deleteConfirmModal}>
        <div className={styles.delete_modal}>
          <WarningIcon className={styles.warning_icon} />
          <h3>Você tem certeza que deseja excluir este produto?</h3>
          <Button variant="contained" startIcon={<DeleteIcon />}
            className={styles.delete_btn} onClick={() => deleteProduct(selectedProduct!)}>
            Excluir produto
          </Button>
          <Button variant="outlined" className={styles.cancel_btn}
            onClick={closeDeleteConfirmModal}>
            Cancelar
          </Button>

        </div>
      </Modal>
    </>

  )
}

export default ProductCrud