

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       MENU MOBILE
    ========================= */

    const menu = document.getElementById("menu");
    const nav = document.getElementById("nav");
    const backTop = document.getElementById("backTop");

    if (backTop) {
        const updateBackTop = () => backTop.classList.toggle("shown", window.scrollY > 450);
        window.addEventListener("scroll", updateBackTop, { passive: true });
        updateBackTop();
        backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    }

    const quickActions = document.getElementById("quickActions");
    const quickActionsToggle = document.getElementById("quickActionsToggle");
    if (quickActions && quickActionsToggle) {
        quickActionsToggle.addEventListener("click", () => {
            const isOpen = quickActions.classList.toggle("open");
            quickActionsToggle.setAttribute("aria-expanded", String(isOpen));
            quickActionsToggle.setAttribute("aria-label", isOpen ? "Fechar atalhos" : "Abrir atalhos");
        });
        quickActions.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
            quickActions.classList.remove("open");
            quickActionsToggle.setAttribute("aria-expanded", "false");
            quickActionsToggle.setAttribute("aria-label", "Abrir atalhos");
        }));
        document.addEventListener("click", event => {
            if (!quickActions.contains(event.target)) {
                quickActions.classList.remove("open");
                quickActionsToggle.setAttribute("aria-expanded", "false");
                quickActionsToggle.setAttribute("aria-label", "Abrir atalhos");
            }
        });
    }

    const directMeetingForm = document.getElementById("quickMeetingForm");
    const directMeetingDate = document.getElementById("dataReuniaoDireta");
    if (directMeetingDate) {
        const now = new Date();
        const localToday = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}`;
        directMeetingDate.min = localToday;
    }
    if (directMeetingForm) {
        directMeetingForm.addEventListener("submit", event => {
            event.preventDefault();
            const data = new FormData(directMeetingForm);
            const rawDate = String(data.get("dataReuniaoDireta") || "");
            const dateBR = rawDate ? rawDate.split("-").reverse().join("/") : "";
            const message = `Olá, KOVA AGENCYA! Gostaria de solicitar uma reunião pelo Google Meet.

*Nome:* ${data.get("nomeReuniao")}
*Data desejada:* ${dateBR}
*Horário desejado:* ${data.get("horaReuniaoDireta")}
*Assunto:* ${data.get("assuntoReuniao")}

Sei que a reunião depende da confirmação da KOVA. Aguardo o retorno e o link do Google Meet.`;
            window.open(`https://wa.me/5562994971160?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
        });
    }

    if (menu && nav) {

        menu.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("open");
            menu.classList.toggle("active", isOpen);
            menu.setAttribute("aria-expanded", String(isOpen));
            menu.setAttribute("aria-label", isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação");
        });


        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {
                nav.classList.remove("open");
                menu.classList.remove("active");
                menu.setAttribute("aria-expanded", "false");
                menu.setAttribute("aria-label", "Abrir menu de navegação");
            });

        });

    }


    /* =========================
       FORMULÁRIO → WHATSAPP
    ========================= */

    const quoteForm = document.getElementById("quoteForm");

    if (quoteForm) {
        const atendimentoSelect = document.getElementById("atendimento");
        const meetingFields = document.getElementById("meetingFields");
        const dataReuniaoInput = document.getElementById("dataReuniao");
        const horaReuniaoInput = document.getElementById("horaReuniao");

        // Impede a seleção de uma data passada.
        if (dataReuniaoInput) {
            const hoje = new Date();
            const ano = hoje.getFullYear();
            const mes = String(hoje.getMonth() + 1).padStart(2, "0");
            const dia = String(hoje.getDate()).padStart(2, "0");
            dataReuniaoInput.min = `${ano}-${mes}-${dia}`;
        }

        const atualizarAgenda = () => {
            const querReuniao = atendimentoSelect && atendimentoSelect.value === "Agendar uma reunião";
            if (meetingFields) meetingFields.hidden = !querReuniao;
            if (dataReuniaoInput) dataReuniaoInput.required = Boolean(querReuniao);
            if (horaReuniaoInput) horaReuniaoInput.required = Boolean(querReuniao);
        };

        if (atendimentoSelect) {
            atendimentoSelect.addEventListener("change", atualizarAgenda);
            atualizarAgenda();
        }

        quoteForm.addEventListener("submit", (event) => {

            event.preventDefault();


            const formData = new FormData(quoteForm);


            const nome = formData.get("nome") || "";
            const empresa = formData.get("empresa") || "";
            const whatsapp = formData.get("whatsapp") || "";
            const instagram = formData.get("instagram") || "";
            const tipo = formData.get("tipo") || "";
            const orcamento = formData.get("orcamento") || "";
            const projeto = formData.get("projeto") || "";
            const atendimento = formData.get("atendimento") || "Conversar pelo WhatsApp";
            const dataReuniaoBruta = formData.get("dataReuniao") || "";
            const dataReuniao = dataReuniaoBruta
                ? dataReuniaoBruta.split("-").reverse().join("/")
                : "";
            const horaReuniao = formData.get("horaReuniao") || "";

            const dadosReuniao = atendimento === "Agendar uma reunião"
                ? `\n*Data desejada:* ${dataReuniao}\n*Horário desejado:* ${horaReuniao}\n*Observação:* Aguardo confirmação da KOVA.`
                : "";

            const mensagem =
`Olá, KOVA AGENCYA! Gostaria de conversar sobre um projeto.

*Nome:* ${nome}
*Empresa/Negócio:* ${empresa}
*WhatsApp:* ${whatsapp}
*Instagram/Site:* ${instagram}
*Tipo de projeto:* ${tipo}
*Faixa de investimento:* ${orcamento}
*Preferência de atendimento:* ${atendimento}${dadosReuniao}

*Sobre o projeto:*
${projeto}

Gostaria de receber mais informações sobre os próximos passos.`;

            const numero = "5562994971160";

            const url =
                "https://wa.me/" +
                numero +
                "?text=" +
                encodeURIComponent(mensagem);


            window.open(url, "_blank");

        });

    }


    /* =========================
       ANIMAÇÃO DE APARECER
    ========================= */

    const revealElements =
        document.querySelectorAll(
            ".heading, .service-card, .package-card, .project, .process-card, .upsell, details"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("visible");

                            observer.unobserve(entry.target);

                        }

                    });

                },
                {
                    threshold: 0.08
                }
            );


        revealElements.forEach(element => {

            element.classList.add("reveal");

            observer.observe(element);

        });

    }



});



    /* =========================
       ABERTURA CINEMATOGRÁFICA
    ========================= */
    const kovaIntro = document.getElementById("kovaIntro");
    const kovaIntroVideo = document.getElementById("kovaIntroVideo");
    const kovaIntroSkip = document.getElementById("kovaIntroSkip");

    if (kovaIntro) {
        document.body.classList.add("no-scroll");

        let introClosed = false;
        const closeKovaIntro = () => {
            if (introClosed) return;
            introClosed = true;
            kovaIntro.classList.add("is-hidden");
            document.body.classList.remove("no-scroll");
            if (kovaIntroVideo) {
                kovaIntroVideo.pause();
            }
            window.setTimeout(() => kovaIntro.remove(), 650);
        };

        if (kovaIntroSkip) kovaIntroSkip.addEventListener("click", closeKovaIntro);
        if (kovaIntroVideo) kovaIntroVideo.addEventListener("ended", closeKovaIntro);

        const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const introDuration = reduceMotion ? 250 : 1800;
        window.setTimeout(closeKovaIntro, introDuration);
    }


    /* =========================
       VÍDEO DO HERO — LOOP CONTÍNUO
    ========================= */
    const heroBgVideo = document.querySelector(".hero-bg-video");
    if (heroBgVideo) {
        heroBgVideo.loop = true; heroBgVideo.muted = true; heroBgVideo.playsInline = true;
        const keepHeroVideoPlaying = () => { const p = heroBgVideo.play(); if (p && typeof p.catch === "function") p.catch(() => {}); };
        heroBgVideo.addEventListener("ended", () => { heroBgVideo.currentTime = 0; keepHeroVideoPlaying(); });
        document.addEventListener("visibilitychange", () => { if (!document.hidden) keepHeroVideoPlaying(); });
        heroBgVideo.addEventListener("pause", () => { if (!document.hidden) keepHeroVideoPlaying(); });
        keepHeroVideoPlaying();
    }




(()=>{const modal=document.getElementById('kovaFeedbackModal'),img=document.getElementById('feedbackZoomImage'),viewport=document.getElementById('feedbackViewport');if(!modal)return;let zoom=1;
function setZoom(v){zoom=Math.max(1,Math.min(4,v));img.style.transform='scale('+zoom+')';document.getElementById('zoomReset').textContent=Math.round(zoom*100)+'%';}
function open(){modal.classList.add('active');document.body.style.overflow='hidden';setZoom(1)}
function close(){modal.classList.remove('active');document.body.style.overflow='';setZoom(1)}
document.getElementById('openFeedback').addEventListener('click',open);document.getElementById('kovaFeedbackImage').addEventListener('click',open);document.getElementById('closeFeedback').addEventListener('click',close);
document.getElementById('zoomIn').addEventListener('click',()=>setZoom(zoom+.25));document.getElementById('zoomOut').addEventListener('click',()=>setZoom(zoom-.25));document.getElementById('zoomReset').addEventListener('click',()=>setZoom(1));
modal.addEventListener('click',e=>{if(e.target===modal)close()});document.addEventListener('keydown',e=>{if(e.key==='Escape')close();if(modal.classList.contains('active')&&e.key==='+')setZoom(zoom+.25);if(modal.classList.contains('active')&&e.key==='-')setZoom(zoom-.25)});
})();



(()=>{const section=document.querySelector('#material-prospeccao');if(!section)return;section.style.opacity='0';section.style.transform='translateY(18px)';section.style.transition='opacity .7s ease, transform .7s ease';const show=()=>{section.style.opacity='1';section.style.transform='none'};if('IntersectionObserver'in window){const io=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){show();io.disconnect()}},{threshold:.12});io.observe(section)}else show();})();
