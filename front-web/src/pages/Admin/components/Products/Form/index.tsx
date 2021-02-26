import { makeRequest } from 'core/utils/request';
import React, { useState } from 'react';
import BaseForm from '../../BaseForm';
import './styles.scss';

type FormState = {
    name: string;
    price: string;
    category: string;
    description: string;
}

type FormEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>

const Form = () => {
    const [formData, setFormData] = useState<FormState>({
        name: '',
        price: '',
        category: '1',
        description: ''
    });

    const handleOnChange = (event: FormEvent) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData(data => ({ ...data, [name]: value }));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = {
            ...formData,
            imgUrl: 'data:image/jpeg;base64,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qj5g7qcEtDzqj5g7qDjnlSo6TU9ol7y98q1HSantEveXYuCWh51R8wd1e8E1Dzqj5g7qDjoyrUdJqO0S95e+VKjpNT2iXvLsPBNQ86o+YO6nBPRc6o+YO6g495UqOk1PaJe8nlSo6TU9ol7y7FwT0XOqPmDurzgnoudUfMHdQce8qVHSajtEveTypUdJqO0S95di4J6LnVHzB3U4J6HnVHzB3UHHfKlR0mo+fJ3kOVKjpFR2iXvLsXBPRc6o+YO6nBPRc6o+YO6g455UqOk1HaJe8vPKlR0mo7RL3l2PgnoedUfMHdTgmoedUfMHdQcc8q1HSantEveXnlWo6TU9ol7y7JwS0POqPmDupwS0POqPmDuoONnKtR0mp7RL3l55WqOk1PaJe8uy8EtDzqj5g7qcEtDzqj5g7qDjHlao6TU9ol7ypdleo6TU9ol7y7RwR0O2o+YO6nBHQ7aj5g7qDirssVNj/eanC/8AmJe8rXy7VdKqe0S95d04IqDnVHzB9lRwPZP2z/MH2QcSGV6m3+Jqu0zd5d08DVQ+TJwdK973b9OM57i91gRYZziSreTwO0BBAfUNJBs4SA2Oo2LbFbXuS3Nx0FO2nic94Bc4vfa7nO0mwwHsQZm6L2yKj1ERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREH//2Q==',
            categories: [{ id: formData.category }]
        }

        makeRequest({ url: '/products', method: 'POST', data: payload }).then(() => {
            setFormData({ name: '', category: '', price: '', description: '' });
        });

    }

    return (
        <form onSubmit={handleSubmit}>
            <BaseForm title="cadastrar um produto">
                <div className="row">
                    <div className="col-6">
                        <input
                            value={formData.name}
                            name="name"
                            type="text"
                            className="form-control mb-5"
                            onChange={handleOnChange}
                            placeholder="Nome do produto"
                        />
                        <select
                            value={formData.category}
                            className="form-control mb-5" onChange={handleOnChange}
                            name="category"
                        >
                            <option value="1">Livros</option>
                            <option value="3">Computadores</option>
                            <option value="2">Eletrônicos</option>
                        </select>
                        <input
                            value={formData.price}
                            name="price"
                            type="text"
                            className="form-control"
                            onChange={handleOnChange}
                            placeholder="Preço"
                        />
                    </div>
                    <div className="col-6">
                        <textarea 
                            name="description"
                            value={formData.description}
                            onChange={handleOnChange}
                            className="form-control"
                            cols={30} 
                            rows={10} 
                        />
                    </div>
                </div>
            </BaseForm>
        </form>
    );
}

export default Form;