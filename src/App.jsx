import React, { useState } from 'react';
import './App.css';

function App() {
  const [eventType, setEventType] = useState('');
  const [formData, setFormData] = useState({});
  const [greetings, setGreetings] = useState({});

  const handleEventTypeChange = (event) => {
    setEventType(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/prompts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate blessings');
      }

      const data = await response.json();
      setGreetings(data);
    } catch (error) {
      console.error('Error generating blessings:', error);
      alert('Failed to generate blessings. Please try again later.');
    }
  };

  return (
    <div className="App">
      <h1>Welcome to the smart AI blessing generator</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="eventType">Select event type:</label>
        <select id="eventType" name="eventType" onChange={handleEventTypeChange}>
          <option value="">Event</option>
          <option value="birthday">Birthday</option>
          <option value="wedding">Wedding</option>
          <option value="birth">Birth</option>
        </select>

        {eventType === 'birthday' && (
          <div id="birthdayFields">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" onChange={handleChange} /><br />
            <label htmlFor="age">Age</label>
            <input type="number" id="age" name="age" onChange={handleChange} />
          </div>
        )}

        {eventType === 'wedding' && (
          <div id="weddingFields">
            <label htmlFor="coupleNames">Couple Names</label>
            <input type="text" id="coupleNames" name="coupleNames" onChange={handleChange} /><br />
            <label htmlFor="weddingDate">Wedding Date</label>
            <input type="date" id="weddingDate" name="weddingDate" onChange={handleChange} />
          </div>
        )}

        {eventType === 'birth' && (
          <div id="birthFields">
            <label htmlFor="babyName">Baby Name</label>
            <input type="text" id="babyName" name="babyName" onChange={handleChange} /><br />
            <label htmlFor="gender">Gender</label>
            <select id="gender" name="gender" onChange={handleChange}>
              <option value="boy">Boy</option>
              <option value="girl">Girl</option>
            </select>
          </div>
        )}

        <br />
        <button type="submit">Create a blessing</button>
      </form>

      <h2>Generated Greetings:</h2>
      <p>{greetings["1"]}</p>
      <p>{greetings["2"]}</p>
      <p>{greetings["3"]}</p>
    </div>
  );
}

export default App;
