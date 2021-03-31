import React, { useState, useEffect, useRef } from 'react';

const sticky__wrapper  = {
  
}

const sticky__inner = {
  position: "-webkit-sticky",
  position: "sticky",
  zIndex: 1
}

const  StickyHeader = ({children, top}) => {
  const [isSticky, setSticky] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (ref && ref.current && ref.current.getBoundingClientRect()) {
        setSticky(ref.current.getBoundingClientRect().top <= top);
    }
  };

  return (
      <div style={{position: "relative"}} className={`sticky__wrapper ${isSticky && 'sticky'}`} ref={ref}>
        <div style={isSticky ? {...sticky__inner, top} : {}} className="sticky--inner">
            {children}
        </div>
      </div>
  );
};

export default StickyHeader