import React, { Component } from 'react';
import { Dropdown,Spinner } from 'react-bootstrap'
import Ellipsis from './Ellipsis';
import axios from 'axios'
export class Awards extends Component {
    state = {
        awards: [],
        loader:true
    }
    componentDidMount() {
        this.read()
    }
    read = () => {
        axios.get('awards/all').then(res => {
            if (res.status === 200) {
                this.setState({ awards: res.data,loader:false })
            }
        })
    }
    render() {
        const {loader,awards} = this.state;
        return (
            <div>
                <div className="toolbar">
                    <div className="row align-items-center h-100">
                        <div className="col">
                            <div className="h5 m-0">Manage Awards</div>
                            <div className="text-black-50">You can Create,Update,Delete</div>
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-primary">Add New</button>
                        </div>
                    </div>
                </div>
                <div className="workspace">
                {(loader) ? <div className="d-flex justify-content-center align-items-center loader"><Spinner animation="border" /></div> :
                <div className="row gutters-5">
                        {awards.map((item, i) =>
                            <div className="col-xl-12" key={i}>
                                <div className="whiteblock">
                                    <div className="row align-items-center">
                                        <div className="col-md-auto text-center text-md-left mb-3 mb-md-0">
                                            <div className="chip chip-flat" style={{ backgroundImage: `url('${item.icon}')` }}></div>
                                        </div>
                                        <div className="col-md">
                                            <div className="row align-items-center gutters-5">
                                                <div className="col-md-12 col text-right text-md-left"><div className="text-black-50">Award</div></div>
                                                <div className="col-md-12 col"><div className="font-weight-bold text-capitalize">{item.title}</div></div>
                                            </div>
                                        </div>                                    
                                        <div className="col-md">
                                            <div className="row align-items-center gutters-5">
                                                <div className="col-md-12 col text-right text-md-left"><div className="text-black-50">Company</div></div>
                                                <div className="col-md-12 col"><div className="font-weight-bold text-capitalize">{item.company}</div></div>
                                            </div>
                                        </div>                                    

                                        <div className="col-md-auto text-center text-md-left mt-3 mt-md-0">
                                            <Dropdown alignRight>
                                                <Dropdown.Toggle as={Ellipsis}></Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#">View</Dropdown.Item>
                                                    <Dropdown.Item href="#" onClick={(e) => this.update(e, item)}>Update</Dropdown.Item>
                                                    <Dropdown.Item href="#" onClick={(e) => this.delete(e, item)}>Delete</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>}
                </div>
            </div>
        )
    }
}
export default Awards