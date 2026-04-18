    import React, { useState, useRef } from 'react';
    import Draggable from 'react-draggable';
    import '../App.css';

    // 에셋 임포트 (기존과 동일)
    import timer90 from "../assets/timer_90.png";
    import printVertical from "../assets/print_button.png";
    import star8 from "../assets/Star8.png";
    import star9 from "../assets/Star9.png";
    import star10 from "../assets/Star10.png";
    import star11 from "../assets/Star11.png";
    import star12 from "../assets/Star12.png";

    export default function DecoratePage({ finalFrame, onNext }) {
    const [stickers, setStickers] = useState([]);
    const [topStickerId, setTopStickerId] = useState(null);
    const nodeRefs = useRef({});

    const stickerAssets = [
        { id: 'star8', img: star8 },
        { id: 'star9', img: star9 },
        { id: 'star10', img: star10 },
        { id: 'star11', img: star11 },
        { id: 'star12', img: star12 },
    ];

    const spawnSticker = (img) => {
        const newId = Date.now();
        setStickers([...stickers, { id: newId, img, width: 120, height: 120, rotate: 0 }]);
        setTopStickerId(newId);
    };

    // 회전 핸들 로직
    const handleRotate = (id, e) => {
        e.stopPropagation();
        e.preventDefault();

        const targetRef = nodeRefs.current[id].current;
        if (!targetRef) return;

        const rect = targetRef.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const onMouseMove = (moveEvent) => {
        const angle = Math.atan2(moveEvent.clientY - centerY, moveEvent.clientX - centerX);
        const degree = angle * (180 / Math.PI);
        setStickers((prev) => prev.map((s) => (s.id === id ? { ...s, rotate: degree } : s)));
        };

        const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        };
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    const handleResize = (id, e) => {
        e.stopPropagation();
        e.preventDefault();
        const startX = e.clientX;
        const targetSticker = stickers.find(s => s.id === id);
        if (!targetSticker) return;
        const startWidth = targetSticker.width;
        const aspect = targetSticker.width / targetSticker.height;

        const onMouseMove = (moveEvent) => {
        const newWidth = Math.max(40, startWidth + (moveEvent.clientX - startX));
        setStickers((prev) => prev.map((s) => s.id === id ? { ...s, width: newWidth, height: newWidth / aspect } : s));
        };

        const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        };
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    return (
        <div className="decorate-page" onClick={() => setTopStickerId(null)}>
        <img src={timer90} alt="" className="decorate-timer-image" />
        <div className="decorate-layout">
            <button type="button" onClick={onNext} className="decorate-next-button-reset">
            <img src={printVertical} alt="넘어가기" className="decorate-print-button-image" />
            </button>

            <div className="decorate-frame-container" style={{ position: 'relative', display: 'inline-block' }}>
            <img src={finalFrame} alt="frame" className="decorate-frame-image" />

            {stickers.map((sticker) => {
                if (!nodeRefs.current[sticker.id]) nodeRefs.current[sticker.id] = React.createRef();
                const isSelected = topStickerId === sticker.id;

                return (
                <Draggable
                    key={sticker.id}
                    nodeRef={nodeRefs.current[sticker.id]}
                    onStart={() => setTopStickerId(sticker.id)}
                    cancel=".action-btn"
                    bounds="parent"
                >
                    {/* 핵심 수정: Draggable 바로 아래 div에는 rotate를 주지 않고, 
                    그 안의 내부 div(sticker-content)에 rotate를 주어야 충돌이 없습니다.
                    */}
                    <div
                    ref={nodeRefs.current[sticker.id]}
                    style={{
                        position: 'absolute',
                        top: '100px', left: '100px',
                        width: sticker.width, height: sticker.height,
                        zIndex: isSelected ? 999 : 10,
                        cursor: 'grab',
                    }}
                    >
                    <div
                        className="sticker-content"
                        style={{
                        width: '100%', height: '100%',
                        backgroundImage: `url(${sticker.img})`,
                        backgroundSize: '100% 100%',
                        backgroundRepeat: 'no-repeat',
                        transform: `rotate(${sticker.rotate}deg)`, // 여기서 회전 처리
                        outline: isSelected ? '2px dashed #4dabf7' : 'none',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {isSelected && (
                        <>
                            <div className="action-btn" onClick={() => setStickers(stickers.filter(s => s.id !== sticker.id))}
                            style={{ position: 'absolute', top: -15, left: -15, width: 25, height: 25, background: 'red', color: '#fff', borderRadius: '50%', textAlign: 'center', cursor: 'pointer', lineHeight: '22px' }}>×</div>
                            
                            <div className="action-btn" onMouseDown={(e) => handleRotate(sticker.id, e)}
                            style={{ position: 'absolute', top: -15, right: -15, width: 26, height: 26, background: '#4dabf7', borderRadius: '50%', cursor: 'alias', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', border: '2px solid white' }}>🔄</div>

                            <div className="action-btn" onMouseDown={(e) => handleResize(sticker.id, e)}
                            style={{ position: 'absolute', bottom: -10, right: -10, width: 20, height: 20, background: '#333', border: '2px solid white', borderRadius: '50%', cursor: 'nwse-resize' }} />
                        </>
                        )}
                    </div>
                    </div>
                </Draggable>
                );
            })}
            </div>

            <div className="decorate-sticker-panel">    
            {stickerAssets.map((asset) => (
                <img key={asset.id} src={asset.img} alt="origin" style={{ cursor: 'pointer', width: 100, height: 'auto' }} onClick={(e) => { e.stopPropagation(); spawnSticker(asset.img); }} />
            ))}
            </div>
        </div>
        </div>
    );
    }