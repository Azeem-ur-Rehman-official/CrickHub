import moment from 'moment';
import React from 'react';
import './CommentCard.css';

function CommentCard({ children, comment }) {
  return (
    <div className="comment_card">
      <div className="comment_card_row">
        <h3>{comment.username}</h3>
      </div>
      <span>{moment(comment.createdAt).fromNow()}</span>

      <span>{new Date(comment.createdAt).toLocaleString()}</span>

      <p dangerouslySetInnerHTML={{ __html: comment.content }} />

      {children}
    </div>
  );
}

export default CommentCard;
