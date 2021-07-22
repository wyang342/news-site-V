import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { addArticle } from '../../api/ArticlesAPI';


function AddArticle() {
    const [submitted, setSubmitted] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const articleObject = {
            title: event.target.elements[0].value,
            byline: event.target.elements[1].value,
            abstract: event.target.elements[2].value,
        }

        addArticle(articleObject)
            .then((json) => {
                if (json.error) {
                    setErrorMsg(json.error.message);
                }
                setSubmitted(true);
            });
    }

    // remember: JSX goes inside return()
    return (
        <div>
            {!submitted ? (
                < Form onSubmit={handleFormSubmit} >
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Byline</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Abstract</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form >
            ) : submitted && errorMsg ? (
                <Alert variant={'danger'}>
                    Your article could not be created: {errorMsg}
                </Alert>
            ) : (
                <Alert variant={'success'}>
                    Your article has been created!
                </Alert>
            )
            }
        </div>
    )
}


export default AddArticle;