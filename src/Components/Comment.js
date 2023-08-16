import React, {useState} from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import DeleteConfirmation from "./DeleteConfirmation";
import ErrorMessages from "./ErrorMessages";


function Comment ({comment, currentUser, onDeleteComment}) {

    const [errors, setErrors] = useState(null);
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)

    // renders confirm delete modal
    function handleConfirmDelete() {
        setShow(true);
    }

    // deletes comment
    function handleDelete() {
        setShow(false);
        fetch(`/comments/${comment.id}`, {
            method: "DELETE"
        })
        .then(r => {
            if (r.ok) {
                setErrors(null)
                onDeleteComment(comment)
            } else {
                setErrors(["Unable to delete comment at this time"])
            }
        })
        .catch(() => setErrors(["Unable to delete comment at this time"]))
    }


    return (
        <>
        <Card key={comment.id} className="p-1 p-md-2 my-2 m-md-2 text-secondary"> 
            <Card.Subtitle className="p-1">{comment.username}
                <span className="text-end text-light fs-6"> - {comment.posted}</span>
                <Button onClick={handleConfirmDelete} className={currentUser && currentUser.username === comment.username ? "text-danger float-end py-0 px-1" : "d-none"} size="sm" variant="outline-none">X</Button>
            </Card.Subtitle>
            <Card.Text className="px-1 pb-1">{comment.comment_text}</Card.Text>
        </Card>
        <DeleteConfirmation showModal={show} handleClose={handleClose} handleDelete={handleDelete} deletedElement="comment"/>
        {errors ? 
        <ErrorMessages errors={errors} />
        :
        null}
        </>
    )
}

export default Comment;