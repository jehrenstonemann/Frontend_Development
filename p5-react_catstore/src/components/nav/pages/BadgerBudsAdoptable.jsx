import React, { useContext, useState, useEffect } from 'react';
import BadgerBudSummary from '../../BadgerBudSummary';
import BadgerBudsDataContext from '../../../contexts/BadgerBudsDataContext';

export default function BadgerBudsAdoptable(props) {
    const buds = useContext(BadgerBudsDataContext);
    const [newBuds, setNewBuds] = useState([])

    useEffect( () => {
        reloadAvailable()
    }, [buds]);

    // reload available cats that are not in savedCatIds
    // reload available cats that are not in adoptedCatIds
    function reloadAvailable() {
        if(!sessionStorage.getItem("savedCatIds")){
            sessionStorage.setItem("savedCatIds", JSON.stringify([]))
        }
        const savedId = sessionStorage.getItem("savedCatIds")
        const temp = buds.filter(cat => !savedId.includes(cat.id))
        if(!sessionStorage.getItem("adoptedCatIds")){
            sessionStorage.setItem("adoptedCatIds", JSON.stringify([]))
        }
        const adoptedIds = sessionStorage.getItem("adoptedCatIds")
        setNewBuds(temp.filter(cat => !adoptedIds.includes(cat.id)))
    }

    return (
        <div className="row">
            <h1>Available Badger Buds</h1>
            <p>The following cats are looking for a loving home! Could you help?</p>
            {newBuds.length === 0 ? (
                 <p>No buds are available for adoption!</p>
            ) : (newBuds.map(buddy => (
                    <BadgerBudSummary key={buddy.id} {...buddy} reloadAvailable={reloadAvailable}/>
                ))
            )}
        </div>
    );
}