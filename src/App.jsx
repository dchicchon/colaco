import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
// import Admin from './pages/Admin/Admin';
// import SodaPage from './pages/SodaPage/SodaPage';
import { SodaProvider, useDispatchContext } from './utils/SodaContext';
import { initDB } from './utils/db';

import styles from './App.module.css';
import { SET_VERSION } from './utils/actions';

function Root() {
  const dispatch = useDispatchContext();
  useEffect(() => {
    initDB().then((version) => {
      dispatch({ type: SET_VERSION, payload: version });
    });
  }, []);
  return (
    <div className={styles.App}>
      <Navbar />
      <Outlet />
    </div>
  );
}

// function MainApp() {
//   return (
//     <Routes>
//       <Route path="/" element={<Root />}>
//         <Route path="" element={<SodaPage />} />
//         <Route path="/admin" element={<Admin />} />
//       </Route>
//     </Routes>
//   );
// }

function App() {
  return (
    <SodaProvider>
      <Root />
    </SodaProvider>
  );
}

export default App;
