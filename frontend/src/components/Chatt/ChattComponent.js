import Avatar from '@material-ui/core/Avatar';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import ScrollIntoView from 'react-scroll-into-view';
import io from 'socket.io-client';
import img from '../../assets/img/qrcode.png';
import { getData } from '../../routes/FetchData';
import '../css/chatt/chatt.css';
import Footer from './footer/Footer';

const ChattComponent = (props) => {
  const { user } = useSelector((state) => state.auth);
  const [socket, setSocket] = useState(null);
  const [qrCode, setQrCode] = useState(false);
  useEffect(() => {
    const socket = io();
    setSocket(socket);
    return () => socket.close();
  }, []);

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [replyId, setreplyId] = useState('');
  const [replyName, setreplyName] = useState('');
  const [replyComment, setreplyComment] = useState('');
  const [page, setPage] = useState(1);
  const pageEnd = useRef();
  const currentDate = new Date();

  useEffect(() => {
    setLoading(true);
    getData(`/api/v1/comments/?limit=${page * 5}`)
      .then((res) => {
        // console.log(`data is ${res}`);
        // console.log(res.data.comments);
        setComments((r) => (r = res.data.comments));
        setLoading(false);
      })
      .catch((err) => console.log(err.response.data.msg));
  }, [page]);
  const replyController = (val1, val2, val3) => {
    if (replyComment === val2) {
      setreplyName('');
      setreplyComment('');
      setreplyId('');
    } else {
      setreplyName(val1);
      setreplyComment(val2);
      setreplyId(val3);
    }
  };
  // Realtime
  // Join room
  // useEffect(() => {
  //   if (socket) {
  //     socket.emit('joinRoom', id);
  //   }
  // }, [socket, id]);

  useEffect(() => {
    if (socket) {
      socket.on('sendCommentToClient', (msg) => {
        setComments([msg, ...comments]);
      });

      return () => socket.off('sendCommentToClient');
    }
  }, [socket, comments]);

  // infiniti scroll

  // Reply Comments
  useEffect(() => {
    if (socket) {
      socket.on('sendReplyCommentToClient', (msg) => {
        setComments([msg, ...comments]);
      });
      setreplyId('');
      setreplyName('');
      setreplyComment('');
      return () => socket.off('sendReplyCommentToClient');
    }
  }, [socket, comments]);
  // const AlwaysScrollToBottom = () => {
  //   const elementRef = useRef();
  //   useEffect(() => {
  //     elementRef.current.scrollIntoView();
  //     window.scrollTo({
  //       top: 90,
  //       left: 0,
  //       behavior: 'smooth',
  //     });
  //   });

  //   return <div ref={elementRef} />;
  // };
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };
  return (
    <div className="chat">
      <div>
        <span className="mb-2">
          <a
            className="btn btn-success"
            href="https://chat.whatsapp.com/KBx7pEmlcXl0X1KrV9kzph"
          >
            Wattsapp Group <i className="fa fa-whatsapp ml-1"></i>
          </a>
          <button
            className="btn btn-success ml-2"
            onClick={() => setQrCode(!qrCode)}
          >
            QR code <i className="fa fa-whatsapp ml-1"></i>
          </button>
        </span>

        {qrCode ? (
          <img
            className="rounded mx-auto d-block "
            data-aos="fade-up"
            data-aos-delay="50"
            src={img}
            alt="Wattsapp-Group"
          />
        ) : null}
      </div>
      {user ? (
        <div data-aos="fade-up" data-aos-delay="50" className="my-2">
          <div id="chattok" className="chatt-header">
            <Avatar
              src={user.avatar && user.avatar.url}
              alt={user && user.name}
            />
            <div className="chatt-header-Info ">
              <h3 className="text-white">{user && user.name}</h3>
              <p className="text-white">(Live discussion)</p>
            </div>

            {/* <div className="chatt-header-right">
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </div> */}
          </div>
          {comments ? (
            <>
              <div className="chat-body">
                {comments
                  .map((comment) => (
                    <>
                      {comment.userId === user._id ? (
                        <p
                          className="chat-message chat-reciver"
                          id={'comment' + comment._id}
                        >
                          {comment.replyName ? (
                            // eslint-disable-next-line jsx-a11y/anchor-is-valid
                            <ScrollIntoView
                              selector={'#comment' + comment.replyId}
                              scrollOptions={{ block: 'center' }}
                              className="cursor-pointer"
                            >
                              <div className="d-flex mainReply">
                                <p className="mr-2 ">{comment.replyName}</p>
                                <p>{comment.replyContent}</p>
                              </div>
                            </ScrollIntoView>
                          ) : null}

                          <div className="reply-btn">
                            <span
                              className="dropDown ml-auto"
                              onClick={() =>
                                replyController(
                                  comment.username,
                                  comment.content,
                                  comment._id
                                )
                              }
                            >
                              Reply{' '}
                              <i
                                className="fa fa-angle-down"
                                aria-hidden="true"
                              ></i>
                            </span>
                          </div>

                          <div className="navbar p-0">
                            <div className="mr-auto">{comment.content}</div>
                            <div className="px-2"></div>
                            <div className="chat-time ml-auto mt-auto">
                              {moment(comment.createdAt).fromNow() + ' '}
                              {currentDate.getDate() ===
                                new Date(comment.createdAt).getDate() &&
                              currentDate.getMonth() ===
                                new Date(comment.createdAt).getMonth() &&
                              currentDate.getFullYear() ===
                                new Date(comment.createdAt).getFullYear()
                                ? new Date(
                                    comment.createdAt
                                  ).toLocaleTimeString('en-US')
                                : new Date(comment.createdAt).toLocaleString()}
                            </div>
                          </div>
                        </p>
                      ) : (
                        <div className="d-flex my-2">
                          <span className="my-auto">
                            <img
                              className="mr-1"
                              style={{
                                maxHeight: '30px',
                                borderRadius: '50%',
                                border: '1px solid #F8921C',
                              }}
                              src={comment.avatar}
                              alt={comment.name}
                            />
                          </span>
                          <p
                            className="chat-message"
                            id={'comment' + comment._id}
                          >
                            <div className="text-danger mr-2">
                              {comment.username}
                            </div>

                            {comment.replyName ? (
                              // eslint-disable-next-line jsx-a11y/anchor-is-valid
                              <ScrollIntoView
                                selector={'#comment' + comment.replyId}
                                scrollOptions={{ block: 'center' }}
                                className="cursor-pointer"
                              >
                                <div className="d-flex mainReply">
                                  <p className="mr-2 ">{comment.replyName}</p>
                                  <p>{comment.replyContent}</p>
                                </div>
                              </ScrollIntoView>
                            ) : null}

                            <div className="reply-btn">
                              <span
                                className="dropDown ml-auto"
                                onClick={() =>
                                  replyController(
                                    comment.username,
                                    comment.content,
                                    comment._id
                                  )
                                }
                              >
                                Reply{' '}
                                <i
                                  className="fa fa-angle-down"
                                  aria-hidden="true"
                                ></i>
                              </span>
                            </div>

                            <div className="navbar p-0">
                              <div className="mr-auto">{comment.content}</div>
                              <div className="px-2"></div>
                              <div className="chat-time ml-auto mt-auto">
                                {moment(comment.createdAt).fromNow() + ' '}
                                {currentDate.getDate() ===
                                  new Date(comment.createdAt).getDate() &&
                                currentDate.getMonth() ===
                                  new Date(comment.createdAt).getMonth() &&
                                currentDate.getFullYear() ===
                                  new Date(comment.createdAt).getFullYear()
                                  ? new Date(
                                      comment.createdAt
                                    ).toLocaleTimeString('en-US')
                                  : new Date(
                                      comment.createdAt
                                    ).toLocaleString()}
                              </div>
                            </div>
                          </p>
                        </div>
                      )}
                      <AlwaysScrollToBottom />
                    </>
                  ))
                  .reverse()}
              </div>
            </>
          ) : null}
          {replyName !== '' ? (
            <div className="d-flex myReply px-4">
              <p className="mr-2 text-success">{replyName}</p>
              <p>{replyComment}</p>
            </div>
          ) : null}

          <Footer
            user={user}
            socket={socket}
            replyId={replyId}
            replyName={replyName}
            replyComment={replyComment}
          />
        </div>
      ) : (
        <div className="container my-5 text-center">
          <div className="messageLogin" data-aos="fade-up" data-aos-delay="50">
            <h3>Please Login First</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChattComponent;
