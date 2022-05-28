import './App.css';
import { useState, useRef } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import Xarrow from 'react-xarrows';
import { motion } from 'framer-motion';
import { ArcherContainer, ArcherElement } from 'react-archer';
import ArrowArcher from './components/ArrowArcher';

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
              <div className='transformComponent'>
                {isZoomedIn ? (
                  <>
                    <motion.div id='element1' className='elem1'>
                      Zoom element 1
                    </motion.div>

                    <motion.div id='element2' className='elem2'>
                      Zoom element 2
                    </motion.div>
                    <Xarrow start='element1' end='element2'>
                      Test
                    </Xarrow>
                  </>
                ) : (
                  <motion.div id='element3' className='elem3'>
                    Zoom element 3
                  </motion.div>
                )}
              </div>
            </TransformComponent>
          </>
        );
      }}
    </TransformWrapper>
  );
};

const Learning2 = () => {
  const [isZoomedIn, setIsZoomedIn] = useState(false);

  const rootStyle = {
    display: 'flex',
    justifyContent: 'center',
    width: '1200px',
  };
  const rowStyle = {
    margin: '200px 0',
    display: 'flex',
    justifyContent: 'space-between',
  };
  const boxStyle = {
    padding: '10px',
    border: '1px solid black',
  };

  const archerContainer = useRef(null);

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
              <button onClick={() => archerContainer.current.refreshScreen()}>
                Refresh
              </button>
            </div>
            <ArcherContainer noCurves strokeColor='red' ref={archerContainer}>
              <TransformComponent>
                <div style={rootStyle}>
                  <ArcherElement
                    id='root'
                    relations={[
                      {
                        targetId: 'element2',
                        targetAnchor: 'top',
                        sourceAnchor: 'bottom',
                        style: {
                          strokeDasharray: '5,5',
                        },
                      },
                    ]}>
                    <div style={boxStyle}>Root</div>
                  </ArcherElement>
                </div>

                <div style={rowStyle}>
                  <ArcherElement
                    id='element2'
                    relations={[
                      {
                        targetId: 'element3',
                        targetAnchor: 'left',
                        sourceAnchor: 'right',
                        style: {
                          strokeColor: 'blue',
                          strokeWidth: 1,
                        },
                        label: (
                          <div
                            style={{
                              marginTop: '-20px',
                            }}>
                            Arrow 2
                          </div>
                        ),
                      },
                    ]}>
                    <div style={boxStyle}>Element 2</div>
                  </ArcherElement>

                  <ArcherElement id='element3'>
                    <div style={boxStyle}>Element 3</div>
                  </ArcherElement>

                  <ArcherElement
                    id='element4'
                    relations={[
                      {
                        targetId: 'root',
                        targetAnchor: 'right',
                        sourceAnchor: 'left',
                        label: 'Arrow 3',
                      },
                    ]}>
                    <div style={boxStyle}>Element 4</div>
                  </ArcherElement>
                </div>
              </TransformComponent>
            </ArcherContainer>
          </>
        );
      }}
    </TransformWrapper>
  );
};

function App() {
  return (
    <div className='App'>
      <Learning2></Learning2>
      <ArrowArcher></ArrowArcher>
    </div>
  );
}

export default App;
