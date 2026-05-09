import type { Form } from "./formModel";

export const formFrom = (formData: Form): HTMLFormElement => {
    const form = document.createElement("form");

    form.id = formData.id;

    formData.fields.forEach((field) => {
        const label = document.createElement("label");
        label.textContent = field.label;
        label.htmlFor = field.id;

        const input = document.createElement("input");
        input.type = field.type;
        input.id = field.id;
        input.name = field.id;
        input.value = String(field.value);
        if (field.type === "number") {
            input.min = String(field.min);
            input.max = String(field.max);
        }
        if (field.step) {
            input.step = String(field.step);
        }
        if (field.disabled) {
            input.disabled = true;
        }
        if (field.placeholder) {
            input.placeholder = field.placeholder;
        }
        form.appendChild(label);
        form.appendChild(input);
    });

    const submitBtn = document.createElement("button");
    submitBtn.textContent = formData.submitBtn.text;
    submitBtn.type = "submit";
    form.appendChild(submitBtn);

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const data: Record<string, any> = {};
        formData.fields.forEach((field) => {
            const input = form.querySelector<HTMLInputElement>(`#${field.id}`);
            if (input) {
                data[field.id] = field.type === "number" ? Number(input.value) : input.value;
            }
        });
        formData.onSubmit(data);
    });


    return form;
};
