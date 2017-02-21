/**
 * Created by Darkstar on 11/29/2016.
 */
import React from 'react';
import {connect} from 'react-redux';
import {showAlert,exportDatabase,importDatabase} from '../../actions';


class ImportExport extends React.Component {

    constructor(props){
        super(props)
        this.state = {

        }
    }
    componentWillMount(){

    }
    changeFile(e){
        let file = e.target.files[0]
        if(file.type.includes('/json')){
            this.props.importDatabase(this.props.appData.appId,this.props.appData.masterKey,file)
        } else {
            showAlert('error','Only .json type files are allowed.')
        }
    }
    openChangeFile(){
        document.getElementById("fileBox").click()
    }
    exportDatabase(){
        this.props.exportDatabase(this.props.appData.appId,this.props.appData.masterKey)
    }
    render() {

        return (
            <div className="contentsubdiv">
                <div style={{width: '100%'}} className="solo-horizontal-center">
                    <span style={{color: '#169CEE', fontSize: 24, fontWeight: 700}}>Import / Export Data</span>
                </div>


                <div className="push-box" style={{marginTop: 15}}>
                    
                    <div style={{width: '100%', marginTop: 25,backgroundColor: '#169cee',padding:'5px'}} className="flex-general-column-wrapper-center">
                        <div className="width:100%;">
                            <span style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
                                <i className="icon ion-ios-download" style={{marginRight: 4}} />
                                Import Data
                            </span>
                            </div>
                            <div className="width:100%;">
                            <span style={{fontSize: 14, color: 'white'}} />
                        </div>
                    </div>

                    <div style={{width: '100%', height: 140, backgroundColor: '#F7F7F7'}}>
                        <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                            <div style={{width: '60%', height: '100%', padding: 35}}>
                                <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Data file</span>
                                <span className="smallp">Upload your .json data file to import your data into the database. This will delete all your existing data.</span>
                            </div>
                            <div className="solo-vertical-center" style={{width: '40%', height: '100%', backgroundColor: 'white', padding: 55}}>
                                <p onClick={ this.openChangeFile.bind(this) } className="addfile">+Select .json file.</p>
                                <input type="file" style={{display:"none"}} onChange={ this.changeFile.bind(this) } id="fileBox"/>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="push-box" style={{marginTop: 15}}>
                    
                    <div style={{width: '100%', marginTop: 25,backgroundColor: '#169cee',padding:'5px'}} className="flex-general-column-wrapper-center">
                        <div className="width:100%;">
                        <span style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
                            <i className="icon ion-ios-upload" style={{marginRight: 4}} />
                            Export Data
                        </span>
                        </div>
                        <div className="width:100%;">
                        <span style={{fontSize: 14, color: 'white'}} />
                        </div>
                    </div>

                    <div style={{width: '100%', height: 140, backgroundColor: '#F7F7F7', borderBottom: '1px solid #C4C2C2'}}>
                        <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                        <div style={{width: '60%', height: '100%', padding: 35}}>
                            <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Export Data</span>
                            <span className="smallp">By clicking on export button, your CloudBoost App data will be exported to a .json file.</span>
                        </div>
                        <div className="solo-vertical-center" style={{width: '40%', height: '100%', backgroundColor: 'white', padding: 55}}>
                            <p onClick={ this.exportDatabase.bind(this) } className="addfile">Export</p>
                        </div>
                        </div>
                    </div>

                </div>

            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        appData: state.manageApp
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        exportDatabase: (appId,masterKey) => dispatch(exportDatabase(appId,masterKey)),
        importDatabase: (appId,masterKey,fileObj) => dispatch(importDatabase(appId,masterKey,fileObj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportExport);
