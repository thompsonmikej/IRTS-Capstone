import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";

const GradeReport = () => {

    const [user, token] = useAuth();
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                let response = await axios.get('http://127.0.0.1:8000/api/grades/get/', {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                console.log('Success response in GradeReport', items)
                setItems(response.data);
            } catch (error) {
                console.log('Error in GradeReport', error);
            }
        };
        fetchItems();
    }, [token]);
    return (
        <><h2>Student Grade Report</h2><><><div>
            {   items.map((item) => (
                    <p key={item.id}>
                    {item.student} {item.course} {item.grade_received}  {item.credits_received}
                    </p>
                    ))}
            
            {console.log('Return in GradeReport', items)}
        </div>
        </></></>
    );
};

export default GradeReport;


