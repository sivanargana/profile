import React, { Component } from 'react'
import axios from 'axios';

export class Dashboard extends Component {
    state = {
        skills: 0,
        experience: 0,
        services: 0,
        awards: 0,
        projects: 0,
    }
    componentDidMount() {
        this.read()
    }
    read = () => {
        axios.get('skills/all').then(res => {
            if (res.status === 200) {
                this.setState({ skills: res.data.length })
            }
        })
        axios.get('experience/all').then(res => {
            if (res.status === 200) {
                this.setState({ experience: res.data.length })
            }
        })
        axios.get('services/all').then(res => {
            if (res.status === 200) {
                this.setState({ services: res.data.length })
            }
        })
        axios.get('awards/all').then(res => {
            if (res.status === 200) {
                this.setState({ awards: res.data.length })
            }
        })
        axios.get('projects/all').then(res => {
            if (res.status === 200) {
                this.setState({ projects: res.data.length })
            }
        })
    }
    render() {
        const {skills,experience,awards,services,projects} = this.state;
        return (
            <div>
                <div className="toolbar">
                    <div className="row align-items-center h-100">
                        <div className="col">
                            <div className="h5 m-0">Dashboard</div>
                            <div className="text-black-50">You can see all here</div>
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-primary">Add New</button>
                        </div>
                    </div>
                </div>
                <div className="workspace p-5">

                 
               

                    <div className="row">
                    <div className="col-md mb-4">
                        <div className="p-5 bg-primary text-white text-center">
                        <div className="display-3">{skills}</div>
                        <div>Total Skills</div>  
                        </div>                  

                    </div>
                    <div className="col-md mb-4">
                        <div className="p-5 bg-dark text-white text-center">
                        <div className="display-3">{experience}</div>
                        <div>Total Experience</div>  
                        </div>                  

                    </div>
                    <div className="col-md mb-4">
                        <div className="p-5 bg-primary text-white text-center">
                        <div className="display-3">{services}</div>
                        <div>Total Services</div>  
                        </div>                  

                    </div>
                    <div className="col-md mb-4">
                        <div className="p-5 bg-dark text-white text-center">
                        <div className="display-3">{awards}</div>
                        <div>Total Awards</div>  
                        </div>                  

                    </div>
                    <div className="col-md mb-4">
                        <div className="p-5 bg-primary text-white text-center">
                        <div className="display-3">{projects}</div>
                        <div>Total Projects</div>  
                        </div>                  

                    </div>
                    </div>


                 
                </div>
            </div>
        )
    }
}
export default Dashboard