document.getElementById('imageInput').addEventListener('change', function (e) {
    const imageContainer = document.getElementById('qrCode');
    const file = e.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.src = e.target.result;
            img.onload = function () {
                imageContainer.innerHTML = '';
                imageContainer.appendChild(img);
            };
        };
        reader.readAsDataURL(file);
    }
});

function generatePDF() {
    const textInput = document.getElementById('textInput').value;
    const qrCodeContainer = document.getElementById('qrCode');

    html2canvas(qrCodeContainer).then(function (canvas) {
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const pdf = new jsPDF();
        const imgWidth = pdf.internal.pageSize.getWidth() - 20;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'JPEG', 10, 10, imgWidth, imgHeight);
        pdf.text(20, imgHeight + 20, textInput);

        pdf.save('output.pdf');
    });
}
