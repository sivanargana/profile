import React, { Component } from 'react';
import axios from 'axios';
import {Dropdown, Button, Spinner } from 'react-bootstrap';
import {Workspace, Whiteblock,Toolbar,Loader,Chip,Ellipsis} from '../components/components';
export class Skills extends Component {
    state = {
        skills: [],
        modal: false,
        action: null,
        selected: null,
        loader: true
    }
    componentDidMount() {
        this.read()
    }
    read = () => {
        axios.get('skills/all').then(res => {
            if (res.status === 200) {
                this.setState({ skills: res.data, loader: false })
            }
        })
    }
    render() {
        const { skills, loader } = this.state
        return (
            <div>
              <Toolbar title="Skills" subTitle="You can Create,Update,Delete">
                <Button onClick={() => this.modalToggle(true, 'create')}>Add New</Button>
              </Toolbar>
                <Workspace>
                    <Loader loaded={loader}>
                        <Spinner animation="grow" variant="primary" />
                        <React.Fragment>
                        {skills.map((item, i) =>
                                <Whiteblock key={i}>
                                    <Whiteblock.Icon><Chip value={item.icon}><Spinner animation="grow" variant="primary" size="sm" /></Chip></Whiteblock.Icon>
                                    <Whiteblock.Item label="Skill">{item.title}</Whiteblock.Item>
                                    <Whiteblock.Item label="Experience">{item.experience}</Whiteblock.Item>
                                    <Whiteblock.Actions>
                                        <Dropdown alignRight>
                                            <Dropdown.Toggle as={Ellipsis}></Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#">View</Dropdown.Item>
                                                <Dropdown.Item href="#" onClick={(e) => this.update(e, item)}>Update</Dropdown.Item>
                                                <Dropdown.Item href="#" onClick={(e) => this.delete(e, item)}>Delete</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Whiteblock.Actions>
                                </Whiteblock>
                            )}
                        </React.Fragment>
                    </Loader>
                </Workspace>
            </div>
        )
    }
}
export default Skills
