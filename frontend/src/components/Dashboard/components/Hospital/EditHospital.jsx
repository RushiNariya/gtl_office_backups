/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Modal,
  Grid,
  TextField,
  Button,
  InputLabel,
  Select,
} from '@material-ui/core';
import { toast } from 'react-toastify';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { resetErrorAction } from '../../../../store/actions/user';
import { getHospitalAdminAction } from '../../../../store/actions/hospitalAdmin';
import {
  addHospitalAction,
  editHospitalByIdAction,
  getHospitalAction,
} from '../../../../store/actions/hospital';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => createStyles({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    borderRadius: '6px',
    border: '2px solid grey',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function EditHospital({
  // getHospitalAdmin,
  getHospital,
  hospitalAdmin,
  editHospitalById,
  open,
  onClose,
  success,
  error,
  resetError,
  token,
  hospital,
}) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [name, setName] = useState(hospital ? hospital.name : null);
  const [email, setEmail] = useState(hospital ? hospital.email : null);
  const [contactNo, setContactNo] = useState(
    hospital ? hospital.contact_no : null,
  );
  const [hoursOfOperation, setHoursOfOperation] = useState(
    hospital ? hospital.hours_of_operation : null,
  );
  const [diseases, setDiseases] = useState(hospital ? hospital.diseases : null);
  const [city, setCity] = useState(hospital ? hospital.city : null);
  const [state, setState] = useState(hospital ? hospital.state_id : null);
  const [street, setStreet] = useState(hospital ? hospital.street : null);
  const [pincode, setPincode] = useState(hospital ? hospital.pincode : null);
  const [id, setId] = useState(hospital ? hospital.id : null);

  useEffect(() => {
    resetError();
  }, []);

  useEffect(() => {
    if (success) {
      toast.success(success);
      onClose();
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error]);

  useEffect(async () => {
    if (hospital) {
      setId(hospital.id);
      setName(hospital.name);
      setEmail(hospital.email);
      setContactNo(hospital.contact_no);
      setHoursOfOperation(hospital.hours_of_operation);
      setDiseases(hospital.diseases);
      setCity(hospital.city);
      setState(hospital.state_id);
      setStreet(hospital.street);
      setPincode(hospital.pincode);
    }
  }, [token, hospital]);

  const editHandler = async (e) => {
    e.preventDefault();
    resetError();
    await editHospitalById(
      {
        hospitalName: name,
        email,
        contactNo,
        hoursOfOperation,
        diseases,
        city,
        stateId: state,
        street,
        pincode,
      },
      id,
      token,
    );
    await getHospital(token);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Update Hospital</h2>
          <form onSubmit={editHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="hospitalName"
                  name="hospitalName"
                  label="Hospital name"
                  fullWidth
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="email"
                  name="email"
                  label="Email address"
                  type="email"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="phone"
                  name="phone"
                  label="Phone No."
                  fullWidth
                  value={contactNo}
                  onChange={(e) => setContactNo(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="hoursOfOperation"
                  name="hoursOfOperation"
                  label="Hours Of Operation"
                  fullWidth
                  value={hoursOfOperation}
                  onChange={(e) => setHoursOfOperation(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor="grouped-native-select">
                  Choose State
                </InputLabel>
                <Select
                  native
                  defaultValue={state}
                  onChange={(e) => setState(e.target.value)}
                  id="grouped-native-select"
                  fullWidth
                >
                  <option aria-label="None" value="select state" />
                  <option value={1}>Gujarat</option>
                  <option value={2}>Rajasthan</option>
                  <option value={3}>Maharashtra</option>
                  <option value={4}>Karnataka</option>
                </Select>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="zip"
                  name="zip"
                  label="Postal code"
                  fullWidth
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  required
                  id="street"
                  name="street"
                  label="Street Number"
                  fullWidth
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="diseases"
                  name="diseases"
                  label="Diseases"
                  multiline
                  rows={3}
                  fullWidth
                  value={diseases}
                  onChange={(e) => setDiseases(e.target.value)}
                />
              </Grid>
            </Grid>
            <div className={classes.creatingButtonContainer}>
              <Button
                type="submit"
                size="large"
                variant="contained"
                color="primary"
                fullWidth
                className={classes.createAccountButton}
              >
                Create
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    token: state.user.token,
    error: state.user.error,
    success: state.user.success,
    hospitalAdmin: state.hospitalAdmin.hospitalAdmin,
    hospital: state.hospital.hospital,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    editHospitalById: (hospitalDetails, id, token) => dispatch(editHospitalByIdAction(hospitalDetails, id, token)),
    resetError: () => dispatch(resetErrorAction()),
    getHospital: (token) => dispatch(getHospitalAction(token)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditHospital);
