import React from 'react';

const About = () => {
  return (
    <div style={{padding:'0 7%',marginTop:'1rem'}}>
      <h5>React App Specification</h5>
      <span>The app should include the following three pages:</span>
      <ul>
        <li>
          <strong>Home Page:</strong> A simple welcome screen with navigation
          links to other pages.
        </li>
        <li>
          <strong>Form Page:</strong> A form that validates user inputs based on
          specific rules.
        </li>
        <li>
          <strong>About Page:</strong> A static page containing information
          about the application.
        </li>
      </ul>

      <h6>Form Validation Requirements</h6>
      <ul>
        <li>All required fields must be filled.</li>
        <li>The email field must contain a valid email address.</li>
        <li>The password field must be at least 8 characters long.</li>
      </ul>

      <h6>React Router</h6>
      <ul>
        <li>Use <b>React Router</b> to navigate between pages.</li>
        <li>Include a <b>Navbar</b> with links to the Home, Form, and About pages.</li>
      </ul>

      <h6>Lazy Loading</h6>
      <ul>
      <li>Use <code>React.lazy</code> and <code>Suspense</code> to lazy load the
        Form and About pages for better performance.</li>
      </ul>

      <h6>Styling</h6>
      <ul>
        <li>Use <code>React Bootstrap</code> for consistent and responsive styling
        across the application.</li>
      </ul>
    </div>
  );
};

export default About;
