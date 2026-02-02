import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../app/store.ts";
import {fetchContacts} from "../../features/contactsSlice.ts";

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items, loading } = useSelector((state: RootState) => state.contacts);

    useEffect(() => {
        dispatch(fetchContacts())
    }, [dispatch]);

    const noPhotoUrl = 'https://media.istockphoto.com/id/887464786/vector/no-cameras-allowed-sign-flat-icon-in-red-crossed-out-circle-vector.jpg?s=612x612&w=0&k=20&c=LVkPMBiZas8zxBPmhEApCv3UiYjcbYZJsO-CVQjAJeU='

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
        </div>
    )
}

export default Home;