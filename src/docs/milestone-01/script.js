document.addEventListener('DOMContentLoaded', () => {
  // Start the dropdown effect from the Overview section onwards
  // This assumes that each section you want to include follows a similar structure
  const startingSection = document.getElementById('overview').previousElementSibling; // Gets the section before Overview
  let sectionsToInclude = [];

  // Gather all sections after the starting point
  let currentSection = startingSection.nextElementSibling;
  while (currentSection) {
    if (currentSection.tagName.toLowerCase() === 'section') { // Checks if it's a section tag
      sectionsToInclude.push(currentSection.querySelector('h2'));
    }
    currentSection = currentSection.nextElementSibling;
  }

  sectionsToInclude.forEach((sectionTitle) => {
    if (!sectionTitle) return; // Skip if there's no h2 found in the section

    const toggle = document.createElement('span');
    toggle.textContent = ' ▼';
    toggle.style.cursor = 'pointer';
    sectionTitle.appendChild(toggle);

    let content = sectionTitle.nextElementSibling;
    while (content && content.tagName.toLowerCase() !== 'section') {
      content.style.display = 'none';
      content = content.nextElementSibling;
    }

    toggle.addEventListener('click', () => {
      let nextElement = sectionTitle.nextElementSibling;
      while (nextElement && nextElement.tagName.toLowerCase() !== 'section') {
        if (nextElement.style.display === 'none') {
          nextElement.style.display = '';
          toggle.textContent = ' ▲';
        } else {
          nextElement.style.display = 'none';
          toggle.textContent = ' ▼';
        }
        nextElement = nextElement.nextElementSibling;
      }
    });
  });
});
