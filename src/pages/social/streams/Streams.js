import Posts from '@components/posts/Posts';
import PostForm from '@components/posts/post-form/PostForm';
import Suggestions from '@components/suggestions/Suggestions';
import useEffectOnce from '@hooks/useEffectOnce';
import useInfiniteScroll from '@hooks/useInfiniteScroll';
import '@pages/social/streams/Streams.scss';
import { getPosts } from '@redux/api/posts';
import { getSuggestions } from '@redux/api/suggestions';
import { postService } from '@services/api/post/post.service';
import { PostUtils } from '@services/utils/post-utils.service';
import { Utils } from '@services/utils/utils.service';
import { unionBy } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Streams = () => {
  const { allPosts } = useSelector((state) => state);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPostsCount, setTotalPostsCount] = useState(0);
  const bodyRef = useRef(null);
  let appPosts = useRef([]);
  const bottomLineRef = useRef();
  const dispatch = useDispatch();
  useInfiniteScroll(bodyRef, bottomLineRef, fetchPostData);
  const PAGE_SIZE = 8;

  function fetchPostData() {
    let pageNum = currentPage;
    console.log(currentPage, Math.round(totalPostsCount / PAGE_SIZE));
    if (currentPage <= Math.round(totalPostsCount / PAGE_SIZE)) {
      pageNum += 1;
      setCurrentPage(pageNum);
      getAllPosts();
    }
  }

  const getAllPosts = async () => {
    try {
      const response = await postService.getAllPosts(currentPage);
      console.log(response);
      if (response?.data?.posts?.length > 0) {
        appPosts = [...posts, ...response?.data?.posts];
        const allPosts = unionBy(appPosts, '_id');
        console.log(allPosts);
        setPosts(allPosts);
      }
      setLoading(false);
    } catch (error) {
      Utils.dispatchNotification(error.response.data.message, 'error', dispatch);
    }
  };

  useEffectOnce(() => {
    dispatch(getSuggestions());
  });

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    setLoading(allPosts?.isLoading);
    setPosts(allPosts?.posts);
    setTotalPostsCount(allPosts?.totalPostsCount);
  }, [allPosts]);

  useEffect(() => {
    PostUtils.socketIOPost(posts, setPosts);
  }, [posts]);

  return (
    <div className="streams">
      <div className="streams-content">
        <div className="streams-post" ref={bodyRef} style={{ backgroundColor: '#fff' }}>
          <PostForm />
          <Posts allPosts={posts} postsLoading={loading} userFollowing={[]} />
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
