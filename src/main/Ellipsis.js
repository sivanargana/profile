import React from 'react'

const Ellipsis = React.forwardRef(({ children, onClick }, ref) => (
    <span style={{cursor:'pointer'}} ref={ref} onClick={e => { e.preventDefault(); onClick(e); }}><i className="las la-ellipsis-h la-2x"></i></span>
));
export default Ellipsis
