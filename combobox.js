const comboboxRoots = document.querySelectorAll("[data-combobox]").forEach(root => {

  root.className = "combobox";

  const comboboxPath = root.getAttribute("data-combobox");
  const inputName = null !== root.getAttribute("data-name") ? root.getAttribute("data-name") : "combobox";
  const forceCompletion = null !== root.getAttribute("data-forcecompletion") 
    && "off" != root.getAttribute("data-forcecompletion") 
    && "false" != root.getAttribute("data-forcecompletion") 
    ? root.getAttribute("data-forcecompletion") : false;
  const completionsPath = comboboxPath+"/completions";
  const stylesPath = comboboxPath+"/combobox.css";

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = stylesPath;
  document.head.appendChild(link);
  
  const input = document.createElement('input');
  input.name = inputName;
  input.autocomplete = "off";
  const completions = document.createElement('div');

  input.className = "combobox-input";
  completions.className = "combobox-dropdown";
  
  root.appendChild(input);
  root.appendChild(completions);

  const allCompletions = new Set();
  const completionsByUppercase = {};

  input.addEventListener('input', async () => {
    const query = input.value;
    if (!query) {
      completions.innerHTML = '';
      return;
    }
  
    const response = await fetch(completionsPath+`?q=${query}`);
    const data = await response.json();
  
    completions.innerHTML = '';
    data.forEach(completion => {
      allCompletions.add(completion.toUpperCase());
      completionsByUppercase[completion.toUpperCase()] = completion;
      const div = document.createElement('div');
      div.className = 'completion';
      div.textContent = completion;
      div.addEventListener('click', () => {
        input.value = completion;
        completions.innerHTML = '';
      });
      completions.appendChild(div);
    });
  });

  let lastCompletion = "";
  allCompletions.add("");
  
  document.addEventListener('click', (e) => {
    if (!completions.contains(e.target) && e.target !== input) {
      completions.innerHTML = '';
      if(forceCompletion) {
        if(!allCompletions.has(input.value.toUpperCase())) {
          input.value = lastCompletion;
        }
        else {
          input.value = completionsByUppercase[input.value.toUpperCase()];
          lastCompletion = input.value;
        }
      }
    }
  });

  return root;
});

