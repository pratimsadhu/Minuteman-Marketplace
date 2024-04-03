// document.addEventListener('DOMContentLoaded', () => {
//     const sections = document.querySelectorAll('section > div:first-child, section > h2');
  
//     sections.forEach((sectionTitle) => {
//       const toggle = document.createElement('span');
//       toggle.textContent = ' ▼';
//       toggle.style.cursor = 'pointer';
  
//       sectionTitle.appendChild(toggle);
  
//       let content = sectionTitle.nextElementSibling;
//       while (content && !content.matches('section > div:first-child, section > h2')) {
//         content.style.display = 'none';
//         content = content.nextElementSibling;
//       }
  
//       toggle.addEventListener('click', () => {
//         let nextElement = sectionTitle.nextElementSibling;
//         while (nextElement && !nextElement.matches('section > div:first-child, section > h2')) {
//           if (nextElement.style.display === 'none') {
//             nextElement.style.display = '';
//             toggle.textContent = ' ▲';
//           } else {
//             nextElement.style.display = 'none';
//             toggle.textContent = ' ▼';
//           }
//           nextElement = nextElement.nextElementSibling;
//         }
//       });
//     });
//   });
  