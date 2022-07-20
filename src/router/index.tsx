import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Sign, Home } from '../screens';

const MainRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign" element={<Sign />} />
      </Routes>
    </Router>
  );
};

export default MainRouter;
