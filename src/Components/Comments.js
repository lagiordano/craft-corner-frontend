import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";


function Comments ({comments}) {


    const [newComment, setNewComment] = useState("")
    const [commentsList, setCommentsList] = useState(comments);

    console.log(commentsList)
  

    return (
        <Container>
            <Row>
                <Col>
                    <h3>Comments</h3>
                </Col>
            </Row>
            <Row className="my-1 mx-md-2 mx-lg-5">
                <Col>
                    <Form >
                        <InputGroup >
                            <Form.Control placeholder="Enter your comment here..." value={newComment} onChange={e => setNewComment(e.target.value)}/>
                            <Button className="text-white">Add</Button>
                        </InputGroup>
                    </Form>
                </Col>
            </Row>
            <Row className="my-1 mx-md-2 mx-md-5">
                <Col className="text-start">
                    {commentsList === [] ? 
                    <p>There are no comments on this project yet</p>    
                    :
                    <div>
                        {commentsList.map(comment => {
                            return <Card key={comment.id} className="p-1 p-md-2 my-2 m-md-2"> 
                                        <Card.Subtitle className="p-1">{comment.username}<span className="text-end text-light fs-6"> - {comment.posted}</span></Card.Subtitle>
                                        <Card.Text className="px-1 pb-1">{comment.comment_text}</Card.Text>
                                    </Card>
                        })}
                    </div>
                    }
                </Col>
            </Row>
                 
        </Container>
    )

}


export default Comments;