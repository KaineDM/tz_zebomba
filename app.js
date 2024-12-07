const { useState, useEffect } = React;

// Данные для приложения
const data = {
    "rating": [
        {
            "id": "123",
            "name": "Владимир",
            "lastName": "Ларионов",
            "img": "./male.png",
            "points": "463"
        },
        {
            "id": "9",
            "name": "Владимир",
            "lastName": "Сергеев",
            "img": "./male.png",
            "points": "521"
        },
        {
            "id": "231",
            "name": "Вениамин",
            "lastName": "Васильев",
            "img": "./male.png",
            "points": "865"
        },
        {
            "id": "321",
            "name": "Мария",
            "lastName": "Логинова",
            "img": "./female.png",
            "points": "865"
        },
        {
            "id": "492",
            "name": "Борис",
            "lastName": "Казанцев",
            "img": "./male.png",
            "points": "784"
        },
        {
            "id": "452",
            "name": "Полина",
            "lastName": "Калинина",
            "img": "./female.png",
            "points": "225"
        },
        {
            "id": "796",
            "name": "Даниил",
            "lastName": "Воробьёв",
            "img": "./male.png",
            "points": "642"
        },
        {
            "id": "4",
            "name": "Эрик",
            "lastName": "Аксёнов",
            "img": "./male.png",
            "points": "150"
        },
        {
            "id": "1155",
            "name": "Иван",
            "lastName": "Иванов",
            "img": "./male.png",
            "points": "100"
        },
        {
            "id": "12145",
            "name": "Артем",
            "lastName": "Алексеев",
            "img": "./male.png",
            "points": "1000"
        }
    ],
    "friends": [
        {
            "id": "9",
            "name": "Владимир",
            "lastName": "Сергеев",
            "img": "./male.png"
        },
        {
            "id": "4",
            "name": "Эрик",
            "lastName": "Аксёнов",
            "img": "./male.png"
        },
        {
            "id": "15411",
            "name": "Ирина",
            "lastName": "Чеснокова",
            "img": "./female.png"
        },
        {
            "id": "15564",
            "name": "Дарина",
            "lastName": "Боброва",
            "img": "./female.png"
        }
    ]
};

const pathPoints = [
    { x: 450, y: 400, id: 1 },
    { x: 200, y: 300, id: 2 },
    { x: 350, y: 200, id: 3 },
    { x: 500, y: 150, id: 4 },
    { x: 650, y: 250, id: 5 }
];

// Компонент рейтинга
function RatingWindow({ onClose }) {
    const sortedRating = [...data.rating].sort((a, b) => parseInt(b.points) - parseInt(a.points));
    
    const isFriend = (id) => data.friends.some(friend => friend.id === id);

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: 'white',
            borderRadius: '0 0 8px 8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
            <div style={{
                padding: '16px',
                borderBottom: '1px solid #eee',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h2 style={{ margin: 0 }}>Рейтинг</h2>
                <button onClick={onClose} style={{
                    border: 'none',
                    background: 'none',
                    fontSize: '20px',
                    cursor: 'pointer'
                }}>×</button>
            </div>
            <div style={{ height: '400px', overflowY: 'auto', padding: '16px' }}>
                <table className="rating-table">
                    <thead>
                        <tr>
                            <th>Позиция</th>
                            <th>Фото</th>
                            <th>Имя</th>
                            <th>Фамилия</th>
                            <th>Очки</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedRating.map((entry, index) => (
                            <tr key={entry.id} className={isFriend(entry.id) ? 'friend-row' : ''}>
                                <td>{index + 1}</td>
                                <td>
                                    <img src={entry.img} alt={`${entry.name} ${entry.lastName}`} style={{width: '30px', height: '30px', borderRadius: '50%'}} />
                                </td>
                                <td>{entry.name}</td>
                                <td>{entry.lastName}</td>
                                <td>{entry.points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// Основной компонент приложения
function UniversityMap() {
    const [currentPoint, setCurrentPoint] = useState(0);
    const [showRating, setShowRating] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    const moveToNextPoint = () => {
        setCurrentPoint((prev) => (prev + 1) % pathPoints.length);
    };

    const handleSlide = (direction) => {
        setCurrentSlide((prev) => {
            if (direction === 'left') {
                return Math.max(0, prev - 1);
            }
            return Math.min(7, prev + 1);
        });
    };

    return (
        <div style={{
            position: 'relative',
            width: '980px',
            height: '630px',
            margin: '20px auto',
            backgroundColor: '#2D8B7E',
            overflow: 'hidden'
        }}>
            {/* Карта */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: '#2D8B7E'
            }} />

            {/* Персонаж */}
            <div className="character" style={{
                transform: `translate(${pathPoints[currentPoint].x}px, ${pathPoints[currentPoint].y}px)`
            }} />

            {/* Нижний интерфейс */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.1)'
            }}>
                {/* Слайдер аватаров */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button onClick={() => handleSlide('left')} style={{
                        padding: '8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}>←</button>
                    
                    <div style={{ 
                        display: 'flex',
                        gap: '8px',
                        width: '400px',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            display: 'flex',
                            gap: '8px',
                            transform: `translateX(-${currentSlide * 56}px)`,
                            transition: 'transform 0.3s ease'
                        }}>
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="avatar" />
                            ))}
                        </div>
                    </div>

                    <button onClick={() => handleSlide('right')} style={{
                        padding: '8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}>→</button>
                </div>

                {/* Кнопка "В универ" */}
                <button onClick={moveToNextPoint} style={{
                    padding: '12px 32px',
                    backgroundColor: '#F59E0B',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '16px'
                }}>В УНИВЕР</button>

                {/* Кнопка рейтинга */}
                <button onClick={() => setShowRating(true)} style={{
                    padding: '12px',
                    backgroundColor: '#F59E0B',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}>
                    <div style={{
                        width: '24px',
                        height: '24px',
                        backgroundColor: '#D97706'
                    }} />
                </button>
            </div>

            {/* Окно рейтинга */}
            {showRating && <RatingWindow onClose={() => setShowRating(false)} />}
        </div>
    );
}

// Рендеринг приложения
ReactDOM.render(<UniversityMap />, document.getElementById('root'));
