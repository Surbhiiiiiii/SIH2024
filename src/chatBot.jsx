import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function chatBot() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Welcome to Triveni Museum! How can I assist you today?" }
  ]);
  const [step, setStep] = useState(0);
  const [currentOption, setCurrentOption] = useState("");
  const [ticketDetails, setTicketDetails] = useState({
    name: '',
    ageGroup: '',
    gender: '',
    email: '',
    contact: '',
    numberOfTickets: '',
    preferredDate: '',
    preferredTime: ''
  });
  const [userChoices, setUserChoices] = useState([]);

  const mainOptions = [
    "Yes, I want to purchase a ticket",
    "Museum Information",
    "Exhibits and Collections",
    "Events and Programs",
    "Accessibility and Visitor Services"
  ];

  const noOptions = [
    "Museum Information",
    "Exhibits and Collections",
    "Events and Programs",
    "Accessibility and Visitor Services"
  ];

  const subOptions = {
    "Museum Information": [
      "Opening Hours",
      "Admission Fees",
      "Location",
      "Parking"
    ],
    "Exhibits and Collections": [
      "Current Exhibitions",
      "Upcoming Exhibitions",
      "Permanent Collection",
      "Interactive Exhibits",
      "Photography Policy"
    ],
    "Events and Programs": [
      "Guided Tours",
      "Workshops and Educational Programs",
      "Special Events",
      "Private Events",
      "Museum Café"
    ],
    "Accessibility and Visitor Services": [
      "Accessibility",
      "Audio Guides",
      "Stroller Policy",
      "Pet Policy",
      "Museum Membership"
    ]
  };

  const answers = {
    "Opening Hours": "The museum is open daily from 10 AM to 6 PM. On Fridays, it stays open until 8 PM. The museum is open on most public holidays except Christmas Day and New Year's Day.",
    "Admission Fees": "Admission fees are $15 for adults, $10 for seniors, and $8 for children under 12. Children under 5 enter for free.",
    "Location": "The museum is located at 123 Main Street, Cityville, State, ZIP Code.",
    "Parking": "Yes, there is a parking lot adjacent to the museum with free parking for visitors.",
    "Current Exhibitions": "Currently, we have the 'Ancient Egypt' exhibition, the 'Modern Art Masters' collection, and the 'Dinosaurs of the Mesozoic' display.",
    "Upcoming Exhibitions": "Yes, the upcoming exhibition 'Renaissance Wonders' will open next month on the 15th.",
    "Permanent Collection": "Yes, our permanent collection includes artworks from the 16th century, artifacts from ancient civilizations, and a natural history section.",
    "Interactive Exhibits": "Yes, we have several interactive exhibits, including a virtual reality experience in the 'Fossil Discoveries' section and hands-on activities in the 'Science Lab' area.",
    "Photography Policy": "Photography is allowed in most areas of the museum, but flash photography and tripods are prohibited. Some special exhibitions may have restrictions.",
    "Guided Tours": "Yes, guided tours are available daily at 11 AM and 2 PM. You can also book private tours in advance.",
    "Workshops and Educational Programs": "Yes, we offer workshops for children and adults, as well as educational programs for school groups. Check our website for the latest schedule.",
    "Special Events": "Yes, the museum hosts special events like 'Night at the Museum,' lecture series, and family days. Visit our events page for more details.",
    "Private Events": "Yes, the museum is available for private events such as weddings, corporate functions, and parties. Please contact our events team for more information.",
    "Museum Café": "Yes, our café offers a selection of sandwiches, salads, and beverages. It's open during museum hours.",
    "Accessibility": "Yes, the museum is fully accessible, with elevators, ramps, and wheelchair-accessible restrooms available.",
    "Audio Guides": "Yes, audio guides are available for rent at the front desk in multiple languages.",
    "Stroller Policy": "Yes, strollers are welcome in the museum, and there are designated areas to park them during your visit.",
    "Pet Policy": "Pets are not allowed in the museum, but service animals are welcome.",
    "Museum Membership": "You can become a member by signing up on our website or at the admissions desk. Memberships come with benefits like free admission, discounts, and special event invitations."
  };

  const ticketQuestions = [
    "What's your name?",
    "What is your age group?",
    "What is your gender?",
    "What is your email address?",
    "What is your contact number?",
    "How many tickets would you like to purchase?",
    "What is your preferred date of visit?",
    "What is your preferred time of visit?",
  ];

  const ageGroupOptions = [
    "Child (0-12 years)",
    "Teen (13-19 years)",
    "Adult (20-64 years)",
    "Senior (65+ years)",
  ];

  const genderOptions = [
    "Male",
    "Female",
    "Other",
    "Prefer Not to Say",
  ];

  const addMessage = (sender, text) => {
    setMessages(prevMessages => [...prevMessages, { sender, text }]);
  };

  const handleUserInput = (input) => {
    addMessage('user', input);

    // Update userChoices array
    if (step >= 0 && step <= 8) {
      setUserChoices(prevChoices => [...prevChoices, input]);
    }

    switch (step) {
      case 0:
        if (input === "Yes, I want to purchase a ticket") {
          setStep(1);
          addMessage('bot', ticketQuestions[0]);
        } else if (input === "No, I want to know something else") {
          setStep(-1);
          addMessage('bot', "What would you like to know? Here are the options:");
          noOptions.forEach(option => addMessage('bot', option));
        } else {
          addMessage('bot', "Please select one of the options provided.");
        }
        break;

      case -1:
        if (noOptions.includes(input)) {
          setCurrentOption(input);
          setStep(-2);
          addMessage('bot', `Here are the details for ${input}:`);
          subOptions[input].forEach(option => addMessage('bot', option));
        } else if (Object.keys(answers).includes(input)) {
          addMessage('bot', answers[input]);
          addMessage('bot', "Is there anything else you'd like to know?");
          setStep(0);
        } else if (subOptions[currentOption]?.includes(input)) {
          addMessage('bot', answers[input] || "Information not available.");
          addMessage('bot', "Is there anything else you'd like to know?");
          setStep(0);
        } else {
          addMessage('bot', "I'm sorry, I didn't understand that. Could you please choose from the options provided?");
        }
        break;

      case -2:
        if (subOptions[currentOption]?.includes(input)) {
          addMessage('bot', answers[input] || "Information not available.");
          addMessage('bot', "Is there anything else you'd like to know?");
          setStep(0);
        } else {
          addMessage('bot', "I'm sorry, I didn't understand that. Could you please choose from the options provided?");
        }
        break;

      case 1:
        setTicketDetails(prevDetails => ({
          ...prevDetails,
          name: input
        }));
        setStep(2);
        addMessage('bot', ticketQuestions[1]);
        break;

      case 2:
        if (ageGroupOptions.includes(input)) {
          setTicketDetails(prevDetails => ({
            ...prevDetails,
            ageGroup: input
          }));
          setStep(3);
          addMessage('bot', ticketQuestions[2]);
        } else {
          addMessage('bot', "Please select a valid age group from the options.");
        }
        break;

      case 3:
        if (genderOptions.includes(input)) {
          setTicketDetails(prevDetails => ({
            ...prevDetails,
            gender: input
          }));
          setStep(4);
          addMessage('bot', ticketQuestions[3]);
        } else {
          addMessage('bot', "Please select a valid gender from the options.");
        }
        break;

      case 4:
        setTicketDetails(prevDetails => ({
          ...prevDetails,
          email: input
        }));
        setStep(5);
        addMessage('bot', ticketQuestions[4]);
        break;

      case 5:
        setTicketDetails(prevDetails => ({
          ...prevDetails,
          contact: input
        }));
        setStep(6);
        addMessage('bot', ticketQuestions[5]);
        break;

      case 6:
        setTicketDetails(prevDetails => ({
          ...prevDetails,
          numberOfTickets: input
        }));
        setStep(7);
        addMessage('bot', ticketQuestions[6]);
        break;

      case 7:
        setTicketDetails(prevDetails => ({
          ...prevDetails,
          preferredDate: input
        }));
        setStep(8);
        addMessage('bot', ticketQuestions[7]);
        break;

      case 8:
        setTicketDetails(prevDetails => ({
          ...prevDetails,
          preferredTime: input
        }));
        setStep(0);
        addMessage('bot', "Thank you! We are processing your ticket request.");
        break;

      default:
        addMessage('bot', "Something went wrong. Please try again.");
        setStep(0);
    }

    // Console log the updated userChoices array
    console.log("Updated user choices:", userChoices);
  };

  const handleOptionClick = (option) => {
    handleUserInput(option);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.elements.userInput.value.trim();
    handleUserInput(input);
    e.target.elements.userInput.value = '';
  };

  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    console.log("Current user choices:", userChoices);
  }, [userChoices]);

  return (
    <div className='app'>
      <div className='chatbot'>
        <h1>Welcome to Triveni Museum</h1>
        <div className='conversation'>
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              <p>{msg.text}</p>
            </div>
          ))}
          <div ref={endOfMessagesRef} />
        </div>
        <div className='input-area'>
          {(step === 0) && (
            <div className="options">
              <button onClick={() => handleOptionClick("Yes, I want to purchase a ticket")}>
                Yes, I want to purchase a ticket
              </button>
              <button onClick={() => handleOptionClick("No, I want to know something else")}>
                No, I want to know something else
              </button>
            </div>
          )}
          {(step === -1 || step === -2) && (
            <div className="options">
              {step === -1 ? noOptions.map((option, index) => (
                <button key={index} onClick={() => handleOptionClick(option)}>
                  {option}
                </button>
              )) : subOptions[currentOption]?.map((option, index) => (
                <button key={index} onClick={() => handleOptionClick(option)}>
                  {option}
                </button>
              ))}
            </div>
          )}
          {step >= 1 && step <= 8 && step !== 2 && step !== 3 && (
            <form onSubmit={handleSubmit}>
              <input 
                type={step === 7 ? "date" : step === 8 ? "time" : "text"}
                name="userInput" 
                autoComplete="off" 
                required 
                placeholder="Type your response here"
              />
              <button type="submit">Send</button>
            </form>
          )}
          {(step === 2) && (
            <div className="options">
              {ageGroupOptions.map((option, index) => (
                <button key={index} onClick={() => handleOptionClick(option)}>
                  {option}
                </button>
              ))}
            </div>
          )}
          {(step === 3) && (
            <div className="options">
              {genderOptions.map((option, index) => (
                <button key={index} onClick={() => handleOptionClick(option)}>
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default chatBot;