import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { getData } from '../../routes/FetchData';
import '../css/livediscusion.css';
import Loading from '../images/loading.gif';
import CommentItem from './commentItem/CommentItem';
import FormInput from './formInput/FormInput';
function Livediscusion() {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socket = io();
    setSocket(socket);
    return () => socket.close();
  }, []);

  const [detailProduct, setDetailProduct] = useState([]);

  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const pageEnd = useRef();

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
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(pageEnd.current);
  }, []);

  // Reply Comments
  useEffect(() => {
    if (socket) {
      socket.on('sendReplyCommentToClient', (msg) => {
        const newArr = [...comments];

        newArr.forEach((cm) => {
          if (cm._id === msg._id) {
            cm.reply = msg.reply;
          }
        });

        setComments(newArr);
      });

      return () => socket.off('sendReplyCommentToClient');
    }
  }, [socket, comments]);

  return (
    <div className="container my-3 bg-white py-3 mainLive">
      <div className="detail_product_page">
        <div className="comments">
          <h3 className="app_title">Live Discusion and Reviews</h3>

          <FormInput socket={socket} />

          <div className="comments_list">
            <h3 className="app_title">All Discusion...</h3>
            {comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                socket={socket}
              />
            ))}
          </div>
        </div>

        {loading && (
          <div className="loading">
            <img src={Loading} alt="" />
          </div>
        )}
        <button ref={pageEnd} style={{ opacity: 0 }}>
          Load more
        </button>
      </div>
    </div>
  );
}

export default Livediscusion;
