import { useState } from 'react';
import { useAlert } from 'react-alert';
import { postData } from '../../routes/FetchData';
const BookNow = () => {
  const alert = useAlert();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [segment, setSegment] = useState('None');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('none');
  const [noCrickHubitionar, setNoCrickHubitionar] = useState('');
  const [conditionarType, setConditionarType] = useState('');
  const [serviceNeeded, setServiceNeeded] = useState('');
  const [channels, setchannels] = useState('');
  const [comment, setComment] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('name', name);
    formData.set('email', email);
    formData.set('phoneNo', phoneNo);
    formData.set('segment', segment);
    formData.set('address', address);
    formData.set('date', date);
    formData.set('estimatedTime', estimatedTime);
    formData.set('noCrickHubitionar', noCrickHubitionar);
    formData.set('conditionarType', conditionarType);
    formData.set('serviceNeeded', serviceNeeded);
    formData.set('channels', channels);
    formData.set('comment', comment);
    // console.log(formData);
    postData('/api/v1/services/new', formData)
      .then((res) => {
        setName('');
        setEmail('');
        setPhoneNo('');
        setSegment('');
        setAddress('');
        setDate('');
        setEstimatedTime('');
        setNoCrickHubitionar('');
        setConditionarType('');
        setServiceNeeded('');
        setchannels('');
        setComment('');

        alert.show('Your request has submitted successfully');
      })
      .catch((err) => {
        console.log(err.response);
        alert.show('somthing went wrong');
      });
    // dispatch(updateProfile(formData));
  };
  return (
    <div className="container py-5">
      <div className="container form-top">
        <div className="row">
          <div className="col-md-12 col-md-offset-3 col-sm-12 col-xs-12">
            <div className="panel panel-danger">
              <div className="panel-body">
                <form
                  id="reused_form"
                  data-aos="fade-up"
                  data-aos-delay="50"
                  onSubmit={submitHandler}
                >
                  <div className="form-group">
                    <label>
                      <i className="fa fa-user" aria-hidden="true"></i> Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control"
                      placeholder="Enter Name"
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <i className="fa fa-envelope" aria-hidden="true"></i>{' '}
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      placeholder="Enter Email"
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <i className="fa fa-phone" aria-hidden="true"></i> Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      className="form-control"
                      value={phoneNo}
                      onChange={(e) => setPhoneNo(e.target.value)}
                      placeholder="Enter Phone Number"
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <i aria-hidden="true"></i> Segment
                    </label>
                    <select
                      id="segment"
                      name="segment"
                      value={segment}
                      onChange={(e) => setSegment(e.target.value)}
                      className="form-control"
                    >
                      <option value="None">None</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>
                      <i className="fa fa-home" aria-hidden="true"></i> Address
                    </label>
                    <textarea
                      rows="3"
                      name="address"
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="form-control"
                      placeholder="Type Your Address"
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label>
                      <i className="fa fa-clock" aria-hidden="true"></i> Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      id="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="form-control"
                      placeholder="Date"
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <i aria-hidden="true"></i> Estimated Time
                    </label>
                    <select
                      id="Estimated Time"
                      name="Estimated Time"
                      value={estimatedTime}
                      onChange={(e) => setEstimatedTime(e.target.value)}
                      className="form-control"
                      placeholder="Timet"
                    >
                      <option value="none">00:00</option>
                      <option value="9:00">9:00</option>
                      <option value="10:00">10:00</option>
                      <option value="11:00">11:00</option>
                      <option value="12:00">12:00</option>
                      <option value="13:00">13:00</option>
                      <option value="14:00">14:00</option>
                      <option value="15:00">15:00</option>
                      <option value="16:00">16:00</option>
                      <option value="17:00">17:00</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>
                      <i aria-hidden="true"></i>No. of Air Conditioners
                    </label>
                    <select
                      id="No. of Air Conditioners"
                      name="No. of Air Conditioners"
                      className="form-control"
                      value={noCrickHubitionar}
                      onChange={(e) => setNoCrickHubitionar(e.target.value)}
                      placeholder="Timet"
                    >
                      <option value="none">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>

                      <option value="5">More Than 5</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>
                      <i aria-hidden="true"></i>Air Conditioner Type
                    </label>
                    <select
                      id="Air Conditioner Type"
                      name="Air Conditioner Type"
                      className="form-control"
                      value={conditionarType}
                      onChange={(e) => setConditionarType(e.target.value)}
                    >
                      <option value="none"></option>
                      <option value="Wall Mounted">Wall Mounted</option>
                      <option value="Cassette">Cassette</option>
                      <option value="VRV/VRF">VRV/VRF</option>
                      <option value="Water Chiller">Water Chiller</option>
                      <option value="Concealed/ Exposed Duct">
                        Concealed/ Exposed Duct
                      </option>
                      <option value="Mixed Units">Mixed Units</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>
                      <i aria-hidden="true"></i>Service Needed
                    </label>
                    <select
                      id="Service Needed"
                      name="Service Needed"
                      className="form-control"
                      value={serviceNeeded}
                      onChange={(e) => setServiceNeeded(e.target.value)}
                      placeholder="Timet"
                    >
                      <option value="none"></option>
                      <option value="Chemical Service">Chemical Service</option>
                      <option value="Basic Service">Basic Service</option>
                      <option value="Water Leak Service">
                        Water Leak Service
                      </option>
                      <option value="Professional Diagnostic Services">
                        Professional Diagnostic Services
                      </option>
                      <option value="Installation Services">
                        Installation Services
                      </option>
                      <option value="Supply New Aircon">
                        Supply New Aircon
                      </option>
                      <option value="Mix Services">Mix Services</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>
                      <i aria-hidden="true"></i>How did you find us?
                    </label>
                    <select
                      id="How did you find us?"
                      name="How did you find us?"
                      className="form-control"
                      value={channels}
                      onChange={(e) => setchannels(e.target.value)}
                      placeholder="Timet"
                    >
                      <option value="none"></option>
                      <option value="Google">Google</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Friends Recomended">
                        Friend's Recomended
                      </option>
                      <option value="Newspaper">Newspaper</option>
                      <option value="Broshure">Broshure</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>
                      <i className="fa fa-comment" aria-hidden="true"></i>{' '}
                      Comments
                    </label>
                    <textarea
                      rows="3"
                      name="Comments"
                      id="Comments"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="form-control"
                      placeholder="Type Your Comment"
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <button
                      className="btn btn-raised btn-block btn-success"
                      type="submit"
                      id="post"
                    >
                      SUBMIT
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookNow;
