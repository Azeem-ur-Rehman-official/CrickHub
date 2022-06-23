import React, { useEffect, useState } from 'react';
import { getData } from '../../routes/FetchData';
import '../css/faq.css';
import Loader from '../layout/Loader';
import FaqCard from './cards/FaqCard';

const FaqPage = () => {
  const [faqData, setfaqData] = useState();
  useEffect(() => {
    // setLoading(true);
    getData(`/api/v1/faq`)
      .then((res) => {
        // console.log(res.data.faqs);
        setfaqData((r) => (r = res.data.faqs));
        // setLoading(false);
      })
      .catch((err) => console.log(err.response.data.msg));
  }, []);
  return (
    <div>
      {/*  ======= F.A.Q Section ======= */}
      <section id="faq" className="faq">
        <div className="container" data-aos="fade-up">
          <header className="section-header">
            <h3 className="mx-3">
              <br />
              Frequently Asked Questions
            </h3>
          </header>

          <ul
            id="faq-list"
            className="text-left"
            data-aos="fade-up"
            data-aos-delay="50"
          >
            {faqData ? (
              <>
                {faqData.map((data, i) => {
                  return (
                    <FaqCard
                      _id={data._id}
                      question={data.question}
                      answer={data.answer}
                    />
                  );
                })}
              </>
            ) : (
              <>
                <Loader />
              </>
            )}
          </ul>
        </div>
      </section>
      {/*  End F.A.Q Section */}
    </div>
  );
};

export default FaqPage;
