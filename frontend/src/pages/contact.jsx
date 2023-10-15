import React from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { FiUser, FiMail, FiMessageSquare } from 'react-icons/fi';
import '../stylesheet/contact.css';

export default function Contact() {
  return (
    <Container className="container center">
      <Card className="card-container">
        <Card.Body>
          <h3 className="title mb-4">Contact</h3>
          <Form>
            <Form.Group>
              <FiUser className="icon" />
              <Form.Control type="text" placeholder="Name" />
            </Form.Group>

            <Form.Group>
              <FiMail className="icon" />
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>

            <Form.Group>
              <FiMessageSquare className="icon" />
              <Form.Control as="textarea" rows={3} placeholder="Comment" />
            </Form.Group>

            <Button variant="primary" type="submit" className="submit-button">
              SUBMIT
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
