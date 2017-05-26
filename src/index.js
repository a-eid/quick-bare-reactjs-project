import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render( <div>
  <App />
  <footer> @a-eid </footer>
</div>, document.getElementById('root'));
registerServiceWorker();
