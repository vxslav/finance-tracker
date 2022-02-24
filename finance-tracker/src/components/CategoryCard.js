import styles from "./styles/categoryBox_module.css";
import styled from "styled-components";
import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { HexColorPicker } from "react-colorful";
import { useDispatch, useSelector } from "react-redux";
import { editExpenseColor, editIncomeColor } from "../redux/actions/userActions";
import Paper from '@mui/material/Paper';


export default function CategoryCard(props) {
    const [open, setOpen] = React.useState(false);
    const [color, setColor] = React.useState("#fff");
    const user = useSelector(state => state.userData.user);
    const dispatch = useDispatch();

    const handleClose = () => {
        setOpen(false);
    }

    const handleClick = () => {
        setOpen(true);
    }

    const handleEditColor = () => {
        if(props.type === "Income"){
            dispatch(editIncomeColor(user, color, props.label));
        }
        else{
            dispatch(editExpenseColor(user, color, props.label));
        }
        setOpen(false);
    }

    return (
        <>
            <StyledPaper  className="boxContainer">
                <CategoryHeading>{props.label}</CategoryHeading>
                <div className="increaseBox">
                    <ColorCard onClick={handleClick} color={props.color}/>
                </div>
            </StyledPaper>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h5>Change Category Color</h5>
                    <HexColorPicker color={color} onChange={setColor}/>
                    <Button style={{width: "180px", marginTop: "20px"}} variant="contained" onClick={handleEditColor}>Edit Color</Button>
                </Box>
            </Modal>
        </>
    );
}

const CategoryHeading = styled.h4`
    color : rgb(68, 18, 96);
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 600;
`
const StyledPaper = styled(Paper)`
   
    background: #A1FFCE;
    background: -webkit-linear-gradient(to right, #FAFFD1, #A1FFCE);
    background: linear-gradient(to right, #FAFFD1, #A1FFCE);
    border-radius: 20px;
    box-shadow: 2px 3px 10px rgba(68, 18, 96, .2);
    width: 190px;
    height: 190px;
    border: none;
    margin-right: 21px;
`
const ColorCard = styled.span`
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 5px;
    background-color: ${props => props.color};
    transition: width 1s, height 1s;
    &:hover{
      width: 70px;
      height: 70px;
      cursor: pointer;
    }
`;

const style = {
    position: 'absolute',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "200px",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };