import '../css/notifiication.css';
const NotificationBox = (props) => {
  return (
    <div className="uperBox">
      <div className="middleBox">
        <span className="not-btn " onClick={() => props.box()}>
          <i className="fa fa-times-circle " aria-hidden="true"></i>
        </span>
        <h3 className="NotificationHeading mb-3">Notification</h3>
        <h4>{props.heading}</h4>
        <p>{props.content}</p>
      </div>
    </div>
  );
};

export default NotificationBox;
