'use client';

import { useState, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';
import { FaCheckCircle } from 'react-icons/fa';

const HeaderAnimation = () => {
  const benefits = ['Organized', 'Efficient', 'Productive', 'Focused', 'Reliable'];
  const [displayedBenefits, setDisplayedBenefits] = useState<string[]>([]);
  const [showSignUpMessage, setShowSignUpMessage] = useState(false);
  const [cycleComplete, setCycleComplete] = useState(false);

  const transitions = useTransition(displayedBenefits, {
    from: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
    enter: { opacity: 1, transform: 'translate3d(0,0px,0)' },
    leave: { opacity: 0, transform: 'translate3d(0,40px,0)' },
    config: { duration: 500 },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedBenefits((prev) => {
        if (prev.length < benefits.length) {
          return [...prev, benefits[prev.length]];
        } else {
          setCycleComplete(true);
          setTimeout(() => {
            setShowSignUpMessage(true);
            setTimeout(() => {
              setShowSignUpMessage(false);
              setDisplayedBenefits([]);
              setCycleComplete(false);
            }, 3000);
          }, 500);
          clearInterval(interval);
          return prev;
        }
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [benefits]);

  return (
    <div className="w-full flex justify-center items-center flex-col mt-12">
      <h1 className="pt-16 text-center pb-6 text-gray-500 font-[800] text-2xl">
        What We Offer
      </h1>
      <div className="list-container" style={{ height: '200px', overflow: 'hidden' }}>
        <ul className="list-none">
          {transitions((style, item) => (
            <animated.li style={style} className="text-xl text-gray-700 flex items-center">
              <FaCheckCircle className="text-green-500 mr-2" />
              {item}
            </animated.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HeaderAnimation;
