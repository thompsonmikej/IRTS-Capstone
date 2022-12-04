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
        <><h1>Available at Your Grade Level</h1><br/><><><div>
            {   items.map((item) => (
                    <><div key={item.id}>
                    <hr />
                    <span>COURSE: {item.name} | </span>
                    <span>CREDIT VALUE: {item.credit_value}</span>
                    
                </div></>
                    ))}
            
            {console.log('Return in CurrentCourses', items)}
        </div>
        </></></>
    );
};

export default CurrentCourses;


