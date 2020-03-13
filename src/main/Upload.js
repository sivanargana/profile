import React, { Component } from 'react'
export class Upload extends Component {
    upload = (e) => {
        let blob = e.target.files[0];
        let formdata = new FormData();
        formdata.set("file", blob);
        this.props.upload(formdata)
    }
    render() {
        return (
            <div>
                <input type="file" onChange={this.upload} />
            </div>
        )
    }
}
export default Upload
