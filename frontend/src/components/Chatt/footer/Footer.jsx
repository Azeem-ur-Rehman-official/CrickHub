import SendIcon from '@material-ui/icons/Send';
import React, { useState } from 'react';
import '../../css/chatt/footer.css';

const Footer = (props) => {
  const [cancel, setCancel] = useState(false);
  const [text, setText] = useState('');

  const onEmojiClick = (event, emojiObject) => {
    if (emojiObject.emoji !== undefined) setText(text + emojiObject.emoji);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    // alert(props.replyId);
    const avatar = props.user.avatar.url;
    const username = props.user.name;
    const createdAt = new Date().toISOString();
    const content = text;
    const replyId = props.replyId;
    const replyName = props.replyName;
    const replyContent = props.replyComment;
    const userId = props.user._id;
    const socket = props.socket;
    let send = null;

    if (props.replyName !== '') {
      send = 'replyComment';
    }
    socket.emit('createComment', {
      username,
      avatar,
      content,
      replyId,
      replyName,
      replyContent,
      userId,
      send,
      createdAt,
    });
    setText('');
  };
  return (
    <div className="chat-footer">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Type a message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></input>

        <button type="submit" className="text-danger"></button>
      </form>
      <SendIcon onClick={submitHandler} />
    </div>
  );
};

export default Footer;
