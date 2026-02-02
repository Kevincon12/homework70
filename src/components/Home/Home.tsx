import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../app/store.ts";
import {fetchContacts, deleteContact} from "../../features/contactsSlice.ts";
import {useNavigate} from "react-router-dom";
import type { Contact } from '../../features/contactsSlice.ts';

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items, loading } = useSelector((state: RootState) => state.contacts);

    const [showModal, setShowModal] = useState(false);
    const [contactToDelete, setContactToDelete] = useState<string | null>(null);
    const [selectedContactForModal, setSelectedContactForModal] = useState<Contact | null>(null);

    const navigate = useNavigate();

    const openModal = (contact: Contact) => {
        setSelectedContactForModal(contact);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedContactForModal(null);
        setShowModal(false);
    };


    useEffect(() => {
        dispatch(fetchContacts())
    }, [dispatch]);

    const noPhotoUrl = 'https://media.istockphoto.com/id/887464786/vector/no-cameras-allowed-sign-flat-icon-in-red-crossed-out-circle-vector.jpg?s=612x612&w=0&k=20&c=LVkPMBiZas8zxBPmhEApCv3UiYjcbYZJsO-CVQjAJeU='

    const contactDelete = async () => {
        if (selectedContactForModal) {
            await dispatch(deleteContact(selectedContactForModal.id));
            closeModal();
        }
    };

    const handleEdit = () => {
        if (selectedContactForModal) {
            navigate(`/contact/${selectedContactForModal.id}`);
            closeModal();
        }
    };


    return (
        <div className="container mt-3">
            <h2>Contacts List</h2>

            {loading && (
                <div className="d-flex justify-content-center my-4">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            {!loading && items.length === 0 && <p>No contacts found for now. Please add contacts.</p>}

            {!loading && items.length > 0 && (
                <ul className="list-group">
                    {items.map((contact, index) => (
                        <li
                            key={contact.id || index}
                            className="list-group-item d-flex align-items-center"
                            onClick={() => openModal(contact)}
                        >
                            <img
                                src={contact.photo || noPhotoUrl}
                                alt={contact.name}
                                className="rounded-circle me-3"
                                width={50}
                                height={50}
                            />
                            <span>{contact.name}</span>
                        </li>
                    ))}
                </ul>
            )}


            {showModal && selectedContactForModal && (
                <div
                    className="modal fade show d-block"
                    tabIndex={-1}
                    role="dialog"
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                    onClick={closeModal}
                >
                    <div
                        className="modal-dialog"
                        role="document"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{selectedContactForModal.name}</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body text-center">
                                <img
                                    src={selectedContactForModal.photo || noPhotoUrl}
                                    alt={selectedContactForModal.name}
                                    className="rounded mb-3"
                                    width={100}
                                    height={100}
                                />
                                <p><strong>Phone:</strong> {selectedContactForModal.phone}</p>
                                <p><strong>Email:</strong> {selectedContactForModal.email}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                    Close
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleEdit}>
                                    Edit
                                </button>
                                <button type="button" className="btn btn-danger" onClick={contactDelete}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}



        </div>
    )
}

export default Home;