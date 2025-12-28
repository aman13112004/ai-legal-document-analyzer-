document.addEventListener('DOMContentLoaded', function() {
    initializeUploadPage();
    initializeResultPage();
});

function initializeUploadPage() {
    const uploadBox = document.getElementById('uploadBox');
    const fileInput = document.getElementById('fileInput');
    const fileName = document.getElementById('fileName');
    const uploadForm = document.getElementById('uploadForm');
    const submitBtn = document.getElementById('submitBtn');
    const loadingIndicator = document.getElementById('loadingIndicator');

    if (!uploadBox) return;

    fileInput.addEventListener('change', function(e) {
        if (this.files && this.files[0]) {
            const file = this.files[0];
            const fileSize = (file.size / 1024 / 1024).toFixed(2);
            fileName.textContent = `${file.name} (${fileSize} MB)`;
            fileName.style.color = '#088395';
        } else {
            fileName.textContent = 'No file selected';
            fileName.style.color = '#6c757d';
        }
    });

    uploadBox.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.classList.add('drag-over');
    });

    uploadBox.addEventListener('dragleave', function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.classList.remove('drag-over');
    });

    uploadBox.addEventListener('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.classList.remove('drag-over');

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            fileInput.files = e.dataTransfer.files;
            const file = e.dataTransfer.files[0];
            const fileSize = (file.size / 1024 / 1024).toFixed(2);
            fileName.textContent = `${file.name} (${fileSize} MB)`;
            fileName.style.color = '#088395';
        }
    });

    uploadForm.addEventListener('submit', function(e) {
        if (!fileInput.files || !fileInput.files[0]) {
            e.preventDefault();
            alert('Please select a file to upload');
            return;
        }

        const file = fileInput.files[0];
        const maxSize = 50 * 1024 * 1024;

        if (file.size > maxSize) {
            e.preventDefault();
            alert('File size exceeds 50MB limit. Please choose a smaller file.');
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Processing...';
        loadingIndicator.classList.add('active');
    });

    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${0.2 + (index * 0.1)}s`;
    });
}

function initializeResultPage() {
    const sections = document.querySelectorAll('.section');
    if (sections.length === 0) return;

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    animateStatCards();
    animateListItems();
}

function animateStatCards() {
    const statCards = document.querySelectorAll('.stat-card');

    statCards.forEach((card, index) => {
        setTimeout(() => {
            const statNumber = card.querySelector('.stat-number');
            if (!statNumber) return;

            const targetNumber = parseInt(statNumber.textContent);
            let currentNumber = 0;

            const duration = 1000;
            const steps = 30;
            const increment = targetNumber / steps;
            const stepDuration = duration / steps;

            const timer = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= targetNumber) {
                    currentNumber = targetNumber;
                    clearInterval(timer);
                }
                statNumber.textContent = Math.floor(currentNumber);
            }, stepDuration);
        }, index * 150);
    });
}

function animateListItems() {
    const listItems = document.querySelectorAll('.section li');

    listItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';

        setTimeout(() => {
            item.style.transition = 'all 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 100 * index);
    });
}

window.onbeforeprint = function() {
    document.body.style.background = 'white';
};

window.onafterprint = function() {
    document.body.style.background = '';
};
