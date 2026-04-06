import '../App.css';

export default function FinalPage({ finalFrame }) {
    return (
        <div className="final-page">
            <div className="final-layout">
                <div className="final-left">
                    <img src={finalFrame} alt="" className="final-frame-image" />
                </div>

                <div className="final-right">
                    <div className="final-qr-card">
                        <div className="final-qr-text">
                            QR 코드를 스캔해 완성본을
                            <br />
                            저장하세요!
                        </div>

                        <div className="final-qr-box">QR</div>
                    </div>

                    <button type="button" className="final-print-button">
                    출력하기
                    </button>
                </div>
            </div>
        </div>
        );
}
