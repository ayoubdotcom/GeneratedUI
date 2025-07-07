document.addEventListener('DOMContentLoaded', () => {
    const customizable = document.querySelector('.customizable');
    const template = document.querySelector('.template');

    // Color controls and their HEX inputs
    const colorPairs = [
        { color: 'primaryColor', hex: 'primaryColorHex', css: '--primary' },
        { color: 'secondaryColor', hex: 'secondaryColorHex', css: '--secondary' },
        { color: 'accentColor', hex: 'accentColorHex', css: '--accent' },
        { color: 'neutral1Color', hex: 'neutral1ColorHex', css: '--neutral1' },
        { color: 'neutral2Color', hex: 'neutral2ColorHex', css: '--neutral2' },
        { color: 'neutral3Color', hex: 'neutral3ColorHex', css: '--neutral3' },
        { color: 'neutral4Color', hex: 'neutral4ColorHex', css: '--neutral4' },
        { color: 'textColor', hex: 'textColorHex', css: '--text-color' }
    ];

    function isValidHex(hex) {
        return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
    }

    colorPairs.forEach(pair => {
        const colorInput = document.getElementById(pair.color);
        const hexInput = document.getElementById(pair.hex);

        colorInput.addEventListener('input', () => {
            hexInput.value = colorInput.value.toUpperCase();
            if (pair.css) {
                if (pair.css === '--neutral3') {
                    customizable.style.setProperty('--neutral3', colorInput.value);
                    customizable.querySelectorAll('h1, h2, h3').forEach(h => {
                        h.style.color = colorInput.value;
                    });
                } else {
                    customizable.style.setProperty(pair.css, colorInput.value);
                }
            } else {
                customizable.style.color = colorInput.value;
            }
        });

        hexInput.addEventListener('input', () => {
            let val = hexInput.value;
            if (val[0] !== '#') val = '#' + val;
            if (isValidHex(val)) {
                colorInput.value = val;
                if (pair.css) {
                    if (pair.css === '--neutral3') {
                        customizable.style.setProperty('--neutral3', val);
                        customizable.querySelectorAll('h1, h2, h3').forEach(h => {
                            h.style.color = val;
                        });
                    } else {
                        customizable.style.setProperty(pair.css, val);
                    }
                } else {
                    customizable.style.color = val;
                }
            }
        });
    });

    // Typography controls
    const fontFamilyBody = document.getElementById('fontFamilyBody');
    const fontFamilyBodyCustom = document.getElementById('fontFamilyBodyCustom');
    const fontFamilyHeadings = document.getElementById('fontFamilyHeadings');
    const fontFamilyHeadingsCustom = document.getElementById('fontFamilyHeadingsCustom');
    const fontSize = document.getElementById('fontSize');
    const fontSizeValue = document.getElementById('fontSizeValue');
    const fontSizeH1 = document.getElementById('fontSizeH1');
    const fontSizeH1Value = document.getElementById('fontSizeH1Value');
    const fontSizeH2 = document.getElementById('fontSizeH2');
    const fontSizeH2Value = document.getElementById('fontSizeH2Value');
    const fontSizeH3 = document.getElementById('fontSizeH3');
    const fontSizeH3Value = document.getElementById('fontSizeH3Value');
    const fontSizeSmall = document.getElementById('fontSizeSmall');
    const fontSizeSmallValue = document.getElementById('fontSizeSmallValue');

    function loadGoogleFont(font) {
        if (!font) return;
        const fontName = font.replace(/ /g, '+');
        if (!document.getElementById('gf-' + fontName)) {
            const link = document.createElement('link');
            link.id = 'gf-' + fontName;
            link.rel = 'stylesheet';
            link.href = `https://fonts.googleapis.com/css?family=${fontName}:400,700&display=swap`;
            document.head.appendChild(link);
        }
    }

    function setBodyFont(font) {
        if (customizable) customizable.style.fontFamily = font;
    }

    function setHeadingsFont(font) {
        if (customizable) {
            customizable.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => {
                h.style.fontFamily = font;
            });
        }
    }

    // Body font: dropdown
    if (fontFamilyBody) {
        fontFamilyBody.addEventListener('change', () => {
            setBodyFont(fontFamilyBody.value);
            fontFamilyBodyCustom.value = '';
        });
    }

    // Body font: custom Google font
    if (fontFamilyBodyCustom) {
        fontFamilyBodyCustom.addEventListener('change', () => {
            const font = fontFamilyBodyCustom.value.trim();
            if (font) {
                loadGoogleFont(font);
                setBodyFont(`'${font}', sans-serif`);
            }
        });
    }

    // Headings font: dropdown
    if (fontFamilyHeadings) {
        fontFamilyHeadings.addEventListener('change', () => {
            setHeadingsFont(fontFamilyHeadings.value);
            fontFamilyHeadingsCustom.value = '';
        });
    }

    // Headings font: custom Google font
    if (fontFamilyHeadingsCustom) {
        fontFamilyHeadingsCustom.addEventListener('change', () => {
            const font = fontFamilyHeadingsCustom.value.trim();
            if (font) {
                loadGoogleFont(font);
                setHeadingsFont(`'${font}', sans-serif`);
            }
        });
    }

    // Initial set for headings
    setHeadingsFont(fontFamilyHeadings.value);

    // Font size controls
    if (fontSize) {
        fontSize.addEventListener('input', () => {
            const size = fontSize.value + 'px';
            if (customizable) customizable.style.setProperty('--font-size-body', size);
            if (fontSizeValue) fontSizeValue.textContent = size;
        });
        // Initialize value
        if (customizable) customizable.style.setProperty('--font-size-body', fontSize.value + 'px');
        if (fontSizeValue) fontSizeValue.textContent = fontSize.value + 'px';
    }
    if (fontSizeH1) {
        fontSizeH1.addEventListener('input', () => {
            const size = fontSizeH1.value + 'px';
            if (customizable) customizable.style.setProperty('--font-size-h1', size);
            if (fontSizeH1Value) fontSizeH1Value.textContent = size;
        });
        if (customizable) customizable.style.setProperty('--font-size-h1', fontSizeH1.value + 'px');
        if (fontSizeH1Value) fontSizeH1Value.textContent = fontSizeH1.value + 'px';
    }
    if (fontSizeH2) {
        fontSizeH2.addEventListener('input', () => {
            const size = fontSizeH2.value + 'px';
            if (customizable) customizable.style.setProperty('--font-size-h2', size);
            if (fontSizeH2Value) fontSizeH2Value.textContent = size;
        });
        if (customizable) customizable.style.setProperty('--font-size-h2', fontSizeH2.value + 'px');
        if (fontSizeH2Value) fontSizeH2Value.textContent = fontSizeH2.value + 'px';
    }
    if (fontSizeH3) {
        fontSizeH3.addEventListener('input', () => {
            const size = fontSizeH3.value + 'px';
            if (customizable) customizable.style.setProperty('--font-size-h3', size);
            if (fontSizeH3Value) fontSizeH3Value.textContent = size;
        });
        if (customizable) customizable.style.setProperty('--font-size-h3', fontSizeH3.value + 'px');
        if (fontSizeH3Value) fontSizeH3Value.textContent = fontSizeH3.value + 'px';
    }
    if (fontSizeSmall) {
        fontSizeSmall.addEventListener('input', () => {
            const size = fontSizeSmall.value + 'px';
            if (customizable) customizable.style.setProperty('--font-size-small', size);
            if (fontSizeSmallValue) fontSizeSmallValue.textContent = size;
        });
        if (customizable) customizable.style.setProperty('--font-size-small', fontSizeSmall.value + 'px');
        if (fontSizeSmallValue) fontSizeSmallValue.textContent = fontSizeSmall.value + 'px';
    }

    // Text Color Change Handler
    const textColorInput = document.getElementById('textColor');
    const textColorHexInput = document.getElementById('textColorHex');

    function setTemplateTextColor(color) {
        if (template) {
            template.style.color = color;
        }
    }

    // Sync color input and hex input
    textColorInput.addEventListener('input', function () {
        setTemplateTextColor(this.value);
        textColorHexInput.value = this.value;
    });
    textColorHexInput.addEventListener('input', function () {
        if (/^#[0-9A-Fa-f]{6}$/.test(this.value)) {
            setTemplateTextColor(this.value);
            textColorInput.value = this.value;
        }
    });

    // Initialize on page load
    setTemplateTextColor(textColorInput.value);
});

