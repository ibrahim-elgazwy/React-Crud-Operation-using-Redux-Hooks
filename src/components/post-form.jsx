import React, { Component } from 'react';
// import {PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { createPost, editPost } from '../actions/post-actions';

class PostForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            title: '',
            body: '',
            btnLabel: 'Add Post',
            isPostEdit: false,
            error: {}
        };
    }

    handleInpChange = (event) => {

        let {isPostEdit, title, body, btnLabel} = this.state;
        if(this.props.isEditPost) {
            this.props.changeEdit(false);
            isPostEdit = true;
            title = this.props.setPost.title;
            body = this.props.setPost.body;
            btnLabel = 'Edit Post'
        }

        let inp = event.currentTarget;
        if(inp && inp.name === 'title') title = inp.value;
        if(inp && inp.name === 'body') body = inp.value;
        
        this.setState({title, body, isPostEdit, btnLabel});
    }

    validateForm = () => {
        let status = false;
        let {title, body, error} = {...this.state};
        if(!title){
            error.title = "Title is required !!!";
            status = true;
        }

        if(!body){
            error.body = "Body is required !!!";
            status = true;
        }
        if(status) {
            this.setState({error});
        }
        return status ? false : true;
    }

    resetForm = () => {
        this.setState({
            title: '',
            body: '',
            isPostEdit: false,
            btnLabel: 'Add Post'
        });
    }

    handleForm = (event) => {
        event.preventDefault();
        if(!this.validateForm()) return;
        let post = {
            title: this.state.title,
            body: this.state.body
        }
        
        debugger
        this.state.isPostEdit ? 
            this.props.editPost({...post, id: this.props.setPost.id}) : 
            this.props.createPost(post);

        this.resetForm();
    }

    render() {
        let { error, title, body, btnLabel } = {...this.state};
        if(this.props.isEditPost){
            debugger
            title = this.props.setPost.title;
            body = this.props.setPost.body;
            btnLabel = 'Edit Post'
        }
        return (
            <div>
                <h3>Add Post</h3>
                <form onSubmit={this.handleForm}>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" 
                               id="title"  placeholder="Add Title"
                               autoComplete="off" 
                               value={title}
                               onChange={this.handleInpChange}/>
                        {error.title && <span className="alert alert-danger">{error.title}</span>}
                    </div>
                    <div>
                        <label htmlFor="body">Body</label>
                        <input type="text" name="body" 
                               id="body"  placeholder="Add Body"  
                               autoComplete="off"
                               value={body}
                               onChange={this.handleInpChange}/>
                        {error.body && <span className="alert alert-danger">{error.body}</span>}
                    </div>
                    <button type="submit">{btnLabel}</button>
                </form>
            </div>
        )
    }
}

export default connect(null, {createPost, editPost})(PostForm);
