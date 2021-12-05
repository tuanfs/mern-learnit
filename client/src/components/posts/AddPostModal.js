import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useContext } from 'react';
import { PostContext } from '../../contexts/PostContext';

function AddPostModal(props) {
    // Contexts
    const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } =
        useContext(PostContext);
    const closeDialog = () => {
        resetAddPostData();
    };

    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: 'To Learn',
    });
    const { title, description, url } = newPost;
    const onChangeNewPostForm = (event) =>
        setNewPost({ ...newPost, [event.target.name]: event.target.value });
    const onSubmit = async (event) => {
        event.preventDefault();
        const { success, message } = await addPost(newPost);
        resetAddPostData();
        setShowToast({
            show: true,
            message: message,
            type: success ? 'success' : 'danger',
        });
    };
    const resetAddPostData = () => {
        setNewPost({ title: '', description: '', url: '', status: 'To Learn' });
        setShowAddPostModal(false);
    };
    return (
        <Modal show={showAddPostModal} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>What do you want to learn ?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control
                            type='text'
                            placeholder='Title'
                            name='title'
                            required
                            aria-describedby='title-help'
                            value={title}
                            onChange={onChangeNewPostForm}
                        />
                        <Form.Text id='title-help' muted>
                            Required
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            as='textarea'
                            placeholder='Description'
                            name='description'
                            rows={3}
                            value={description}
                            onChange={onChangeNewPostForm}
                        />
                    </Form.Group>
                    <Form.Group className='mt-3'>
                        <Form.Control
                            type='text'
                            placeholder='Youtube Tutorial URL'
                            name='url'
                            value={url}
                            onChange={onChangeNewPostForm}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeDialog}>
                        Cancel
                    </Button>
                    <Button variant='primary' type='submit'>
                        LearnIt
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default AddPostModal;
