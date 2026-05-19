import {useEffect, useState} from "react";
import {baseUrl} from "../utils/constants.js";

const AboutMe = () => {
    const [person, setPerson] = useState();

    useEffect(() => {
        fetch(`${baseUrl}/v1/peoples/1`)
            .then(res => res.json())
            .then(data => setPerson(data))
            .catch(() => setPerson('Error loading About Me'));
        return () => console.log('About Me was unmounted');
    }, []);

    if (!person) {
        return (
            <p className="far-galaxy fs-2 lh-2">
                <span className="spinner-border"></span>
                Loading <span className="spinner-grow spinner-grow-sm">...</span>
            </p>
        );
    }
    return (
        <div className="far-galaxy fs-2 lh-2">
            <p><b>Name:</b> {person.name}</p>
            <p><b>Gender:</b> {person.gender}</p>
            <p><b>Skin Color:</b> {person.skin_color}</p>
            <p><b>Hair Color:</b> {person.hair_color}</p>
            <p><b>Height:</b> {person.height}</p>
            <p><b>Eye Color:</b> {person.eye_color}</p>
            <p><b>Mass:</b> {person.mass}</p>
            <p><b>Homeworld:</b> {person.homeworld}</p>
            <p><b>Birth year:</b> {person.birth_year}</p>
        </div>
    )
}
 
export default AboutMe;