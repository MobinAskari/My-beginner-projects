export default function getRandomColor() {
    const colors = [
        '--blue700',
        '--rose700',
        '--rose800',
        '--green800',
        '--violet600',
        '--orange600',
    ];

    return colors[Math.floor(Math.random() * colors.length)];
}