import { useState } from 'react';

const FaqCard = (props) => {
  const [expand, setExpand] = useState(true);

  const changeIcon = () => {
    if (expand) return setExpand(false);
    return setExpand(true);
  };

  let arr = props.answer.split(/#+/);

  return (
    <li>
      <a
        data-toggle="collapse"
        className="collapsed"
        href={'#faq' + props._id}
        onClick={changeIcon}
      >
        {props.question}{' '}
        <i className={expand ? 'fa fa-plus' : 'fa fa-minus'}></i>
      </a>
      <div id={'faq' + props._id} className="collapse" data-parent="#faq-list">
        <ul className="list-group" data-aos="fade-up" data-aos-delay="50">
          {arr.map((element) => {
            return (
              <li
                className="list-group-item"
                data-aos="fade-up"
                data-aos-delay="50"
              >
                {element}
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
};

export default FaqCard;
