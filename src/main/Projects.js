import React, { Component } from 'react'
import { Dropdown,Spinner } from 'react-bootstrap'
import Ellipsis from './Ellipsis';
import axios from 'axios'
import Chip from './Chip';
export class Projects extends Component {
    state = {
        projects: [],
        loader:true
    }
    componentDidMount() {
        this.read()
    }
    read = () => {
        axios.get('projects/all').then(res => {
            if (res.status === 200) {
                this.setState({ projects: res.data, loader:false })
            }
        })
    }
    render() {
        const {loader,projects} = this.state;
        return (
            <div>
                <div className="toolbar">
                    <div className="row align-items-center h-100">
                        <div className="col">
                            <div className="h5 m-0">Manage Projects</div>
                            <div className="text-black-50">You can Create,Update,Delete</div>
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-primary">Add New</button>
                        </div>
                    </div>
                </div>
                <div className="workspace">
                {(loader) ? <div className="d-flex justify-content-center align-items-center loader"><Spinner animation="grow" variant="primary" /></div> :<div className="row gutters-5">
                        {projects.map((item, i) =>
                            <div className="col-xl-12" key={i}>
                                <div className="whiteblock">
                                    <div className="row align-items-center">
                                        <div className="col-md-auto text-center text-md-left mb-3 mb-md-0">
                                        <Chip value={item.img} />
                                        </div>
                                        <div className="col-md">
                                            <div className="row align-items-center gutters-5">
                                                <div className="col-md-12 col text-right text-md-left"><div className="text-black-50">Project</div></div>
                                                <div className="col-md-12 col"><div className="font-weight-bold text-capitalize">{item.title}</div></div>
                                            </div>
                                        </div>                                    
                                        <div className="col-md">
                                            <div className="row align-items-center gutters-5">
                                                <div className="col-md-12 col text-right text-md-left"><div className="text-black-50">Link</div></div>
                                                <div className="col-md-12 col"><div className="text-lowercase small">{item.link}</div></div>
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
export default Projects