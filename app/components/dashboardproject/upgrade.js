/**
 * Created by Darkstar on 12/5/2016.
 */
import React from 'react';
import {connect} from 'react-redux';
import Check from 'material-ui/svg-icons/navigation/check';
import CreditCard from 'material-ui/svg-icons/action/credit-card';
import {grey500} from 'material-ui/styles/colors';
import planList from '../../fakeAPI/plans';
import {createSale,getCards,addCard} from '../../actions';
import {paymentCountries} from '../../config';
import Popover from 'material-ui/Popover';
import RefreshIndicator from 'material-ui/RefreshIndicator';
var valid = require('card-validator');

class Upgrade extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPlan: planList[0],
            cardDetails: {
                number: "", expMonth: "", expYear: "",name:"",
                billing: {
                    name: "",
                    addrLine1: "",
                    addrLine2: "",
                    city: "",
                    state: "",
                    zipCode: "",
                    country:""
                }
            },
            addCardToggled:false,
            billingToggled:false,
            error:null,
            selectedCard:{number: "", expMonth: "", expYear: "",name:"",cardId:""},
            openPlanSelector:false
        };
    }
    componentWillMount(){
        this.props.getCards()
        try{
            this.setState({selectedPlan:planList[this.props.planId]})
        } catch(e){
            this.setState({selectedPlan:planList[0]})
        }
    }
    purchaseButton(){
        if(this.state.selectedCard.cardId){
            let cvv = this.refs[this.state.selectedCard.cardId].value
            if(valid.cvv(cvv).isValid){
                $(this.refs[this.state.selectedCard.cardId]).css('border','none')
                this.toggleBilling(true)
            } else {
                $(this.refs[this.state.selectedCard.cardId]).css('border','2px solid red')
            }
        }
    }
    purchase(e){
        e.preventDefault()
        return;
        // actual create sale call 
        this.props.createSale(this.props.appId,this.state.cardDetails,selectedPlan.id)
    }
    addCardButton(){
        let { number,name,expMonth,expYear } = this.state.cardDetails
        if(!name) {
            this.showError('name',true);
            return false;
        } else this.showError('name',false);
        if(!valid.number(number).isValid){
            this.showError('number',true);
            return false;
        } else this.showError('number',false);
        if(!valid.expirationYear(expYear).isValid){
            this.showError('year',true);
            return false;
        } else this.showError('year',false);
        if(!valid.expirationMonth(expMonth).isValid){
            this.showError('month',true);
            return false;
        } else this.showError('month',false);

        this.props.addCard(name,number,expMonth,expYear)
        this.toggleAddcard(false)
    }
    toggleAddcard(what){
        this.setState({addCardToggled:what})
    }
    toggleBilling(what){
        this.setState({billingToggled:what})
    }
    cardDetailChangeHandler(which,e){
        this.state.cardDetails[which] = e.target.value
        this.setState(this.state)
    }
    billingChangeHandler(which,e){
        this.state.cardDetails.billing[which] = e.target.value
        this.setState(this.state)
    }
    showError(which,show){
        if(show) $('.'+which).css('border','2px solid red')
            else $('.'+which).css('border','none')
    }
    getCardType(number){
        let type = 'visa'
        let card = valid.number(number).card
        if(card){
            if(card.type != 'visa') type = 'mastercard'
        }
        return type
    }
    selectCard(card){
        this.setState({ selectedCard:card })
    }
    handleTouchTap = (event) => {
        event.preventDefault();
        this.setState({
            openPlanSelector: true,
            anchorEl: event.currentTarget,
        })
    }

    handleRequestClose = () => {
        this.setState({
            openPlanSelector: false,
        })
    }
    selectPlan(plan){
        this.setState({selectedPlan:plan})
        this.handleRequestClose()
    }

    render() {
        let selectPlanisSame = this.state.selectedPlan.id == this.props.planId
        let downgradePlan = this.state.selectedPlan.id < this.props.planId
        return (
            <div className="payment">
                {   this.props.loading ?
                        <div className="cards">
                            <RefreshIndicator
                                size={50}
                                left={70}
                                top={0}
                                status="loading"
                                className="loadermain"
                            />
                        </div> :
                        <div className="cards">

                            <div className={ this.state.billingToggled ? 'hide' : 'heading' }>
                                <span className="main">Payment Information</span>
                                <span className="sub">100% money back guarantee for the first 30 days on paid plans.</span>
                            </div>


                            {/*select card modal*/}
                            <div className={ this.state.addCardToggled || this.state.billingToggled || selectPlanisSame ? 'hide' : '' }>
                                {
                                    this.props.cards.length ? this.props.cards.map((card,i)=>{
                                        return <div className={ this.state.selectedCard.cardId == card.cardId ? "cardadded selectedcard" : "cardadded" } key={ i } onClick={ this.selectCard.bind(this,card) }>
                                                    <img src={ "/assets/images/" + this.getCardType(card.number) + ".png" } className="cardimage"/>
                                                    <span className="cardnumber">{ card.number }</span>
                                                    <span className="cardname">{ card.name }</span>
                                                    <input type="text" className="cardcvv" placeholder="CVV" ref={ card.cardId }/>
                                                </div>
                                    }) :    <div style={{padding:68,textAlign:'center'}}>
                                                <i className="fa fa-credit-card cardnotfound" aria-hidden="true"></i>
                                                <p className="addacardmessage">Please add a card to make a payment.</p>
                                            </div>
                                }
                            </div>
                            <div className={ this.state.addCardToggled || this.state.billingToggled || selectPlanisSame  ? 'hide' : 'buttons' }>
                                <button className="purchase" onClick={ this.purchaseButton.bind(this) }>{ downgradePlan ? "DOWNGRADE PLAN" : "PURCHASE PLAN" }</button>
                                <button className="addcard" onClick={ this.toggleAddcard.bind(this,true) }>ADD CARD</button>
                            </div>
                            <div className={ selectPlanisSame ? '' : 'hide' }>
                                <div style={{padding:68,textAlign:'center'}}>
                                    <i className="fa fa-thumbs-o-up cardnotfound" aria-hidden="true"></i>
                                    <p className="addacardmessage">You are already on this plan.</p>
                                </div>
                            </div>
                            {/*select card modal ==========END==============*/}

                            {/*addcard modal*/}
                            <div className={ this.state.addCardToggled ? '' : 'hide' }>
                                <div className="fields name">
                                    <span className="labels">Name</span>
                                    <input type="text" value={ this.state.cardDetails.name } onChange={ this.cardDetailChangeHandler.bind(this,'name') } placeholder="Card holder name." className="field"/>
                                </div>
                                <div className="fields number">
                                    <span className="labels">card#</span>
                                    <input type="text" value={ this.state.cardDetails.number } onChange={ this.cardDetailChangeHandler.bind(this,'number') } placeholder="1234 5678 9326 7352" className="field"/>
                                </div>
                                <div className="fieldssmall year">
                                    <span className="labels">ex.Year</span>
                                    <input type="text" placeholder="YYYY" value={ this.state.cardDetails.expYear } onChange={ this.cardDetailChangeHandler.bind(this,'expYear') } className="field"/>
                                </div>
                                <div className="fieldssmall month">
                                    <span className="labels">ex.Month</span>
                                    <input type="text" placeholder="MM" value={ this.state.cardDetails.expMonth } onChange={ this.cardDetailChangeHandler.bind(this,'expMonth') } className="field"/>
                                </div>
                            </div>
                            <div className={ this.state.addCardToggled ? 'buttons' : 'hide' }>
                                <button className="purchase" onClick={ this.addCardButton.bind(this) }>ADD CARD</button>
                                <button className="addcard" onClick={ this.toggleAddcard.bind(this,false) }>BACK</button>
                            </div>
                            {/*addcard modal ======END============== */}

                            {/*billing modal and purchase*/}
                            <form onSubmit={ this.purchase.bind(this) }>
                                <div className={ this.state.billingToggled ? 'billing' : 'hide' }>
                                    <div className="fields">
                                        <span className="labels">Addr1</span>
                                        <input type="text" value={ this.state.cardDetails.addrLine1 } onChange={ this.billingChangeHandler.bind(this,'addrLine1') } placeholder="Street address 1" className="field" required/>
                                    </div>
                                    <div className="fields">
                                        <span className="labels">Addr2</span>
                                        <input type="text" value={ this.state.cardDetails.addrLine2 } onChange={ this.billingChangeHandler.bind(this,'addrLine2') } placeholder="Street address 2" className="field"/>
                                    </div>
                                    <div className="fieldssmall">
                                        <span className="labels">City</span>
                                        <input type="text" placeholder="City" value={ this.state.cardDetails.city } onChange={ this.billingChangeHandler.bind(this,'city') } className="field" required/>
                                    </div>
                                    <div className="fieldssmall">
                                        <span className="labels">State</span>
                                        <input type="text" placeholder="State" value={ this.state.cardDetails.state } onChange={ this.billingChangeHandler.bind(this,'state') } className="field" required/>
                                    </div>
                                    <div className="fieldssmall">
                                        <span className="labels">Zip</span>
                                        <input type="text" placeholder="Zipcode" value={ this.state.cardDetails.zipCode } onChange={ this.billingChangeHandler.bind(this,'zipCode') } className="field" required/>
                                    </div>
                                    <div className="fieldssmall">
                                        <span className="labels">Country</span>
                                        <select className="field" value={ this.state.cardDetails.country } onChange={ this.billingChangeHandler.bind(this,'country') } required>
                                            <option value="">Select</option>
                                            {
                                                paymentCountries.map((country,i) => {
                                                    return <option value={ country.code } key={ i }>{ country.label }</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className={ this.state.billingToggled ? 'buttons' : 'hide' }>
                                    <button className="purchase" type="submit">{ downgradePlan ? "DOWNGRADE PLAN" : "PURCHASE PLAN" }</button>
                                    <button className="addcard" onClick={ this.toggleBilling.bind(this,false) }>BACK</button>
                                </div>
                            </form>
                            {/*billing modal and purchase ==========END==============*/}

                            
                        </div>
                }
                <div className="plans">
                    <div className="planname" onTouchTap={this.handleTouchTap}>
                        <span className="type">{this.state.selectedPlan.label}</span>
                        <span className="value">${this.state.selectedPlan.price}</span>
                        <i className="icon ion-ios-arrow-down arrow"></i>
                    </div>
                    <Popover
                        open={this.state.openPlanSelector}
                        anchorEl={this.state.anchorEl}
                        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        onRequestClose={this.handleRequestClose}
                    >
                        {
                            planList.map((plan,i)=>{
                                return  <div className="plannamepop" key={ i } onClick={ this.selectPlan.bind(this,plan) }>
                                            <span className="type">{plan.label}</span>
                                            <span className="value">${plan.price}</span>
                                        </div>
                            })
                        }
                    </Popover>
                    <p className="divlabel">DATABASE</p>
                    <div className="divdetail">
                        <span className="type">API Calls</span>
                        <span className="value">{ this.state.selectedPlan.usage[0].features[0].limit.label }</span>
                    </div>
                    <div className="divdetail">
                        <span className="type">Storage</span>
                        <span className="value">{ this.state.selectedPlan.usage[0].features[1].limit.label }</span>
                    </div>
                    <p className="divlabel">REALTIME</p>
                    <div className="divdetail">
                        <span className="type">Connections</span>
                        <span className="value">{ this.state.selectedPlan.usage[1].features[0].limit.label }</span>
                    </div>
                    <p className="divlabel">MISC</p>
                    <div className="divdetail">
                        <span className="type">MongoDB Access</span>
                        <span className="value">{ this.state.selectedPlan.usage[2].features[0].limit.show ? 'Available' : '-' }</span>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state,selfProps) => {
    return {
        cards:state.cards,
        planId: selfProps.planId,
        appId: selfProps.appId,
        loading: state.loader.modal_loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCards: () => dispatch(getCards()),
        addCard: (name,number,expMonth,expYear) => dispatch(addCard(name,number,expMonth,expYear)),
        createSale: (appId, cardDetails, planId) => dispatch(createSale(appId, cardDetails, planId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Upgrade)
