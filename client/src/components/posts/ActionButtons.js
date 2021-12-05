import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import playIcon from '../../assets/play-btn.svg';
import editIcon from '../../assets/pencil.svg';
import deleteIcon from '../../assets/trash.svg';
import { PostContext } from '../../contexts/PostContext';

function ActionButtons({ url, _id }) {
    const { deletePost, findPostEdit, setShowUpdatePostModal } =
        useContext(PostContext);

    const choosePost = (postId) => {
        findPostEdit(postId);
        setShowUpdatePostModal(true);
    };
    return (
        <>
            <Button className='post-button' href={url} target='_blank'>
                <img src={playIcon} alt='Play' width='32' height='32' />
            </Button>
            <Button
                className='post-button'
                onClick={choosePost.bind(this, _id)}
            >
                <img src={editIcon} alt='Edit' width='24' height='24' />
            </Button>
            <Button
                className='post-button'
                onClick={deletePost.bind(this, _id)}
            >
                <img src={deleteIcon} alt='Delete' width='24' height='24' />
            </Button>
        </>
    );
}

export default ActionButtons;
