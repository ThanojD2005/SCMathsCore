import React from 'react';
import { Loader2 } from 'lucide-react';

const PageLoader = () => {
    return (
        <div className="page-loader-wrapper">
            <div className="loader-content">
                <div className="loader-graphics">
                    <div className="math-shape-1"></div>
                    <div className="math-shape-2"></div>
                    <div className="loader-icon-container">
                        <div className="pi-symbol">π</div>
                    </div>
                </div>
                <div className="loader-text-wrapper">
                    <h2 className="loader-brand">SCMathsCore</h2>
                    <div className="loader-progress-bar">
                        <div className="loader-progress-fill"></div>
                    </div>
                    <p className="loader-status">Preparing your classroom...</p>
                </div>
            </div>
        </div>
    );
};

export default PageLoader;
