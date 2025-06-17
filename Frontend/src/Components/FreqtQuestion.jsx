import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const FreqtQuestion = ({ ques, ans }) => {
  const [showAns, setshowAns] = useState(false);
  const [isClosingAnsDiv, setIsClosingAnsDiv] = useState(false);
  function showAnsClick() {
    if (showAns) {
      setIsClosingAnsDiv(true);
      setTimeout(() => {
        setIsClosingAnsDiv(false);
        setshowAns(false);
      }, 900);
    } else {
      setshowAns(true);
    }
  }

  return (
    <div className="container mx-auto px-4 py-2 w-[95%] flex shadow-md">
      <div className="w-[98%]">
        <div className="bg-white rounded-lg px-5 py-2 sm:py-3 md:py-3 lg:py-4 xl:py-5 2xl:py-7">
          <div className="flex">
            <h2 className="2xl:text-xl xl:text-lg lg:text-lg md:text-[17px] text-sm font-medium mb-0 w-[100%]">
              {ques}
            </h2>
            <div className="w-[10%]flex items-end">
              {showAns ? (
                <FontAwesomeIcon
                  icon={faCaretUp}
                  className="hover:cursor-pointer hover:size-5"
                  onClick={showAnsClick}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faCaretDown}
                  className="hover:cursor-pointer hover:size-5"
                  onClick={showAnsClick}
                />
              )}
            </div>
          </div>
          {(showAns || isClosingAnsDiv) && (
            <div
              className={`text-gray-600 pt-10 ${
                isClosingAnsDiv ? "animate-slideUp" : "animate-slideBelow"
              } text-lg`}
            >
              {ans}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const FrequentlyAskedQuestion = ({ Questions }) => {
  return (
    <>
      <div
        className="container mx-auto mt-5 px-4 py-20 w-full sm:w-[70%] "
        id="freq"
      >
        <h1 className="2xl:text-5xl xl:text-5xl lg:text-4xl md:text-4xl sm:text-3xl text-2xl font-bold mb-20 text-center">
          Frequently Asked Questions
        </h1>
        {Questions.map((ques_no, index) => (
          <FreqtQuestion key={index} ques={ques_no.ques} ans={ques_no.ans} />
        ))}
      </div>
    </>
  );
};

export default function App() {
  return <FrequentlyAskedQuestion Questions={freqQues} />;
}

const freqQues = [
  {
    ques: "What is Eventek, and how can it help me with my event?",
    ans: "Eventek is an all-in-one event management platform that helps you plan, execute, and evaluate your events with ease. From registration to revenue tracking, we've got the tools you need to drive results.",
  },
  {
    ques: "Is Eventek suitable for events of all sizes?",
    ans: " Yes, Eventek is designed to accommodate events of all sizes, from small meetings to large conferences and Events.",
  },
  {
    ques: "How do I create a schedule for my event on Eventek?",
    ans: "You can easily create and manage your event schedule, including sessions, speakers, and venues, using our intuitive scheduling tool.",
  },
  {
    ques: "Is Eventek a secure platform for my event data?",
    ans: "Yes, our platform is built with enterprise-grade security measures to protect your event data and ensure compliance with industry standards.",
  },
  {
    ques: "What kind of support does Eventek offer?",
    ans: "Our dedicated support team is available 24/7 to assist with any questions or issues you may have. We also offer comprehensive online resources, including tutorials and guides.",
  },
];
