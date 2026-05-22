import {baseUrl, periodMonth} from "../utils/constants.js";
import {useEffect, useState} from "react";
import "../Contact.css";

const Contact = () => {
    const [planets, setPlanets] = useState(() => {
        const planets = JSON.parse(localStorage.getItem("planets"));
        if (planets && Date.now() - planets.timestamp < periodMonth) {
            return planets.payload;
        }
    });

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        planet: "",
        subject: "",
    });

    useEffect(() => {
        if (!planets) {
            fetch(`${baseUrl}/v1/planets/`)
                .then((response) => response.json())
                .then((data) => {
                    const planetNames = data.map((planet) => planet.name);
                    setPlanets(planetNames);
                    localStorage.setItem("planets", JSON.stringify({
                        payload: planetNames,
                        timestamp: Date.now()
                    }));
                });
        }
    }, []);
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        alert("Message sent!");
    };
    return (
        <div className="contact-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Your name.."
                    value={formData.firstName}
                    onChange={handleChange}
                />

                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Your last name.."
                    value={formData.lastName}
                    onChange={handleChange}
                />

                <label htmlFor="planet">Planet</label>
                <select
                    id="planet"
                    name="planet"
                    value={formData.planet}
                    onChange={handleChange}
                >
                    <option value="">Select a planet</option>
                    {planets && planets.map((planet) => (
                        <option key={planet} value={planet}>
                            {planet}
                        </option>
                    ))}
                </select>

                <label htmlFor="subject">Subject</label>
                <textarea
                    id="subject"
                    name="subject"
                    placeholder="Write something.."
                    value={formData.subject}
                    onChange={handleChange}
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Contact;