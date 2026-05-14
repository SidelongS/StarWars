import Friend from "./Friend.jsx";

import friend1 from '../assets/friend1.jpg'
import friend2 from '../assets/friend2.jpg'
import friend3 from '../assets/friend3.jpg'
import friend4 from '../assets/friend4.jpg'
import friend5 from '../assets/friend5.jpg'
import friend6 from '../assets/friend6.jpg'
import friend7 from '../assets/friend7.jpg'
import friend8 from '../assets/friend8.jpg'
import friend9 from '../assets/friend9.jpg'

const friends = [
    friend1,
    friend2,
    friend3,
    friend4,
    friend5,
    friend6,
    friend7,
    friend8,
    friend9
]

const DreamTeam = () => {
    return (
        <section className="float-end w-50 row border border-warning rounded-bottom-5 ms-1 me-0">
            <h2 className="text-center">Dream team</h2>

            {friends.map((friend, index) => {
                let extraClass = '';

                if (index === 6) extraClass = 'rounded-bottom-left';
                if (index === 8) extraClass = 'rounded-bottom-right';

                return (
                    <Friend
                        key={index}
                        image={friend}
                        extraClass={extraClass}
                    />
                )
            })}
        </section>
    )
}

export default DreamTeam;