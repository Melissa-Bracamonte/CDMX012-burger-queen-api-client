import { useState, useEffect } from "react";
import styles from "./popup.module.css";


export function Popup(props) {
    const { attrProduct } = props;
    //const myVariable = props.attrProduct;

    const [inputsModal, setInputsModal] = useState(attrProduct);
    useEffect(() => {
        setInputsModal(attrProduct);
    }, [attrProduct]);
    
    const areaEditChange = e =>{
        const {id, value} = e.target;
        const newValue = {...inputsModal, [id]: value};
        setInputsModal(newValue);
    }


    const saveProduct =product => async (e) => {
        e.preventDefault();
        if(product && product.id){
            // Hacer PUT
            fetch(`http://localhost:3004/Products/${product.id}`,{
                method: 'PUT',
                headers: { 
                    'content-type': 'application/json',
                },
                body:JSON.stringify(inputsModal)
            })
            .then(response => response.json())
            .then(addedProduct => {
                console.log(addedProduct)
                props.onClickCloseModal();
            });
        }else{
            // Hacer POST
            product = inputsModal;
            fetch('http://localhost:3004/Products',{
                method: 'POST',
                headers: { 
                    'content-type': 'application/json',
                },
                body:JSON.stringify(product)
            })
            .then(response => response.json())
            .then(addedProduct => {
                console.log(addedProduct)
                props.onClickCloseModal();
            });
        }  
    }

    return(
        props.visible ?
        <>
            {/* <!-- The Modal --> */}
            <div id="myModal" className={styles.modal}>

                {/* <!-- Modal content --> */}
                <div className={styles.modalContent}>
                    <span className={styles.close} onClick={props.onClickCloseModal}>&times;</span>
                    <section className={styles.titleModal}>New product</section>
                    <input className={styles.inputModal} id="name" onChange={areaEditChange} placeholder="Product Name" defaultValue={props.attrProduct?.name}></input>
                    <input className={styles.inputModal} id="price" onChange={areaEditChange} placeholder="Price" defaultValue={props.attrProduct?.price}></input>
                    <input className={styles.inputModal} id="category" onChange={areaEditChange} placeholder="Category" defaultValue={props.attrProduct?.category}></input>
                    <section className={styles.areaSaveButton}>
                        <button className={styles.saveEditButton} onClick={saveProduct(props.attrProduct)} > 
                            Save
                        </button>
                    </section>
                </div>
            </div>
        </>
        : null
    );
}