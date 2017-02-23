/**
 * Created by Darkstar on 11/29/2016.
 */
import React from 'react';
import {cloudBoostAPI,appSettings} from '../../../config';
import Toggle from 'material-ui/Toggle';


class Social extends React.Component {

    constructor(props){
        super(props)
        this.state ={
            google : appSettings.authSettings.settings.google,
            facebook : appSettings.authSettings.settings.facebook,
            twitter : appSettings.authSettings.settings.twitter,
            github : appSettings.authSettings.settings.github,
            linkedIn : appSettings.authSettings.settings.linkedIn
        }
    }
    componentWillMount(){
        if(this.props.socialSettings){
            this.setState({ ...this.props.socialSettings })
        }
    }
    toggleChangeHandler(which,e,val){
        this.state[which]['enabled'] = val
        this.setState(this.state)
        this.update()

    }
    nestedTextChangeHandler(whichSocial,whichProp,e){
        this.state[whichSocial][whichProp] = e.target.value
        this.setState(this.state)
        this.update()
    }
    attributePermissionTooglesHandler(socialType,type,whichAttr,e,val){
        if(type == 'attributes'){
            this.state[socialType][type][whichAttr] = val
        } else {
            this.state[socialType][type][whichAttr].enabled = val
        }
        this.setState(this.state)
        this.update()
    }
    linkedInPermissiosHandler(which,e,val){
        this.state['linkedIn']['permissions'][which] = val
        this.setState(this.state)
        this.update()
    }
    update(){
        setTimeout(()=>{
            this.props.updateSettingsFromChildComps(this.state)
        },100)
    }
    render() {
        let fbCallbackURL = cloudBoostAPI + "/auth/" + this.props.appData.appId + "/facebook/callback";
        let googleCallbackURL = cloudBoostAPI + "/auth/" + this.props.appData.appId + "/google/callback";
        let twitterCallbackURL = cloudBoostAPI + "/auth/" + this.props.appData.appId + "/twitter/callback";
        let linkedInCallbackURL = cloudBoostAPI + "/auth/" + this.props.appData.appId + "/linkedin/callback";
        let githubCallbackURL = cloudBoostAPI + "/auth/" + this.props.appData.appId + "/github/callback";
        return (
            <div className="push-box" style={{marginTop: 15}}>
                
                <div style={{width: '100%', marginTop: 25,backgroundColor: '#169cee',padding:'5px'}} className="flex-general-column-wrapper-center">
                    <div className="width:100%;">
                    <span style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
                        <i className="fa fa-users" style={{marginRight: 4}} />
                            Social Authentication
                    </span>
                    </div>
                    <div className="width:100%;">
                    <span style={{fontSize: 14, color: 'white'}} />
                    </div>
                </div>


                <div style={{borderBottom: '1px solid #C4C2C2'}}>
                    <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7'}}>
                        <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                        <div style={{width: '60%', height: '100%', padding: 35}}>
                            <img src={ "/assets/images/"+'facebook'+".png" } className="socialimages"/>
                        </div>
                        <div className="solo-vertical-center" style={{width: '40%', height: '100%', backgroundColor: 'white', padding: 10}}>
                            <Toggle
                                className="togglegeneral"
                                onToggle={ this.toggleChangeHandler.bind(this,'facebook') }
                                toggled={ this.state['facebook'].enabled }
                            />
                        </div>
                        </div>
                    </div>
                    {/*only if enabled*/}
                    <div className={ this.state['facebook'].enabled ? '' : 'hide' }>
                        <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7'}}>
                            <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                                <div style={{width: '60%', height: '100%', padding: 35}}>
                                    <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>App ID</span>
                                    <span className="smallp">This is listed under the apps section of the Facebook Developers.</span>
                                </div>
                                <div className="solo-vertical-center" style={{width: '40%', height: '100%', backgroundColor: 'white', padding: 10}}>
                                    <input type="text" value={ this.state['facebook'].appId || '' } onChange={ this.nestedTextChangeHandler.bind(this,'facebook','appId') } className="emailinputcampaign" placeholder="Enter App ID" style={{width: '100%', height: 40, fontSize: 16, paddingLeft: 4}} />
                                </div>
                            </div>
                        </div>
                        <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7'}}>
                            <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                                <div style={{width: '60%', height: '100%', padding: 35}}>
                                    <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>App Secret</span>
                                    <span className="smallp">This is listed under the apps section of the Facebook Developers.</span>
                                </div>
                                <div className="solo-vertical-center" style={{width: '40%', height: '100%', backgroundColor: 'white', padding: 10}}>
                                    <input type="text" value={ this.state['facebook'].appSecret || '' } onChange={ this.nestedTextChangeHandler.bind(this,'facebook','appSecret') } className="emailinputcampaign" placeholder="Enter App Secret" style={{width: '100%', height: 40, fontSize: 16, paddingLeft: 4}} />
                                </div>
                            </div>
                        </div>
                        <div style={{width: '100%', height: 300, backgroundColor: '#F7F7F7'}}>
                            <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                                <div style={{width: '60%', height: '100%', padding: 35}}>
                                    <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Attributes</span>
                                    <span className="smallp">This is listed under the "Authentication" section of the Facebook Developers.</span>
                                </div>
                                <div className="solo-vertical-center" style={{width: '40%', height: '95%', backgroundColor: 'white', padding: 10,overflow:'auto',overflowX:'auto'}}>
                                    {
                                        Object.keys(this.state['facebook'].attributes).map((attr,i)=>{
                                            return  <Toggle
                                                        key = { i }
                                                        label= { attr }
                                                        labelPosition="right"
                                                        toggled={ this.state['facebook'].attributes[attr] }
                                                        className={ 'attrtoggles' }
                                                        onToggle={ this.attributePermissionTooglesHandler.bind(this,'facebook','attributes',attr) }
                                                    />
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div style={{width: '100%', height: 300, backgroundColor: '#F7F7F7'}}>
                            <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                                <div style={{width: '60%', height: '100%', padding: 35}}>
                                    <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Permission</span>
                                    <span className="smallp">This is listed under the "Authentication" section of the Facebook Developers.</span>
                                </div>
                                <div className="solo-vertical-center" style={{width: '40%', height: '95%', backgroundColor: 'white', padding: 10,overflow:'auto',overflowX:'auto'}}>
                                    {
                                        Object.keys(this.state['facebook'].permissions).map((attr,i)=>{
                                            return  <Toggle
                                                        key = { i }
                                                        label= { attr }
                                                        labelPosition="right"
                                                        toggled={ this.state['facebook'].permissions[attr].enabled }
                                                        className={ 'attrtoggles' }
                                                        onToggle={ this.attributePermissionTooglesHandler.bind(this,'facebook','permissions',attr) }
                                                    />
                                        })
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                    {/*only if enabled ============ END =================*/}
                </div>

                <div style={{borderBottom: '1px solid #C4C2C2'}}>
                    <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7'}}>
                        <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                        <div style={{width: '60%', height: '100%', padding: 35}}>
                            <img src={ "/assets/images/"+'google'+".png" } className="socialimages"/>
                        </div>
                        <div className="solo-vertical-center" style={{width: '40%', height: '100%', backgroundColor: 'white', padding: 10}}>
                            <Toggle
                                className="togglegeneral"
                                onToggle={ this.toggleChangeHandler.bind(this,'google') }
                                toggled={ this.state['google'].enabled }
                            />
                        </div>
                        </div>
                    </div>
                    {/*only if enabled*/}
                    <div className={ this.state['google'].enabled ? '' : 'hide' }>
                        <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7'}}>
                            <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                                <div style={{width: '60%', height: '100%', padding: 35}}>
                                    <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Client ID</span>
                                    <span className="smallp">This is listed under the "Authentication" section of the Google API console.</span>
                                </div>
                                <div className="solo-vertical-center" style={{width: '40%', height: '100%', backgroundColor: 'white', padding: 10}}>
                                    <input type="text" value={ this.state['google'].appId || '' } onChange={ this.nestedTextChangeHandler.bind(this,'google','appId') } className="emailinputcampaign" placeholder="Enter Client ID" style={{width: '100%', height: 40, fontSize: 16, paddingLeft: 4}} />
                                </div>
                            </div>
                        </div>
                        <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7'}}>
                            <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                                <div style={{width: '60%', height: '100%', padding: 35}}>
                                    <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Client Secret</span>
                                    <span className="smallp">This is listed under the "Authentication" section of the Google API console.</span>
                                </div>
                                <div className="solo-vertical-center" style={{width: '40%', height: '100%', backgroundColor: 'white', padding: 10}}>
                                    <input type="text" value={ this.state['google'].appSecret || '' } onChange={ this.nestedTextChangeHandler.bind(this,'google','appSecret') } className="emailinputcampaign" placeholder="Enter Client Secret" style={{width: '100%', height: 40, fontSize: 16, paddingLeft: 4}} />
                                </div>
                            </div>
                        </div>
                        <div style={{width: '100%', height: 100, backgroundColor: '#FFF'}}>
                            <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                                <div style={{width: '100%', height: '100%', padding: 35}}>
                                    <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Callback URL</span>
                                    <span className="smallp">You need to paste this URL in "Authorized redirect URIs" field in the Authentication section of the Google API console</span>
                                    <span className="smallp" style={{color: '#006eff'}}>{ googleCallbackURL }</span>
                                </div>
                            </div>
                        </div>
                        <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7'}}>
                            <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                                <div style={{width: '60%', height: '100%', padding: 35}}>
                                    <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Attributes</span>
                                    <span className="smallp">This is listed under the "Authentication" section of the Google API console.</span>
                                </div>
                                <div className="solo-vertical-center" style={{width: '40%', height: '95%', backgroundColor: 'white', padding: 10,overflow:'auto',overflowX:'auto'}}>
                                    <Toggle
                                        label= { 'Basic profile' }
                                        labelPosition="right"
                                        toggled={ true }
                                        className={ 'attrtoggles' }
                                    />
                                    <Toggle
                                        label= { 'Extended profile' }
                                        labelPosition="right"
                                        toggled={ true }
                                        className={ 'attrtoggles' }
                                    />
                                </div>
                            </div>
                        </div>
                        <div style={{width: '100%', height: 300, backgroundColor: '#F7F7F7'}}>
                            <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                                <div style={{width: '60%', height: '100%', padding: 35}}>
                                    <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Permission</span>
                                    <span className="smallp">This is listed under the "Authentication" section of the Google API console.</span>
                                </div>
                                <div className="solo-vertical-center" style={{width: '40%', height: '95%', backgroundColor: 'white', padding: 10,overflow:'auto',overflowX:'auto'}}>
                                    {
                                        Object.keys(this.state['google'].permissions).map((attr,i)=>{
                                            return  <Toggle
                                                        key = { i }
                                                        label= { attr }
                                                        labelPosition="right"
                                                        toggled={ this.state['google'].permissions[attr].enabled }
                                                        className={ 'attrtoggles' }
                                                        onToggle={ this.attributePermissionTooglesHandler.bind(this,'google','permissions',attr) }
                                                    />
                                        })
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                    {/*only if enabled ============ END =================*/}
                </div>

                <div style={{borderBottom: '1px solid #C4C2C2'}}>
                    <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7'}}>
                        <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                        <div style={{width: '60%', height: '100%', padding: 35}}>
                            <img src={ "/assets/images/"+'twitter'+".png" } className="socialimages"/>
                        </div>
                        <div className="solo-vertical-center" style={{width: '40%', height: '100%', backgroundColor: 'white', padding: 10}}>
                            <Toggle
                                className="togglegeneral"
                                onToggle={ this.toggleChangeHandler.bind(this,'twitter') }
                                toggled={ this.state['twitter'].enabled }
                            />
                        </div>
                        </div>
                    </div>
                    {/*only if enabled*/}
                    <div className={ this.state['twitter'].enabled ? '' : 'hide' }>
                        <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7'}}>
                            <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                                <div style={{width: '60%', height: '100%', padding: 35}}>
                                    <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Consumer Key</span>
                                    <span className="smallp">This is listed under the Twitter Apps Settings.</span>
                                </div>
                                <div className="solo-vertical-center" style={{width: '40%', height: '100%', backgroundColor: 'white', padding: 10}}>
                                    <input type="text" value={ this.state['twitter'].appId || '' } onChange={ this.nestedTextChangeHandler.bind(this,'twitter','appId') } className="emailinputcampaign" placeholder="Enter Consumer Key" style={{width: '100%', height: 40, fontSize: 16, paddingLeft: 4}} />
                                </div>
                            </div>
                        </div>
                        <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7'}}>
                            <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                                <div style={{width: '60%', height: '100%', padding: 35}}>
                                    <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Consumer Secret</span>
                                    <span className="smallp">This is listed under the Twitter Apps Settings.</span>
                                </div>
                                <div className="solo-vertical-center" style={{width: '40%', height: '100%', backgroundColor: 'white', padding: 10}}>
                                    <input type="text" value={ this.state['twitter'].appSecret || '' } onChange={ this.nestedTextChangeHandler.bind(this,'twitter','appSecret') } className="emailinputcampaign" placeholder="Enter Consumer Secret" style={{width: '100%', height: 40, fontSize: 16, paddingLeft: 4}} />
                                </div>
                            </div>
                        </div>
                        <div style={{width: '100%', height: 100, backgroundColor: '#FFF'}}>
                            <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                                <div style={{width: '100%', height: '100%', padding: 35}}>
                                    <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Callback URL</span>
                                    <span className="smallp">You need to paste this URL in "Callback URL" field in the Twitter App Settings.</span>
                                    <span className="smallp" style={{color: '#006eff'}}>{ twitterCallbackURL }</span>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/*only if enabled ============ END =================*/}
                </div>

                <div style={{borderBottom: '1px solid #C4C2C2'}}>
                    <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7'}}>
                        <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                        <div style={{width: '60%', height: '100%', padding: 35}}>
                            <img src={ "/assets/images/"+'linkedIn'+".png" } className="socialimages"/>
                        </div>
                        <div className="solo-vertical-center" style={{width: '40%', height: '100%', backgroundColor: 'white', padding: 10}}>
                            <Toggle
                                className="togglegeneral"
                                onToggle={ this.toggleChangeHandler.bind(this,'linkedIn') }
                                toggled={ this.state['linkedIn'].enabled }
                            />
                        </div>
                        </div>
                    </div>
                    {/*only if enabled*/}
                    <div className={ this.state['linkedIn'].enabled ? '' : 'hide' }>
                        <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7'}}>
                            <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                                <div style={{width: '60%', height: '100%', padding: 35}}>
                                    <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Client ID</span>
                                    <span className="smallp">This is listed under the Linkedin Developers App Sections.</span>
                                </div>
                                <div className="solo-vertical-center" style={{width: '40%', height: '100%', backgroundColor: 'white', padding: 10}}>
                                    <input type="text" value={ this.state['linkedIn'].appId || '' } onChange={ this.nestedTextChangeHandler.bind(this,'linkedIn','appId') } className="emailinputcampaign" placeholder="Enter Client ID" style={{width: '100%', height: 40, fontSize: 16, paddingLeft: 4}} />
                                </div>
                            </div>
                        </div>
                        <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7'}}>
                            <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                                <div style={{width: '60%', height: '100%', padding: 35}}>
                                    <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Client Secret</span>
                                    <span className="smallp">This is listed under the Linkedin Developers App Sections.</span>
                                </div>
                                <div className="solo-vertical-center" style={{width: '40%', height: '100%', backgroundColor: 'white', padding: 10}}>
                                    <input type="text" value={ this.state['linkedIn'].appSecret || '' } onChange={ this.nestedTextChangeHandler.bind(this,'linkedIn','appSecret') } className="emailinputcampaign" placeholder="Enter Client Secret" style={{width: '100%', height: 40, fontSize: 16, paddingLeft: 4}} />
                                </div>
                            </div>
                        </div>
                        <div style={{width: '100%', height: 100, backgroundColor: '#FFF'}}>
                            <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                                <div style={{width: '100%', height: '100%', padding: 35}}>
                                    <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Callback URL</span>
                                    <span className="smallp">You need to paste this in "Authorized Redirect URLs" field in the Linkedin Developers App Sections</span>
                                    <span className="smallp" style={{color: '#006eff'}}>{ linkedInCallbackURL }</span>
                                </div>
                            </div>
                        </div>
                        <div style={{width: '100%', height: 150, backgroundColor: '#F7F7F7'}}>
                            <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                                <div style={{width: '60%', height: '100%', padding: 35}}>
                                    <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Attributes</span>
                                    <span className="smallp">This is listed under the Linkedin Developers App Sections.</span>
                                </div>
                                <div className="solo-vertical-center" style={{width: '40%', height: '95%', backgroundColor: 'white', padding: 10,overflow:'auto',overflowX:'auto'}}>
                                    {
                                        Object.keys(this.state['linkedIn'].permissions).map((attr,i)=>{
                                            return  <Toggle
                                                        key = { i }
                                                        label= { attr }
                                                        labelPosition="right"
                                                        toggled={ this.state['linkedIn'].permissions[attr] }
                                                        className={ 'attrtoggles' }
                                                        onToggle={ this.linkedInPermissiosHandler.bind(this,attr) }
                                                    />
                                        })
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                    {/*only if enabled ============ END =================*/}
                </div>

                <div style={{borderBottom: '1px solid #C4C2C2'}}>
                    <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7'}}>
                        <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                        <div style={{width: '60%', height: '100%', padding: 35}}>
                            <img src={ "/assets/images/"+'github'+".png" } className="socialimages"/>
                        </div>
                        <div className="solo-vertical-center" style={{width: '40%', height: '100%', backgroundColor: 'white', padding: 10}}>
                            <Toggle
                                className="togglegeneral"
                                onToggle={ this.toggleChangeHandler.bind(this,'github') }
                                toggled={ this.state['github'].enabled }
                            />
                        </div>
                        </div>
                    </div>
                    {/*only if enabled*/}
                    <div className={ this.state['github'].enabled ? '' : 'hide' }>
                        <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7'}}>
                            <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                                <div style={{width: '60%', height: '100%', padding: 35}}>
                                    <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Client ID</span>
                                    <span className="smallp">This is listed under the section of the Github Developers App Section.</span>
                                </div>
                                <div className="solo-vertical-center" style={{width: '40%', height: '100%', backgroundColor: 'white', padding: 10}}>
                                    <input type="text" value={ this.state['github'].appId || '' } onChange={ this.nestedTextChangeHandler.bind(this,'github','appId') } className="emailinputcampaign" placeholder="Enter Client ID" style={{width: '100%', height: 40, fontSize: 16, paddingLeft: 4}} />
                                </div>
                            </div>
                        </div>
                        <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7'}}>
                            <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                                <div style={{width: '60%', height: '100%', padding: 35}}>
                                    <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Client Secret</span>
                                    <span className="smallp">This is listed under the section of the Github Developers App Section.</span>
                                </div>
                                <div className="solo-vertical-center" style={{width: '40%', height: '100%', backgroundColor: 'white', padding: 10}}>
                                    <input type="text" value={ this.state['github'].appSecret || '' } onChange={ this.nestedTextChangeHandler.bind(this,'github','appSecret') } className="emailinputcampaign" placeholder="Enter Client Secret" style={{width: '100%', height: 40, fontSize: 16, paddingLeft: 4}} />
                                </div>
                            </div>
                        </div>
                        <div style={{width: '100%', height: 100, backgroundColor: '#FFF'}}>
                            <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                                <div style={{width: '100%', height: '100%', padding: 35}}>
                                    <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Callback URL</span>
                                    <span className="smallp">You need to paste this URL in "Authorization callback URL" field in Github Developers App Section</span>
                                    <span className="smallp" style={{color: '#006eff'}}>{ githubCallbackURL }</span>
                                </div>
                            </div>
                        </div>
                        <div style={{width: '100%', height: 300, backgroundColor: '#F7F7F7'}}>
                            <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                                <div style={{width: '60%', height: '100%', padding: 35}}>
                                    <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Permission</span>
                                    <span className="smallp">This is listed under the Github Developers App Section.</span>
                                </div>
                                <div className="solo-vertical-center" style={{width: '40%', height: '95%', backgroundColor: 'white', padding: 10,overflow:'auto',overflowX:'auto'}}>
                                    {
                                        Object.keys(this.state['github'].permissions).map((attr,i)=>{
                                            return  <Toggle
                                                        key = { i }
                                                        label= { attr }
                                                        labelPosition="right"
                                                        toggled={ this.state['github'].permissions[attr].enabled }
                                                        className={ 'attrtoggles' }
                                                        onToggle={ this.attributePermissionTooglesHandler.bind(this,'github','permissions',attr) }
                                                    />
                                        })
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                    {/*only if enabled ============ END =================*/}
                </div>



            </div>
        );
    }

}


export default Social
