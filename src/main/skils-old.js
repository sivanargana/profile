import React, { Component } from 'react';
import axios from 'axios';
import {FormBuilder,FieldGroup,FieldControl,Validators} from "react-reactive-form";
import Upload from './Upload';
import { Dropdown, Modal, Button, Form,Spinner } from 'react-bootstrap';
import Ellipsis from './Ellipsis';
import Chip from './Chip';


export class Skills extends Component {
    state = {
        data: [],
        modal: false,
        action: null,
        selected: null,
        loader:true
    }
    form = FormBuilder.group({
        icon: ["", Validators.required],
        title: ["", Validators.required],
        experience: ["", Validators.required],
    });
    componentDidMount() {
        this.read()
    }
    delete = (e, item) => {
        e.preventDefault()
        axios.post('skills/delete/' + item._id).then(res => {
            if (res.status === 200) {
                this.read()
            }
        })
    }
    update = (e, item) => {
        e.preventDefault()
        this.modalToggle(true, 'update')
        this.form.patchValue(item)
        this.setState({ selected: item._id })
    }
    read = () => {
        axios.get('skills/all').then(res => {
            if (res.status === 200) {
                this.setState({ data: res.data,loader:false })
            }
        })
    }
    modalToggle = (val, type) => {
        this.setState({ modal: val, action: type })
    }
    submit = () => {
        if (this.state.action === 'create') {
            axios.post('skills/add', this.form.value).then(res => {
                if (res.status === 200) {
                    this.read()
                    this.modalToggle(false)
                    this.form.reset()
                }
            })
        }
        if (this.state.action === 'update') {
            axios.post('skills/update/' + this.state.selected, this.form.value).then(res => {
                if (res.status === 200) {
                    this.read()
                    this.modalToggle(false)
                    this.form.reset()
                }
            })
        }
    }
    upload = (e) => {
        axios.post("/upload", e).then(res => {
            if (res.status === 200) {
                this.form.get('icon').setValue(res.data.filename)
            }
        })
    }
    render() {
        const { data, modal, loader } = this.state
        return (
            <div>
                <div className="toolbar">
                    <div className="row align-items-center h-100">
                        <div className="col">
                            <div className="h5 m-0">Manage Skills</div>
                            <div className="text-black-50">You can Create,Update,Delete</div>
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-primary" onClick={() => this.modalToggle(true, 'create')}>Add New</button>
                        </div>
                    </div>
                </div>
                <div className="workspace">
                
                
                    {(loader) ? <div className="d-flex justify-content-center align-items-center loader"><Spinner animation="grow" variant="primary"  /></div> : 
                    <div className="row gutters-5">
                        {data.map((item, i) =>
                            <div className="col-xl-12" key={i}>
                                <div className="whiteblock">
                                    <div className="row align-items-center">
                                        <div className="col-md text-center text-md-left mb-3 mb-md-0">
                                            <Chip value={item.icon} />
                                        </div>
                                        <div className="col-md">
                                            <div className="row align-items-center gutters-5">
                                                <div className="col-md-12 col text-right text-md-left"><div className="text-black-50">Skill</div></div>
                                                <div className="col-md-12 col"><div className="font-weight-bold text-capitalize">{item.title}</div></div>
                                            </div>
                                        </div>
                                        <div className="col-md">
                                            <div className="row align-items-center gutters-5">
                                                <div className="col-md-12 col text-right text-md-left"><div className="text-black-50">Experience</div></div>
                                                <div className="col-md-12 col"><div className="font-weight-bold text-capitalize">{item.experience}   </div></div>
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
                
                    
                    <Modal centered show={modal} onHide={() => this.modalToggle(false, null)} >
                        <Modal.Body className="p-md-5">
                            <h5 className="mb-3">{(this.state.action === 'create') ? 'Create' : 'Update'}</h5>
                            <FieldGroup control={this.form} render={() =>
                                <div>
                                    <FieldControl name="icon" render={({ handler, hasError, touched }) =>
                                        <Form.Group>
                                            <Form.Label>Icon</Form.Label>
                                            <Upload upload={this.upload} />
                                            <Form.Text className="text-danger">{touched && hasError("required") && `Required`}</Form.Text>
                                        </Form.Group>} />
                                    <FieldControl name="title" render={({ handler, hasError, touched }) =>
                                        <Form.Group>
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control type="text" {...handler()} />
                                            <Form.Text className="text-danger">{touched && hasError("required") && `Required`}</Form.Text>
                                        </Form.Group>} />
                                    <FieldControl name="experience" render={({ handler, hasError, touched }) =>
                                        <Form.Group>
                                            <Form.Label>Experience</Form.Label>
                                            <Form.Control type="text" {...handler()} />
                                            <Form.Text className="text-danger">{touched && hasError("required") && `Required`}</Form.Text>
                                        </Form.Group>} />
                                    <Button type="button" variant="outline-primary" className="mr-1" onClick={() => this.modalToggle(false, null)}>Close</Button>
                                    <Button type="button" disabled={!this.form.valid} onClick={this.submit}>{(this.state.action === 'create') ? 'Create' : 'Update'}</Button>
                                </div>} />
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        )
    }
}
export default Skills
