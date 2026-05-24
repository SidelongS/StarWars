import '../Contact.css';
import {baseUrl, periodMonth} from "../utils/constants.js";
import {useEffect, useState} from "react";

const Contact = () => {
    const [planets, setPlanets] = useState(() => {
        const planets = JSON.parse(localStorage.getItem('planets'));
        if (planets && ((Date.now() - planets.time) < periodMonth)) {
            return planets.payload;
        } else {
            return ['wait...']
        }
    });

    useEffect(() => {
        const getPlanets = async () => {
            const res = await fetch(`${baseUrl}/v1/planets`);
            const data = await res.json();
            const planets = data.map(item => item.name);
            setPlanets(planets);
            localStorage.setItem('planets', JSON.stringify({
                payload: planets,
                time: Date.now()
            }));
        }

        if (planets.length === 1){
            getPlanets().then(() => console.log('Planets were loaded'));
        }
        return () => console.log('Contact component unmounted');
    }, [])

    return (
        <form className="container" onSubmit={e => {
            e.preventDefault();
        }}>
            <label>First Name
                <input type="text" name="firstname" placeholder="Your name.."/>
            </label>
            <label>Last Name
                <input type="text" name="lastname" placeholder="Your last name.."/>
            </label>
            <label>Planet
                <select name="planet">
                    {planets.map(item => <option value={item} key={item}>{item}</option>)}
                </select>
            </label>

            <label>Subject
                <textarea name="subject" placeholder="Write something.."></textarea>
            </label>
            <button type="submit">Submit</button>
        </form>
    )
}

export default Contact;