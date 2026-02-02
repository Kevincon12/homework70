import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import type { AppDispatch, RootState } from '../../app/store.ts'
import { fetchContactById, saveContact } from '../../features/contactsSlice.ts'


const EditContact = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [photo, setPhoto] = useState('');

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();
    const { selectedContact, loading } = useSelector((state: RootState) => state.contacts);

    const noPhotoUrl = 'https://media.istockphoto.com/id/887464786/vector/no-cameras-allowed-sign-flat-icon-in-red-crossed-out-circle-vector.jpg?s=612x612&w=0&k=20&c=LVkPMBiZas8zxBPmhEApCv3UiYjcbYZJsO-CVQjAJeU=';

    useEffect(() => {
        if (id) {
            dispatch(fetchContactById(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (selectedContact) {
            setName(selectedContact.name);
            setPhone(selectedContact.phone);
            setEmail(selectedContact.email);
            setPhoto(selectedContact.photo);
        }
    }, [selectedContact]);

    const sendContactToApi = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await dispatch(saveContact({ id, name, phone, email, photo })).unwrap();
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <h1>{id ? 'Edit Contact' : 'Add New Contact'}</h1>

            {loading && (
                <div className="d-flex justify-content-center my-4">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            <form onSubmit={sendContactToApi}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Photo</label>
                    <input
                        type="text"
                        className="form-control"
                        value={photo}
                        onChange={(e) => setPhoto(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Preview</label>
                    <div>
                        <img src={photo || noPhotoUrl} alt={name} width={100} height={100} />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary m-3">Save</button>
                <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Back to contacts</button>
            </form>
        </div>
    );
};


export default EditContact;