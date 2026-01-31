import React from 'react'
import '../sessionnumper/sessionNum.css'
import img from '../../assets/imges/669ea6ce02f71816dbbfd2336044eb6e.jpg'

function SessionNum() {
    return (
        <div className='SessionNum'>
            <div className="immgcon">
                <img src={img} alt="" />
            </div>
            <div className="information">
                <div className="pspanfft">
                    <h3>Special Summer Sale</h3>
                    <p>Get up to 70% off on selected items. Limited time offer!</p>
                </div>
                <div className="date">
                    <div className="days">
                        <b>15</b>
                        <span>Days</span>
                    </div>
                    <div className="days">
                        <b>08</b>
                        <span>Hours</span>
                    </div>
                    <div className="days">
                        <b>45</b>
                        <span>Min</span>
                    </div>
                    <div className="days">
                        <b>23</b>
                        <span>Sec</span>
                    </div>
                </div>
                <div className="bdfstn">
                    <button className='fsdfkrl'>Shop Sale Now</button>
                </div>
            </div>

        </div>
    )
}

export default SessionNum