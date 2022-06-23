import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import './FormInput.css';

function FormInput({ id, socket, setReply, send, name }) {
  const nameRef = useRef();
  const contentRef = useRef();
  const { user } = useSelector((state) => state.auth);
  const commentSubmit = () => {
    const username = nameRef.current.value;
    const content = contentRef.current.innerHTML;
    if (!user) return alert('Please sign in before live discusion');
    if (!username.trim()) return alert('Not Empty!');
    if (contentRef.current.textContent.trim().length < 20)
      return alert('Contents too short, must be at least 20 characters');

    const createdAt = new Date().toISOString();

    socket.emit('createComment', {
      username,
      content,

      createdAt,

      send,
      id,
    });

    contentRef.current.innerHTML = '';

    if (setReply) setReply(false);
  };

  return (
    <div className="form_input">
      <p>Name</p>
      <input type="text" ref={nameRef} />

      <p>Content</p>
      <div
        ref={contentRef}
        contentEditable="true"
        style={{
          height: '100px',
          border: '1px solid #ccc',
          padding: '5px 10px',
          outline: 'none',
        }}
      />

      <button onClick={commentSubmit}>Send</button>
    </div>
  );
}

export default FormInput;
