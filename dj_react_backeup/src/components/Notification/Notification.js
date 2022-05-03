import React from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

class Notification extends React.Component {
  constructor(props) {
    super(props);
    const { type, message } = props;
    this.state = { notify_type: type, message: message };
  }

  componentDidMount() {
    this.createNotification(this.state.notify_type, this.state.message);
  }

  createNotification = (type, message) => {
    //return () => {

    switch (type) {
      case "info":
        NotificationManager.info(message, "", 4000);
        break;
      case "success":
        NotificationManager.success(message, "", 4000);
        break;
      case "warning":
        //NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
        NotificationManager.warning(message, "", 4000);
        break;
      case "error":
        // NotificationManager.error(message, '', 5000, () => {
        //alert('callback');
        // });
        NotificationManager.error(message, "", 4000);
        break;
      default:
        return;
    }
    //};
  };

  render() {
    return (
      <div>
        <NotificationContainer />
      </div>
    );
  }
}

export default Notification;
