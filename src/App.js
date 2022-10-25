import './App.css';

import { useState } from 'react';

function App() {
    const [inputValue, setinputValue] = useState("");
    const updateInputValue = (evt) => {
        setinputValue(evt.target.value);
    }
    const [rdmNumber, setRdmNumber] = useState(Math.floor(Math.random() * 100));
    const [propositions, setPropositions] = useState([]);
    const [message, setMessage] = useState("Entrez un nombre entre 0 et 100");
    const [status, setStatus] = useState(false);
    const onSubmit = (evt) => {
        evt.preventDefault();
        if (inputValue > 100 || inputValue < 0 || inputValue === "") {
            setMessage("Entrez un nombre entre 0 et 100");
            setinputValue(0);
            return;
        }
        const parsedInt = parseInt(inputValue);
        if (propositions.length < 10) {
            setPropositions([...propositions, parsedInt]);
            setinputValue(0);   
        }
        if (parsedInt === rdmNumber) {
            setMessage("Bravo, vous avez trouvé le nombre mystère ! en " + (propositions.length + 1) + " coups");
            setStatus(2);
        } else if (parsedInt < rdmNumber) {
            setMessage("Le nombre mystère est plus grand");
            setStatus(1);
        } else if (parsedInt > rdmNumber) {
            setMessage("Le nombre mystère est plus petit");
            setStatus(1);
        }
    }
    const onReset = (evt) => {
        evt.preventDefault();
        setPropositions([]);
        setRdmNumber(Math.floor(Math.random() * 100));
        setMessage("Entrez un nombre entre 0 et 100");
        setStatus(false);
    }
  return (
    <div className="App">
          <div className="row">
            <div className="col">
            </div>
            <div className="col-sm-8">
                <div className='py-5'>
                    <div>
                        <span>Entrer une proposition</span>
                        <input className='mx-3' type="number" value={inputValue} onChange={updateInputValue} min="0" max="100"/>
                        {propositions.length < 10 && status !== 2 ? <button className='btn btn-primary' onClick={onSubmit}>Envoyer la proposition</button> : <button className='btn btn-primary' onClick={onReset}>Relancer une partie</button> }
                    </div>
                    <div className='my-2'>
                        {propositions.length !== 0 && <span>Proposition précédentes :</span>}
                        {
                            propositions.map((proposition, index) => {
                                return <span key={index}>{index !== 0 && ','} {proposition}</span>
                            })
                        }
                    </div>
                    {status === 1 && <p className='bg-danger'>Faux !</p> }
                    {status === 2 &&  <p className='bg-success'>Vrai !</p>}
                    <p>{message}</p>
                </div>  
            </div>
            <div className="col">
            </div>
        </div>
    </div>
  );
}

export default App;
