import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { RiTeamLine } from 'react-icons/ri';
import '../stylesheet/about.css';

export default function About() {
  return (
    <Container className="container">
      <Card className="about-card">
        <Card.Body>
          <div className="motto">
            <h2>
              <RiTeamLine className="icon" /> OUR SERVICES INCLUDE!
            </h2>

            <h3>
            Tailored Matchmaking:
            </h3> 
            <p> 
            Say goodbye to random pairings! Our intelligent algorithm matches you with students in your field of study, ensuring you get the most relevant and effective study group experience.
            </p>

             <h3>
            Flexible Scheduling:
            </h3> 
            <p> 
            We understand that your schedule can be hectic. With Academic Tinder, you have the flexibility to set your own meeting times, making it easy to find a time that works for everyone in your group.
            </p>

            <h3>
            Seamless Collaboration:
            </h3> 
            <p> 
            Our platform provides a suite of tools for seamless collaboration. From shared virtual whiteboards to real-time document editing, we've got you covered.
            </p>

            <h3>
            Resource Sharing:
            </h3> 
            <p> 
            Access a wealth of curated resources, including study guides, practice exams, and exclusive content from top educators, all within the Academic Tinder community.
            </p>

            <h3>
            Community Engagement:
            </h3>
            <p>
            Connect with a thriving community of like-minded learners. Share insights, ask questions, and build valuable networks that extend beyond the virtual classroom.
            </p>

            <h3>
            Join us today and revolutionize your learning experience. Together, we're not just studying; we're excelling!
            </h3>
            
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
