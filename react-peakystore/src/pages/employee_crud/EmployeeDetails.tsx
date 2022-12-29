import { IUser } from '../../interfaces/IUser';
import styles from './EmployeeDetails.module.scss';
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

interface employeeDetailsInterface {
  employee: IUser,
  operation: string,
  closeModal(): void,
  updateEmployeeList(employee: IUser, operation: string): void;
}

const EmployeeDetails = ({ employee, operation, closeModal, updateEmployeeList }: employeeDetailsInterface) => {

  const [employeeForm, setEmployeeForm] = useState<IUser>(employee);

  //Preencher employeeForm com os valores do input
  const handleChange = (e: any) => {

    const { name, value } = e.target;

    setEmployeeForm(prevState => ({
      ...prevState,
      [name]: value
    }));
    console.log(employeeForm);
  };

  //Chamar endpoint de atualizar produto
  const updateProduct = () => {
    if (!validateForm()) return;

    http.put('user/employee/' + employeeForm.id, employeeForm)
      .then((response) => {
        updateEmployeeList(response.data, "updateItem");
        closeModal();
      })
      .catch(error => {
        if (error?.response?.data?.message) {
          alert(error.response.data.message);
        } else {
          alert('Aconteceu um erro inesperado ao atualizar o funcionário! Entre em contato com o suporte!');
          console.log(error);
        }
      })
  }

  //Chamar endpoint de salvar novo produto
  const saveProduct = () => {
    if (!validateForm()) return;

    http.post('user/employee', employeeForm)
      .then((response) => {
        updateEmployeeList(response.data, "addItem");
        closeModal();
      })
      .catch(error => {
        if (error?.response?.data?.message) {
          alert(error.response.data.message);
        } else {
          alert('Aconteceu um erro inesperado ao cadastrar o funcionário! Entre em contato com o suporte!');
          console.log(error);
        }

      })
  }

  //validar formulário

  const [nameError, setNameError] = useState("");
  const [cpfError, setCpfError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [birthDateError, setBirthDateError] = useState("");


  const nameIsValid = (): boolean => {
    if (employeeForm?.name === undefined || employeeForm?.name === "") {
      setNameError("Campo obrigatório");
      return false;
    } else if (employeeForm?.name.length < 3) {
      setNameError("Este campo deve conter ao menos 3 caracteres");
      return false;
    } else setNameError("");

    return true;
  }

  const cpfIsValid = (): boolean => {
    if (employeeForm?.cpf === undefined) {
      setCpfError("Campo obrigatório");
      return false;
    } else setCpfError("");
    return true;
  }

  const emailIsValid = (): boolean => {
    if (employeeForm?.email === undefined) {
      setEmailError("Campo obrigatório");
      return false;
    } else setEmailError("");
    return true;
  }

  const passwordIsValid = (): boolean => {
    if (employeeForm?.password === undefined) {
      setPasswordError("Campo obrigatório");
      return false;
    } else setPasswordError("");
    return true;
  }

  const genderIsValid = (): boolean => {
    if (employeeForm?.gender === undefined) {
      setGenderError("Campo obrigatório");
      return false;
    } else setGenderError("");
    return true;
  }
  const birthDateIsValid = (): boolean => {
    if (employeeForm?.birthDate === undefined) {
      setBirthDateError("Campo obrigatório");
      return false;
    } else setBirthDateError("");
    return true;
  }
  

  const validateForm = (): boolean => {
    let errorExists = false;
    
    if (!nameIsValid()) errorExists = true;
    if (!cpfIsValid()) errorExists = true;
    if (!emailIsValid()) errorExists = true;
    if (!passwordIsValid()) errorExists = true;
    if (!genderIsValid()) errorExists = true;
    if (!birthDateIsValid()) errorExists = true;

    if (errorExists) return false;
    return true;
  }

  return (
    <Box component="form" noValidate autoComplete="off" className={styles.container}>
      {operation === "read" && (<h2>Modo de leitura</h2>)}
      {operation === "update" && (<h2>Atualizar funcionário</h2>)}
      {operation === "create" && (<h2>Novo funcionário</h2>)}
      <CloseIcon className={styles.close_icon} onClick={closeModal} />

      <Grid container spacing={2}>
        {operation === "read" && (
          <>
            <Grid item xs={6}>
              <TextField value={employeeForm.id} label="ID" fullWidth InputProps={{ readOnly: true }} />
            </Grid>
          </>
        )}

        {/* Coluna da esquerda */}
        <Grid container spacing={2} item xs={6}>

          <Grid item xs={12}>
            <TextField value={operation !== "create" ? employeeForm.name : undefined}
              {...(operation === "read" ? { inputProps: { readOnly: true } } : {})}
              label="Nome" fullWidth name="name" onChange={handleChange} onBlur={nameIsValid}
              error={nameError !== ""} helperText={nameError}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField value={operation !== "create" ? employeeForm.cpf : undefined}
              {...(operation === "read" ? { inputProps: { readOnly: true } } : {})}
              label="CPF" fullWidth name="cpf" onChange={handleChange} onBlur={cpfIsValid}
              error={cpfError !== ""} helperText={cpfError}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField value={operation !== "create" ? employeeForm.email : undefined}
              {...(operation === "read" ? { inputProps: { readOnly: true } } : {})}
              label="E-mail" fullWidth name="email" onChange={handleChange} onBlur={emailIsValid}
              error={emailError !== ""} helperText={emailError} />
          </Grid>

          {operation !== "read" && (
            <>
              <Grid item xs={6}>
                <TextField value={operation !== "create" ? employeeForm.password : undefined}
                  label="Senha" fullWidth name="password" onChange={handleChange} onBlur={passwordIsValid}
                  error={passwordError !== ""} helperText={passwordError} type="password" />
              </Grid>
            </>
          )}

          

          <Grid item xs={6}>
            <FormControl fullWidth error={genderError !== ""}>
              <InputLabel id="product-color-label">Gênero</InputLabel>
              <Select
                labelId="product-color-label" name="gender" label="Gênero" onChange={handleChange} onBlur={genderIsValid}
                value={employeeForm && employeeForm.gender ? employeeForm.gender : ''}
                {...(operation === "read" ? { inputProps: { readOnly: true } } : {})}
              >
                <MenuItem value={"MALE"}>Masculino</MenuItem>
                <MenuItem value={"FEMALE"}>Feminino</MenuItem>
                <MenuItem value={"UNINFORMED"}>Outro</MenuItem>
              </Select>
              <FormHelperText>{genderError}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField value={operation !== "create" ? employeeForm.birthDate : undefined}
              {...(operation === "read" ? { inputProps: { readOnly: true } } : {})}
              label="Data de nascimento" fullWidth name="birthDate" onChange={handleChange} onBlur={birthDateIsValid} type="date"
              error={birthDateError !== ""} helperText={birthDateError} />
          </Grid> 

        </Grid>

        {/* Coluna da direita */}
        <Grid container spacing={2} item xs={6}>
          <Grid item xs={12}>
            <TextField label="Espaço destinado a inserção da foto do funcionário"
              multiline rows={4} fullWidth disabled />
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
                Adicionar funcionário
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default EmployeeDetails
