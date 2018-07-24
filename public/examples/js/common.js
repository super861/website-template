+function() {
    let scripts;
    let content;
    let output;
    let execute;
    let prev;
    let next;
    let currentSlide = 0;

    const init = () => {
        // Removes the event handlers, so that they don't get run twice
        document.removeEventListener('DOMContentLoaded', init);
        window.removeEventListener('load', init);
        
        scripts = document.getElementById('scripts').querySelectorAll('.script-panel');
        content = document.getElementById('content');
        output = document.getElementById('output') || document.createElement('div');
        refresh = document.getElementById('refresh');
        execute = document.getElementById('execute');
        prev = document.getElementById('prev');
        next = document.getElementById('next');
        
        if(refresh) {
            refresh.addEventListener('click', refreshSlide);
        }
        execute.addEventListener('click', executeScript);
        prev.addEventListener('click', prevSlide);
        next.addEventListener('click', nextSlide);
        
        setSlide(0);
    }
    
    const setSlide = (slide) => {
        currentSlide = Math.max(0, Math.min(scripts.length - 1, slide));
        const currentScript = scripts[currentSlide].cloneNode(true);
        const currentOutput = currentScript.querySelector('.output');
        while(content.firstChild) {
            content.removeChild(content.firstChild);
        }
        if(output.classList.contains('clear')) {
            output.innerHTML = '';
        } else {
            var clearElements = output.querySelectorAll('.clear').forEach((element) => {
                element.innerHTML = '';
            });
        }
        const panelHTML = output.querySelector('.panel-html');
        if(panelHTML) {
            panelHTML.classList.add('hidden');
            const html = currentScript.querySelector('.dom');
            if(html) {
                panelHTML.classList.remove('hidden');
                panelHTML.tempHTML = html.cloneNode(true);
                while(html.firstChild) {
                    panelHTML.appendChild(html.firstChild);
                }
                html.textContent = panelHTML.innerHTML;
                if(window.hljs) {
                    hljs.highlightBlock(html);
                }
            } else {
                delete panelHTML.tempHTML;
            }
        }
        console.clear();
        content.appendChild(currentScript);
        prev.classList.add('hidden');
        next.classList.add('hidden');
        if(currentSlide > 0) {
            prev.classList.remove('hidden');
        }
        if(currentSlide < scripts.length - 1) {
            next.classList.remove('hidden');
        }
        if(window.CodeMirror) {
            const codeMirror = CodeMirror.fromTextArea(content.querySelector('.script'));
            codeMirror.on('change', (cm) => {
                cm.save();
            });
        }
    }
    
    const executeScript = () => {
        const panelConsole = output.querySelector('.panel-console');
        if(panelConsole) {
            panelConsole.innerHTML = '';
        }
        console.clear();
        const currentScript = content.querySelectorAll('.extra-script, .script');
        try {
            let script = '';
            for(let idx = 0; idx < currentScript.length; idx++) {
                const current = currentScript[idx];
                if(current.nodeName.toLowerCase() === 'textarea') {
                    script+= current.value;
                } else {
                    script+= current.innerHTML;
                }
            }
            eval(script);
        } catch(exception) {
            showError(exception);
        }
    }
    
    const refreshSlide = () => {
        const panelHTML = output.querySelector('.panel-html');
        if(panelHTML && panelHTML.tempHTML) {
            panelHTML.innerHTML = '';
            const html = panelHTML.tempHTML.cloneNode(true);
            if(html) {
                while(html.firstChild) {
                    panelHTML.appendChild(html.firstChild);
                }
            }
        }
        const panelConsole = output.querySelector('.panel-console');
        if(panelConsole) {
            panelConsole.innerHTML = '';
        }
        console.clear();
    }
    
    const prevSlide = () => {
        setSlide(currentSlide - 1);
    }

    const nextSlide = () => {
        setSlide(currentSlide + 1);
    }
    
    const oldLog = console.log;
    console.log = function() {
        const panelConsole = output.querySelector('.panel-console');
        if(panelConsole) {
            const line = parseArray(Array.prototype.slice.call(arguments));
            panelConsole.innerHTML+= line.join(' ') + '\n';
        }
        oldLog.apply(console, arguments);
    }
    
    if (!String.prototype.padStart) {
        String.prototype.padStart = function padStart(targetLength,padString) {
            targetLength = targetLength>>0; //truncate if number or convert non-number to 0;
            padString = String((typeof padString !== 'undefined' ? padString : ' '));
            if (this.length > targetLength) {
                return String(this);
            }
            else {
                targetLength = targetLength-this.length;
                if (targetLength > padString.length) {
                    padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
                }
                return padString.slice(0,targetLength) + String(this);
            }
        };
    }
    
    const parseArray = (args, indent = 0, isSub = false) => {
        const line = args.map((argument) => {
            return parseArgument(argument, indent, isSub);
        });
        return line;
    }
    
    const parseObject = (argument, indent = 0) => {
        const line = [];
        for(var key in argument) {
            if(argument.hasOwnProperty(key)) {
                const keyStr = '<span class="color-key">' + key + '</span>: ' + parseArgument(argument[key], indent + 1, true);
                line.push(''.padStart(4 * (indent + 1), ' ') + keyStr);
            }
        }
        return '<span class="color-object">' + (argument.name || argument.constructor.name) + '</span> {\n' + line.join(',\n') + '\n' + ''.padStart(4 * indent, ' ') + '}';
    }
    
    const parseArgument = (argument, indent = 0, isSub = false) => {
        if(argument !== argument) {
            return '<span class="color-muted">NaN</span>';
        } else if(argument === null) {
            return '<span class="color-muted">null</span>';
        } else if(typeof argument === 'undefined') {
            return '<span class="color-muted">undefined</span>';
        } else if(!isNaN(argument) || argument === true || argument === false) {
            return '<span class="color-numval">' + (argument === true ? 'true' : argument === false ? 'false' : argument) + '</span>';
        } else if(Array.isArray(argument)) {
            return '[' + parseArray(argument, indent, true).join(', ') + ']';
        } else if(typeof argument === 'string') {
            if(isSub) {
                return '<span class="color-string">&quot;' + argument + '&quot;</span>';
            } else {
                return argument;
            }
        } else if(argument instanceof RegExp) {
            return '<span class="color-regexp">' + argument.toString() + '</span>';
        } else if(typeof argument === 'object') {
            return parseObject(argument, indent);
        } else if(typeof argument === 'function') {
            return '<span class="color-object">function ' + argument.name + '()</span>';
        }
    }
    
    const showError = (exception) => {
        const panelConsole = output.querySelector('.panel-console');
        if(panelConsole) {
            const line = '<div class="error">' + exception + '\n' + exception.lineNumber + ':' + exception.columnNumber + '</div>';
            panelConsole.innerHTML+= line + '\n';
        }
        throw exception
    }
    
    document.addEventListener('DOMContentLoaded', init, false);
    window.addEventListener('load', init, false);
}();