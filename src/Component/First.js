import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import 'bootstrap';

export const First = () => {
    const [type, setType] = useState("");
    const navigate = useNavigate();
    const handleClick = () =>{
        navigate(`/number/${type}`);
    }
  return (
   <>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal1">Select Mode</button>

    <div class="modal fade" id="modal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Mode</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="easy" onChange={()=>{setType("easy")}} id="flexCheckChecked" checked={type=="easy"} />
                <label class="form-check-label" for="flexCheckChecked">
                    Easy
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="medium" id="flexCheckChecked1" onChange={()=>{setType("medium")}} checked={type=="medium"}/>
                <label class="form-check-label" for="flexCheckChecked">
                    Medium
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="hard" id="flexCheckChecked2" onChange={()=>{setType("hard")}} checked={type=="hard"}/>
                <label class="form-check-label" for="flexCheckChecked">
                    Hard
                </label>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" onClick={()=>{handleClick()}}>Next</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
        </div>
    </div>
    </div>
   </>
  )
}
