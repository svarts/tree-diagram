import React from 'react';
import Graph from './Graph';

const App: React.FC = () => {
    return (
        <div>
            <div className="pink section">
                <h2 className="white-text center">Ninja Corp</h2>
            </div>
            <div className="grey lighten-3 section grey-text" style={{ position: 'relative' }}>
                <p className="flow-text center">The Number ONE Ninja Company</p>
                <a className="btn-floating btn-large halfway-fab pink modal-trigger" href="#modal">
                    <i className="material-icons">add</i>
                </a>
            </div>

            <div className="container">
                <Graph />
            </div>
        </div>
    );
};

export default App;
