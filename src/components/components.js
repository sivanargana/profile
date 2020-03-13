import React, { Component } from 'react';
import { Spring } from 'react-spring/renderprops';
export  class Icon extends Component {
    render() {
        return (
            <div className="col-md text-center text-md-left mb-3 mb-md-0">
          {this.props.children}
        </div>
        )
    }
}
export  class Actions extends Component {
    render() {
        return (
            <div className="col-md-auto text-center text-md-left mt-3 mt-md-0">
          {this.props.children}
        </div>
        )
    }
}
export  class Item extends Component {
    render() {
        return (
            <div className="col-md">
            <div className="row align-items-center gutters-5">
        <div className="col-md-12 col text-right text-md-left"><div className="text-black-50">{this.props.label || 'Label Name'}</div></div>
                <div className="col-md-12 col"><div className="font-weight-bold text-capitalize">{this.props.children}</div></div>
            </div>
        </div>
        )
    }
}
export class Whiteblock extends Component {
    static Item = Item;
    static Icon = Icon;
    static Actions = Actions;
    render() {
        return (
            <div className="whiteblock">
                <div className="row align-items-center">{this.props.children}</div>
            </div>
        )
    }
}
export class Toolbar extends Component {
    render() {
        return (
            <div className="toolbar">
                    <div className="row align-items-center h-100">
                        <div className="col">
                            <div className="h5 m-0">{this.props.title || 'Title Comes Here'}</div>
                            <div className="text-black-50">{this.props.subTitle || 'Sub Title Comes Here'}</div>
                        </div>
                        <div className="col-auto">
                            {this.props.children}
                        </div>
                    </div>
                </div>
        )
    }
}



export class Loader extends Component {
  
    render() {
        return (
        (this.props.loaded) ? <div className="d-flex justify-content-center align-items-center loader">{this.props.children[0]}</div> : this.props.children[1]
        )
    }
}

export class Chip extends Component {
    state = {
        loader: true
    }
    render() {
        return (
            <div className="chip">
                <img src={this.props.value} onLoad={() => this.setState({ loader: false })} alt="img" />
                {(this.state.loader) ? this.props.children :
                    <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
                        {props => <div className="chip__holder" style={{ backgroundImage: `url('${this.props.value}')`, ...props }}></div>}
                    </Spring>
                }
            </div>
        )
    }
}

export const Ellipsis = React.forwardRef(({ children, onClick }, ref) => (
    <span style={{cursor:'pointer'}} ref={ref} onClick={e => { e.preventDefault(); onClick(e); }}><i className="las la-ellipsis-h la-2x"></i></span>
));

export const Workspace = (props) =>{
return(<div className="workspace">{props.children}</div>)
}


