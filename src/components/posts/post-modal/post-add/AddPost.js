import Button from '@components/button/Button';
import Giphy from '@components/giphy/Giphy';
import PostWrapper from '@components/posts/modal-wrappers/post-wrapper/PostWrapper';
import ModalBoxContent from '@components/posts/post-modal/modal-box-content/ModalBoxContent';
import ModalBoxSelection from '@components/posts/post-modal/modal-box-content/ModalBoxSelection';
import '@components/posts/post-modal/post-add/AddPost.scss';
import Spinner from '@components/spinner/Spinner';
import { closeModal, toggleGifModal } from '@redux/reducers/modal/modal.reducer';
import { postService } from '@services/api/post/post.service';
import { ImageUtils } from '@services/utils/image-utils.service';
import { PostUtils } from '@services/utils/post-utils.service';
import { bgColors } from '@services/utils/static.data';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

const AddPost = ({ selectedImage }) => {
  const { gifModalIsOpen, feeling } = useSelector((state) => state.modal);
  const { gifUrl, image, privacy } = useSelector((state) => state.post);
  const { profile } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [postImage, setPostImage] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [allowedNumberOfCharacters] = useState('100/100');
  const [textAreaBackground, setTextAreaBackground] = useState('#ffffff');
  const [postData, setPostData] = useState({
    post: '',
    bgColor: textAreaBackground,
    privacy: '',
    feelings: '',
    gifUrl: '',
    profilePicture: '',
    image: ''
  });
  const [disable, setDisable] = useState(true);
  const [selectedPostImage, setSelectedPostImage] = useState();
  const counterRef = useRef(null);
  const inputRef = useRef(null);
  const imageInputRef = useRef(null);

  const dispatch = useDispatch();

  const selectBackground = (bgColor) => {
    console.log(selectedPostImage);
    PostUtils.selectBackground(bgColor, postData, setTextAreaBackground, setPostData);
  };

  const maxNumberOfCharacters = 100;

  const postInputEditable = (event, textContent) => {
    const currentTextLength = event.target.textContent.length;
    const counter = maxNumberOfCharacters - currentTextLength;
    counterRef.current.textContent = `${counter}/${maxNumberOfCharacters}`;
    setDisable(currentTextLength <= 0 && !postImage);
    PostUtils.postInputEditable(textContent, postData, setPostData);
  };

  const closePostModal = () => {
    PostUtils.closePostModal(dispatch);
  };

  const onKeyDown = (event) => {
    const currentTextLength = event.target.textContent.length;
    if (currentTextLength === maxNumberOfCharacters && event.keyCode !== 8) {
      event.preventDefault();
    }
  };

  const clearImage = () => {
    PostUtils.clearImage(postData, '', inputRef, dispatch, setSelectedPostImage, setPostImage, setPostData);
  };

  const createPost = async () => {
    setLoading(!loading);
    setDisable(!disable);
    try {
      if (Object.keys(feeling).length) {
        postData.feelings = feeling?.name;
      }
      postData.privacy = privacy || 'Public';
      postData.gifUrl = gifUrl;
      postData.profilePicture = profile.profilePicture;
      if (selectedPostImage || selectedImage) {
        let result = '';
        if (selectedPostImage) {
          result = await ImageUtils.readAsBase64(selectedPostImage);
        }

        if (selectedImage) {
          result = await ImageUtils.readAsBase64(selectedImage);
        }
        const response = await PostUtils.sendPostWithImageRequest(
          result,
          postData,
          imageInputRef,
          setApiResponse,
          setLoading,
          setDisable,
          dispatch
        );
        if (response && response?.data?.message) {
          PostUtils.closePostModal(dispatch);
        }
      } else {
        const response = await postService.createPost(postData);
        if (response) {
          setApiResponse('success');
          setLoading(false);
          PostUtils.closePostModal(dispatch);
        }
      }
    } catch (error) {
      PostUtils.dispatchNotification(
        error.response.data.message,
        'error',
        setApiResponse,
        setLoading,
        setDisable,
        dispatch
      );
    }
  };

  useEffect(() => {
    PostUtils.postionCursor('editable');
  }, []);

  useEffect(() => {
    if (!loading && apiResponse === 'success') {
      dispatch(closeModal());
    }
    setDisable(postData?.post?.length <= 0 && !postImage);
  }, [loading, dispatch, apiResponse, postData, postImage]);

  useEffect(() => {
    if (gifUrl) {
      setPostImage(gifUrl);
      PostUtils.postInputData(imageInputRef, postData, '', setPostData);
    } else if (image) {
      setPostImage(image);
      PostUtils.postInputData(imageInputRef, postData, '', setPostData);
    }
  }, [gifUrl, image, postData]);

  return (
    <>
      <PostWrapper>
        <div></div>
        {!gifModalIsOpen && (
          <div
            className="modal-box"
            style={{
              height: selectedPostImage || gifUrl || image || postData?.gifUrl || postData?.image ? '700px' : 'auto'
            }}
          >
            {loading && (
              <div className="modal-box-loading">
                <span>Posting...</span>
                <Spinner />
              </div>
            )}
            <div className="modal-box-header">
              <h2>Create Post</h2>
              <button className="modal-box-header-cancel" onClick={() => closePostModal()}>
                <FaTimes />
              </button>
            </div>
            <hr />
            <ModalBoxContent />

            {!postImage && (
              <>
                <div className="modal-box-form" style={{ background: `${textAreaBackground}` }}>
                  <div className="main" style={{ margin: textAreaBackground !== '#ffffff' ? '0 auto' : '' }}>
                    <div className="flex-row">
                      <div
                        name="post"
                        ref={(el) => {
                          inputRef.current = el;
                          inputRef?.current?.focus();
                        }}
                        className={`editable flex-item ${textAreaBackground !== '#ffffff' ? 'textInputColor' : ''} ${
                          postData.post.length === 0 && textAreaBackground !== '#ffffff' ? 'defaultInputTextColor' : ''
                        }`}
                        contentEditable={true}
                        id="editable"
                        onInput={(e) => postInputEditable(e, e.currentTarget.textContent)}
                        onKeyDown={onKeyDown}
                        data-placeholder="What's on your mind?..."
                      ></div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {postImage && (
              <>
                <div className="modal-box-image-form">
                  <div
                    name="post"
                    ref={(el) => {
                      imageInputRef.current = el;
                      imageInputRef?.current?.focus();
                    }}
                    className="post-input flex-item"
                    contentEditable={true}
                    onInput={(e) => postInputEditable(e, e.currentTarget.textContent)}
                    onKeyDown={onKeyDown}
                    id="editable"
                    data-placeholder="What's on your mind?..."
                  ></div>
                  <div className="image-display">
                    <div className="image-delete-btn" onClick={() => clearImage()}>
                      <FaTimes />
                    </div>
                    <img src={`${postImage}`} alt="" className="post-image" />
                  </div>
                </div>
              </>
            )}

            <div className="modal-box-bg-colors">
              <ul>
                {bgColors.map((color, index) => (
                  <li
                    key={index}
                    className={`${color === '#ffffff' ? 'whiteColorBorder' : ''}`}
                    style={{ backgroundColor: color, border: color === '#ffffff' ? '1px solid #ccc' : '' }}
                    onClick={() => {
                      PostUtils.postionCursor('editable');
                      selectBackground(color);
                    }}
                  ></li>
                ))}
              </ul>
            </div>
            <span className="char_count" ref={counterRef}>
              {allowedNumberOfCharacters}
            </span>

            <ModalBoxSelection setSelectedPostImage={setSelectedPostImage} />

            <div className="modal-box-button">
              <Button label="Create Post" className="post-button" disabled={disable} handleClick={createPost} />
            </div>
          </div>
        )}
        {gifModalIsOpen && (
          <div className="modal-giphy">
            <div className="modal-giphy-header">
              <Button
                label={<FaArrowLeft />}
                className="back-button"
                disabled={false}
                handleClick={() => dispatch(toggleGifModal(!gifModalIsOpen))}
              />
              <h2>Choose a GIF</h2>
            </div>
            <hr />
            <Giphy />
          </div>
        )}
      </PostWrapper>
    </>
  );
};

AddPost.propTypes = {
  selectedImage: PropTypes.string
};

export default AddPost;
