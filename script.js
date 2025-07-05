
function generateImage() {
    const canvas = document.getElementById('newsCanvas');
    const ctx = canvas.getContext('2d');
    const type = document.getElementById('newsType').value;
    const text = document.getElementById('newsText').value;
    const date = new Date().toLocaleDateString('ar-EG', {
        day: 'numeric', month: 'long', year: 'numeric'
    });

    const bg = new Image();
    bg.src = 'assets/bg.jpg';
    bg.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

        // تدرجات الخلفية حسب نوع الخبر
        let overlayColor;
        switch (type) {
            case 'urgent':
                overlayColor = 'rgba(90, 0, 0, 0.6)';
                break;
            case 'trending':
                overlayColor = 'rgba(90, 60, 0, 0.6)';
                break;
            case 'death':
                overlayColor = 'rgba(20, 20, 20, 0.7)';
                break;
            case 'announcement':
                overlayColor = 'rgba(0, 30, 60, 0.6)';
                break;
        }

        ctx.fillStyle = overlayColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // النص الذهبي
        ctx.fillStyle = '#D4AF37';
        ctx.font = 'bold 42px Qumrah, sans-serif';
        wrapText(ctx, text, canvas.width / 2, canvas.height / 2, 900, 60);

        // التاريخ
        ctx.font = '28px Qumrah, sans-serif';
        ctx.fillText(date, canvas.width - 200, canvas.height - 40);

        // التوقيع
        ctx.font = '26px Qumrah, sans-serif';
        ctx.fillText("مـن الـقورية", 40, canvas.height - 40);
    };
}

function wrapText(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '', lines = [];
    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = context.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
            lines.push(line);
            line = words[n] + ' ';
        } else {
            line = testLine;
        }
    }
    lines.push(line);
    y -= (lines.length - 1) * lineHeight / 2;
    for (let l = 0; l < lines.length; l++) {
        context.fillText(lines[l], x, y);
        y += lineHeight;
    }
}

function downloadImage() {
    const canvas = document.getElementById('newsCanvas');
    const link = document.createElement('a');
    link.download = 'news-image.png';
    link.href = canvas.toDataURL();
    link.click();
}
