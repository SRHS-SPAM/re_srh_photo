// import '../App.css';
// import mainIntro from "../assets/main.png";

// export default function IntroPage({ onNext }) {

//     return (
//         <div className="intro-page">
//             <div className="intro-wrap">
//                 <div className="intro-image-box">
//                     {/* 메인 배경 이미지 */}
//                     <img
//                         src={mainIntro}
//                         alt="SPAM 첫 화면"
//                         className="intro-main-image"
//                     />

//                     {/* App.js의 setPage("tutorial")을 실행시키는 버튼 */}
//                     <button
//                         type="button"
//                         className="intro-start-hitbox"
//                         onClick={onNext} 
//                         aria-label="시작하기"
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }
import { useState, useEffect } from "react";
import '../App.css';
import mainIntro from "../assets/main.png";

export default function IntroPage({ onNext }) {
    return (
        <div className="intro-page">
            <div className="intro-wrap">
                <div className="intro-image-box">
                    {/* 메인 배경 이미지 */}
                    <img
                        src={mainIntro}
                        alt="SPAM 첫 화면"
                        className="intro-main-image"
                    />

                    {/* 클릭 히트박스 버튼 */}
                    <button
                        type="button"
                        className="intro-start-hitbox"
                        onClick={onNext} 
                        aria-label="시작하기"
                    />
                </div>
            </div>
        </div>
    );
}