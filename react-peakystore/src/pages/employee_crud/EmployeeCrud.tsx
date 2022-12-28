import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridToolbarQuickFilter, GridActionsCellItem } from '@mui/x-data-grid';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Modal from '@mui/material/Modal';
import http from "../../http"
import { useState, useEffect } from 'react';
import ProductDetails from './EmployeeDetails';
import { IUser } from '../../interfaces/IUser';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import styles from './EmployeeCrud.module.scss'
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

const EmployeeCrud = () => {

  const [employeeList, setemployeeList] = useState<IUser[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IUser>()

  //Modais
  const [productDetailsModal, setProductDetailsModal] = React.useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = React.useState(false);

  const openProductDetailsModal = (operation: string, product?: IUser): void => {
    setOperation(operation)
    setSelectedProduct(product)
    setProductDetailsModal(true)
  };
  const closeProductDetailsModal = (): void => { setProductDetailsModal(false) }

  const openDeleteConfirmModal = (product: IUser): void => {
    setSelectedProduct(product)
    setDeleteConfirmModal(true)
  }

  const closeDeleteConfirmModal = (): void => { setDeleteConfirmModal(false) }


  //Operation pode ser read, update ou save. Modifica a forma de apresentação do modal productDetails
  const [operation, setOperation] = useState("read");


  //atualiza a lista de funcionários em tempo real
  useEffect(() => {
    setemployeeList(employeeList)
  }, [employeeList])

  const updateEmployeeList = (targetProduct: IUser, operation: string): void => {
    let employeeListCopy = [...employeeList]
    let index = employeeList.findIndex(product => product.id === targetProduct.id)

    switch (operation) {
      case "updateItem": {
        if (index !== -1) employeeListCopy[index] = targetProduct;
        break;
      }
      case "addItem": {
        employeeListCopy.push(targetProduct);
        break;
      }
      case "removeItem": {
        if (index !== -1) employeeListCopy.splice(index, 1)
        break;
      }
    }
    setemployeeList(employeeListCopy)
  }

  //Chama endpoint de excluir funcionário
  const deleteProduct = (employee: IUser): void => {

    http.delete('user/employee/' + employee.id)
      .then(() => {
        updateEmployeeList(employee, "removeItem")
        //informar que o funcionário foi removido com sucesso

      })
      .catch(error => {
        if (error?.response?.data?.message) {
          alert(error.response.data.message)
        } else {
          alert('Aconteceu um erro inesperado ao excluir o funcionário! Entre em contato com o suporte!')
          console.log(error)
        }

      })
      setDeleteConfirmModal(false)
  }



  //COLUNAS DA TABELA
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'NOME', width: 200 },
    { field: 'cpf', headerName: 'CPF', width: 130 },
    { field: 'email', headerName: 'EMAIL', width: 130 },
    { field: 'birthDate', headerName: 'NASCIMENTO', width: 130 },
    { field: 'gender', headerName: 'GÊNERO', width: 130 },
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
    http.get('user/employee')
      .then(response => {
        setemployeeList(response.data)
      })
      .catch(erro => {
        console.log(erro)
      })
  }, [])

  return (
    <>
      <Box key={1} className={styles.container}>
        <h1>Funcionários</h1>
        <Button className={styles.btn_save_product} size="small" variant="contained" startIcon={<AddShoppingCartIcon />}
          onClick={() => openProductDetailsModal("create")}>
          Adicionar novo funcionário
        </Button>
        <DataGrid className={styles.data_grid}
          rows={employeeList} columns={columns} disableSelectionOnClick disableColumnSelector disableDensitySelector
          components={{ Toolbar: QuickSearchToolbar }}
          initialState={{ pagination: { pageSize: 25, } }} />
      </Box>

      <Modal
        open={productDetailsModal}>
        <ProductDetails employee={selectedProduct!} operation={operation} closeModal={closeProductDetailsModal} updateEmployeeList={updateEmployeeList} />
      </Modal>

      <Modal open={deleteConfirmModal}>
        <div className={styles.delete_modal}>
          <WarningIcon className={styles.warning_icon} />
          <h3>Você tem certeza que deseja excluir este funcionário?</h3>
          <Button variant="contained" startIcon={<DeleteIcon />}
            className={styles.delete_btn} onClick={() => deleteProduct(selectedProduct!)}>
            Excluir funcionário
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

export default EmployeeCrud