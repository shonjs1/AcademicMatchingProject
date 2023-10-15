import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { RiTeamLine } from 'react-icons/ri';
import { BsCheckAll } from 'react-icons/bs';
import '../stylesheet/about.css';

export default function About() {
  return (
    <Container className="container">
      <Card className="about-card">
        <Card.Body>
          <div className="motto">
            <h2>
              <RiTeamLine className="icon" /> Meet the Team
            </h2>
            <p>
              We are a team of passionate software developers dedicated to revolutionizing the way students learn and
              collaborate. Comprising four dynamic individuals, we share a common goal: to create an environment that
              fosters academic growth through meaningful connections.
            </p>

            <h2>
              <BsCheckAll className="icon" /> Our Mission
            </h2>
            <p>
              At Academic Tinder, we believe that learning is not just a solitary endeavor, but a collective journey. Our
              mission is to empower students by providing a platform that seamlessly connects them with like-minded
              peers, facilitating the formation of study groups that enhance comprehension, retention, and overall
              academic success.
            </p>

            <h2>
              <BsCheckAll className="icon" /> What Sets Us Apart
            </h2>
            <ol>
              <li>
                <h3>Seamless Connectivity</h3>
                <p>
                  Academic Tinder provides a user-friendly interface designed to effortlessly connect students based on
                  their courses, interests, and study preferences. No more struggling to find the right study partners
                  or coordinating schedules; our app streamlines the process, allowing you to focus on what truly
                  matters - learning.
                </p>
              </li>
              <li>
                <h3>Empowered Learning Communities</h3>
                <p>
                  We believe that diversity drives innovation. Academic Tinder embraces students from various backgrounds,
                  fostering a rich tapestry of perspectives and ideas. By creating a supportive community, we aim to
                  inspire creativity, critical thinking, and a genuine passion for learning.
                </p>
              </li>
            </ol>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
