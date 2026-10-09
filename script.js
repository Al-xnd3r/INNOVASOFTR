const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbwGmS2ner9SAitZ_vEtJP92mqkefJ53MP5YHu16H5qCKGMZDaL2qSxq6VakwlqzF5Fk/exec";

/* SISTEMA DE INACTIVIDAD (30 segundos MANTENIDO) */
let inactivityTimer;

function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    const activeUser = localStorage.getItem('innovasoft_user');
    if (activeUser) {
        inactivityTimer = setTimeout(autoLogout, 30000);
    }
}

function autoLogout() {
    const activeUser = localStorage.getItem('innovasoft_user');
    if (activeUser) {
        logout();
        alert('Tu sesión se ha cerrado automáticamente por inactividad (30 segundos sin uso).');
    }
}

['mousemove', 'keydown', 'click', 'scroll', 'touchstart'].forEach(evt => {
    window.addEventListener(evt, resetInactivityTimer, true);
});

/* GESTIÓN DE COOKIES */
function checkCookieConsent() {
    const cookiesAccepted = localStorage.getItem('innovasoft_cookies_accepted');
    const banner = document.getElementById('cookieBanner');
    if (!cookiesAccepted && banner) {
        banner.style.display = 'block';
    }
}

function acceptCookies() {
    localStorage.setItem('innovasoft_cookies_accepted', 'true');
    const banner = document.getElementById('cookieBanner');
    if (banner) {
        banner.style.display = 'none';
    }
}

/* LECTURA DE TEXTO EN VOZ ALTA (TEXT-TO-SPEECH) */
function speakCardText(cardId) {
    if (!('speechSynthesis' in window)) {
        alert('Tu navegador no soporta la función de lectura de voz.');
        return;
    }

    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        return;
    }

    const card = document.getElementById(cardId);
    if (!card) return;

    const clone = card.cloneNode(true);
    const btn = clone.querySelector('.btn-speaker');
    if (btn) btn.remove();
    const textToSpeak = clone.innerText.trim();

    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    const currentLang = document.getElementById('langSelect').value;
    const langMap = {
        es: 'es-ES',
        en: 'en-US',
        pt: 'pt-BR',
        zh: 'zh-CN'
    };

    utterance.lang = langMap[currentLang] || 'es-ES';
    utterance.rate = 0.95;

    window.speechSynthesis.speak(utterance);
}

/* MÓVIL: TOGGLE DE BUSCADOR CON LUPA */
function toggleMobileSearch() {
    const container = document.getElementById('searchContainer');
    container.classList.toggle('mobile-open');
    if(container.classList.contains('mobile-open')) {
        document.getElementById('searchInput').focus();
    }
}

/* VALIDACIÓN ESTRICTA DE CORREO */
function esCorreoValido(email) {
    const cleanEmail = email.trim().toLowerCase();
    const dominiosValidos = ['@gmail.com', '@hotmail.com', '@outlook.com', '@yahoo.com'];
    return dominiosValidos.some(dominio => cleanEmail.endsWith(dominio));
}

/* VALIDACIÓN DE CONTRASEÑA (8 CARACTERES MÍNIMO) */
function esPasswordValida(password) {
    return password && password.length >= 8;
}

function esTarjetaValida(tarjeta) {
    const regexTarjeta = /^\d{16}$/;
    return regexTarjeta.test(tarjeta.trim());
}

/* MOSTRAR / OCULTAR CONTRASEÑA (OJITO) */
function togglePasswordVisibility(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    if (!input || !icon) return;

    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fa-solid fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fa-solid fa-eye';
    }
}

/* GENERADOR AUTOMÁTICO DE CONTRASEÑA (MANTIENE CAMPO OCULTO) */
function generateSecurePassword(inputId) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 10; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    const input = document.getElementById(inputId);
    if (input) {
        input.value = password;
        input.type = "password"; // Mantiene los puntos de ocultación al generar
    }
}

const searchIndex = [
    { title: "Requerimiento Funcional (Autenticación / OTP)", section: "presentacion", targetId: "req-funcional", category: "Ejemplo de Requerimiento" },
    { title: "Requerimiento No Funcional (Tiempo de Respuesta)", section: "presentacion", targetId: "req-nofuncional", category: "Ejemplo de Requerimiento" },
    { title: "Análisis Ágil de Requerimientos", section: "inicio", targetId: "req-analisis-agil", category: "Características" },
    { title: "Alta Seguridad y Protocolos", section: "inicio", targetId: "req-alta-seguridad", category: "Características" },
    { title: "Soporte Multiplataforma (iOS, Android, Windows)", section: "inicio", targetId: "req-multiplataforma", category: "Características" },
    { title: "Concepto: ¿Qué es un Requerimiento?", section: "presentacion", targetId: "req-concepto", category: "Teoría" },
    { title: "Elementos de un Requerimiento (Entrada, Salida, Proceso)", section: "presentacion", targetId: "req-elementos", category: "Teoría" },
    { title: "Requerimiento Unívoco y Claro", section: "presentacion", targetId: "req-univoco", category: "Características" },
    { title: "Requerimiento Verificable", section: "presentacion", targetId: "req-verificable", category: "Características" },
    { title: "Requerimiento Necesario", section: "presentacion", targetId: "req-necesario", category: "Características" },
    { title: "Tipos de Requerimientos (Funcionales y No Funcionales)", section: "presentacion", targetId: "req-tipos", category: "Teoría" },
    { title: "Cotización: Responsividad Web", section: "encuesta", targetId: "req-responsividad", category: "Cotizador" },
    { title: "Cotización: Accesibilidad Multimedia", section: "encuesta", targetId: "req-accesibilidad", category: "Cotizador" },
    { title: "Cotización: Seguridad Avanzada y Encriptación", section: "encuesta", targetId: "req-seguridad-avanzada", category: "Cotizador" },
    { title: "Paquete Básico ($299 USD)", section: "servicios", targetId: "req-paquete-basico", category: "Servicios" },
    { title: "Paquete Empresarial ($599 USD)", section: "servicios", targetId: "req-paquete-empresarial", category: "Servicios" }
];

function onSearchInput() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    const suggestionsBox = document.getElementById('searchSuggestions');

    if (query.length === 0) {
        suggestionsBox.style.display = 'none';
        return;
    }

    const matches = searchIndex.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.category.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
        suggestionsBox.innerHTML = '<div class="suggestion-item"><span class="suggestion-section">Sin resultados coincidentes</span></div>';
    } else {
        suggestionsBox.innerHTML = matches.map(item => `
            <div class="suggestion-item" onclick="selectSuggestion('${item.section}', '${item.targetId}')">
                <span class="suggestion-title">${item.title}</span>
                <span class="suggestion-section">${item.category} • Sección: ${item.section.toUpperCase()}</span>
            </div>
        `).join('');
    }

    suggestionsBox.style.display = 'block';
}

function selectSuggestion(sectionId, targetId) {
    document.getElementById('searchSuggestions').style.display = 'none';
    document.getElementById('searchInput').value = '';
    document.getElementById('searchContainer').classList.remove('mobile-open');

    showSection(sectionId);

    if (targetId) {
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.classList.add('highlight-item');
            setTimeout(() => element.classList.remove('highlight-item'), 2500);
        }
    }
}

/* TOGGLE DROPDOWN MI CUENTA */
function toggleAccountMenu(e) {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById('accountDropdown').classList.toggle('show');
}

/* VISTA INTERACTIVA PARA "REGISTRAR" O "INICIAR SESIÓN" */
function showAuthMode(mode) {
    document.getElementById('accountDropdown').classList.remove('show');
    showSection('auth');

    const activeUser = JSON.parse(localStorage.getItem('innovasoft_user'));
    if (activeUser) return;

    const loginCard = document.getElementById('loginCard');
    const registerCard = document.getElementById('registerCard');

    if (mode === 'register') {
        loginCard.style.display = 'none';
        registerCard.style.display = 'block';
    } else if (mode === 'login') {
        loginCard.style.display = 'block';
        registerCard.style.display = 'none';
    }
}

document.addEventListener('click', function(e) {
    const searchContainer = document.querySelector('.search-container');
    if (searchContainer && !searchContainer.contains(e.target)) {
        document.getElementById('searchSuggestions').style.display = 'none';
        searchContainer.classList.remove('mobile-open');
    }

    const accountDropdown = document.getElementById('accountDropdown');
    if (accountDropdown && !e.target.closest('#link-auth')) {
        accountDropdown.classList.remove('show');
    }
});

/* FUNCIÓN DE GUARDADO EN BASE DE DATOS (GOOGLE SHEETS) */
function saveToExcelSheet(type, payloadData) {
    console.log(`[Sync Google Sheets] ${type}`, payloadData);
    if(GOOGLE_SHEET_URL && !GOOGLE_SHEET_URL.includes("TU_SCRIPT_ID")) {
        fetch(GOOGLE_SHEET_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: type, timestamp: new Date().toISOString(), ...payloadData })
        }).catch(err => console.error("Error guardando:", err));
    }
}

const i18n = {
    es: {
        search_ph: "Buscar...",
        nav_home: "Inicio",
        nav_presentation: "Presentación",
        nav_about: "Nosotros",
        nav_services: "Servicios",
        nav_survey: "Requerimientos",
        nav_login: "Mi Cuenta",
        menu_register: "REGISTRAR",
        menu_login: "INICIAR SESIÓN",
        hero_tag: "INGENIERÍA DE SOFTWARE",
        hero_title: "¿Qué tipo de solución de Software necesita tu proyecto?",
        hero_desc: "Definimos y estructuramos los requerimientos funcionales y de seguridad ideales para que tu plataforma web o móvil sea eficiente, escalable y 100% confiable.",
        hero_btn: "Cotizar Mis Requerimientos",
        features_title: "Destacados",
        feat_1_title: "Análisis Ágil",
        feat_1_desc: "Levantamiento funcional y no funcional de requerimientos adaptados a tu negocio.",
        feat_2_title: "Alta Seguridad",
        feat_2_desc: "Arquitectura con protocolos modernos y cumplimiento de normas técnicas de calidad.",
        feat_3_title: "Multiplataforma",
        feat_3_desc: "Soluciones optimizadas para Android, iOS, Windows y Chromebook.",
        about_title: "Sobre INNOVASOFT",
        brand_subtitle: "Tecnología e Innovación",
        mission_title: "Misión",
        mission_desc: "Transformar las ideas complejas de nuestros clientes en requerimientos técnicos claros, eficientes y alcanzables para llegar al ojo público y objetivo.",
        vision_title: "Visión",
        vision_desc: "Consolidarnos como la empresa líder y referente regional en el desarrollo de software para el bienestar humano y la transformación organizacional, ofreciendo una red global de soporte con productos 100% seguros, confiables y de alto valor.",
        vision_pts_title: "Puntos Clave:",
        vision_p1_lbl: "Innovación constante:",
        vision_p1_txt: "Creación de herramientas tecnológicas avanzadas y de vanguardia.",
        vision_p2_lbl: "Liderazgo regional:",
        vision_p2_txt: "Ser la opción número uno en el mercado de sistemas y tecnología.",
        vision_p3_lbl: "Calidad y confianza:",
        vision_p3_txt: "Garantizar estabilidad, seguridad y un servicio de excelencia que haga sentir a los usuarios en familia.",
        values_title: "Valores",
        values_desc: "Innovación, Transparencia, Seguridad, Accesibilidad y Calidad.",
        services_title: "Nuestros Servicios",
        basic_pkg_title: "Paquete Básico",
        basic_pkg_desc: "Documentación de Requerimientos Funcionales básicos y Maquetación Web.",
        basic_pkg_price: "$299 USD",
        corp_pkg_title: "Paquete Empresarial",
        corp_pkg_desc: "Levantamiento completo (Funcionales + No Funcionales) + Pruebas de usabilidad.",
        corp_pkg_price: "$599 USD",
        btn_hire: "Contratar",
        pres_title: "Presentación: Requerimientos de Software",
        footer_legal: "Enlaces Legales",
        footer_legal_notice: "Aviso Legal",
        footer_privacy: "Política de Privacidad",
        footer_terms: "Términos del Servicio",
        footer_contact: "Contacto",
        footer_rights: "© 2026 INNOVASOFT. Todos los derechos reservados.",
        survey_main_title: "Encuesta de Análisis de Requerimientos",
        survey_subtitle: "Indícanos qué características necesitas para generar tu paquete a medida:",
        survey_label_email: "Tu Correo Electrónico:",
        survey_label_select: "Selecciona los requerimientos necesarios:",
        survey_opt_1: "Responsividad (Adaptable a móviles y escritorio) (+$100 USD)",
        survey_opt_2: "Multiplataforma (Windows, Android, iOS, Chromebook) (+$200 USD)",
        survey_opt_3: "Accesibilidad (Texto, Imagen, Audio, Video) (+$80 USD)",
        survey_opt_4: "Seguridad Avanzada y Encriptación (+$150 USD)",
        survey_label_comments: "Detalles adicionales del proyecto:",
        survey_ph_comments: "Describe brevemente la idea de tu software...",
        survey_btn_submit: "Generar Paquete de Requerimientos",
        types_title: "Tipos de Requerimientos",
        func_title: "Requerimientos Funcionales (El \"Qué\")",
        func_desc: "Definen las acciones, funciones y reglas de negocio que el sistema debe ejecutar al recibir ciertas entradas.",
        focus_label: "Enfoque:",
        func_focus: "Operaciones directas del usuario.",
        example_label: "Ejemplo:",
        func_example: "El sistema debe permitir al usuario iniciar sesión con su correo y contraseña.",
        nonfunc_title: "Requerimientos No Funcionales (El \"Cómo\")",
        nonfunc_desc: "Establecen las restricciones de calidad, rendimiento, seguridad y condiciones operativas del software.",
        nonfunc_focus: "Desempeño y atributos del sistema.",
        nonfunc_example: "La página debe responder a las búsquedas en un tiempo máximo de 2 segundos.",
        pres_subtitle: "Fundamentos básicos de la Ingeniería de Requisitos",
        pres_q1_title: "¿Qué es un Requerimiento?",
        pres_q1_desc: "Un requerimiento de software es una condición o capacidad que debe poseer un sistema para satisfacer un contrato, una norma o la necesidad de un usuario. Describe qué debe hacer el software o bajo qué restricciones debe operar.",
        pres_elem_title: "Elementos de un Requerimiento",
        elem_in_label: "Entrada (Inputs):",
        elem_in_desc: "Datos que recibe el sistema.",
        elem_proc_label: "Proceso:",
        elem_proc_desc: "La lógica o regla de negocio aplicada.",
        elem_out_label: "Salida (Outputs):",
        elem_out_desc: "El resultado o respuesta generada por el software.",
        elem_rest_label: "Restricciones:",
        elem_rest_desc: "Límites tecnológicos, legales o de diseño.",
        pres_char_title: "Características de un Requerimiento",
        char_1_title: "Unívoco y Claro",
        char_1_desc: "Posee únicamente una interpretación técnica posible.",
        char_2_title: "Verificable",
        char_2_desc: "Es posible diseñar una prueba para corroborar su cumplimiento.",
        char_3_title: "Necesario",
        char_3_desc: "Cubre una necesidad real del negocio o del usuario.",
        ex_title: "Ejemplos de Requerimientos",
        ex1_title: "Ejemplo 1: Requerimiento Funcional",
        ex1_desc: "\"El sistema debe permitir a los usuarios autenticarse ingresando su correo electrónico y contraseña, enviando un código OTP de validación de 6 dígitos al correo registrado antes de conceder acceso.\"",
        ex2_title: "Ejemplo 2: Requerimiento No Funcional",
        ex2_desc: "\"La plataforma debe procesar y desplegar el resultado de una búsqueda en un tiempo de respuesta máximo de 2 segundos cuando haya hasta 1,000 usuarios concurrentes.\"",
        desc_label: "Descripción:",
        ready_buy_title: "¿Listo para adquirir nuestros servicios?",
        ready_buy_desc: "Crea tu cuenta rápidamente para empezar a cotizar y comprar tus paquetes de requerimientos.",
        btn_register_buy: "Registrarme para Comprar"
    },
    en: {
        search_ph: "Search...",
        nav_home: "Home",
        nav_presentation: "Presentation",
        nav_about: "About Us",
        nav_services: "Services",
        nav_survey: "Requirements",
        nav_login: "My Account",
        menu_register: "REGISTER",
        menu_login: "LOG IN",
        hero_tag: "SOFTWARE ENGINEERING",
        hero_title: "What type of Software solution does your project need?",
        hero_desc: "We define and structure the ideal functional and security requirements for your web or mobile platform to be efficient, scalable, and 100% reliable.",
        hero_btn: "Get a Quote for My Requirements",
        features_title: "Highlights",
        feat_1_title: "Agile Analysis",
        feat_1_desc: "Functional and non-functional requirements gathering tailored to your business.",
        feat_2_title: "High Security",
        feat_2_desc: "Architecture with modern protocols and compliance with quality technical standards.",
        feat_3_title: "Cross-Platform",
        feat_3_desc: "Optimized solutions for Android, iOS, Windows, and Chromebook.",
        about_title: "About INNOVASOFT",
        brand_subtitle: "Technology & Innovation",
        mission_title: "Mission",
        mission_desc: "Transforming our clients' complex ideas into clear, efficient, and achievable technical requirements to reach the target audience.",
        vision_title: "Vision",
        vision_desc: "Consolidate ourselves as the leading company and regional benchmark in software development for human well-being and organizational transformation, offering a global support network with 100% secure, reliable, and high-value products.",
        vision_pts_title: "Key Points:",
        vision_p1_lbl: "Constant innovation:",
        vision_p1_txt: "Creation of advanced and cutting-edge technological tools.",
        vision_p2_lbl: "Regional leadership:",
        vision_p2_txt: "To be the number one choice in the systems and technology market.",
        vision_p3_lbl: "Quality and trust:",
        vision_p3_txt: "Guarantee stability, security, and excellent service that makes users feel at home.",
        values_title: "Values",
        values_desc: "Innovation, Transparency, Security, Accessibility, and Quality.",
        services_title: "Our Services",
        basic_pkg_title: "Basic Package",
        basic_pkg_desc: "Basic Functional Requirements Documentation and Web Layout.",
        basic_pkg_price: "$299 USD",
        corp_pkg_title: "Enterprise Package",
        corp_pkg_desc: "Full gathering (Functional + Non-Functional) + Usability testing.",
        corp_pkg_price: "$599 USD",
        btn_hire: "Order Now",
        pres_title: "Presentation: Software Requirements",
        footer_legal: "Legal Links",
        footer_legal_notice: "Legal Notice",
        footer_privacy: "Privacy Policy",
        footer_terms: "Terms of Service",
        footer_contact: "Contact Us",
        footer_rights: "© 2026 INNOVASOFT. All rights reserved.",
        survey_main_title: "Requirements Analysis Survey",
        survey_subtitle: "Tell us what features you need to generate your custom package:",
        survey_label_email: "Your Email Address:",
        survey_label_select: "Select the required features:",
        survey_opt_1: "Web Responsiveness (Mobile and Desktop) (+$100 USD)",
        survey_opt_2: "Cross-Platform (Windows, Android, iOS, Chromebook) (+$200 USD)",
        survey_opt_3: "Accessibility (Text, Image, Audio, Video) (+$80 USD)",
        survey_opt_4: "Advanced Security and Encryption (+$150 USD)",
        survey_label_comments: "Additional project details:",
        survey_ph_comments: "Briefly describe your software idea...",
        survey_btn_submit: "Generate Requirements Package",
        types_title: "Types of Requirements",
        func_title: "Functional Requirements (The \"What\")",
        func_desc: "Define the actions, functions, and business rules that the system must execute when receiving specific inputs.",
        focus_label: "Focus:",
        func_focus: "Direct user operations.",
        example_label: "Example:",
        func_example: "The system must allow the user to log in with their email and password.",
        nonfunc_title: "Non-Functional Requirements (The \"How\")",
        nonfunc_desc: "Establish quality, performance, security constraints, and operational conditions for the software.",
        nonfunc_focus: "System performance and attributes.",
        nonfunc_example: "The page must respond to searches in a maximum time of 2 seconds.",
        pres_subtitle: "Fundamentals of Requirements Engineering",
        pres_q1_title: "What is a Requirement?",
        pres_q1_desc: "A software requirement is a condition or capability that a system must possess to satisfy a contract, standard, or user need. It describes what the software must do or under what constraints it must operate.",
        pres_elem_title: "Elements of a Requirement",
        elem_in_label: "Inputs:",
        elem_in_desc: "Data received by the system.",
        elem_proc_label: "Process:",
        elem_proc_desc: "The logic or business rule applied.",
        elem_out_label: "Outputs:",
        elem_out_desc: "The result or response generated by the software.",
        elem_rest_label: "Constraints:",
        elem_rest_desc: "Technological, legal, or design limits.",
        pres_char_title: "Characteristics of a Requirement",
        char_1_title: "Unambiguous and Clear",
        char_1_desc: "Has only one possible technical interpretation.",
        char_2_title: "Verifiable",
        char_2_desc: "It is possible to design a test to verify its compliance.",
        char_3_title: "Necessary",
        char_3_desc: "Covers a real need of the business or the user.",
        ex_title: "Examples of Requirements",
        ex1_title: "Example 1: Functional Requirement",
        ex1_desc: "\"The system must allow users to authenticate by entering their email and password, sending a 6-digit OTP validation code to the registered email before granting access.\"",
        ex2_title: "Example 2: Non-Functional Requirement",
        ex2_desc: "\"The platform must process and display search results within a maximum response time of 2 seconds with up to 1,000 concurrent users.\"",
        desc_label: "Description:",
        ready_buy_title: "Ready to purchase our services?",
        ready_buy_desc: "Create your account quickly to start getting quotes and purchasing your requirement packages.",
        btn_register_buy: "Register to Buy"
    },
    pt: {
        search_ph: "Pesquisar...",
        nav_home: "Início",
        nav_presentation: "Apresentação",
        nav_about: "Sobre Nós",
        nav_services: "Serviços",
        nav_survey: "Requisitos",
        nav_login: "Minha Conta",
        menu_register: "REGISTRAR",
        menu_login: "INICIAR SESSÃO",
        hero_tag: "ENGENHARIA DE SOFTWARE",
        hero_title: "Que tipo de solução de Software o seu projeto precisa?",
        hero_desc: "Definimos e estruturamos os requisitos funcionais e de segurança ideais para que sua plataforma web ou móvel seja eficiente, escalável e 100% confiável.",
        hero_btn: "Cotar Meus Requisitos",
        features_title: "Destaques",
        feat_1_title: "Análise Ágil",
        feat_1_desc: "Levantamento funcional e não funcional de requisitos adaptados ao seu negócio.",
        feat_2_title: "Alta Segurança",
        feat_2_desc: "Arquitetura com protocolos modernos e conformidade com normas técnicas de qualidade.",
        feat_3_title: "Multiplataforma",
        feat_3_desc: "Soluções otimizadas para Android, iOS, Windows e Chromebook.",
        about_title: "Sobre a INNOVASOFT",
        brand_subtitle: "Tecnologia e Inovação",
        mission_title: "Missão",
        mission_desc: "Transformar ideias complexas de nossos clientes em requisitos técnicos claros, eficientes e alcançáveis para atingir o público alvo.",
        vision_title: "Visão",
        vision_desc: "Consolidar-nos como a empresa líder e referência regional no desenvolvimento de software para o bem-estar humano e transformação organizacional, oferecendo uma rede global de suporte com produtos 100% seguros, confiáveis e de alto valor.",
        vision_pts_title: "Pontos Chave:",
        vision_p1_lbl: "Inovação constante:",
        vision_p1_txt: "Criação de ferramentas tecnológicas avançadas e de vanguardia.",
        vision_p2_lbl: "Liderança regional:",
        vision_p2_txt: "Ser a opção número um no mercado de sistemas e tecnologia.",
        vision_p3_lbl: "Qualidade e confiança:",
        vision_p3_txt: "Garantir estabilidade, segurança e um serviço de excelência que faça os usuários se sentirem em família.",
        values_title: "Valores",
        values_desc: "Inovação, Transparência, Segurança, Acessibilidade e Qualidade.",
        services_title: "Nossos Serviços",
        basic_pkg_title: "Pacote Básico",
        basic_pkg_desc: "Documentação de Requisitos Funcionais básicos e Layout Web.",
        basic_pkg_price: "$299 USD",
        corp_pkg_title: "Pacote Empresarial",
        corp_pkg_desc: "Levantamento completo (Funcionais + Não Funcionais) + Testes de usabilidade.",
        corp_pkg_price: "$599 USD",
        btn_hire: "Contratar",
        pres_title: "Apresentação: Requisitos de Software",
        footer_legal: "Links Legais",
        footer_legal_notice: "Aviso Legal",
        footer_privacy: "Política de Privacidad",
        footer_terms: "Termos de Serviço",
        footer_contact: "Contato",
        footer_rights: "© 2026 INNOVASOFT. Todos os direitos reservados.",
        survey_main_title: "Pesquisa de Análise de Requisitos",
        survey_subtitle: "Informe-nos quais recursos você precisa para gerar seu pacote personalizado:",
        survey_label_email: "Seu E-mail:",
        survey_label_select: "Selecione os requisitos necessários:",
        survey_opt_1: "Responsividade Web (Móvel e Desktop) (+$100 USD)",
        survey_opt_2: "Multiplataforma (Windows, Android, iOS, Chromebook) (+$200 USD)",
        survey_opt_3: "Acessibilidade (Texto, Imagem, Áudio, Vídeo) (+$80 USD)",
        survey_opt_4: "Segurança Avançada e Criptografia (+$150 USD)",
        survey_label_comments: "Detalhes adicionais do projeto:",
        survey_ph_comments: "Descreva brevemente a ideia do seu software...",
        survey_btn_submit: "Gerar Pacote de Requisitos",
        types_title: "Tipos de Requisitos",
        func_title: "Requisitos Funcionais (O \"O que\")",
        func_desc: "Definem as ações, funções e regras de negócio que o sistema deve executar ao receber determinadas entradas.",
        focus_label: "Foco:",
        func_focus: "Operações directas do usuário.",
        example_label: "Exemplo:",
        func_example: "O sistema deve permitir que o usuário faça login com seu e-mail e senha.",
        nonfunc_title: "Requisitos Não Funcionais (O \"Como\")",
        nonfunc_desc: "Estabelecem as restrições de qualidade, desempenho, segurança e condições operacionais do software.",
        nonfunc_focus: "Desempenho e atributos do sistema.",
        nonfunc_example: "A página deve responder às pesquisas em um tempo máximo de 2 segundos.",
        pres_subtitle: "Fundamentos Básicos da Engenharia de Requisitos",
        pres_q1_title: "O que é um Requisito?",
        pres_q1_desc: "Um requisito de software é uma condição ou capacidade que um sistema deve possuir para satisfazer um contrato, norma ou necessidade do usuário. Descreve o que o software deve fazer ou sob quais restrições deve operar.",
        pres_elem_title: "Elementos de um Requisito",
        elem_in_label: "Entrada (Inputs):",
        elem_in_desc: "Dados recebidos pelo sistema.",
        elem_proc_label: "Processo:",
        elem_proc_desc: "A lógica ou regra de negocio aplicada.",
        elem_out_label: "Saída (Outputs):",
        elem_out_desc: "O resultado ou resposta gerada pelo software.",
        elem_rest_label: "Restricões:",
        elem_rest_desc: "Limites tecnológicos, legais ou de design.",
        pres_char_title: "Características de um Requisito",
        char_1_title: "Unívoco e Claro",
        char_1_desc: "Possui apenas uma interpretação técnica possível.",
        char_2_title: "Verificável",
        char_2_desc: "É possível projetar um teste para comprovar seu cumprimento.",
        char_3_title: "Necessário",
        char_3_desc: "Cobre uma necessidade real do negócio ou do usuário.",
        ex_title: "Exemplos de Requisitos",
        ex1_title: "Exemplo 1: Requisito Funcional",
        ex1_desc: "\"O sistema deve permitir que os usuários se autentiquem inserindo seu e-mail e senha, enviando um código de validação OTP de 6 dígitos para o e-mail registrado antes de conceder o acesso.\"",
        ex2_title: "Exemplo 2: Requisito Não Funcional",
        ex2_desc: "\"A plataforma deve processar e exibir o resultado de uma pesquisa em um tempo de resposta máximo de 2 segundos para até 1.000 usuários concorrentes.\"",
        desc_label: "Descrição:",
        ready_buy_title: "Pronto para adquirir nossos serviços?",
        ready_buy_desc: "Crie sua conta rapidamente para começar a cotar e comprar seus pacotes de requisitos.",
        btn_register_buy: "Registrar para Comprar"
    },
    zh: {
        search_ph: "搜索...",
        nav_home: "首页",
        nav_presentation: "演示",
        nav_about: "关于我们",
        nav_services: "服务",
        nav_survey: "需求",
        nav_login: "我的账户",
        menu_register: "注册",
        menu_login: "登录",
        hero_tag: "软件工程",
        hero_title: "您的项目需要什么类型的软件解决方案？",
        hero_desc: "我们为您的网页或移动平台定义并构建理想的功能和安全需求，使其高效、可扩展且100%可靠。",
        hero_btn: "获取我的需求报价",
        features_title: "特点",
        feat_1_title: "敏捷分析",
        feat_1_desc: "收集适应您业务的功能性和非功能性需求。",
        feat_2_title: "高安全性",
        feat_2_desc: "采用现代协议并符合技术质量标准的架构。",
        feat_3_title: "多平台",
        feat_3_desc: "针对 Android、iOS、Windows 和 Chromebook 优化的解决方案。",
        about_title: "关于 INNOVASOFT",
        brand_subtitle: "科技与创新",
        mission_title: "使命",
        mission_desc: "将客户的复杂想法转化为清晰、高效且可实现的技术需求，以吸引公众和目标受众。",
        vision_title: "愿景",
        vision_desc: "巩固我们作为软件开发领域的领导者和区域标杆地位，促进人类福祉和组织转型，提供 100% 安全、可靠和高价值产品的全球支持网络。",
        vision_pts_title: "关键点：",
        vision_p1_lbl: "持续创新：",
        vision_p1_txt: "创造先进的前沿技术工具。",
        vision_p2_lbl: "区域领导力：",
        vision_p2_txt: "成为系统和技术市场的首选。",
        vision_p3_lbl: "质量与信任：",
        vision_p3_txt: "保证稳定性、安全性和卓越服务，让用户有宾至如归的感觉。",
        values_title: "价值观",
        values_desc: "创新、透明、安全、可访问性和质量。",
        services_title: "我们的服务",
        basic_pkg_title: "基础套餐",
        basic_pkg_desc: "基础功能需求文档和网页布局。",
        basic_pkg_price: "$299 USD",
        corp_pkg_title: "企业套餐",
        corp_pkg_desc: "完整需求收集（功能性 + 非功能性）+ 可用性测试。",
        corp_pkg_price: "$599 USD",
        btn_hire: "购买",
        pres_title: "演示：软件需求",
        footer_legal: "法律链接",
        footer_legal_notice: "法律声明",
        footer_privacy: "隐私政策",
        footer_terms: "服务条款",
        footer_contact: "联系方式",
        footer_rights: "© 2026 INNOVASOFT. 保留所有权利。",
        survey_main_title: "需求分析调查",
        survey_subtitle: "请告诉我们您需要哪些功能来定制您的套餐：",
        survey_label_email: "您的电子邮件：",
        survey_label_select: "选择所需的需求：",
        survey_opt_1: "网页响应式（适应移动端和桌面端）(+$100 USD)",
        survey_opt_2: "多平台（Windows、Android、iOS、Chromebook）(+$200 USD)",
        survey_opt_3: "无障碍功能（文本、图像、音频、视频）(+$80 USD)",
        survey_opt_4: "高级安全性与加密 (+$150 USD)",
        survey_label_comments: "项目的其他详细信息：",
        survey_ph_comments: "简要描述您的软件想法...",
        survey_btn_submit: "生成需求套餐",
        types_title: "需求类型",
        func_title: "功能需求（“什么”）",
        func_desc: "定义系统在接收特定输入时必须执行的操作、功能和业务规则。",
        focus_label: "重点：",
        func_focus: "用户直接操作。",
        example_label: "示例：",
        func_example: "系统必须允许用户使用其电子邮件和密码登录。",
        nonfunc_title: "非功能需求（“如何”）",
        nonfunc_desc: "建立软件的质量、性能、安全限制和运行条件。",
        nonfunc_focus: "系统性能和属性。",
        nonfunc_example: "页面必须在最多2秒内响应搜索。",
        pres_subtitle: "需求工程基础",
        pres_q1_title: "什么是需求？",
        pres_q1_desc: "软件需求是系统为了满足合同、标准或用户需求而必须具备的条件或能力。它描述了软件必须做什么，或者在什么限制下运行。",
        pres_elem_title: "需求的要素",
        elem_in_label: "输入 (Inputs):",
        elem_in_desc: "系统接收的数据。",
        elem_proc_label: "过程 (Process):",
        elem_proc_desc: "应用的逻辑或业务规则。",
        elem_out_label: "输出 (Outputs):",
        elem_out_desc: "软件生成的结果或响应。",
        elem_rest_label: "限制:",
        elem_rest_desc: "技术、法律或设计限制。",
        pres_char_title: "需求的特征",
        char_1_title: "明确且清晰",
        char_1_desc: "只有一种可能的技术解释。",
        char_2_title: "可验证",
        char_2_desc: "可以设计测试来验证其合规性。",
        char_3_title: "必要",
        char_3_desc: "满足业务或用户的真实需求。",
        ex_title: "需求示例",
        ex1_title: "示例 1：功能需求",
        ex1_desc: "“系统必须允许用户通过输入电子邮件和密码进行身份验证，并在授予访问权限之前向注册的电子邮件发送6位数OTP验证码。”",
        ex2_title: "示例 2：非功能需求",
        ex2_desc: "“在最多 1,000 名并发用户的情况下，平台必须在最多 2 秒的响应时间内处理并显示搜索结果。”",
        desc_label: "描述:",
        ready_buy_title: "准备好购买我们的服务了吗？",
        ready_buy_desc: "快速创建您的账户，开始获取报价并购买您的需求套餐。",
        btn_register_buy: "注册购买"
    }
};

function showSection(sectionId) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }

    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');

    document.querySelectorAll('.nav-menu-horizontal a').forEach(link => link.classList.remove('active-link'));
    const activeLink = document.getElementById(`link-${sectionId}`);
    if(activeLink) activeLink.classList.add('active-link');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('active');
}

function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    
    const themeBtnIcon = document.querySelector('.btn-theme i');
    themeBtnIcon.className = newTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

function changeLanguage() {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }

    const lang = document.getElementById('langSelect').value;
    const texts = i18n[lang];

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (texts[key]) el.textContent = texts[key];
    });

    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
        const key = el.getAttribute('data-i18n-ph');
        if (texts[key]) el.placeholder = texts[key];
    });
}

function checkUserSession() {
    const activeUser = JSON.parse(localStorage.getItem('innovasoft_user'));
    const authFormsView = document.getElementById('authFormsView');
    const userProfileView = document.getElementById('userProfileView');

    if (activeUser) {
        authFormsView.style.display = 'none';
        userProfileView.style.display = 'block';

        document.getElementById('profileName').textContent = activeUser.nombre || 'Usuario Registrado';
        document.getElementById('profileEmail').textContent = activeUser.email;
        document.getElementById('profileReqs').textContent = activeUser.requerimientos || 'Ninguno registrado';
        
        const surveyEmailInput = document.getElementById('surveyEmail');
        if(surveyEmailInput) surveyEmailInput.value = activeUser.email;

        resetInactivityTimer();
    } else {
        authFormsView.style.display = 'block';
        userProfileView.style.display = 'none';
        clearTimeout(inactivityTimer);
    }
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const pass = document.getElementById('regPass').value;

    if (!esCorreoValido(email)) {
        alert('Error de Validación: El correo debe terminar en @gmail.com, @hotmail.com, @outlook.com o @yahoo.com');
        return;
    }

    if (!esPasswordValida(pass)) {
        alert('Error de Seguridad: La contraseña debe tener como mínimo 8 caracteres.');
        return;
    }

    const user = { nombre: name, email: email, requerimientos: '' };
    localStorage.setItem('innovasoft_user', JSON.stringify(user));

    saveToExcelSheet('REGISTRO_USUARIO', user);
    alert(`¡Registro exitoso! Bienvenido ${name}. Tu cuenta cumple con los estándares de seguridad.`);
    checkUserSession();
    showSection('servicios');
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const pass = document.getElementById('loginPass').value;

    if (!esCorreoValido(email)) {
        alert('Error de Acceso: El correo debe terminar en @gmail.com, @hotmail.com, @outlook.com o @yahoo.com');
        return;
    }

    if (!esPasswordValida(pass)) {
        alert('Error de Seguridad: La contraseña debe tener como mínimo 8 caracteres.');
        return;
    }

    const existingUser = JSON.parse(localStorage.getItem('innovasoft_user')) || {};
    const user = { 
        nombre: existingUser.nombre || email.split('@')[0], 
        email: email, 
        requerimientos: existingUser.requerimientos || '' 
    };

    localStorage.setItem('innovasoft_user', JSON.stringify(user));

    saveToExcelSheet('INICIO_SESION', { email: email });
    alert(`Bienvenido de nuevo ${user.nombre}`);
    checkUserSession();
}

function logout() {
    localStorage.removeItem('innovasoft_user');
    clearTimeout(inactivityTimer);
    checkUserSession();
    showAuthMode('login');
}

function handleSurveySubmit(e) {
    e.preventDefault();
    const email = document.getElementById('surveyEmail').value;
    
    if (!esCorreoValido(email)) {
        alert('Ingresa un correo válido (@gmail.com, @hotmail.com, @outlook.com o @yahoo.com) para enviar la propuesta.');
        return;
    }

    const checkedBoxes = document.querySelectorAll('#reqForm input[type="checkbox"]:checked');
    
    if(checkedBoxes.length === 0) {
        alert('Por favor selecciona al menos un requerimiento.');
        return;
    }

    let basePrice = 200;
    let selectedReqs = [];

    checkedBoxes.forEach(cb => {
        selectedReqs.push(cb.value);
        basePrice += parseInt(cb.getAttribute('data-price') || 0);
    });

    const comments = document.getElementById('comments').value;

    let activeUser = JSON.parse(localStorage.getItem('innovasoft_user'));
    if(activeUser) {
        activeUser.requerimientos = selectedReqs.join(', ');
        localStorage.setItem('innovasoft_user', JSON.stringify(activeUser));
        checkUserSession();
    }

    saveToExcelSheet('ENCUESTA_REQUERIMIENTOS', {
        email: email,
        requerimientos: selectedReqs.join(', '),
        detalles: comments,
        precioCalculado: basePrice
    });

    const container = document.getElementById('customPackageContainer');
    container.innerHTML = `
        <div class="card custom-package-card" style="margin-bottom: 2rem;">
            <span style="background:var(--primary); color:white; padding:3px 10px; border-radius:12px; font-size:0.8rem; font-weight:bold;">COTIZACIÓN A MEDIDA</span>
            <h3 style="margin-top:0.5rem;">Paquete Personalizado para ${email}</h3>
            <p><strong>Incluye:</strong> ${selectedReqs.join(', ')}</p>
            <p><em>Nota: ${comments || 'Sin comentarios adicionales.'}</em></p>
            <h4 style="margin: 1rem 0; font-size: 1.5rem; color: var(--primary);">$${basePrice} USD</h4>
            <button class="btn-cta" onclick="prepareCheckout('Paquete Personalizado (${selectedReqs.length} requisitos)', ${basePrice})">Contratar Mi Paquete a Medida</button>
        </div>
    `;

    alert('¡Paquete de Requerimientos generado con éxito!');
    showSection('servicios');
}

let selectedProduct = { title: '', price: 0 };

function prepareCheckout(title, price) {
    const activeUser = JSON.parse(localStorage.getItem('innovasoft_user'));
    if (!activeUser) {
        alert('Debes registrarte o iniciar sesión para poder comprar.');
        showAuthMode('login');
        return;
    }

    selectedProduct = { title, price };
    document.getElementById('checkoutPackageInfo').innerHTML = `<strong>Servicio seleccionado:</strong> ${title} — <strong>$${price} USD</strong>`;
    showSection('checkout');
}

function processPayment(e) {
    e.preventDefault();
    const name = document.getElementById('payName').value;
    const cardNum = document.getElementById('cardNumberInput').value;
    
    if (!esTarjetaValida(cardNum)) {
        alert('Error en el Pago: La tarjeta de crédito debe poseer únicamente números y tener exactamente 16 dígitos requeridos.');
        return;
    }

    document.getElementById('ticketClient').textContent = name;
    document.getElementById('ticketService').textContent = selectedProduct.title || "Servicio INNOVASOFT";
    document.getElementById('ticketPrice').textContent = selectedProduct.price || "0";
    document.getElementById('ticketDate').textContent = new Date().toLocaleString();
    document.getElementById('ticket').style.display = 'block';

    saveToExcelSheet('COMPRA_REALIZADA', {
        cliente: name,
        servicio: selectedProduct.title,
        monto: selectedProduct.price
    });
}

window.onload = function() {
    checkUserSession();
    checkCookieConsent();
};