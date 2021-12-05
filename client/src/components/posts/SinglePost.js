import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import ActionButtons from './ActionButtons';

function SinglePost({ post: { _id, status, title, description, url } }) {
    const statusBorder =
        status === 'Learned'
            ? 'border-success'
            : status === 'Learning'
            ? 'border-warning'
            : 'border-danger';
    const statusBadge =
        status === 'Learned'
            ? 'bg-success'
            : status === 'Learning'
            ? 'bg-warning'
            : 'bg-danger';
    return (
        <Card className={('shadow', statusBorder)}>
            <Card.Body>
                <Card.Title>
                    <Row>
                        <Col>
                            <p className='post-title'>{title}</p>
                            <Badge pill className={statusBadge}>
                                {status}
                            </Badge>
                        </Col>
                        <Col className='text-end'>
                            <ActionButtons url={url} _id={_id} />
                        </Col>
                    </Row>
                </Card.Title>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default SinglePost;
