import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useContext } from 'react';
import { PostContext } from '../../contexts/PostContext';

function UpdatePostModal(props) {
    // Contexts
    const {
        postState: { postEdit },
        showUpdatePostModal,
        setShowUpdatePostModal,
        updatePost,
        setShowToast,
    } = useContext(PostContext);
    const closeDialog = () => {
        setUpdatedPost(postEdit);
        setShowUpdatePostModal(false);
    };
    const [updatedPost, setUpdatedPost] = useState(postEdit);
    const { title, description, url, status } = updatedPost;
    const onChangeUpdatedPostForm = (event) =>
        setUpdatedPost({
            ...updatedPost,
            [event.target.name]: event.target.value,
        });
    useEffect(() => setUpdatedPost(postEdit), [postEdit]);
    const onSubmit = async (event) => {
        event.preventDefault();
        const { success, message } = await updatePost(updatedPost);
        setShowUpdatePostModal(false);
        setShowToast({
            show: true,
            message: message,
            type: success ? 'success' : 'danger',
        });
    };
    const resetAddPostData = () => {
        setUpdatedPost({
            title: '',
            description: '',
            url: '',
            status: 'To Learn',
        });
        setShowUpdatePostModal(false);
    };
    return (
        <Modal show={showUpdatePostModal} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>Making progess ?</Modal.Title>
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
                            onChange={onChangeUpdatedPostForm}
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
                            onChange={onChangeUpdatedPostForm}
                        />
                    </Form.Group>
                    <Form.Group className='mt-3'>
                        <Form.Control
                            type='text'
                            placeholder='Youtube Tutorial URL'
                            name='url'
                            value={url}
                            onChange={onChangeUpdatedPostForm}
                        />
                    </Form.Group>
                    <Form.Group className='mt-3'>
                        <Form.Control
                            as='select'
                            placeholder='Youtube Tutorial URL'
                            name='status'
                            value={status}
                            onChange={onChangeUpdatedPostForm}
                        >
                            <option value='To Learn'>To Learn</option>
                            <option value='Learning'>Learning</option>
                            <option value='Learned'>Learned</option>
                        </Form.Control>
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

export default UpdatePostModal;
