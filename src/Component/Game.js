import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from 'react-bootstrap/Card';
import './Game.css';
import ninehertz from '../Images/ninehertz.png';

export const Game = () => {
    const [count, setCount] = useState(0);
    const [data, setData] = useState({});
    const [color, setColor] = useState({});
    const [loading, setLoading] = useState({});
    const [type, setType] = useState("");
    const [show, setShow] = useState(false);
    const [modalLoading, setModalLoading] = useState(false)
    let number = 9;

    useEffect(() => {
        let dataObject = {};
        let loadingObj = {};
        let myColor = {};

        for (let i = 0; i < number; i++) {
          let key = String.fromCharCode(97 + i);
          let color = changeColor();
          dataObject[key] = i + 1;
          loadingObj[key]=false;
          myColor[key]=color;
        }    
        setData(dataObject);
        setLoading(loadingObj);
        setColor(myColor);

    }, []);

    function changeColor(){
        return Math.random().toString(16).substr(-6);
    }

    useEffect(() => {
        handleShow();
    }, []);



    function checkToast(count){
        toast(`${20-count} chances remaining`)
    }
    
    const handlePlay = () =>{
        let mySum = count;
        setCount(mySum+1);
        const newData = { ...data };
        let myColor={...color};

        Object.keys(loading).forEach((key) => {
          if (!loading[key]) {
            newData[key] = Math.floor(Math.random() * 10) + 1;
            myColor[key] = changeColor();
          }
        });
    
        setData(newData);
        setColor(myColor);

        if(type == "hard" && count>=7){
            checkToast(count);
        } else if(type == "easy" && count>=47){
            checkToast(count);
        } else if(type == "medium" && count>=17){
            checkToast(count);
        }


        if(checkObj(newData)){
            Swal.fire('Congratulations','You won the game.')
        }else if(type=="easy" && count==50){
            Swal.fire('Failure').then((res)=>{
                handleShow();
            });
        } else if(type=="medium" && count==20){
            Swal.fire('Failure').then((res)=>{
                handleShow();
            });
        } else if(type=="hard" && count==10){
            Swal.fire('Failure').then((res)=>{
                handleShow();
            });
        }
    }
    function checkObj(newData){
        let values = Object.values(newData);
        let firstValue = values[0];
        return values.every((value) => value === firstValue);
    }

    const handleLoad = (id) =>{
        setLoading((prev)=>({
            ...prev,
            [id]:true
        }))
    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSave = () => {
        if(type.length){
            setModalLoading(true);
            handleClose();
        }
    }
    
  return (
    <>
        <div>
            {!show && <div className='game' style={{backgroundColor: 'black', height: '100%'}}>
                <div className='row'>
                    {(Object.keys(data).length<=10 && type.length && modalLoading && !show) && Object.keys(data).map((key)=>(
                        <div className='col-lg-2 col-md-3 mt-3 mr-1 game-data' key={key} onClick={()=>{handleLoad(key)}}>
                            <Card style={{ width: '6rem', height: '6rem',marginRight: '1rem' ,marginLeft:'1rem',backgroundColor: `${loading[key] ? "#808080" : `#${color[key]}`}`}} >
            
                                <Card.Body>
                                    <Card.Text style={{color: 'white' ,textAlign: 'center', marginTop: '1rem'}}>
                                    {data[key]}
                                    </Card.Text>
                                </Card.Body>
            
            
                            </Card>
                        </div>
                    )) }
                <br/>
                </div>
                <div className='mt-3 game-play'>
                    {(Object.keys(data).length<=10 && type.length && modalLoading && !show) ?
                        <Card  style={{ width: '18rem', textAlign: 'center' }} onClick={()=>{handlePlay()}}>
                            <Card.Body>
                                <Card.Text>
                                    Play
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        : 
                    ""}
                </div>
            </div>}
        </div>
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
            <Modal.Title>Select Level</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={()=>{handleSave()}}>
                    Save
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        <ToastContainer />  
    </>
  )
}
