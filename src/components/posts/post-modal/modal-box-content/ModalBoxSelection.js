import feeling from '@assets/images/feeling.png';
import gif from '@assets/images/gif.png';
import photo from '@assets/images/photo.png';
import Feelings from '@components/feelings/Feelings';
import Input from '@components/inputs/Input';
import useDetectOutSideClick from '@hooks/useDetectOutSideClick';
import { toggleGifModal } from '@redux/reducers/modal/modal.reducer';
import { ImageUtils } from '@services/utils/image-utils.service';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ModalBoxSelection = ({ setSelectedPostImage }) => {
  const { feelingsIsOpen, gifModalIsOpen } = useSelector((state) => state.modal);
  const { post } = useSelector((state) => state.post);
  const feelingRef = useRef(null);
  const fileInputRef = useRef();
  const [toggleFeelings, setToggleFeelings] = useDetectOutSideClick(feelingRef, feelingsIsOpen);
  const dispatch = useDispatch();

  const fileInputClicked = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    ImageUtils.addFileToRedux(e, post, setSelectedPostImage, dispatch);
  };

  return (
    <>
      {toggleFeelings && (
        <div ref={feelingRef}>
          <Feelings />
        </div>
      )}
      <div className="modal-box-selection" data-testid="modal-box-selection">
        <ul className="post-form-list" data-testid="list-item">
          <li className="post-form-list-item image-select" onClick={fileInputClicked}>
            <Input
              name="image"
              ref={fileInputRef}
              type="file"
              className="file-input"
              onClick={() => {
                if (fileInputRef.current) {
                  fileInputRef.current.value = null;
                }
              }}
              handleChange={handleFileInputChange}
            />
            <img src={photo} alt="" /> Photo
          </li>
          <li className="post-form-list-item" onClick={() => dispatch(toggleGifModal(!gifModalIsOpen))}>
            <img src={gif} alt="" /> Gif
          </li>
          <li className="post-form-list-item" onClick={() => setToggleFeelings(!toggleFeelings)}>
            <img src={feeling} alt="" /> Feeling
          </li>
        </ul>
      </div>
    </>
  );
};

ModalBoxSelection.propTypes = {
  setSelectedPostImage: PropTypes.func.isRequired
};

export default ModalBoxSelection;
