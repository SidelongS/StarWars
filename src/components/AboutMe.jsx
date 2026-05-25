import {baseUrl, periodMonth} from "../utils/constants.js";
import {useEffect, useState} from "react";

const AboutMe = () => {
    const [hero, setHero] = useState(() => {
        const hero = JSON.parse(localStorage.getItem('hero'));
        if (hero && Date.now() - hero.timestamp < periodMonth) {
            return hero.payload;
        }
    });

    useEffect(() => {
        if (!hero) {
            fetch(`${baseUrl}/v1/peoples/1`)
                .then(response => response.json())
                .then(data => {
                    const info = {
                        'Name': data.name,
                        'Gender': data.gender,
                        'Birth Year': data.birth_year,
                        'Height': data.height,
                        'Mass': data.mass,
                        'Hair Color': data.hair_color,
                        'Skin Color': data.skin_color,
                        'Eye Color': data.eye_color
                    }
                    setHero(info);
                    localStorage.setItem('hero', JSON.stringify({
                        payload: info,
                        timestamp: Date.now()
                    }));
                })
        }
    }, [])

    return (
        <>
            {(!!hero) &&
                <div className="text-2xl leading-loose text-justify ms-5">
                    {Object.keys(hero).map(key => (
                        <p key={key}>
                            <span className="text-3xl">{key}:</span> {hero[key]}
                        </p>
                    ))}
                </div>
            }
        </>
    );
}

export default AboutMe;