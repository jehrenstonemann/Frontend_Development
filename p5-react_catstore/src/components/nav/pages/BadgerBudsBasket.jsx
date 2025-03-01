import React, { useContext, useState, useEffect } from 'react';
import SavedBuddySummary from '../../SavedBuddySummary';
import BadgerBudsDataContext from '../../../contexts/BadgerBudsDataContext';

export default function BadgerBudsBasket(props) {
    const buds = useContext(BadgerBudsDataContext);
    const [newBuds, setNewBuds] = useState([])

    useEffect( () => {
        reloadBasket()
    }, [buds])

    // reload basket cats that are in savedCatIds
    // reload basket cats that are not in adopted
    function reloadBasket(){
        if(!sessionStorage.getItem("savedCatIds")){
            sessionStorage.setItem("savedCatIds", JSON.stringify([]))
        }
        const savedId = sessionStorage.getItem("savedCatIds")
        const temp = buds.filter(cat => savedId.includes(cat.id))
        if(!sessionStorage.getItem("adoptedCatIds")){
            sessionStorage.setItem("adoptedCatIds", JSON.stringify([]))
        }
        const adoptedIds = sessionStorage.getItem("adoptedCatIds")
        setNewBuds(temp.filter(cat => !adoptedIds.includes(cat.id)))
    }

    return <div className="row">
        <h1>Badger Buds Basket</h1>
        <p>These cute cats could be all yours!</p>
        {newBuds.length === 0 ? (
          <p>You have no buds in your basket!</p>  
        ) : (
            newBuds.map(buddy => (
                <SavedBuddySummary key={buddy.id} {...buddy} reloadBasket={reloadBasket}/>
            ))
        )}
    </div>
}