const sections = document.querySelectorAll('section');
const aboutTextElement = document.getElementById('aboutText');
const aboutFullText = "I’m a software developer passionate about crafting efficient, scalable applications. With a solid foundation in Java Full Stack Development and a focus on AI/ML, I’m currently growing my skills in leadership as a Management Trainee at NeML. My goal is to leverage technology to solve complex problems and contribute to innovative solutions.";

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Typing effect function
let charIndex = 0;
function typeWriter(text, element, speed) {
    element.textContent = ''; // Clear existing text
    element.classList.add('typing-text');
    charIndex = 0;
    function type() {
        if (charIndex < text.length) {
            element.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(type, speed);
        } else {
            element.classList.remove('typing-text');
        }
    }
    type();
}

// Initialize typing effect on About section when it's in view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id === 'about') {
            typeWriter(aboutFullText, aboutTextElement, 30);
            observer.unobserve(entry.target); // Stop observing once typed
        }
    });
}, { threshold: 0.5 }); // Trigger when 50% of the section is visible

observer.observe(document.getElementById('about'));

// Experience timeline toggle
function toggleDetails(id) {
    const element = document.getElementById(id);
    element.classList.toggle('hidden');
}

// Skills Chart
const skillsData = {
    languages: [
        { skill: 'Java', level: 90 }, { skill: 'Python', level: 85 }, 
        { skill: 'JavaScript', level: 80 }, { skill: 'HTML/CSS', level: 95 }
    ],
    aiml: [
        { skill: 'Machine Learning', level: 85 },
        { skill: 'Deep Learning', level: 80 },
        { skill: 'Natural Language Processing', level: 75 },
        { skill: 'Computer Vision', level: 70 },
        { skill: 'AI Chatbots', level: 80 }
    ],
    frameworks: [
        { skill: 'Spring Boot', level: 85 }, { skill: 'Angular', level: 75 },
        { skill: 'Node.js', level: 70 }, { skill: 'Hibernate/JPA', level: 80 }
    ],
    databases: [
        { skill: 'MySQL', level: 85 }, { skill: 'MongoDB', level: 75 }
    ],
    tools: [
        { skill: 'AWS', level: 70 }, { skill: 'Git', level: 90 },
        { skill: 'RESTful APIs', level: 90 }, { skill: 'Agile', level: 85 }, { skill: 'Microservices', level: 70}
    ]
};

let skillsChart;
function renderSkillsChart(category = 'all') {
    const ctx = document.getElementById('skillsChart').getContext('2d');
    let dataToShow = [];
    
    if (category === 'all') {
        dataToShow = Object.values(skillsData).flat();
    } else {
        dataToShow = skillsData[category];
    }

    const labels = dataToShow.map(s => s.skill);
    const data = dataToShow.map(s => s.level);
    
    if (skillsChart) {
        skillsChart.destroy();
    }

    skillsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Proficiency Level',
                data: data,
                backgroundColor: '#f97316', /* Orange color */
                borderColor: 'rgba(13, 110, 253, 1)',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Proficiency: ${context.raw}%`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100,
                     ticks: {
                        callback: function(value) { return value + "%" }
                    }
                },
                y: {
                    ticks: {
                        autoSkip: false,
                        callback: function(value, index, values) {
                            let label = this.getLabelForValue(value);
                            return label.length > 16 ? label.substring(0, 16) + '...' : label;
                        }
                    }
                }
            }
        }
    });
}

document.querySelectorAll('.skill-filter-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        document.querySelectorAll('.skill-filter-btn').forEach(btn => btn.classList.replace('bg-orange-600','bg-gray-200').replace('text-white','text-gray-700'));
        e.target.classList.replace('bg-gray-200','bg-orange-600').replace('text-gray-700','text-white');
        renderSkillsChart(e.target.dataset.category);
    });
});

// Project Modal
const projectDetails = {
    chatbot: {
        title: 'AI-Driven Student Information Provider CHATBOT',
        description: 'This project involved creating an intelligent chatbot to streamline access to student-related information. The chatbot can handle various queries regarding academic schedules, campus facilities, and general information, reducing the workload on administrative staff and providing instant support to students.',
        tech: ['Python', 'NLTK', 'TensorFlow', 'AI/ML']
    },
    ecommerce: {
        title: 'E-Commerce Website',
        description: 'A comprehensive, full-stack e-commerce platform built from the ground up. The application features user authentication, product catalogs, a shopping cart, and a checkout process. The backend is powered by a robust API to manage products, users, and orders.',
        tech: ['Java', 'Spring Boot', 'React.js', 'MySQL', 'RESTful APIs']
    },
    portfolio: {
        title: 'Intelligent Portfolio Website',
        description: 'A personal portfolio designed not just to list my projects, but to intelligently showcase my skills and journey. It uses modern web technologies to create a dynamic and engaging user experience, much like the one you are currently viewing.',
        tech: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS']
    }
};

const projectModal = document.getElementById('projectModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalTech = document.getElementById('modalTech');

document.querySelectorAll('.project-details-btn').forEach(button => {
    button.addEventListener('click', () => {
        const projectKey = button.dataset.project;
        const details = projectDetails[projectKey];
        
        modalTitle.textContent = details.title;
        modalDescription.textContent = details.description;
        modalTech.innerHTML = details.tech.map(t => `<span class="bg-gray-200 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">${t}</span>`).join('');

        projectModal.classList.remove('hidden');
        projectModal.classList.add('flex');
        setTimeout(() => projectModal.querySelector('div').classList.remove('scale-95'), 10);
    });
});

function closeModal() {
    projectModal.querySelector('div').classList.add('scale-95');
    setTimeout(() => {
        projectModal.classList.add('hidden');
        projectModal.classList.remove('flex');
    }, 300);
}

closeModalBtn.addEventListener('click', closeModal);
projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        closeModal();
    }
});

// Initial call for skills chart
renderSkillsChart();

// Scroll to Top button logic
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) { // Show button after scrolling 300px
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Copy Email button logic
const copyEmailBtn = document.getElementById('copyEmailBtn');
const copyMessage = document.getElementById('copyMessage');

copyEmailBtn.addEventListener('click', () => {
    const email = 'pradumn7028@gmail.com';
    const textArea = document.createElement('textarea');
    textArea.value = email;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    copyMessage.classList.remove('hidden');
    setTimeout(() => {
        copyMessage.classList.add('hidden');
    }, 2000);
});
