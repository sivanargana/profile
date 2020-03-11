import React, { Component } from 'react';
import axios from 'axios';
import {
    FormBuilder,
    FieldGroup,
    FieldControl,
    Validators,
} from "react-reactive-form";
import { Dropdown, Modal, Button, Form } from 'react-bootstrap';
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <span ref={ref} onClick={e => { e.preventDefault(); onClick(e); }}><i className="las la-ellipsis-h la-2x"></i></span>
));
export class Skills extends Component {
    state = {
        data: [],
        modal: false,
        action:''
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
        this.modalToggle(true)
        this.form.patchValue(item)
        // axios.post('skills/update/' + item._id).then(res => {
        //     if (res.status === 200) {
        //         this.read()
        //     }
        // })
    }
    read = () => {
        axios.get('skills/all').then(res => {
            if (res.status === 200) {
                this.setState({ data: res.data })
            }
        })
    }
    modalToggle = (val) => {
        this.setState({ modal: val })
    }
    submit = () =>{
        axios.post('skills/add').then(res => {
            if (res.status === 200) {
                this.read()
                this.modalToggle(false)
                this.form.reset()
            }
        })
    }
    render() {
        const { data, modal } = this.state
        return (
            <div>
                <div className="page-head">
                    <div className="row">
                        <div className="col">
                            <div className="h5 m-0">Manage Skills</div>
                            <div className="text-black-50">You can Create,Update,Delete</div>
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-primary" onClick={() => this.modalToggle(true)}>Add New</button>
                        </div>
                    </div>
                </div>
                <div className="row gutters-5">
                    {data.map((item, i) =>
                        <div className="col-xl-3" key={i}>
                            <div className="whiteblock">
                                <div className="row align-items-center">
                                    <div className="col-auto"><img src={item.icon} height="30" alt="img" /></div>
                                    <div className="col"><strong>{item.title}</strong></div>
                                    <div className="col-auto">{item.experience}</div>
                                    <div className="col-auto">
                                        <Dropdown alignRight>
                                            <Dropdown.Toggle as={CustomToggle}></Dropdown.Toggle>
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
                </div>
                <Modal centered show={modal} onHide={() => this.modalToggle(false)} >
                    <Modal.Body className="p-md-5">
                        <h5 className="mb-3">Add New Skill</h5>
                        <FieldGroup control={this.form} render={() =>
                            <div>
                                <FieldControl name="icon" render={({ handler,hasError,touched }) => 
                                <Form.Group>
                                    <Form.Label>Icon</Form.Label>
                                    <Form.Control type="text" {...handler()} />

                                    <Form.Text className="text-danger">{touched && hasError("required") &&  `Required`}</Form.Text>
                                    
                                </Form.Group>} />

        

                                <FieldControl name="title" render={({ handler,hasError,touched }) => 
                                <Form.Group>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" {...handler()} />
                                    <Form.Text className="text-danger">{touched && hasError("required") &&  `Required`}</Form.Text>
                                </Form.Group>} />


                                <FieldControl name="experience" render={({ handler,hasError,touched }) => 
                                <Form.Group>
                                    <Form.Label>Experience</Form.Label>
                                    <Form.Control type="text" {...handler()} />
                                    <Form.Text className="text-danger">{touched && hasError("required") &&  `Required`}</Form.Text>
                                </Form.Group>} />

                                <Button type="button" variant="outline-primary" className="mr-1" onClick={() => this.modalToggle(false)}>Close</Button>
                                <Button type="button" disabled={!this.form.valid}  onClick={this.submit}>Add New</Button>
                            </div>} />
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}
export default Skills
