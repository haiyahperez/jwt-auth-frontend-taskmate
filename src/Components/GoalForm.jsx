import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from './ProtectedRoute'; 

const GoalForm = () => {
    const API = import.meta.env.VITE_BASE_URL; 
    const navigate = useNavigate();
    const { user } = useAuth();

    const [goalForm, setGoalForm] = useState({
        title: '',
        description: '',
        specific: '',
        measure: '',
        attain: '',
        relevant: '',
        timely: '',
        cat_id: ''
    });

    const { id } = useParams();

    if (id) {
        useEffect(() => {
            fetch(`${API}/task/${id}`)
                .then((res) => res.json())
                .then((data) => setGoalForm(data[0]));
        }, []);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setGoalForm({ ...goalForm, [name]: value });
    };
    
    const handleRadioChange = (event) => {
        setGoalForm({...goalForm, cat_id: event.target.value})
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        let response;
        try {
            if (id) {
                response = await fetch(`${API}/task`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ ...goalForm, user_id: user.id }) 
                });
            } else {
                response = await fetch(`${API}/task`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ ...goalForm, user_id: user.id }) 
                });
            }
    
            if (response.ok) {
                navigate('/task');
            } else {
                console.error('Error submitting form:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input
                    type="text"
                    name="title"
                    value={goalForm.title}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Specific: What do I want to happen?
                <textarea
                    name="specific"
                    value={goalForm.specific}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Measure: How will I know I have achieved my goal?
                <textarea
                    name="measure"
                    value={goalForm.measure}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Attainable: Is the goal realistic and how will I accomplish it?
                <textarea
                    name="attain"
                    value={goalForm.attain}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Relevant: Why is my goal important to me?
                <textarea
                    name="relevant"
                    value={goalForm.relevant}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Timely: What is my deadline for this goal?
                <input
                    name="timely"
                    value={goalForm.timely}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Additional Notes:
                <input
                    name="description"
                    value={goalForm.description}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                <input 
                    type="radio" 
                    id="1" 
                    name="category" 
                    value={1}
                    onChange={handleRadioChange}
                    checked={goalForm.cat_id === 1}
                />
                Red
            </label>
            <label>
                <input 
                    type="radio" 
                    id="2" 
                    name="category" 
                    value={2}
                    onChange={handleRadioChange}
                    checked={goalForm.cat_id === 2}
                />
                Yellow
            </label>
            <label>
                <input 
                    type="radio" 
                    id="green" 
                    name="category" 
                    value={3}
                    onChange={handleRadioChange}
                    checked={goalForm.cat_id === 3}
                />
                Green
             </label>

            <button type="submit">Save</button>
        </form>
    );
};

export default GoalForm;
