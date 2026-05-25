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

        if (planets.length === 1) {
            getPlanets().then(() => console.log('Planets were loaded'));
        }
        return () => console.log('Contact component unmounted');
    }, [])

    const inputClass = "w-full p-3 border border-gray-300 rounded mt-1.5 mb-4 box-border resize-y";
    const labelClass = "w-full text-red-500/50 flex flex-col";

    return (
        <form
            className="rounded bg-gray-100 p-5"
            onSubmit={e => e.preventDefault()}
        >
            <label className={labelClass}>First Name
                <input className={inputClass} type="text" name="firstname" placeholder="Your name.."/>
            </label>
            <label className={labelClass}>Last Name
                <input className={inputClass} type="text" name="lastname" placeholder="Your last name.."/>
            </label>
            <label className={labelClass}>Planet
                <select className={inputClass} name="planet">
                    {planets.map(item => <option value={item} key={item}>{item}</option>)}
                </select>
            </label>
            <label className={labelClass}>Subject
                <textarea className={`${inputClass} h-48`} name="subject" placeholder="Write something.."></textarea>
            </label>
            <button
                type="submit"
                className="bg-[#04AA6D] text-white py-3 px-5 border-none rounded cursor-pointer hover:bg-[#45a049]"
            >
                Submit
            </button>
        </form>
    )
}

export default Contact;