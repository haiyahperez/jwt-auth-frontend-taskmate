import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useOutletContext, useParams } from 'react-router-dom';

import "./GoalForm.css";

const GoalForm = () => {
    const API = import.meta.env.VITE_BASE_URL; 
    const Navigate = useNavigate();
    const { user } = useOutletContext();

    const [goalForm, setGoalForm] = useState({
        user_id: user.id,
        title: '',
        description: '',
        specific: '',
        measure: '',
        attain: '',
        relevant: '',
        timely: '',
        cat_id: ''
    });

    const [toggleDelete, setToggleDelete] = useState(false);

    const { id } = useParams();

    

    if (id) {
        console.log(id)
        useEffect(() => {
            fetch(`${API}/task/form/${id}`)
                .then((res) => res.json())
                .then((data) => setGoalForm(data[0]));
        }, []);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setGoalForm({ ...goalForm, [name]: value });
    };
    
    const handleRadioChange = (event) => {
        setGoalForm({...goalForm, cat_id: parseInt(event.target.value)})
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
                    body: JSON.stringify({ ...goalForm }) 
                });
            } else {
                response = await fetch(`${API}/task`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ ...goalForm }) 
                });
            }
    
            if (response.ok) {
                Navigate('/dashboard');
                console.log(goalForm)
            } else {
                console.error('Error submitting form:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleDelete = () => {
        fetch(`${API}/task/task/form/${id}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res) => Navigate("/dashboard"));

    }
    return (
        <div>
            { id && <div>
            <button onClick={() => setToggleDelete(true)}>
                Delete
            </button>
            {toggleDelete && (
                        <div className="modal-overlay">
                            <div className="modal">
                                <p>Are you sure you want to delete this form?</p>
                                <div>
                                    <button onClick={() => setToggleDelete(false)}>Cancel</button>
                                    <button onClick={handleDelete}>Delete</button>
                                </div>
                            </div>
                        </div>
                    )}
            </div>}
        <div className='flex justify-center'>
        <form onSubmit={handleSubmit} className="bg-amber-300 grid grid-col-1 w-96">
            <div className='grid grid-rows-8'>
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
            <div className="flex flex-row justify-around">
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
             </div>
            <button className="w-3/4 mx-auto mb-3" type="submit">Save</button>
            </div>
        </form>
        </div>
    </div>
    );
};

export default GoalForm;
