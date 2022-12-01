import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";

const CurrentCourses = () => {

    const [user, token] = useAuth();
    const [items, setItems] = useState([]);
// ${searchTerm}
    useEffect(() => {
        const fetchItems = async () => {
            try {
                let response = await axios.get('http://127.0.0.1:8000/api/courses/current/', {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                console.log('Success response in CurrentCourses', items)
                setItems(response.data);
            } catch (error) {
                console.log('Error in CurrentCourses', error);
            }
        };
        fetchItems();
    }, [token]);
    return (
        <><h2>Select Your Courses (Current Available)</h2><br/><><><div>
            {   items.map((item) => (
                    <><p key={item.id}>
                    {item.name}, COURSE CR {item.credit_value}
                </p></>
                    ))}
            
            {console.log('Return in CurrentCourses', items)}
        </div>
        </></></>
    );
};

export default CurrentCourses;


