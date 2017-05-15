/**
 * Created by Darkstar on 11/29/2016.
 */
import React from 'react';
import {connect} from 'react-redux';
import {fetchCache,selectCache,addItemToCache,deleteItemFromCache,deleteCache,clearCache,resetCacheState} from '../../actions';
import {grey500} from 'material-ui/styles/colors';
import {FormControl, FormGroup, InputGroup, Modal, Button} from 'react-bootstrap';
import Search from 'material-ui/svg-icons/action/search';
import CreateCache from './createCache'
import RaisedButton from 'material-ui/RaisedButton';
import Delete from 'material-ui/svg-icons/action/delete';
import Minus from 'material-ui/svg-icons/toggle/indeterminate-check-box';
import TextField from 'material-ui/TextField';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const iconStyles = {
    marginLeft: 10
};

export class CacheCRUD extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            key:'',
            value:'',
            searchCache:''
        }
    }
    componentWillMount(){

    }
    deleteCache(selectedCache,e){
        e.stopPropagation()
        this.props.deleteCache(selectedCache)
    }
    clearCache(selectedCache,e){
        e.stopPropagation()
        this.props.clearCache(selectedCache)
    }
    addItem(){
        this.props.addItemToCache(this.props.selectedCache,this.state.key,this.state.value)
        this.setState({
            key:'',
            value:''
        })
    }
    deleteItemFromCache(key){
        this.props.deleteItemFromCache(this.props.selectedCache,key)
    }
    changeHandler(which,e,value){
        this.state[which] = value
        this.setState(this.state)
    }
    changeHandlerSearch(e){
        this.setState({searchCache:e.target.value})
    }
    render() {
        let caches = this.props.allCache
        .filter((x)=>{
            if(this.state.searchCache == ''){
                    return true
            } else {
                let string = x.name.toLowerCase()
                return string.includes(this.state.searchCache.toLowerCase())
            }
        })
        .map((x,i)=>{
            return  <div key={ i } className={ this.props.selectedCache.name == x.name ? "cacheDivSelected" : "cacheDiv" } onClick={ this.props.selectCache.bind(this,x) }>
                        <div className="cacheicondiv">
                            <i className="fa fa-bolt cacheI"></i>
                        </div>
                        <div className="cachecontent">
                            <div className="cacheNamediv">
                                <p className="cachename">{ x.name }</p>
                            </div>
                            <div className="cacheProps">
                                <p className="cachesizeitems">SIZE:<span className="cacheitemssizecontent">{ x.size || "00.00 KB" }</span></p>
                                <p className="cachesizeitems">ITEMS:<span className="cacheitemssizecontent">{ x.items.length }</span></p>
                            </div>
                        </div>
                        <div className="cachebuttonsdiv">
                            <RaisedButton
                              className="buttoncachedelete"
                              icon={<Delete />}
                              style={iconStyles}
                              onClick={ this.deleteCache.bind(this,x) }
                            />
                            <RaisedButton
                              className="buttoncacheminus"
                              icon={<Minus />}
                              style={iconStyles}
                              onClick={ this.clearCache.bind(this,x) }
                            />
                        </div>
                    </div>
        })
        return (
                <div className="container">
                    <div className="tables-head">
                        <p>{this.props.name}</p>
                        <FormGroup>
                            <CreateCache>
                                <div className="btn" onClick={this.open}>+ Create Cache</div>
                            </CreateCache>
                            
                            <InputGroup className="search">
                                <InputGroup.Addon>
                                    <Search style={iconStyles} color={grey500}/>
                                </InputGroup.Addon>
                                <FormControl type="text" placeholder="Search Cache.." value={ this.state.searchCache } onChange={ this.changeHandlerSearch.bind(this) }/>
                            </InputGroup>
                        </FormGroup>
                    </div>
                    <div className="col-sm-6 cacheleft">
                        { caches }
                    </div>
                    <div className="col-sm-6 cacheright">
                        
                        <div className="cacheaddfieldsdiv">
                            <Table selectable={false}>
                                <TableHeader displaySelectAll={false}>
                                  <TableRow>
                                    <TableHeaderColumn>Key</TableHeaderColumn>
                                    <TableHeaderColumn>Value</TableHeaderColumn>
                                    <TableHeaderColumn>Action</TableHeaderColumn>
                                  </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false}>
                                    <TableRow>
                                        <TableRowColumn>
                                            <TextField
                                              hintText="Key Name"
                                              className="cacheinputs"
                                              onChange={this.changeHandler.bind(this,'key')}
                                              value={ this.state.key }
                                            />
                                        </TableRowColumn>
                                        <TableRowColumn>
                                            <TextField
                                              hintText="Value"
                                              className="cacheinputs"
                                              onChange={this.changeHandler.bind(this,'value')}
                                              value={ this.state.value }
                                            />
                                        </TableRowColumn>
                                        <TableRowColumn><RaisedButton label="Add Item" className="addtocachebtn" onClick={ this.addItem.bind(this) } disabled={ !this.props.selectedCache.name }/></TableRowColumn>
                                    </TableRow>
                                {
                                    this.props.selectedCacheItems.map((x,i)=>{
                                        return  <TableRow key={ i }>
                                                    <TableRowColumn>{ x.key }</TableRowColumn>
                                                    <TableRowColumn>{ JSON.stringify(x.value) }</TableRowColumn>
                                                    <TableRowColumn><RaisedButton className="buttoncacheelemdelete" icon={<Delete />} style={iconStyles} onClick={ this.deleteItemFromCache.bind(this,x.key) }/></TableRowColumn>
                                                </TableRow>
                                    })
                                }
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        name: state.manageApp.name,
        allCache: state.cache.allCaches || [],
        selectedCacheItems:state.cache.selectedCacheItems || [],
        selectedCache:state.cache.selectedCache || {}
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectCache: (selectedCache) => dispatch(selectCache(selectedCache)),
        addItemToCache: (selectedCache,item,value) => dispatch(addItemToCache(selectedCache,item,value)),
        deleteItemFromCache: (selectedCache,item) => dispatch(deleteItemFromCache(selectedCache,item)),
        deleteCache: (selectedCache) => dispatch(deleteCache(selectedCache)),
        clearCache: (selectedCache) => dispatch(clearCache(selectedCache))     
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CacheCRUD);
