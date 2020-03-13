import React, { Component } from 'react';
import { Spring } from 'react-spring/renderprops'
import { Spinner } from 'react-bootstrap';
export class Chip extends Component {
    state = {
        loader: true
    }
    render() {
        return (
            <div className="chip">
                <img src={this.props.value} onLoad={() => this.setState({ loader: false })} alt="img" />
                {(this.state.loader) ? <Spinner animation="grow" variant="primary" size="sm" /> :
                    <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
                        {props => <div className="chip__holder" style={{ backgroundImage: `url('${this.props.value}')`, ...props }}></div>}
                    </Spring>
                }
            </div>
        )
    }
}
export default Chip
