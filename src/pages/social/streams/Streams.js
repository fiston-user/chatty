import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import Suggestions from '@components/suggestions/Suggestions';
import { getUserSuggestions } from '@redux/api/suggestion';
import useEffectOnce from '@hooks/useEffectOnce';

import '@pages/social/streams/Streams.scss';

const Streams = () => {
  const bodyRef = useRef(null);
  const bottomLineRef = useRef();
  const dispatch = useDispatch();

  useEffectOnce(() => {
    dispatch(getUserSuggestions());
  }, []);

  return (
    <div className="streams" data-testid="streams">
      <div className="streams-content">
        <div className="streams-post" ref={bodyRef} style={{ backgroundColor: 'white' }}>
          <div>Post form</div>
          <div>Post Items</div>
          <div ref={bottomLineRef} style={{ marginBottom: '50px', height: '50px' }}></div>
        </div>
        <div className="streams-suggestions">
          <Suggestions />
        </div>
      </div>
    </div>
  );
};

export default Streams;
