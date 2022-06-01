import React from "react";
import { useGlobalContext } from "./context";

const Modal = () => {
	const { closeModal, questions, correct, isModalOpen } = useGlobalContext();

  const heading = () => {
    let headingText = "Congrats"
    const resultPercentage = ((correct / questions.length) * 100).toFixed(0)
    if (resultPercentage >= 90){
      headingText = "AMAZING!!"
    } else if (resultPercentage >= 75 ){
      headingText = "Nicely done!"
    } else if (resultPercentage >= 60 ){
      headingText = "Not bad!"
    } else if (resultPercentage >= 50){
      headingText = "Ouch. Better luck next time!"
    } else if (resultPercentage < 50){
      headingText = "Oof."
    }
    return headingText;
  }

	return (
		<div className={isModalOpen ? "modal-container isOpen" : "modal-container"}>
			<div className='modal-content'>
				<h2>{heading()}</h2>
				<p>
					Your score is { (( correct / questions.length ) * 100).toFixed(0)}%!
				</p>
				<button	className="close-btn" onClick={closeModal}>X</button>
			</div>
		</div>
	);
};

export default Modal;
