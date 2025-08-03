import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { getUserResults } from "../../store/eventResults/results-action";
import { getUserRegistrations } from "../../store/registration/registration-actions";

import c from "./Profile.module.css";

const Profile = () => {
    const user = JSON.parse(sessionStorage.getItem("user")); 
    const dispatch = useDispatch();
    
    const { userResults } = useSelector((state) => state.results);
    const { userRegistrations } = useSelector((state) => state.participant);

    // console.log(userResults);
    // console.log(userRegistrations);

    useEffect(() => {
        if (user?.id) {
            dispatch(getUserRegistrations(user.id));
            dispatch(getUserResults(user?.id));
        }
    }, [dispatch,user?.id]);

    return (
        <div className={c.profilecontainer}>
            <h2>Welcome, {user?.name}</h2>

            <section className={c.profilesection}>
                <h3>Registered Events</h3>
                {userRegistrations?.length ? (
                    <ul>
                        {userRegistrations.map((reg) => (
                            <li key={reg.id}>
                                <p><span className={c.eventName}>{reg.event_name} </span>— {reg.category}</p>
                                <p><span className={c.eventName}>Registered date</span>— 
                                    {" "}{format(new Date(reg.registration_date), 'MMM dd, yyyy')}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>You haven't registered for any events yet.</p>
                )}
            </section>

            <section className={c.profilesection}>
                <h3>Your Results</h3>
                {userResults?.length ? (
                    <ul>
                        {userResults.map((result) => (
                            <li key={result.result_id}>
                                <span className={c.eventName}>{result.event_name}</span>: {result.status} – Rank #
                                {result.ranking || "N/A"}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No results found yet.</p>
                )}

                <p><h4>NOTE:</h4> Some results may not be visible as it hasn,t been updated</p>
            </section>
        </div>
    );
};

export default Profile;
