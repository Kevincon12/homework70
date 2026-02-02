import './App.css'
import {Route, Routes} from "react-router-dom";
import Toolbar from "./components/Toolbar/Toolbar.tsx";
import Home from "./components/Home/Home.tsx";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage.tsx";

const App = () => (
    <>
        <Toolbar/>
        <Routes>
            <Route path='/' element={<Home />} />
            {/*<Route path='/contact/:id' element={<EditContact />} />*/}
            <Route path='/*' element={<NotFoundPage />} />
        </Routes>
    </>
);

export default App
