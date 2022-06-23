import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useSelector } from 'react-redux';
import { getData, patchData, postData } from '../../../routes/FetchData';
import MetaData from '../../layout/MetaData';
import Sidebar from '../Sidebar';
const UserProfile = () => {
  const alert = useAlert();
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [DOB, setDOB] = useState('');
  const [fatherName, setfatherName] = useState('');
  const [gender, setgender] = useState('');
  const [playerRole, setplayerRole] = useState('NA');

  const [battingStyle, setBattingStyle] = useState('NA');
  const [bowlingStyle, setbowlingStyle] = useState('NA');
  const [bowlingDirection, setbowlingDirection] = useState('NA');
  const [update, setUpdate] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const formData = new FormData();
  useEffect(() => {
    setName(user.name);
    getProfileData();
  }, [user]);
  const getProfileData = () => {
    getData('/api/v1/tournament/single/player/profile')
      .then((res) => {
        setUpdate(!update);
        setId(res.data.player._id);
        setName(res.data.player.name);
        setfatherName(res.data.player.fatherName);
        setgender(res.data.player.gender);
        setBattingStyle(res.data.player.battingStyle);
        setbowlingStyle(res.data.player.bowlingStyle);
        setbowlingDirection(res.data.player.bowlingDirection);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const createProfile = () => {
    postData('/api/v1/tournament/player/profile', formData)
      .then((res) => {
        setUpdate(!update);

        alert.show('Profile Created successfully');
      })
      .catch((err) => {
        console.log(err.response);
        alert.show('somthing went wrong');
      });
  };
  const updateProfile = () => {
    patchData(`/api/v1/tournament/player/profile/${id}`, formData)
      .then((res) => {
        alert.show('Profile Updated successfully');
      })
      .catch((err) => {
        console.log(err.response.data.message);
        alert.show(err.response.data.message);
      });
  };
  //window.alert(gender);
  const submitHandler = (e) => {
    e.preventDefault();

    formData.set('name', name);
    formData.set('fatherName', fatherName);
    formData.set('gender', gender);
    formData.set('imageLink', user.avatar.url);
    formData.set('playerRole', playerRole);
    formData.set('DOB', DOB);
    formData.set('battingStyle', battingStyle);
    formData.set('bowlingStyle', bowlingStyle);
    formData.set('bowlingDirection', bowlingDirection);

    if (update) updateProfile();
    else createProfile();
    // console.log(formData);

    // dispatch(updateProfile(formData));
  };
  return (
    <div>
      <MetaData title={'FAQs'} />
      <div className="row m-0">
        <div className="col-12 col-md-2 m-0 p-0">
          <Sidebar />
        </div>
        <div className="container py-5 col-12 col-md-10">
          <div className="container form-top">
            <div className="row">
              <div className="col-md-12 col-md-offset-3 col-sm-12 col-xs-12">
                <h3 className="mb-4 text-center">Player Profile</h3>
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
                          <i className="fa fa-user" aria-hidden="true"></i>{' '}
                          fatherName
                        </label>
                        <input
                          type="text"
                          name="fatherName"
                          id="fatherName"
                          value={fatherName}
                          onChange={(e) => setfatherName(e.target.value)}
                          className="form-control"
                          placeholder="Enter fatherName"
                        />
                      </div>
                      <div className="form-group">
                        <label>
                          <i className="fa fa-gender" aria-hidden="true"></i>{' '}
                          Gender
                        </label>
                        <div class="form-check">
                          <label class="form-check-label">
                            <input
                              type="radio"
                              class="form-check-input"
                              name="optradio"
                              z
                              value="male"
                              defaultChecked
                              onChange={(e) => setgender(e.target.value)}
                            />
                            Male
                          </label>
                        </div>
                        <div class="form-check">
                          <label class="form-check-label">
                            <input
                              type="radio"
                              class="form-check-input"
                              name="optradio"
                              value="female"
                              onChange={(e) => setgender(e.target.value)}
                            />
                            Female
                          </label>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>
                          <i className="fa fa-clock" aria-hidden="true"></i> DOB
                        </label>
                        <input
                          type="date"
                          name="SOB"
                          id="DOB"
                          value={DOB}
                          onChange={(e) => setDOB(e.target.value)}
                          className="form-control"
                          placeholder="Select Date"
                        />
                      </div>
                      <div className="form-group">
                        <label>
                          <i aria-hidden="true"></i> Player Role
                        </label>
                        <select
                          id="playerRole"
                          name="playerRole"
                          value={playerRole}
                          onChange={(e) => setplayerRole(e.target.value)}
                          className="form-control"
                        >
                          <option value="NA">NA</option>
                          <option value="Wicket Keeper">Wicket Keeper</option>
                          <option value="Bowler">Bowler</option>
                          <option value="Batsman">Batsman</option>
                          <option value="All Rounder">All Rounder</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>
                          <i aria-hidden="true"></i> Batting Style
                        </label>
                        <select
                          id="Batting Style"
                          name="Batting Style"
                          value={battingStyle}
                          onChange={(e) => setBattingStyle(e.target.value)}
                          className="form-control"
                          placeholder="Timet"
                        >
                          <option value="NA" defaultValue={'NA'}>
                            NA
                          </option>
                          <option value="Left Arm">Left Arm</option>
                          <option value="Right Arm">Right Arm</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>
                          <i aria-hidden="true"></i>Bowling Style
                        </label>
                        <select
                          id="Bowling Style"
                          name="Bowling Style"
                          className="form-control"
                          value={bowlingStyle}
                          onChange={(e) => setbowlingStyle(e.target.value)}
                          placeholder="Timet"
                        >
                          <option value="NA">NA</option>
                          <option value="Fast">Fast</option>
                          <option value="Medium">Medium</option>
                          <option value="Spin">Spin</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>
                          <i aria-hidden="true"></i>Bowling Direction
                        </label>
                        <select
                          id="bowlingDirection"
                          name="bowlingDirection"
                          className="form-control"
                          value={bowlingDirection}
                          onChange={(e) => setbowlingDirection(e.target.value)}
                        >
                          <option value="NA">NA</option>
                          <option value="leg spin">Leg Spin</option>
                          <option value="off spin">Off Spin</option>
                          <option value="gogly">Gogly</option>
                        </select>
                      </div>

                      <div className="form-group">
                        {update ? (
                          <button
                            className="btn btn-raised btn-block btn-success"
                            type="submit"
                            id="post"
                          >
                            Update
                          </button>
                        ) : (
                          <button
                            className="btn btn-raised btn-block btn-success"
                            type="submit"
                            id="post"
                          >
                            Create
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
