import './App.css';
import { useState, useEffect } from 'react';
import { motion, useViewportScroll } from 'framer-motion';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const Learning = () => {
  const [isZoomedIn, setIsZoomedIn] = useState(false);
  return (
    <TransformWrapper>
      {(args) => {
        if (args.state.scale > 1) {
          setIsZoomedIn(true);
        } else {
          setIsZoomedIn(false);
        }

        return (
          <>
            <div>
              <button onClick={() => args.resetTransform()}>Reset</button>
            </div>
            <TransformComponent>
              {isZoomedIn ? (
                <div
                  style={{
                    background: '#004',
                    color: 'white',
                    padding: '50px',
                    minHeight: '300px',
                    width: '100%',
                  }}>
                  <div
                    id='element1'
                    style={{
                      background: 'red',
                      width: '200px',
                      height: '400px',
                    }}>
                    Zoom element 1
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    background: '#444',
                    color: 'white',
                    padding: '50px',
                    minHeight: '300px',
                    width: '100%',
                  }}>
                  <div
                    id='element2'
                    style={{
                      background: 'blue',
                      width: '200px',
                      height: '200px',
                    }}>
                    Zoom element 2
                  </div>
                </div>
              )}
            </TransformComponent>
          </>
        );
      }}
    </TransformWrapper>
  );
};

function App() {
  const scroll = useViewportScroll();
  return (
    <div className='App'>
      <Learning></Learning>
    </div>
  );
}

export default App;
