const astronaut1 = document.getElementById('astronaut-1');
const astronaut2 = document.getElementById('astronaut-2');
const moveLeftButton = document.getElementById('move-left');
const moveRightButton = document.getElementById('move-right');
const distanceElement = document.getElementById('distance');

let distance = 100; // Başlangıç mesafesi

// Yörüngedeki hareketi simüle etmek için bazı parametreler
let angle1 = 0;
let angle2 = 180; // Farklı yörüngelere yerleştirilmiş, birbirinden uzak

// Astronot hareket fonksiyonları
function moveAstronaut(astronaut, angle) {
    const radius = 250; // Yörünge çapı
    const x = radius * Math.cos(angle * Math.PI / 180) + 300; // Orta nokta etrafında hareket
    const y = radius * Math.sin(angle * Math.PI / 180) + 300;

    astronaut.style.left = `${x - astronaut.offsetWidth / 2}px`;
    astronaut.style.top = `${y - astronaut.offsetHeight / 2}px`;
}

// Mesafe hesaplaması
function calculateDistance() {
    const x1 = 300 + 250 * Math.cos(angle1 * Math.PI / 180);
    const y1 = 300 + 250 * Math.sin(angle1 * Math.PI / 180);
    const x2 = 300 + 250 * Math.cos(angle2 * Math.PI / 180);
    const y2 = 300 + 250 * Math.sin(angle2 * Math.PI / 180);

    // İki nokta arasındaki mesafeyi hesapla
    const dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    distance = Math.round(dist);
    distanceElement.textContent = distance;
}

// Karakter hareketini güncelle
function updatePositions() {
    moveAstronaut(astronaut1, angle1);
    moveAstronaut(astronaut2, angle2);
    calculateDistance();
}

// Düğme işlevleri
moveLeftButton.addEventListener('click', () => {
    angle1 -= 10; // Astronot 1 sola hareket eder
    angle2 += 10; // Astronot 2 sağa hareket eder
    updatePositions();
});

moveRightButton.addEventListener('click', () => {
    angle1 += 10; // Astronot 1 sağa hareket eder
    angle2 -= 10; // Astronot 2 sola hareket eder
    updatePositions();
});

// Başlangıçta pozisyonları güncelle
updatePositions();
