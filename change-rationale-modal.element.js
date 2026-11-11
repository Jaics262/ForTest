// App_Plugins/ChangeRationale/change-rationale-modal.element.js

import {
    html,
    css
} from '@umbraco-cms/backoffice/external/lit';

import {
    UmbModalBaseElement
} from '@umbraco-cms/backoffice/modal';


export class ChangeRationaleModalElement extends UmbModalBaseElement {

    static properties = {
        data: { attribute: false },
        modalContext: { attribute: false },
        _message: { state: true },
        _error: { state: true },
        _saveDisabled: { state: true }
    };

    constructor() {
        super();

        this.data = undefined;
        this.modalContext = undefined;

        this._message = '';
        this._error = '';
        this._saveDisabled = true;

        this.addEventListener('input', () => {
            this._applyMessage(this._readMessage());
        }, true);
    }


    _readMessage() {
        const field = this.renderRoot?.querySelector('#message');
        const inner = field?.shadowRoot?.querySelector('textarea');

        if (typeof inner?.value === 'string') {
            return inner.value;
        }

        if (typeof field?.value === 'string') {
            return field.value;
        }

        return '';
    }


    _applyMessage(value) {
        const message = value ?? '';
        const overLimit = message.length > 500;

        this._message = message;
        this._saveDisabled = !message.trim() || overLimit;
        this._error = overLimit
            ? 'The message cannot exceed 500 characters.'
            : '';

        this._syncSaveButton();
    }


    _syncSaveButton() {
        const button = this.renderRoot?.querySelector('#confirm-action');

        if (!button) {
            return;
        }

        button.disabled = this._saveDisabled;
        button.toggleAttribute('disabled', this._saveDisabled);
    }


    _onInput() {
        this._applyMessage(this._readMessage());
    }


    updated(changed) {
        super.updated?.(changed);
        this._syncSaveButton();
    }


    _cancel() {
        this.modalContext?.reject();
    }


    _submit() {
        this._applyMessage(this._readMessage());

        if (this._saveDisabled) {
            return;
        }

        const message = this._message.trim();

        if (!message) {
            this._error = 'Enter a change-rationale message.';
            return;
        }

        if (message.length > 500) {
            this._error =
                'The message cannot exceed 500 characters.';
            return;
        }

        this.modalContext?.updateValue({
            message
        });

        this.modalContext?.submit();
    }


    render() {
        const action = this.data?.action ?? 'Save';

        const description = action === 'Rollback'
            ? 'Describe why you are rolling this content back. This is stored in the audit trail.'
            : action === 'Save and preview'
                ? 'Describe the changes you have made. This is stored in the audit trail before the preview link is created.'
                : 'Describe the changes you have made. This is stored in the audit trail.';

        const buttonColor = action === 'Publish' || action === 'Save and preview'
            ? 'positive'
            : action === 'Rollback'
                ? 'warning'
                : 'default';

        const saveDisabled =
            !this._message.trim() || this._message.length > 500;

        return html`
            <umb-body-layout
                headline="Reason for change">

                <div id="main">

                    <p>
                        ${description}
                    </p>

                    <uui-form-layout-item>


                        <uui-textarea
                            id="message"
                            class=${this._message.length > 500 ? 'over' : ''}
                            label="Change rationale"
                            placeholder="Example: Updated Concern journey heading text."
                            .value=${this._message}
                            @input=${this._onInput}>
                        </uui-textarea>

                    </uui-form-layout-item>

                    <div class="counter ${this._message.length > 500 ? 'over' : ''}">
                        ${this._message.length} / 500
                    </div>

                    ${this._error
                ? html`
                            <uui-box class="error">
                                <uui-icon name="icon-alert"></uui-icon>
                                ${this._error}
                            </uui-box>
                        `
                : ''
            }

                </div>

                <div slot="actions">

                    <uui-button
                        label="Cancel"
                        look="secondary"
                        @click=${this._cancel}>
                        Cancel
                    </uui-button>

                    <uui-button
                        id="confirm-action"
                        class=${saveDisabled ? 'blocked' : ''}
                        label="${action}"
                        look="${saveDisabled ? 'secondary' : 'primary'}"
                        color="${buttonColor}"
                        .disabled=${saveDisabled}
                        ?disabled=${saveDisabled}
                        @click=${this._submit}>
                        ${action}
                    </uui-button>

                </div>

            </umb-body-layout>
        `;
    }


    static styles = css`
        #main {
            padding: var(--uui-size-layout-1);
        }

        p {
            margin-top: 0;
            color: var(--uui-color-text-alt);
        }

        uui-textarea {
            width: 100%;
            min-height: 140px;
        }

        uui-textarea.over {
            --uui-textarea-border-color: var(--uui-color-danger);
        }

        #confirm-action.blocked {
            --uui-button-background-color: var(--uui-color-disabled);
            --uui-button-background-color-hover: var(--uui-color-disabled);
            --uui-button-background-color-disabled: var(--uui-color-disabled);
            --uui-button-contrast: var(--uui-color-disabled-contrast);
            --uui-button-contrast-hover: var(--uui-color-disabled-contrast);
            --uui-button-contrast-disabled: var(--uui-color-disabled-contrast);
            --uui-button-border-color: var(--uui-color-disabled);
            --uui-button-border-color-disabled: var(--uui-color-disabled);
            --color: var(--uui-color-disabled);
            --color-contrast: var(--uui-color-disabled-contrast);
            --color-emphasis: var(--uui-color-disabled);
            pointer-events: none;
            cursor: not-allowed;
        }

        .counter {
            margin-top: var(--uui-size-space-2);
            text-align: right;
            color: var(--uui-color-text-alt);
            font-size: 12px;
        }

        .counter.over {
            color: var(--uui-color-danger);
            font-weight: 700;
        }

        .error {
            margin-top: var(--uui-size-space-4);
            color: var(--uui-color-danger);
            border-left: 3px solid var(--uui-color-danger);
        }
    `;
}


// Plain JavaScript registration.
// Do NOT use @customElement() in this .js file.
if (!customElements.get('swe-change-rationale-modal')) {
    customElements.define(
        'swe-change-rationale-modal',
        ChangeRationaleModalElement
    );
}


export default ChangeRationaleModalElement;