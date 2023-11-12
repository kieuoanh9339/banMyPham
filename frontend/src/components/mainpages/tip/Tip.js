import React, { useEffect, useContext, useState } from 'react'
import Dry from "./img/1_Dry.avif"
import Oily from "./img/1_Oily.avif"
import Normal from "./img/1_Normal.avif"
import Combo from "./img/1_Combo.avif"
import Acne from "./img/acne.avif"
import Aging from "./img/aging.avif"
import Uneven from "./img/uneven.avif"
import Sensitive from "./img/sensitive.avif"
import "./Tip.css"
function Tip() {

    return (
        <div className='tip-parent'>
            <div className='find-type'>
                <div className='header-tip'>
                    <h1>Find out your skin type</h1>
                </div>
                <div className='desc-tip'>
                    <i>Note: Wash your face with a gentle cleanser and wait 15 - 30 minutes. </i>
                </div>
                <div className='type-skin'>
                    <div className='infor-skin' >
                        <div className='dry-skin'>
                            <div className='img-dry' >
                                <img src={Dry} style={{ maxWidth: "200px" }}></img>
                            </div>
                            <div className='inf-dry'>Feels tight & dehydrated. Some flaky areas.</div>
                        </div>
                    </div>
                    <div className='infor-skin'>
                        <div className='dry-skin'>
                            <div className='img-dry'>
                                <img src={Oily} style={{ maxWidth: "200px" }}></img>
                            </div>
                            <div className='inf-dry'>Looks shiny & feels slick to the touch</div>
                        </div >
                    </div>
                    <div className='infor-skin'>
                        <div className='dry-skin'>
                            <div className='img-dry'>
                                <img src={Normal} style={{ maxWidth: "200px" }} ></img>
                            </div>
                            <div className='inf-dry'>Feels smooth, balanced & healthy.</div>
                        </div>
                    </div>
                    <div className='infor-skin'>
                        <div className='dry-skin'>
                            <div className='img-dry'>
                                <img src={Combo} style={{ maxWidth: "200px" }} ></img>
                            </div>
                            <div className='inf-dry'>Looks dry in some areas, but shiny in others. Particularly the T-zone (forehead, nose, & chin) Feels smooth, balanced & healthy.</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='find-type'>
                <div className='header-tip'>
                    <h1>What’s your main concern?</h1>
                </div>
                
                <div className='type-skin'>
                    <div className='infor-skin' >
                        <div className='dry-skin'>
                            <div className='img-dry' >
                                <img src={Acne} style={{ maxWidth: "200px" }}></img>
                            </div>
                            <div className='inf-dry'>Breakouts, blackheads or clogged pores</div>
                        </div>
                    </div>
                    <div className='infor-skin'>
                        <div className='dry-skin'>
                            <div className='img-dry'>
                                <img src={Aging} style={{ maxWidth: "200px" }}></img>
                            </div>
                            <div className='inf-dry'>Aging, loss of firmness or wrinkles</div>
                        </div >
                    </div>
                    <div className='infor-skin'>
                        <div className='dry-skin'>
                            <div className='img-dry'>
                                <img src={Uneven} style={{ maxWidth: "200px" }} ></img>
                            </div>
                            <div className='inf-dry'>Uneven skin tone or discoloration</div>
                        </div>
                    </div>
                    <div className='infor-skin'>
                        <div className='dry-skin'>
                            <div className='img-dry'>
                                <img src={Sensitive} style={{ maxWidth: "200px" }} ></img>
                            </div>
                            <div className='inf-dry'>Redness or sensitivity</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Tip