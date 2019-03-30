import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Lost.css';
import prem1 from '../../assets/lost/prem1.png'
import prem2 from '../../assets/lost/prem2.png'
import prem3 from '../../assets/lost/prem3.png'
import mavi1 from '../../assets/lost/mavi1.png'
import mavi2 from '../../assets/lost/mavi2.png'
import mavi3 from '../../assets/lost/mavi3.png'
import sharma1 from '../../assets/lost/sharma1.png'
import sharma2 from '../../assets/lost/sharma2.png'
import sharma3 from '../../assets/lost/sharma3.png'
import kunji1 from '../../assets/lost/kunji1.png'
import kunji2 from '../../assets/lost/kunji2.png'
import kunji3 from '../../assets/lost/kunji3.png'

class Lost extends Component {

  constructor(){
    super();
    this.state={
      deadUser: ''
    }
  }
  onPress = (event) =>{
    const deadUser = event.target.getAttribute('value');
    this.setState({deadUser});
    fetch('/api/lost', {
      method: 'post',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        user: deadUser
      })
    })
    .then(response => response.json())
    .then(res => console.log(res))
    .catch(console.log);
  }

  render() {
    return (
      <div>
        <section className="min-vh-100 overflow-y-hidden bg-lightest-blue">
          <header className="tl ph4 lh-copy">
              <h1 className="f1 pb0 mb0 code fw9 dib tracked-tight light-purple">404</h1>
              <h2 className="pt0 mt0 fw2">Whoops! Page Not Found</h2>
          </header>
          <p className="fw1 dark-gray i tc mt1 mt4-ns mt5-l f4 f3-ns baskerville">One of our Development Team must be punished for this unacceptable failure!</p>
          {(this.state.deadUser)?
              <div>
                <p className="fw1 bold tc mt1 mt4-ns mt2-l f4 f3-ns fw6">{this.state.deadUser.toUpperCase()}, YOU'RE FIRED!</p>
                <div className="ph3 w-100">
                { (this.state.deadUser === 'Chopra')?
                    <div className='w-25 dib'><img className='lostPics' src={prem3} alt ='' /></div>
                  : <div className='w-25 dib'><img className='lostPics' src={prem2} alt ='' /></div>
                }
                { (this.state.deadUser === 'Kunji')?
                    <div className='w-25 dib'><img className='lostPics' src={kunji3} alt ='' /></div>
                  : <div className='w-25 dib'><img className='lostPics' src={kunji2} alt ='' /></div>
                }
                { (this.state.deadUser === 'Mavi')?
                    <div className='w-25 dib'><img className='lostPics' src={mavi3} alt ='' /></div>
                  : <div className='w-25 dib'><img className='lostPics' src={mavi2} alt ='' /></div>
                }
                { (this.state.deadUser === 'Sharma')?
                    <div className='w-25 dib'><img className='lostPics' src={sharma3} alt ='' /></div>
                  : <div className='w-25 dib'><img className='lostPics' src={sharma2} alt ='' /></div>
                }
                </div>

                <h2 className="pt0 dark-gray mt3 fw2 tc">Poor {this.state.deadUser}</h2>
                <p className="fw1 dark-gray tc mt3 mt5-l mb0 f4 f3-ns baskerville">We're not saying revenge is in {this.state.deadUser}'s nature but you might want to change your IP address now!</p>
              </div>
            :
              <div>
                <p className="fw1 bold tc mt1 mt4-ns mt2-l f4 f3-ns fw6">PICK WHO TO FIRE!</p>

                <div className="ph3 w-100">
                  <div className='w-25 dib'><img className='lostPics' src={prem1} alt ='' /></div>
                  <div className='w-25 dib'><img className='lostPics' src={kunji1} alt ='' /></div>
                  <div className='w-25 dib'><img className='lostPics mavi1' src={mavi1} alt ='' /></div>
                  <div className='w-25 dib'><img className='lostPics' src={sharma1} alt ='' /></div>
                </div>


                <div className="mt1 ph3 w-100">
                  <div className='w-25 dib'><span className="f5 fw5 link dim br3 ph3 pv2 mb1 dib white bg-light-purple pointer" value="Chopra" onClick={this.onPress}>Chopra</span></div>
                  <div className='w-25 dib'><span className="f5 fw5 link dim br3 ph3 pv2 mb1 dib white bg-light-purple pointer" value="Kunji" onClick={this.onPress}>Kunji</span></div>
                  <div className='w-25 dib'><span className="f5 fw5 link dim br3 ph3 pv2 mb1 dib white bg-light-purple pointer" value="Mavi" onClick={this.onPress}>Mavi</span></div>
                  <div className='w-25 dib'><span className="f5 fw5 link dim br3 ph3 pv2 mb1 dib white bg-light-purple pointer" value="Sharma" onClick={this.onPress}>Sharma</span></div>
                </div>

                <p className="fw1 dark-gray tc mt4 mt5-l mb0 f4 f3-ns baskerville">In a forgiving mood? Let them all keep their jobs.</p>
              </div>
          }
          <p className="fw1 dark-gray tc mt3 f4 f3-ns baskerville">Return to the <Link to='/' className="dib link dark-gray light-purple hover-light-purple fw6" id=''>homepage</Link>.
          </p>
        </section>
      </div>
    );
  }
}

export default Lost;
