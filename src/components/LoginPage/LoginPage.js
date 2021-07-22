import { Form, Button } from 'react-bootstrap';


function LoginPage() {
    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log(`Email: ${event.target.elements[0].value} | Pswrd: ${event.target.elements[1].value}`);
    }

    return (
        <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default LoginPage;