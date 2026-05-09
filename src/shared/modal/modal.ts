import type { ModalConfig } from "./modalConfig";

export const modalFrom = (
    content: (returnClose: () => void) => HTMLElement,
    cfg: ModalConfig,
): [() => void, () => void] => {
    const close = () => {
        modalOut.style.display = "none";
    };
    const open = () => {
        modalOut.style.display = "flex";
    };
    const modalOut = document.createElement("div");
    modalOut.classList.add("modalOut");
    modalOut.style.display = "none";
    modalOut.id = cfg.id;
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modalOut.appendChild(modal);
    const main = document.createElement("main");
    main.classList.add("modal-main");

    main.appendChild(content(close));
    const header = document.createElement("header");
    header.classList.add("modal-header");
    const headerCloseBtn = document.createElement("button");
    headerCloseBtn.classList.add("modal-header-close");
    headerCloseBtn.textContent = "X";
    headerCloseBtn.addEventListener("click", () => {
        modalOut.style.display = "none";
    });
    header.appendChild(headerCloseBtn);
    const headerTitle = document.createElement("h2");
    headerTitle.textContent = cfg.title;
    header.appendChild(headerTitle);

    modal.appendChild(header);
    modal.appendChild(main);

    document.body.appendChild(modalOut);
    return [open, close];
};
