import '../App.css';
import timer90 from "../assets/timer_90.png";
import printVertical from "../assets/print_button.png";
import stickerPanel from "../assets/sticker_panel.png";

export default function DecoratePage({ finalFrame, onNext }) {
return (
    <div className="decorate-page">
        <img src={timer90} alt="" className="decorate-timer-image" />

        <div className="decorate-layout">
            <button
                type="button"
                onClick={onNext}
                className="decorate-next-button-reset"
            >
                <img
                src={printVertical}
                alt="넘어가기"
                className="decorate-print-button-image"
                />
            </button>

            <img src={finalFrame} alt="" className="decorate-frame-image" />

            <img
                src={stickerPanel}
                alt=""
                className="decorate-sticker-panel-image"
            />
            </div>
        </div>
    );
}
