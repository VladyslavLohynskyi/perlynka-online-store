import React, { useEffect, useState } from 'react';
import { EditShoesModalType } from './EditShoesModalType';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './EditShoesModal.scss';
import { ModalHeader } from '../../components/ModalHeader';
import { ModalInput } from '../../components/ModalInput';
import { IconButton } from '../../../../../ui/IconButton';
import { getShoesById } from '../../../../../../http/shoes';
import { IShoes } from '../../../../../../store/reducers/shoes/ShoesSlice';
import { AxiosError } from 'axios';


export const EditShoesModal: React.FC<EditShoesModalType> = ({
   onClose,
}) => {
    const [id , setId] = useState<number>(0)
    const [error, setError ] = useState("")
    const [foundShoes, setFoundShoes] = useState<null|IShoes>(null)
    const [model, setModel] = useState("");
    const [price, setPrice] = useState(0);
    useEffect(()=>{
        if(foundShoes){
            setModel(foundShoes.model)
            setPrice(foundShoes.price)
        }
    },[foundShoes])

    const handleSubmitId = async () => {
        setError("")
        setFoundShoes(null)
        getShoesById(id).then((data)=>setFoundShoes(data)).catch(e=>setError(e.response.data))
    }
   return  (   
    <div className='edit-shoes-modal__container'>
        <ModalHeader text='Редагувати Взуття' onClose={onClose}/>
        <div  className='edit-shoes-modal__main'>
            <form className="edit-shoes-modal__search">
                <ModalInput
                    text='Індефікатор'
                    placeholder='Введіть ID'
                    type="number"
                    required={true}
                    value={id}
                    onChange={e=>setId(Number(e.target.value))}
                 min={1}
                />
                <IconButton onClick={handleSubmitId} icon={faSearch} style={{marginTop:"10px"}}/>
            </form>
            {error && <p className='edit-shoes-modal__error'>{error}</p>}
            {foundShoes && 
            <form>
                <ModalInput
                text='Модель'
                placeholder='Введіть назву моделі'
                value={model}
                onChange={e=>setModel(e.target.value)}
                />
                <ModalInput
                text='Ціна'
                placeholder='Введіть Ціну'
                value={price}
                onChange={e=>setPrice(Number(e.target.value))}
                min={1}
                />
            </form>}
        </div>
    </div>
    )
};
