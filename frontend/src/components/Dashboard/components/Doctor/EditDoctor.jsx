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
import { editDoctorByIdAction, getDoctorAction } from '../../../../store/actions/doctor';

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

function EditDoctor({
  getHospital,
  hospitalAdmin,
  editDoctorById,
  getDoctor,
  open,
  onClose,
  success,
  error,
  resetError,
  token,
  hospital,
  doctor,
  hospitals,
}) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confimPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [city, setCity] = useState('');
  const [house, setHouse] = useState('');
  const [state, setState] = useState('');
  const [street, setStreet] = useState('');
  const [pincode, setPincode] = useState('');
  const [hospitalId, setHospitalId] = useState('');
  const [education, setEducation] = useState('');
  const [specilities, setSpecilities] = useState('');
  const [id, setId] = useState('');

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
    if (doctor) {
      setFirstName(doctor ? doctor.firstname : null);
      setLastName(doctor ? doctor.lastname : null);
      setPhone(doctor ? doctor.phone : null);
      setBirthdate(doctor ? doctor.birthdate.split('T')[0] : null);
      setCity(doctor ? doctor.city : null);
      setHouse(doctor ? doctor.house : null);
      setState(doctor ? doctor.state_id : null);
      setStreet(doctor ? doctor.street : null);
      setPincode(doctor ? doctor.pincode : null);
      setHospitalId(doctor ? doctor.hospital_id : null);
      setEducation(doctor ? doctor.education : null);
      setSpecilities(doctor ? doctor.specialities : null);
      setId(doctor ? doctor.id : null);
    }
  }, [token, doctor]);

  const editHandler = async (e) => {
    e.preventDefault();
    resetError();
    await editDoctorById(
      {
        firstname: firstName,
        lastname: lastName,
        phone,
        birthdate,
        city,
        house,
        stateId: state,
        street,
        pincode,
        education,
        specilities,
        hospital: hospitalId,
      },
      id,
      token,
    );
    await getDoctor(token);
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
          <h2 id="simple-modal-title">Update Doctor</h2>
          <form onSubmit={editHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="First name"
                  fullWidth
                  autoFocus
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  fullWidth
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="phone"
                  name="phone"
                  label="Phone No."
                  fullWidth
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="date"
                  label="Birthday"
                  type="date"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  defaultValue={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
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

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="house"
                  name="house"
                  label="House Number"
                  fullWidth
                  value={house}
                  onChange={(e) => setHouse(e.target.value)}
                />
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
                <InputLabel htmlFor="grouped-native-select">
                  Choose State
                </InputLabel>
                <Select
                  native
                  value={state}
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
                <InputLabel htmlFor="grouped-native-select">
                  select hospital
                </InputLabel>
                <Select
                  native
                  value={hospitalId}
                  onChange={(e) => setHospitalId(e.target.value)}
                  id="grouped-native-select"
                  fullWidth
                >
                  <option aria-label="None" value="select hospital" />
                  {hospitals.map((hostipal) => (
                    <option value={hostipal.id}>{hostipal.name}</option>
                  ))}
                </Select>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="education"
                  name="education"
                  label="Education"
                  fullWidth
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="specilities"
                  name="specilities"
                  label="Specilities"
                  fullWidth
                  value={specilities}
                  onChange={(e) => setSpecilities(e.target.value)}
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
                Update
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
    doctor: state.doctor.doctor,
    hospitals: state.hospital.hospitals,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    editDoctorById: (doctorDetails, id, token) => dispatch(editDoctorByIdAction(doctorDetails, id, token)),
    resetError: () => dispatch(resetErrorAction()),
    getDoctor: (token) => dispatch(getDoctorAction(token)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDoctor);
