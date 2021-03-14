import { connectProps } from '@devexpress/dx-react-core';
import { EditingState, ViewState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  AllDayPanel, AppointmentForm, Appointments,
  AppointmentTooltip,
  DragDropProvider,
  EditRecurrenceMenu,
  MonthView,
  Scheduler,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  WeekView,
  ConfirmationDialog
} from '@devexpress/dx-react-scheduler-material-ui';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import * as React from 'react';
import AppointmentFormTask from '../AppointmentFormTask';
import ScheduleDataControl from '../../Controllers/ScheduleDataControl'
import CustomCurrentTimeIndicator from '../CustomCurrentTimeIndicator'


const containerStyles = theme => ({
  container: {
    width: theme.spacing(68),
    padding: 0,
    paddingBottom: theme.spacing(2),
  },
  content: {
    padding: theme.spacing(2),
    paddingTop: 0,
  },
  header: {
    overflow: 'hidden',
    paddingTop: theme.spacing(0.5),
  },
  closeButton: {
    float: 'right',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 2),
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  picker: {
    marginRight: theme.spacing(2),
    '&:last-child': {
      marginRight: 0,
    },
    width: '50%',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 0),
  },
  icon: {
    margin: theme.spacing(2, 0),
    marginRight: theme.spacing(2),
  },
  textField: {
    width: '100%',
  },
});

const AppointmentFormContainer = withStyles(containerStyles, { name: 'AppointmentFormContainer' })(AppointmentFormTask);

const styles = theme => ({
  addButton: {
    position: 'absolute',
    bottom: theme.spacing(1) * 3,
    right: theme.spacing(1) * 4,
  },
});

/* eslint-disable-next-line react/no-multi-comp */
class TimeTable extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentDate: this.getLocalDataString(),
      confirmationVisible: false,
      editingFormVisible: false,
      deletedAppointmentId: undefined,
      editingAppointment: undefined,
      previousAppointment: undefined,
      addedAppointment: {},
      startDayHour: 0,
      endDayHour: 24,
      isNewAppointment: false,
      scheduleDataController: new ScheduleDataControl(),
      isDataLoaded: false,
      isSignInAlertDialogOn: false,
    };
    this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };
    this.toggleConfirmationVisible = this.toggleConfirmationVisible.bind(this);
    this.commitDeletedAppointment = this.commitDeletedAppointment.bind(this);
    this.toggleEditingFormVisibility = this.toggleEditingFormVisibility.bind(this);

    this.commitChanges = this.commitChanges.bind(this);
    this.onEditingAppointmentChange = this.onEditingAppointmentChange.bind(this);
    this.onAddedAppointmentChange = this.onAddedAppointmentChange.bind(this);
    this.appointmentForm = connectProps(AppointmentFormContainer, () => {
      const {
        editingFormVisible,
        editingAppointment,
        data,
        addedAppointment,
        isNewAppointment,
        previousAppointment,
      } = this.state;

      const currentAppointment = data
        .filter(appointment => editingAppointment && appointment.id === editingAppointment.id)[0]
        || addedAppointment;
      const cancelAppointment = () => {
        if (isNewAppointment) {
          this.setState({
            editingAppointment: previousAppointment,
            isNewAppointment: false,
          });
        }
      };

      return {
        visible: editingFormVisible,
        appointmentData: currentAppointment,
        commitChanges: this.commitChanges,
        visibleChange: this.toggleEditingFormVisibility,
        onEditingAppointmentChange: this.onEditingAppointmentChange,
        cancelAppointment,
      };
    });
  }


  async componentDidMount() {
    if (!this.checkLogin()) {
      return null;
    }
    if (!this.state.isDataLoaded) {
      await this.loadAppointmentData();
      this.setState({ isDataLoaded: true });
    }
  }

  componentDidUpdate() {
    this.appointmentForm.update();
  }

  checkLogin() {
    let userNickName = window.sessionStorage.getItem('user');
    if (userNickName === null) {
      this.setState({ isSignInAlertDialogOn: true });
      return false;
    }
    return true;
  }

  async loadAppointmentData() {
    let result = await this.state.scheduleDataController.loadData();
    if (result !== null) {
      this.setState({ data: result });
    }
  }

  //#region TimeTable functionalities
  onEditingAppointmentChange(editingAppointment) {
    console.log('editingAppointment: ', editingAppointment);
    
    this.setState({ editingAppointment });
  }

  onAddedAppointmentChange(addedAppointment) {
    console.log('addedAppointment: ', addedAppointment);
    this.setState({ addedAppointment });
    const { editingAppointment } = this.state;
    if (editingAppointment !== undefined) {
      this.setState({
        previousAppointment: editingAppointment,
      });
    }
    this.setState({ editingAppointment: undefined, isNewAppointment: true });
  }

  setDeletedAppointmentId(id) {
    this.setState({ deletedAppointmentId: id });
  }

  toggleEditingFormVisibility() {
    const { editingFormVisible } = this.state;
    this.setState({
      editingFormVisible: !editingFormVisible,
    });
  }

  toggleConfirmationVisible() {
    const { confirmationVisible } = this.state;
    this.setState({ confirmationVisible: !confirmationVisible });
  }

  async commitDeletedAppointment() {
    const { data, deletedAppointmentId } = this.state;

    console.log("delete procedure turn on ");
    let targetAppointment = data.find(appointment => appointment.id === deletedAppointmentId);
    if (!await this.state.scheduleDataController.deleteScheduleAsync(targetAppointment.scheduleNo)) {
      return false;
    }
    let userNickName = window.sessionStorage.getItem('user');

    this.setState({ data: JSON.parse(window.localStorage.getItem(userNickName + '_AppointmentData')), deletedAppointmentId: null });
    this.toggleConfirmationVisible();
    return true;
  }

  //method that reacting to change on timeblocks 
  async commitChanges({ added, changed, deleted }) {
    let { data } = this.state;
    if (added) {
      let result = await this.state.scheduleDataController.createNewScheduleAsync(added);
      if (result !== null) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, scheduleNo: result, ...added }];
        this.state.scheduleDataController.updateDataOnLocalStorage(data);
      }
    }
    if (changed) {
      console.log('changed: ', changed.toString());
      console.log('changed: ', changed);
      
      // data = data.map(appointment => (
      //   changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      
    }
    if (deleted) {
      console.log('deleted: ', deleted);
      this.setDeletedAppointmentId(deleted);
      this.toggleConfirmationVisible();
      console.log('deleted: FINISHED ');
    }
    this.setState({ data, addedAppointment: {} });
  }
  //#endregion

  handleAlertDialogClose() {
    this.props.history.push('/');
  }

  getLocalDataString() {
    let dateStrings = new Date().toLocaleDateString().split("/");
    return `${dateStrings[2]}-${dateStrings[0]}-${dateStrings[1]}`;
  }

  render() {
    const {
      currentDate,
      data,
      confirmationVisible,
      editingFormVisible,
      startDayHour,
      endDayHour,
    } = this.state;
    const { classes } = this.props;

    return (
      <Paper style={{ height: 'calc(100vh - 90px)'}}>

        <Dialog
          open={this.state.isSignInAlertDialogOn}
          onClose={() => this.handleAlertDialogClose()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Sign In Required "}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              (づ｡◕‿‿◕｡)づ :Please SignIn to use calendar functionality.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleAlertDialogClose()} color="primary" autoFocus>
              Okie Dokie
          </Button>
          </DialogActions>
        </Dialog>
        <Scheduler
          data={data}
          height={"auto"}
        >
          <ViewState
            currentDate={currentDate}
            onCurrentDateChange={this.currentDateChange}
          />
          <EditingState
            onCommitChanges={this.commitChanges}
            onEditingAppointmentChange={this.onEditingAppointmentChange}
            onAddedAppointmentChange={this.onAddedAppointmentChange}
          />
          <IntegratedEditing />
          <WeekView
            startDayHour={startDayHour}
            endDayHour={endDayHour}
          />
          <MonthView />
          <EditRecurrenceMenu />

          <AllDayPanel />
          <Appointments />
          <AppointmentTooltip
            showOpenButton
            showCloseButton
            showDeleteButton
          />
          <Toolbar />
          <DateNavigator />
          <ViewSwitcher />
          <AppointmentForm
            visible={editingFormVisible}
            onVisibilityChange={this.toggleEditingFormVisibility}
          />
          <ConfirmationDialog />
          <DragDropProvider />
          <CustomCurrentTimeIndicator />

        </Scheduler>

        <Dialog
          open={confirmationVisible}
          onClose={this.cancelDelete}
        >
          <DialogTitle>
            Delete Appointment
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this appointment?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.toggleConfirmationVisible} color="primary" variant="outlined">
              Cancel
            </Button>
            <Button onClick={this.commitDeletedAppointment} color="secondary" variant="outlined">
              Delete
            </Button>
          </DialogActions>

        </Dialog>

        <Fab
          color="secondary"
          className={classes.addButton}
          onClick={() => {
            this.setState({ editingFormVisible: true });
            this.onEditingAppointmentChange(undefined);
            this.onAddedAppointmentChange({
              startDate: new Date(currentDate).setHours(startDayHour),
              endDate: new Date(currentDate).setHours(startDayHour + 1),
            });
          }}
        >
          <AddIcon />
        </Fab>
      </Paper>
    );
  }
}

export default withStyles(styles, {})(TimeTable);