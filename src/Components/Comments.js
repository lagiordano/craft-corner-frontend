import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ErrorMessages from "./ErrorMessages";
import Comment from "./Comment";


function Comments ({comments, projectID, currentUser}) {


    const [newComment, setNewComment] = useState("")
    const [commentsList, setCommentsList] = useState(comments);
    const [errors, setErrors] = useState(null);

    console.log(comments)
    
    function handleAddComment() {
        fetch("/comments", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                project_id: projectID,
                comment_text: newComment
            })
        })
        .then(r => {
            if (r.ok) {
                r.json().then(json => setCommentsList([...commentsList, json]))
            } else {
                r.json().then(json => json.errors ? setErrors(json.errors) : setErrors(["Unable to add new project at this time"]))
            }
        })
    }

    function handleDeleteComment (comment) {
        const updatedComments = commentsList.filter(c => c.id !== comment.id);
        setCommentsList(updatedComments)
    }
  

    return (
        <Container>
            <Row>
                <Col>
                    <h4 className="p-1">Comments</h4>
                </Col>
            </Row>
            <Row className="my-1 mx-md-2 mx-lg-5">
                <Col>
                    <Form onSubmit={handleAddComment}>
                        <InputGroup >
                            <Form.Control placeholder="Add a comment..." value={newComment} onChange={e => setNewComment(e.target.value)}/>
                            <Button className="text-white" type="submit">Add</Button>
                        </InputGroup>
                    </Form>
                </Col>
            </Row>
            {errors ? 
                <Row className="p-0 m-0">
                    <ErrorMessages errors={errors} />
                </Row>
            :
            null }
            <Row className="my-1 mx-md-2 mx-md-5">
                <Col className="text-start">
                    {commentsList === [] ? 
                    <p className="text-secondary text-center pt-3">There are no comments on this project yet</p>    
                    :
                    <div>
                        {commentsList.map(comment => <Comment comment={comment} currentUser={currentUser} key={comment.id} onDeleteComment={handleDeleteComment}/> )}
                    </div>
                    }
                </Col>
            </Row>
                 
        </Container>
    )

}


export default Comments;