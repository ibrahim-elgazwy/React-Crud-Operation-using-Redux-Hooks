import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts, deletePost } from '../actions/post-actions';

class Posts extends Component {

    componentDidMount(){
        this.props.fetchPosts();
    }

    handleDeletePost = (post) =>{
        debugger
        this.props.deletePost(post.id);
    }

    handleEditPost = (post) =>{
        debugger
        this.props.editPostInfo(post);
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    render() {
        const postsItem = this.props.posts.map((post, index) => (
            <div className="post" key={post.id}>
                <div className="show-index badge badge-info">{index + 1}</div>
                <div>
                    <h4>${post.title}</h4>
                    <p>${post.body}</p>
                    <p className="edit-post">
                    <i className="fa fa-pencil-square" 
                       onClick={() => this.handleEditPost(post)}
                       data-toggle="tooltip" data-placement="top" 
                       title="Edit Post">
                    </i>
                    <i className="fa fa-window-close" 
                       onClick={() => this.handleDeletePost(post)}
                       data-toggle="tooltip" data-placement="top" 
                       title="Delete Post">
                    </i>
                </p>  
                </div>
            </div>
        ));
        return (
            <div>
                <h1>Posts <span className="badge badge-warning">{this.props.posts.length}</span> </h1>
                {postsItem}
            </div>
        )
    }
}

Posts.propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    deletePost: PropTypes.func,
    posts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    posts: state.posts.items,
});

export default connect(mapStateToProps, {fetchPosts, deletePost})(Posts);
