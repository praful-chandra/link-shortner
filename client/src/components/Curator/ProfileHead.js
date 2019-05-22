import React from 'react'

export default function ProfileHead() {
    const CuratorCover = require("../../images/curator/best-curator.png");

  return (
    <div>
    <div className="curatorPage-hero container">
   <div className="row">
       <div className="col-md-5 mobile-curatorPage-hero-img">
           <div className="curatorPage-hero-image-wrapper">
               <img src={CuratorCover} alt="" />
           </div>

           <ul className="curatorPage-hero-image-dots">
               <li></li>
               <li></li>
               <li></li>
               <li></li>
           </ul>
       </div>
       <div className="col-md-7 curatorPage-hero-right-desktop">
           <div className="curatorPage-hero-title">
               <div className="curatorPage-hero-title-name">Shripriya Jain</div>
               <button className="curatorPage-hero-title-followbtn">Follow</button>
           </div>

           <div className="curatorPage-hero-divider curatorPage-hero-divider-top"> </div>
           <div className="curatorPage-hero-text">
               <p className="curatorPage-hero-text-p1">Hi, I am Shripriya Jain, a Fashion blogger and an avid
                   youtuber with a Superb taste in Street Styles, curating
                   across the globe</p>
               <p className="curatorPage-hero-text-p2">
                   She has Travelled excessively in Search of her calling
                   of Lorem Ipsum of the nice and beautiful description about
                   the curato
               </p>

           </div>

           <div className="curatorPage-hero-divider curatorPage-hero-divider-bottom"> </div>
           <div className="curatorPage-hero-scroll">Scroll Down to Explore My Looks</div>
       </div>
      {/* ------------------------------------------------- Mobile version --------------------------------------------------------------------------------  */}

       <div className="mobile-curatorPage mobile-curatorPage-box">
           <div className="mobile-curatorPage-hero-title">
               <div className="curatorPage-hero-title-name">Shripriya Jain</div>
               <button className="curatorPage-hero-title-followbtn">Follow</button>
           </div>
           <div className="mobile-curatorPage-hero-text">
               <p className="curatorPage-hero-text-p1">
                   <br/><br/>
                   Hi, I am Shripriya Jain, a Fashion blogger and an avid
                   youtuber with a Superb taste in Street Styles, curating
                   across the globe</p>
               <p className="curatorPage-hero-text-p2">
                   She has Travelled excessively in Search of her calling
                   of Lorem Ipsum of the nice and beautiful description about
                   the curato
               </p>

           </div>


           <div className="mobile-curatorPage-hero-scroll">Scroll Down to Explore My Looks</div>

       </div>
        {/* ------------------------------------------------- Mobile version --------------------------------------------------------------------------------  */}

   </div>


</div>
 </div>
  )
}
