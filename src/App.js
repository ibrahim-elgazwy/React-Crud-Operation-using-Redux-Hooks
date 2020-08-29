import React, {useState} from 'react';
import { Provider } from 'react-redux';

import './App.css';

import Posts from './components/posts';
import PostForm from './components/post-form';
import store from './store';

function App() {
  let [post, setPost] = useState({});
  let [isEditPost, changeEdit] = useState(false);

  const handlePostEdit = post => {
    setPost(post);
    changeEdit(true);
  }

  return (
    <Provider store = {store}>
      <div className="App">
        <PostForm isEditPost={isEditPost} setPost={post} changeEdit={changeEdit}/>
        <hr />
        <Posts editPostInfo={handlePostEdit} />
      </div>
    </Provider>
  );
}

export default App;
