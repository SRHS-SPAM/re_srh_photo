import '../App.css';
import timer90 from "../assets/timer_90.png";
import nextButton from "../assets/next_button.png";
import filterNormal from "../assets/filter_normal.png";
import filterSoft from "../assets/filter_soft.png";
import filterWarm from "../assets/filter_warm.png";
import filterSunset from "../assets/filter_sunset.png";
import filterCool from "../assets/filter_cool.png";
import filterBw from "../assets/filter_bw.png";

const FILTER_ITEMS = [
    { id: "normal", label: "일반", image: filterNormal },
    { id: "soft", label: "부드러운", image: filterSoft },
    { id: "warm", label: "따뜻한", image: filterWarm },
    { id: "sunset", label: "노을", image: filterSunset },
    { id: "cool", label: "차가운", image: filterCool },
    { id: "bw", label: "흑백", image: filterBw },
];

export default function FilterPage({ finalFrame, onNext }) {
    return (
        <div className="filter-page">
            <img src={timer90} alt="" className="filter-timer-image" />

                <div className="filter-top-area">
                    <img src={finalFrame} alt="" className="filter-main-frame-image" />

                        <button
                            type="button"
                            className="filter-next-button-reset"
                            onClick={onNext}
                        >
                            <img
                            src={nextButton}
                            alt="넘어가기"
                            className="filter-next-button-image"
                            />
                        </button>
                    </div>

                <div className="filter-bottom-panel">
                    <div className="filter-list">
                        {FILTER_ITEMS.map((item) => (
                        <div key={item.id} className="filter-item">
                            <img
                            src={item.image}
                            alt={item.label}
                            className="filter-thumb-image"
                            />
                            <div className="filter-label">{item.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
